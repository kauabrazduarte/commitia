import chalk from "chalk";

const MODELS: Record<string, { name: string; value: string }[]> = {
  XAI: [
    { name: chalk.hex("#00D4FF")("   ⚡ Grok-1 (Padrão)"), value: "grok-1" },
    { name: chalk.hex("#00D4FF")("   👁️ Grok-Vision"), value: "grok-vision" },
  ],
  OpenAI: [
    {
      name: chalk.hex("#74AA9C")("   🧠 GPT-4 (Mais poderoso)"),
      value: "gpt-4",
    },
    {
      name: chalk.hex("#74AA9C")("   ⚡ GPT-4o (Otimizado)"),
      value: "gpt-4o",
    },
    {
      name: chalk.hex("#74AA9C")("   💡 GPT-3.5 (Rápido)"),
      value: "gpt-3.5",
    },
  ],
  Claude: [
    {
      name: chalk.hex("#D4A373")("   🎭 Claude 3 Opus"),
      value: "claude-3-opus",
    },
    {
      name: chalk.hex("#D4A373")("   🎵 Claude 3 Sonnet"),
      value: "claude-3-sonnet",
    },
  ],
  Google: [
    { name: chalk.hex("#4285F4")("   ✨ Gemini Pro"), value: "gemini-pro" },
    { name: chalk.hex("#4285F4")("   🚀 Gemini 1.5"), value: "gemini-1.5" },
  ],
  NagaIA: [
    {
      name: chalk.hex("#FF6B6B")("   🐉 Naga-1 (Completo)"),
      value: "naga-1",
    },
    { name: chalk.hex("#FF6B6B")("   ⚡ Naga-Lite"), value: "naga-lite" },
  ],
};

export default MODELS;
