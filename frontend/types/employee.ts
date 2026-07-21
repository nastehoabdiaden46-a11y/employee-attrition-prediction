export type BusinessTravel =
  | "Non-Travel"
  | "Travel_Frequently"
  | "Travel_Rarely";

export type Department =
  | "Human Resources"
  | "Research & Development"
  | "Sales";

export type EducationField =
  | "Human Resources"
  | "Life Sciences"
  | "Marketing"
  | "Medical"
  | "Other"
  | "Technical Degree";

export type Gender = "Female" | "Male";

export type JobRole =
  | "Healthcare Representative"
  | "Human Resources"
  | "Laboratory Technician"
  | "Manager"
  | "Manufacturing Director"
  | "Research Director"
  | "Research Scientist"
  | "Sales Executive"
  | "Sales Representative";

export type MaritalStatus =
  | "Divorced"
  | "Married"
  | "Single";

export type OverTime = "No" | "Yes";

export interface EmployeeFormData {
  Age: number;
  BusinessTravel: BusinessTravel;
  DailyRate: number;
  Department: Department;
  DistanceFromHome: number;
  Education: number;
  EducationField: EducationField;
  EnvironmentSatisfaction: number;
  Gender: Gender;
  HourlyRate: number;
  JobInvolvement: number;
  JobLevel: number;
  JobRole: JobRole;
  JobSatisfaction: number;
  MaritalStatus: MaritalStatus;
  MonthlyIncome: number;
  MonthlyRate: number;
  NumCompaniesWorked: number;
  Over18: "Y";
  OverTime: OverTime;
  PercentSalaryHike: number;
  PerformanceRating: number;
  RelationshipSatisfaction: number;
  StockOptionLevel: number;
  TotalWorkingYears: number;
  TrainingTimesLastYear: number;
  WorkLifeBalance: number;
  YearsAtCompany: number;
  YearsInCurrentRole: number;
  YearsSinceLastPromotion: number;
  YearsWithCurrManager: number;
}

export interface PredictionResult {
  prediction: number;
  prediction_label:
    | "Likely to Stay"
    | "Likely to Leave";
  attrition_probability: number | null;
  stay_probability: number | null;
  risk_level:
    | "Low"
    | "Medium"
    | "High"
    | "Unknown";
  model_name: string;
}