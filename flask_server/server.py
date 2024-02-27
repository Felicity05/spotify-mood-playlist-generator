from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])  # This will enable CORS for all routes

# Load the serialized model
model = joblib.load('mood_predictor_rf_model.pkl')


@app.route("/")
def greetings():
    return "Hello there, server working"


# features to use duration_ms, danceability, acousticness, energy, instrumentalness, valence, speechiness, tempo
@app.route('/predict', methods=['POST'])
def predict():
    # Assuming the request contains the features for prediction
    features = request.json.get('trackFeatures')
    original_features_data_frame = pd.DataFrame(features)
    # print(original_features_data_frame.columns)

    column_to_drop = ['id', 'key', 'loudness', 'mode', 'liveness', 'time_signature',
                      'track_href', 'type', 'uri', 'analysis_url']
    features_data_frame = original_features_data_frame.drop(column_to_drop, axis=1)
    features_data_frame = features_data_frame.reindex(columns=['duration_ms', 'danceability', 'acousticness', 'energy',
                                                               'instrumentalness', 'valence', 'speechiness', 'tempo'])
    # print(features_data_frame)

    # Use the model to make predictions
    prediction = model.predict(features_data_frame)
    print("Predicted mood== ", prediction)

    return jsonify({'prediction': prediction.tolist()})


if __name__ == '__main__':
    app.run(debug=True)
