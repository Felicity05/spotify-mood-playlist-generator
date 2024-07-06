import React, {useCallback, useState} from 'react';
import {useAccessToken} from "../Context/AccessTokenContext";
import {useNavigate} from "react-router-dom";
import {PlayHistory, TrackAudioFeatures} from "../utils/trackTypes";
import {Track} from "../utils/playlistTypes";
import {
    addSelectedTracksToPlaylist,
    createNewPlaylist,
    getRecentlyPlayedTracks,
    getSeveralTracksAudioFeatures, getTopItemsForUser, getTopTracksForTopArtists
} from "../api/api";
import {predictTrackMood} from "../api/model_predictions_api";
import {moodEncodingMap} from "../Components/MainContent/MoodSelector";
import {Artist} from "../types";
import {useUserStore} from "../store/userStore";

type TrackMood = {
    trackUri: string,
    mood: string
}

interface GeneratePlaylistHook {
    showProgressBar: boolean;
    createPlaylistFlow: (mood: string, source: string, topArtist: any[]) => Promise<void>;
    playlistSize: number;
    showModal: boolean;
    message: string;
    setShowModal: (value: boolean) => void;
}

//TODO: review hook to handle case when playlist size is less tan or equals to 5 and user still wants to create playlist

/* Custom hook to handle the automatic generation of mood playlists,
    hook performs the following actions:
    get songs from user selected source,
    classify the songs according to their mood,
    filter the list according to the selected mood,
    create a new playlist
    get newly created playlist and add filtered songs to it*/
