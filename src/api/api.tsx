import axios from "axios";
import {clearAccessToken, exchangeAccessToken, getAccessToken} from "../utils/auth";
import {UserProfile} from "../types";

// for all the api calls I need the access token
const API_BASE_URL = 'https://api.spotify.com/v1';

const spotify_api = axios.create({
    baseURL: API_BASE_URL,
});

// Axios interceptor to attach the access token to each request
spotify_api.interceptors.request.use(async (config) => {
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

spotify_api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle unauthorized errors, e.g., token expiration
        if (error.response && error.response.status === 401) {
            // Clear the expired token and initiate the authentication flow
            clearAccessToken();
            const code = localStorage.getItem("verifier");
            // console.log("verifier==  ", code);
            exchangeAccessToken(code).then(response => {
                return response
            });
        }

        return Promise.reject(error);
    }
);

export const getUserProfileData = async () => {
    try {
        return await spotify_api.get('/me');
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

//get recently played tracks for user for the last year
export const getRecentlyPlayedTracks = async (limit?: number, after?: number, before?: number) => {
    try {
        return await spotify_api.get('me/player/recently-played', {params: {
                limit: 50,
                after: 1672462800000 // this is a unix timestamp in millisecond and this date is december 31, 2022, 00h00m00s
            }});
    }
    catch (error: any) {
        console.error('Error with the request', error);
        if(error.status === '401') console.log("BAD or EXPIRED token");
        throw error;
    }
}


//get top artist for user0

//get top songs for user, save somewhere

//set mood (set duration ??? maybe this is not optimal since i'm classifying songs based on mood and can happen that there are no songs with the selected mood)
//select from where would you like your playlist? recently played songs, top artist or top songs
//set playlist's tracks source
//one the user clicks generate playlist
// from the list of recently played songs: go over the list one song at a time and compare its timbre, pitch, tempo and intensity
//with the predefined values for the selected mood



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

//get playlists for user
