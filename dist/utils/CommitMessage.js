"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ai_1 = require("ai");
const openai_1 = require("@ai-sdk/openai");
const xai_1 = require("@ai-sdk/xai");
const anthropic_1 = require("@ai-sdk/anthropic");
const google_1 = require("@ai-sdk/google");
const config_1 = __importDefault(require("../config/config"));
const openai_2 = __importDefault(require("openai"));
const prompt_1 = __importDefault(require("../constants/prompt"));
class CommitMessage {
    async generate(diffs) {
        const config = config_1.default.getAll();
        const handleModels = {
            XAI: xai_1.createXai,
            OpenAI: openai_1.createOpenAI,
            NagaIA: openai_1.createOpenAI,
            Claude: anthropic_1.createAnthropic,
            Google: google_1.createGoogleGenerativeAI,
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
            const client = new openai_2.default({
                baseURL: "https://api.naga.ac/v1",
                apiKey: config.apiKey,
            });
            const response = await client.chat.completions.create({
                model: config.model,
                messages: [
                    {
                        role: "system",
                        content: prompt_1.default.replace("{{diff}}", JSON.stringify(diffs)),
                    },
                ],
                max_tokens: 200,
            });
            return response.choices[0].message.content;
        }
        else {
            const model = handleModels[config.provider]({
                apiKey: config.apiKey,
            });
            const { text } = await (0, ai_1.generateText)({
                model: model(config.model),
                prompt: prompt_1.default.replace("{{diff}}", JSON.stringify(diffs)),
                maxOutputTokens: 200,
            });
            return text;
        }
    }
}
exports.default = CommitMessage;
