import {
  AlertTriangle,
  CheckCircle2,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import type { PredictionResult } from "@/types/employee";

interface Props {
  result: PredictionResult | null;
}

export default function PredictionResultCard({ result }: Props) {
  if (!result) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center backdrop-blur-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/5 text-slate-500">
          <Gauge size={30} />
        </div>
        <h3 className="mt-5 text-xl font-bold text-white">
          Your prediction will appear here
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          Complete the employee form and click the prediction button to view
          attrition probability and risk classification.
        </p>
      </div>
    );
  }

  const attrition = Math.max(
    0,
    Math.min(100, result.attrition_probability * 100),
  );
  const stay = Math.max(0, Math.min(100, result.stay_probability * 100));
  const highRisk = result.risk_level === "High";
  const mediumRisk = result.risk_level === "Medium";

  const accent = highRisk
    ? "from-rose-500 to-orange-500"
    : mediumRisk
      ? "from-amber-400 to-orange-500"
      : "from-emerald-400 to-cyan-500";

  const Icon = highRisk ? AlertTriangle : CheckCircle2;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl">
      <div className={`h-1.5 bg-gradient-to-r ${accent}`} />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}>
              <Icon size={28} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Prediction result
              </p>
              <h3 className="mt-1 text-2xl font-black text-white">
                {result.prediction_label}
              </h3>
            </div>
          </div>

          <span className={`w-fit rounded-full bg-gradient-to-r ${accent} px-4 py-2 text-sm font-bold text-white`}>
            {result.risk_level} Risk
          </span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ProbabilityBar
            label="Attrition probability"
            value={attrition}
            gradient="from-rose-500 to-orange-400"
          />
          <ProbabilityBar
            label="Stay probability"
            value={stay}
            gradient="from-emerald-400 to-cyan-400"
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Prediction code
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {result.prediction}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Model used
            </p>
            <div className="mt-2 flex items-center gap-2 text-base font-bold text-white">
              <ShieldCheck size={18} className="text-cyan-300" />
              {result.model_name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProbabilityBar({
  label,
  value,
  gradient,
}: {
  label: string;
  value: number;
  gradient: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="text-lg font-black text-white">{value.toFixed(1)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
