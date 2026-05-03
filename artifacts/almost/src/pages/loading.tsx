import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import type { Branch } from "@/lib/types";
import { getOneLinerPool } from "@/lib/one-liners";

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
  const poolRef = useRef<string[]>([]);
  const calledRef = useRef(false);

  useEffect(() => {
    const branchRaw = sessionStorage.getItem("almost_branch");
    if (!branchRaw) { navigate("/branches"); return; }

    const branch: Branch = JSON.parse(branchRaw);
    const allBranches: Branch[] = JSON.parse(sessionStorage.getItem("almost_all_branches") || "[]");
    const templateType = sessionStorage.getItem("almost_template_type") || "linkedin_ghost";
    const isDemo = sessionStorage.getItem("almost_demo") === "true";

    poolRef.current = getOneLinerPool(isDemo);

    const pool = allBranches.length > 0 ? allBranches : [branch];
    const positions = [12, 34, 58, 80];
    setTopMarkers(pool.slice(0, 4).map((b, i) => ({ year: b.year, label: shortContext(b.context), pct: positions[i] })));
    setBottomMarkers(pool.slice(0, 4).map((b, i) => ({ year: b.year, label: extractAlt(b.framing), pct: positions[i] })));

    const timers: ReturnType<typeof setTimeout>[] = [];
    pool.slice(0, 4).forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleTop(p => [...p, i]), 1500 + i * 2000));
      timers.push(setTimeout(() => setVisibleBottom(p => [...p, i]), 2200 + i * 2000));
    });

    const liner = setInterval(() => {
      setOneLinerVisible(false);
      setTimeout(() => { setOneLinerIndex(i => (i + 1) % poolRef.current.length); setOneLinerVisible(true); }, 400);
    }, 3000);

    if (!calledRef.current) {
      calledRef.current = true;
      const pdfB64 = sessionStorage.getItem("almost_pdf_b64");
      sessionStorage.removeItem("almost_life_result");

      fetch("/api/generate-life", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ branch, template_type: templateType, demo: isDemo || undefined, pdf_b64: pdfB64 || undefined }),
      })
        .then(r => { if (!r.ok) throw new Error("failed"); return r.json(); })
        .then(data => { if (data.life) sessionStorage.setItem("almost_life_result", JSON.stringify(data.life)); navigate("/result"); })
        .catch(() => navigate("/result"));
    }

    const bail = setTimeout(() => navigate("/result"), 27000);
    return () => { clearInterval(liner); clearTimeout(bail); timers.forEach(clearTimeout); };
  }, [navigate]);

  const currentLiner = poolRef.current[oneLinerIndex] ?? "Considering the lives you didn't live...";

  return (
    <main className="grain" style={{ backgroundColor: "#BCD2EE", color: "#52050A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(82,5,10,0.06)" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#832161", opacity: 0.6 }}>Generating</span>
        <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "1rem", color: "#52050A", opacity: 0.35 }}>Almost</span>
        <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "5rem", fontWeight: 200, color: "#52050A", opacity: 0.05, lineHeight: 1, userSelect: "none" }}>04</span>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 2rem", maxWidth: "760px", width: "100%", margin: "0 auto" }}>
        <style>{`
          @keyframes dot-travel { 0% { left: -12px; } 100% { left: calc(100% + 12px); } }
          @keyframes marker-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes liner-fade { from { opacity: 0; } to { opacity: 1; } }
          .dot-top { animation: dot-travel 9s linear infinite; }
          .dot-bottom { animation: dot-travel 9s linear infinite; animation-delay: -0.5s; }
          .marker-in { animation: marker-in 0.5s ease forwards; }
        `}</style>

        {/* Section label */}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#52050A", opacity: 0.3, marginBottom: "3rem" }}>
          Tracing the divergence
        </p>

        {/* Top timeline */}
        <div style={{ marginBottom: "4.5rem" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#52050A", opacity: 0.3, marginBottom: "0.75rem" }}>This life</div>
          <div style={{ position: "relative", height: "28px" }}>
            <div style={{ position: "absolute", top: "13px", left: 0, right: 0, height: "1px", backgroundColor: "#52050A", opacity: 0.2 }} />
            <div className="dot-top" style={{ position: "absolute", top: "7px", width: "13px", height: "13px", borderRadius: "50%", backgroundColor: "#52050A", opacity: 0.6 }} />
            {topMarkers.map((m, i) => visibleTop.includes(i) ? (
              <div key={i} className="marker-in" style={{ position: "absolute", left: `${m.pct}%`, top: "-28px", transform: "translateX(-50%)", textAlign: "center", opacity: 0 }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.5625rem", color: "#52050A", opacity: 0.5, whiteSpace: "nowrap" }}>{m.year} — {m.label}</div>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#52050A", opacity: 0.3, margin: "3px auto 0" }} />
              </div>
            ) : null)}
          </div>
        </div>

        {/* Bottom timeline */}
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#832161", opacity: 0.5, marginBottom: "0.75rem" }}>The other one</div>
          <div style={{ position: "relative", height: "28px" }}>
            <div style={{ position: "absolute", top: "13px", left: 0, right: 0, height: "1px", backgroundImage: "repeating-linear-gradient(90deg, #832161 0px, #832161 8px, transparent 8px, transparent 16px)", opacity: 0.35 }} />
            <div className="dot-bottom" style={{ position: "absolute", top: "7px", width: "13px", height: "13px", borderRadius: "50%", backgroundColor: "#832161", opacity: 0.55 }} />
            {bottomMarkers.map((m, i) => visibleBottom.includes(i) ? (
              <div key={i} className="marker-in" style={{ position: "absolute", left: `${m.pct}%`, bottom: "-28px", transform: "translateX(-50%)", textAlign: "center", opacity: 0 }}>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#832161", opacity: 0.4, margin: "0 auto 3px" }} />
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.5625rem", color: "#832161", opacity: 0.6, whiteSpace: "nowrap" }}>{m.year} — {m.label}</div>
              </div>
            ) : null)}
          </div>
        </div>

        {/* One-liner */}
        <div style={{ borderTop: "1px solid rgba(82,5,10,0.08)", paddingTop: "2rem" }}>
          <p style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(0.9375rem, 2.5vw, 1.125rem)",
            color: "#52050A",
            opacity: oneLinerVisible ? 0.5 : 0,
            transition: "opacity 0.4s ease",
            letterSpacing: "0.005em",
            lineHeight: 1.5,
          }}>
            {currentLiner}
          </p>
        </div>
      </div>
    </main>
  );
}
