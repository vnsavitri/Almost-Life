import type { LifeData } from "@/lib/types";

const SUIT_SYMBOLS: Record<string, string> = {
  Ambition: "◈",
  Distance: "◎",
  Almost: "◑",
  Devotion: "✦",
};

export default function TarotCard({ data }: { data: LifeData }) {
  const tc = data.tarot_card;
  const symbol = SUIT_SYMBOLS[tc.suit] ?? "◈";

  return (
    <div style={{ backgroundColor: "#1a1a2e", minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 2rem" }}>

      {/* The card */}
      <div
        style={{
          width: "300px",
          height: "500px",
          backgroundColor: "#12122a",
          border: "2px solid #c9a84c",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem 1.25rem",
          position: "relative",
          boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.15), 0 20px 60px rgba(0,0,0,0.5)",
          marginBottom: "2.5rem",
        }}
      >
        {/* Corner ornaments */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
          <div
            key={pos}
            style={{
              position: "absolute",
              top: pos.includes("top") ? "10px" : undefined,
              bottom: pos.includes("bottom") ? "10px" : undefined,
              left: pos.includes("left") ? "10px" : undefined,
              right: pos.includes("right") ? "10px" : undefined,
              color: "#c9a84c",
              fontSize: "0.7rem",
              opacity: 0.5,
            }}
          >
            ✦
          </div>
        ))}

        {/* Card name */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "0.75rem", color: "#c9a84c", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.8 }}>
            {tc.suit}
          </p>
          <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.0625rem", color: "#c9a84c", fontWeight: 400, lineHeight: 1.2, marginTop: "0.25rem" }}>
            {tc.card_name}
          </h3>
        </div>

        {/* Symbol */}
        <div style={{ fontSize: "5rem", color: "#c9a84c", opacity: 0.7, lineHeight: 1, userSelect: "none" }}>
          {symbol}
        </div>

        {/* Roman numeral / suit bottom */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "1px", backgroundColor: "#c9a84c", opacity: 0.3, margin: "0 auto 0.5rem" }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", color: "#c9a84c", letterSpacing: "0.2em", opacity: 0.6, textTransform: "uppercase" }}>
            {data.year_of_fork}
          </p>
        </div>
      </div>

      {/* Meanings */}
      <div style={{ width: "100%", maxWidth: "340px", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#c9a84c", opacity: 0.5, marginBottom: "0.4rem" }}>
              Upright
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#e8e0d0", lineHeight: 1.6, opacity: 0.8 }}>
              {tc.upright_meaning}
            </p>
          </div>
          <div style={{ width: "1px", backgroundColor: "#c9a84c", opacity: 0.15 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#c9a84c", opacity: 0.5, marginBottom: "0.4rem" }}>
              Reversed
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#e8e0d0", lineHeight: 1.6, opacity: 0.8 }}>
              {tc.reversed_meaning}
            </p>
          </div>
        </div>
      </div>

      {/* Prophecy */}
      <div style={{ width: "100%", maxWidth: "340px", borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: "1.5rem" }}>
        <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.9375rem", color: "#e8e0d0", lineHeight: 1.75, opacity: 0.85, textAlign: "center" }}>
          {tc.prophecy}
        </p>
      </div>

    </div>
  );
}
