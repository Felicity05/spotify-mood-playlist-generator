import React from 'react';
import {LogInPage} from "./LogInPage";
import {useAccessToken} from "../Context/AccessTokenContext";
import {MainContent} from "../Components/MainContent/MainContent";
import music_mood from '../assets/music-mood.png';

export const Home = () => {
    const {isLoggedIn} = useAccessToken()
    console.log("is user logged in on Home component, value coming from hook context=", isLoggedIn)

    // if logged in go to AppContent page
    return (
        <div style={{width: "inherit", boxSizing: "border-box"}}>
            <MainContent/>
        </div>
    )
}
