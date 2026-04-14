import type {
  EvalData,
  SingleTurnResult,
  MultiTurnEvalData,
  MultiTurnResult,
} from "./types.ts";

import { generateText, stepCountIs, tool, type ModelMessage, type ToolSet } from "ai";
import { openai } from "@ai-sdk/openai";
import z from "zod";
import { buildMessages, buildMockedTools } from "./utils.ts";
import { open } from "node:inspector/promises";
import { SYSTEM_PROMPT } from "../src/agent/system/prompt.ts";

const TOOL_DEFINITIONS: any = {
  readFile: {
    description: "Read the content of a file at the specified path",
    parameters: z.object({
      path: z.string().describe("The path to file you want to read")
    })
  },

  writeFile: {
    description: "Write given content to the file at the given path",
    parameters: z.object({
      path: z.string().describe("The path to file you want to write to"),
      content: z.string().describe("The content you want to write to the file")
    })
  },

  listFiles: {
    description: "List all of the files in a directory",
    parameters: z.object({
      path: z.string().describe("the path the directory in which you want to list the files"),
    })
  },

  deleteFiles: {
    description: "Delete the file at the given path",
    parameters: z.object({
      path: z.string().describe("the path to the file that you want to delete"),
    })
  },

  runCommand: {
    description: "Execute a shell command and return its output",
    parameters: z.object({
      command: z.string().describe("the shell command to execute")
    })
  },
}

export const singleTurnExecutorWithMocks = async (data: EvalData) => {
  const messages = buildMessages(data)

  const tools: ToolSet = {}
  for (const toolName of data.tools) {
    const def = TOOL_DEFINITIONS[toolName]

    if (def) {
      tools[toolName] = tool({
        description: def.description,
        inputSchema: def.parameters
      })
    }
  }

  const { toolCalls } = await generateText({
    model: openai(data.config?.model ?? "gpt-5-mini"),
    messages,
    tools,
    stopWhen: stepCountIs(1),
    temperature: data.config?.temperature ?? undefined,
    providerOptions: {
      openai: {
        reasoningEffort: "high"
      }
    }
  })

  const calls = toolCalls.map(tc => ({
    toolName: tc.toolName,
    args: "args" in tc ? tc.args : {},
  }))

  const toolNames = toolCalls.map(tc => tc.toolName)

  return {
    toolCalls,
    toolNames,
    selectedAny: toolNames.length > 0,
  }
}

export const multiTurnWithMocks = async (data: MultiTurnEvalData) => {
  const tools = buildMockedTools(data.mockTools)

  const messages: ModelMessage[] = data.messages ?? [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: data.prompt! }
  ]

  const result = await generateText({
    model: openai(data.config?.model ?? "gpt-5-mini"),
    messages,
    tools,
    stopWhen: stepCountIs(data.config?.maxSteps ?? 20)
  })

  const allTools: string[] = []
  const steps = result.steps.map(step => {
    const stepToolCalls = (step.toolCalls ?? []).map(tc => {
      allTools.push(tc.toolName)
      return {
        toolName: tc.toolName,
        args: 'args' in tc ? tc.args : {}
      }
    })

    const stepToolResults = (step.staticToolResults ?? []).map(tr => ({
      toolName: tr.toolName,
      result: "results" in tr ? tr.results : tr,
    }))

    return {
      toolCalls: stepToolCalls.length > 0 ? stepToolCalls : undefined,
      toolResults: stepToolResults.length > 0 ? stepToolResults : undefined,
      text: step.text || undefined,
    }
  })

  const toolsUsed = [new Set(allTools)]

  return {
    text: result.text,
    steps,
    toolsUsed,
    ToolCallOrder: allTools
  }
}
