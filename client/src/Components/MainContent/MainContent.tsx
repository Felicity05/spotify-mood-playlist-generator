import {Button} from "../UI Components/Button";
import {
    addSelectedTracksToPlaylist,
    createNewPlaylist,
    getRecentlyPlayedTracks,
    getSeveralTracksAudioFeatures, getTopItemsForUser
} from "../../api/api";
import React, {HTMLAttributes, useEffect, useState} from "react";
import {useAccessToken} from "../../Context/AccessTokenContext";
import {predictTrackMood} from "../../api/model_predictions_api";
import TracksSourceSelector from "./TracksSourceSelector";
import {moodEncodingMap, MoodSelector} from "./MoodSelector";
import {useMoodSourceStore} from "../../store/moodStore";
import Modal from "../UI Components/Modal";
import ProgressBar from "../UI Components/ProgressBar";
import styled from "styled-components";
import {listTrackMoodUriSample} from "../../api/API_response_sampes";
import {useNavigate} from "react-router-dom";
import {TopArtist} from "./TopArtist";
import {Text} from "../UI Components/Text";
import {Artist, PlayHistoryObject} from "../../types";
import {Track} from "../../utils/playlistTypes";
import {PlayHistory} from "../../utils/trackTypes";
import restart from '../../assets/Icons/icons8-rotate-left-96.png'

//TODO: add types for track object, artist object, clean up this component

type TrackMood = {
    trackUri: string,
    mood: string
}

const CardContent = styled.div`
  //background-image: linear-gradient(180deg, rgba(14, 192, 76, 0.74), rgba(85, 30, 153, 0.60), rgba(140, 32, 223, 0));
  //border: blue solid 2px;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem 0 1rem;
  position: relative;
  z-index: 999;
`

interface MainContentProps extends HTMLAttributes<HTMLDivElement> {
}

