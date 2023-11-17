import {useEffect} from "react";
import {getAccessToken} from "../utils/auth";
import {useLocation, useNavigate} from "react-router-dom";

export const CallbackPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Handle the callback (e.g., exchange the authorization code for a token)
        handleOAuthCallback();
    }, []);

    const handleOAuthCallback = async () => {
        // Extract the authorization code from the URL
        const authorizationCode = new URLSearchParams(window.location.search).get('code');

        console.log(new URLSearchParams(window.location.search).get('code'))

        // Implement the token exchange using the authorization code
        await getAccessToken(authorizationCode);

        // Redirect to the home page after successful authorization
        navigate('/content');
    };


    return(
        <></>
    )
}
