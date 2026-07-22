👥 Employee Attrition Prediction

A full-stack Machine Learning application that predicts whether an employee is likely to stay or leave an organization.

The project combines a trained classification model, a FastAPI backend, and a modern Next.js frontend to provide real-time employee attrition risk predictions.

🌐 Live Demo

Frontend: https://employee-attrition-prediction-k8ee.vercel.app

API Documentation: https://employee-attrition-prediction-qroi.onrender.com/docs

API Health Check: https://employee-attrition-prediction-qroi.onrender.com/health

The backend is hosted on Render. On the free tier, the first request may take a few seconds while the service wakes up.

📌 Project Overview

Employee attrition can cause organizations to lose productivity, experience higher recruitment costs, and lose valuable knowledge.

This project uses Machine Learning to analyze employee information and estimate the probability that an employee may leave the company.

The application provides:

Attrition prediction

Stay probability

Attrition probability

Risk level

Model information

Real-time API communication

Responsive light and dark interface

✨ Features

Modern and responsive user interface

Light and dark mode

Employee information form

Real-time prediction results

Attrition and retention probabilities

Low, Medium, and High risk classification

Input validation

User-friendly API error messages

FastAPI interactive documentation

Health-check endpoint

CORS configuration for local and production environments

Production deployment with Vercel and Render

🧠 Machine Learning Workflow

The Machine Learning workflow includes:

Loading the employee attrition dataset

Exploring and understanding the data

Cleaning and preprocessing the dataset

Encoding categorical features

Scaling numerical features when required

Splitting the data into training and testing sets

Training classification models

Evaluating model performance

Saving the selected model pipeline

Serving predictions through FastAPI

Prediction Output

A successful prediction returns data similar to:

{
  "prediction": 1,
  "prediction_label": "Likely to Leave",
  "attrition_probability": 0.7244,
  "stay_probability": 0.2756,
  "risk_level": "High",
  "model_name": "Logistic Regression"
}

🛠️ Tech Stack

Machine Learning

Python

Pandas

NumPy

Scikit-learn

Joblib

Jupyter Notebook

Backend

FastAPI

Uvicorn

Pydantic

Python logging

CORS middleware

Frontend

Next.js

React

TypeScript

Tailwind CSS

next-themes

Deployment

Vercel — frontend

Render — backend

GitHub — source control

📁 Project Structure

employee-attrition-prediction/
├── api/
│   ├── app.py
│   ├── schemas.py
│   └── services.py
├── data/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── EmployeeForm.tsx
│   │   │   ├── PredictionResult.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── lib/
│   │   │   └── api.ts
│   │   └── types/
│   │       └── employee.ts
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
├── models/
├── notebooks/
├── reports/
├── tests/
├── requirements.txt
├── .gitignore
└── README.md

🚀 Running the Project Locally

1. Clone the repository

git clone https://github.com/nastehoabdiaden46-a11y/employee-attrition-prediction.git
cd employee-attrition-prediction

🐍 Backend Setup

2. Create a virtual environment

Windows PowerShell

python -m venv .venv
.venv\Scripts\Activate.ps1

Linux or macOS

python3 -m venv .venv
source .venv/bin/activate

3. Install Python dependencies

pip install -r requirements.txt

4. Run FastAPI

uvicorn api.app:app --reload

The backend will run at:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs

Health endpoint:

http://127.0.0.1:8000/health

💻 Frontend Setup

Open a second terminal:

cd frontend
npm install

Create a file named .env.local inside the frontend directory:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

Start the frontend:

npm run dev

Open:

http://localhost:3000

🔐 Environment Variables

Frontend — Vercel

NEXT_PUBLIC_API_URL=https://employee-attrition-prediction-qroi.onrender.com

Do not add /predict to the environment variable. The frontend adds the endpoint automatically.

Backend — Render

ALLOWED_ORIGINS=http://localhost:3000,https://employee-attrition-prediction-k8ee.vercel.app

