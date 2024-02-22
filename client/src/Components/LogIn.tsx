import React from "react";
import {initiateAuthentication} from "../utils/auth";
import {Button} from "./Button";

export const LogIn: React.FC = () => {

    const handleLogin = async () => {
        // Implement the OAuth authorization process
        await initiateAuthentication();
        console.log("inside log in component")
    }


    return(
        <div>
            <Button background_color={'#1DB954'} onClick={handleLogin}>
                Log In with Spotify
            </Button>
        </div>
    )
}
