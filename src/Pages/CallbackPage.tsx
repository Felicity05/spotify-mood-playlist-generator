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
        // handleOAuthCallback()

        async function handleOAuthCallback() {
            // Extracts the authorization code from the URL
            const authorizationCode = new URLSearchParams(window.location.search).get('code');
            console.log("authorizationCode= ", authorizationCode);

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
                //TO DO: handle cancel authorization and stop authorization flow
                //redirect to home page and explain why authorization is needed to use the app
                console.error('Authorization code not found in callback.');
            }
        }

        handleOAuthCallback();

    },[]);

    return(
        <></>
    )
}
