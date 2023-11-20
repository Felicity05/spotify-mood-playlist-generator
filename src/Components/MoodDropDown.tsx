import {useState} from "react";

export  const MoodDropDown = () => {
    const [mood, setMood] = useState("");

    console.log(mood)
    return (
        <div>
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
        </div>
    )
}
