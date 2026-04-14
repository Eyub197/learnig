import { evaluate } from "@lmnr-ai/lmnr";
import { llmJudge } from "./evaluators"

import type {
  MultiTurnResult,
  MultiTurnTarget,
  MultiTurnDatasetEntry,
  MultiTurnEvalData
} from "./types"

import dataset from "./data/agent-multiturn.json" with {type: "json"}
import { multiTurnWithMocks } from "./executors";

const executor = async (data: MultiTurnEvalData) => {
  return multiTurnWithMocks(data)
}

evaluate({
  data: dataset as any,
  executor,
  evaluators: {
    outputQuality: async (output: any, target: any) => {
      if (!target) return 1
      return llmJudge(output, target)
    }
  },
  config: {
    projectApiKey: process.env.LMR_PROJECT_API_KEY
  },
  groupName: "agent-muliturn"
})
