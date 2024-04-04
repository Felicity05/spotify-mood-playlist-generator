import React, {JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState} from "react"
import {RecentlyPlayedTracks, UserProfile, PlayHistoryObject} from "../../types";
import {useAccessToken} from "../../Context/AccessTokenContext";
import {Box} from "../UI Components/Box";
import {getPlaylistsForCurrentUser} from "../../api/api";

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

export const UserProfileSection = () => {
    const {userProfile} = useAccessToken();
    // console.log("user data= ", userProfile);
    //getFollowedArtist -> to display the number of artist the user is following

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img style={{borderRadius: '100px', width: '100px', marginBottom: '0.5rem'}}
                 src={userProfile?.images[1].url} alt={"user profile"}/>
            <h3 style={{color: "white", margin: '0.3rem'}}> {userProfile?.followers.total} followers
                * {userProfile?.followers.total! > 0 ? `nice!` : `ups`}</h3>
            <p style={{color: "white", margin: '0.3rem'}}>Public Playlists: {} </p>
        </div>
    )
}
