import axios from "axios";
import {AuthorizationResponse} from "./authTypes";

// Constants needed for authentication
const CLIENT_ID = 'd5398f16c9b246898c33eda2ca52a59f'
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/callback'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RESPONSE_TYPE = 'code'
const CODE_CHALLENGE_METHOD = "S256"
const SCOPES = "user-read-private user-read-email user-top-read user-read-recently-played " +
    "playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private " +
    "user-follow-read"

export const TOKEN_STORAGE_KEY = 'spotifyAccessToken';
const REFRESH_TOKEN_STORAGE_KEY = 'spotifyRefreshToken';
const TOKEN_EXPIRY_STORAGE_KEY = 'spotifyTokenExpiry';
let accessToken: string | null = null;

console.log("REDIRECT_URI== ", REDIRECT_URI)

// the next 2 functions were extracted from: https://github.com/spotify/spotify-web-api-ts-sdk/blob/main/src/auth/AccessTokenHelpers.ts
// Function to generate a random code verifier
const generateCodeVerifier = (length: number): string => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// Function to generate the code challenge from the code verifier
const generateCodeChallenge = async (codeVerifier: string) => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const digestBytes = [...new Uint8Array(digest)];
    const hasBuffer = typeof Buffer !== 'undefined';

    const digestAsBase64 = hasBuffer
        ? Buffer.from(digest).toString('base64')
        : btoa(String.fromCharCode.apply(null, digestBytes));

    return digestAsBase64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export const initiateAuthentication = async (): Promise<void> => {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: SCOPES,
        response_type: RESPONSE_TYPE,
        code_challenge_method: CODE_CHALLENGE_METHOD,
        code_challenge: challenge,
    });

    window.location.href = `${AUTH_ENDPOINT}?${params.toString()}`;
}

export const exchangeAccessToken = async (code: string | null): Promise<AuthorizationResponse> => {
    const verifier = localStorage.getItem('verifier');

    //first time to log in
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code: code!,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier!,
    });

    try {
        const response = await axios.post(TOKEN_ENDPOINT, params);
        console.log(response.data)
        setAccessTokenAndExpirationTime(response.data.access_token, response.data.expires_in);
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, response.data.refresh_token);
        return response.data;
    } catch (error: any) {
        console.error('Error exchanging access token:', error);
        console.log(error.message);
        throw error;
    }
}

const refreshAccessToken = async (): Promise<string> => {
    const refresh_token = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: refresh_token!,
    });

    try {
        const response = await axios.post(TOKEN_ENDPOINT, params);
        setAccessTokenAndExpirationTime(response.data.access_token, response.data.expires_in);
        if (response.data.refresh_token) {
            localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, response.data.refresh_token);
        }
        return response.data.access_token;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}

export const setAccessTokenAndExpirationTime = (token: string, expiresIn: number): void => {
    accessToken = token;
    const expiryTime = Date.now() + expiresIn * 1000;
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(TOKEN_EXPIRY_STORAGE_KEY, expiryTime.toString());
};

export const getAccessToken = async (): Promise<string | null> => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const expiryTime = parseInt(localStorage.getItem(TOKEN_EXPIRY_STORAGE_KEY) || '0', 10);
    // console.log("storedToken== ", storedToken)
    // console.log("time now== ", Date.now(), "token expiration time== ", expiryTime)
    // console.log("after authenticated==", storedToken && Date.now() < expiryTime)

    if (storedToken && Date.now() < expiryTime) {
        accessToken = storedToken;
        // console.log("accessToken== ", accessToken)
    } else if (localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)) {
        try {
            accessToken = await refreshAccessToken();
        } catch (error) {
            clearAccessToken();
            console.log("Error getting the refresh token: ", error)
            throw error;
        }
    }
    return accessToken;
};

export const clearAccessToken = () => {
    accessToken = null;
    localStorage.clear();
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_STORAGE_KEY);
};
