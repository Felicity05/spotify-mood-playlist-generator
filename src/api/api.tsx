import axios from "axios";
import {clearAccessToken, exchangeAccessToken, getAccessToken} from "../utils/auth";

// for all the api calls I need the access token
const API_BASE_URL = 'https://api.spotify.com/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Axios interceptor to attach the access token to each request
api.interceptors.request.use(async (config) => {
    let accessToken = getAccessToken();
    if (!accessToken) {
        // If no token is available, initiate the authentication flow
        try {
            const code = localStorage.getItem("verifier");
            await exchangeAccessToken(code);
            accessToken = getAccessToken();
        } catch (error) {
            console.error('Error in request interceptor:', error);
        }
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle unauthorized errors, e.g., token expiration
        if (error.response && error.response.status === 401) {
            // Clear the expired token and initiate the authentication flow
            clearAccessToken();
            const code = localStorage.getItem("verifier");
            // console.log("verifier==  ", code);
            exchangeAccessToken(code);
        }

        return Promise.reject(error);
    }
);

export const getUserProfileData = async () => {
    try {
        return await api.get('/me');
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

// export const handleRecentlyPlayed = async (token: string): Promise<RecentlyPlayedTracks | void> => {
//     return await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
//         headers: {Authorization: `Bearer ${token}`}, params: {limit: 50, after: 1484811043508}
//         //     TODO use before here and find today's date in Unix timestamp in milliseconds
//     }).then(({data}: { data: RecentlyPlayedTracks }) => {
//         console.log(data)
//     }).catch(error => {
//         console.log(error.message)
//     });
// }
//  /*pass the list of tracks as comma separated string*/
// const getTracksAudioFeatures = async () => {
//     const trackList = recentlyPlayedSongs.items.map(item => {
//         return item.track.id
//     }).toString()
//
//     await axios.get("https://api.spotify.com/v1/audio-features", {
//         headers: { Authorization: `Bearer ${token}` }, params: {ids: trackList }
//     }).then(res => {
//         console.log(res)
//     }).catch(error => console.log(error))
// }
//
// const createNewPlaylist = async () => {
//
//     axios({
//         method: 'post',
//         url: 'https://api.spotify.com/v1/users/{user_id}/playlists',
//         data: {
//             name: 'test',
//             public: false
//         },
//         headers: { Authorization: `Bearer ${token}` },
//         params: {user_id: userData?.id }
//     });
//
//
//     // await axios.post("https://api.spotify.com/v1/users/{user_id}/playlists", {
//     //         "name": `My ${mood} Playlist`,
//     //         "description": `Playlist fro when I'm feeling ${mood}`,
//     //         "public": false
//     //     }, { headers: { Authorization: `Bearer ${token}` },
//     //     params: {user_id: userData?.id }}
//     // ).then(res => {
//     //     console.log(res)
//     // }).catch(error => console.log(error))
//
// }
//
// const generateMoodPlaylist = async () => {
//     await Promise.all(Array.of(
//             getTracksAudioFeatures(),
//             // createNewPlaylist(),
//         )
//     )
// }
