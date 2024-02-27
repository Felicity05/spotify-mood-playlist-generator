import {Card} from "./Card";
import {Button} from "./Button";
import {
    addSelectedTracksToPlaylist,
    createNewPlaylist,
    getAudioFeatureForTrack,
    getRecentlyPlayedTracks,
    getSeveralTracksAudioFeatures
} from "../api/api";
import {useState} from "react";
import {TOKEN_STORAGE_KEY} from "../utils/auth";
import {useAccessToken} from "../Context/AccessTokenContext";
import {TrackAudioFeatures} from "../utils/trackTypes";
import {classifyTrack} from "../utils/moodClassification";
import {predictTrackMood} from "../api/model_predictions_api";
import TracksSourceSelector from "./TracksSourceSelector";
import {moodEncodingMap, MoodSelector} from "./MoodSelector";
import LogOut from "./LogOut";
import {useMoodSourceStore} from "../store/store";
import {listTrackMoodUri, testPlaylist} from "../api/API_response_sampes";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import NewPlaylist from "./NewPlaylist";

interface RecentlyPlayedTrack {
    limit: number;
    next: string;

    items: PlayHistory []
    // Add other properties as needed
}

export interface PlayHistory {
        track: {
            name: string;
            href: string;
            id: string;
            popularity: number; //global song popularity
            preview_url: string;
            uri: string;
            artists: [{
                id: string;
                name: string;
            }]
        };
        played_at: string;
}

//TODO: add types for track object, artist object, clean up this component, fix the warning and errors on the console related to styled components

type TrackMood = {
    trackUri: string,
    mood: string
}


