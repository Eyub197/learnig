export declare const tools: {
    readFile: import("ai").Tool<{
        path: string;
    }, string>;
    writeFile: import("ai").Tool<{
        path: string;
        content: string;
    }, string>;
    listFiles: import("ai").Tool<{
        directory: string;
    }, string>;
    deleteFile: import("ai").Tool<{
        path: string;
    }, string>;
    webSearch: import("ai").Tool<{}, {
        action: {
            type: "search";
            query?: string;
        } | {
            type: "openPage";
            url: string;
        } | {
            type: "find";
            url: string;
            pattern: string;
        };
        sources?: Array<{
            type: "url";
            url: string;
        } | {
            type: "api";
            name: string;
        }>;
    }>;
    runCommand: import("ai").Tool<{
        command: string;
    }, string>;
};
export { readFile, writeFile, listFiles, deleteFile } from "./file.ts";
export { webSearch } from "./webSearch.ts";
export { runCommand } from "./shell.ts";
export declare const fileTools: {
    readFile: import("ai").Tool<{
        path: string;
    }, string>;
    writeFile: import("ai").Tool<{
        path: string;
        content: string;
    }, string>;
    listFiles: import("ai").Tool<{
        directory: string;
    }, string>;
    deleteFile: import("ai").Tool<{
        path: string;
    }, string>;
};
export declare const terminalTools: {
    runCommand: import("ai").Tool<{
        command: string;
    }, string>;
};
