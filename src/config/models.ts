import chalk from "chalk";

const MODELS: Record<string, { name: string; value: string }[]> = {
  XAI: [
    {
      name: chalk.hex("#00D4FF")("   ⚡ Grok 4 (Mais avançado)"),
      value: "grok-4-0709",
    },
    { name: chalk.hex("#00D4FF")("   🧠 Grok 3 (Poderoso)"), value: "grok-3" },
    {
      name: chalk.hex("#00D4FF")("   🚀 Grok 3 Mini (Rápido)"),
      value: "grok-3-mini",
    },
    {
      name: chalk.hex("#00D4FF")(
        "   💻 Grok Code Fast 1 (Otimizado para código)",
      ),
      value: "grok-code-fast-1",
    },
  ],
  OpenAI: [
    {
      name: chalk.hex("#74AA9C")("   🧠 GPT-4o (Otimizado e poderoso)"),
      value: "gpt-4o",
    },
    {
      name: chalk.hex("#74AA9C")("   ⚡ GPT-4o mini (Rápido e eficiente)"),
      value: "gpt-4o-mini",
    },
    {
      name: chalk.hex("#74AA9C")("   💥 GPT-4 Turbo (Alta performance)"),
      value: "gpt-4-turbo",
    },
    {
      name: chalk.hex("#74AA9C")("   📚 GPT-4 (Clássico poderoso)"),
      value: "gpt-4",
    },
    {
      name: chalk.hex("#74AA9C")("   🚀 GPT-3.5 Turbo (Rápido)"),
      value: "gpt-3.5-turbo",
    },
    {
      name: chalk.hex("#74AA9C")("   🤔 o1 (Raciocínio avançado)"),
      value: "o1-preview",
    },
    {
      name: chalk.hex("#74AA9C")("   🕵️ o1 mini (Raciocínio leve)"),
      value: "o1-mini",
    },
    {
      name: chalk.hex("#74AA9C")("   🌟 ChatGPT-4o latest (Última versão)"),
      value: "chatgpt-4o-latest",
    },
    {
      name: chalk.hex("#74AA9C")("   🔄 GPT-4 Turbo preview (Preview)"),
      value: "gpt-4-turbo-preview",
    },
    {
      name: chalk.hex("#74AA9C")("   📈 GPT-3.5 Turbo 0125 (Atualizado)"),
      value: "gpt-3.5-turbo-0125",
    },
  ],
  Claude: [
    {
      name: chalk.hex("#D4A373")("   🎭 Claude Opus 4.1 (Mais capaz)"),
      value: "claude-opus-4-1-20250805",
    },
    {
      name: chalk.hex("#D4A373")("   🎵 Claude Opus 4 (Flagship anterior)"),
      value: "claude-opus-4-20250514",
    },
    {
      name: chalk.hex("#D4A373")("   🧠 Claude Sonnet 4 (Alta performance)"),
      value: "claude-sonnet-4-20250514",
    },
    {
      name: chalk.hex("#D4A373")(
        "   ⚡ Claude Sonnet 3.7 (Raciocínio estendido)",
      ),
      value: "claude-3-7-sonnet-20250219",
    },
    {
      name: chalk.hex("#D4A373")("   🚀 Claude Haiku 3.5 (Mais rápido)"),
      value: "claude-3-5-haiku-20241022",
    },
    {
      name: chalk.hex("#D4A373")(
        "   💡 Claude Haiku 3 (Compacto e responsivo)",
      ),
      value: "claude-3-haiku-20240307",
    },
  ],
  Google: [
    {
      name: chalk.hex("#4285F4")("   ✨ Gemini 2.5 Pro (Estado da arte)"),
      value: "gemini-2.5-pro",
    },
    {
      name: chalk.hex("#4285F4")(
        "   🚀 Gemini 2.5 Flash (Preço-performance ótimo)",
      ),
      value: "gemini-2.5-flash",
    },
    {
      name: chalk.hex("#4285F4")("   ⚡ Gemini 2.5 Flash-Lite (Eficiente)"),
      value: "gemini-2.5-flash-lite",
    },
    {
      name: chalk.hex("#4285F4")("   🎙️ Gemini 2.5 Flash Live (Interativo)"),
      value: "gemini-live-2.5-flash-preview",
    },
    {
      name: chalk.hex("#4285F4")(
        "   🔊 Gemini 2.5 Flash Native Audio (Conversacional)",
      ),
      value: "gemini-2.5-flash-preview-native-audio-dialog",
    },
    {
      name: chalk.hex("#4285F4")("   🌟 Gemini 2.0 Flash (Nova geração)"),
      value: "gemini-2.0-flash",
    },
    {
      name: chalk.hex("#4285F4")(
        "   💨 Gemini 2.0 Flash-Lite (Baixa latência)",
      ),
      value: "gemini-2.0-flash-lite",
    },
    {
      name: chalk.hex("#4285F4")("   📹 Gemini 2.0 Flash Live (Voz e vídeo)"),
      value: "gemini-2.0-flash-live-001",
    },
    {
      name: chalk.hex("#4285F4")("   🧩 Gemini 1.5 Flash (Versátil)"),
      value: "gemini-1.5-flash",
    },
    {
      name: chalk.hex("#4285F4")(
        "   🧠 Gemini 1.5 Pro (Otimizado para tarefas)",
      ),
      value: "gemini-1.5-pro",
    },
  ],
  NagaIA: [
    {
      name: chalk.hex("#FF6B6B")("   🧠 OpenAI GPT-4o (Otimizado)"),
      value: "gpt-4o",
    },
    {
      name: chalk.hex("#FF6B6B")("   ⚡ OpenAI GPT-4o mini (Eficiente)"),
      value: "gpt-4o-mini",
    },
    {
      name: chalk.hex("#FF6B6B")("   🎭 Claude Opus 4.1 (Mais capaz)"),
      value: "claude-opus-4-1-20250805",
    },
    {
      name: chalk.hex("#FF6B6B")("   🧠 Claude Sonnet 4 (Alta performance)"),
      value: "claude-sonnet-4-20250514",
    },
    {
      name: chalk.hex("#FF6B6B")(
        "   ✨ Google Gemini 2.5 Pro (Estado da arte)",
      ),
      value: "gemini-2.5-pro",
    },
    {
      name: chalk.hex("#FF6B6B")("   🚀 Google Gemini 2.5 Flash (Rápido)"),
      value: "gemini-2.5-flash",
    },
    {
      name: chalk.hex("#FF6B6B")("   ⚡ XAI Grok 4 (Avançado)"),
      value: "grok-4-0709",
    },
    {
      name: chalk.hex("#FF6B6B")("   🧠 XAI Grok 3 (Poderoso)"),
      value: "grok-3",
    },
    {
      name: chalk.hex("#FF6B6B")("   🚀 OpenAI GPT-3.5 Turbo (Rápido)"),
      value: "gpt-3.5-turbo",
    },
    {
      name: chalk.hex("#FF6B6B")("   ⚡ Claude Haiku 3.5 (Mais rápido)"),
      value: "claude-3-5-haiku-20241022",
    },
  ],
};

export default MODELS;
