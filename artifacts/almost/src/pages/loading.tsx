import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import type { Branch } from "@/lib/types";

const ONE_LINERS = [
  "Considering the lives you didn't live...",
  "Calculating the apartment you didn't rent...",
  "Reviewing the breakup you didn't have...",
  "Auditing your unwritten LinkedIn posts...",
  "Cross-referencing your parallel divorces...",
];

function extractAlt(framing: string): string {
  const m = framing.match(/[Ww]hat if (.+?)\??$/);
  return m ? m[1].replace(/^you'?d?\s+/i, "").slice(0, 22) : "another path";
}

function shortContext(ctx: string): string {
  return ctx.split(" ").slice(0, 4).join(" ");
}

interface Marker { year: string; label: string; pct: number; }

export default function Loading() {
  const [, navigate] = useLocation();
  const [oneLinerIndex, setOneLinerIndex] = useState(0);
  const [oneLinerVisible, setOneLinerVisible] = useState(true);
  const [visibleTop, setVisibleTop] = useState<number[]>([]);
  const [visibleBottom, setVisibleBottom] = useState<number[]>([]);
  const [topMarkers, setTopMarkers] = useState<Marker[]>([]);
  const [bottomMarkers, setBottomMarkers] = useState<Marker[]>([]);
  const calledRef = useRef(false);

  useEffect(() => {
    const branchRaw = sessionStorage.getItem("almost_branch");
    if (!branchRaw) { navigate("/branches"); return; }

    const branch: Branch = JSON.parse(branchRaw);
    const allBranches: Branch[] = JSON.parse(sessionStorage.getItem("almost_all_branches") || "[]");

    const pool = allBranches.length > 0 ? allBranches : [branch];
    const positions = [12, 34, 58, 80];
    setTopMarkers(pool.slice(0, 4).map((b, i) => ({ year: b.year, label: shortContext(b.context), pct: positions[i] })));
    setBottomMarkers(pool.slice(0, 4).map((b, i) => ({ year: b.year, label: extractAlt(b.framing), pct: positions[i] })));

    const timers: ReturnType<typeof setTimeout>[] = [];
    pool.slice(0, 4).forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleTop((p) => [...p, i]), 1500 + i * 2000));
      timers.push(setTimeout(() => setVisibleBottom((p) => [...p, i]), 2200 + i * 2000));
    });

    const liner = setInterval(() => {
      setOneLinerVisible(false);
      setTimeout(() => { setOneLinerIndex((i) => (i + 1) % ONE_LINERS.length); setOneLinerVisible(true); }, 400);
    }, 3000);

    // Generate just the first template (linkedin_ghost) — ~10-15s, under the 30s proxy limit
    if (!calledRef.current) {
      calledRef.current = true;
      const isDemo = sessionStorage.getItem("almost_demo") === "true";
      const pdfB64 = sessionStorage.getItem("almost_pdf_b64");

      // Clear any stale cached templates
      ["linkedin_ghost", "wiki_stub", "museum_plaque", "tarot_card"].forEach((t) =>
        sessionStorage.removeItem(`almost_life_${t}`)
      );
      sessionStorage.removeItem("almost_life_core");

      fetch("/api/generate-life", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branch,
          template_type: "linkedin_ghost",
          demo: isDemo || undefined,
          pdf_b64: pdfB64 || undefined,
        }),
      })
        .then((r) => {
          if (!r.ok) throw new Error("generation failed");
          return r.json();
        })
        .then((data) => {
          if (data.life) {
            // Cache the core fields and the first template separately
            const { linkedin_ghost, ...core } = data.life;
            sessionStorage.setItem("almost_life_core", JSON.stringify(core));
            sessionStorage.setItem("almost_life_linkedin_ghost", JSON.stringify(linkedin_ghost));
          }
          navigate("/result");
        })
        .catch(() => navigate("/result"));
    }

    const bail = setTimeout(() => navigate("/result"), 28000);

    return () => {
      clearInterval(liner);
      clearTimeout(bail);
      timers.forEach(clearTimeout);
    };
  }, [navigate]);

  return (
    <main style={{ backgroundColor: "#F5EFE6", color: "#1A1A1A" }} className="min-h-screen flex flex-col items-center justify-center px-8">
      <style>{`
        @keyframes dot-travel { 0% { left: -12px; } 100% { left: calc(100% + 12px); } }
        @keyframes marker-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .dot-top { animation: dot-travel 9s linear infinite; }
        .dot-bottom { animation: dot-travel 9s linear infinite; animation-delay: -0.5s; }
        .marker-in { animation: marker-in 0.5s ease forwards; }
        .liner-in { animation: fade-in 0.4s ease forwards; }
      `}</style>

      <div style={{ width: "100%", maxWidth: "680px" }}>
        {/* Top line */}
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.35, marginBottom: "0.6rem" }}>this life</div>
          <div style={{ position: "relative", height: "24px" }}>
            <div style={{ position: "absolute", top: "11px", left: 0, right: 0, height: "1.5px", backgroundColor: "#1A1A1A" }} />
            <div className="dot-top" style={{ position: "absolute", top: "5px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#1A1A1A" }} />
            {topMarkers.map((m, i) => visibleTop.includes(i) ? (
              <div key={i} className="marker-in" style={{ position: "absolute", left: `${m.pct}%`, top: "-30px", transform: "translateX(-50%)", textAlign: "center", opacity: 0 }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "0.6rem", fontStyle: "italic", color: "#1A1A1A", opacity: 0.55, whiteSpace: "nowrap" }}>{m.year}: {m.label}</div>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#1A1A1A", opacity: 0.4, margin: "3px auto 0" }} />
              </div>
            ) : null)}
          </div>
        </div>

        {/* Bottom line */}
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#E07856", opacity: 0.6, marginBottom: "0.6rem" }}>the other one</div>
          <div style={{ position: "relative", height: "24px" }}>
            <div style={{ position: "absolute", top: "11px", left: 0, right: 0, height: "1.5px", backgroundImage: "repeating-linear-gradient(90deg, #E07856 0px, #E07856 8px, transparent 8px, transparent 16px)", opacity: 0.5 }} />
            <div className="dot-bottom" style={{ position: "absolute", top: "5px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#E07856", opacity: 0.7 }} />
            {bottomMarkers.map((m, i) => visibleBottom.includes(i) ? (
              <div key={i} className="marker-in" style={{ position: "absolute", left: `${m.pct}%`, bottom: "-30px", transform: "translateX(-50%)", textAlign: "center", opacity: 0 }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#E07856", opacity: 0.5, margin: "0 auto 3px" }} />
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "0.6rem", fontStyle: "italic", color: "#E07856", opacity: 0.7, whiteSpace: "nowrap" }}>{m.year}: {m.label}</div>
              </div>
            ) : null)}
          </div>
        </div>

        {/* One-liner */}
        <div style={{ textAlign: "center", minHeight: "2rem" }}>
          <p className={oneLinerVisible ? "liner-in" : ""} style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(0.875rem, 2.5vw, 1rem)", color: "#1A1A1A", opacity: oneLinerVisible ? 0.65 : 0, transition: "opacity 0.4s ease", letterSpacing: "0.01em" }}>
            {ONE_LINERS[oneLinerIndex]}
          </p>
        </div>
      </div>
    </main>
  );
}
