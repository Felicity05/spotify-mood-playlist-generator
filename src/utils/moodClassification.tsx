import {TrackAudioFeatures} from "./trackTypes";

export const classifyTrack = (trackAudioFeatures: TrackAudioFeatures | undefined) => {
    if(trackAudioFeatures === undefined) return;
    const {danceability, tempo, valence, energy } = trackAudioFeatures;

    if (isHappy(energy,valence, danceability, tempo)) return "HAPPY";
    else if (isEnergetic(energy,valence, danceability, tempo)) return "ENERGETIC";
    else if (isSad(energy,valence, danceability, tempo)) return "SAD";
    else if (isCalm(energy,valence, danceability, tempo)) return "CALM";
    else return "UNKNOWN";
}

const HAPPY_TRACK = {
    valence: 0.7,
    danceability: 0.7,
    energy: 0.7,
    tempo: 120
}

const SAD_TRACK = {
    valence: 0.4,
    danceability: 0.5,
    energy: 0.5,
    tempo: 70
}

const ENERGETIC_TRACK = {
    valence: 0.6,
    danceability: 0.5,
    energy: 0.5,
    tempo: 90
}

const CALM_TRACK = {
    valence: 0.4,
    danceability: 0.5,
    energy: 0.5,
    tempo: 90,
}

const isHappy = (energy: number, valence: number, danceability: number, tempo: number) => {
    if(danceability >= HAPPY_TRACK.danceability && valence >= HAPPY_TRACK.valence
        && energy >= HAPPY_TRACK.energy && tempo >= HAPPY_TRACK.tempo)
        return true;
}

const isSad = (energy: number, danceability: number, valence: number, tempo: number) => {
    if(danceability <= SAD_TRACK.danceability && valence <= SAD_TRACK.valence
        && energy <= SAD_TRACK.energy && tempo <= SAD_TRACK.tempo)
        return true;
}

const isEnergetic = (energy: number, valence: number, danceability: number, tempo: number) => {
    if(energy >= ENERGETIC_TRACK.energy && valence >= ENERGETIC_TRACK.valence &&
        danceability >= ENERGETIC_TRACK.danceability && tempo >= ENERGETIC_TRACK.tempo)
        return true;
}

const isCalm = (energy: number, valence: number, danceability: number, tempo: number) => {
    if(energy <= CALM_TRACK.energy && valence <= CALM_TRACK.valence
        && danceability <= CALM_TRACK.danceability && tempo <= CALM_TRACK.tempo)
        return true;
}
