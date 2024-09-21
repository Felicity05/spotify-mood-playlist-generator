import axios from 'axios'
import {TrackAudioFeatures} from "../utils/trackTypes";
import {type} from "os";

const PREDICTIONS_ENDPOINT = process.env.REACT_APP_PREDICTIONS_ENDPOINT || 'http://localhost:5000/predict'
// console.log("PREDICTIONS_ENDPOINT== ", PREDICTIONS_ENDPOINT)

export const predictTrackMood = async (trackFeatures: TrackAudioFeatures[]): Promise<number[] | string> => {
    try {
        // handle null in trackFeatures
        trackFeatures = trackFeatures.filter(item => item != null);
        const response = await axios.post(PREDICTIONS_ENDPOINT, {trackFeatures})
        const prediction = response.data.prediction;
        // console.log('Prediction:', prediction);
        return prediction;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axios specific error handling
            console.error('Axios error:', error.message);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                return `Server responded with status ${error.response.status}: ${error.response.data.message || error.response.data}`;
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Request data:', error.request);
                return 'No response received from the server. Please try again later.';
            }
        } else {
            // Non-Axios error handling
            console.error('Error:', error);
            return 'An unexpected error occurred. Please try again later.';
        }
        // Error wit the prediction logic
        return 'An error occurred while predicting the mood. Please try again.';
    }
}
