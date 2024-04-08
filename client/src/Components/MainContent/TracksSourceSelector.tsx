import React, {useState} from 'react';
import {Button} from "../UI Components/Button";
import {getRecentlyPlayedTracks} from "../../api/api";
import {useMoodSourceStore} from "../../store/moodStore";

const tracksSourceMap = {
    "recentlyPlayed": "recentlyPlayed",
    "topTracks": "topTracks",
    "topArtist": "topArtist"
}

const TracksSourceSelector = () => {
    const {selectedTrackSource, setSelectedTrackSource} = useMoodSourceStore();

    return (
        <div>
            {!selectedTrackSource ?
                <div
                    style={{display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: '0.2rem'}}>
                    <p>Let's start by selecting where you'd like to get your songs from</p>
                    <div style={{display: "flex", gap: "0.5rem", paddingLeft: '0.7rem'}}>
                        <Button variant="secondary" size="md"
                                onClick={() => setSelectedTrackSource(tracksSourceMap.recentlyPlayed)}>Recently
                            listened</Button>
                        <Button variant="secondary" size="md"
                                onClick={() => setSelectedTrackSource(tracksSourceMap.topTracks)}>Top Songs</Button>
                        <Button variant="secondary" size="md"
                                onClick={() => setSelectedTrackSource(tracksSourceMap.topArtist)}>Top Artists</Button>
                    </div>
                </div> :
                <p>Track source set to: {selectedTrackSource} </p>
            }
        </div>
    );
}

export default TracksSourceSelector;
