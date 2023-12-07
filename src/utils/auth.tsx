import axios from "axios";
import {AuthorizationResponse} from "./authTypes";

// needed for authentication
const CLIENT_ID = 'd5398f16c9b246898c33eda2ca52a59f'
const REDIRECT_URI = 'http://localhost:3000/callback'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RESPONSE_TYPE = 'code'
const CODE_CHALLENGE_METHOD = "S256"
const SCOPES = "user-read-private user-read-email user-read-recently-played playlist-modify-public playlist-modify-private"
const TOKEN_STORAGE_KEY = 'spotifyAccessToken';
let accessToken: string | null = null;

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

    // TODO use buffer here instead of btoa
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
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
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code: code!,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier!,
    });

    try {
        const response = await axios.post(TOKEN_ENDPOINT, params);
        setAccessToken(response.data.access_token);
        return response.data;
    } catch (error) {
        console.error('Error exchanging access token:', error);
        throw error;
    }
}

export const setAccessToken = (token: string) => {
    accessToken = token;
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getAccessToken = () => {
    return accessToken || localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const clearAccessToken = () => {
    accessToken = null;
    localStorage.removeItem(TOKEN_STORAGE_KEY);
};
