import { Index as UpstashIndex } from "@upstash/vector"

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
})

export const queryMovies = async ({ query, filters, topK = 5 }: {
  query: string,
  filters?: any,
  topK?: number
}) => {
  return index.query({
    data: query,
    topK,
    includeMetadata: true,
    includeData: true
  })
}
