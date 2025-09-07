"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isGitRepo;
const node_child_process_1 = require("node:child_process");
function isGitRepo() {
    return new Promise((resolve) => {
        try {
            (0, node_child_process_1.exec)("git rev-parse --is-inside-work-tree", (error, stdout, stderr) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(stdout.trim() === "true");
                }
            });
        }
        catch (error) {
            resolve(false);
        }
    });
}
