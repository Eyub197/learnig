import { tool } from "ai";
import z from "zod";
import fs from "node:fs/promises";
import nodePath from "node:path";
export const readFile = tool({
    description: "Read the full contents of a file at the given path, always use this to rad a file",
    inputSchema: z.object({
        path: z.string().describe("The path to the file to read")
    }),
    execute: async ({ path }) => {
        try {
            const content = await fs.readFile(path, "utf-8");
            return content;
        }
        catch (e) {
            return `There was an error reading the file, here is the native error from node.js ${e}`;
        }
    }
});
export const writeFile = tool({
    description: "Write content to a file at a specficied given path. Creates the file if it does not exist and it will overwrite it if it does",
    inputSchema: z.object({
        path: z.string().describe("The path to the file to write to"),
        content: z.string().describe("The content to write the file")
    }),
    execute: async ({ path, content }) => {
        try {
            const dir = nodePath.dirname(path);
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(path, content, "utf-8");
            return `Succesfully wrote ${content.length} characters to ${path}.`;
        }
        catch (e) {
            return `Was not able to write to that file at that path, here is the node.js error: ${e}`;
        }
    }
});
export const listFiles = tool({
    description: "List all the files and directories in the specified directory path.",
    inputSchema: z.object({
        directory: z.string().describe("The directory path to list the contents of.").default(".")
    }),
    execute: async ({ directory }) => {
        try {
            const entries = await fs.readdir(directory, { withFileTypes: true });
            const items = entries.map(entry => {
                const type = entry.isDirectory() ? "[dir]" : "[file]";
                return `${type} ${entry.name}`;
            });
            return items.length > 0 ? items.join("\n") : `Directory ${directory} is empty`;
        }
        catch (e) {
            return `Could not list the contents in this directory, here is the node.js error ${e}`;
        }
    }
});
export const deleteFile = tool({
    description: "Delete a file at a given path. Use with caution as this is very destructive and cannot be recovered",
    inputSchema: z.object({
        path: z.string().describe("The path to the file you want to delete"),
    }),
    execute: async ({ path }) => {
        try {
            await fs.unlink(path);
            return `Successfully deleted the file at ${path}`;
        }
        catch (e) {
            return `Could not delete the file, ere is the node.js error: ${e}`;
        }
    }
});
