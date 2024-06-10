import React from 'react';
import {LogIn} from "../Components/UI Components/LogIn";
import {useAccessToken} from "../Context/AccessTokenContext";
import {MainContent} from "../Components/MainContent/MainContent";
import music_mood from '../assets/music-mood.png';

export const Home = () => {
    const {accessToken} = useAccessToken()
    // console.log("accessToken from Home component coming from hook context=", accessToken)

    // if logged in go to AppContent page
    return (
        <div style={{width: "inherit", boxSizing: "border-box"}}>
            {!accessToken ?
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "white",
                }}>
                    <h1>Welcome to Moodify</h1>
                    <h3>Your Personal Mood Generator Playlist for Spotify</h3>
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
