import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createXai } from "@ai-sdk/xai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import Config from "../config/config";
import OpenAI from "openai";
import PROMPT from "../constants/prompt";

export default class CommitMessage {
  async generate(diffs: Record<string, string>): Promise<null | string> {
    const config = Config.getAll();

    const handleModels = {
      XAI: createXai,
      OpenAI: createOpenAI,
      NagaIA: createOpenAI,
      Claude: createAnthropic,
      Google: createGoogleGenerativeAI,
    };

    if (!config.model) {
      throw new Error("Model not configured");
    }

    if (!Object.keys(handleModels).includes(config.provider)) {
      throw new Error("Invalid model");
    }

    if (!config.apiKey) {
      throw new Error("API key not configured");
    }

    if (!config.model) {
      throw new Error("Model not configured");
    }

    if (config.provider === "NagaIA") {
      const client = new OpenAI({
        baseURL: "https://api.naga.ac/v1",
        apiKey: config.apiKey,
      });

      const response = await client.chat.completions.create({
        model: config.model,
        messages: [
          {
            role: "system",
            content: PROMPT.replace("{{diff}}", JSON.stringify(diffs)),
          },
        ],
        max_tokens: 200,
      });

      return response.choices[0].message.content;
    } else {
      const model = handleModels[config.provider as keyof typeof handleModels]({
        apiKey: config.apiKey,
      });

      const { text } = await generateText({
        model: model(config.model),
        prompt: PROMPT.replace("{{diff}}", JSON.stringify(diffs)),
        maxOutputTokens: 200,
      });

      return text;
    }
  }
}
