import { Router } from "express";
import { openrouter } from "@workspace/integrations-openrouter-ai";
import { rateLimitGenerations } from "../middlewares/rate-limit";
import pdfParse from "pdf-parse";

const router = Router();

const ZELDA_PROFILE_TEXT = `
Zelda Hyrule
Princess | Ancient Technology Researcher | Reluctant Chosen One
Hyrule Castle, Central Hyrule · 2,847 connections

ABOUT
Multidisciplinary leader with 10,000+ years of ancestral institutional knowledge
and hands-on experience in crisis containment, divine power management, and
cross-species stakeholder alignment. Former embedded researcher (Sheikah Division).
Fluent in Ancient Hyrulean, Gerudo, and the Silent Realm frequency.
Currently exploring what it means to "move on" after sealing an ancient evil
for the fourth time in a row.

EXPERIENCE

Princess & Chief Sealing Officer
Kingdom of Hyrule · Full-time
Feb 2014 – Present · 12 years
Managed 100-year containment strategy for Calamity Ganon. Coordinated Divine Beast
deployment across four regions. Key stakeholder: Link (contractor, recurring).

Research Fellow — Ancient Technology Division
Sheikah Institute of Science · Full-time
Sep 2010 – Jan 2014 · 3 years 4 months
Kakariko Village, Hyrule
Led excavation and activation of Sheikah Slate technology. Recovered and catalogued
127 Guardian units. Published: "On the Recursive Nature of Prophecy: Why It's Always You."

Student Researcher — Sacred Realm Studies
Royal Academy of Hyrule · Part-time
Sep 2006 – Aug 2010 · 4 years
Focused on divine power inheritance. Minor in Ganon Threat Modelling.
Captain, Equestrian Club (Epona Division).

CAREER GAP
Suspended Animation — Divine Containment Protocol
Self-directed · Feb 2014 – Mar 2020 · 6 years 1 month
Hyrule Castle (Interior)
Strategic pause. Containment of malice-level threat. Not currently open to discussing.

EDUCATION
Royal Academy of Hyrule
BSc Ancient Studies & Applied Prophecy, 2006–2010
`;

const VOICE_RULES = `THE VOICE — read carefully:
- Funny first, melancholy underneath. Think "I'm almost a lawyer, in another life I went to Yale and now I'm probably divorced but my apartment has a doorman."
- Confident, specific, slightly unhinged, secretly tender.
- Dry observational humour. Never twee, never self-pitying.
- Short sentences. Mixed lengths. Active voice.
- Specifics over generics. "She drinks her coffee black now" not "she has changed."
- Allowed to be funny about uncomfortable things (divorce, failure, regret) without being mean.

WORDS YOU MUST NEVER USE:
navigating, tapestry, embark, journey, landscape, ever-evolving, transformative, robust, seamless, leverage, dance of, symphony of, in the realm of, delve, unleash, paradigm.
If you write any of these, start over.`;