export const MainContent: React.FC<MainContentProps> = () => {
    const {userProfile} = useAccessToken();
    const {
        selectedMood: mood, selectedTrackSource: source,
        setSelectedMood: setMood, setSelectedTrackSource: setTrackSource
    } = useMoodSourceStore();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
    const [showNewPlaylist, setShowNewPlaylist] = useState<boolean>(true);

    const [listOfTracksMood, setListOfTracksMood] = useState<TrackMood[] | null>(null);
    const [playlistSize, setPlaylistSize] = useState(0);
    const [recentlyPlayedTracksMoods, setRecentlyPlayedTracksMoods] = useState<TrackMood[] | null>(null);
    const [timeofDay, setTimeOfDay] = useState<string>("")

    const [topArtist, setTopArtist] = useState<Artist[]>([])

    const navigate = useNavigate();

    const getTimeOfDay = (): string => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return 'Morning';
        } else if (hour >= 12 && hour < 18) {
            return 'Afternoon';
        } else if (hour >= 18 && hour < 22) {
            return 'Evening';
        } else {
            return 'Night';
        }
    };

    useEffect(() => {
        const timeOfDay = getTimeOfDay();
        setTimeOfDay(timeOfDay)
    }, [])

    //extract handle playlist creation to a custom hook??

    const getTracksMoodForTrackSource = async (tracksSource: PlayHistory[] | Track[]) => {
        let listOfTracksIds: Set<string> = new Set();
        console.log("tracksSource== ", tracksSource)

        tracksSource.map(item => {
            if ("track" in item) {
                listOfTracksIds.add(item.track.id) //for the PlayHistory object
                console.log("should only enter here if track source is recently played tracks")
            } else {
                listOfTracksIds.add(item.id) //for the Track object
                console.log("should only enter here if track source is top tracks")
            }
        })

        //convert the listOfTracksIds set into an Array and finally to a String
        const trackIdsList = [...listOfTracksIds].slice(0, 100).toString()
        console.log("trackIdsList== ", trackIdsList)
        console.log("total tracks to analyze", trackIdsList.length)

        //make an api call to get the audio features of all the unique songs in the recently played list
        const listOfTracksAudioFeatures = await getSeveralTracksAudioFeatures(trackIdsList)
        const listOfAudioFeatures = listOfTracksAudioFeatures.audio_features
        // console.log("listOfTracksAudioFeatures== ", listOfTracksAudioFeatures)
        console.log("listOfAudioFeatures== ", listOfAudioFeatures)

        //use my ML random_forest model to predict the mood for each song
        const tracksMoodList = await predictTrackMood(listOfAudioFeatures)
        console.log("tracksMoodList== ", tracksMoodList)

        //creates an array of objects of track uri and predicted mood
        let listTrackMoodUri: TrackMood[] = []
        listOfAudioFeatures.map((track_features: { uri: string }, index: string | number) => {
            const value = {trackUri: track_features.uri, mood: tracksMoodList[index].toString()}
            listTrackMoodUri.push(value)
        })

        setListOfTracksMood(listTrackMoodUri)
        setRecentlyPlayedTracksMoods(listTrackMoodUri);
        return listTrackMoodUri;
    }

    async function createPlaylistWithSelectedSongs(listTracksUri: string[]) {
        //map mood encoding to string value to pass to the create playlist function
        const playlistMood = Object.keys(moodEncodingMap).find(
            (key) => moodEncodingMap[key as keyof typeof moodEncodingMap] === mood)

        // console.log(userProfile!.id, " ---- ", playlistMood)

        //make api call to create playlist
        const newPlaylist = await createNewPlaylist(userProfile!.id, playlistMood!)
        console.log("newPlaylist response== ", newPlaylist)

        //make api call to add the corresponding songs from the mood list to the playlist
        const tracksAdded = await addSelectedTracksToPlaylist(newPlaylist.id, listTracksUri)

        console.log("tracks added== ", tracksAdded)
        console.log("playlist id of new playlist== ", newPlaylist.id);
        // const playlistId = '1ZVXBUWTb8TgPnmNh14ZBj'

        //navigate to playlist page to show newly created playlist to the user
        navigate(`/playlist/${newPlaylist.id}`)
    }

    function filterTracksByMood(listTrackMoodUri: TrackMood[]) {
        //filters the list of tracks from the track source according to the selected Mood
        const selectedMoodListTracks = listTrackMoodUri!.filter(track_mood => track_mood.mood === mood)
        console.log("selectedMoodListTracks== ", selectedMoodListTracks)

        //creates a string Array of tracks uris for the selected mood to add to the newly created playlist
        return selectedMoodListTracks.flatMap(track => track.trackUri);
    }

    const handlePlaylistCreation = async () => {
        setShowProgressBar(true);
        console.log("listOfTracksMood state==", listOfTracksMood)

        let listTrackMoodUri: TrackMood[] | null
        if (!listOfTracksMood) {
            let tracksSource: PlayHistory[] | Track[] = []
            console.log("I am here", mood, "--", source)
            switch (source) {
                case 'recentlyPlayed':
                    //get recently played tracks
                    tracksSource = await getRecentlyPlayedTracks() as PlayHistory[]; //response type is playHistoryObject
                    console.log("get recently played tracks")
                    break;
                case 'topTracks':
                    console.log("get top tracks")
                    tracksSource = await getTopItemsForUser("tracks") as Track[];
                    break;
                case 'topArtist':
                    console.log("get top 10 artist and for each artist get top 10 songs")
                    break;
            }

            console.log("tracksSource=== ", tracksSource)
            //gets the mood for the unique list of tracks ids from the track source
            listTrackMoodUri = await getTracksMoodForTrackSource(tracksSource);
            // console.log("listTrackMoodUri== ", listTrackMoodUri)
            // listTrackMoodUri = listTrackMoodUriSample;
            setListOfTracksMood(listTrackMoodUri);
            console.log("setting list track uri for the first time and setting listOfTracksMood state")
        } else {
            listTrackMoodUri = listOfTracksMood;
            console.log("source hasn't change so getting list track mood from listOfTracksMood state")
        }

        //-----if mood changed but track source remain, start from here
        const listTracksUri = filterTracksByMood(listTrackMoodUri);

        // sets the playlist size and decides whether to continue with the playlist creation process or no
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
                depending on what the user selects, set the according variables to empty to reset teh state
                let the flow of the app continue as if it was staring over from the beginning
             */
        } else {
            console.log("create playlist here, call api here")

            await createPlaylistWithSelectedSongs(listTracksUri);

            // After the operation is done, hide the progress bar
            setShowProgressBar(false);

            // Show the new playlist
            setShowNewPlaylist(true);


        }
    }

    const handleConfirm = () => {
        // Create playlist
        // add songs to the newly created playlist
        setShowModal(false);
        console.log("create playlist here -- need to work on this functionality")

    }

    const handleResetMood = () => {
        //reset mood
        setMood("")
        setShowModal(false);
    }

    const handleResetTrackSource = () => {
        //reset track source
        setTrackSource("")
        setShowModal(false);
    }

    const handleResetMoodAndTrackSource = () => {
        // Reset mood and source
        setMood("")
        setTrackSource("")
        setShowModal(false);
    }

    return (
        <CardContent>
            <h1 style={{color: "white"}}>Good {timeofDay}, {userProfile?.display_name.split(" ")[0]}</h1>
            <h2>Ready to create your custom playlist with a single click? </h2>
            <Modal
                isOpen={showModal}
                onClose={handleResetMoodAndTrackSource}
                onConfirm={handleConfirm}
                handleMood={handleResetMood}
                handleTrackSource={handleResetTrackSource}
                handleBoth={handleResetMoodAndTrackSource}
                message={playlistSize.toString()}
            />
            <TracksSourceSelector/>
            {source && <MoodSelector/>} {/*conditional rendering after selecting track source*/}
            {mood && source &&   /*conditional rendering once both mood and source are set */
                <div>
                    <p>Great! Now that you've made your selections, you're all set to get your playlist. Just click
                        below! </p>
                    <Button variant="primary" size="lg" onClick={handlePlaylistCreation}>Generate Playlist</Button>
                </div>}
            {showProgressBar && <ProgressBar/>}
            <br/>
            <Button variant={"icon"} size={"cl"} onClick={handleResetMoodAndTrackSource}>
                <img src={restart} alt={"restart"} width={48}/>
            </Button>
            <TopArtist topArtist={topArtist} setTopArtist={setTopArtist}/>
            <hr style={{
                width: '98%',
                height: .2,
                backgroundColor: "hsla(0,0%,100%,.6)"
            }}/>
            <div style={{margin: "1rem 0", color: "hsla(0,0%,100%,.6)"}}>
                <Text variant={"sm"}>* Spotify's popularity of artist
                    calculated from the popularity of all the artist's tracks. </Text>
                <Text>This App is not intended to be a clone of Spotify but an extension of it.</Text>
                <Text>Copyright © 2024 - Built by Arelys Alvarez v1.0. </Text>
            </div>
        </CardContent>
    )
}
