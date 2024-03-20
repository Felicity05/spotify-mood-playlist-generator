import React from 'react';
import music_mood from '../assets/music-mood.png';
import {LogIn} from "../Components/UI Components/LogIn";
import {useAccessToken} from "../Context/AccessTokenContext";
import {MainContent} from "../Components/MainContent/MainContent";

export const Home = () => {
    const {accessToken} = useAccessToken()
    // console.log("accessToken from Home component coming from hook context=", accessToken)

    // if logged in go to AppContent page
    return (
        <div>
            {!accessToken ?
                <div style={{display: "flex", alignItems: "center", flexDirection: "column", color: "white"}}>
                    <h1> Welcome to the Mood Generator Playlist for Spotify</h1>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <img src={music_mood} alt='music mood' width={'30%'}/>
                        <h2>Please log in to get started</h2>
                        <LogIn/> {/*Log in component that triggers authentication and gets user profile data*/}
                    </div>
                </div>
                : <MainContent/>
            }
        </div>
    )
}
