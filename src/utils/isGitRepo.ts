import { exec } from "node:child_process";

export default function isGitRepo() {
  return new Promise((resolve) => {
    try {
      exec("git rev-parse --is-inside-work-tree", (error, stdout, stderr) => {
        if (error) {
          resolve(false);
        } else {
          resolve(stdout.trim() === "true");
        }
      });
    } catch (error) {
      resolve(false);
    }
  });
}
