import {useState} from "react";
import {Button} from "./Button";
import {useMoodSourceStore} from "../store/store";

export const moodEncodingMap: { [key: string]: string } = {
    "Calm": "0",
    "Energetic": "1",
    "Happy": "2",
    "Sad": "3",
}

export  const MoodSelector = () => {
    const {selectedMood, setSelectedMood} = useMoodSourceStore();

    const handleMoodSelection = (mood: string) => {
        // Update the selected mood
        setSelectedMood(mood);
    };

    return (
        <div>
            {!selectedMood ?
                <div>
                    <p>Now choose how are you feeling today </p>
                    <div style={{display: "flex"}}>
                        <Button fontSize={'15px'} value={"happy"} onClick={() => handleMoodSelection(moodEncodingMap.Happy)} >Happy</Button>
                        <Button fontSize={'15px'} onClick={() => handleMoodSelection(moodEncodingMap.Energetic) } >Energetic</Button>
                        <Button fontSize={'15px'} onClick={() => handleMoodSelection(moodEncodingMap.Calm) } >Calm</Button>
                        <Button fontSize={'15px'} onClick={() => handleMoodSelection(moodEncodingMap.Sad) } >Sad</Button>
                    </div>
                </div> :
            <p>Mood set to: {Object.keys(moodEncodingMap).find((key) => moodEncodingMap[key as keyof typeof moodEncodingMap] === selectedMood)}</p>
            }
        </div>
    )
}
