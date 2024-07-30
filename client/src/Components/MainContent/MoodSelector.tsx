import React from "react";
import {Button} from "../UI Components/Button";
import {useMoodSourceStore} from "../../store/moodStore";

export const moodEncodingMap: { [key: string]: string } = {
    "Calm": "0",
    "Energetic": "1",
    "Happy": "2",
    "Sad": "3",
}

interface MoodSourceSelectorProps {
    activeButton: string | null,
    setActiveButton: (value: string) => void
}

export const MoodSelector: React.FC<MoodSourceSelectorProps> = ({activeButton, setActiveButton}) => {
    const {selectedMood, setSelectedMood} = useMoodSourceStore();

    const handleButtonClick = (mood: string) => {
        setSelectedMood(mood);
        setActiveButton(mood);
        console.log(mood)
    };

    console.log("Mood set to: ", selectedMood);
    return (
        <div
            style={{display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: '0.2rem'}}>
            <p>Alright, now that's sorted, let's check in: How are you feeling today?</p>
            <div style={{display: "flex", gap: "0.5rem", paddingLeft: '0.7rem'}}>
                {Object.entries(moodEncodingMap).map(([key, value]) => (
                    <Button
                        key={key}
                        variant="secondary"
                        size="md"
                        isActive={activeButton === value}
                        onClick={() => handleButtonClick(value)}
                        disabled={activeButton !== value && activeButton !== ""}
                    >
                        {key}
                    </Button>
                ))}
            </div>
        </div>
    )
}
