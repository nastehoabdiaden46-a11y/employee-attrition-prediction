# Phase 8 — FastAPI Backend

## Required project structure

```text
employee-attrition-prediction/
├── api/
│   ├── __init__.py
│   ├── app.py
│   ├── schemas.py
│   ├── services.py
│   └── sample_request.json
├── models/
│   ├── best_model.joblib
│   └── model_metadata.json
├── requirements.txt
└── .env.example
```

## 1. Copy the files

Copy the generated `api` folder, `requirements.txt`, and `.env.example`
into the root of your project.

Do not place `best_model.joblib` inside the `api` folder. It must remain:

```text
models/best_model.joblib
```

## 2. Activate the virtual environment

### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

### Windows Command Prompt

```cmd
.venv\Scripts\activate
```

## 3. Install dependencies

```bash
python -m pip install -r requirements.txt
```

## 4. Start the API

Run this command from the project root:

```bash
python -m uvicorn api.app:app --reload
```

The API will run at:

```text
http://127.0.0.1:8000
```

## 5. Open Swagger documentation

```text
http://127.0.0.1:8000/docs
```

## Endpoints

### GET `/`

Basic API information.

### GET `/health`

Checks whether the model loaded successfully.

Expected response:

```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_name": "Logistic Regression",
  "version": "1.0.0"
}
```

### POST `/predict`

Accepts raw employee information and returns:

- Class prediction
- Prediction label
- Attrition probability
- Stay probability
- Risk level
- Model name

## Test with PowerShell

```powershell
Invoke-RestMethod `
  -Uri "http://127.0.0.1:8000/predict" `
  -Method Post `
  -ContentType "application/json" `
  -InFile "api/sample_request.json"
```

## Test with curl

```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -H "Content-Type: application/json" \
  --data-binary "@api/sample_request.json"
```

## Common errors

### `Model file was not found`

Confirm this file exists:

```text
models/best_model.joblib
```

Run Phase 6 first if it does not exist.

### `ModuleNotFoundError: No module named 'api'`

Run Uvicorn from the project root, not from inside `api` or `notebooks`.

Correct:

```bash
cd employee-attrition-prediction
python -m uvicorn api.app:app --reload
```

### Model rejects valid-looking input

The model pipeline must have been trained using the same cleaned feature
columns expected by `EmployeeFeatures`. Constant or identifier columns removed
during cleaning must not be added back to the request.
