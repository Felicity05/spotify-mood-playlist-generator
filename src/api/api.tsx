import {RecentlyPlayedTracks} from "../types";
import axios from "axios";

export {}

// for all the api calls I need the access token

export const getUserProfileData = async (token: string) => {

    const result = await axios.get("https://api.spotify.com/v1/me", {
         headers: { Authorization: `Bearer ${token}` }
    });

    console.log("user data= ", result);
    return await result.data;

}

// const handleRecentlyPlayed = async (): Promise<RecentlyPlayedTracks | void> => {
//     return await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
//         headers: {Authorization: `Bearer ${token}`}, params: {limit: 50, after: 1484811043508}
//         //     TODO use before here and find today's date in Unix timestamp in milliseconds
//     }).then(({data}: { data: RecentlyPlayedTracks }) => {
//         // console.log(data)
//         setRecentlyPlayedSongs(data)
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
