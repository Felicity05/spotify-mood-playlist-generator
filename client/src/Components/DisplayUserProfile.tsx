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

    // console.log("user data= ", userProfile);

    // const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState(recentlyPlayedSongsInitialState);
    // console.log("recently played songs= ", recentlyPlayedSongs.items)
    return (
        <Card alignment="center" height="320px" >
            <img style={{borderRadius: '100px', width: '100px', marginBottom: '0.5rem'}} src={userProfile?.images[1].url} alt={"user profile"}/>
            <h3 style={{color: "white", margin: '0.3rem'}}> {userProfile?.followers.total} followers * {userProfile?.followers.total! > 0 ? `nice!` : `ups`}</h3>
            <p style={{color: "white", margin: '0.3rem'}}>Public Playlists: ----- </p>

            {/*<button onClick={apiMethods.getRecentlyPlayed}>Get recently played songs</button>*/}
            {/*<div>{recentlyPlayedSongs.items.map((item, index) => {*/}
            {/*        return <p key={index}>{item.track.name} -- {item.track.popularity}</p>*/}
            {/*    })*/}
            {/*}*/}
            {/*</div>*/}
        </Card>
    )
}
