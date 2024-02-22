import axios from 'axios'

// features to use duration_ms, danceability, acousticness, energy, instrumentalness, valence, speechiness, tempo


export const predictTrackMood = (trackFeatures: any) => {
    const response = axios.post('http://localhost:5000/predict', { trackFeatures })
        .then(response => {
            const prediction = response.data.prediction;
            console.log('Prediction:', prediction);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return response;
}
