// ---------------------------------------------------------------------------
// AI summarization utility — optional, provider-agnostic placeholder
//
// This template ships the Vercel AI SDK (`ai`) but is NOT tied to any specific
// LLM provider. Bring your own: install the provider package you want and wire
// it up below. The Vercel AI SDK supports Anthropic, OpenAI, Google, Mistral,
// Ollama, and many others through interchangeable provider adapters.
//
//   npm install @ai-sdk/<your-provider>   # e.g. @ai-sdk/openai, @ai-sdk/anthropic
//
// AI is entirely optional — the app builds and runs without any provider key.
// Until you wire one up, this returns a deterministic stub so nothing breaks
// (and CI passes without secrets).
// ---------------------------------------------------------------------------

// import { generateText } from "ai";
// import { createProvider } from "@ai-sdk/<your-provider>";

function isTestEnv() {
  return (
    process.env.NODE_ENV === "test" ||
    process.env.VITEST ||
    process.env.PLAYWRIGHT
  );
}

/**
 * Generate a short summary for a piece of content.
 * Replace the body of this function with your own AI call once you have picked
 * a provider and set its API key.
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

  // Example using the Vercel AI SDK (uncomment and pick a provider/model):
  //
  // const { text } = await generateText({
  //   model: provider("<your-model-id>"),
  //   system: "You are an assistant that writes concise factual summaries.",
  //   prompt: `Summarize the following in 1-2 sentences.\n\nTitle: ${title}\n\nContent:\n${content}`,
  // });
  // return text.trim();

  // Placeholder until you wire up a provider:
  return `Summary of "${title}".`;
}
