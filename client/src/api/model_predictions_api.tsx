import axios from 'axios'
import {TrackAudioFeatures} from "../utils/trackTypes";
import {type} from "os";

const PREDICTIONS_ENDPOINT = process.env.REACT_APP_PREDICTIONS_ENDPOINT || 'http://localhost:5000/predict'
console.log("PREDICTIONS_ENDPOINT== ", PREDICTIONS_ENDPOINT)

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
