import {useEffect} from "react";
import {getAccessToken} from "../utils/auth";
import {useLocation, useNavigate} from "react-router-dom";
import {getUserProfileData} from "../api/api";

export const CallbackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Handle the callback (e.g., exchange the authorization code for a token)
        handleOAuthCallback();
    });

    const handleOAuthCallback = async () => {
        // Extracts the authorization code from the URL
        const authorizationCode = new URLSearchParams(window.location.search).get('code');

        // Implements the token exchange using the authorization code
        const authorizationResponse = await getAccessToken(authorizationCode);

        //TODO: store access token somewhere securely on my app

        //retrieves user data ToDo: pass user data to DisplayUserDetails Component
        await getUserProfileData(authorizationResponse.access_token)

        //TODO: Redirect to the home page after successful authorization
        navigate('/content');
    };


    return(
        <></>
    )
}
