import React from 'react';
import {Button} from "../UI Components/Button";
import {useMoodSourceStore} from "../../store/moodStore";

const tracksSourceMap = {
    "recentlyListened": "recentlyPlayed",
    "topTracks": "topTracks",
    "topArtist": "topArtist"
}

interface TracksSourceSelectorProps {
    activeButton: string | null,
    setActiveButton: (value: string) => void,
    recentlyListened: boolean,
}

const TracksSourceSelector: React.FC<TracksSourceSelectorProps> = ({
                                                                       activeButton, setActiveButton,
                                                                       recentlyListened
                                                                   }) => {
    const {selectedTrackSource, setSelectedTrackSource} = useMoodSourceStore();

    const handleButtonClick = (source: string) => {
        setSelectedTrackSource(source);
        setActiveButton(source);
        console.log(source)
    };

    console.log("Track source set to: ", selectedTrackSource);
    return (
        <div
            style={{display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: '0.2rem'}}>
            <p>Let's start by selecting where you'd like to get your songs from</p>
            <div style={{display: "flex", gap: "0.5rem", paddingLeft: '0.7rem'}}>
                {Object.entries(tracksSourceMap).map(([key, value]) => (
                    <Button
                        key={key}
                        variant="secondary"
                        size="md"
                        isActive={activeButton === value}
                        onClick={() => handleButtonClick(value)}
                        disabled={(activeButton !== value && activeButton !== "")}
                        // || (key === "recentlyListened" && !recentlyListened)}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default TracksSourceSelector;
