# Arood Platform

[![Demo](https://img.shields.io/badge/Demo-YouTube-FF0000?style=social&logo=youtube)](https://www.youtube.com/watch?v=9bsCSzAySrY)


Arabic poetry analysis and generation. 

<p align = 'center'>
<img src='https://raw.githubusercontent.com/0bada02/Arood-Platform/master/Arood.png' width='300px' alt='logo for Arood'/>
</p>

## Overview
This project introduces an advanced **AI-powered Arabic Poetry Analysis Platform** that leverages **Natural Language Processing (NLP)** and **Recurrent Neural Networks (RNNs)** to classify Arabic poetic meters (**Buhur**). Arabic poetry holds immense cultural significance and adheres to intricate rhythmic structures, traditionally analyzed using **prosody (Arud)**. Our platform automates this analysis with high accuracy using deep learning techniques.

## Features

- **AI-Powered Poetry Meter Classification**: Uses three custom-trained RNN models (**AroodV1, AroodV2, and AroodV3**) to classify poetry meters with high accuracy.
- **State-of-the-Art Model Performance**: The best model (**AroodV2**) achieves **96.01% accuracy**.
- **User-Friendly Web Interface**: Built with **React** for interactive poetry analysis.
- **Backend with Flask and Spring Boot**: Efficiently handles model inference and API interactions.
- **Model Extensibility**: Users can download pre-trained models or upload custom models for experimentation.
- **Docker-Based Deployment**: Ensures scalability and ease of integration across platforms.

## Technologies Used

- **Machine Learning & NLP**: TensorFlow, PyTorch, RNNs, ByT5 model
- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Flask (Python), Spring Boot (Java)
- **Database & API**: REST APIs, Microservices Architecture
- **Deployment**: Docker, Docker-Compose

## Project Structure

```
├── backend/           # Spring Boot backend for API handling
├── frontend/          # React-based UI for poetry analysis
├── models/            # Pre-trained AI models (AroodV1, AroodV2, AroodV3)
├── python-api/        # Flask API for ML model inference
├── data/              # Poetry dataset (train & test sets)
├── docker-compose.yml # Docker deployment configuration
└── README.md          # Project documentation
```

## Installation & Setup

### Prerequisites

- Install **Docker** and **Docker-Compose**
- Clone this repository:
  ```bash
  git clone https://github.com/yourusername/AI-Arabic-Poetry-Analysis.git
  cd AI-Arabic-Poetry-Analysis
  ```

### Run the Application

To start all services using Docker:

```bash
docker-compose up --build
```

This will launch the **frontend (React), backend (Spring Boot), and Python API (Flask)** services.

### Access the Application

Once running, open your browser and go to:

```
http://localhost:3000
```

## Usage

1. **Input Arabic Poetry**: Enter a verse in the web application.
2. **Analyze Poetic Meter**: The system predicts the poetic meter using the best-performing AI model.
3. **Compare Models**: Users can evaluate different models and upload their own trained models.
4. **Download Pre-Trained Models**: Available for further research and experimentation.

## Results & Model Performance

| Model   | Accuracy |
| ------- | -------- |
| AroodV1 | 93.49%   |
| AroodV2 | 96.01%   |
| AroodV3 | 95.25%   |

The **AroodV2 model** outperforms others, demonstrating the effectiveness of optimized preprocessing techniques.

## Dataset

The dataset was collected from **Aldiwan**, containing **55,440 verses** labeled with their respective poetic meters.

- **Training Set**: 47,124 verses
- **Testing Set**: 8,316 verses
- Covers **14 poetic meters** used in classical Arabic poetry.

## Contributors

- **Abdel Rahman Ibrahim Jebril**
- **Obada Omar Abu IShtayya**

## License

This project is licensed under the **MIT License**.
