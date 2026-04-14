import "dotenv/config";
import { type ModelMessage } from "ai";
import type { AgentCallbacks } from "../types.ts";
export declare const runAgent: (userMessage: string, conversetionHistpry: ModelMessage[], callbacks: AgentCallbacks) => Promise<ModelMessage[]>;
