import {JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState} from "react"
import {RecentlyPlayedTracks, UserProfile, PlayHistoryObject} from "../types";
import axios from "axios";

interface ContentProps {
    logOutFunction?: () => void
    userData?: UserProfile | null
    token?: string
}

const recentlyPlayedSongsInitialState: RecentlyPlayedTracks = {
    href: "",
    limit: 0,
    next: "",
    total: 0,
    items: []
}

export const DisplayUserProfile = () => {

    // const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState(recentlyPlayedSongsInitialState);
    // console.log("recently played songs= ", recentlyPlayedSongs.items)
    return (
        <div>
            <img style={{borderRadius: '10px'}} src={""} alt={"user profile"}/>
            <h2>Hi "userName goes here" </h2>

            <p>Followers: --- </p>

            <p>Current Playlists: --- </p>

            {/*<button onClick={handleRecentlyPlayed}>Get recently played songs</button>*/}
            <br/>
            <br />

            {/*<div>{recentlyPlayedSongs.items.map((item, index) => {*/}
            {/*        return <p key={index}>{item.track.name} -- {item.track.popularity}</p>*/}
            {/*    })*/}
            {/*}*/}
            {/*</div>*/}



            <br/>
            <br />
            {/* pass mood to this action */}
            {/*<button onClick={generateMoodPlaylist}> Generate Playlist</button>*/}
            <br />
            <br/>
            {/*<button onClick={logOutFunction}>Log Out</button>*/}
        </div>
    )
}
