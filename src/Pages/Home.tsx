import React, {useEffect, useState} from 'react';
import music_mood from '../assets/music-mood.png';
import {Content} from '../Components/Content';
import axios from 'axios';

export const Home = () => {

    // needed for authentication
    const CLIENT_ID = 'd5398f16c9b246898c33eda2ca52a59f'
    const REDIRECT_URI = 'http://localhost:3000'
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const RESPONSE_TYPE = 'token'

    const [token, setToken] = useState("");
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            let urlParams = new URLSearchParams(window.location.hash.replace("#", "?"))
            let token = urlParams.get('access_token')

            console.log("token= ", token)

            window.location.hash = ""
            if (token) window.localStorage.setItem("token", token)
        }

        if (token) {
            setToken(token)
            getUserProfileInfo(token).then(response => {
                    setUserData(response.data)
                    console.log(response)
                });
        }
    }, [])

    const handleLogOut = (): void => {
        setToken("");
        window.localStorage.removeItem("token")
    }

    const redirectToAuthCodeFlow = async () => {

        const params = new URLSearchParams()
        params.append("client_id", CLIENT_ID)
        params.append("response_type", RESPONSE_TYPE)
        params.append("redirect_uri", REDIRECT_URI)
        params.append("scope", "user-read-private user-read-email user-read-recently-played playlist-modify-public playlist-modify-private")

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
    }

    // get user data 
    const getUserProfileInfo = async (token: string) => {
        return await axios.get("https://api.spotify.com/v1/me", {
            headers: {Authorization: `Bearer ${token}`}
        });
    }

    // if(token) getUserProfileInfo(token).then(response => {
    //     setUserData(response.data)
    //     console.log(response)
    // });

    return (
        <div>
            <h1> Welcome to the Mood Generator Playlist for Spotify</h1>
            {!token ?
                <div>
                    <img src={music_mood} alt='music mood' width={'30%'} />
                    <h2>Please log in to get started</h2>
                    {/* <a className='App-link' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                        Log In</a> */}
                    <button onClick={redirectToAuthCodeFlow}>Log In</button>
                </div> : <Content token={token} userData={userData} logOutFunction={handleLogOut} />
            }
        </div>
    )
}
