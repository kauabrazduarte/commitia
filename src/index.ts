import { Command } from "commander";
import commitiaLogin from "./commands/commitia-login";

const program = new Command();

program
  .name("commitia")
  .description("Cria uma mensagem de commit com inteligência artificial")
  .version("1.0.0")
  .action(() => {
    // executar o código de commit
  });

program
  .command("login")
  .description("Realiza o login em uma conta da OpenAI/Claude/Google/XAI")
  .action(() => {
    commitiaLogin();
  });

program.parse();
