import simpleGit, { SimpleGit } from "simple-git";
import { promises, existsSync } from "fs";
import path from "path";
import IGNORED_EXTENSIONS from "../constants/ignored_extensions";

function shouldIgnoreFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return IGNORED_EXTENSIONS.includes(ext);
}

export default async function getDiff(): Promise<Record<
  string,
  string
> | null> {
  const git: SimpleGit = simpleGit();
  const status = await git.status();

  const stagedFiles = status.staged.filter((file) => !shouldIgnoreFile(file));
  const result: Record<string, string> = {};

  for (const file of stagedFiles) {
    if (existsSync(file)) {
      if (status.created.includes(file)) {
        const content = await promises.readFile(file, "utf-8");

        if (content.length <= 128000 * 0.65) result[file] = content;
      } else {
        const diff = await git.diff(["--cached", file]);
        if (diff.length <= 128000 * 0.65) result[file] = diff;
      }
    }
  }

  if (Object.keys(result).length === 0) {
    return null;
  }

  return result;
}
