import React, {useState} from 'react';
import {Button} from "./UI Components/Button";
import {getRecentlyPlayedTracks} from "../api/api";
import {useMoodSourceStore} from "../store/store";

const tracksSourceMap = {
    "recentlyPlayed" : "Recently Played",
    "topArtist": "topArtist",
    "topTracks": "topTracks"
}

const TracksSourceSelector = () => {
    const {selectedTrackSource, setSelectedTrackSource} = useMoodSourceStore();

    return (
        <div>
            {!selectedTrackSource ?
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: '0.2rem'}}>
                    <p>Let's start by selecting where you'd like to get your songs from</p>
                    <div style={{display: "flex", gap:"0.5rem", paddingLeft: '0.7rem'}}>
                        <Button variant="secondary" size="md" onClick={() => setSelectedTrackSource(tracksSourceMap.recentlyPlayed)}>Recently listened</Button>
                        <Button variant="secondary" size="md" onClick={() => setSelectedTrackSource(tracksSourceMap.topArtist)}>Top Artists</Button>
                        <Button variant="secondary" size="md" onClick={() => setSelectedTrackSource(tracksSourceMap.topTracks)}>Top Songs</Button>
                    </div>
                </div> :
                <p>Track source set to: {selectedTrackSource} </p>
            }
        </div>
    );
}

export default TracksSourceSelector;
