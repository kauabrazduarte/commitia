import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createXai } from "@ai-sdk/xai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export default class CommitMessage {
  async generate(diffs: Record<string, string>) {
    const model = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { text } = await generateText({
      model: model("o3-mini"),
      prompt: "What is love?",
    });
  }
}
