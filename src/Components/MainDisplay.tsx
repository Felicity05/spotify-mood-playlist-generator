import {Card} from "./Card";
import {Button} from "./Button";
import {getRecentlyPlayedTracks} from "../api/api";
import {useState} from "react";
import {TOKEN_STORAGE_KEY} from "../utils/auth";
import {useAccessToken} from "../Context/AccessTokenContext";

interface RecentlyPlayedTrack {
    limit: number;
    next: string;

    items: PlayHistory []
    // Add other properties as needed
}

interface PlayHistory {
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
    const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<RecentlyPlayedTrack | null>(null);
    const handlePlaylistCreation = async () => {
        const response  = await getRecentlyPlayedTracks()
        setRecentlyPlayedTracks(response?.data ?? null);

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
              <Button fontSize={'15px'}>Happy</Button>
              <Button fontSize={'15px'}>Sad</Button>
              <Button fontSize={'15px'}>Energetic</Button>
              <Button fontSize={'15px'}>Calm</Button>
          </div>
          <p>Choose from where do you want your songs</p>
          <div style={{display: "flex"}}>
          <Button>Recently listened</Button>
          <Button>Top Artists</Button>
          <Button>Top Songs</Button>
          </div>
          <br/>
          <Button onClick={handlePlaylistCreation}>Generate Playlist</Button>
          <h3 style={{color: "white"}}>Here are your recently played songs: </h3>
          <div style={{  overflowY: "scroll"}}>{recentlyPlayedTracks?.items?.map((item: PlayHistory, index: number) => {
              return (
                  <div>
                    <p style={{color: "white"}} key={index}> {item.track?.name} -- {item.track?.id} </p>
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
