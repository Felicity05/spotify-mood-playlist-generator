import React, {JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState} from "react"
import {RecentlyPlayedTracks, UserProfile, PlayHistoryObject} from "../types";
import {useAccessToken} from "../Context/AccessTokenContext";
import {Card} from "./Card";

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
        <Card>
            <img style={{borderRadius: '100px', width: '120px'}} src={userProfile?.images[1].url} alt={"user profile"}/>
            <h2 style={{color: "white"}}>Hi {userProfile?.display_name.split(" ")[0]}, so glad you are here!</h2>
            <h3 style={{color: "white"}}> {userProfile?.followers.total} followers * {userProfile?.followers.total! > 0 ? `nice!` : `ups`}</h3>
            <p style={{color: "white"}}>Public Playlists: ----- </p>

            {/*<button onClick={apiMethods.getRecentlyPlayed}>Get recently played songs</button>*/}
            {/*<div>{recentlyPlayedSongs.items.map((item, index) => {*/}
            {/*        return <p key={index}>{item.track.name} -- {item.track.popularity}</p>*/}
            {/*    })*/}
            {/*}*/}
            {/*</div>*/}
        </Card>
    )
}
