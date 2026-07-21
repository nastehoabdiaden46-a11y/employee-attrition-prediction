from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class EmployeeFeatures(BaseModel):
    """Employee data expected by the machine-learning model."""

    model_config = ConfigDict(
        extra="forbid",
        json_schema_extra={
            "example": {
                "Age": 41,
                "BusinessTravel": "Travel_Rarely",
                "DailyRate": 1102,
                "Department": "Sales",
                "DistanceFromHome": 1,
                "Education": 2,
                "EducationField": "Life Sciences",
                "EnvironmentSatisfaction": 2,
                "Gender": "Female",
                "HourlyRate": 94,
                "JobInvolvement": 3,
                "JobLevel": 2,
                "JobRole": "Sales Executive",
                "JobSatisfaction": 4,
                "MaritalStatus": "Single",
                "MonthlyIncome": 5993,
                "MonthlyRate": 19479,
                "NumCompaniesWorked": 8,
                "Over18": "Y",
                "OverTime": "Yes",
                "PercentSalaryHike": 11,
                "PerformanceRating": 3,
                "RelationshipSatisfaction": 1,
                "StockOptionLevel": 0,
                "TotalWorkingYears": 8,
                "TrainingTimesLastYear": 0,
                "WorkLifeBalance": 1,
                "YearsAtCompany": 6,
                "YearsInCurrentRole": 4,
                "YearsSinceLastPromotion": 0,
                "YearsWithCurrManager": 5,
            }
        },
    )

    Age: int = Field(ge=18, le=100)

    BusinessTravel: Literal[
        "Non-Travel",
        "Travel_Frequently",
        "Travel_Rarely",
    ]

    DailyRate: int = Field(ge=0)

    Department: Literal[
        "Human Resources",
        "Research & Development",
        "Sales",
    ]

    DistanceFromHome: int = Field(ge=0)

    Education: int = Field(ge=1, le=5)

    EducationField: Literal[
        "Human Resources",
        "Life Sciences",
        "Marketing",
        "Medical",
        "Other",
        "Technical Degree",
    ]

    EnvironmentSatisfaction: int = Field(ge=1, le=4)

    Gender: Literal[
        "Female",
        "Male",
    ]

    HourlyRate: int = Field(ge=0)

    JobInvolvement: int = Field(ge=1, le=4)

    JobLevel: int = Field(ge=1, le=5)

    JobRole: Literal[
        "Healthcare Representative",
        "Human Resources",
        "Laboratory Technician",
        "Manager",
        "Manufacturing Director",
        "Research Director",
        "Research Scientist",
        "Sales Executive",
        "Sales Representative",
    ]

    JobSatisfaction: int = Field(ge=1, le=4)

    MaritalStatus: Literal[
        "Divorced",
        "Married",
        "Single",
    ]

    MonthlyIncome: int = Field(ge=0)

    MonthlyRate: int = Field(ge=0)

    NumCompaniesWorked: int = Field(ge=0)

    Over18: Literal["Y"] = "Y"

    OverTime: Literal[
        "No",
        "Yes",
    ]

    PercentSalaryHike: int = Field(ge=0, le=100)

    PerformanceRating: int = Field(ge=1, le=4)

    RelationshipSatisfaction: int = Field(ge=1, le=4)

    StockOptionLevel: int = Field(ge=0, le=3)

    TotalWorkingYears: int = Field(ge=0)

    TrainingTimesLastYear: int = Field(ge=0)

    WorkLifeBalance: int = Field(ge=1, le=4)

    YearsAtCompany: int = Field(ge=0)

    YearsInCurrentRole: int = Field(ge=0)

    YearsSinceLastPromotion: int = Field(ge=0)

    YearsWithCurrManager: int = Field(ge=0)


class PredictionResponse(BaseModel):
    prediction: int

    prediction_label: Literal[
        "Likely to Stay",
        "Likely to Leave",
    ]

    attrition_probability: float | None

    stay_probability: float | None

    risk_level: Literal[
        "Low",
        "Medium",
        "High",
        "Unknown",
    ]

    model_name: str


class HealthResponse(BaseModel):
    status: Literal[
        "healthy",
        "unhealthy",
    ]

    model_loaded: bool

    model_name: str | None = None

    version: str


class ErrorResponse(BaseModel):
    detail: str