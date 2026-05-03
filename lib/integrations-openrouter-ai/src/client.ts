import OpenAI from "openai";

const apiKey = process.env.OPENROUTER_API_KEY || process.env.AI_INTEGRATIONS_OPENROUTER_API_KEY;
const baseURL = process.env.AI_INTEGRATIONS_OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";

if (!apiKey) {
  throw new Error(
    "No OpenRouter API key found. Set OPENROUTER_API_KEY or provision the Replit OpenRouter integration.",
  );
}

export const openrouter = new OpenAI({
  baseURL,
  apiKey,
});
