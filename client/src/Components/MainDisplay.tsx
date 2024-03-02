import {Card} from "./Card";
import {Button} from "./Button";
import {
    addSelectedTracksToPlaylist,
    createNewPlaylist,
    getRecentlyPlayedTracks,
    getSeveralTracksAudioFeatures
} from "../api/api";
import {useEffect, useState} from "react";
import {useAccessToken} from "../Context/AccessTokenContext";
import {predictTrackMood} from "../api/model_predictions_api";
import TracksSourceSelector from "./TracksSourceSelector";
import {moodEncodingMap, MoodSelector} from "./MoodSelector";
import LogOut from "./LogOut";
import {useMoodSourceStore} from "../store/store";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import NewPlaylist from "./NewPlaylist";
import styled from "styled-components";
import {listTrackMoodUriSample} from "../api/API_response_sampes";

//TODO: add types for track object, artist object, clean up this component

type TrackMood = {
    trackUri: string,
    mood: string
}

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2rem;
`


export const MainDisplay = () => {
    const {userProfile} = useAccessToken();
    const {selectedMood: mood, selectedTrackSource: source,
            setSelectedMood: setMood, setSelectedTrackSource: setTrackSource} = useMoodSourceStore();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
    const [showNewPlaylist, setShowNewPlaylist] = useState<boolean>(false);

    const [listOfTracksMood, setListOfTracksMood] = useState<TrackMood[] | null>(null);
    const [playlistSize, setPlaylistSize] = useState(0);
    // const [recentlyPlayedTracksMoods, setRecentlyPlayedTracksMoods] = useState<TrackMood[] | null>(null);
    const [timeofDay, setTimeOfDay] = useState<string>("")
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
    },[])

    //extract handle playlist creation to a custom hook??

    const getTracksMoodForTrackSource = async (tracksSource: any[]) => {
        let listOfTracksIds: Set<string> = new Set();
        tracksSource.map(async item => {
            listOfTracksIds.add(item.track.id)
        })

        //convert the listOfTracksIds set into an Array and finally to a String
        const trackIdsList = [...listOfTracksIds].toString()
        // console.log("trackIdsList== ", trackIdsList)

        //make an api call to get the audio features of all the unique songs in the recently played list
        const listOfTracksAudioFeatures = await getSeveralTracksAudioFeatures(trackIdsList)
        const listOfAudioFeatures = listOfTracksAudioFeatures.audio_features
        // console.log("listOfTracksAudioFeatures== ", listOfTracksAudioFeatures)
        // console.log("listOfAudioFeatures== ", listOfAudioFeatures)

        //use my ML random_forest model to predict the mood for each song
        const tracksMoodList = await predictTrackMood(listOfAudioFeatures)
        // console.log("tracksMoodList== ", tracksMoodList)

        //creates an array of objects of track uri and predicted mood
        let listTrackMoodUri: TrackMood[] = []
        listOfAudioFeatures.map((track_features: { uri: string }, index: string | number) => {
            const value = {trackUri: track_features.uri, mood: tracksMoodList[index].toString()}
            listTrackMoodUri.push(value)
        })

        setListOfTracksMood(listTrackMoodUri)
        // setRecentlyPlayedTracksMoods(listTrackMoodUri);
        return listTrackMoodUri;
    }

    async function createPlaylistWithSelectedSongs(listTracksUri: string[]) {
        //map mood encoding to string value to pass to the create playlist function
        const playlistMood = Object.keys(moodEncodingMap).find(
            (key) => moodEncodingMap[key as keyof typeof moodEncodingMap] === mood)

        // console.log(userProfile!.id, " ---- ", playlistMood)

        //make api call to create playlist
        const newPlaylist = await createNewPlaylist(userProfile!.id, playlistMood!)
        // console.log("newPlaylist response== ", newPlaylist)

        //make api call to add the corresponding songs from the mood list to the playlist
        const tracksAdded = await addSelectedTracksToPlaylist(newPlaylist.id, listTracksUri)
        console.log("tracks added== ", tracksAdded)
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
        if(!listOfTracksMood){

            let tracksSource: any[] = []
            switch (source) {
                case 'recentlyPlayed':
                    //get recently played tracks
                    // tracksSource  = await getRecentlyPlayedTracks() //response type is playHistoryObject
                    console.log("get recently played tracks")
                    break;
                case 'topTracks':
                    console.log("get top tracks")
                    break;
                case 'topArtist':
                    console.log("get top 10 artist and for each artist get top 10 songs")
                    break;
            }

            //gets the mood for the unique list of tracks ids from the track source
            // listTrackMoodUri = await getTracksMoodForTrackSource(tracksSource);
            // console.log("listTrackMoodUri== ", listTrackMoodUri)
            listTrackMoodUri = listTrackMoodUriSample;
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

        if(playlist_size < 5){
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

            // await createPlaylistWithSelectedSongs(listTracksUri);

            // After the operation is done, hide the progress bar
            setShowProgressBar(false);

            // Show the new playlist
            setShowNewPlaylist(true);
            //show newly created playlist to the user
        }
    }

    const handleConfirm = () => {
        // Create playlist
        // add songs to the newly created playlist
        setShowModal(false);
        console.log("create playlist here -- need to work on this functionality")

    }

    const handleMoodModalOption= () => {
        //reset mood
        setMood("")
        setShowModal(false);
    }

    const handleTrackSourceModalOption= () => {
        //reset track source
        setTrackSource("")
        setShowModal(false);
    }

    const handleBothModalOptions= () => {
        // Reset mood and source
        setMood("")
        setTrackSource("")
        setShowModal(false);
    }

    return(
          <Card>
            <CardContent>
              {/*ToDo: style this logout at the  top right corner of the display*/}
              <LogOut />
              <h1 style={{color: "white"}}>Good {timeofDay}, {userProfile?.display_name.split(" ")[0]}</h1>
              <h2>Ready to experience a new way of generating your own custom playlist in one click? </h2>
              <p>Lets start by selecting from where you want to get your songs from</p>
              <TracksSourceSelector />
              {/*conditional rendering after selecting track source*/}
              {source &&
                  <>
                  <p>Ok, now that that's settled let's see how are you feeling today</p>
                  <MoodSelector />
                  </>
              }
              {/*conditional rendering once both mood and source are set */}
              {mood && source && !showNewPlaylist &&
                  <div>
                      <p>Nice! Now that you have made your selections, you are ready to get yor playlist, just click below </p>
                      <Button variant="primary" size="lg" onClick={handlePlaylistCreation}>Generate Playlist</Button>
                  </div>
              }
              {showNewPlaylist && <NewPlaylist />}
              {showProgressBar && <ProgressBar />}
                  <Modal
                      isOpen={showModal}
                      onClose={handleBothModalOptions}
                      onConfirm={handleConfirm}
                      handleMood={handleMoodModalOption}
                      handleTrackSource={handleTrackSourceModalOption}
                      handleBoth={handleBothModalOptions}
                      message={playlistSize.toString()}
                  />
              <h1>Your Top Artist last year</h1>
            </CardContent>
          </Card>
  )
}

{/*{recentlyPlayedTracks &&*/}
{/*    <>*/}
{/*        <h3 style={{color: "white"}}>Here are your recently played songs: </h3>*/}
{/*        <div>{recentlyPlayedTracks?.map((item: PlayHistory, index: number) => {*/}
{/*            return (*/}
{/*                <div key={index}>*/}
{/*                  <p style={{color: "white"}} key={index}> {item.track?.name} -- {item.track?.id} ---*/}
{/*                      {new Date(item.played_at).toLocaleString("en-US", {*/}
{/*                      timeZone: "America/New_York",*/}
{/*                      timeZoneName: "short",*/}
{/*                      hour12: true*/}
{/*                  })} </p>*/}
{/*                    /!*<div> {item.track.artists.map((artist: any, index: number) => {*!/*/}
{/*                    /!*    return <p key={index}> {artist.name} </p>*!/*/}
{/*                    /!*})}</div>*!/*/}
{/*                </div>*/}
{/*              )*/}
{/*        }) }</div>*/}
{/*    </> }*/}
