import chalk from "chalk";
import boxen from "boxen";
import inquirer from "inquirer";
import { exec } from "child_process";
import { promisify } from "util";
import isGitRepo from "../utils/isGitRepo";
import getDiff from "../utils/getDiff";
import CommitMessage from "../utils/CommitMessage";
import gradient from "gradient-string";

const execAsync = promisify(exec);
const commitiaGradient = gradient(["#8e44ad", "#c33764"]);

const logStep = (message: string) => {
  console.log(chalk.hex("#9b59b6")(`▸ ${message}`));
};

const logSuccess = (message: string) => {
  console.log(chalk.green(`  ✓ ${message}`));
};

const logError = (message: string) => {
  console.error(chalk.red(`✗ ${message}`));
};

export default async function commitia(addFiles: boolean) {
  console.log(chalk.bold(commitiaGradient("\n--- COMMITIA ---")));
  console.log(chalk.italic("Gerando commits inteligentes com IA..."));
  console.log();

  try {
    logStep("Verificando repositório Git...");
    if (!(await isGitRepo())) {
      throw new Error("Não existe um repositório git aqui.");
    }
    logSuccess("Repositório Git encontrado.");

    if (addFiles) {
      logStep("Adicionando arquivos ao staging...");
      await execAsync("git add .");
      logSuccess("Arquivos adicionados.");
    }

    logStep("Analisando diferenças no repositório...");
    const diffs = await getDiff();
    if (!diffs) {
      console.log(
        chalk.yellow("⚠️ Nenhuma diferença encontrada para commitar."),
      );
      process.exit(0);
    }
    logSuccess("Diferenças analisadas.");

    logStep("Gerando mensagem de commit com IA...");
    const commitMessage = new CommitMessage();
    const message = await commitMessage.generate(diffs);
    if (!message) {
      throw new Error("IA não conseguiu gerar a mensagem.");
    }
    logSuccess("Mensagem de commit gerada.");

    console.log(
      boxen(chalk.white(message), {
        padding: 1,
        margin: 1,
        borderColor: "#8e44ad",
        borderStyle: "round",
        title: "📝 Mensagem Gerada",
      }),
    );

    const { wantsToEdit } = await inquirer.prompt([
      {
        type: "confirm",
        name: "wantsToEdit",
        message: "Deseja editar a mensagem?",
        default: false,
      },
    ]);

    let finalMessage = message;
    if (wantsToEdit) {
      const { editedMessage } = await inquirer.prompt([
        {
          type: "editor",
          name: "editedMessage",
          message: "Edite a mensagem de commit:",
          default: message,
        },
      ]);
      finalMessage = editedMessage.trim();
    }

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "O que deseja fazer com a mensagem?",
        choices: [
          { name: "🚀 Fazer commit automaticamente", value: "commit" },
          {
            name: "📋 Copiar mensagem para a área de transferência",
            value: "copy",
          },
        ],
        default: "commit",
      },
    ]);

    if (action === "commit") {
      logStep("Realizando commit...");
      await execAsync(`git commit -m "${finalMessage.replace(/"/g, '\"')}"`);
      logSuccess("Commit realizado com sucesso!");
    } else if (action === "copy") {
      logStep("Copiando para área de transferência...");
      const { spawn } = await import("child_process");
      const platform = process.platform;
      const command =
        platform === "win32"
          ? "powershell"
          : platform === "darwin"
            ? "pbcopy"
            : "xclip";
      const args =
        platform === "win32"
          ? [
              "-Command",
              `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; $input | Set-Clipboard`,
            ]
          : platform === "darwin"
            ? []
            : ["-selection", "clipboard"];

      const clipProcess = spawn(command, args, {
        stdio: ["pipe", "inherit", "inherit"],
      });
      clipProcess.stdin.write(Buffer.from(finalMessage, "utf8"));
      clipProcess.stdin.end();

      await new Promise((resolve, reject) => {
        clipProcess.on("close", (code: number) =>
          code === 0
            ? resolve(code)
            : reject(new Error(`Processo terminou com código ${code}`)),
        );
      });
      logSuccess("Mensagem copiada!");
    }

    console.log(chalk.bold.green("\n✨ Processo concluído! ✨"));
  } catch (error: any) {
    logError(error.message);
    process.exit(1);
  }
}