export const MainDisplay = () => {
    const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<PlayHistory[] | null>(null);
    const [listOfTracksMood, setListOfTracksMood] = useState<TrackMood[]>([]);
    const {selectedMood: mood, selectedTrackSource: source,
            setSelectedMood: setMood, setSelectedTrackSource: setTrackSource} = useMoodSourceStore();
    const [playlistSize, setPlaylistSize] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [newPlaylistTracks, setNewPlaylistTracks] = useState("");
    const {userProfile} = useAccessToken();
    const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
    const [showNewPlaylist, setShowNewPlaylist] = useState<boolean>(false);

    //extract handle playlist creation to a custom hook,

    const handlePlaylistCreation = async () => {
        setShowProgressBar(true);

        let response: any[] = []
        switch (source) {
            case 'recentlyPlayed':
                //get recently played tracks
                response  = await getRecentlyPlayedTracks()
                // console.log(response);
                setRecentlyPlayedTracks(response ?? null);
                break;
            case 'topArtist':
                console.log("get top 10 artist and for each artist get top 10 songs")
                break;
            case 'topTracks':
                console.log("get top tracks")
        }

        /* for testing purposes
        const audioFeature: TrackAudioFeatures = await getAudioFeatureForTrack("2r9CbjYgFhtAmcFv1cSquB");
        console.log(audioFeature);

        const bestAudioFeatures = {
            duration_ms: audioFeature.duration_ms,
            danceability: audioFeature.danceability,
            acousticness: audioFeature.acousticness,
            energy: audioFeature.energy,
            instrumentalness: audioFeature.instrumentalness,
            valence: audioFeature.valence,
            speechiness: audioFeature.speechiness,
            tempo: audioFeature.tempo
        }

        const trackMood = await predictTrackMood(bestAudioFeatures)
        console.log("trackMood= ", trackMood.toString()); //I get the mood encoded, so I have to work with a map for my encoding
        */
        //----------------------

        //creates a unique list of tracks ids from the response
        let listOfTracks: TrackMood[] = [];
        let listOfTracksIds: Set<string> = new Set();
        response.map(async item => {
            listOfTracksIds.add(item.track.id)

            // let audioFeature: TrackAudioFeatures | undefined = undefined;
            // audioFeature = await getAudioFeatureForTrack(item.track.id);
            // console.log(audioFeature)

            // const bestAudioFeatures = {
            //     duration_ms: audioFeature.duration_ms,
            //     danceability: audioFeature.danceability,
            //     acousticness: audioFeature.acousticness,
            //     energy: audioFeature.energy,
            //     instrumentalness: audioFeature.instrumentalness,
            //     valence: audioFeature.valence,
            //     speechiness: audioFeature.speechiness,
            //     tempo: audioFeature.tempo
            // }

            //predict mood for each song
            // const trackMood = await predictTrackMood(bestAudioFeatures)

            // if(trackMood.toString() === mood) {
            //     listOfTracks.add(item.track.uri)
            // }

            // const value = {trackUri: item.track.uri, mood: trackMood.toString()}

            // Check if an object with the same trackUri already exists in the list
            // if (!listOfTracks.some(track => track.trackUri === value.trackUri)) {
            //     // If not, add the object to the list
            //     listOfTracks.push(value);
            // }

            // console.log(item.track.name, " -- ", trackMood);

        })
        //convert the listOfTracksIds set into an Array and finally to a String
        const trackIdsList = [...listOfTracksIds].toString() //this need to be a string
        // console.log("trackIdsList== ", trackIdsList)

        //make an api call to get the audio features of all the unique songs in the recently played list
        const listOfTracksAudioFeatures = await getSeveralTracksAudioFeatures(trackIdsList)
        const listOfAudioFeatures = listOfTracksAudioFeatures.audio_features
        // console.log("listOfTracksAudioFeatures== ", listOfTracksAudioFeatures)
        console.log("listOfAudioFeatures== ", listOfAudioFeatures)

        //use my ML random_forest model to predict the mood for each song
        const tracksMoodList = await predictTrackMood(listOfAudioFeatures)
        console.log("tracksMoodList== ", tracksMoodList)

        //creates a map of track uri and predicted mood
        let listTrackMoodUri: TrackMood[] = []
        listOfAudioFeatures.map((track_features: { uri: string }, index: string | number) => {
            const value = {trackUri: track_features.uri, mood: tracksMoodList[index].toString()}
            listTrackMoodUri.push(value)
        })
        console.log("listTrackMoodUri== ", listTrackMoodUri)

        //filters recently played tracks according to the selected Mood
        const selectedMoodListTracks = listTrackMoodUri.filter(track_mood => track_mood.mood === mood)
        console.log("selectedMoodListTracks== ", selectedMoodListTracks)

        //creates a string Array of tracks uris to add the playlist
        const listTracksUri = selectedMoodListTracks.flatMap(track => track.trackUri)
        console.log("listTracksUri==", listTracksUri.toString())
        setNewPlaylistTracks(listTracksUri.toString())

        // sets the playlist size and decides whether to continue with the playlist creation process or no
        const playlistSize = selectedMoodListTracks.length
        if(playlistSize < 5){
            setPlaylistSize(playlistSize)
            setShowModal(true)
            setShowProgressBar(false);
            /* in a modal
                tell the user: there would be only 'playlistSize' songs on your playlist, are you sure you want to continue?
                if yes - create playlist and add songs
                if no - ask the user: what would you want to reset? mood, source or both
                depending on what the user selects, set the according variables to empty to reset teh state
                let the flow of the app continue as if it was staring over from the beginning
             */
        } else {
            console.log("create playlist here, call api here")

            //map mood encoding to string value
            const playlistMood = Object.keys(moodEncodingMap).find(
                (key) => moodEncodingMap[key as keyof typeof moodEncodingMap] === mood)

            console.log(userProfile!.id, " ---- ", playlistMood)
            //make api call to create playlist
            const newPlaylist = await createNewPlaylist(userProfile!.id, playlistMood!)
            console.log("newPlaylist response== ", newPlaylist)

            //make api call to add the corresponding songs from the mood list to the playlist
            const tracksAdded = await addSelectedTracksToPlaylist(newPlaylist.id, listTracksUri)
            console.log("tracks added== ", tracksAdded)

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
        console.log("create playlist here now")
    }

    const handleMood= () => {
        //reset mood
        setMood("")
        setShowModal(false);
    }

    const handleTrackSource= () => {
        //reset mood
        setTrackSource("")
        setShowModal(false);
    }

    const handleBoth= () => {
        // Reset mood, source, or both
        setMood("")
        setTrackSource("")
        setShowModal(false);
    }

    return(
      <Card>
          {/*ToDo: style this logout at the right top corner of the display*/}
          <LogOut/>
          <h1 style={{color: "white"}}>Good Afternoon</h1>
          <p>Ready to experience a new way of generating your own custom playlist in one click? </p>
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
              <>
                  <p>Nice! Now that you have made your selections, you are ready to get yor playlist, just click below </p>
                  <Button onClick={handlePlaylistCreation}>Generate Playlist</Button>
              </>
          }
          {showNewPlaylist && <NewPlaylist />}
          {showProgressBar && <ProgressBar />}
          {recentlyPlayedTracks &&
              <>
                  <h3 style={{color: "white"}}>Here are your recently played songs: </h3>
                  <div style={{overflowY: "scroll"}}>{recentlyPlayedTracks?.map((item: PlayHistory, index: number) => {
                      return (
                          <div key={index}>
                            <p style={{color: "white"}} key={index}> {item.track?.name} -- {item.track?.id} ---
                                {new Date(item.played_at).toLocaleString("en-US", {
                                timeZone: "America/New_York",
                                timeZoneName: "short",
                                hour12: true
                            })} </p>
                              {/*<div> {item.track.artists.map((artist: any, index: number) => {*/}
                              {/*    return <p key={index}> {artist.name} </p>*/}
                              {/*})}</div>*/}
                          </div>
                        )
                  }) }</div>
              </> }
              <Modal
                  isOpen={showModal}
                  onClose={handleBoth}
                  onConfirm={handleConfirm}
                  handleMood={handleMood}
                  handleTrackSource={handleTrackSource}
                  handleBoth={handleBoth}
                  message={playlistSize.toString()}
              />
          <h1>Your Top last year Artist</h1>
      </Card>
  )
}
