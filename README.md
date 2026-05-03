# Almost

*the life you didn't quite live*

---

**Almost** is a parallel-life generator. Upload your LinkedIn PDF, pick a career fork you didn't take, choose a format, and receive a fully rendered alternate-universe version of yourself — downloadable and shareable.

Built for the **Replit 10 Buildathon**.

→ **[almost-life.replit.app](https://almost--vnsavitri.replit.app/)**

---

## What it does

Every career is a series of doors you didn't open. Almost asks: *what would the other version of you look like right now?* Not as a regret — as a curiosity.

1. **Upload** your LinkedIn PDF. The app parses titles, transitions, and moments where the road branched.
2. **Fork** — the AI surfaces three or four genuine choice-points in your career. You pick the one that's stayed with you.
3. **Format** — choose how your alternate life gets told: a LinkedIn profile, a Wikipedia stub, a museum plaque, or a tarot card.
4. **Result** — the other version of you, fully rendered. Download it. Share it. Leave it open in a tab for a while.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite (TypeScript) |
| Backend | Express (Node.js, TypeScript) |
| AI | Claude Haiku 4.5 via OpenRouter |
| Database | PostgreSQL via Drizzle ORM |
| Monorepo | pnpm workspaces |
| Hosting | Replit |

---

## Project structure

```
artifacts/
  almost/          # React + Vite frontend
  api-server/      # Express API server
lib/
  db/              # Drizzle schema + migrations
  integrations-openrouter-ai/  # OpenRouter client
scripts/           # Shared utility scripts
```

---

## Running locally

**Prerequisites:** Node 20+, pnpm, a PostgreSQL database, an OpenRouter API key.

```bash
# Install dependencies
pnpm install

# Set environment variables (see below)
cp .env.example .env

# Run migrations
pnpm --filter @workspace/db run migrate

# Start both servers
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/almost run dev
```

**Required environment variables:**

```
OPENROUTER_API_KEY=     # OpenRouter API key (for AI generation)
SESSION_SECRET=         # Any random string (express-session)
DATABASE_URL=           # PostgreSQL connection string
ADMIN_PASSWORD=         # Password for /admin stats page
```

**Optional:**

```
DISABLE_RATE_LIMIT=true # Disables the 3 generations/IP/24hr limit in dev
```

---

## Privacy

- **Nothing is stored.** Your PDF is read once, in memory, then discarded.
- **No account needed.** No login, no tracking, no newsletter.
- **AI via OpenRouter.** Your data is subject to their standard usage policy — not used for training without consent.

---

## Features

- PDF parsing and career graph extraction
- AI-identified fork points with editorial framing
- Four output templates: LinkedIn profile, Wikipedia stub, museum plaque, tarot card
- Downloadable HTML output
- Demo mode (try Zelda's what-if without uploading anything)
- Rate limiting: 3 generations per IP per 24 hours in production
- Admin stats dashboard at `/admin`
- OG image + favicon for social sharing
- Mobile responsive

---

## Built by

**Vivid** — AI product builder, 15+ years across design, technology, and data science.

- LinkedIn: [vnsavitri](https://www.linkedin.com/in/vnsavitri)
- GitHub: [vnsavitri](https://github.com/vnsavitri/Almost-Life/)

---

*"The unlived life is not a mistake. It's the other book on the shelf — same author, different ending."*
