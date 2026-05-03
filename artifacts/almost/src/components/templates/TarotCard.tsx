import type { LifeData } from "@/lib/types";

const SUIT_SYMBOLS: Record<string, string> = {
  Ambition: "◈",
  Distance: "◎",
  Almost: "◑",
  Devotion: "✦",
};

const SUIT_COLORS: Record<string, string> = {
  Ambition: "#9B7EDE",
  Distance: "#76E7CD",
  Almost: "#832161",
  Devotion: "#C9A84C",
};

export default function TarotCard({ data }: { data: LifeData }) {
  const tc = data.tarot_card;
  const symbol = SUIT_SYMBOLS[tc.suit] ?? "◈";
  const accentColor = SUIT_COLORS[tc.suit] ?? "#C9A84C";

  return (
    <div style={{
      backgroundColor: "#0D0A14",
      backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(131,33,97,0.18) 0%, transparent 60%)",
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 2rem",
    }}>
      {/* The card */}
      <div style={{
        width: "280px",
        backgroundColor: "#1A0E1F",
        backgroundImage: `radial-gradient(ellipse at 50% 15%, rgba(131,33,97,0.3) 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(13,10,20,0.8) 0%, transparent 50%)`,
        border: `1.5px solid ${accentColor}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.75rem 1.5rem 1.5rem",
        position: "relative",
        boxShadow: `0 0 0 1px rgba(13,10,20,1), 0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(131,33,97,0.12) inset`,
        marginBottom: "2.5rem",
      }}>
        {/* Star pattern background */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.15 }}>
          {[
            [15,12],[45,8],[72,18],[88,7],[25,35],[60,28],[80,40],[10,55],[35,50],[55,65],[78,58],[20,75],[48,80],[70,72],[90,85],[5,90],
          ].map(([x, y], i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${x}%`, top: `${y}%`,
              width: i % 3 === 0 ? "2px" : "1px",
              height: i % 3 === 0 ? "2px" : "1px",
              borderRadius: "50%",
              backgroundColor: accentColor,
            }} />
          ))}
        </div>

        {/* Decorative corners */}
        {(["tl","tr","bl","br"] as const).map(pos => (
          <div key={pos} style={{
            position: "absolute",
            top: pos.startsWith("t") ? "12px" : undefined,
            bottom: pos.startsWith("b") ? "12px" : undefined,
            left: pos.endsWith("l") ? "12px" : undefined,
            right: pos.endsWith("r") ? "12px" : undefined,
            width: "12px", height: "12px",
            borderTop: pos.startsWith("t") ? `1px solid ${accentColor}` : "none",
            borderBottom: pos.startsWith("b") ? `1px solid ${accentColor}` : "none",
            borderLeft: pos.endsWith("l") ? `1px solid ${accentColor}` : "none",
            borderRight: pos.endsWith("r") ? `1px solid ${accentColor}` : "none",
            opacity: 0.6,
          }} />
        ))}

        {/* Suit + card name top */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.5rem",
            color: accentColor,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: 0.7,
            marginBottom: "0.4rem",
          }}>
            Suit of {tc.suit}
          </p>
          <h3 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "1.125rem",
            color: "#F0E8F4",
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: "0.02em",
          }}>
            {tc.card_name}
          </h3>
        </div>

        {/* Ornamental divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%", marginBottom: "1.5rem", position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: accentColor, opacity: 0.3 }} />
          <span style={{ fontSize: "0.5rem", color: accentColor, opacity: 0.6 }}>◆</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: accentColor, opacity: 0.3 }} />
        </div>

        {/* Central symbol */}
        <div style={{
          fontSize: "5.5rem",
          color: accentColor,
          lineHeight: 1,
          userSelect: "none",
          marginBottom: "1.5rem",
          filter: `drop-shadow(0 0 16px ${accentColor}55)`,
          position: "relative",
          zIndex: 1,
        }}>
          {symbol}
        </div>

        {/* Ornamental divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%", marginBottom: "1.5rem", position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: accentColor, opacity: 0.3 }} />
          <span style={{ fontSize: "0.5rem", color: accentColor, opacity: 0.6 }}>◆</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: accentColor, opacity: 0.3 }} />
        </div>

        {/* Year / numeral bottom */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.5rem",
            color: accentColor,
            letterSpacing: "0.22em",
            opacity: 0.55,
            textTransform: "uppercase",
          }}>
            {data.year_of_fork}
          </p>
        </div>
      </div>

      {/* Meanings */}
      <div style={{ width: "100%", maxWidth: "340px", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.5625rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: accentColor,
              opacity: 0.6,
              marginBottom: "0.5rem",
            }}>
              Upright
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#D8CFE8", lineHeight: 1.65, opacity: 0.85 }}>
              {tc.upright_meaning}
            </p>
          </div>
          <div style={{ width: "1px", backgroundColor: accentColor, opacity: 0.15 }} />
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.5625rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: accentColor,
              opacity: 0.6,
              marginBottom: "0.5rem",
            }}>
              Reversed
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#D8CFE8", lineHeight: 1.65, opacity: 0.85 }}>
              {tc.reversed_meaning}
            </p>
          </div>
        </div>
      </div>

      {/* Prophecy */}
      <div style={{ width: "100%", maxWidth: "340px", borderTop: `1px solid ${accentColor}30`, paddingTop: "1.5rem" }}>
        <p style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: "italic",
          fontSize: "0.9375rem",
          color: "#D8CFE8",
          lineHeight: 1.8,
          opacity: 0.8,
          textAlign: "center",
        }}>
          {tc.prophecy}
        </p>
      </div>
    </div>
  );
}
