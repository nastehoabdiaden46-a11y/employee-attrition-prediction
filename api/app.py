from contextlib import asynccontextmanager
import logging
import os

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from api.schemas import (
    EmployeeFeatures,
    ErrorResponse,
    HealthResponse,
    PredictionResponse,
)

from api.services import (
    ModelNotReadyError,
    PredictionServiceError,
    get_model_name,
    load_model,
    predict,
)


API_VERSION = "1.0.0"


logging.basicConfig(
    level=os.getenv(
        "LOG_LEVEL",
        "INFO",
    ).upper(),
    format=(
        "%(asctime)s | "
        "%(levelname)s | "
        "%(name)s | "
        "%(message)s"
    ),
)

logger = logging.getLogger(__name__)


def get_allowed_origins() -> list[str]:
    """
    Read allowed frontend origins from environment variables.
    """

    origins = os.getenv(
        "ALLOWED_ORIGINS",
        (
            "http://localhost:3000,"
            "http://127.0.0.1:3000"
        ),
    )

    return [
        origin.strip()
        for origin in origins.split(",")
        if origin.strip()
    ]


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Load the machine-learning model when FastAPI starts.
    """

    try:
        load_model()

        logger.info(
            "Employee attrition model is ready."
        )

    except ModelNotReadyError as exc:
        logger.error(
            "API started without a usable model: %s",
            exc,
        )

    yield


app = FastAPI(
    title="Employee Attrition Prediction API",
    description=(
        "Predict whether an employee is likely "
        "to stay or leave using a trained "
        "machine-learning pipeline."
    ),
    version=API_VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ModelNotReadyError)
async def model_not_ready_handler(
    request: Request,
    exc: ModelNotReadyError,
) -> JSONResponse:
    """
    Return HTTP 503 when the model is unavailable.
    """

    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={
            "detail": str(exc),
        },
    )


@app.exception_handler(PredictionServiceError)
async def prediction_error_handler(
    request: Request,
    exc: PredictionServiceError,
) -> JSONResponse:
    """
    Return HTTP 500 when prediction processing fails.
    """

    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": str(exc),
        },
    )


@app.get(
    "/",
    tags=["General"],
)
def root() -> dict[str, str]:
    """
    Return basic API information.
    """

    return {
        "message": "Employee Attrition Prediction API",
        "documentation": "/docs",
        "health": "/health",
        "prediction": "/predict",
    }


@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["General"],
)
def health_check() -> HealthResponse:
    """
    Check whether the model loaded successfully.
    """

    try:
        load_model()

        return HealthResponse(
            status="healthy",
            model_loaded=True,
            model_name=get_model_name(),
            version=API_VERSION,
        )

    except ModelNotReadyError:
        return HealthResponse(
            status="unhealthy",
            model_loaded=False,
            model_name=None,
            version=API_VERSION,
        )


@app.post(
    "/predict",
    response_model=PredictionResponse,
    responses={
        422: {
            "model": ErrorResponse,
            "description": "Request validation error",
        },
        503: {
            "model": ErrorResponse,
            "description": "Model is unavailable",
        },
    },
    tags=["Prediction"],
)
def predict_attrition(
    employee: EmployeeFeatures,
) -> PredictionResponse:
    """
    Predict employee attrition.
    """

    try:
        result = predict(
            employee.model_dump()
        )

        return PredictionResponse(
            **result
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(exc),
        ) from exc