import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";

const router = Router();

const BRANCH_EXTRACTION_PROMPT = `You're analyzing a LinkedIn profile to find the most interesting "what if" moments — the forks in this person's career where they made a real choice that shaped everything after.

Your job: identify 3 to 5 inflection points from their actual history. Each one must be a REAL decision they made, not a hypothetical. Look for:
- Job changes that came with a country/city move
- Industry pivots
- Times they left something stable for something risky (or vice versa)
- Education choices
- Long gaps that suggest a sabbatical or rethink
- The job they stayed in longer than expected
- The company they left right before/after a big event

Return ONLY a JSON array. No preamble. No markdown. Format:
[
  {
    "id": "1",
    "year": "2014",
    "framing": "You sold the Berlin studio and moved to Sydney. What if you hadn't?",
    "context": "Brief one-line context for the model later"
  }
]

Rules:
- "framing" must be in second person ("You did X")
- "framing" must be specific to their actual life — never generic
- Don't invent details. If their LinkedIn doesn't say why they moved, don't speculate in the framing
- Tone: dry, knowing, slightly amused — like a smart friend who's noticed something
- Return between 3 and 5 branches, ranked by how interesting the fork is`;

const ZELDA_DEMO_BRANCHES = [
  {
    id: "1",
    year: "2014",
    framing: "You accepted the Triforce of Wisdom and sealed yourself in the castle for 100 years. What if you'd just... declined?",
    context: "Zelda chose to use her divine power to contain Ganon, sacrificing her own freedom in the process",
  },
  {
    id: "2",
    year: "2010",
    framing: "You left Kakariko Village to pursue Sheikah technology research. What if you'd stayed and opened that pottery studio?",
    context: "Zelda briefly considered a quieter life in Kakariko Village before being drawn back into royal duties",
  },
  {
    id: "3",
    year: "2017",
    framing: "You woke Link up from his own suspended animation. What if you'd decided he needed five more years?",
    context: "Zelda made the call to wake Link earlier than strictly necessary, which accelerated the Calamity timeline",
  },
  {
    id: "4",
    year: "2006",
    framing: "You enrolled at the Royal Academy to study prophecy. What if you'd done the gap year in Gerudo Town instead?",
    context: "Zelda chose formal education over a sabbatical that would have taken her far from royal responsibilities",
  },
];

router.post("/extract-branches", async (req, res) => {
  const { pdf_b64, demo } = req.body as { pdf_b64?: string; demo?: boolean };

  if (demo) {
    res.json({ branches: ZELDA_DEMO_BRANCHES });
    return;
  }

  if (!pdf_b64) {
    res.status(400).json({ error: "pdf_b64 is required" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
    return;
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 1024,
    system: BRANCH_EXTRACTION_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: pdf_b64,
            },
          } as Anthropic.DocumentBlockParam,
          {
            type: "text",
            text: "Analyze this LinkedIn profile and return the branch points as a JSON array.",
          },
        ],
      },
    ],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text : "";

  let branches;
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    branches = JSON.parse(cleaned);
  } catch {
    req.log.error({ raw }, "Failed to parse Claude response");
    res.status(500).json({ error: "Failed to parse response from Claude", raw });
    return;
  }

  res.json({ branches });
});

export default router;
