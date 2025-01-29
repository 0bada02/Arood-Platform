from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import os
import re
import threading
import time
from pyarabic import araby
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

app = Flask(__name__)

# Lock for synchronizing model access
model_lock = threading.Lock()

# Load labels
label_file = os.path.join('./final_baits', 'labels.txt')
if not os.path.exists(label_file):
    raise FileNotFoundError("The labels file is missing.")
with open(label_file, 'r') as f:
    label2name = [line.strip() for line in f.readlines()]

# Load vocabulary
vocab = None

# Load specific models
models_path = '/app/models'
AroodV1 = tf.keras.models.load_model(os.path.join(models_path, 'AroodV1.keras'))
AroodV2 = tf.keras.models.load_model(os.path.join(models_path, 'AroodV2.keras'))
AroodV3 = tf.keras.models.load_model(os.path.join(models_path, 'AroodV3.keras'))

# Dictionary to hold additional models
additional_models = {}

# Function to load additional models with proper synchronization
def load_additional_models():
    global additional_models
    with model_lock:  # Ensure exclusive access to models during update
        current_models = set(os.listdir(models_path))  # Get current model files in the directory
        current_models = {f for f in current_models if f.endswith('.keras')}

        # Identify models to add
        new_models = current_models - set(additional_models.keys())
        # Identify models to remove
        models_to_remove = set(additional_models.keys()) - current_models

        # Remove models that are no longer present in the directory
        for model_name in models_to_remove:
            del additional_models[model_name]
            print(f"Removed model: {model_name}")

        # Load new models
        for model_file in new_models:
            model_name = model_file.split('.')[0]
            model_path = os.path.join(models_path, model_file)
            additional_models[model_name] = tf.keras.models.load_model(model_path)
            print(f"Loaded new model: {model_name}")

        print(f"Currently loaded models: {list(additional_models.keys())}")

# Background thread to synchronize models
def sync_models():
    while True:
        load_additional_models()
        time.sleep(10)  # Check for changes every 10 seconds

# Start the synchronization thread
threading.Thread(target=sync_models, daemon=True).start()

# Preprocessing functions
def preprocess_prosody(text: str) -> str:
    text = text.strip()
    if not text:
        return ""
    text = re.sub(r'[ًٌٍ]', 'ن', text)  # Normalize tanween
    text = re.sub(r'(.)ّ', r'\1\1', text)  # Expand shadda
    solar_letters = r'تثدذرشصضطظلن'
    text = re.sub(r'\bال([' + re.escape(solar_letters) + r'])', r'ا\1', text)
    return text

def extract_data(path):
    global vocab
    X, y = [], []

    if not os.path.exists(path):
        raise FileNotFoundError(f"The data file {path} is missing.")

    with open(path, 'r', encoding='utf-8') as file:
        t = file.read()

    t = preprocess_prosody(t)
    t = araby.strip_tatweel(t)
    excluded_chars = '!()*-ـ.:=o[]«»;؛,،~?؟\u200f\ufeffـ\xa0'
    cleaned_text = ''.join([char for char in t if char not in excluded_chars])

    baits = cleaned_text.split('\n')
    for line in baits:
        if len(line) <= 1:
            continue
        label, bait = line.split(' ', 1)
        label = int(label)
        bait = bait.strip()
        X.append(bait.strip())
        y.append(label)

    vocab = sorted(set(' '.join(X)))
    return X, y

# Load training and test data
train_file = os.path.join('./final_baits', 'train.txt')
test_file = os.path.join('./final_baits', 'test.txt')
X_train, y_train = extract_data(train_file)
X_test, y_test = extract_data(test_file)

# Create character to index mapping
char2idx = {u: i + 1 for i, u in enumerate(vocab)}

# Add special handling for out-of-vocabulary (OOV) tokens
def to_sequences(X):
    X = [[char2idx.get(char, 0) for char in line] for line in X]  # Map OOV tokens to 0
    max_vocab_index = len(char2idx) + 1  # Ensure compatibility with embedding layer
    X = [[min(idx, max_vocab_index - 1) for idx in line] for line in X]  # Clip indices to max_vocab_index - 1
    X = pad_sequences(X, padding='post', value=0, maxlen=100)  # Ensure consistent sequence length
    return X

X_train = to_sequences(X_train)
y_train = np.array(y_train)
X_test = to_sequences(X_test)
y_test = np.array(y_test)

