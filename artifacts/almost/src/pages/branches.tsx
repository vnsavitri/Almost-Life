import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import type { Branch } from "@/lib/types";
import { clearSession } from "@/lib/session";
import StepProgress from "@/components/StepProgress";

export default function Branches() {
  const [, navigate] = useLocation();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // If user came back from result to try a different fork, skip template-picker
  const returnMode = sessionStorage.getItem("almost_return_mode") === "fork";

  useEffect(() => {
    const isDemo = sessionStorage.getItem("almost_demo") === "true";
    const pdfB64 = sessionStorage.getItem("almost_pdf_b64");
    if (!isDemo && !pdfB64) { navigate("/upload"); return; }

    // Use cached branches if available — no extra API call
    const cached = sessionStorage.getItem("almost_all_branches");
    if (cached) {
      try {
        setBranches(JSON.parse(cached));
        setLoading(false);
        return;
      } catch {
        // fall through to fetch
      }
    }

    fetch("/api/extract-branches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isDemo ? { demo: true } : { pdf_b64: pdfB64 }),
    })
      .then((r) => {
        if (!r.ok) return r.json().then((d) => Promise.reject(d.error || "Server error"));
        return r.json();
      })
      .then((data) => {
        setBranches(data.branches);
        sessionStorage.setItem("almost_all_branches", JSON.stringify(data.branches));
        setLoading(false);
      })
      .catch((err) => {
        setError(typeof err === "string" ? err : "Something went wrong. Try again.");
        setLoading(false);
      });
  }, [navigate]);

  const pickBranch = (branch: Branch) => {
    sessionStorage.setItem("almost_branch", JSON.stringify(branch));
    sessionStorage.removeItem("almost_life_result");
    if (returnMode) {
      // Coming back from result — keep same template, go straight to loading
      sessionStorage.removeItem("almost_return_mode");
      navigate("/loading");
    } else {
      navigate("/template-picker");
    }
  };

  return (
    <main style={{ backgroundColor: "#F5EFE6", color: "#1A1A1A" }} className="min-h-screen flex flex-col">
      <StepProgress current={2} />

      {/* Top nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem" }}>
        <button
          onClick={() => {
            sessionStorage.removeItem("almost_return_mode");
            navigate(returnMode ? "/result" : "/upload");
          }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#1A1A1A", opacity: 0.4, letterSpacing: "0.04em", cursor: "pointer", background: "none", border: "none" }}
        >
          ← {returnMode ? "Back to result" : "Back"}
        </button>
        <button onClick={() => { clearSession(); navigate("/"); }} style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.9375rem", color: "#1A1A1A", opacity: 0.4, background: "none", border: "none", cursor: "pointer" }}>
          Almost
        </button>
        <button onClick={() => { clearSession(); navigate("/"); }} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#1A1A1A", opacity: 0.25, letterSpacing: "0.04em", cursor: "pointer", background: "none", border: "none" }}>
          Start over
        </button>
      </div>

      <div className="flex flex-col items-center flex-1 px-6">
        <div className="w-full max-w-xl" style={{ paddingTop: "6vh", paddingBottom: "10vh" }}>
          {loading && (
            <div>
              <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 300, marginBottom: "0.75rem" }}>Finding your forks</h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", opacity: 0.45, marginBottom: "3rem" }}>Reading your history...</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ height: "5rem", backgroundColor: "rgba(26,26,26,0.06)", borderRadius: "2px", animation: "pulse 1.8s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <style>{`@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }`}</style>
            </div>
          )}

          {error && (
            <div>
              <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "2rem", fontWeight: 300, marginBottom: "1rem" }}>Something broke.</h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#E07856", marginBottom: "2rem" }}>{error}</p>
              <button onClick={() => navigate("/upload")} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", backgroundColor: "#1A1A1A", color: "#F5EFE6", border: "none", padding: "0.75rem 1.75rem", cursor: "pointer", letterSpacing: "0.04em" }}>
                Try again
              </button>
            </div>
          )}

          {!loading && !error && branches.length > 0 && (
            <div>
              <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: "0.75rem" }}>
                {returnMode ? "Pick a different fork." : "Pick a fork."}
              </h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", opacity: 0.45, marginBottom: "3rem" }}>
                {returnMode
                  ? "Choose a different moment. Same format, new life generated."
                  : "These are the moments where everything could have gone differently."}
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => pickBranch(branch)}
                    style={{ display: "block", width: "100%", textAlign: "left", backgroundColor: "transparent", border: "none", borderTop: "1px solid rgba(26,26,26,0.12)", padding: "1.5rem 0", cursor: "pointer", transition: "padding 0.15s, background-color 0.15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(26,26,26,0.04)"; e.currentTarget.style.paddingLeft = "0.75rem"; e.currentTarget.style.paddingRight = "0.75rem"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.paddingRight = "0"; }}
                  >
                    <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2.5rem, 7vw, 3.5rem)", fontWeight: 300, lineHeight: 1, color: "#E07856", opacity: 0.5, marginBottom: "0.5rem" }}>{branch.year}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: 1.55, color: "#1A1A1A", maxWidth: "44ch" }}>{branch.framing}</div>
                  </button>
                ))}
                <div style={{ borderTop: "1px solid rgba(26,26,26,0.12)" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
