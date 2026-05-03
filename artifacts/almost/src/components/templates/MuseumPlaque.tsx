import type { LifeData } from "@/lib/types";

export default function MuseumPlaque({ data }: { data: LifeData }) {
  const mp = data.museum_plaque;
  return (
    <div style={{ backgroundColor: "#BCD2EE", minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 2rem" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>

        {/* Title */}
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.625rem", fontWeight: 400, color: "#52050A", lineHeight: 1.2, marginBottom: "0.4rem" }}>
          {mp.title}
        </h2>

        {/* Medium */}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#52050A", opacity: 0.55, fontStyle: "italic", marginBottom: "2rem", letterSpacing: "0.01em" }}>
          {mp.medium}
        </p>

        {/* Divider */}
        <div style={{ width: "2rem", height: "1px", backgroundColor: "#52050A", opacity: 0.2, marginBottom: "2rem" }} />

        {/* Description */}
        <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1rem", lineHeight: 1.75, color: "#52050A", fontStyle: "italic", marginBottom: "2.5rem" }}>
          {mp.description}
        </p>

        {/* Provenance */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#52050A", opacity: 0.4, marginBottom: "0.4rem" }}>
            Provenance
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#52050A", opacity: 0.6, lineHeight: 1.6 }}>
            {mp.provenance}
          </p>
        </div>

        {/* Loan credit */}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#52050A", opacity: 0.35, letterSpacing: "0.03em" }}>
          {mp.loan_credit}
        </p>

      </div>
    </div>
  );
}
