type Step = 1 | 2 | 3 | 4;
const STEPS = ["Upload", "Fork", "Format", "Result"];

export default function StepProgress({ current }: { current: Step }) {
  return (
    <div style={{ width: "100%", borderBottom: "1px solid rgba(26,26,26,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 1.5rem", backgroundColor: "#F5EFE6" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        {STEPS.map((label, i) => {
          const n = (i + 1) as Step;
          const isActive = n === current;
          const isDone = n < current;
          return (
            <span key={label} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.625rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: isActive ? "#E07856" : isDone ? "rgba(26,26,26,0.55)" : "rgba(26,26,26,0.2)",
                fontWeight: isActive ? 500 : 400,
                transition: "color 0.2s",
              }}>
                {String(n).padStart(2, "0")} {label}
              </span>
              {i < STEPS.length - 1 && (
                <span style={{ color: "rgba(26,26,26,0.12)", fontSize: "0.5rem", margin: "0 0.1rem" }}>·</span>
              )}
            </span>
          );
        })}
      </div>
      <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.625rem", color: "rgba(26,26,26,0.2)", letterSpacing: "0.04em" }}>
        {current} / 4
      </span>
    </div>
  );
}
