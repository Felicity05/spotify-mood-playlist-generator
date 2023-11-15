import { useState } from "react"
import {UserProfile} from "../types";
import axios from "axios";


interface ContentProps {
    logOutFunction: () => void
    userData: UserProfile | null
    token: string
}

export const Content = ({ token, userData, logOutFunction }: ContentProps) => {
    const [mood, setMood] = useState("");
    const [recentlyPayedSongs, setRecentlyPLayedSongs] = useState();

    const handleRecentlyPlayed = async () => {
        const recentlyPlayed = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
            headers: {Authorization: `Bearer ${token}`}, params: {limit: 50, after: 1484811043508 }
        //     TODO use before here and find today's date in Unix timestamp in milliseconds
        })

        console.log(recentlyPlayed)
        // setRecentlyPLayedSongs(recentlyPlayed)
    }


    console.log(mood)
    return (
        <div>
            <img style={{borderRadius: '10px'}} src={userData?.images[1].url} alt={"user profile"}/>
            <h2>Hi {userData?.display_name}</h2>

            <p>Please select your mood from the dropdown below to create your playlist</p>

            {/* dropdown here - capture mood from here*/}
            <select name="moods" id="mood" onChange={event => setMood(event.target.value)}>
                <option placeholder='placeholder'>Select your mood</option>
                <option value="happy">Happy</option>
                <option value="energetic">Energetic</option>
                <option value="sad">Sad</option>
                <option value="contempt">Contempt</option>
            </select>


            <br />
            {/* pass mood to this action */}
            <button onClick={handleRecentlyPlayed}>Get recently played songs</button>
            <br />
            <button> Generate Playlist</button>
            <br />
            <button onClick={logOutFunction}>Log Out</button>
        </div>
    )
}
