from __future__ import annotations

import json
import logging
from pathlib import Path
from threading import Lock
from typing import Any

import joblib
import pandas as pd


logger = logging.getLogger(__name__)

PROJECT_ROOT = Path(__file__).resolve().parents[1]

MODEL_PATH = (
    PROJECT_ROOT
    / "models"
    / "best_model.joblib"
)

METADATA_PATH = (
    PROJECT_ROOT
    / "models"
    / "model_metadata.json"
)

_model: Any | None = None
_metadata: dict[str, Any] = {}
_model_lock = Lock()


class ModelNotReadyError(RuntimeError):
    """Raised when the trained model is unavailable."""


class PredictionServiceError(RuntimeError):
    """Raised when prediction processing fails."""


def load_model() -> Any:
    """
    Load and cache the trained machine-learning pipeline.

    The model is loaded only once and reused for future requests.
    """

    global _model, _metadata

    if _model is not None:
        return _model

    with _model_lock:
        if _model is not None:
            return _model

        if not MODEL_PATH.exists():
            raise ModelNotReadyError(
                "Model file was not found at: "
                f"{MODEL_PATH.resolve()}"
            )

        try:
            _model = joblib.load(MODEL_PATH)

        except Exception as exc:
            logger.exception(
                "Failed to load the trained model."
            )

            raise ModelNotReadyError(
                "The model file exists but could not be loaded."
            ) from exc

        if METADATA_PATH.exists():
            try:
                _metadata = json.loads(
                    METADATA_PATH.read_text(
                        encoding="utf-8"
                    )
                )

            except (
                OSError,
                json.JSONDecodeError,
            ):
                logger.warning(
                    "Model metadata could not be loaded."
                )
                _metadata = {}

        logger.info(
            "Model loaded successfully from %s",
            MODEL_PATH.resolve(),
        )

        return _model


def get_model_name() -> str:
    """
    Return the name of the selected machine-learning model.
    """

    evaluation_info = _metadata.get(
        "best_model_evaluation",
        {},
    )

    if evaluation_info.get("best_model"):
        return str(
            evaluation_info["best_model"]
        )

    if _metadata.get("model_type"):
        return str(_metadata["model_type"])

    model = load_model()

    if (
        hasattr(model, "named_steps")
        and "model" in model.named_steps
    ):
        return type(
            model.named_steps["model"]
        ).__name__

    return type(model).__name__


def probability_to_risk_level(
    probability: float | None,
) -> str:
    """
    Convert the attrition probability into a risk category.
    """

    if probability is None:
        return "Unknown"

    if probability < 0.30:
        return "Low"

    if probability < 0.60:
        return "Medium"

    return "High"


def validate_logical_relationships(
    payload: dict[str, Any],
) -> None:
    """
    Validate relationships between employee experience fields.
    """

    errors: list[str] = []

    if (
        payload["YearsAtCompany"]
        > payload["TotalWorkingYears"]
    ):
        errors.append(
            "YearsAtCompany cannot exceed "
            "TotalWorkingYears."
        )

    if (
        payload["YearsInCurrentRole"]
        > payload["YearsAtCompany"]
    ):
        errors.append(
            "YearsInCurrentRole cannot exceed "
            "YearsAtCompany."
        )

    if (
        payload["YearsSinceLastPromotion"]
        > payload["YearsAtCompany"]
    ):
        errors.append(
            "YearsSinceLastPromotion cannot exceed "
            "YearsAtCompany."
        )

    if (
        payload["YearsWithCurrManager"]
        > payload["YearsAtCompany"]
    ):
        errors.append(
            "YearsWithCurrManager cannot exceed "
            "YearsAtCompany."
        )

    if errors:
        raise ValueError(" ".join(errors))


def predict(
    payload: dict[str, Any],
) -> dict[str, Any]:
    """
    Predict employee attrition using raw employee data.
    """

    validate_logical_relationships(payload)

    model = load_model()

    employee_df = pd.DataFrame(
        [payload]
    )

    try:
        prediction = int(
            model.predict(employee_df)[0]
        )

        attrition_probability: float | None = None
        stay_probability: float | None = None

        if hasattr(model, "predict_proba"):
            probabilities = model.predict_proba(
                employee_df
            )[0]

            stay_probability = float(
                probabilities[0]
            )

            attrition_probability = float(
                probabilities[1]
            )

    except Exception as exc:
        logger.exception(
            "Employee attrition prediction failed."
        )

        raise PredictionServiceError(
            "The model could not process the "
            "supplied employee data."
        ) from exc

    return {
        "prediction": prediction,
        "prediction_label": (
            "Likely to Leave"
            if prediction == 1
            else "Likely to Stay"
        ),
        "attrition_probability": (
            round(attrition_probability, 4)
            if attrition_probability is not None
            else None
        ),
        "stay_probability": (
            round(stay_probability, 4)
            if stay_probability is not None
            else None
        ),
        "risk_level": (
            probability_to_risk_level(
                attrition_probability
            )
        ),
        "model_name": get_model_name(),
    }