const TEMPLATE_SCHEMAS: Record<string, string> = {
  linkedin_ghost: `{
  "name": "their real name from the profile, or 'You' if unclear",
  "alt_location": "where Other You lives now",
  "alt_role": "what Other You does for work",
  "alt_age": "current age estimate",
  "year_of_fork": "the year of the fork",
  "fork_summary": "one sharp sentence: the road not taken",
  "linkedin_ghost": {
    "headline": "Other You's LinkedIn headline — slightly cringe in the way LinkedIn headlines are, 80 chars max",
    "about_section": "120 words, first person, LinkedIn voice — slightly try-hard, occasionally vulnerable. Must include one specific detail.",
    "experience": [
      {"title": "...", "company": "...", "duration": "...", "blurb": "one sentence, LinkedIn-flavoured"}
    ],
    "linkedin_post": "60 words. Should make the reader cringe a little but also feel something. End with a banal hashtag.",
    "connection_count": "a believable number like '2,847'"
  }
}`,
  wiki_stub: `{
  "name": "their real name from the profile, or 'You' if unclear",
  "alt_location": "where Other You lives now",
  "alt_role": "what Other You does for work",
  "alt_age": "current age estimate",
  "year_of_fork": "the year of the fork",
  "fork_summary": "one sharp sentence: the road not taken",
  "wiki_stub": {
    "infobox_birthplace": "...",
    "infobox_known_for": "1-2 phrases",
    "infobox_occupation": "...",
    "infobox_spouse": "made-up name or 'unknown'",
    "lead_paragraph": "80 words, Wikipedia formal tone, include [citation needed] 2-3 times inline",
    "early_life": "60 words, formal Wikipedia voice",
    "career": "100 words, formal Wikipedia voice, include 2 fake citations like [3]",
    "controversies": "60 words, minor funny scandal, at least one [citation needed]",
    "personal_life": "40 words, one delightfully mundane fact"
  }
}`,
  museum_plaque: `{
  "name": "their real name from the profile, or 'You' if unclear",
  "alt_location": "where Other You lives now",
  "alt_role": "what Other You does for work",
  "alt_age": "current age estimate",
  "year_of_fork": "the year of the fork",
  "fork_summary": "one sharp sentence: the road not taken",
  "museum_plaque": {
    "title": "poetic short title like 'Parallel Life No. 3' or 'Study in Berlin Light'",
    "medium": "playful medium line like 'oil on regret, 2014–present'",
    "provenance": "locations and years, max 4 entries, formatted as 'City, Year — City, Year'",
    "description": "EXACTLY 80 words. Restrained, third person, slightly distant — like a museum description. The melancholy lives in what's left out.",
    "loan_credit": "On loan from the year [year]"
  }
}`,
  tarot_card: `{
  "name": "their real name from the profile, or 'You' if unclear",
  "alt_location": "where Other You lives now",
  "alt_role": "what Other You does for work",
  "alt_age": "current age estimate",
  "year_of_fork": "the year of the fork",
  "fork_summary": "one sharp sentence: the road not taken",
  "tarot_card": {
    "card_name": "The [Something] — like 'The Founder Reversed' or 'The Berliner'",
    "suit": "one of: Ambition, Distance, Almost, Devotion",
    "upright_meaning": "30 words — what this card means when drawn upright",
    "reversed_meaning": "30 words — what it means reversed",
    "prophecy": "60 words — second person, slightly mystical, slightly sarcastic. Feels like a fortune cookie that got therapy."
  }
}`,
};

router.post("/generate-life", rateLimitGenerations, async (req, res) => {
  const { branch, demo, pdf_b64, template_type = "linkedin_ghost" } = req.body as {
    branch: { year: string; framing: string; context: string };
    demo?: boolean;
    pdf_b64?: string;
    template_type?: string;
  };

  if (!branch) {
    res.status(400).json({ error: "branch is required" });
    return;
  }

  const schema = TEMPLATE_SCHEMAS[template_type];
  if (!schema) {
    res.status(400).json({ error: `Unknown template_type: ${template_type}` });
    return;
  }

  let profileText = "";
  if (demo) {
    profileText = ZELDA_PROFILE_TEXT;
  } else if (pdf_b64) {
    try {
      const buffer = Buffer.from(pdf_b64, "base64");
      const parsed = await pdfParse(buffer);
      profileText = parsed.text;
    } catch (err) {
      req.log.error({ err }, "Failed to parse PDF");
      res.status(400).json({ error: "Could not read PDF. Make sure it's a valid LinkedIn export." });
      return;
    }
  } else {
    res.status(400).json({ error: "pdf_b64 or demo is required" });
    return;
  }

  const systemPrompt = `You're writing the parallel-universe version of someone's life. They made a real choice at a fork point. You're describing the version where they made the OTHER choice.

${VOICE_RULES}

OUTPUT FORMAT:
Output ONLY a JSON object — no preamble, no markdown. Use this exact schema:

${schema}`;

  const userMessage = `Profile:
${profileText}

Fork point: ${branch.framing}
Context: ${branch.context}
Year: ${branch.year}

Generate the parallel life for this person based on the profile above.`;

  const response = await openrouter.chat.completions.create({
    model: "anthropic/claude-haiku-4.5",
    max_tokens: 8192,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
  });

  const raw = response.choices[0]?.message?.content ?? "";

  let lifeData;
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    lifeData = JSON.parse(cleaned);
  } catch {
    req.log.error({ raw }, "Failed to parse OpenRouter generate-life response");
    res.status(500).json({ error: "Failed to parse model response", raw });
    return;
  }

  res.json({ life: lifeData });
});

export default router;
