import React from 'react';
import {Button} from "./Button";
import {TOKEN_STORAGE_KEY} from "../utils/auth";
import {useAccessToken} from "../Context/AccessTokenContext";

const LogOut = () => {
    const {setAccessToken} = useAccessToken();
    const handleLogOut = () => {
        setAccessToken(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    return (
        <div>
            <Button background_color={'#1DB954'} onClick={handleLogOut}>Log Out</Button> <br/>
        </div>
    );
}

export default LogOut;
