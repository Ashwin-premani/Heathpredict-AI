import React, { useState } from 'react';

const App = () => {
  const [activeModel, setActiveModel] = useState('breast-cancer');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Breast Cancer Form State
  const [breastCancerForm, setBreastCancerForm] = useState({
    radius_mean: '', texture_mean: '', perimeter_mean: '', area_mean: '',
    smoothness_mean: '', compactness_mean: '', concavity_mean: '', 
    concave_pts_mean: '', symmetry_mean: '', fractal_dim_mean: '',
    texture_worst: '', perimeter_worst: '', area_worst: '',
    smoothness_worst: '', compactness_worst: '', concavity_worst: '',
    concave_pts_worst: '', symmetry_worst: '', fractal_dim_worst: ''
  });

  // Heart Disease Form State
  const [heartDiseaseForm, setHeartDiseaseForm] = useState({
    age: '', sex: '', chest_pain_type: '', resting_blood_pressure: '',
    cholestoral: '', fasting_blood_sugar: '', rest_ecg: '',
    max_heart_rate: '', exercise_induced_angina: '', oldpeak: '',
    slope: '', vessels_colored_by_flourosopy: '', thalassemia: ''
  });

  // Diabetes Form State
  const [diabetesForm, setDiabetesForm] = useState({
    pregnancies: '', glucose: '', blood_pressure: '', skin_thickness: '',
    insulin: '', bmi: '', diabetes_pedigree_function: '', age: ''
  });

  // Lung Cancer Form State
  const [lungCancerForm, setLungCancerForm] = useState({
    age: '', gender: '', air_pollution: '', alcohol_use: '', dust_allergy: '',
    occupational_hazards: '', genetic_risk: '', chronic_lung_disease: '',
    balanced_diet: '', fatigue: '', weight_loss: '', shortness_of_breath: '',
    wheezing: '', swallowing_difficulty: '', clubbing_of_finger_nails: '',
    frequent_cold: '', dry_cough: '', snoring: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:5000/predict/${activeModel}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getActiveFormData()),
      });
      
      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActiveFormData = () => {
    switch(activeModel) {
      case 'breast-cancer':
        return breastCancerForm;
      case 'heart-disease':
        return heartDiseaseForm;
      case 'diabetes':
        return diabetesForm;
      case 'lung-cancer':
        return lungCancerForm;
      default:
        return {};
    }
  };

  const updateForm = (formSetter, currentForm) => (field, value) => {
    formSetter({ ...currentForm, [field]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          HealthPredict AI
        </h1>

        <div className="mb-6">
          <select 
            className="w-full p-2 border rounded"
            value={activeModel}
            onChange={(e) => setActiveModel(e.target.value)}
          >
            <option value="breast-cancer">Breast Cancer Prediction</option>
            <option value="heart-disease">Heart Disease Prediction</option>
            <option value="diabetes">Diabetes Prediction</option>
            <option value="lung-cancer">Lung Cancer Prediction</option>
            <option value="pneumonia">Pneumonia Detection</option>
          </select>
        </div>

        {activeModel === 'breast-cancer' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(breastCancerForm).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1">
                    {field.replace(/_/g, ' ').toUpperCase()}
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    className="w-full p-2 border rounded"
                    value={breastCancerForm[field]}
                    onChange={(e) => updateForm(setBreastCancerForm, breastCancerForm)(field, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Predict Breast Cancer'}
            </button>
          </form>
        )}

        {activeModel === 'heart-disease' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(heartDiseaseForm).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1">
                    {field.replace(/_/g, ' ').toUpperCase()}
                  </label>
                  {field === 'sex' ? (
                    <select 
                      className="w-full p-2 border rounded"
                      value={heartDiseaseForm[field]}
                      onChange={(e) => updateForm(setHeartDiseaseForm, heartDiseaseForm)(field, e.target.value)}
                    >
                      <option value="">Select gender</option>
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </select>
                  ) : (
                    <input
                      type="number"
                      step={field === 'oldpeak' ? "0.1" : "1"}
                      className="w-full p-2 border rounded"
                      value={heartDiseaseForm[field]}
                      onChange={(e) => updateForm(setHeartDiseaseForm, heartDiseaseForm)(field, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Predict Heart Disease'}
            </button>
          </form>
        )}

        {activeModel === 'diabetes' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(diabetesForm).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1">
                    {field.replace(/_/g, ' ').toUpperCase()}
                  </label>
                  <input
                    type="number"
                    step={field === 'bmi' || field === 'diabetes_pedigree_function' ? "0.001" : "1"}
                    className="w-full p-2 border rounded"
                    value={diabetesForm[field]}
                    onChange={(e) => updateForm(setDiabetesForm, diabetesForm)(field, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Predict Diabetes'}
            </button>
          </form>
        )}

        {activeModel === 'lung-cancer' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(lungCancerForm).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1">
                    {field.replace(/_/g, ' ').toUpperCase()}
                  </label>
                  {field === 'gender' ? (
                    <select 
                      className="w-full p-2 border rounded"
                      value={lungCancerForm[field]}
                      onChange={(e) => updateForm(setLungCancerForm, lungCancerForm)(field, e.target.value)}
                    >
                      <option value="">Select gender</option>
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </select>
                  ) : (
                    <input
                      type="number"
                      step="0.01"
                      className="w-full p-2 border rounded"
                      value={lungCancerForm[field]}
                      onChange={(e) => updateForm(setLungCancerForm, lungCancerForm)(field, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Predict Lung Cancer'}
            </button>
          </form>
        )}

        {activeModel === 'pneumonia' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 border-2 border-dashed rounded-lg text-center">
              <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={(e) => {
                  // Handle image upload
                }}
              />
              <p className="text-sm text-gray-500 mt-2">
                Upload a chest X-ray image (PNG, JPG, JPEG)
              </p>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Predict Pneumonia'}
            </button>
          </form>
        )}

        {prediction && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-semibold">Prediction Result:</h3>
            <div className="mt-2">
              <p className="text-lg font-medium">
                {prediction.message}
              </p>
              {prediction.probability && (
                <p className="text-sm text-gray-600">
                  Confidence: {(prediction.probability * 100).toFixed(2)}%
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;