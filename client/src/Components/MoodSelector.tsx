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
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <p>Now choose how are you feeling today </p>
                    <div style={{display: "flex", gap: "0.5rem"}}>
                        <Button variant="secondary" size="md" onClick={() => handleMoodSelection(moodEncodingMap.Happy)} >Happy</Button>
                        <Button variant="secondary" size="md" onClick={() => handleMoodSelection(moodEncodingMap.Energetic) } >Energetic</Button>
                        <Button variant="secondary" size="md" onClick={() => handleMoodSelection(moodEncodingMap.Calm) } >Calm</Button>
                        <Button variant="secondary" size="md" onClick={() => handleMoodSelection(moodEncodingMap.Sad) } >Sad</Button>
                    </div>
                </div> :
            <p>Mood set to: {Object.keys(moodEncodingMap).find((key) => moodEncodingMap[key as keyof typeof moodEncodingMap] === selectedMood)}</p>
            }
        </div>
    )
}
