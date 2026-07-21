import type {
  EmployeeFormData,
  PredictionResult,
} from "@/types/employee";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

export async function predictAttrition(
  employee: EmployeeFormData,
): Promise<PredictionResult> {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    let message = "Prediction request failed.";

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        message = errorData.detail;
      } else if (Array.isArray(errorData?.detail)) {
        message = errorData.detail
          .map(
            (item: {
              msg?: string;
              loc?: Array<string | number>;
            }) => {
              const field =
                item.loc?.[item.loc.length - 1] ??
                "field";

              return `${field}: ${
                item.msg ?? "Invalid value"
              }`;
            },
          )
          .join(", ");
      }
    } catch {
      message = `Server returned status ${response.status}.`;
    }

    throw new Error(message);
  }

  return response.json() as Promise<PredictionResult>;
}

export async function checkApiHealth(): Promise<{
  status: "healthy" | "unhealthy";
  model_loaded: boolean;
  model_name: string | null;
  version: string;
}> {
  const response = await fetch(`${API_URL}/health`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to connect to the API.");
  }

  return response.json();
}