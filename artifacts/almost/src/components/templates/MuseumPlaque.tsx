import type { LifeData } from "@/lib/types";

export default function MuseumPlaque({ data }: { data: LifeData }) {
  const mp = data.museum_plaque;
  return (
    <div style={{
      backgroundColor: "#111010",
      minHeight: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 2rem",
    }}>
      {/* The plaque */}
      <div style={{
        width: "100%",
        maxWidth: "480px",
        backgroundColor: "#C8A96E",
        backgroundImage: "radial-gradient(ellipse at 30% 20%, rgba(255,235,180,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(90,50,10,0.2) 0%, transparent 60%)",
        padding: "3rem 3.5rem",
        position: "relative",
        boxShadow: "0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,220,120,0.4), inset 0 -1px 0 rgba(80,40,0,0.3)",
      }}>
        {/* Outer border inset */}
        <div style={{
          position: "absolute",
          inset: "10px",
          border: "1px solid rgba(80,40,0,0.25)",
          pointerEvents: "none",
        }} />
        {/* Inner border inset */}
        <div style={{
          position: "absolute",
          inset: "14px",
          border: "1px solid rgba(255,220,120,0.2)",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{ position: "relative", textAlign: "center" }}>

          {/* Top ornament */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center", marginBottom: "1.75rem" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(80,40,0,0.3)" }} />
            <span style={{ fontSize: "0.75rem", color: "rgba(80,40,0,0.5)" }}>✦</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(80,40,0,0.3)" }} />
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "#2A1800",
            lineHeight: 1.2,
            marginBottom: "0.5rem",
            letterSpacing: "0.01em",
          }}>
            {mp.title}
          </h2>

          {/* Medium */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            color: "rgba(42,24,0,0.6)",
            fontStyle: "italic",
            marginBottom: "1.75rem",
            letterSpacing: "0.02em",
          }}>
            {mp.medium}
          </p>

          {/* Mid divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center", marginBottom: "1.75rem" }}>
            <div style={{ width: "2rem", height: "1px", backgroundColor: "rgba(80,40,0,0.25)" }} />
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "0.9375rem",
            lineHeight: 1.75,
            color: "#2A1800",
            fontStyle: "italic",
            marginBottom: "2rem",
            opacity: 0.85,
          }}>
            {mp.description}
          </p>

          {/* Provenance block */}
          <div style={{ borderTop: "1px solid rgba(80,40,0,0.2)", paddingTop: "1.25rem", marginBottom: "1rem", textAlign: "left" }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.5625rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(42,24,0,0.45)",
              marginBottom: "0.35rem",
            }}>
              Provenance
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              color: "rgba(42,24,0,0.65)",
              lineHeight: 1.6,
            }}>
              {mp.provenance}
            </p>
          </div>

          {/* Loan credit */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.625rem",
            color: "rgba(42,24,0,0.4)",
            letterSpacing: "0.03em",
            textAlign: "left",
          }}>
            {mp.loan_credit}
          </p>

          {/* Bottom ornament */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center", marginTop: "1.75rem" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(80,40,0,0.3)" }} />
            <span style={{ fontSize: "0.75rem", color: "rgba(80,40,0,0.5)" }}>✦</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(80,40,0,0.3)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
