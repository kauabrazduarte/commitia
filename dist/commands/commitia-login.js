"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = commitiaLogin;
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const boxen_1 = __importDefault(require("boxen"));
const chalk_animation_1 = __importDefault(require("chalk-animation"));
const gradient_string_1 = __importDefault(require("gradient-string"));
const config_1 = __importDefault(require("../config/config"));
const models_1 = __importDefault(require("../config/models"));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const claudeGradient = (0, gradient_string_1.default)(["#FF6B6B", "#4ECDC4", "#45B7D1"]);
const greenGradient = (0, gradient_string_1.default)(["#11998e", "#38ef7d"]);
function drawInterface(state, currentPrompt) {
    console.clear();
    console.log((0, boxen_1.default)(claudeGradient(figlet_1.default.textSync("COMMITIA", {
        font: "ANSI Shadow",
        horizontalLayout: "fitted",
    })), {
        padding: { top: 1, bottom: 1, left: 4, right: 4 },
        margin: { top: 1, bottom: 0 },
        borderStyle: "bold",
        borderColor: "#667eea",
        backgroundColor: "#1a1a2e",
        dimBorder: false,
    }));
    console.log(chalk_1.default
        .hex("#666666")
        .italic("  ✨ Inteligência Artificial para seus commits ✨\n"));
    const steps = [
        { icon: "◯", label: "Provedor", completed: state.step > 0 },
        { icon: "◯", label: "API Key", completed: state.step > 1 },
        { icon: "◯", label: "Modelo", completed: state.step > 2 },
        { icon: "◯", label: "Finalizar", completed: state.step > 3 },
    ];
    steps.forEach((step, index) => {
        if (step.completed) {
            step.icon = "✓";
        }
        else if (index === state.step) {
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
        return chalk_1.default.hex(color)(`${s.icon} ${s.label}`);
    })
        .join(chalk_1.default.hex("#404040")("  ─  "));
    console.log((0, boxen_1.default)(statusBar, {
        padding: { top: 1, bottom: 1, left: 3, right: 3 },
        margin: { top: 0, bottom: 1 },
        borderStyle: "round",
        borderColor: "#4ECDC4",
        backgroundColor: "#0f0f1e",
        title: chalk_1.default.hex("#FFD93D")(" PROGRESSO "),
        titleAlignment: "center",
    }));
    if (state.provider || state.apiKey || state.model) {
        let configInfo = "";
        if (state.provider) {
            configInfo +=
                chalk_1.default.hex("#B0B0B0")("Provedor: ") +
                    chalk_1.default.hex("#45B7D1")(state.provider) +
                    "   ";
        }
        if (state.apiKey) {
            const maskedKey = state.apiKey.slice(0, 4) + "•".repeat(8) + state.apiKey.slice(-4);
            configInfo +=
                chalk_1.default.hex("#B0B0B0")("API Key: ") +
                    chalk_1.default.hex("#45B7D1")(maskedKey) +
                    "   ";
        }
        if (state.model) {
            configInfo +=
                chalk_1.default.hex("#B0B0B0")("Modelo: ") + chalk_1.default.hex("#45B7D1")(state.model);
        }
        console.log((0, boxen_1.default)(configInfo, {
            padding: { top: 0, bottom: 0, left: 2, right: 2 },
            borderStyle: "single",
            borderColor: "#404040",
            backgroundColor: "#0a0a0a",
        }));
        console.log();
    }
    if (currentPrompt) {
        console.log((0, boxen_1.default)(currentPrompt, {
            padding: { top: 0, bottom: 0, left: 2, right: 2 },
            borderStyle: "round",
            borderColor: "#45B7D1",
            backgroundColor: "#0f0f1e",
        }));
        console.log();
    }
}
function drawSuccessScreen(config) {
    console.clear();
    console.log((0, boxen_1.default)(greenGradient(figlet_1.default.textSync("SUCCESS!", {
        font: "Standard",
        horizontalLayout: "fitted",
    })), {
        padding: { top: 1, bottom: 1, left: 4, right: 4 },
        borderStyle: "bold",
        borderColor: "#38ef7d",
        backgroundColor: "#0f1e0f",
    }));
    const summaryContent = chalk_1.default.hex("#38ef7d")("✅ Configuração salva com sucesso!\n\n") +
        chalk_1.default.hex("#667eea")("╔══════════════════════════════════════════════════╗\n") +
        chalk_1.default.hex("#667eea")("║") +
        chalk_1.default.bold.white("         📊 RESUMO DA CONFIGURAÇÃO              ") +
        chalk_1.default.hex("#667eea")("║\n") +
        chalk_1.default.hex("#667eea")("╠══════════════════════════════════════════════════╣\n") +
        chalk_1.default.hex("#667eea")("║                                                  ║\n") +
        chalk_1.default.hex("#667eea")("║") +
        chalk_1.default.hex("#B0B0B0")("  Provedor:  ") +
        chalk_1.default.bold.hex("#45B7D1")(config.provider.padEnd(36)) +
        chalk_1.default.hex("#667eea")("║\n") +
        chalk_1.default.hex("#667eea")("║") +
        chalk_1.default.hex("#B0B0B0")("  Modelo:    ") +
        chalk_1.default.bold.hex("#45B7D1")(config.model.padEnd(36)) +
        chalk_1.default.hex("#667eea")("║\n") +
        chalk_1.default.hex("#667eea")("║") +
        chalk_1.default.hex("#B0B0B0")("  API Key:   ") +
        chalk_1.default.bold.hex("#45B7D1")((config.apiKey.slice(0, 4) +
            "•".repeat(20) +
            config.apiKey.slice(-4)).padEnd(36)) +
        chalk_1.default.hex("#667eea")("║\n") +
        chalk_1.default.hex("#667eea")("║") +
        chalk_1.default.hex("#B0B0B0")("  Local:     ") +
        chalk_1.default.hex("#808080")("~/.commitia/config.json".padEnd(36)) +
        chalk_1.default.hex("#667eea")("║\n") +
        chalk_1.default.hex("#667eea")("║                                                  ║\n") +
        chalk_1.default.hex("#667eea")("╠══════════════════════════════════════════════════╣\n") +
        chalk_1.default.hex("#667eea")("║") +
        chalk_1.default.bold.hex("#FFD93D")("         🎉 PRÓXIMOS PASSOS 🎉                  ") +
        chalk_1.default.hex("#667eea")("║\n") +
        chalk_1.default.hex("#667eea")("╠══════════════════════════════════════════════════╣\n") +
        chalk_1.default.hex("#667eea")("║                                                  ║\n") +
        chalk_1.default.hex("#667eea")("║  ") +
        chalk_1.default.hex("#E0E0E0")("Use os comandos abaixo para começar:           ") +
        chalk_1.default.hex("#667eea")("║\n") +
        chalk_1.default.hex("#667eea")("║                                                  ║\n") +
        chalk_1.default.hex("#667eea")("║  ") +
        chalk_1.default.bold.hex("#45B7D1")("commitia") +
        chalk_1.default.hex("#B0B0B0")(" ─ Gerar commit com IA              ") +
        chalk_1.default.hex("#667eea")("║\n") +
        chalk_1.default.hex("#667eea")("║  ") +
        chalk_1.default.bold.hex("#45B7D1")("commitia --help") +
        chalk_1.default.hex("#B0B0B0")(" ─ Ver todos os comandos    ") +
        chalk_1.default.hex("#667eea")("║\n") +
        chalk_1.default.hex("#667eea")("║  ") +
        chalk_1.default.bold.hex("#45B7D1")("commitia config") +
        chalk_1.default.hex("#B0B0B0")(" ─ Reconfigurar            ") +
        chalk_1.default.hex("#667eea")("║\n") +
        chalk_1.default.hex("#667eea")("║                                                  ║\n") +
        chalk_1.default.hex("#667eea")("╚══════════════════════════════════════════════════╝");
    console.log((0, boxen_1.default)(summaryContent, {
        padding: { top: 0, bottom: 0, left: 2, right: 2 },
        margin: { top: 1, bottom: 1 },
        borderStyle: "none",
        backgroundColor: "#0a0f0a",
    }));
    console.log("\n" + chalk_1.default.hex("#666666").italic("  Feito com ❤️  por kaua.dev.br\n"));
}
async function commitiaLogin() {
    const state = { step: 0 };
    drawInterface(state);
    const subtitleAnimation = chalk_animation_1.default.neon("Configurando seu ambiente de IA...");
    subtitleAnimation.start();
    await sleep(2000);
    subtitleAnimation.stop();
    drawInterface(state, chalk_1.default.hex("#45B7D1")("→ Selecione seu provedor de IA:"));
    const { provider } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "provider",
            message: "",
            choices: [
                { name: chalk_1.default.hex("#00D4FF")("   ⚡ XAI (Grok)"), value: "XAI" },
                { name: chalk_1.default.hex("#74AA9C")("   🤖 OpenAI (GPT)"), value: "OpenAI" },
                {
                    name: chalk_1.default.hex("#D4A373")("   🎨 Claude (Anthropic)"),
                    value: "Claude",
                },
                {
                    name: chalk_1.default.hex("#4285F4")("   🔮 Google (Gemini)"),
                    value: "Google",
                },
                { name: chalk_1.default.hex("#FF6B6B")("   🐉 NagaIA"), value: "NagaIA" },
            ],
        },
    ]);
    state.provider = provider;
    state.step = 1;
    drawInterface(state, chalk_1.default.hex("#45B7D1")(`→ Cole sua API Key do ${provider}:`));
    const { apiKey } = await inquirer_1.default.prompt([
        {
            type: "password",
            name: "apiKey",
            message: "",
            mask: chalk_1.default.hex("#667eea")("●"),
        },
    ]);
    state.apiKey = apiKey;
    state.step = 2;
    drawInterface(state, chalk_1.default.hex("#45B7D1")(`→ Selecione o modelo ${provider}:`));
    const { model } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "model",
            message: "",
            choices: models_1.default[provider],
        },
    ]);
    state.model = model;
    state.step = 3;
    drawInterface(state, chalk_1.default.hex("#45B7D1")("💾 Salvando configuração..."));
    await sleep(1500);
    const config = { provider, model, apiKey };
    config_1.default.define(config);
    state.step = 4;
    drawSuccessScreen(config);
}
