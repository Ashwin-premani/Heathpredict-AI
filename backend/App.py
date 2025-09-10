from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)

# Base path for models
BASE_PATH = "C:/Users/ashwi/disease prediction/heathpredict AI/models"

# Model paths
MODEL_PATHS = {
    'breast_cancer': os.path.join(BASE_PATH, 'breast_cancer/random_forest_model.pkl'),
    'diabetes': os.path.join(BASE_PATH, 'Diabetes/best_diabetes_model.pkl'),
    'heart_disease': os.path.join(BASE_PATH, 'heart disease/optimized_random_forest_model.pkl'),
    'lung_cancer': os.path.join(BASE_PATH, 'lung_cancer/random_forest_model.pkl'),
    # Pneumonia model will be handled differently as it's a deep learning model
}

# Load models
models = {}
try:
    for model_name, model_path in MODEL_PATHS.items():
        models[model_name] = joblib.load(model_path)
    print("Models loaded successfully")
except Exception as e:
    print(f"Error loading models: {e}")

@app.route('/predict/breast-cancer', methods=['POST'])
def predict_breast_cancer():
    try:
        data = request.json
        features = [
            float(data[key]) for key in [
                'radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean',
                'smoothness_mean', 'compactness_mean', 'concavity_mean',
                'concave_pts_mean', 'symmetry_mean', 'fractal_dim_mean',
                'texture_worst', 'perimeter_worst', 'area_worst',
                'smoothness_worst', 'compactness_worst', 'concavity_worst',
                'concave_pts_worst', 'symmetry_worst', 'fractal_dim_worst'
            ]
        ]
        
        prediction = models['breast_cancer'].predict([features])[0]
        probability = models['breast_cancer'].predict_proba([features])[0]
        
        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability[1]),
            'message': 'Malignant' if prediction == 1 else 'Benign'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict/heart-disease', methods=['POST'])
def predict_heart_disease():
    try:
        data = request.json
        features = [
            float(data[key]) for key in [
                'age', 'sex', 'chest_pain_type', 'resting_blood_pressure',
                'cholestoral', 'fasting_blood_sugar', 'rest_ecg',
                'max_heart_rate', 'exercise_induced_angina', 'oldpeak',
                'slope', 'vessels_colored_by_flourosopy', 'thalassemia'
            ]
        ]
        
        prediction = models['heart_disease'].predict([features])[0]
        probability = models['heart_disease'].predict_proba([features])[0]
        
        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability[1]),
            'message': 'Heart Disease Detected' if prediction == 1 else 'No Heart Disease Detected'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    try:
        data = request.json
        features = [
            float(data[key]) for key in [
                'pregnancies', 'glucose', 'blood_pressure', 'skin_thickness',
                'insulin', 'bmi', 'diabetes_pedigree_function', 'age'
            ]
        ]
        
        prediction = models['diabetes'].predict([features])[0]
        probability = models['diabetes'].predict_proba([features])[0]
        
        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability[1]),
            'message': 'Diabetes Detected' if prediction == 1 else 'No Diabetes Detected'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict/lung-cancer', methods=['POST'])
def predict_lung_cancer():
    try:
        data = request.json
        features = [
            float(data[key]) for key in [
                'age', 'gender', 'air_pollution', 'alcohol_use', 'dust_allergy',
                'occupational_hazards', 'genetic_risk', 'chronic_lung_disease',
                'balanced_diet', 'fatigue', 'weight_loss', 'shortness_of_breath',
                'wheezing', 'swallowing_difficulty', 'clubbing_of_finger_nails',
                'frequent_cold', 'dry_cough', 'snoring'
            ]
        ]
        
        prediction = models['lung_cancer'].predict([features])[0]
        probability = models['lung_cancer'].predict_proba([features])[0]
        
        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability[1]),
            'message': f'Lung Cancer Risk Level: {prediction}'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict/pneumonia', methods=['POST'])
def predict_pneumonia():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400
            
        file = request.files['image']
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = img.resize((224, 224))  # Adjust size according to your model
        
        # Load the pneumonia model on demand to save memory
        pneumonia_model = load_model(os.path.join(BASE_PATH, 'Pneumonia/pneumonia_model.h5'))
        
        # Preprocess image
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Make prediction
        prediction = pneumonia_model.predict(img_array)[0]
        
        return jsonify({
            'prediction': float(prediction[0]),
            'message': 'Pneumonia Detected' if prediction[0] > 0.5 else 'Normal'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)