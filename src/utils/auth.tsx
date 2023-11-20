import axios from "axios";


// needed for authentication
const CLIENT_ID = 'd5398f16c9b246898c33eda2ca52a59f'
const REDIRECT_URI = 'http://localhost:3000/callback'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RESPONSE_TYPE = 'code'
const CODE_CHALLENGE_METHOD = "S256"
const SCOPES = "user-read-private user-read-email user-read-recently-played playlist-modify-public playlist-modify-private"

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

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("scope", SCOPES);
    params.append("response_type", RESPONSE_TYPE);
    params.append("code_challenge_method", CODE_CHALLENGE_METHOD);
    params.append("code_challenge", challenge);

    // ToDo: find the correct way to use the const here for the authorization url
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
}

interface AuthorizationResponse {
    access_token: string,
    refresh_token: string,
    expires_in: number,
    scope: string,
    token_type: string
}

export const getAccessToken = async (code: string | null): Promise<AuthorizationResponse> => {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("grant_type", 'authorization_code');
    params.append("code", code!);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("code_verifier", verifier!);

    return await axios.post(TOKEN_ENDPOINT, "",
        {params}
    ).then(res => {
        console.log("successful post request with axios", res)
        return res.data
    }).catch(error => console.log(error))
}
