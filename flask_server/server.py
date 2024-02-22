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


@app.route('/predict', methods=['POST'])
def predict():
    # Assuming the request contains the features for prediction
    features = request.json.get('trackFeatures')
    features_data_frame = pd.DataFrame(features, index=[0])

    # Use the model to make predictions
    prediction = model.predict(features_data_frame)
    print("Predicted mood== ", prediction)

    #     TODO: think how to return a value or string instead of a list here
    return jsonify({'prediction': prediction.tolist()})


if __name__ == '__main__':
    app.run(debug=True)