export const useGeneratePlaylist = (): GeneratePlaylistHook => {
    const {user: userProfile} = useUserStore();
    const navigate = useNavigate();

    const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
    const [listOfTracksMood, setListOfTracksMood] = useState<TrackMood[] | null>(null);
    const [playlistSize, setPlaylistSize] = useState(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const getTracksMoodForTrackSource = async (tracksSource: PlayHistory[] | Track[]) => {
        let listOfTracksIds: Set<string> = new Set(); //creates a set to avoid duplicate tracks
        // console.log("tracksSource== ", tracksSource)

        tracksSource.map(item => {
            if ("track" in item) {
                listOfTracksIds.add(item.track.id) //for the PlayHistory object
                // console.log("should only enter here if track source is recently played tracks")
            } else {
                listOfTracksIds.add(item.id) //for the Track object
                // console.log("should only enter here if track source is top tracks")
            }
        })

        console.log("total tracks to analyze", listOfTracksIds.size);
        let totalTracks = listOfTracksIds.size;


        let partitions = 0;
        let listOfAudioFeatures: TrackAudioFeatures[] = [];
        while (totalTracks >= 0) {
            //convert the listOfTracksIds set into an Array and finally to a String
            const trackIdsList = [...listOfTracksIds].slice(partitions, partitions + 100).toString() //can only pass 100 ids at a time to the getTracksAudioFeatures endpoint
            partitions += 100;
            // console.log("(string) trackIdsList== ", trackIdsList)

            //todo: make a loop to get track features for all the songs on the listOfTracksIds
            //makes an api call to get the audio features of all the unique songs in the source list
            const currentListOfAudioFeatures = await getSeveralTracksAudioFeatures(trackIdsList);
            listOfAudioFeatures = [...listOfAudioFeatures, ...currentListOfAudioFeatures];

            totalTracks -= 100;
            console.log("totalTracks== ", totalTracks, " -- partitions== ", partitions)
        }
        console.log("listOfAudioFeatures== ", listOfAudioFeatures)
        console.log("listOfAudioFeaturesSize== ", listOfAudioFeatures.length)

        //uses my ML random_forest model to predict the mood for each song
        const tracksMoodList = await predictTrackMood(listOfAudioFeatures)
        console.log("tracksMoodList== ", tracksMoodList)

        // If the tracksMoodList is a string, it's an error message
        if (typeof tracksMoodList === 'string') {
            setMessage(tracksMoodList);
            setShowModal(true);
            return null;
        }

        // Mood prediction successfully and now handles the prediction result (an array of numbers)

        //creates an array of objects of track uri and predicted mood
        let listTrackMoodUri: TrackMood[] = []
        listOfAudioFeatures.forEach((track_features: { uri: string }, index: number) => {
            const value = {trackUri: track_features.uri, mood: tracksMoodList[index].toString()}
            listTrackMoodUri.push(value)
        })

        setListOfTracksMood(listTrackMoodUri)
        // setRecentlyPlayedTracksMoods(listTrackMoodUri); -- where is this used
        return listTrackMoodUri;
    }

    //filters tracks by the selected mood and returns a string array of the tracks uris to add to the new playlist
    function filterTracksByMood(listTrackMoodUri: TrackMood[], mood: string): string[] {
        //filters the list of tracks from the track source according to the selected Mood
        const filteredMoodListTracks = listTrackMoodUri.filter(track_mood => track_mood.mood === mood)
        console.log("filteredMoodListTracks== ", filteredMoodListTracks)

        //creates a string Array of tracks uris for the selected mood to add to the newly created playlist
        return filteredMoodListTracks.flatMap(track => track.trackUri);
    }

    async function createPlaylistWithSelectedSongs(listTracksUri: string[], mood: string) {
        //map mood encoding to string value to pass to the create playlist function
        const playlistMood = Object.keys(moodEncodingMap).find(
            (key) => moodEncodingMap[key as keyof typeof moodEncodingMap] === mood)
        // console.log("playlistMood== ", playlistMood)

        //make api call to create a new playlist
        const newPlaylist = await createNewPlaylist(userProfile!.id, playlistMood!)
        console.log("newPlaylist response== ", newPlaylist)

        //make api call to add the corresponding songs from the mood list to the playlist
        const tracksAdded = await addSelectedTracksToPlaylist(newPlaylist.id, listTracksUri)

        // console.log("tracks added== ", tracksAdded)
        console.log("playlist id of new playlist== ", newPlaylist.id);
        // const playlistId = '1ZVXBUWTb8TgPnmNh14ZBj'

        //navigate to playlist page to show newly created playlist to the user
        navigate(`/playlist/${newPlaylist.id}`)
    }

    const createPlaylistFlow = useCallback(async (mood: string, source: string, topArtist: Artist[]) => {
        setShowProgressBar(true);
        // console.log("listOfTracksMood state==", listOfTracksMood)

        let listTrackMoodUri: TrackMood[] | null = listOfTracksMood;

        if (!listOfTracksMood) {
            let tracksSource: PlayHistory[] | Track[] = []
            console.log("I am here", mood, "--", source)

            switch (source) {
                case 'recentlyPlayed':
                    console.log("get recently played tracks")
                    tracksSource = await getRecentlyPlayedTracks() as PlayHistory[]; //response type is playHistoryObject
                    break;
                case 'topTracks':
                    console.log("get top tracks")
                    tracksSource = await getTopItemsForUser("tracks") as Track[];
                    break;
                case 'topArtist':
                    console.log("get top 15 artist and for each artist get top 10 tracks")
                    const topArtistsIds = topArtist.map(artist => artist.id);

                    console.log("number of artists to get top tracks for== ", topArtistsIds.length);
                    tracksSource = await getTopTracksForTopArtists(topArtistsIds);
                    break;
            }

            console.log("tracksSource=== ", tracksSource)

            //gets the mood for the unique list of tracks ids from the track source
            listTrackMoodUri = await getTracksMoodForTrackSource(tracksSource);
            // console.log("listTrackMoodUri== ", listTrackMoodUri)
            // listTrackMoodUri = listTrackMoodUriSample;
        }

        if (listTrackMoodUri) {
            // setListOfTracksMood(listTrackMoodUri);
            // console.log("setting list track uri for the first time and setting listOfTracksMood state")
            // listTrackMoodUri = listOfTracksMood;
            // console.log("source hasn't change so getting list track mood from listOfTracksMood state")

            const listTracksUri = filterTracksByMood(listTrackMoodUri, mood);

            // sets the playlist size to decide whether to continue with the playlist creation process or no
            const playlist_size = listTracksUri.length

            if (playlist_size < 5) {
                setPlaylistSize(playlist_size)
                setShowProgressBar(false);
                setShowModal(true)
                console.log("listOfTracksMood= ", listOfTracksMood)
                /* in a modal
                    tell the user: there would be only 'playlistSize' songs on your playlist, are you sure you want to continue?
                    if yes - create playlist and add songs
                    if no - ask the user: what would you want to reset? mood, source or both
                    depending on what the user selects, set the according variables to empty to reset the state
                    let the flow of the app continue as if it was staring over from the beginning
                    but used cached data if possible instead of making new requests
                 */

            } else {
                console.log("create playlist here, call api here")
                const position = 0;
                await createPlaylistWithSelectedSongs(listTracksUri, mood);
            }
        }

        // After the operation is done, hide the progress bar
        setShowProgressBar(false);

    }, [listOfTracksMood, userProfile, navigate]);

    return {showProgressBar, createPlaylistFlow, playlistSize, showModal, setShowModal, message};
}
