import { tools } from "./tools/index.ts";
export type ToolName = keyof typeof tools;
export declare const executeTool: (name: string, args: any) => Promise<string>;
