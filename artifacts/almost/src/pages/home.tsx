import { useLocation } from "wouter";
import { clearSession } from "@/lib/session";

const GHOST_YEARS = ["1994", "2001", "2008", "2013", "2019"];

export default function Home() {
  const [, navigate] = useLocation();

  function handleBegin() {
    clearSession();
    navigate("/upload");
  }

  return (
    <main className="grain" style={{ backgroundColor: "#BCD2EE", color: "#52050A", minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>

      {/* Ghost years — background texture */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {GHOST_YEARS.map((yr, i) => (
          <span key={yr} style={{
            position: "absolute",
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 200,
            fontSize: "clamp(5rem, 18vw, 14rem)",
            color: "#52050A",
            opacity: 0.025 + i * 0.008,
            letterSpacing: "-0.03em",
            userSelect: "none",
            top: `${8 + i * 17}%`,
            left: `${-2 + i * 22}%`,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}>{yr}</span>
        ))}
      </div>

      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 2rem", borderBottom: "1px solid rgba(82,5,10,0.06)", position: "relative", zIndex: 1 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#52050A", opacity: 0.3 }}>
          A Thought Experiment
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#832161", opacity: 0.7 }}>
          Vol. I
        </span>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 2rem", position: "relative", zIndex: 1 }}>

        {/* Logotype */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "clamp(5.5rem, 20vw, 14rem)",
            fontWeight: 200,
            fontStyle: "italic",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            color: "#52050A",
            margin: 0,
            marginLeft: "-0.04em",
          }}>
            Almost
          </h1>
          <p style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
            color: "#52050A",
            opacity: 0.45,
            marginTop: "1.25rem",
            paddingLeft: "0.1em",
            letterSpacing: "0.01em",
          }}>
            the life you didn't quite live
          </p>
        </div>

        {/* Ruled divider */}
        <div style={{ width: "3rem", height: "1px", backgroundColor: "#832161", opacity: 0.5, marginBottom: "2.5rem" }} />

        {/* Begin */}
        <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          <button
            onClick={handleBegin}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8125rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#52050A",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
            onMouseEnter={e => { (e.currentTarget.querySelector('.arr') as HTMLElement).style.transform = "translateX(4px)"; }}
            onMouseLeave={e => { (e.currentTarget.querySelector('.arr') as HTMLElement).style.transform = "translateX(0)"; }}
          >
            <span style={{ width: "2rem", height: "1px", backgroundColor: "#52050A", display: "inline-block", flexShrink: 0 }} />
            Begin
            <span className="arr" style={{ display: "inline-block", transition: "transform 0.2s ease" }}>→</span>
          </button>

          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.8125rem", color: "#52050A", opacity: 0.3 }}>
            or{" "}
            <button
              onClick={() => { sessionStorage.setItem("almost_demo", "true"); sessionStorage.removeItem("almost_pdf_b64"); navigate("/branches"); }}
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.8125rem", color: "#52050A", opacity: 1, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textDecorationColor: "rgba(82,5,10,0.3)", textUnderlineOffset: "3px", padding: 0 }}
            >
              what if Zelda hadn't sealed Ganon?
            </button>
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "1.25rem 2rem", borderTop: "1px solid rgba(82,5,10,0.06)", position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", letterSpacing: "0.06em", color: "#52050A", opacity: 0.25, maxWidth: "28ch", lineHeight: 1.6 }}>
          Upload your LinkedIn. Pick a fork in the road. See the other version of you.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <button
            onClick={() => navigate("/about")}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#52050A", opacity: 0.2, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.2")}
          >
            About
          </button>
          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.625rem", color: "#52050A", opacity: 0.2 }}>
            Powered by Claude
          </span>
        </div>
      </div>

    </main>
  );
}
