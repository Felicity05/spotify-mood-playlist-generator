// AccessTokenContext.js
import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {clearAccessToken, exchangeAccessToken, getAccessToken, initiateAuthentication} from "../utils/auth";
import {useNavigate} from "react-router-dom";

interface AccessTokenContextProps {
    accessToken: string | null | undefined;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
    initiateLogin: () => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    loading: boolean;
}

const AccessTokenContext = createContext<AccessTokenContextProps | undefined>(undefined);
const LOGGED_IN_KEY = "isLoggedIn"

const AccessTokenProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [accessToken, setAccessToken] = useState<string | null | undefined>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        // Retrieve the initial state from localStorage
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getAccessToken();
                if (token) {
                    setAccessToken(token);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error fetching access token: ", error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        fetchToken().then(r => console.log("Fetching token ", r));
    }, [])


    const handleOAuthCallback = useCallback(async () => {
        // Extracts the authorization code from the URL
        const authorizationCode = new URLSearchParams(window.location.search).get('code');
        // console.log("authorizationCode= ", authorizationCode);

        if (authorizationCode) {
            try {
                const authorizationResponse = await exchangeAccessToken(authorizationCode);
                const accessToken = authorizationResponse.access_token;

                setAccessToken(accessToken);
                setIsLoggedIn(true);
                localStorage.setItem(LOGGED_IN_KEY, "true");
                // console.log("accessToken from access token context== ", accessToken);
                navigate('/');
            } catch (error) {
                console.error('Error handling OAuth callback:', error);
                clearAccessToken();
                setIsLoggedIn(false);
                localStorage.setItem(LOGGED_IN_KEY, "false");
                navigate('/');
            }
        } else {
            //TO DO: handle cancel authorization and stop authorization flow
            //redirect to home page and explain why authorization is needed to use the app
            console.error('Authorization code not found in callback.');
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (window.location.pathname === '/callback') {
            handleOAuthCallback()
                .then(r => console.log("Handling the OAuth callback ", r));
        }
    }, [handleOAuthCallback]);

    useEffect(() => {
        // Store the state in localStorage whenever it changes
        localStorage.setItem(LOGGED_IN_KEY, isLoggedIn.toString());
    }, [isLoggedIn]);

    const initiateLogin = () => {
        initiateAuthentication()
            .then(r => console.log("Initiating authentication for the first time ", r));
    };

    return (
        <AccessTokenContext.Provider
            value={{accessToken, setAccessToken, initiateLogin, isLoggedIn, setIsLoggedIn, loading}}>
            {children}
        </AccessTokenContext.Provider>
    );
};

const useAccessToken = (): AccessTokenContextProps => {
    const context = useContext(AccessTokenContext);
    if (!context) {
        throw new Error('useAccessToken must be used within an AccessTokenProvider');
    }
    return context;
};

export {AccessTokenProvider, useAccessToken};
