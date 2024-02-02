import {TrackAudioFeatures} from "./trackTypes";

export const classifyTrack = (trackAudioFeatures: TrackAudioFeatures) => {
    const {danceability, tempo, valence, energy, loudness, acousticness } = trackAudioFeatures;

    if (isHappy(danceability,valence,tempo)) return "HAPPY";
    else if (isEnergetic(energy, loudness, tempo)) return "ENERGETIC";
    else if (isSad(danceability, valence, energy)) return "SAD";
    else if (isCalm(energy, acousticness, tempo)) return "CALM";
    else return "UNKNOWN";
}



const HAPPY_TRACK = {
    danceability: 0.7,
    valence: 0.5,
    tempo: 110
}

const SAD_TRACK = {
    danceability: 0.5,
    valence: 0.5,
    intensity: 0.5,
}

const ENERGETIC_TRACK = {
    intensity: 0.6,
    loudness: -8,
    tempo: 120
}

const CALM_TRACK = {
    intensity: 0.4,
    tempo: 100,
    acousticness: 0.5
}

const isHappy = (danceability: number, valence: number, tempo: number) => {
    if(danceability >= HAPPY_TRACK.danceability && valence >=HAPPY_TRACK.valence && tempo >= HAPPY_TRACK.tempo)
        return true;
}

const isSad = (danceability: number, valence: number, energy: number) => {
    if(danceability <= SAD_TRACK.danceability && valence <= SAD_TRACK.valence && energy >= SAD_TRACK.intensity)
        return true;
}

const isEnergetic = (energy: number, loudness: number, tempo: number) => {
    if(energy >= ENERGETIC_TRACK.intensity && loudness >=ENERGETIC_TRACK.loudness && tempo >= ENERGETIC_TRACK.tempo)
        return true;
}

const isCalm = (energy: number, acousticness: number, tempo: number) => {
    if(energy <= CALM_TRACK.intensity && acousticness >= CALM_TRACK.acousticness && tempo <= CALM_TRACK.tempo)
        return true;
}
