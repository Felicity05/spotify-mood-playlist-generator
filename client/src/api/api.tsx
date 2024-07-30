import axios, {AxiosResponse} from "axios";
import {clearAccessToken, exchangeAccessToken, getAccessToken} from "../utils/auth";
import {PlayHistory, TrackAudioFeatures} from "../utils/trackTypes";
import {Playlist, Track} from "../utils/playlistTypes";
import {Artist} from "../types";

// for all the api calls I need the access token
const API_BASE_URL = 'https://api.spotify.com/v1';

const spotify_api = axios.create({
    baseURL: API_BASE_URL,
});

// Axios interceptor to attach the access token to each request
spotify_api.interceptors.request.use(async (config) => {
    let accessToken = await getAccessToken();
    // console.log("accessToken in axios interceptor", accessToken)
    if (!accessToken) {
        // If no token is available, initiate the authentication flow
        // try {
        //     const code = localStorage.getItem("verifier");
        //     await exchangeAccessToken(code);
        //     accessToken = await getAccessToken();
        // } catch (error) {
        console.error('Error in request interceptor: no token found');
        // }
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

spotify_api.interceptors.response.use((response) => response,
    async (error) => {
        // Handle unauthorized errors, e.g., token expiration
        if (error.response) {
            if (error.response.status === 401) {
                // Clear the expired token and initiate the authentication flow
                clearAccessToken();
                const code = localStorage.getItem("verifier");
                // console.log("verifier==  ", code);
                await exchangeAccessToken(code)

                // Retry the original request after token refresh
                let accessToken = await getAccessToken();
                error.config.headers.Authorization = `Bearer ${accessToken}`;
                return spotify_api.request(error.config);

            } else if (error.response.status === 403) {
                // Handle unauthorized access for non-authorized users
                console.error('Access forbidden: you are not authorized to access this resource.');
                return error;
            }
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
export const getAudioFeaturesForTrack = async (id: string) => {

    const response: AxiosResponse<TrackAudioFeatures> = await spotify_api.get(`/audio-features/${id}`);
    return response.data;
}

/** Gets several tracks audio features
 @params: trackIdsList, a comma-separated list of the Spotify IDs for the tracks. Maximum: 100 IDs.
 */
export const getSeveralTracksAudioFeatures = async (trackIdsList: string) => {

    const response = await spotify_api.get(`/audio-features/`, {
        params: {
            ids: trackIdsList
        }
    });
    //todo: add error handling
    return response.data!.audio_features;
}

/** Creates new playlist for user (The playlist will be empty until tracks are added)
 Each user is generally limited to a maximum of 11000 playlists.
 @params userId, mood
 */
export const createNewPlaylist = async (user_id: string, mood: string) => {

    const response = await spotify_api.post(`/users/${user_id}/playlists`, {
            "name": `My ${mood} Playlist for ${new Date().toDateString()}`,
            "description": `Playlist for when I'm feeling ${mood}`,
            // "public": false //this commented will default the playlist to public
        }
    )
    return response.data;
}

/** Add songs to the created playlist
 @params playlistId
 */
export const addSelectedTracksToPlaylist = async (playlist_id: string, tracksUris: string[]) => {

    let position = 0; //begin to insert items at the top of the list
    let response: AxiosResponse<any, any>;
    let totalTracks = tracksUris.length;

    //to add more than 100 items to the playlist because a maximum of 100 items can be added in one request
    while (totalTracks >= 0) {
        const uris = tracksUris.slice(position, position + 100);

        response = await spotify_api.post(`/playlists/${playlist_id}/tracks`, {
                position,
                uris,
            }
        )

        position += 100;
        totalTracks -= 100;
        console.log("totalTracks== ", totalTracks, " position== ", position);
    }

    return response!.data;
}

//get playlist for user -- Get a playlist owned by a Spotify user.
export const getPlaylist = async (playlist_id: string) => {
    const response = await spotify_api.get(`/playlists/${playlist_id}`);

    // console.log("playlist data==", response.data);
    return response.data;
}
//get songs for playlist - not necessary, the songs come on the response of the getPlaylists function

//todo: fix this function, limit is 100, use with offset to get all elements
/** Gets a list of the playlists owned or followed by the current Spotify user
 * @params: limit The maximum number of items to return. Default: 20. min: 1. max: 50.
 * @params: offset The index of the first playlist to return. Max: 100.000. Use with limit to get the next set of playlists
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

        // console.log(response);

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

//get top items for user - type: artists | tracks
export const getTopItemsForUser = async (type: string) => {
    let offset = 0;

    let response: Artist[] | Track[] = [];

    while (true) {
        const currentResponse = await spotify_api.get(`/me/top/${type}`, {
            params: {
                limit: 50,
                time_range: "long_term",
                offset,
            }
        });

        const currentResults = currentResponse.data.items;
        response = [...response, ...currentResults];

        if (offset < currentResponse.data.total)
            offset += currentResponse.data.limit;
        else
            break;

        if (currentResponse.data.next === null) break;
    }

    // console.log("response==", response);
    return response;
}

//get top 10 songs for each of the first 15 top artist to create my mood playlist
export const getArtistTopTracks = async (artist_id: string) => {
    const response = await spotify_api.get(`/artists/${artist_id}/top-tracks`);

    // console.log("artist top tracks== ", response.data)

    return response.data;
}

export const getTopTracksForTopArtists = async (topArtistsIds: string[]) => {
    let topTracksForTopArtist: any[] = [];

    for (const artistId of topArtistsIds) {
        const response = await getArtistTopTracks(artistId);
        // console.log("top tracks for artist===", response);

        topTracksForTopArtist = [...topTracksForTopArtist, ...response.tracks]
    }

    return topTracksForTopArtist;
}

//gets the number of artist the user is following
export const getFollowedArtistsForUser = async () => {
    const response = await spotify_api.get(`/me/following`, {
        params: {
            type: "artist", //only type available at the moment as per the Spotify API documentation
            limit: 50, //max limit
            // after: "" //param to get to the next set of artists
        }
    });

    // console.log("followed artists== ", response.data)

    return response.data.artists;
}
