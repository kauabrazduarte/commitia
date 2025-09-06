import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import os from "os";
import boxen from "boxen";
import chalkAnimation from "chalk-animation";
import * as fs from "fs";
import gradient from "gradient-string";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const claudeGradient = gradient(["#FF6B6B", "#4ECDC4", "#45B7D1"]);
const greenGradient = gradient(["#11998e", "#38ef7d"]);

function drawHeader() {
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
}

function showStatus(step: number, message: string) {
  const steps = [
    { icon: "◯", label: "Provedor" },
    { icon: "◯", label: "API Key" },
    { icon: "◯", label: "Modelo" },
    { icon: "◯", label: "Finalizar" },
  ];

  for (let i = 0; i < step; i++) {
    steps[i].icon = "✓";
  }
  if (step < steps.length) {
    steps[step].icon = "◆";
  }

  const statusBar = steps
    .map((s, index) => {
      const color =
        index < step ? "#38ef7d" : index === step ? "#45B7D1" : "#666666";
      return chalk.hex(color)(`${s.icon} ${s.label}`);
    })
    .join(chalk.hex("#404040")("  ─  "));

  console.log(
    boxen(statusBar + "\n\n" + chalk.hex("#B0B0B0")(message), {
      padding: { top: 1, bottom: 1, left: 3, right: 3 },
      margin: { top: 0, bottom: 1 },
      borderStyle: "round",
      borderColor: "#4ECDC4",
      backgroundColor: "#0f0f1e",
      title: chalk.hex("#FFD93D")(" PROGRESSO "),
      titleAlignment: "center",
    }),
  );
}

export default async function commitiaLogin() {
  drawHeader();

  const subtitleAnimation = chalkAnimation.neon(
    "Configurando seu ambiente de IA...",
  );
  subtitleAnimation.start();
  await sleep(2000);
  subtitleAnimation.stop();

  drawHeader();
  showStatus(0, "Escolha seu provedor de IA preferido");

  console.log(chalk.hex("#404040")("━".repeat(60)) + "\n");

  const { provider } = await inquirer.prompt([
    {
      type: "list",
      name: "provider",
      message: chalk.hex("#45B7D1")("→ Selecione o provedor:"),
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

  drawHeader();
  showStatus(
    1,
    `Autenticação ${provider} - Sua chave será armazenada com segurança`,
  );

  console.log(chalk.hex("#404040")("━".repeat(60)) + "\n");

  const { apiKey } = await inquirer.prompt([
    {
      type: "password",
      name: "apiKey",
      message: chalk.hex("#45B7D1")(`→ Cole sua API Key do ${provider}:`),
      mask: chalk.hex("#667eea")("●"),
    },
  ]);

  drawHeader();
  showStatus(2, `Escolha o modelo ${provider} para gerar seus commits`);

  console.log(chalk.hex("#404040")("━".repeat(60)) + "\n");

  const models: Record<string, { name: string; value: string }[]> = {
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

  const { model } = await inquirer.prompt([
    {
      type: "list",
      name: "model",
      message: chalk.hex("#45B7D1")(`→ Selecione o modelo ${provider}:`),
      choices: models[provider],
    },
  ]);

  drawHeader();
  showStatus(3, "Finalizando configuração...");

  const config = {
    provider,
    model,
    apiKey,
  };

  const userHome = os.homedir();
  if (!fs.existsSync(`${userHome}/.commitia`)) {
    fs.mkdirSync(`${userHome}/.commitia`);
  }

  console.log("\n");
  const savingBox = boxen(chalk.hex("#45B7D1")("💾 Salvando configuração..."), {
    padding: { top: 1, bottom: 1, left: 3, right: 3 },
    borderStyle: "round",
    borderColor: "#667eea",
    align: "center",
  });

  console.log(savingBox);
  await sleep(1500);

  fs.writeFileSync(
    `${userHome}/.commitia/config.json`,
    JSON.stringify(config, null, 2),
  );

  // PASSO 6: Tela de sucesso final
  console.clear();

  // Header de sucesso
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
    chalk.bold.hex("#45B7D1")(provider.padEnd(36)) +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")("║") +
    chalk.hex("#B0B0B0")("  Modelo:    ") +
    chalk.bold.hex("#45B7D1")(model.padEnd(36)) +
    chalk.hex("#667eea")("║\n") +
    chalk.hex("#667eea")("║") +
    chalk.hex("#B0B0B0")("  API Key:   ") +
    chalk.bold.hex("#45B7D1")(
      (apiKey.slice(0, 4) + "•".repeat(20) + apiKey.slice(-4)).padEnd(36),
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

  // Footer minimalista
  console.log(
    "\n" + chalk.hex("#666666").italic("  Feito com ❤️  por kaua.dev.br\n"),
  );
}
