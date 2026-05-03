import type { LifeData } from "@/lib/types";

export type TemplateKey = "linkedin_ghost" | "wiki_stub" | "museum_plaque" | "tarot_card";

export interface SharePayload {
  n: string;   // name
  y: string;   // year_of_fork
  fs: string;  // fork_summary
  ar: string;  // alt_role
  al: string;  // alt_location
  t: TemplateKey;
  q: string;   // best quote from the template
}

export const TEMPLATE_LABELS: Record<TemplateKey, string> = {
  linkedin_ghost: "LinkedIn Ghost",
  wiki_stub: "The Wiki Stub",
  museum_plaque: "Museum Plaque",
  tarot_card: "The Tarot Card",
};

export function extractQuote(data: LifeData, template: TemplateKey): string {
  switch (template) {
    case "linkedin_ghost":
      return data.linkedin_ghost?.headline ?? "";
    case "wiki_stub": {
      const lead = data.wiki_stub?.lead_paragraph ?? "";
      return lead.length > 120 ? lead.slice(0, 117) + "..." : lead;
    }
    case "museum_plaque":
      return data.museum_plaque?.title ?? "";
    case "tarot_card":
      return `${data.tarot_card?.card_name ?? ""} · ${data.tarot_card?.suit ?? ""}`;
  }
}

export function buildSharePayload(data: LifeData, template: TemplateKey): SharePayload {
  return {
    n: data.name,
    y: data.year_of_fork,
    fs: data.fork_summary,
    ar: data.alt_role,
    al: data.alt_location,
    t: template,
    q: extractQuote(data, template),
  };
}

export function encodePayload(payload: SharePayload): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

export function decodePayload(encoded: string): SharePayload | null {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch {
    return null;
  }
}

export function buildShareUrl(payload: SharePayload): string {
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  return `${window.location.origin}${base}/share?d=${encodePayload(payload)}`;
}

export function xShareUrl(payload: SharePayload, shareUrl: string): string {
  const text = `I just discovered the life I almost lived.\n\n"${payload.fs}"\n\nOther me: ${payload.ar} in ${payload.al}\n\nFind yours at Almost-life →`;
  return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent("https://almost--vnsavitri.replit.app/")}`;
}

export function linkedInShareUrl(payload: SharePayload, shareUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
}

export function discordText(payload: SharePayload, shareUrl: string): string {
  return `I found the life I almost lived ✦\n\n**${payload.y}:** "${payload.fs}"\nOther me: **${payload.ar}** in **${payload.al}**\n\n→ ${shareUrl}`;
}
