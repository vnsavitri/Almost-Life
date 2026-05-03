type Step = 1 | 2 | 3 | 4;

const STEPS = ["Upload", "Fork", "Format", "Result"];

export default function StepProgress({ current }: { current: Step }) {
  return (
    <div style={{ width: "100%", backgroundColor: "#F5EFE6", padding: "0.75rem 1.5rem 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 0, maxWidth: "480px", width: "100%" }}>
        {STEPS.map((label, i) => {
          const stepNum = (i + 1) as Step;
          const isDone = stepNum < current;
          const isActive = stepNum === current;
          const isUpcoming = stepNum > current;
          const isLast = i === STEPS.length - 1;

          return (
            <div key={label} style={{ display: "flex", alignItems: "center", flex: isLast ? "none" : 1 }}>
              {/* Step */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: isActive ? "#E07856" : isDone ? "#1A1A1A" : "rgba(26,26,26,0.15)",
                    transition: "background-color 0.2s ease",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.5625rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: isActive ? "#E07856" : isDone ? "#1A1A1A" : "rgba(26,26,26,0.25)",
                    whiteSpace: "nowrap",
                    transition: "color 0.2s ease",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {label}
                </span>
              </div>
              {/* Connector */}
              {!isLast && (
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    marginBottom: "14px",
                    backgroundColor: isDone ? "rgba(26,26,26,0.3)" : "rgba(26,26,26,0.1)",
                    transition: "background-color 0.2s ease",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
