import chalk from "chalk";
import boxen from "boxen";
import inquirer from "inquirer";
import { exec } from "child_process";
import { promisify } from "util";
import isGitRepo from "../utils/isGitRepo";
import getDiff from "../utils/getDiff";
import CommitMessage from "../utils/CommitMessage";
import figlet from "figlet";
import gradient from "gradient-string";

const execAsync = promisify(exec);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const commitiaGradient = gradient(["#9b59b6", "#8e44ad", "#7d3c98"]);

interface CommitState {
  step: number;
  repoChecked: boolean;
  filesAdded: boolean;
  diffsObtained: boolean;
  messageGenerated: string | null;
  finalMessage: string | null;
  action: string | null;
}

function drawInterface(
  state: CommitState,
  currentStatus?: string,
  currentPrompt?: string,
) {
  console.clear();

  console.log(
    boxen(
      commitiaGradient(
        figlet.textSync("COMMITIA", {
          font: "ANSI Shadow",
          horizontalLayout: "fitted",
        }),
      ),
      {
        padding: { top: 1, bottom: 1, left: 4, right: 4 },
        margin: { top: 1, bottom: 0 },
        borderStyle: "bold",
        borderColor: "#8e44ad",
        backgroundColor: "#1a0d1f",
        dimBorder: false,
      },
    ),
  );

  console.log(
    chalk
      .hex("#9b59b6")
      .italic("  🚀 Gerando commits inteligentes com IA  🚀\n"),
  );

  const steps = [
    {
      icon: state.repoChecked ? "✓" : state.step === 0 ? "◆" : "◯",
      label: "Repo Check",
      color: state.repoChecked
        ? "#27ae60"
        : state.step === 0
          ? "#9b59b6"
          : "#666666",
    },
    {
      icon: state.filesAdded ? "✓" : state.step === 1 ? "◆" : "◯",
      label: "Add Files",
      color: state.filesAdded
        ? "#27ae60"
        : state.step === 1
          ? "#9b59b6"
          : "#666666",
    },
    {
      icon: state.diffsObtained ? "✓" : state.step === 2 ? "◆" : "◯",
      label: "Get Diffs",
      color: state.diffsObtained
        ? "#27ae60"
        : state.step === 2
          ? "#9b59b6"
          : "#666666",
    },
    {
      icon: state.messageGenerated ? "✓" : state.step === 3 ? "◆" : "◯",
      label: "Generate",
      color: state.messageGenerated
        ? "#27ae60"
        : state.step === 3
          ? "#9b59b6"
          : "#666666",
    },
    {
      icon: state.finalMessage ? "✓" : state.step === 4 ? "◆" : "◯",
      label: "Review",
      color: state.finalMessage
        ? "#27ae60"
        : state.step === 4
          ? "#9b59b6"
          : "#666666",
    },
    {
      icon: state.action ? "✓" : state.step === 5 ? "◆" : "◯",
      label: "Execute",
      color: state.action
        ? "#27ae60"
        : state.step === 5
          ? "#9b59b6"
          : "#666666",
    },
  ];

  const statusBar = steps
    .map((s) => chalk.hex(s.color)(`${s.icon} ${s.label}`))
    .join(chalk.hex("#404040")("  ─  "));

  console.log(
    boxen(statusBar, {
      padding: { top: 1, bottom: 1, left: 3, right: 3 },
      margin: { top: 0, bottom: 1 },
      borderStyle: "round",
      borderColor: "#8e44ad",
      backgroundColor: "#0f0a11",
      title: chalk.hex("#e67e22")(" PROGRESSO "),
      titleAlignment: "center",
    }),
  );

  if (currentStatus) {
    console.log(
      boxen(currentStatus, {
        padding: { top: 0, bottom: 0, left: 2, right: 2 },
        borderStyle: "single",
        borderColor: "#9b59b6",
        backgroundColor: "#1a0d1f",
      }),
    );
    console.log();
  }

  if (state.messageGenerated) {
    const messageBox =
      chalk.hex("#e67e22")("📝 Mensagem de commit gerada:\n\n") +
      chalk.white(state.messageGenerated);

    console.log(
      boxen(messageBox, {
        padding: { top: 1, bottom: 1, left: 2, right: 2 },
        borderStyle: "round",
        borderColor: "#8e44ad",
        backgroundColor: "#0f0a11",
      }),
    );
    console.log();
  }

  if (currentPrompt) {
    console.log(
      boxen(currentPrompt, {
        padding: { top: 0, bottom: 0, left: 2, right: 2 },
        borderStyle: "round",
        borderColor: "#9b59b6",
        backgroundColor: "#0f0a11",
      }),
    );
    console.log();
  }
}

