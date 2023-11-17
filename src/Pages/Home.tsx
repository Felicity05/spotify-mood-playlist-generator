import React, {useEffect, useState} from 'react';
import music_mood from '../assets/music-mood.png';
import {Content} from '../Components/Content';
import {LogIn} from "../Components/LogIn";

export const Home = () => {

    return (
        <div>
            <h1> Welcome to the Mood Generator Playlist for Spotify</h1>
            {/* {!code ? */}
                <div>
                    <img src={music_mood} alt='music mood' width={'30%'} />
                    <h2>Please log in to get started</h2>
                    {/* <a className='App-link' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                        Log In</a> */}
                    <LogIn />
                    <button onClick={()=>(console.log('clicked'))}>Log In</button>
                    </div>
                {/* </div> : <p>you are already logged in </p>
                 // <Content token={token} userData={userData} logOutFunction={handleLogOut} />
            } */}
        </div>
    )
}
