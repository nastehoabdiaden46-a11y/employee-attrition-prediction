import DashboardHeader from "@/components/DashboardHeader";
import EmployeeForm from "@/components/EmployeeForm";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-[28rem] w-[28rem] rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <DashboardHeader />

      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mb-10 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              AI-powered workforce intelligence
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Predict employee attrition
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                before it impacts your team.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Enter employee details and receive an instant machine-learning
              risk assessment with probability scores and an easy-to-understand
              risk level.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Real-time prediction",
                "Secure local API",
                "Explainable result",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["Model status", "Online", "text-emerald-300"],
              ["Response time", "< 1 sec", "text-cyan-300"],
              ["Prediction type", "Binary", "text-violet-300"],
              ["Best model", "Logistic Regression", "text-blue-300"],
            ].map(([label, value, color]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {label}
                </p>
                <p className={`mt-3 text-lg font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <EmployeeForm />
      </section>
    </main>
  );
}
