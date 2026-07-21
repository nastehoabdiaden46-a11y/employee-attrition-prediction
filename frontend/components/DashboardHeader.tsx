import { BrainCircuit, ShieldCheck } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20">
            <BrainCircuit size={23} />
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-white">
              AttritionIQ
            </p>
            <p className="text-xs text-slate-500">
              Workforce Risk Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200 sm:flex">
            <ShieldCheck size={15} />
            API Ready
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
