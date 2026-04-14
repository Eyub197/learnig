import type { ToolFn } from "../../types"
import { z } from "zod"
import { queryMovies } from "../rag/query"

export const movieSearchToolDefinition = {
  name: "movieSearch",
  parameters: z.object({
    query: z.string().describe("query used to vector search on movies")
  }),
  description: "use this tool to find movies or anwser questions about movies and their metada like score, rating, costs, actors, and more."

}

type Args = z.infer<typeof movieSearchToolDefinition.parameters>

export const movieSearch: ToolFn<Args> = async ({ toolArgs }) => {
  let results;
  try {
    results = await queryMovies({ query: toolArgs.query })
  } catch (e) {
    console.error(e)
    return "Error: Could not query the db to get movies."
  }

  const formattedResult = results.map(result => {
    const { metadata, data } = result
    return { ...metadata, description: data }
  })

  return JSON.stringify(formattedResult, null, 2)
}
