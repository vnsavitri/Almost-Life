import { useEffect } from "react";
import { useLocation } from "wouter";
import { clearSession } from "@/lib/session";

type TemplateKey = "linkedin_ghost" | "wiki_stub" | "museum_plaque" | "tarot_card";

const TEMPLATES: {
  key: TemplateKey;
  label: string;
  sub: string;
  preview: React.ReactNode;
}[] = [
  {
    key: "linkedin_ghost",
    label: "LinkedIn Ghost",
    sub: "Other You, hireable",
    preview: (
      <div style={{ backgroundColor: "#fff", height: "100%", fontFamily: "sans-serif", overflow: "hidden" }}>
        <div style={{ backgroundColor: "#0A66C2", height: "36px" }} />
        <div style={{ padding: "0 12px 10px", marginTop: "-16px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#E07856", border: "2px solid #fff", marginBottom: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>Z</div>
          <div style={{ fontSize: "8px", fontWeight: 700, color: "#1A1A1A", marginBottom: "2px" }}>Zelda Hyrule</div>
          <div style={{ fontSize: "6px", color: "#555", marginBottom: "4px", lineHeight: 1.3 }}>Independent Consultant · Open to Work</div>
          <div style={{ display: "inline-block", fontSize: "5px", border: "1px solid #0A66C2", color: "#0A66C2", borderRadius: "10px", padding: "1px 5px", marginBottom: "8px" }}>Open to Work</div>
          <div style={{ fontSize: "5.5px", color: "#333", lineHeight: 1.5 }}>
            <div style={{ height: "4px", backgroundColor: "#eee", borderRadius: "2px", marginBottom: "3px", width: "90%" }} />
            <div style={{ height: "4px", backgroundColor: "#eee", borderRadius: "2px", marginBottom: "3px", width: "75%" }} />
            <div style={{ height: "4px", backgroundColor: "#eee", borderRadius: "2px", width: "82%" }} />
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "wiki_stub",
    label: "The Wiki Stub",
    sub: "Notable. Probably.",
    preview: (
      <div style={{ backgroundColor: "#fff", height: "100%", fontFamily: "serif", overflow: "hidden", padding: "8px" }}>
        <div style={{ borderBottom: "1px solid #a2a9b1", paddingBottom: "4px", marginBottom: "6px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#1A1A1A" }}>Zelda Hyrule</div>
          <div style={{ fontSize: "5.5px", color: "#555", fontStyle: "italic" }}>From Wikipedia, the free encyclopedia</div>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "5px", lineHeight: 1.6, color: "#333" }}>
              <div style={{ height: "3.5px", backgroundColor: "#eee", borderRadius: "1px", marginBottom: "2px" }} />
              <div style={{ height: "3.5px", backgroundColor: "#eee", borderRadius: "1px", marginBottom: "2px", width: "88%" }} />
              <div style={{ height: "3.5px", backgroundColor: "#eee", borderRadius: "1px", marginBottom: "5px", width: "75%" }} />
              <div style={{ fontSize: "6px", fontWeight: 700, borderBottom: "1px solid #a2a9b1", marginBottom: "3px", color: "#1A1A1A" }}>Early life</div>
              <div style={{ height: "3.5px", backgroundColor: "#eee", borderRadius: "1px", marginBottom: "2px" }} />
              <div style={{ height: "3.5px", backgroundColor: "#eee", borderRadius: "1px", width: "80%" }} />
            </div>
          </div>
          <div style={{ width: "52px", border: "1px solid #a2a9b1", padding: "3px", fontSize: "4.5px", color: "#333", flexShrink: 0 }}>
            <div style={{ backgroundColor: "#a2a9b1", height: "28px", marginBottom: "3px" }} />
            <div style={{ borderBottom: "1px solid #a2a9b1", marginBottom: "2px", paddingBottom: "2px", fontSize: "5px", fontWeight: 700 }}>Zelda Hyrule</div>
            <div style={{ color: "#555" }}><b>Born</b> Hyrule Castle</div>
            <div style={{ color: "#555" }}><b>Known for</b> Ancient tech</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "museum_plaque",
    label: "Museum Plaque",
    sub: "80 words. All restraint.",
    preview: (
      <div style={{ backgroundColor: "#F5EFE6", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ width: "30px", height: "1px", backgroundColor: "#1A1A1A", opacity: 0.2, marginBottom: "8px" }} />
        <div style={{ fontFamily: "'Georgia', serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A1A1A", marginBottom: "4px" }}>Parallel Life No. 3</div>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: "5.5px", fontStyle: "italic", color: "#555", marginBottom: "8px" }}>oil on regret, 2014–present</div>
        <div style={{ height: "3px", backgroundColor: "#eee", borderRadius: "1px", marginBottom: "2px", width: "85%" }} />
        <div style={{ height: "3px", backgroundColor: "#eee", borderRadius: "1px", marginBottom: "2px", width: "92%" }} />
        <div style={{ height: "3px", backgroundColor: "#eee", borderRadius: "1px", marginBottom: "2px", width: "78%" }} />
        <div style={{ height: "3px", backgroundColor: "#eee", borderRadius: "1px", width: "88%" }} />
        <div style={{ width: "30px", height: "1px", backgroundColor: "#1A1A1A", opacity: 0.2, marginTop: "8px" }} />
      </div>
    ),
  },
  {
    key: "tarot_card",
    label: "The Tarot Card",
    sub: "Cards don't lie.",
    preview: (
      <div style={{ backgroundColor: "#1B2541", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: "6px", border: "1px solid rgba(212,175,55,0.4)", pointerEvents: "none" }} />
        <div style={{ fontFamily: "'Georgia', serif", fontSize: "5px", color: "rgba(212,175,55,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>The Almost · IV</div>
        <div style={{ fontSize: "22px", marginBottom: "6px" }}>✦</div>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: "7px", fontWeight: 700, color: "rgba(212,175,55,0.9)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px" }}>The Berliner</div>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: "5px", fontStyle: "italic", color: "rgba(255,255,255,0.5)", textAlign: "center", lineHeight: 1.5, maxWidth: "80px" }}>Suit of Distance</div>
        <div style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "1px", marginTop: "6px", width: "70%" }} />
        <div style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "1px", marginTop: "2px", width: "60%" }} />
      </div>
    ),
  },
];

