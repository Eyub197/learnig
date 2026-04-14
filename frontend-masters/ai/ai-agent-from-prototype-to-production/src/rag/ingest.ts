import "dotenv/config"
import { Index as UpstashIndex } from "@upstash/vector"
import { parse } from "csv-parse/sync"
import fs from "node:fs"
import path from "node:path"
import ora from "ora"


const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
})

const indexMovieData = async () => {
  const spinner = ora("Reading moive data...").start()
  const moviesPath = path.join(process.cwd(), "src/rag/imdb_movie_dataset.csv")

  const csvData = fs.readFileSync(moviesPath, "utf-8")
  const records = parse(csvData, {
    columns: true,
    skipEmptyLines: true
  })

  spinner.text = "Starting movie indexing..."

  for (const record of records) {
    spinner.text = `Indexing movie ${record.Title}...`
    const text = `${record.Title}. ${record.Genre}. ${record.Description} ${record.Year}`

    try {
      await index.upsert({
        id: record.Title, // Using Rank as unique ID
        data: text, // Text will be automatically embedded
        metadata: {
          title: record.Title,
          year: Number(record.Year),
          genre: record.Genre,
          director: record.Director,
          actors: record.Actors,
          rating: Number(record.Rating),
          votes: Number(record.Votes),
          revenue: Number(record.Revenue),
          metascore: Number(record.Metascore),
        },
      })
    } catch (e) {
      spinner.fail(`Error indexing movie ${record.Title}`)
      console.error(e)
    }
  }
  spinner.succeed("All movies indexed")
}

indexMovieData()