function drawSuccessScreen(message: string, action: string) {
  console.clear();

  const successGradient = gradient(["#27ae60", "#2ecc71"]);

  console.log(
    boxen(
      successGradient(
        figlet.textSync("SUCCESS!", {
          font: "Standard",
          horizontalLayout: "fitted",
        }),
      ),
      {
        padding: { top: 1, bottom: 1, left: 4, right: 4 },
        borderStyle: "bold",
        borderColor: "#27ae60",
        backgroundColor: "#0a1a0f",
      },
    ),
  );

  const actionEmoji = action === "commit" ? "🚀" : "📋";
  const actionText =
    action === "commit"
      ? "Commit realizado com sucesso!"
      : "Mensagem copiada para área de transferência!";

  const summaryContent =
    chalk.hex("#27ae60")(`${actionEmoji} ${actionText}\n\n`) +
    chalk.hex("#8e44ad")(
      "╔══════════════════════════════════════════════════════════╗\n",
    ) +
    chalk.hex("#8e44ad")("║") +
    chalk.bold.white("                   📊 RESUMO                    ") +
    chalk.hex("#8e44ad")("║\n") +
    chalk.hex("#8e44ad")(
      "╠══════════════════════════════════════════════════════════╣\n",
    ) +
    chalk.hex("#8e44ad")(
      "║                                                          ║\n",
    ) +
    chalk.hex("#8e44ad")("║  ") +
    chalk.hex("#B0B0B0")("Ação:     ") +
    chalk.bold.hex("#9b59b6")(actionText.slice(0, 40).padEnd(40)) +
    chalk.hex("#8e44ad")("  ║\n") +
    chalk.hex("#8e44ad")("║  ") +
    chalk.hex("#B0B0B0")("Mensagem: ") +
    chalk.hex("#ffffff")(message.slice(0, 40).padEnd(40)) +
    chalk.hex("#8e44ad")("  ║\n") +
    chalk.hex("#8e44ad")(
      "║                                                          ║\n",
    ) +
    chalk.hex("#8e44ad")(
      "╚══════════════════════════════════════════════════════════╝",
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

export default async function commitia(addFiles: boolean) {
  const state: CommitState = {
    step: 0,
    repoChecked: false,
    filesAdded: false,
    diffsObtained: false,
    messageGenerated: null,
    finalMessage: null,
    action: null,
  };

  // Step 1: Verificação de repositório
  drawInterface(
    state,
    chalk.hex("#9b59b6")("🔍 Verificando repositório Git..."),
  );
  await sleep(800);

  if (!(await isGitRepo())) {
    drawInterface(state, chalk.red("❌ Não existe um repositório git aqui."));
    await sleep(2000);
    process.exit(1);
  }

  state.repoChecked = true;
  state.step = 1;

  // Step 2: Adicionar arquivos (se necessário)
  if (addFiles) {
    drawInterface(
      state,
      chalk.hex("#9b59b6")("📁 Adicionando arquivos ao staging..."),
    );
    await sleep(500);

    try {
      await execAsync("git add .");
      state.filesAdded = true;
    } catch (error) {
      drawInterface(
        state,
        chalk.red(`❌ Erro ao adicionar arquivos: ${error}`),
      );
      await sleep(2000);
      process.exit(1);
    }
  } else {
    state.filesAdded = true;
  }

  state.step = 2;

  // Step 3: Pegar diferenças
  drawInterface(
    state,
    chalk.hex("#9b59b6")("📊 Analisando diferenças no repositório..."),
  );
  await sleep(500);

  let diffs: Record<string, string> = {};
  try {
    diffs = await getDiff();
    state.diffsObtained = true;
  } catch (error) {
    drawInterface(state, chalk.red(`❌ Erro ao pegar diferenças: ${error}`));
    await sleep(2000);
    process.exit(1);
  }

  state.step = 3;

  // Step 4: Gerar mensagem
  drawInterface(
    state,
    chalk.hex("#9b59b6")("🤖 Gerando mensagem de commit com IA..."),
  );

  const commitMessage = new CommitMessage();
  try {
    const message = await commitMessage.generate(diffs);
    if (message === null) {
      throw new Error("Mensagem vazia");
    }
    state.messageGenerated = message;
    state.finalMessage = message;
  } catch (error) {
    drawInterface(
      state,
      chalk.red(`❌ Erro ao gerar mensagem de commit: ${error}`),
    );
    await sleep(2000);
    process.exit(1);
  }

  state.step = 4;

  // Step 5: Review da mensagem
  drawInterface(
    state,
    undefined,
    chalk.hex("#9b59b6")("→ Deseja editar a mensagem?"),
  );

  const { wantsToEdit } = await inquirer.prompt([
    {
      type: "confirm",
      name: "wantsToEdit",
      message: "",
      default: false,
    },
  ]);

  if (wantsToEdit) {
    drawInterface(state, chalk.hex("#9b59b6")("✏️ Editando mensagem..."));

    const { editedMessage } = await inquirer.prompt([
      {
        type: "editor",
        name: "editedMessage",
        message: chalk.hex("#9b59b6")("Edite a mensagem de commit:"),
        default: state.messageGenerated,
      },
    ]);
    state.finalMessage = editedMessage.trim();
  }

  state.step = 5;

  // Step 6: Escolher ação
  drawInterface(
    state,
    undefined,
    chalk.hex("#9b59b6")("→ O que deseja fazer com a mensagem?"),
  );

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "",
      choices: [
        {
          name: "🚀 Fazer commit automaticamente",
          value: "commit",
        },
        {
          name: "📋 Copiar mensagem para a área de transferência",
          value: "copy",
        },
      ],
      default: "commit",
    },
  ]);

  state.action = action;

  // Step 7: Executar ação
  if (action === "commit") {
    drawInterface(state, chalk.hex("#9b59b6")("🚀 Realizando commit..."));
    await sleep(500);

    try {
      await execAsync(
        `git commit -m "${state.finalMessage!.replace(/"/g, '\\"')}"`,
      );
    } catch (error) {
      drawInterface(state, chalk.red(`❌ Erro ao fazer commit: ${error}`));
      await sleep(2000);
      process.exit(1);
    }
  } else if (action === "copy") {
    drawInterface(
      state,
      chalk.hex("#9b59b6")("📋 Copiando para área de transferência..."),
    );
    await sleep(500);

    try {
      const { spawn } = await import("child_process");
      let clipProcess: any;

      if (process.platform === "win32") {
        clipProcess = spawn(
          "powershell",
          [
            "-Command",
            `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; $input | Set-Clipboard`,
          ],
          { stdio: ["pipe", "inherit", "inherit"] },
        );
      } else if (process.platform === "darwin") {
        clipProcess = spawn("pbcopy", [], {
          stdio: ["pipe", "inherit", "inherit"],
        });
      } else {
        clipProcess = spawn("xclip", ["-selection", "clipboard"], {
          stdio: ["pipe", "inherit", "inherit"],
        });
      }

      clipProcess.stdin.write(Buffer.from(state.finalMessage!, "utf8"));
      clipProcess.stdin.end();

      await new Promise((resolve, reject) => {
        clipProcess.on("close", (code: number) => {
          if (code === 0) {
            resolve(code);
          } else {
            reject(new Error(`Processo terminou com código ${code}`));
          }
        });
      });
    } catch (error) {
      drawInterface(
        state,
        chalk.yellow(
          "⚠️  Mensagem disponível abaixo (não foi possível copiar automaticamente)",
        ),
      );
      await sleep(3000);
    }
  }

  drawSuccessScreen(state.finalMessage!, action);
}
