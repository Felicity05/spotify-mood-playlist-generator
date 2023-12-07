import React, {JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState} from "react"
import {RecentlyPlayedTracks, UserProfile, PlayHistoryObject} from "../types";
import {useAccessToken} from "../Context/AccessTokenContext";

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
    const {userProfile} = useAccessToken();

    console.log("user data= ", userProfile);

    // const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState(recentlyPlayedSongsInitialState);
    // console.log("recently played songs= ", recentlyPlayedSongs.items)
    return (
        <div>
            <img style={{borderRadius: '10px'}} src={userProfile?.images[1].url} alt={"user profile"}/>
            <h2>Hi {userProfile?.display_name} so glad you are here!!</h2>

            <h3>You have {userProfile?.followers.total} followers, {userProfile?.followers.total! > 0 ? `nice!` : `ups`}</h3>

            <p>Current Playlists: ----- </p>

            {/*<button onClick={apiMethods.getRecentlyPlayed}>Get recently played songs</button>*/}
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
