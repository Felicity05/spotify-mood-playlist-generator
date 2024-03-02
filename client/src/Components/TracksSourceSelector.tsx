import React, {useState} from 'react';
import {Button} from "./Button";
import {getRecentlyPlayedTracks} from "../api/api";
import {useMoodSourceStore} from "../store/store";

const tracksSourceMap = {
    "recentlyPlayed" : "recentlyPlayed",
    "topArtist": "topArtist",
    "topTracks": "topTracks"
}

const TracksSourceSelector = () => {
    const {selectedTrackSource, setSelectedTrackSource} = useMoodSourceStore();

    return (
        <div>
            {!selectedTrackSource ?
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <p>Choose from where do you want your songs</p>
                    <div style={{display: "flex", gap:"0.5rem"}}>
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
