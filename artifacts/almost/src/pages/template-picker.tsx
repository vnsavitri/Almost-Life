import { useEffect } from "react";
import { useLocation } from "wouter";
import { clearSession } from "@/lib/session";
import StepProgress from "@/components/StepProgress";

type TemplateKey = "linkedin_ghost" | "wiki_stub" | "museum_plaque" | "tarot_card";

const TEMPLATES: { key: TemplateKey; num: string; label: string; sub: string; preview: React.ReactNode }[] = [
  {
    key: "linkedin_ghost",
    num: "I",
    label: "LinkedIn Ghost",
    sub: "Other You, still hireable",
    preview: (
      <div style={{ backgroundColor: "#fff", height: "100%", fontFamily: "sans-serif", overflow: "hidden" }}>
        <div style={{ backgroundColor: "#0A66C2", height: "40px" }} />
        <div style={{ padding: "0 14px 12px", marginTop: "-18px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#832161", border: "2.5px solid #fff", marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#fff", fontWeight: 700 }}>Z</div>
          <div style={{ fontSize: "9px", fontWeight: 700, color: "#52050A", marginBottom: "2px" }}>Zelda Hyrule</div>
          <div style={{ fontSize: "6.5px", color: "#555", marginBottom: "6px", lineHeight: 1.4 }}>Independent Consultant · Open to Work</div>
          <div style={{ display: "inline-block", fontSize: "5.5px", border: "1px solid #0A66C2", color: "#0A66C2", borderRadius: "10px", padding: "2px 6px", marginBottom: "10px" }}>Open to Work</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {[90, 75, 83, 68].map((w, i) => <div key={i} style={{ height: "4px", backgroundColor: "#eee", borderRadius: "1px", width: `${w}%` }} />)}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "wiki_stub",
    num: "II",
    label: "The Wiki Stub",
    sub: "Notable. Probably.",
    preview: (
      <div style={{ backgroundColor: "#fff", height: "100%", fontFamily: "serif", overflow: "hidden", padding: "10px" }}>
        <div style={{ borderBottom: "1px solid #a2a9b1", paddingBottom: "5px", marginBottom: "8px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#52050A" }}>Zelda Hyrule</div>
          <div style={{ fontSize: "6px", color: "#555", fontStyle: "italic" }}>From Wikipedia, the free encyclopedia</div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ flex: 1 }}>
            {[100, 88, 75, 92, 70].map((w, i) => <div key={i} style={{ height: "3.5px", backgroundColor: "#eee", borderRadius: "1px", marginBottom: "2.5px", width: `${w}%` }} />)}
            <div style={{ fontSize: "7px", fontWeight: 700, borderBottom: "1px solid #a2a9b1", margin: "6px 0 4px", color: "#52050A" }}>Early life</div>
            {[100, 82, 90].map((w, i) => <div key={i} style={{ height: "3.5px", backgroundColor: "#eee", borderRadius: "1px", marginBottom: "2.5px", width: `${w}%` }} />)}
          </div>
          <div style={{ width: "58px", border: "1px solid #a2a9b1", padding: "4px", fontSize: "5px", color: "#333", flexShrink: 0 }}>
            <div style={{ backgroundColor: "#c8ccd1", height: "32px", marginBottom: "4px" }} />
            <div style={{ borderBottom: "1px solid #a2a9b1", marginBottom: "3px", paddingBottom: "2px", fontSize: "6px", fontWeight: 700 }}>Zelda Hyrule</div>
            <div style={{ color: "#555", lineHeight: 1.6 }}><b>Born</b> Hyrule<br /><b>Known for</b> Sheikah tech</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "museum_plaque",
    num: "III",
    label: "Museum Plaque",
    sub: "80 words. All restraint.",
    preview: (
      <div style={{ backgroundColor: "#BCD2EE", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px", textAlign: "center" }}>
        <div style={{ width: "24px", height: "1px", backgroundColor: "#52050A", opacity: 0.2, marginBottom: "10px" }} />
        <div style={{ fontFamily: "'Georgia', serif", fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#52050A", marginBottom: "4px" }}>Parallel Life No. 3</div>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: "6px", fontStyle: "italic", color: "#555", marginBottom: "10px" }}>oil on regret, 2014–present</div>
        {[85, 92, 78, 88, 70].map((w, i) => <div key={i} style={{ height: "3px", backgroundColor: "rgba(82,5,10,0.12)", borderRadius: "1px", marginBottom: "2.5px", width: `${w}%` }} />)}
        <div style={{ width: "24px", height: "1px", backgroundColor: "#52050A", opacity: 0.2, marginTop: "10px" }} />
      </div>
    ),
  },
  {
    key: "tarot_card",
    num: "IV",
    label: "The Tarot Card",
    sub: "Cards don't lie.",
    preview: (
      <div style={{ backgroundColor: "#1B2541", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px", position: "relative" }}>
        <div style={{ position: "absolute", inset: "7px", border: "1px solid rgba(212,175,55,0.35)", pointerEvents: "none" }} />
        <div style={{ fontFamily: "'Georgia', serif", fontSize: "5.5px", color: "rgba(212,175,55,0.55)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "8px" }}>The Almost · IV</div>
        <div style={{ fontSize: "24px", marginBottom: "8px", lineHeight: 1 }}>✦</div>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: "8px", fontWeight: 700, color: "rgba(212,175,55,0.9)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "5px" }}>The Berliner</div>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: "5.5px", fontStyle: "italic", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.6, maxWidth: "80px", marginBottom: "8px" }}>Suit of Distance</div>
        {[70, 60].map((w, i) => <div key={i} style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "1px", marginBottom: "2px", width: `${w}%` }} />)}
      </div>
    ),
  },
];

export default function TemplatePicker() {
  const [, navigate] = useLocation();
  useEffect(() => { if (!sessionStorage.getItem("almost_branch")) navigate("/branches"); }, [navigate]);

  function pick(key: TemplateKey) {
    sessionStorage.setItem("almost_template_type", key);
    navigate("/loading");
  }

  return (
    <main className="grain" style={{ backgroundColor: "#BCD2EE", color: "#52050A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <StepProgress current={3} />

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(82,5,10,0.06)" }}>
        <button onClick={() => navigate("/branches")} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#52050A", opacity: 0.35, background: "none", border: "none", cursor: "pointer" }}>
          ← Back
        </button>
        <button onClick={() => { clearSession(); navigate("/"); }} style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "1rem", color: "#52050A", opacity: 0.35, background: "none", border: "none", cursor: "pointer" }}>
          Almost
        </button>
        <button onClick={() => { clearSession(); navigate("/"); }} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#52050A", opacity: 0.2, background: "none", border: "none", cursor: "pointer" }}>
          Start over
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: "900px", width: "100%", margin: "0 auto", padding: "3rem 2rem 5rem" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", borderBottom: "1px solid rgba(82,5,10,0.1)", paddingBottom: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#832161", opacity: 0.7, marginBottom: "0.5rem" }}>Step three</p>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              How should Other You be remembered?
            </h1>
          </div>
          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "5rem", fontWeight: 200, color: "#52050A", opacity: 0.05, lineHeight: 1, flexShrink: 0, marginLeft: "1rem" }}>03</span>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", backgroundColor: "rgba(82,5,10,0.1)" }}>
          {TEMPLATES.map(t => (
            <button
              key={t.key}
              onClick={() => pick(t.key)}
              style={{ background: "#BCD2EE", border: "none", padding: 0, cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#EDE7DC"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#BCD2EE"; }}
            >
              {/* Preview */}
              <div style={{ height: "160px", overflow: "hidden", width: "100%", position: "relative" }}>
                {t.preview}
                {/* Roman numeral overlay */}
                <span style={{ position: "absolute", top: "8px", right: "10px", fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.75rem", color: "#52050A", opacity: 0.2 }}>{t.num}</span>
              </div>
              {/* Label */}
              <div style={{ padding: "1rem 1.25rem 1.25rem", borderTop: "1px solid rgba(82,5,10,0.08)", flex: 1 }}>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1rem", fontWeight: 400, color: "#52050A", marginBottom: "3px" }}>{t.label}</p>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.8125rem", color: "#52050A", opacity: 0.4 }}>{t.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
