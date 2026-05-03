import type { LifeData } from "@/lib/types";

function renderCitations(text: string) {
  const parts = text.split(/(\[citation needed\]|\[\d+\])/gi);
  return parts.map((part, i) => {
    if (/\[citation needed\]/i.test(part)) {
      return <sup key={i} style={{ color: "#0645AD", fontSize: "0.7em", cursor: "default" }}>[citation needed]</sup>;
    }
    if (/\[\d+\]/.test(part)) {
      return <sup key={i} style={{ color: "#0645AD", fontSize: "0.7em" }}>{part}</sup>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function WikiStub({ data }: { data: LifeData }) {
  const ws = data.wiki_stub;
  return (
    <div style={{ fontFamily: "Georgia, 'Linux Libertine', serif", backgroundColor: "#fff", color: "#202122", padding: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 400, borderBottom: "1px solid #a2a9b1", paddingBottom: "0.25rem", marginBottom: "1rem" }}>
        {data.name}
      </h1>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
        {/* Main content */}
        <div style={{ flex: 1 }}>
          {/* Lead */}
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1rem" }}>
            {renderCitations(ws.lead_paragraph)}
          </p>

          {/* TOC stub */}
          <div style={{ border: "1px solid #a2a9b1", backgroundColor: "#f8f9fa", display: "inline-block", padding: "0.75rem 1.25rem", marginBottom: "1.25rem", fontSize: "0.875rem" }}>
            <p style={{ fontWeight: 700, marginBottom: "0.4rem" }}>Contents</p>
            {["1 Early life", "2 Career", "3 Controversies", "4 Personal life", "5 References"].map((s, i) => (
              <div key={i} style={{ color: "#0645AD", marginBottom: "2px" }}>{s}</div>
            ))}
          </div>

          {/* Sections */}
          {[
            { title: "Early life", text: ws.early_life },
            { title: "Career", text: ws.career },
            { title: "Controversies", text: ws.controversies },
            { title: "Personal life", text: ws.personal_life },
          ].map((sec) => (
            <div key={sec.title} style={{ marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 400, borderBottom: "1px solid #a2a9b1", paddingBottom: "0.2rem", marginBottom: "0.6rem" }}>
                {sec.title}
              </h2>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>{renderCitations(sec.text)}</p>
            </div>
          ))}

          {/* References */}
          <div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 400, borderBottom: "1px solid #a2a9b1", paddingBottom: "0.2rem", marginBottom: "0.6rem" }}>
              References
            </h2>
            <ol style={{ fontSize: "0.8125rem", color: "#555", lineHeight: 1.6, paddingLeft: "1.5rem" }}>
              <li>"{data.name}". {ws.infobox_occupation} Records. Retrieved {new Date().getFullYear()}.</li>
              <li>Staff writer (2021). "The {ws.infobox_known_for} scene, explained". <em>The Observer</em>.</li>
              <li>"{data.name} speaks". <em>Industry Weekly</em>. {data.year_of_fork}.</li>
            </ol>
          </div>
        </div>

        {/* Infobox */}
        <div style={{ width: "220px", flexShrink: 0, border: "1px solid #a2a9b1", backgroundColor: "#f8f9fa", fontSize: "0.8125rem", lineHeight: 1.5 }}>
          <div style={{ backgroundColor: "#cee0f2", padding: "0.5rem 0.75rem", fontWeight: 700, textAlign: "center", borderBottom: "1px solid #a2a9b1", fontSize: "0.875rem" }}>
            {data.name}
          </div>
          {/* placeholder portrait */}
          <div style={{ backgroundColor: "#e0e0e0", height: "140px", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontSize: "0.75rem", borderBottom: "1px solid #a2a9b1" }}>
            no image available
          </div>
          {[
            ["Born", ws.infobox_birthplace],
            ["Occupation", ws.infobox_occupation],
            ["Known for", ws.infobox_known_for],
            ["Spouse", ws.infobox_spouse !== "unknown" ? ws.infobox_spouse : "—"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", borderBottom: "1px solid #a2a9b1" }}>
              <div style={{ padding: "4px 8px", fontWeight: 700, minWidth: "80px", backgroundColor: "#eaecf0" }}>{k}</div>
              <div style={{ padding: "4px 8px" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
