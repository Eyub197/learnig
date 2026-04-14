import { readFile, writeFile, listFiles, deleteFile } from "./file.js";
import { webSearch } from "./webSearch.js";
import { runCommand } from "./shell.js";
// All tools combined for the agent
export const tools = {
    readFile,
    writeFile,
    listFiles,
    deleteFile,
    webSearch,
    runCommand,
};
export { readFile, writeFile, listFiles, deleteFile } from "./file.js";
export { webSearch } from "./webSearch.js";
export { runCommand } from "./shell.js";
export const fileTools = {
    readFile,
    writeFile,
    listFiles,
    deleteFile,
};
export const terminalTools = {
    runCommand
};
