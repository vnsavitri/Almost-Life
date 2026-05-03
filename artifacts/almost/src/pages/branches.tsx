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
  const returnMode = sessionStorage.getItem("almost_return_mode") === "fork";

  useEffect(() => {
    const isDemo = sessionStorage.getItem("almost_demo") === "true";
    const pdfB64 = sessionStorage.getItem("almost_pdf_b64");
    if (!isDemo && !pdfB64) { navigate("/upload"); return; }

    const cached = sessionStorage.getItem("almost_all_branches");
    if (cached) {
      try { setBranches(JSON.parse(cached)); setLoading(false); return; } catch { /* fall through */ }
    }

    fetch("/api/extract-branches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isDemo ? { demo: true } : { pdf_b64: pdfB64 }),
    })
      .then(r => { if (!r.ok) return r.json().then(d => Promise.reject(d.error || "Server error")); return r.json(); })
      .then(data => { setBranches(data.branches); sessionStorage.setItem("almost_all_branches", JSON.stringify(data.branches)); setLoading(false); })
      .catch(err => { setError(typeof err === "string" ? err : "Something went wrong."); setLoading(false); });
  }, [navigate]);

  const pickBranch = (branch: Branch) => {
    sessionStorage.setItem("almost_branch", JSON.stringify(branch));
    sessionStorage.removeItem("almost_life_result");
    if (returnMode) { sessionStorage.removeItem("almost_return_mode"); navigate("/loading"); }
    else navigate("/template-picker");
  };

  return (
    <main className="grain" style={{ backgroundColor: "#F5EFE6", color: "#1A1A1A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <StepProgress current={2} />

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(26,26,26,0.06)" }}>
        <button
          onClick={() => { sessionStorage.removeItem("almost_return_mode"); navigate(returnMode ? "/result" : "/upload"); }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A1A1A", opacity: 0.35, background: "none", border: "none", cursor: "pointer" }}
        >
          ← {returnMode ? "Back to result" : "Back"}
        </button>
        <button onClick={() => { clearSession(); navigate("/"); }} style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "1rem", color: "#1A1A1A", opacity: 0.35, background: "none", border: "none", cursor: "pointer" }}>
          Almost
        </button>
        <button onClick={() => { clearSession(); navigate("/"); }} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A1A1A", opacity: 0.25, background: "none", border: "none", cursor: "pointer" }}>
          Start over
        </button>
      </div>

      <div style={{ flex: 1, maxWidth: "860px", width: "100%", margin: "0 auto", padding: "3rem 2rem 5rem" }}>

        {/* Page header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", borderBottom: "1px solid rgba(26,26,26,0.1)", paddingBottom: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#E07856", opacity: 0.7, marginBottom: "0.5rem" }}>Step two</p>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {returnMode ? "Pick a different fork" : "Where did the road fork?"}
            </h1>
          </div>
          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "5rem", fontWeight: 200, color: "#1A1A1A", opacity: 0.05, lineHeight: 1, flexShrink: 0, marginLeft: "1rem" }}>02</span>
        </div>

        {loading && (
          <div>
            <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.9375rem", opacity: 0.35, marginBottom: "2.5rem" }}>Reading your history...</p>
            <style>{`@keyframes shimmer { 0%,100%{opacity:.3} 50%{opacity:.7} }`}</style>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ borderTop: "1px solid rgba(26,26,26,0.1)", padding: "2rem 0", display: "flex", gap: "2rem" }}>
                <div style={{ width: "5rem", height: "4rem", backgroundColor: "rgba(26,26,26,0.06)", animation: `shimmer 1.8s ease-in-out ${i * 0.2}s infinite` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: "0.875rem", backgroundColor: "rgba(26,26,26,0.06)", marginBottom: "0.5rem", width: "70%", animation: `shimmer 1.8s ease-in-out ${i * 0.2 + 0.1}s infinite` }} />
                  <div style={{ height: "0.875rem", backgroundColor: "rgba(26,26,26,0.06)", width: "50%", animation: `shimmer 1.8s ease-in-out ${i * 0.2 + 0.2}s infinite` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{ padding: "2rem 0" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#E07856", marginBottom: "1.5rem" }}>{error}</p>
            <button onClick={() => navigate("/upload")} className="ruled-action">← Try again</button>
          </div>
        )}

        {!loading && !error && (
          <div>
            {returnMode && (
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.875rem", opacity: 0.4, marginBottom: "2rem" }}>
                Same format. A different moment. New alternate life.
              </p>
            )}
            {branches.map((branch, idx) => (
              <button
                key={branch.id}
                onClick={() => pickBranch(branch)}
                style={{ display: "grid", gridTemplateColumns: "6rem 1fr", gap: "2rem", alignItems: "start", width: "100%", textAlign: "left", background: "none", border: "none", borderTop: "1px solid rgba(26,26,26,0.1)", padding: "2rem 0", cursor: "pointer", transition: "padding-left 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.paddingLeft = "0.75rem"; (e.currentTarget.querySelector(".yr") as HTMLElement).style.color = "#E07856"; (e.currentTarget.querySelector(".yr") as HTMLElement).style.opacity = "0.7"; }}
                onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; (e.currentTarget.querySelector(".yr") as HTMLElement).style.color = "#1A1A1A"; (e.currentTarget.querySelector(".yr") as HTMLElement).style.opacity = "0.12"; }}
              >
                <span className="yr" style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 200, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1, color: "#1A1A1A", opacity: 0.12, letterSpacing: "-0.02em", transition: "color 0.2s, opacity 0.2s", display: "block", paddingTop: "0.1rem" }}>
                  {branch.year}
                </span>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1A1A1A", opacity: 0.3, marginBottom: "0.5rem" }}>
                    Fork {String(idx + 1).padStart(2, "0")}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: 1.6, color: "#1A1A1A", maxWidth: "44ch" }}>{branch.framing}</p>
                  <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.8125rem", color: "#1A1A1A", opacity: 0.35, marginTop: "0.5rem" }}>{branch.context}</p>
                </div>
              </button>
            ))}
            {branches.length > 0 && <div style={{ borderTop: "1px solid rgba(26,26,26,0.1)" }} />}
          </div>
        )}
      </div>
    </main>
  );
}
