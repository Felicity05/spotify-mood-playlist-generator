import React from "react";
import {Button} from "../Components/UI Components/Button";
import {useAccessToken} from "../Context/AccessTokenContext";
import music_mood from "../assets/music-mood.png";
import {Box} from "../Components/UI Components/Box";

export const LogInPage: React.FC = () => {
    const {initiateLogin} = useAccessToken();

    const handleLogin = async () => {
        // Initiates the OAuth authorization process
        await initiateLogin();
        console.log("inside log in component")
    }


    return (
        <div style={{height: "100vh", backgroundColor: "black", padding: "0.5rem", boxSizing: "border-box"}}>
            <Box alignment={"center"}>
                <h1>Welcome to Moodify</h1>
                <h3>Your Personal Mood Playlist Generator for Spotify</h3>
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <img src={music_mood} alt='music mood' width={'30%'}/>
                    <h2>Please log in to get started</h2>
                    <div style={{marginBottom: "0.5rem"}}>
                        <Button variant="primary" size="lg"
                                onClick={handleLogin}> {/*Log in component that triggers authentication and gets user profile data*/}
                            Log In with Spotify
                        </Button>
                    </div>
                </div>
            </Box>
        </div>
    )
}
