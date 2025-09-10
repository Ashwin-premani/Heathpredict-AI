# 🩺 HealthPredict-AI: Pneumonia Detection from Chest X-rays

This project is a web application that uses a **Convolutional Neural Network (CNN)** to detect pneumonia from chest X-ray images. The application provides a simple interface to upload an X-ray, and the deep learning model returns a prediction indicating whether the patient has pneumonia or is normal.

The core model was trained based on the methodology outlined in this [Kaggle Notebook](https://www.kaggle.com/code/madz2000/pneumonia-detection-using-cnn-92-6-accuracy/input).



***

## 🚀 Features

* **User-Friendly Interface**: A clean and simple web page to upload chest X-ray images.
* **Real-Time Predictions**: The CNN model provides a fast prediction after an image is uploaded.
* **High Accuracy**: The underlying model is trained to achieve **92.6% accuracy** on the test dataset.
* **Scalable Backend**: Built with a lightweight Flask backend, making it easy to deploy.

***

## 📊 Model & Performance

The heart of this application is a Convolutional Neural Network (CNN) built with TensorFlow and Keras.

* **Architecture**: The model consists of multiple `Conv2D` and `MaxPooling2D` layers, followed by `Dropout` for regularization and `Dense` layers for classification.
* **Training**: The model was trained on the **Chest X-Ray Images (Pneumonia)** dataset from Kaggle. **Data augmentation** techniques (rotation, zoom, shear) were used via `ImageDataGenerator` to prevent overfitting and improve the model's ability to generalize.
* **Performance**: The model achieved **92.6% accuracy** on the validation set. The confusion matrix below shows its performance in distinguishing between the 'Pneumonia' and 'Normal' classes.



***

## 🛠️ Technology Stack

* **Backend**: Python, Flask
* **Deep Learning**: TensorFlow, Keras
* **Data Handling**: NumPy, Pillow
* **Frontend**: HTML, CSS, JavaScript

***

## ⚙️ Setup & Installation

To run this project locally, follow these steps:

### 1. Prerequisites
* Python 3.8+
* Git

### 2. Clone the Repository
```bash
git clone [https://github.com/Ashwin-premani/Heathpredict-AI.git](https://github.com/Ashwin-premani/Heathpredict-AI.git)
cd Heathpredict-AI
```

3. Create a Virtual Environment
```bash
# For Windows
python -m venv venv
venv\Scripts\activate
```
```bash
# For macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

4. Install Dependencies
Install all the required packages using the requirements.txt file.

```bash
pip install -r requirements.txt
```

5. Run the Application
Start the Flask server.
```bash
python app.py
```  

6. Access the Application
Open your web browser and navigate to:
http://127.0.0.1:5000

🙏 **Acknowledgements**
Dataset: The project uses the Chest X-Ray Images (Pneumonia) dataset available on Kaggle.

Model Inspiration: The CNN architecture and training methodology were adapted from the Pneumonia Detection using CNN notebook by Madmax on Kaggle.
