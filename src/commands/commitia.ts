import ora from "ora";
import chalk from "chalk";
import boxen from "boxen";
import isGitRepo from "../utils/isGitRepo";
import getDiff from "../utils/getDiff";

export default async function commitia() {
  console.clear();
  const title = chalk.hex("#9b59b6").bold("🚀 Commitia CLI");
  console.log(
    boxen(title, { padding: 1, borderColor: "#8e44ad", borderStyle: "round" }),
  );

  // Verificação de repositório
  const spinnerRepoCheck = ora({
    text: chalk.hex("#8e44ad")("Verificando repositório..."),
    color: "magenta",
  }).start();

  if (!(await isGitRepo())) {
    spinnerRepoCheck.fail(chalk.red("Não existe um repositório git aqui."));
    process.exit(1);
  }

  spinnerRepoCheck.succeed(chalk.green(` Repositório verificado com sucesso!`));

  // Pegar diferenças no código.
  const spinnerGetDiff = ora({
    text: chalk.hex("#8e44ad")("Pegando diferenças no repositório..."),
    color: "magenta",
  }).start();
  let diffs: Record<string, string> = {};

  try {
    diffs = await getDiff();
    console.debug(diffs);
    spinnerGetDiff.succeed(chalk.green(` Diferenças encontradas com sucesso!`));
  } catch (error) {
    spinnerGetDiff.fail(chalk.red(`Erro ao pegar diferenças: ${error}`));
    process.exit(1);
  }

  // Gerar a mensagem de commit

  console.log(
    boxen(chalk.hex("#9b59b6").bold("🎉 Todas as etapas concluídas!"), {
      padding: 1,
      borderColor: "#8e44ad",
      borderStyle: "round",
    }),
  );
}

commitia();
