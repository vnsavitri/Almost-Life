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

const MAYA_DEMO_BRANCHES = [
  {
    id: "1",
    year: "2014",
    framing: "You closed the Berlin studio and bought a one-way ticket to Sydney. What if you'd stayed?",
    context: "Maya ran a small design studio in Berlin-Mitte for three years before relocating to Australia",
  },
  {
    id: "2",
    year: "2017",
    framing: "You left the Sydney agency after 18 months to go freelance. What if you'd taken the senior role they offered instead?",
    context: "Maya turned down a senior CD role to go independent",
  },
  {
    id: "3",
    year: "2020",
    framing: "You started Hype Studios alone during a global pandemic. What if you'd waited one more year?",
    context: "Maya launched her solo studio in March 2020",
  },
  {
    id: "4",
    year: "2011",
    framing: "You chose the Bauhaus-Universität over the safe grad scheme at BBDO. What if you hadn't?",
    context: "Maya turned down a corporate grad role to do a design MFA",
  },
];

router.post("/extract-branches", async (req, res) => {
  const { pdf_b64, demo } = req.body as { pdf_b64?: string; demo?: boolean };

  if (demo) {
    res.json({ branches: MAYA_DEMO_BRANCHES });
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
    model: "claude-sonnet-4-5",
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
