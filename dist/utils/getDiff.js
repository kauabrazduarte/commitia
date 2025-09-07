"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDiff;
const simple_git_1 = __importDefault(require("simple-git"));
const fs_1 = require("fs");
async function getDiff() {
    const git = (0, simple_git_1.default)();
    const status = await git.status();
    const stagedFiles = status.staged;
    const result = {};
    for (const file of stagedFiles) {
        if (status.created.includes(file)) {
            const content = await fs_1.promises.readFile(file, "utf-8");
            result[file] = content;
        }
        else {
            const diff = await git.diff(["--cached", file]);
            result[file] = diff;
        }
    }
    if (Object.keys(result).length === 0) {
        return null;
    }
    return result;
}
