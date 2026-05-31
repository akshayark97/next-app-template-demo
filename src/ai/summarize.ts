// ---------------------------------------------------------------------------
// AI summarization utility — generic placeholder
//
// By default this uses Anthropic via the Vercel AI SDK.
// Swap the model/provider to use OpenAI, Google, etc.
//
// Requires: ANTHROPIC_API_KEY (or your chosen provider key) in .env.local
// Falls back to a stub summary in test environments so no API key is needed
// for CI to pass.
// ---------------------------------------------------------------------------

// import { generateText } from "ai";
// import { anthropic } from "@ai-sdk/anthropic";

function isTestEnv() {
  return (
    process.env.NODE_ENV === "test" ||
    process.env.VITEST ||
    process.env.PLAYWRIGHT
  );
}

/**
 * Generate a short summary for a piece of content.
 * Replace the body of this function with your own AI call once you have an API key.
 */
export async function summarizeContent(
  title: string,
  content: string,
): Promise<string> {
  if (isTestEnv()) {
    return "This is a test summary.";
  }

  if (!content || !content.trim()) {
    throw new Error("Content is required to generate a summary.");
  }

  // Example using Vercel AI SDK + Anthropic (uncomment when ready):
  //
  // const { text } = await generateText({
  //   model: anthropic("claude-haiku-4-5"),
  //   system: "You are an assistant that writes concise factual summaries.",
  //   prompt: `Summarize the following in 1-2 sentences.\n\nTitle: ${title}\n\nContent:\n${content}`,
  // });
  // return text.trim();

  // Placeholder until you wire up a real API key:
  return `Summary of "${title}".`;
}
