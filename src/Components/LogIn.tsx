import React from "react";
import {initiateAuthentication} from "../utils/auth";

export const LogIn: React.FC = () => {

    const handleLogin = async () => {
        // Implement the OAuth authorization process
        await initiateAuthentication();
        console.log("inside log in component")
    }


    return(
        <div>
            <button onClick={handleLogin}>Log In with Spotify</button>
        </div>
    )
}
