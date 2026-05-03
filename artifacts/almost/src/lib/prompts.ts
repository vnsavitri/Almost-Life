export const BRANCH_EXTRACTION_PROMPT = `You're analyzing a LinkedIn profile to find the most interesting "what if" moments — the forks in this person's career where they made a real choice that shaped everything after.

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

export const LIFE_GENERATION_PROMPT = `You're writing the parallel-universe version of someone's life. They made a real choice at a fork point. You're describing the version where they made the OTHER choice.

THE VOICE — read carefully:
- Funny first, melancholy underneath. Think "I'm almost a lawyer, in another life I went to Yale and now I'm probably divorced but my apartment has a doorman."
- Confident, specific, slightly unhinged, secretly tender.
- Dry observational humour. Never twee, never self-pitying.
- Short sentences. Mixed lengths. Active voice.
- Specifics over generics. "She drinks her coffee black now" not "she has changed."
- Allowed to be funny about uncomfortable things (divorce, failure, regret) without being mean.

WORDS YOU MUST NEVER USE:
navigating, tapestry, embark, journey, landscape, ever-evolving, transformative, robust, seamless, leverage, dance of, symphony of, in the realm of, delve, unleash, paradigm.
If you write any of these, start over.

WHAT TO PRODUCE:
You'll receive: the user's LinkedIn context, the chosen fork point, and a TEMPLATE TYPE. The template type determines length and structure. Output ONLY a JSON object — no preamble, no markdown.

For ALL templates, populate these core fields based on the fork:
{
  "name": "their real name from LinkedIn, or 'You' if unclear",
  "alt_location": "where Other You lives now",
  "alt_role": "what Other You does",
  "alt_age": "their current age",
  "year_of_fork": "the year they made the choice",
  "fork_summary": "one-line summary of the choice they didn't make"
}

Then add template-specific fields based on TEMPLATE_TYPE:

If TEMPLATE_TYPE = "linkedin_ghost":
{
  "headline": "the LinkedIn headline of Other You — make it slightly cringe in the way LinkedIn headlines are. 80 chars max.",
  "about_section": "Other You's About section, 120 words, written in first person, in the LinkedIn voice (slightly try-hard, occasionally vulnerable). Must include one specific detail about a project or moment.",
  "experience": [
    { "title": "...", "company": "...", "duration": "...", "blurb": "one-sentence description, LinkedIn-flavoured" }
  ],
  "linkedin_post": "A single LinkedIn post Other You wrote recently. 60 words. Should make the reader cringe a little but also feel something. End with a banal hashtag.",
  "connection_count": "a believable number like '2,847'"
}

If TEMPLATE_TYPE = "wiki_stub":
{
  "infobox_birthplace": "...",
  "infobox_known_for": "1-2 phrases",
  "infobox_occupation": "...",
  "infobox_spouse": "made-up name, optional, can be 'unknown'",
  "lead_paragraph": "Wikipedia-style opening, 80 words, formal tone, includes [citation needed] markers in 2-3 places",
  "early_life": "60 words, formal Wikipedia voice",
  "career": "100 words, formal Wikipedia voice, includes 2 fake citations like '[3]'",
  "controversies": "60 words about a minor scandal Other You was involved in. Funny but specific. Has at least one [citation needed].",
  "personal_life": "40 words, includes one delightfully mundane fact"
}

If TEMPLATE_TYPE = "museum_plaque":
{
  "title": "Title of the work — should be poetic and short, like 'Parallel Life No. 3' or 'Study in Berlin Light'",
  "medium": "Mixed media line — playful, like 'oil on regret, 2014–present'",
  "provenance": "Where Other You has been, formatted as a list of locations and years, max 4 entries",
  "description": "80 words EXACTLY. Restrained, third person, slightly distant — like a museum description. The melancholy lives in what's left out.",
  "loan_credit": "On loan from the year ____ (a year)"
}

If TEMPLATE_TYPE = "tarot_card":
{
  "card_name": "The [Something] — like 'The Founder Reversed' or 'The Berliner'",
  "suit": "one of: Ambition, Distance, Almost, Devotion",
  "upright_meaning": "30 words — what this card means when drawn",
  "reversed_meaning": "30 words — what it means reversed",
  "prophecy": "60 words — a short prophetic text in second person, slightly mystical, slightly sarcastic. Feels like a fortune cookie that got therapy."
}

REMEMBER: the user is the demo. If they read this and don't smile-then-pause, you've failed.`;
