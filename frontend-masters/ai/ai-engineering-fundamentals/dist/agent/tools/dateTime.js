import { tool } from "ai";
import z from "zod";
export const dateTime = tool({
    description: "Return the current time and date. Use this tool before any time related task",
    inputSchema: z.object({}),
    execute: () => {
        return new Date().toISOString();
    }
});
