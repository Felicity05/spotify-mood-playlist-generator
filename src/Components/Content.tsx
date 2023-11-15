import {JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState} from "react"
import {RecentlyPlayedTracks, UserProfile, PlayHistoryObject} from "../types";
import axios from "axios";

interface ContentProps {
    logOutFunction: () => void
    userData: UserProfile | null
    token: string
}

const recentlyPlayedSongsInitialState: RecentlyPlayedTracks = {
    href: "",
    limit: 0,
    next: "",
    total: 0,
    items: []
}

export const Content = ({token, userData, logOutFunction}: ContentProps) => {
    const [mood, setMood] = useState("");
    const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState(recentlyPlayedSongsInitialState);


    const handleRecentlyPlayed = async (): Promise<RecentlyPlayedTracks | void> => {
        return await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
            headers: {Authorization: `Bearer ${token}`}, params: {limit: 50, after: 1484811043508}
            //     TODO use before here and find today's date in Unix timestamp in milliseconds
        }).then(({data}: { data: RecentlyPlayedTracks }) => {
            // console.log(data)
            setRecentlyPlayedSongs(data)
        }).catch(error => {
            console.log(error.message)
        });
    }

    /*pass the list of tracks as comma separated string*/
    const getTracksAudioFeatures = async () => {
        const trackList = recentlyPlayedSongs.items.map(item => {
            return item.track.id
        }).toString()

        await axios.get("https://api.spotify.com/v1/audio-features", {
            headers: { Authorization: `Bearer ${token}` }, params: {ids: trackList }
        }).then(res => {
            console.log(res)
        }).catch(error => console.log(error))

    }

    const createNewPlaylist = async () => {

        axios({
            method: 'post',
            url: 'https://api.spotify.com/v1/users/{user_id}/playlists',
            data: {
                name: 'test',
                public: false
            },
            headers: { Authorization: `Bearer ${token}` },
            params: {user_id: userData?.id }
        });


        // await axios.post("https://api.spotify.com/v1/users/{user_id}/playlists", {
        //         "name": `My ${mood} Playlist`,
        //         "description": `Playlist fro when I'm feeling ${mood}`,
        //         "public": false
        //     }, { headers: { Authorization: `Bearer ${token}` },
        //     params: {user_id: userData?.id }}
        // ).then(res => {
        //     console.log(res)
        // }).catch(error => console.log(error))

    }

    const generateMoodPlaylist = async () => {
        await Promise.all(Array.of(
            getTracksAudioFeatures(),
            // createNewPlaylist(),
            )
        )
    }


    console.log("recently played songs= ", recentlyPlayedSongs.items)
    console.log(mood)
    return (
        <div>
            <img style={{borderRadius: '10px'}} src={userData?.images[1].url} alt={"user profile"}/>
            <h2>Hi {userData?.display_name}</h2>

            <button onClick={handleRecentlyPlayed}>Get recently played songs</button>
            <br/>
            <br />

            <div>{recentlyPlayedSongs.items.map((item, index) => {
                    return <p key={index}>{item.track.name} -- {item.track.popularity}</p>
                })
            }
            </div>

            <p>Please select your mood from the dropdown below to create your playlist</p>
            <br/>
            {/* dropdown here - capture mood from here*/}
            <select name="moods" id="mood" onChange={event => setMood(event.target.value)}>
                <option placeholder='placeholder'>Select your mood</option>
                <option value="happy">Happy</option>
                <option value="energetic">Energetic</option>
                <option value="sad">Sad</option>
                <option value="contempt">Contempt</option>
            </select>

            <br/>
            <br />
            {/* pass mood to this action */}
            <button onClick={generateMoodPlaylist}> Generate Playlist</button>
            <br />
            <br/>
            <button onClick={logOutFunction}>Log Out</button>
        </div>
    )
}
