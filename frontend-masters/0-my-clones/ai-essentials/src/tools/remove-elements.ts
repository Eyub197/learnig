import { z } from "zod"
import { tool } from "ai"

export const removeElements = tool({
  description: `Remove elements form the canvas by id. Call queryCanvas frist if you don't know what is there`,
  inputSchema: z.object({
    ids: z.array(z.string())
  })
})
