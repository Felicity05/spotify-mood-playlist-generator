import React, {useState} from 'react';
import {Button} from "./Button";
import {getRecentlyPlayedTracks} from "../api/api";
import {useMoodSourceStore} from "../store/store";

const tracksSourceMap = {
    "recentlyPlayed" : "getRecentlyPlayed",
    "topArtist": "getTopArtist",
    "topTracks": "getTopTracks"
}

const TracksSourceSelector = () => {
    const {selectedTrackSource, setSelectedTrackSource} = useMoodSourceStore();

    return (
        <div>
            {!selectedTrackSource ?
                <div>
                    <p>Choose from where do you want your songs</p>
                    <div style={{display: "flex"}}>
                        <Button onClick={() => setSelectedTrackSource("recently played")}>Recently listened</Button>
                        <Button onClick={() => setSelectedTrackSource(tracksSourceMap.recentlyPlayed)}>Top Artists</Button>
                        <Button onClick={() => setSelectedTrackSource(tracksSourceMap.recentlyPlayed)}>Top Songs</Button>
                    </div>
                </div> :
                <p>Track source set to: {selectedTrackSource} </p>
            }
        </div>
    );
}

export default TracksSourceSelector;
