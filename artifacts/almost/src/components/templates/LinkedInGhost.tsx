import type { LifeData } from "@/lib/types";

function Initials({ name, size = 56, bg = "#0A66C2" }: { name: string; size?: number; bg?: string }) {
  const parts = name.trim().split(" ");
  const init = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: size * 0.35, flexShrink: 0 }}>
      {init.toUpperCase()}
    </div>
  );
}

export default function LinkedInGhost({ data }: { data: LifeData }) {
  const lg = data.linkedin_ghost;
  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", backgroundColor: "#f3f2ef", minHeight: "100%", padding: "1.5rem 1rem" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>

        {/* Profile card */}
        <div style={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: "0.75rem" }}>
          {/* Banner */}
          <div style={{ height: "96px", backgroundColor: "#0A66C2", opacity: 0.15 }} />

          <div style={{ padding: "0 1.5rem 1.5rem" }}>
            {/* Avatar */}
            <div style={{ marginTop: "-40px", marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ border: "3px solid #fff", borderRadius: "50%" }}>
                <Initials name={data.name} size={80} />
              </div>
              {/* Open to work badge */}
              <div style={{ backgroundColor: "#057642", color: "#fff", fontSize: "0.625rem", fontWeight: 600, padding: "4px 10px", borderRadius: "20px", letterSpacing: "0.03em" }}>
                OPEN TO WORK
              </div>
            </div>

            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#000", marginBottom: "2px" }}>{data.name}</h2>
            <p style={{ fontSize: "0.9375rem", color: "#000", marginBottom: "4px" }}>{lg.headline}</p>
            <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "4px" }}>{data.alt_location}</p>
            <p style={{ fontSize: "0.8125rem", color: "#0A66C2", marginBottom: "0.75rem" }}>{lg.connection_count} connections</p>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button style={{ backgroundColor: "#0A66C2", color: "#fff", border: "none", borderRadius: "20px", padding: "6px 16px", fontSize: "0.875rem", fontWeight: 600, cursor: "default" }}>Connect</button>
              <button style={{ backgroundColor: "#fff", color: "#0A66C2", border: "1.5px solid #0A66C2", borderRadius: "20px", padding: "6px 16px", fontSize: "0.875rem", fontWeight: 600, cursor: "default" }}>Message</button>
            </div>
          </div>
        </div>

        {/* About */}
        <div style={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.08)", padding: "1.25rem 1.5rem", marginBottom: "0.75rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#000", marginBottom: "0.75rem" }}>About</h3>
          <p style={{ fontSize: "0.9375rem", color: "#000", lineHeight: 1.6, whiteSpace: "pre-line" }}>{lg.about_section}</p>
        </div>

        {/* Experience */}
        <div style={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.08)", padding: "1.25rem 1.5rem", marginBottom: "0.75rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#000", marginBottom: "1rem" }}>Experience</h3>
          {lg.experience.map((exp, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", marginBottom: i < lg.experience.length - 1 ? "1.25rem" : 0 }}>
              <Initials name={exp.company} size={48} bg={["#0A66C2","#E07856","#2d6a4f"][i % 3]} />
              <div>
                <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#000", marginBottom: "1px" }}>{exp.title}</p>
                <p style={{ fontSize: "0.875rem", color: "#000", marginBottom: "1px" }}>{exp.company}</p>
                <p style={{ fontSize: "0.8125rem", color: "#666", marginBottom: "4px" }}>{exp.duration}</p>
                <p style={{ fontSize: "0.875rem", color: "#000" }}>{exp.blurb}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div style={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.08)", padding: "1.25rem 1.5rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#000", marginBottom: "0.25rem" }}>Activity</h3>
          <p style={{ fontSize: "0.8125rem", color: "#666", marginBottom: "1rem" }}>{lg.connection_count} followers</p>
          <div style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: "4px", padding: "1rem" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <Initials name={data.name} size={40} />
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#000" }}>{data.name}</p>
                <p style={{ fontSize: "0.75rem", color: "#666" }}>{data.alt_role}</p>
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#000", lineHeight: 1.6, whiteSpace: "pre-line" }}>{lg.linkedin_post}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
