import "dotenv/config";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { tools } from "./tools/index.js";
import { executeTool } from "./executeTools.js";
import { SYSTEM_PROMPT } from "../agent/system/prompt.js";
import { getTracer, Laminar } from "@lmnr-ai/lmnr";
import { filterCompatibleMessages } from "./system/filterMessages.js";
import { estimateMessagesTokens, getModelLimits, isOverThreshold, calculateUsagePercentage, DEFAULT_THRESHOLD, compactConversation } from "./context/index.js";
const MODEL_NAME = "gpt-5-mini";
if (process.env.LMNR_PROJECT_API_KEY) {
    Laminar.initialize({
        projectApiKey: process.env.LMNR_PROJECT_API_KEY
    });
}
export const runAgent = async (userMessage, conversetionHistpry, callbacks) => {
    const modelLimits = getModelLimits(MODEL_NAME);
    const workingHistory = filterCompatibleMessages(conversetionHistpry);
    let messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...workingHistory,
        { role: "user", content: userMessage },
    ];
    const precheckTokens = estimateMessagesTokens(messages);
    if (isOverThreshold(precheckTokens.total, modelLimits.contextWindow)) {
        messages = await compactConversation(workingHistory, MODEL_NAME);
    }
    let fullResponse = "";
    while (true) {
        const result = streamText({
            model: openai(MODEL_NAME),
            messages,
            tools,
            experimental_telemetry: {
                isEnabled: true,
                tracer: getTracer()
            }
        });
        const reportTokenUsage = () => {
            if (callbacks.onTokenUsage) {
                const usage = estimateMessagesTokens(messages);
                callbacks.onTokenUsage({
                    inputTokens: usage.input,
                    outputTokens: usage.output,
                    totalTokens: usage.total,
                    contextWindow: modelLimits.contextWindow,
                    threshold: DEFAULT_THRESHOLD,
                    percentage: calculateUsagePercentage(usage.total, modelLimits.contextWindow),
                });
            }
        };
        const toolCalls = [];
        let currentText = "";
        let streamError = null;
        try {
            for await (const chunk of result.fullStream) {
                if (chunk.type === "text-delta") {
                    currentText += chunk.text;
                    callbacks.onToken(chunk.text);
                }
                if (chunk.type === "tool-call") {
                    const input = "input" in chunk ? chunk.input : {};
                    toolCalls.push({
                        toolCallId: chunk.toolCallId,
                        toolName: chunk.toolName,
                        args: input,
                    });
                    callbacks.onToolCallStart(chunk.toolName, input);
                }
            }
        }
        catch (e) {
            streamError = e;
            if (!currentText && !streamError.message.includes("No output generated")) {
                throw streamError;
            }
        }
        fullResponse += currentText;
        if (streamError && !currentText) {
            fullResponse = "Sorry about that.";
            callbacks.onToken(fullResponse);
            break;
        }
        const finishReason = await result.finishReason;
        if (finishReason !== "tool-calls" || toolCalls.length === 0) {
            const responseMessages = await result.response;
            messages.push(...responseMessages.messages);
            reportTokenUsage();
            break;
        }
        const responseMessages = await result.response;
        messages.push(...responseMessages.messages);
        let rejected = false;
        for (const tc of toolCalls) {
            const approved = await callbacks.onToolApproval(tc.toolName, tc.args);
            if (!approved) {
                rejected = true;
                break;
            }
            const result = await executeTool(tc.toolName, tc.args);
            callbacks.onToolCallEnd(tc.toolName, result);
            messages.push({
                role: "tool",
                content: [{ type: "tool-result", toolCallId: tc.toolCallId, toolName: tc.toolName, output: { type: "text", value: JSON.stringify(result) } }]
            });
            reportTokenUsage();
        }
        if (rejected) {
            break;
        }
    }
    callbacks.onComplete(fullResponse);
    return messages;
};