export default function TemplatePicker() {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!sessionStorage.getItem("almost_branch")) navigate("/branches");
  }, [navigate]);

  function pick(key: TemplateKey) {
    sessionStorage.setItem("almost_template_type", key);
    navigate("/loading");
  }

  function handleLogoClick() {
    clearSession();
    navigate("/");
  }

  return (
    <main style={{ backgroundColor: "#F5EFE6", color: "#1A1A1A", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>

      {/* Top nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", backgroundColor: "#F5EFE6", borderBottom: "1px solid rgba(26,26,26,0.08)", zIndex: 10 }}>
        <button
          onClick={() => navigate("/branches")}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#1A1A1A", opacity: 0.4, letterSpacing: "0.04em", cursor: "pointer", background: "none", border: "none" }}
        >
          ← Back
        </button>
        <button
          onClick={handleLogoClick}
          style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.9375rem", color: "#1A1A1A", opacity: 0.45, background: "none", border: "none", cursor: "pointer" }}
        >
          Almost
        </button>
        <button
          onClick={handleLogoClick}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#1A1A1A", opacity: 0.25, letterSpacing: "0.04em", cursor: "pointer", background: "none", border: "none" }}
        >
          Start over
        </button>
      </div>

      <div style={{ marginTop: "4rem", width: "100%", maxWidth: "600px" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.35, marginBottom: "1rem", textAlign: "center" }}>
          choose your format
        </p>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 300, marginBottom: "0.5rem", textAlign: "center" }}>
          How should Other You be remembered?
        </h1>
        <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.9375rem", opacity: 0.45, marginBottom: "3rem", textAlign: "center" }}>
          Pick one. We'll write it properly.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {TEMPLATES.map((t) => (
            <button
              key={t.key}
              onClick={() => pick(t.key)}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
            >
              <div
                style={{ border: "1px solid rgba(26,26,26,0.12)", borderRadius: "3px", overflow: "hidden", transition: "border-color 0.15s, transform 0.15s", backgroundColor: "#fff" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1A1A1A"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(26,26,26,0.12)"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
              >
                <div style={{ height: "140px", overflow: "hidden" }}>
                  {t.preview}
                </div>
                <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid rgba(26,26,26,0.08)", backgroundColor: "#F5EFE6" }}>
                  <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "0.9375rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "2px" }}>{t.label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#1A1A1A", opacity: 0.4, letterSpacing: "0.02em" }}>{t.sub}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
