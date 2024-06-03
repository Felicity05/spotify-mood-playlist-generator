import axios from 'axios'
import {TrackAudioFeatures} from "../utils/trackTypes";
import {type} from "os";

const PREDICTIONS_ENDPOINT = 'http://localhost:5000/predict'

export const predictTrackMood = (trackFeatures: TrackAudioFeatures[]) => {
    return axios.post(PREDICTIONS_ENDPOINT, {trackFeatures})
        .then(response => {
            const prediction = response.data.prediction;
            // console.log('Prediction:', prediction);
            return prediction;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
