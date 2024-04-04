import {useState} from "react";
import {Button} from "../UI Components/Button";
import {useMoodSourceStore} from "../../store/moodStore";

export const moodEncodingMap: { [key: string]: string } = {
    "Calm": "0",
    "Energetic": "1",
    "Happy": "2",
    "Sad": "3",
}

export const MoodSelector = () => {
    const {selectedMood, setSelectedMood} = useMoodSourceStore();

    const handleMoodSelection = (mood: string) => {
        // Update the selected mood
        setSelectedMood(mood);
    };

    return (
        <div>
            {!selectedMood ?
                <div
                    style={{display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: '0.2rem'}}>
                    <p>Alright, now that's sorted, let's check in: How are you feeling today?</p>
                    <div style={{display: "flex", gap: "0.5rem", paddingLeft: '0.7rem'}}>
                        <Button variant="secondary" size="md"
                                onClick={() => handleMoodSelection(moodEncodingMap.Happy)}>Happy</Button>
                        <Button variant="secondary" size="md"
                                onClick={() => handleMoodSelection(moodEncodingMap.Energetic)}>Energetic</Button>
                        <Button variant="secondary" size="md"
                                onClick={() => handleMoodSelection(moodEncodingMap.Calm)}>Calm</Button>
                        <Button variant="secondary" size="md"
                                onClick={() => handleMoodSelection(moodEncodingMap.Sad)}>Sad</Button>
                    </div>
                </div> :
                <p>Mood set
                    to: {Object.keys(moodEncodingMap).find((key) => moodEncodingMap[key as keyof typeof moodEncodingMap] === selectedMood)}</p>
            }
        </div>
    )
}
