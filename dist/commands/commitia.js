"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = commitia;
const chalk_1 = __importDefault(require("chalk"));
const boxen_1 = __importDefault(require("boxen"));
const inquirer_1 = __importDefault(require("inquirer"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const isGitRepo_1 = __importDefault(require("../utils/isGitRepo"));
const getDiff_1 = __importDefault(require("../utils/getDiff"));
const CommitMessage_1 = __importDefault(require("../utils/CommitMessage"));
const figlet_1 = __importDefault(require("figlet"));
const gradient_string_1 = __importDefault(require("gradient-string"));
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const commitiaGradient = (0, gradient_string_1.default)(["#9b59b6", "#8e44ad", "#7d3c98"]);
function drawInterface(state, currentStatus, currentPrompt) {
    console.clear();
    console.log((0, boxen_1.default)(commitiaGradient(figlet_1.default.textSync("COMMITIA", {
        font: "ANSI Shadow",
        horizontalLayout: "fitted",
    })), {
        padding: { top: 1, bottom: 1, left: 4, right: 4 },
        margin: { top: 1, bottom: 0 },
        borderStyle: "bold",
        borderColor: "#8e44ad",
        backgroundColor: "#1a0d1f",
        dimBorder: false,
    }));
    console.log(chalk_1.default
        .hex("#9b59b6")
        .italic("  🚀 Gerando commits inteligentes com IA  🚀\n"));
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
        .map((s) => chalk_1.default.hex(s.color)(`${s.icon} ${s.label}`))
        .join(chalk_1.default.hex("#404040")("  ─  "));
    console.log((0, boxen_1.default)(statusBar, {
        padding: { top: 1, bottom: 1, left: 3, right: 3 },
        margin: { top: 0, bottom: 1 },
        borderStyle: "round",
        borderColor: "#8e44ad",
        backgroundColor: "#0f0a11",
        title: chalk_1.default.hex("#e67e22")(" PROGRESSO "),
        titleAlignment: "center",
    }));
    if (currentStatus) {
        console.log((0, boxen_1.default)(currentStatus, {
            padding: { top: 0, bottom: 0, left: 2, right: 2 },
            borderStyle: "single",
            borderColor: "#9b59b6",
            backgroundColor: "#1a0d1f",
        }));
        console.log();
    }
    if (state.messageGenerated) {
        const messageBox = chalk_1.default.hex("#e67e22")("📝 Mensagem de commit gerada:\n\n") +
            chalk_1.default.white(state.messageGenerated);
        console.log((0, boxen_1.default)(messageBox, {
            padding: { top: 1, bottom: 1, left: 2, right: 2 },
            borderStyle: "round",
            borderColor: "#8e44ad",
            backgroundColor: "#0f0a11",
        }));
        console.log();
    }
    if (currentPrompt) {
        console.log((0, boxen_1.default)(currentPrompt, {
            padding: { top: 0, bottom: 0, left: 2, right: 2 },
            borderStyle: "round",
            borderColor: "#9b59b6",
            backgroundColor: "#0f0a11",
        }));
        console.log();
    }
}
function drawSuccessScreen(message, action) {
    console.clear();
    const successGradient = (0, gradient_string_1.default)(["#27ae60", "#2ecc71"]);
    console.log((0, boxen_1.default)(successGradient(figlet_1.default.textSync("SUCCESS!", {
        font: "Standard",
        horizontalLayout: "fitted",
    })), {
        padding: { top: 1, bottom: 1, left: 4, right: 4 },
        borderStyle: "bold",
        borderColor: "#27ae60",
        backgroundColor: "#0a1a0f",
    }));
    const actionEmoji = action === "commit" ? "🚀" : "📋";
    const actionText = action === "commit"
        ? "Commit realizado com sucesso!"
        : "Mensagem copiada para área de transferência!";
    const summaryContent = chalk_1.default.hex("#27ae60")(`${actionEmoji} ${actionText}\n\n`) +
        chalk_1.default.hex("#8e44ad")("╔════════════════════════════════════════════════════════════╗\n") +
        chalk_1.default.hex("#8e44ad")("║") +
        chalk_1.default.bold.white("                    📊 RESUMO                            ") +
        chalk_1.default.hex("#8e44ad")("║\n") +
        chalk_1.default.hex("#8e44ad")("╠════════════════════════════════════════════════════════════╣\n") +
        chalk_1.default.hex("#8e44ad")("║                                                            ║\n") +
        chalk_1.default.hex("#8e44ad")("║") +
        chalk_1.default.hex("#B0B0B0")("  Ação:      ") +
        chalk_1.default.bold.hex("#9b59b6")(actionText.slice(0, 44).padEnd(44)) +
        chalk_1.default.hex("#8e44ad")("║\n") +
        chalk_1.default.hex("#8e44ad")("║") +
        chalk_1.default.hex("#B0B0B0")("  Mensagem:  ") +
        chalk_1.default.hex("#ffffff")(message.slice(0, 44).padEnd(44)) +
        chalk_1.default.hex("#8e44ad")("║\n") +
        chalk_1.default.hex("#8e44ad")("║                                                            ║\n") +
        chalk_1.default.hex("#8e44ad")("╠════════════════════════════════════════════════════════════╣\n") +
        chalk_1.default.hex("#8e44ad")("║") +
        chalk_1.default.bold.hex("#e67e22")("                 🎉 PRÓXIMAS AÇÕES 🎉                    ") +
        chalk_1.default.hex("#8e44ad")("║\n") +
        chalk_1.default.hex("#8e44ad")("╠════════════════════════════════════════════════════════════╣\n") +
        chalk_1.default.hex("#8e44ad")("║                                                            ║\n") +
        chalk_1.default.hex("#8e44ad")("║  ") +
        chalk_1.default.bold.hex("#9b59b6")("commitia") +
        chalk_1.default.hex("#B0B0B0")(" ─ Gerar novo commit                          ") +
        chalk_1.default.hex("#8e44ad")("║\n") +
        chalk_1.default.hex("#8e44ad")("║  ") +
        chalk_1.default.bold.hex("#9b59b6")("commitia -a") +
        chalk_1.default.hex("#B0B0B0")(" ─ Adicionar arquivos e fazer commit  ") +
        chalk_1.default.hex("#8e44ad")("║\n") +
        chalk_1.default.hex("#8e44ad")("║  ") +
        chalk_1.default.bold.hex("#9b59b6")("git push") +
        chalk_1.default.hex("#B0B0B0")(" ─ Enviar para repositório remoto          ") +
        chalk_1.default.hex("#8e44ad")("║\n") +
        chalk_1.default.hex("#8e44ad")("║                                                            ║\n") +
        chalk_1.default.hex("#8e44ad")("╚════════════════════════════════════════════════════════════╝");
    console.log((0, boxen_1.default)(summaryContent, {
        padding: { top: 0, bottom: 0, left: 2, right: 2 },
        margin: { top: 1, bottom: 1 },
        borderStyle: "none",
        backgroundColor: "#0a0f0a",
    }));
    console.log("\n" + chalk_1.default.hex("#666666").italic("  Feito com ❤️  por kaua.dev.br\n"));
}
async function commitia(addFiles) {
    const state = {
        step: 0,
        repoChecked: false,
        filesAdded: false,
        diffsObtained: false,
        messageGenerated: null,
        finalMessage: null,
        action: null,
    };
    // Step 1: Verificação de repositório
    drawInterface(state, chalk_1.default.hex("#9b59b6")("🔍 Verificando repositório Git..."));
    await sleep(800);
    if (!(await (0, isGitRepo_1.default)())) {
        drawInterface(state, chalk_1.default.red("❌ Não existe um repositório git aqui."));
        await sleep(2000);
        process.exit(1);
    }
    state.repoChecked = true;
    state.step = 1;
    // Step 2: Adicionar arquivos (se necessário)
    if (addFiles) {
        drawInterface(state, chalk_1.default.hex("#9b59b6")("📁 Adicionando arquivos ao staging..."));
        await sleep(500);
        try {
            await execAsync("git add .");
            state.filesAdded = true;
        }
        catch (error) {
            drawInterface(state, chalk_1.default.red(`❌ Erro ao adicionar arquivos: ${error}`));
            await sleep(2000);
            process.exit(1);
        }
    }
    else {
        state.filesAdded = true;
    }
    state.step = 2;
    // Step 3: Pegar diferenças
    drawInterface(state, chalk_1.default.hex("#9b59b6")("📊 Analisando diferenças no repositório..."));
    await sleep(500);
    let diffs = {};
    try {
        diffs = await (0, getDiff_1.default)();
        state.diffsObtained = true;
    }
    catch (error) {
        drawInterface(state, chalk_1.default.red(`❌ Erro ao pegar diferenças: ${error}`));
        await sleep(2000);
        process.exit(1);
    }
    state.step = 3;
    // Step 4: Gerar mensagem
    drawInterface(state, chalk_1.default.hex("#9b59b6")("🤖 Gerando mensagem de commit com IA..."));
    const commitMessage = new CommitMessage_1.default();
    try {
        const message = await commitMessage.generate(diffs);
        if (message === null) {
            throw new Error("Mensagem vazia");
        }
        state.messageGenerated = message;
        state.finalMessage = message;
    }
    catch (error) {
        drawInterface(state, chalk_1.default.red(`❌ Erro ao gerar mensagem de commit: ${error}`));
        await sleep(2000);
        process.exit(1);
    }
    state.step = 4;
    // Step 5: Review da mensagem
    drawInterface(state, undefined, chalk_1.default.hex("#9b59b6")("→ Deseja editar a mensagem?"));
    const { wantsToEdit } = await inquirer_1.default.prompt([
        {
            type: "confirm",
            name: "wantsToEdit",
            message: "",
            default: false,
        },
    ]);
    if (wantsToEdit) {
        drawInterface(state, chalk_1.default.hex("#9b59b6")("✏️ Editando mensagem..."));
        const { editedMessage } = await inquirer_1.default.prompt([
            {
                type: "editor",
                name: "editedMessage",
                message: chalk_1.default.hex("#9b59b6")("Edite a mensagem de commit:"),
                default: state.messageGenerated,
            },
        ]);
        state.finalMessage = editedMessage.trim();
    }
    state.step = 5;
    // Step 6: Escolher ação
    drawInterface(state, undefined, chalk_1.default.hex("#9b59b6")("→ O que deseja fazer com a mensagem?"));
    const { action } = await inquirer_1.default.prompt([
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
        drawInterface(state, chalk_1.default.hex("#9b59b6")("🚀 Realizando commit..."));
        await sleep(500);
        try {
            await execAsync(`git commit -m "${state.finalMessage.replace(/"/g, '\\"')}"`);
        }
        catch (error) {
            drawInterface(state, chalk_1.default.red(`❌ Erro ao fazer commit: ${error}`));
            await sleep(2000);
            process.exit(1);
        }
    }
    else if (action === "copy") {
        drawInterface(state, chalk_1.default.hex("#9b59b6")("📋 Copiando para área de transferência..."));
        await sleep(500);
        try {
            const { spawn } = await Promise.resolve().then(() => __importStar(require("child_process")));
            let clipProcess;
            if (process.platform === "win32") {
                clipProcess = spawn("powershell", [
                    "-Command",
                    `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; $input | Set-Clipboard`,
                ], { stdio: ["pipe", "inherit", "inherit"] });
            }
            else if (process.platform === "darwin") {
                clipProcess = spawn("pbcopy", [], {
                    stdio: ["pipe", "inherit", "inherit"],
                });
            }
            else {
                clipProcess = spawn("xclip", ["-selection", "clipboard"], {
                    stdio: ["pipe", "inherit", "inherit"],
                });
            }
            clipProcess.stdin.write(Buffer.from(state.finalMessage, "utf8"));
            clipProcess.stdin.end();
            await new Promise((resolve, reject) => {
                clipProcess.on("close", (code) => {
                    if (code === 0) {
                        resolve(code);
                    }
                    else {
                        reject(new Error(`Processo terminou com código ${code}`));
                    }
                });
            });
        }
        catch (error) {
            drawInterface(state, chalk_1.default.yellow("⚠️  Mensagem disponível abaixo (não foi possível copiar automaticamente)"));
            await sleep(3000);
        }
    }
    drawSuccessScreen(state.finalMessage, action);
}
