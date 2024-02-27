import {Card} from "./Card";
import {Button} from "./Button";
import {getAudioFeatureForTrack, getRecentlyPlayedTracks, getSeveralTracksAudioFeatures} from "../api/api";
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
import {listTrackMoodUri} from "../api/API_response_sampes";
import Modal from "./Modal";

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

    //extract handle playlist creation to a custom hook,

    const handlePlaylistCreation = async () => {
        /*

        const response  = await getRecentlyPlayedTracks()
        // console.log(response);
        setRecentlyPlayedTracks(response ?? null);

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

        //----------------------

        //get audio features for each track of the response & predict the track mood
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
        const trackIdsList = [...listOfTracksIds].toString() //this need to be a string
        // console.log("trackIdsList== ", trackIdsList)

        const listOfTracksAudioFeatures = await getSeveralTracksAudioFeatures(trackIdsList)
        const listOfAudioFeatures = listOfTracksAudioFeatures.audio_features
        // console.log("listOfTracksAudioFeatures== ", listOfTracksAudioFeatures)
        console.log("listOfAudioFeatures== ", listOfAudioFeatures)

        //predict mood for each song
        const tracksMoodList = await predictTrackMood(listOfAudioFeatures)
        console.log("tracksMoodList== ", tracksMoodList)

        let listTrackMoodUri: TrackMood[] = []
        listOfAudioFeatures.map((track_features: { uri: string }, index: string | number) => {
            const value = {trackUri: track_features.uri, mood: tracksMoodList[index]}
            listTrackMoodUri.push(value)
        })
        console.log("listTrackMoodUri== ", listTrackMoodUri)
        */

        const selectedMoodListTracks = listTrackMoodUri.filter(track_mood => track_mood.mood === mood)
        console.log("selectedMoodListTracks== ", selectedMoodListTracks)

        const playlistSize = selectedMoodListTracks.length
        if(playlistSize < 5){
            setPlaylistSize(playlistSize)
            /* in a modal
                tell the user: there would be only 'playlistSize' songs on your playlist, are you sure you want to continue?
                if yes - create playlist and add songs
                if no - ask the user: what would you want to reset? mood, source or both
                depending on what the user selects, set the according variables to empty to reset teh state
                let the flow of the app continue as if it was staring over from the beginning
             */
            setShowModal(true)
        }

        //create playlist
        //make api call

        //add the songs from the list to the playlist
        //make api call

        //show newly created playlist to the user
    }

    const handleConfirm = () => {
        // Create playlist and add songs
        setShowModal(false);
        console.log("create playlist here now")
    }

    const handleCancel = () => {
        // Reset mood, source, or both
        setShowModal(false);
        console.log("handle reset state here")
    }


    const createPlaylist = (listOfTracks: string | any[], mood: any) => {

        console.log(mood)

        if(listOfTracks.length > 5) {
            console.log("create new playlist for mood", {mood})
        } else {
            console.log("I am in the function but i can't see the variables")
        }
    }

    // createPlaylist(listOfTracksMood, mood)

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
          {mood && source &&
              <>
                  <p>Nice! Now that you have made your selections, yu are ready to get yor playlist, just click below </p>
                  <Button onClick={handlePlaylistCreation}>Generate Playlist</Button>
              </>
          }
          {listOfTracksMood.length > 0 && listOfTracksMood.length < 5 &&
          //   display model with options
              <div>
              <dialog open >
                  <p>Your new playlist will have only {listOfTracksMood.length} songs</p>
                  <p>Are you sure you want to continue?</p>
                  <button>Yes</button>
                  <button>No</button>
              </dialog>
              </div>
          }
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
                  onClose={() => setShowModal(false)}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  message={playlistSize.toString()}
              />
          <h1>Your Top last year Artist</h1>
      </Card>
  )
}
