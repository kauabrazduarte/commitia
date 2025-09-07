import simpleGit, { SimpleGit } from "simple-git";
import { promises as fs } from "fs";
import path from "path";

const IGNORED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".tiff",
  ".ico",
  ".svg",
  ".webp",
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".webm",
  ".mkv",
  ".mp3",
  ".wav",
  ".flac",
  ".aac",
  ".ogg",
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".zip",
  ".rar",
  ".7z",
  ".tar",
  ".gz",
  ".exe",
  ".dll",
  ".so",
  ".dylib",
  ".bin",
  ".dat",
  ".db",
  ".sqlite",
  ".sqlite3",
];

const POTENTIALLY_BINARY_EXTENSIONS = [".sql", ".dump"];

function shouldIgnoreFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return (
    IGNORED_EXTENSIONS.includes(ext) ||
    POTENTIALLY_BINARY_EXTENSIONS.includes(ext)
  );
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
    if (status.created.includes(file)) {
      const content = await fs.readFile(file, "utf-8");
      result[file] = content;
    } else {
      const diff = await git.diff(["--cached", file]);
      result[file] = diff;
    }
  }

  if (Object.keys(result).length === 0) {
    return null;
  }

  return result;
}
