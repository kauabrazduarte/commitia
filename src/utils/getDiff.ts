import simpleGit, { SimpleGit } from "simple-git";
import { promises as fs } from "fs";

export default async function getDiff() {
  const git: SimpleGit = simpleGit();
  const status = await git.status();

  const stagedFiles = status.staged;
  const result: Record<string, string> = {};

  for (const file of stagedFiles) {
    if (status.created.includes(file)) {
      const content = await fs.readFile(file, "utf-8");
      result[file] = content;
    } else {
      const diff = await git.diff(["--cached", file]);
      result[file] = diff;
    }
  }

  return result;
}
