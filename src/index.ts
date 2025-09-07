import { Command } from "commander";
import commitiaLogin from "./commands/commitia-login";
import commitia from "./commands/commitia";

const program = new Command();

program
  .name("commitia")
  .description("Cria uma mensagem de commit com inteligência artificial")
  .version("1.0.0")
  .option("-A, --add", "Adiciona arquivos automaticamente antes do commit")
  .action((options) => {
    try {
      const addFiles = Boolean(options.add);
      commitia(addFiles);
    } catch {
      /* empty */
    }
  });

program
  .command("login")
  .description(
    "Realiza o login em uma conta da OpenAI/Claude/Google/XAI/NagaIA",
  )
  .action(() => {
    try {
      commitiaLogin();
    } catch {
      /* empty */
    }
  });

program.parse(process.argv);

process.on("SIGINT", () => {
  process.exit(0);
});