# Classification Functions
def classify_V1(sentence):
    sentence = araby.strip_tashkeel(sentence)
    sentence = araby.strip_tatweel(sentence)
    sentence = sentence.replace('\xa0', ' ')  # Replace non-breaking space with a regular space
    sentence = ''.join([char if char in char2idx else ' ' for char in sentence])  # Replace unknown chars
    sequence = [char2idx.get(char, 0) for char in sentence]  # Use default index 0 for unknown characters
    sequence = pad_sequences([sequence], maxlen=X_train.shape[1], padding='post', value=0)

    pred = AroodV1.predict(sequence)[0]
    label = label2name[np.argmax(pred)]
    confidence = float(np.max(pred))

    return label, confidence

def classify_V2(sentence):
    print("Using model: AroodV2")
    sentence = preprocess_prosody(sentence)
    sequence = [char2idx.get(char, 0) for char in sentence]
    sequence = pad_sequences([sequence], maxlen=X_train.shape[1], padding='post', value=0)
    pred = AroodV2.predict(sequence)[0]
    label = label2name[np.argmax(pred)]
    confidence = float(np.max(pred))  # Convert to native float
    return label, confidence

def classify_V3(sentence):
    print("Using model: AroodV3")
    sentence = preprocess_prosody(sentence)
    sequence = [char2idx.get(char, 0) for char in sentence]
    sequence = pad_sequences([sequence], maxlen=X_train.shape[1], padding='post', value=0)
    pred = AroodV3.predict(sequence)[0]
    label = label2name[np.argmax(pred)]
    confidence = float(np.max(pred))  # Convert to native float
    return label, confidence

def classify_general(model, sentence, model_name):
    print(f"Using model: {model_name}")
    sentence = araby.strip_tashkeel(sentence)
    sentence = araby.strip_tatweel(sentence)
    sequence = [char2idx.get(char, 0) for char in sentence]
    sequence = pad_sequences([sequence], maxlen=X_train.shape[1], padding='post', value=0)
    pred = model.predict(sequence)[0]
    label = label2name[np.argmax(pred)]
    confidence = float(np.max(pred))
    return label, confidence

@app.route('/classify', methods=['POST'])
def classify_route():
    data = request.json
    if not data or 'text' not in data or not data['text'].strip():
        return jsonify({"error": "Please provide a valid text to classify."}), 400

    sentence = data['text']

    with model_lock:  # Ensure classification waits for synchronization to complete
        # Specific classification for V1, V2, and V3
        result_v1 = classify_V1(sentence)
        result_v2 = classify_V2(sentence)
        result_v3 = classify_V3(sentence)

        # General classification for additional models
        additional_predictions = []
        for model_name, model in additional_models.items():
            label, confidence = classify_general(model, sentence, model_name)
            additional_predictions.append({"model": model_name, "bahr": label, "confidence": confidence})

    # Combine all predictions
    predictions = [
        {"model": "AroodV1", "bahr": result_v1[0], "confidence": result_v1[1]},
        {"model": "AroodV2", "bahr": result_v2[0], "confidence": result_v2[1]},
        {"model": "AroodV3", "bahr": result_v3[0], "confidence": result_v3[1]},
        *additional_predictions
    ]
    best_prediction = max(predictions, key=lambda x: x["confidence"])

    return jsonify({
        "predictions": predictions,
        "best_model": best_prediction["model"],
        "bahr": best_prediction["bahr"],
        "confidence_ratio": best_prediction["confidence"]
    })

@app.route('/evaluate', methods=['GET'])
def evaluate():
    results = {}
    with model_lock:  # Ensure evaluation waits for synchronization to complete
        for model_name, model in {**{"AroodV1": AroodV1, "AroodV2": AroodV2, "AroodV3": AroodV3}, **additional_models}.items():
            y_pred_probs = model.predict(X_test)
            y_pred = np.argmax(y_pred_probs, axis=1)

            accuracy = accuracy_score(y_test, y_pred)
            report = classification_report(y_test, y_pred, target_names=label2name, output_dict=True)
            matrix = confusion_matrix(y_test, y_pred).tolist()

            results[model_name] = {
                "accuracy": accuracy,
                "classification_report": report,
                "confusion_matrix": matrix
            }

    return jsonify(results)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

