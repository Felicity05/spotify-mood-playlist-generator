import axios from "axios";
import {useState} from "react";


// needed for authentication
    const CLIENT_ID = 'd5398f16c9b246898c33eda2ca52a59f'
    const REDIRECT_URI = 'http://localhost:3000/callback'
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
    const RESPONSE_TYPE = 'code'
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
        const result = btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        console.log("btoa result= ", result)
        return result;
    }

     export const initiateAuthentication = async () => {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);

        localStorage.setItem("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", CLIENT_ID);
        params.append("redirect_uri", REDIRECT_URI);
        params.append("scope", SCOPES);
        params.append("response_type", "code");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
    }


     export const getAccessToken = async (code: string | null): Promise<string> => {
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", CLIENT_ID);
        params.append("grant_type", 'authorization_code');
        params.append("code", code!);
        params.append("redirect_uri", REDIRECT_URI);
        params.append("code_verifier", verifier!);

        return await axios.post("https://accounts.spotify.com/api/token", "",
            {params}
        ).then(res => {
            console.log("successful post request with axios", res)
            return res.data
        }).catch(error => console.log(error))
    }
