import {SetStateAction, useEffect} from "react";
import {exchangeAccessToken, getAccessToken} from "../utils/auth";
import {useNavigate} from "react-router-dom";
import {useAccessToken} from "../Context/AccessTokenContext";
import {UserProfile} from "../types";
import {getUserProfileData} from "../api/api";

export const CallbackPage = () => {
    const navigate = useNavigate();
    const {setAccessToken, setUserProfile} = useAccessToken();
    let accessToken = "";
    let userProfileData: SetStateAction<UserProfile | null> = null;

    useEffect(() => {
        // Handle the callback (e.g., exchange the authorization code for a token)
        handleOAuthCallback()
            // .then(() => {
            //     // Set the access token in the context
            //     setAccessToken(accessToken);
            //
            //     setUserProfile(userProfileData);
            //     // Navigate to the home page
            //     navigate('/');
            // })
            // .catch((error) => {
            //     console.error('Authentication error:', error);
            // });
    },[]);

    const handleOAuthCallback = async () => {
        // Extracts the authorization code from the URL
        const authorizationCode = new URLSearchParams(window.location.search).get('code');

        if (authorizationCode) {
            try {
                const authorizationResponse = await exchangeAccessToken(authorizationCode);
                accessToken = authorizationResponse.access_token;

                const userProfileResponse = await getUserProfileData();
                userProfileData = userProfileResponse.data;

                setAccessToken(accessToken);
                setUserProfile(userProfileData);
                navigate('/');
            } catch (error) {
                console.error('Error handling OAuth callback:', error);
            }
        } else {
            console.error('Authorization code not found in callback.');
        }

        // // Implements the token exchange using the authorization code
        // const authorizationResponse = await exchangeAccessToken(authorizationCode);
        // accessToken = authorizationResponse.access_token;
        //
        // const userProfileResponse = await getUserProfileData()
        // userProfileData = userProfileResponse.data
    };


    return(
        <></>
    )
}
