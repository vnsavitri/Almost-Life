import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import type { Branch } from "@/lib/types";

export default function Branches() {
  const [, navigate] = useLocation();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isDemo = sessionStorage.getItem("almost_demo") === "true";
    const pdfB64 = sessionStorage.getItem("almost_pdf_b64");

    if (!isDemo && !pdfB64) {
      navigate("/upload");
      return;
    }

    const body = isDemo ? { demo: true } : { pdf_b64: pdfB64 };

    fetch("/api/extract-branches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
    navigate("/template-picker");
  };

  return (
    <main
      style={{ backgroundColor: "#F5EFE6", color: "#1A1A1A" }}
      className="min-h-screen flex flex-col items-center px-6"
    >
      <div className="w-full max-w-xl" style={{ paddingTop: "10vh", paddingBottom: "10vh" }}>
        <Link href="/upload">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              color: "#1A1A1A",
              opacity: 0.4,
              letterSpacing: "0.04em",
              cursor: "pointer",
              display: "inline-block",
              marginBottom: "3rem",
            }}
          >
            ← Back
          </span>
        </Link>

        {loading && (
          <div>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 300, marginBottom: "0.75rem" }}>
              Finding your forks
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", opacity: 0.45, marginBottom: "3rem" }}>
              Reading your history...
            </p>
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
            <Link href="/upload">
              <button style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", backgroundColor: "#1A1A1A", color: "#F5EFE6", border: "none", padding: "0.75rem 1.75rem", cursor: "pointer", letterSpacing: "0.04em" }}>
                Try again
              </button>
            </Link>
          </div>
        )}

        {!loading && !error && branches.length > 0 && (
          <div>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: "0.75rem" }}>
              Pick a fork.
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", opacity: 0.45, marginBottom: "3rem" }}>
              These are the moments where everything could have gone differently.
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {branches.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => pickBranch(branch)}
                  style={{ display: "block", width: "100%", textAlign: "left", backgroundColor: "transparent", border: "none", borderTop: "1px solid rgba(26,26,26,0.12)", padding: "1.5rem 0", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(26,26,26,0.04)"; e.currentTarget.style.paddingLeft = "0.75rem"; e.currentTarget.style.paddingRight = "0.75rem"; e.currentTarget.style.margin = "0 -0.75rem"; e.currentTarget.style.width = "calc(100% + 1.5rem)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.paddingRight = "0"; e.currentTarget.style.margin = "0"; e.currentTarget.style.width = "100%"; }}
                >
                  <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2.5rem, 7vw, 3.5rem)", fontWeight: 300, lineHeight: 1, color: "#E07856", opacity: 0.5, marginBottom: "0.5rem" }}>
                    {branch.year}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: 1.55, color: "#1A1A1A", maxWidth: "44ch" }}>
                    {branch.framing}
                  </div>
                </button>
              ))}
              <div style={{ borderTop: "1px solid rgba(26,26,26,0.12)" }} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
