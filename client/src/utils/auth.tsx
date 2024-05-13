import axios, {AxiosError} from "axios";
import {AuthorizationResponse} from "./authTypes";

// needed for authentication
const CLIENT_ID = 'd5398f16c9b246898c33eda2ca52a59f'
const REDIRECT_URI = 'http://localhost:3000/callback'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RESPONSE_TYPE = 'code'
const CODE_CHALLENGE_METHOD = "S256"
const SCOPES = "user-read-private user-read-email user-top-read user-read-recently-played " +
    "playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private " +
    "user-follow-read"
export const TOKEN_STORAGE_KEY = 'spotifyAccessToken';
let accessToken: string | null = null;

// this part extracted from: https://github.com/spotify/spotify-web-api-ts-sdk/blob/main/src/auth/AccessTokenHelpers.ts
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

    // TODO: learn what the heck is all these
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

export const initiateAuthentication = async () => {
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
    const refresh_token = localStorage.getItem('refresh_token');
    console.log("verifier==  ", verifier);
    console.log("refresh token==  ", refresh_token);

    // Check if the token is expired
    // if (!refresh_token) {
    //     throw new Error('Refresh token not found');
    // }

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
        setAccessToken(response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        return response.data;
    } catch (error: any) {
        // If the token is expired, use the refresh token to get a new access token
        if (error.response?.status === 401) {
            try {
                const refreshTokenParams = new URLSearchParams({
                    client_id: CLIENT_ID,
                    grant_type: 'refresh_token',
                    refresh_token: refresh_token!,
                });

                const refreshTokenResponse = await axios.post(TOKEN_ENDPOINT, refreshTokenParams);
                setAccessToken(refreshTokenResponse.data.access_token);
                localStorage.setItem("refresh_token", refreshTokenResponse.data.refresh_token);
                return refreshTokenResponse.data;
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                throw refreshError;
            }
        }

        console.error('Error exchanging access token:', error);
        console.log(error.message);
        throw error;
    }
}

export const setAccessToken = (token: string) => {
    accessToken = token;
    localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
};

export const getAccessToken = () => {
    // console.log("accessTokenVariable= ", accessToken)
    // console.log("accessToken from local storage= ", localStorage.getItem(TOKEN_STORAGE_KEY))
    return accessToken || localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const clearAccessToken = () => {
    accessToken = null;
    localStorage.removeItem(TOKEN_STORAGE_KEY);
};
