import {Card} from "./Card";
import {Button} from "./Button";
import {getAudioFeatureForTrack, getRecentlyPlayedTracks} from "../api/api";
import {useState} from "react";
import {TOKEN_STORAGE_KEY} from "../utils/auth";
import {useAccessToken} from "../Context/AccessTokenContext";
import {TrackAudioFeatures} from "../utils/trackTypes";
import {classifyTrack} from "../utils/moodClassification";

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

export const MainDisplay = () => {
    const {setAccessToken} = useAccessToken();
    const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<PlayHistory[] | null>(null);
    const [newPlaylist, setNewPaylist] = useState();
    const [selectedMood, setSelectedMood] = useState("");
    const handleMoodSelection = (mood: string) => {
        // Update the selected mood
        setSelectedMood(mood);
    };
    const handlePlaylistCreation = async () => {
        const response  = await getRecentlyPlayedTracks()
        // console.log(response);
        setRecentlyPlayedTracks(response ?? null);

        /* for testing purposes
             const audioFeature: TrackAudioFeatures = await getAudioFeatureForTrack("3S7HNKPakdwNEBFIVTL6dZ");
             console.log(audioFeature);
             console.log(classifyTrack(audioFeature));
         */

        //get audio feature for each track of the response
        let listOfTracks: string[] = [];
        response.map(async item => {
            let audioFeature: TrackAudioFeatures | undefined = undefined;
            audioFeature = await getAudioFeatureForTrack(item.track.id);

            //classify the songs according to the selected mood & add them to a list
            const trackMood = classifyTrack(audioFeature)
            if(trackMood?.toLowerCase() === selectedMood) listOfTracks.push(item.track.uri)

            console.log(item.track.name, " -- ", trackMood);

            return listOfTracks;
        })

        console.log(listOfTracks);

        //create playlist

        //add the songs from the list to the playlist

        //show newly created playlist to the user
    }

    const handleLogOut = () => {
        setAccessToken(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    return(
      <Card>
          <Button background_color={'#1DB954'} onClick={handleLogOut}>Log Out</Button> <br/>
          <h1 style={{color: "white"}}>Good Afternoon</h1>
          <p>Ready to experience a new way of generating your own custom playlist in one click? </p>
          <p>Choose how you are feeling from below </p>
          <div style={{display: "flex"}}>
              <Button fontSize={'15px'} value={"happy"} onClick={() => handleMoodSelection("happy")} >Happy</Button>
              <Button fontSize={'15px'} onClick={() => handleMoodSelection("sad") } >Sad</Button>
              <Button fontSize={'15px'} onClick={() => handleMoodSelection("energetic") } >Energetic</Button>
              <Button fontSize={'15px'} onClick={() => handleMoodSelection("calm") } >Calm</Button>
          </div>
          <p>Selected mood: {selectedMood || 'None'}</p>
          <p>Choose from where do you want your songs</p>
          <div style={{display: "flex"}}>
          <Button>Recently listened</Button>
          <Button>Top Artists</Button>
          <Button>Top Songs</Button>
          </div>
          <br/>
          <Button onClick={handlePlaylistCreation}>Generate Playlist</Button>
          <h3 style={{color: "white"}}>Here are your recently played songs: </h3>
          <div>{recentlyPlayedTracks?.map((item: PlayHistory, index: number) => {
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
          <h1>Your Top last year Artist</h1>

          {/*<MoodSelector />*/}
      </Card>
  )
}
