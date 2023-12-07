import React, {useEffect, useState} from 'react';
import music_mood from '../assets/music-mood.png';
import {DisplayUserProfile} from '../Components/DisplayUserProfile';
import {LogIn} from "../Components/LogIn";
import {useAccessToken} from "../Context/AccessTokenContext";
import {AppContent} from "./AppContent";

export const Home = () => {
    const { accessToken } = useAccessToken()

    // if logged in go to AppContent page
    return (
        <div>
            {!accessToken ?
            <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <h1> Welcome to the Mood Generator Playlist for Spotify</h1>
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <img src={music_mood} alt='music mood' width={'30%'} />
                    <h2>Please log in to get started</h2>
                    <LogIn /> {/*Log in component that triggers authentication and gets user profile data*/}
                </div>
            </div> :
                <div>
                    <h1>Yey!!! You are successfully logged in!</h1>
                    <AppContent />
                </div>
            }
        </div>
    )
}
