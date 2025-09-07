import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import boxen from "boxen";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import Config from "../config/config";
import MODELS from "../config/models";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const claudeGradient = gradient(["#FF6B6B", "#4ECDC4", "#45B7D1"]);
const greenGradient = gradient(["#11998e", "#38ef7d"]);

interface SetupState {
  step: number;
  provider?: string;
  apiKey?: string;
  model?: string;
}

function drawInterface(state: SetupState, currentPrompt?: string) {
  console.clear();

  console.log(
    boxen(
      claudeGradient(
        figlet.textSync("COMMITIA", {
          font: "ANSI Shadow",
          horizontalLayout: "fitted",
        }),
      ),
      {
        padding: { top: 1, bottom: 1, left: 4, right: 4 },
        margin: { top: 1, bottom: 0 },
        borderStyle: "bold",
        borderColor: "#667eea",
        backgroundColor: "#1a1a2e",
        dimBorder: false,
      },
    ),
  );

  console.log(
    chalk
      .hex("#666666")
      .italic("  ✨ Inteligência Artificial para seus commits ✨\n"),
  );

  const steps = [
    { icon: "◯", label: "Provedor", completed: state.step > 0 },
    { icon: "◯", label: "API Key", completed: state.step > 1 },
    { icon: "◯", label: "Modelo", completed: state.step > 2 },
    { icon: "◯", label: "Finalizar", completed: state.step > 3 },
  ];

  steps.forEach((step, index) => {
    if (step.completed) {
      step.icon = "✓";
    } else if (index === state.step) {
      step.icon = "◆";
    }
  });

  const statusBar = steps
    .map((s, index) => {
      const color = s.completed
        ? "#38ef7d"
        : index === state.step
          ? "#45B7D1"
          : "#666666";
      return chalk.hex(color)(`${s.icon} ${s.label}`);
    })
    .join(chalk.hex("#404040")("  ─  "));

  console.log(
    boxen(statusBar, {
      padding: { top: 1, bottom: 1, left: 3, right: 3 },
      margin: { top: 0, bottom: 1 },
      borderStyle: "round",
      borderColor: "#4ECDC4",
      backgroundColor: "#0f0f1e",
      title: chalk.hex("#FFD93D")(" PROGRESSO "),
      titleAlignment: "center",
    }),
  );

  if (state.provider || state.apiKey || state.model) {
    let configInfo = "";
    if (state.provider) {
      configInfo +=
        chalk.hex("#B0B0B0")("Provedor: ") +
        chalk.hex("#45B7D1")(state.provider) +
        "   ";
    }
    if (state.apiKey) {
      const maskedKey =
        state.apiKey.slice(0, 4) + "•".repeat(8) + state.apiKey.slice(-4);
      configInfo +=
        chalk.hex("#B0B0B0")("API Key: ") +
        chalk.hex("#45B7D1")(maskedKey) +
        "   ";
    }
    if (state.model) {
      configInfo +=
        chalk.hex("#B0B0B0")("Modelo: ") + chalk.hex("#45B7D1")(state.model);
    }

    console.log(
      boxen(configInfo, {
        padding: { top: 0, bottom: 0, left: 2, right: 2 },
        borderStyle: "single",
        borderColor: "#404040",
        backgroundColor: "#0a0a0a",
      }),
    );
    console.log();
  }

  if (currentPrompt) {
    console.log(
      boxen(currentPrompt, {
        padding: { top: 0, bottom: 0, left: 2, right: 2 },
        borderStyle: "round",
        borderColor: "#45B7D1",
        backgroundColor: "#0f0f1e",
      }),
    );
    console.log();
  }
}