The value must contain the exact frontend URL without a trailing slash.

Optional backend variable:

LOG_LEVEL=INFO

🔌 API Endpoints

Method

Endpoint

Description

GET

/

Basic API information

GET

/health

Checks API and model status

POST

/predict

Predicts employee attrition

GET

/docs

Swagger API documentation

GET

/redoc

ReDoc API documentation

📤 Prediction Request

Send a POST request to:

https://employee-attrition-prediction-qroi.onrender.com/predict

Example:

curl -X POST \
  "https://employee-attrition-prediction-qroi.onrender.com/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "Age": 35,
    "BusinessTravel": "Travel_Rarely",
    "DailyRate": 800,
    "Department": "Research & Development",
    "DistanceFromHome": 10,
    "Education": 3,
    "EducationField": "Life Sciences",
    "EnvironmentSatisfaction": 3,
    "Gender": "Female",
    "HourlyRate": 65,
    "JobInvolvement": 3,
    "JobLevel": 2,
    "JobRole": "Research Scientist",
    "JobSatisfaction": 3,
    "MaritalStatus": "Single",
    "MonthlyIncome": 5000,
    "MonthlyRate": 15000,
    "NumCompaniesWorked": 2,
    "OverTime": "Yes",
    "PercentSalaryHike": 15,
    "PerformanceRating": 3,
    "RelationshipSatisfaction": 3,
    "StockOptionLevel": 1,
    "TotalWorkingYears": 10,
    "TrainingTimesLastYear": 3,
    "WorkLifeBalance": 3,
    "YearsAtCompany": 5,
    "YearsInCurrentRole": 3,
    "YearsSinceLastPromotion": 1,
    "YearsWithCurrManager": 3
  }'

Field names must match the Pydantic schema defined in api/schemas.py.

🧪 Testing

Run backend tests with:

pytest

Test the frontend production build with:

cd frontend
npm run build

☁️ Deployment

Backend on Render

Recommended commands:

Build command

pip install -r requirements.txt

Start command

uvicorn api.app:app --host 0.0.0.0 --port $PORT

Set the required environment variables in the Render dashboard.

Frontend on Vercel

Import the GitHub repository and configure:

Framework Preset: Next.js
Root Directory: frontend

Add:

NEXT_PUBLIC_API_URL=https://employee-attrition-prediction-qroi.onrender.com

Redeploy the project after changing environment variables.

🐛 Common Issues

Failed to fetch

Check that:

The Render backend is running

NEXT_PUBLIC_API_URL contains the correct backend URL

The URL does not include /predict

ALLOWED_ORIGINS contains the exact Vercel frontend URL

Both Render and Vercel were redeployed after environment variable changes

CORS error

Use:

ALLOWED_ORIGINS=http://localhost:3000,https://employee-attrition-prediction-k8ee.vercel.app

Vercel homepage returns 404

Make sure:

Root Directory: frontend

Also confirm these files exist:

frontend/package.json
frontend/src/app/page.tsx
frontend/src/app/layout.tsx

Model is unavailable

Confirm the trained model files exist inside the models directory and are included in GitHub and the Render deployment.

🔮 Future Improvements

Add user authentication

Store prediction history

Add an HR analytics dashboard

Add model explainability with SHAP

Display feature importance

Add downloadable prediction reports

Add database integration

Add automated testing and CI/CD

Compare additional classification models

Add model monitoring and retraining

⚠️ Disclaimer

This application is an educational Machine Learning project.

Its predictions should not be used as the only basis for employment decisions. Human review, organizational context, fairness, privacy, and ethical considerations must always be included.

👩‍💻 Author

Nasteho Abdi Aadan

GitHub: nastehoabdiaden46-a11y

⭐ Support

If you find this project useful, consider giving the repository a star.

Built with Python, FastAPI, Next.js, TypeScript, and Machine Learning.
