import axios, {all, AxiosResponse} from "axios";
import {clearAccessToken, exchangeAccessToken, getAccessToken} from "../utils/auth";
import {PlayHistory, TrackAudioFeatures} from "../utils/trackTypes";
import {Playlist} from "../utils/playlistTypes";

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

spotify_api.interceptors.response.use((response) => response,
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

//get recently played tracks for user -- currently the API only gives 50 tracks and the before and after cursors don't work for more than 50 items
export const getRecentlyPlayedTracks = async (after?: number, before?: number) => {
    try {
        let allResults: PlayHistory[] = [];
        let beforeParam = new Date().getTime(); // this is a unix timestamp in millisecond

        // console.log("today's date in millisecond= ", beforeParam);

        while (true) {
            const response: any = await spotify_api.get('me/player/recently-played', {
                params: {
                    limit: 50,
                    before: beforeParam,
                }
            });

            const currentResults = response.data.items;
            allResults = [...allResults, ...currentResults];

            // console.log("Number of items in the current page:", currentResults.length);

            const {cursors, next} = response.data;
            if (!next) break;

            // console.log("cursors= ", cursors);
            // console.log("next page= ", next);

            beforeParam = cursors?.before;

            // console.log("Next 'after' timestamp:", cursors);
        }
        return allResults;
    } catch (error: any) {
        console.error('Error with the request', error);
        if (error.status === '401') console.log("BAD or EXPIRED token");
        throw error;
    }
}

//get audio features for a single track
export const getAudioFeatureForTrack = async (id: string) => {

    const response: AxiosResponse<TrackAudioFeatures> = await spotify_api.get(`/audio-features/${id}`);
    return response.data;
}

/*get several tracks audio features
@params a comma-separated list of the Spotify IDs for the tracks. Maximum: 100 IDs.
*/
export const getSeveralTracksAudioFeatures = async (trackIdsList: string) => {

    const response = await spotify_api.get(`/audio-features/`, {
        params: {
            ids: trackIdsList
        }
    });
    return response.data;
}

/* Create new playlist for user (The playlist will be empty until you add tracks)
Each user is generally limited to a maximum of 11000 playlists.
@params the user id
 */
export const createNewPlaylist = async (user_id: string, mood: string) => {

    const response = await spotify_api.post(`/users/${user_id}/playlists`, {
            "name": `My ${mood} Playlist`,
            "description": `Playlist for when I'm feeling ${mood}`,
            // "public": false //this commented will default the playlist to public
        }
    )
    return response.data;
}

/* Add songs to the created playlist
@params playlistId
 */
export const addSelectedTracksToPlaylist = async (playlist_id: string, tracksUris: string[]) => {
    const response = await spotify_api.post(`/playlists/${playlist_id}/tracks`, {
            "position": 0, //insert items at the top of the list
            "uris": tracksUris,
        }
    )
    return response.data;
}

//get playlist for user -- Get a playlist owned by a Spotify user.
export const getPlaylist = async (playlist_id: string) => {
    const response = await spotify_api.get(`/playlists/${playlist_id}`);

    // console.log("playlist data==", response.data);
    return response.data;
}
//get songs for playlist - not necessary, the songs come on the response of the getPlaylists function

/*get playlists for current user Get a list of the playlists owned or followed by the current Spotify user.
* @limit: The maximum number of items to return. Default: 20. min: 1. max: 50.
* @offset: The index of the first playlist to return. Max: 100.000. Use with limit to get the next set of playlists
*  */
export const getPlaylistsForCurrentUser = async () => {
    let offset = 0

    let allPlaylists: Playlist[] = [];

    while (true) {
        const response = await spotify_api.get('/me/playlists', {
            params: {
                limit: 50,
                offset,
            }
        })

        console.log(response);

        const currentResults = response.data.items;
        allPlaylists = [...allPlaylists, ...currentResults];

        if (offset < 100000)
            offset += response.data.limit;
        else
            break;

        if (response.data.next === null) break;
    }

    return allPlaylists;
}

//get top artist for user - save in top artist state


//get top 10 songs for top artist to create my mood playlist


//get top songs for user, save somewhere to create my mood playlist
