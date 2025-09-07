"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const commitia_login_1 = __importDefault(require("./commands/commitia-login"));
const commitia_1 = __importDefault(require("./commands/commitia"));
const program = new commander_1.Command();
program
    .name("commitia")
    .description("Cria uma mensagem de commit com inteligência artificial")
    .version("1.0.0")
    .option("-A, --add", "Adiciona arquivos automaticamente antes do commit")
    .action((options) => {
    try {
        const addFiles = Boolean(options.add);
        (0, commitia_1.default)(addFiles);
    }
    catch {
        /* empty */
    }
});
program
    .command("login")
    .description("Realiza o login em uma conta da OpenAI/Claude/Google/XAI/NagaIA")
    .action(() => {
    try {
        (0, commitia_login_1.default)();
    }
    catch {
        /* empty */
    }
});
program.parse(process.argv);
process.on("SIGINT", () => {
    process.exit(0);
});
