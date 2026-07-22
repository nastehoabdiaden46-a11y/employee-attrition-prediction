"use client";

import { useMemo, useState } from "react";
import { Loader2, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { predictAttrition } from "@/src/lib/api";
import type { EmployeeFormData, PredictionResult } from "@/src/types/employee";
import PredictionResultCard from "./PredictionResult";

const initialFormData: EmployeeFormData = {
  Age: 35,
  BusinessTravel: "Travel_Rarely",
  DailyRate: 800,
  Department: "Research & Development",
  DistanceFromHome: 5,
  Education: 3,
  EducationField: "Life Sciences",
  EnvironmentSatisfaction: 3,
  Gender: "Female",
  HourlyRate: 70,
  JobInvolvement: 3,
  JobLevel: 2,
  JobRole: "Research Scientist",
  JobSatisfaction: 3,
  MaritalStatus: "Married",
  MonthlyIncome: 5500,
  MonthlyRate: 15000,
  NumCompaniesWorked: 2,
  Over18: "Y",
  OverTime: "No",
  PercentSalaryHike: 13,
  PerformanceRating: 3,
  RelationshipSatisfaction: 3,
  StockOptionLevel: 1,
  TotalWorkingYears: 10,
  TrainingTimesLastYear: 3,
  WorkLifeBalance: 3,
  YearsAtCompany: 6,
  YearsInCurrentRole: 4,
  YearsSinceLastPromotion: 1,
  YearsWithCurrManager: 3,
};

type NumericKey = {
  [K in keyof EmployeeFormData]: EmployeeFormData[K] extends number ? K : never;
}[keyof EmployeeFormData];

const numericFields: Array<[NumericKey, string, number?, number?]> = [
  ["Age", "Age", 18, 100],
  ["DailyRate", "Daily rate", 0],
  ["DistanceFromHome", "Distance from home", 0],
  ["Education", "Education level", 1, 5],
  ["EnvironmentSatisfaction", "Environment satisfaction", 1, 4],
  ["HourlyRate", "Hourly rate", 0],
  ["JobInvolvement", "Job involvement", 1, 4],
  ["JobLevel", "Job level", 1, 5],
  ["JobSatisfaction", "Job satisfaction", 1, 4],
  ["MonthlyIncome", "Monthly income", 0],
  ["MonthlyRate", "Monthly rate", 0],
  ["NumCompaniesWorked", "Companies worked", 0],
  ["PercentSalaryHike", "Salary hike (%)", 0, 100],
  ["PerformanceRating", "Performance rating", 1, 4],
  ["RelationshipSatisfaction", "Relationship satisfaction", 1, 4],
  ["StockOptionLevel", "Stock option level", 0, 3],
  ["TotalWorkingYears", "Total working years", 0],
  ["TrainingTimesLastYear", "Training times last year", 0],
  ["WorkLifeBalance", "Work-life balance", 1, 4],
  ["YearsAtCompany", "Years at company", 0],
  ["YearsInCurrentRole", "Years in current role", 0],
  ["YearsSinceLastPromotion", "Years since promotion", 0],
  ["YearsWithCurrManager", "Years with manager", 0],
];

const selectFields: Array<{
  name: keyof EmployeeFormData;
  label: string;
  options: string[];
}> = [
  {
    name: "BusinessTravel",
    label: "Business travel",
    options: ["Non-Travel", "Travel_Rarely", "Travel_Frequently"],
  },
  {
    name: "Department",
    label: "Department",
    options: ["Sales", "Research & Development", "Human Resources"],
  },
  {
    name: "EducationField",
    label: "Education field",
    options: [
      "Life Sciences",
      "Medical",
      "Marketing",
      "Technical Degree",
      "Human Resources",
      "Other",
    ],
  },
  {
    name: "Gender",
    label: "Gender",
    options: ["Female", "Male"],
  },
  {
    name: "JobRole",
    label: "Job role",
    options: [
      "Sales Executive",
      "Research Scientist",
      "Laboratory Technician",
      "Manufacturing Director",
      "Healthcare Representative",
      "Manager",
      "Sales Representative",
      "Research Director",
      "Human Resources",
    ],
  },
  {
    name: "MaritalStatus",
    label: "Marital status",
    options: ["Single", "Married", "Divorced"],
  },
  {
    name: "OverTime",
    label: "Overtime",
    options: ["No", "Yes"],
  },
];

export default function EmployeeForm() {
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const completion = useMemo(() => 100, []);

  function updateNumeric(name: NumericKey, value: number) {
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function updateSelect(name: keyof EmployeeFormData, value: string) {
    setFormData((current) => ({ ...current, [name]: value }) as EmployeeFormData);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formData.YearsAtCompany > formData.TotalWorkingYears) {
      toast.error("Years at company cannot exceed total working years.");
      return;
    }

    setLoading(true);
    try {
      const prediction = await predictAttrition(formData);
      setResult(prediction);
      toast.success("Prediction completed successfully.");
      setTimeout(() => {
        document.getElementById("result")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to connect to the API.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-8"
      >
        <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
              Risk assessment form
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Employee profile
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Fill in the employee details below.
            </p>
          </div>

          <div className="min-w-40">
            <div className="mb-2 flex justify-between text-xs text-slate-400">
              <span>Form completion</span>
              <span>{completion}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
            </div>
          </div>
        </div>

        <SectionTitle number="01" title="Personal & job information" />
        <div className="grid gap-5 md:grid-cols-2">
          {selectFields.map((field) => (
            <FieldShell key={field.name} label={field.label}>
              <select
                value={String(formData[field.name])}
                onChange={(event) => updateSelect(field.name, event.target.value)}
                className="field-control"
              >
                {field.options.map((option) => (
                  <option key={option} value={option} className="bg-slate-900">
                    {option.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </FieldShell>
          ))}
        </div>

        <div className="my-8 h-px bg-white/10" />

        <SectionTitle number="02" title="Work metrics & experience" />
        <div className="grid gap-5 md:grid-cols-2">
          {numericFields.map(([name, label, min = 0, max]) => (
            <FieldShell key={name} label={label}>
              <input
                type="number"
                value={formData[name]}
                min={min}
                max={max}
                onChange={(event) =>
                  updateNumeric(name, Number(event.target.value))
                }
                className="field-control"
                required
              />
            </FieldShell>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-4 font-black text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={19} />
                Analyzing employee...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Predict attrition risk
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData(initialFormData);
              setResult(null);
              toast.info("Form reset.");
            }}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold text-slate-300 transition hover:bg-white/10"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          This tool provides decision support only and should not be used as the
          sole basis for employment decisions.
        </p>
      </form>

      <aside id="result" className="xl:sticky xl:top-28 xl:self-start">
        <PredictionResultCard result={result} />
      </aside>

      <style jsx global>{`
        .field-control {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(2, 6, 23, 0.55);
          padding: 0.85rem 1rem;
          color: white;
          outline: none;
          transition: 180ms ease;
        }
        .field-control:focus {
          border-color: rgba(34, 211, 238, 0.55);
          box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.1);
        }
      `}</style>
    </div>
  );
}

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400/10 text-xs font-black text-cyan-300">
        {number}
      </span>
      <h3 className="font-bold text-white">{title}</h3>
    </div>
  );
}

function FieldShell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-medium text-slate-300">{label}</span>
      {children}
    </label>
  );
}