function drawSuccessScreen(config: any) {
  console.clear();

  console.log(
    boxen(
      greenGradient(
        figlet.textSync("SUCCESS!", {
          font: "Standard",
          horizontalLayout: "fitted",
        }),
      ),
      {
        padding: { top: 1, bottom: 1, left: 4, right: 4 },
        borderStyle: "bold",
        borderColor: "#38ef7d",
        backgroundColor: "#0f1e0f",
      },
    ),
  );

  const summaryContent =
    chalk.hex("#38ef7d")("✅ Configuração salva com sucesso!\n\n") +
    chalk.hex("#667eea")(
      "╔══════════════════════════════════════════════════╗\n",
    ) +
    chalk.hex("#667eea")("║") +
    chalk.bold.white("         📊 RESUMO DA CONFIGURAÇÃO              ") +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")(
      "╠══════════════════════════════════════════════════╣\n",
    ) +
    chalk.hex("#667eea")(
      "║                                                  ║\n",
    ) +
    chalk.hex("#667eea")("║") +
    chalk.hex("#B0B0B0")("  Provedor:  ") +
    chalk.bold.hex("#45B7D1")(config.provider.padEnd(36)) +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")("║") +
    chalk.hex("#B0B0B0")("  Modelo:    ") +
    chalk.bold.hex("#45B7D1")(config.model.padEnd(36)) +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")("║") +
    chalk.hex("#B0B0B0")("  API Key:   ") +
    chalk.bold.hex("#45B7D1")(
      (
        config.apiKey.slice(0, 4) +
        "•".repeat(20) +
        config.apiKey.slice(-4)
      ).padEnd(36),
    ) +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")("║") +
    chalk.hex("#B0B0B0")("  Local:     ") +
    chalk.hex("#808080")("~/.commitia/config.json".padEnd(36)) +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")(
      "║                                                  ║\n",
    ) +
    chalk.hex("#667eea")(
      "╠══════════════════════════════════════════════════╣\n",
    ) +
    chalk.hex("#667eea")("║") +
    chalk.bold.hex("#FFD93D")(
      "         🎉 PRÓXIMOS PASSOS 🎉                  ",
    ) +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")(
      "╠══════════════════════════════════════════════════╣\n",
    ) +
    chalk.hex("#667eea")(
      "║                                                  ║\n",
    ) +
    chalk.hex("#667eea")("║  ") +
    chalk.hex("#E0E0E0")("Use os comandos abaixo para começar:           ") +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")(
      "║                                                  ║\n",
    ) +
    chalk.hex("#667eea")("║  ") +
    chalk.bold.hex("#45B7D1")("commitia") +
    chalk.hex("#B0B0B0")(" ─ Gerar commit com IA              ") +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")("║  ") +
    chalk.bold.hex("#45B7D1")("commitia --help") +
    chalk.hex("#B0B0B0")(" ─ Ver todos os comandos    ") +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")("║  ") +
    chalk.bold.hex("#45B7D1")("commitia config") +
    chalk.hex("#B0B0B0")(" ─ Reconfigurar            ") +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")(
      "║                                                  ║\n",
    ) +
    chalk.hex("#667eea")(
      "╚══════════════════════════════════════════════════╝",
    );

  console.log(
    boxen(summaryContent, {
      padding: { top: 0, bottom: 0, left: 2, right: 2 },
      margin: { top: 1, bottom: 1 },
      borderStyle: "none",
      backgroundColor: "#0a0f0a",
    }),
  );

  console.log(
    "\n" + chalk.hex("#666666").italic("  Feito com ❤️  por kaua.dev.br\n"),
  );
}

export default async function commitiaLogin() {
  const state: SetupState = { step: 0 };

  drawInterface(state);
  const subtitleAnimation = chalkAnimation.neon(
    "Configurando seu ambiente de IA...",
  );
  subtitleAnimation.start();
  await sleep(2000);
  subtitleAnimation.stop();

  drawInterface(state, chalk.hex("#45B7D1")("→ Selecione seu provedor de IA:"));

  const { provider } = await inquirer.prompt([
    {
      type: "list",
      name: "provider",
      message: "",
      choices: [
        { name: chalk.hex("#00D4FF")("   ⚡ XAI (Grok)"), value: "XAI" },
        { name: chalk.hex("#74AA9C")("   🤖 OpenAI (GPT)"), value: "OpenAI" },
        {
          name: chalk.hex("#D4A373")("   🎨 Claude (Anthropic)"),
          value: "Claude",
        },
        {
          name: chalk.hex("#4285F4")("   🔮 Google (Gemini)"),
          value: "Google",
        },
        { name: chalk.hex("#FF6B6B")("   🐉 NagaIA"), value: "NagaIA" },
      ],
    },
  ]);

  state.provider = provider;
  state.step = 1;

  drawInterface(
    state,
    chalk.hex("#45B7D1")(`→ Cole sua API Key do ${provider}:`),
  );

  const { apiKey } = await inquirer.prompt([
    {
      type: "password",
      name: "apiKey",
      message: "",
      mask: chalk.hex("#667eea")("●"),
    },
  ]);

  state.apiKey = apiKey;
  state.step = 2;

  drawInterface(
    state,
    chalk.hex("#45B7D1")(`→ Selecione o modelo ${provider}:`),
  );

  const { model } = await inquirer.prompt([
    {
      type: "list",
      name: "model",
      message: "",
      choices: MODELS[provider],
    },
  ]);

  state.model = model;
  state.step = 3;

  drawInterface(state, chalk.hex("#45B7D1")("💾 Salvando configuração..."));
  await sleep(1500);

  const config = { provider, model, apiKey };
  Config.define(config);

  state.step = 4;

  drawSuccessScreen(config);
}
