import { Pinecone } from "@pinecone-database/pinecone";
import { embedMany } from "ai";
import { readFileSync } from "fs";
import path from "path";
import { geminiEmbedding } from "../models.ts";

// pinecone config
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
const index = pc.index("demo-index");

function splitText(text: string, chunkSize = 70, overlap = 20) {
  const words = text.split(" ");
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    chunks.push(chunk);
  }

  return chunks;
}

async function generateEmbeddings(textChunks: string[]) {
  const { embeddings } = await embedMany({
    model: geminiEmbedding,
    values: textChunks,
  });

  return embeddings;
}

const filePath = path.join(import.meta.dirname, "source.txt");
// file content as string
const source = readFileSync(filePath, "utf-8");
// content chunks
const textChunks = splitText(source);
// embeddings from each chunk [[embeddings from chunk 1], [embeddings from chunk 2], [embeddings from chunk 3], ...]
const embeddings = await generateEmbeddings(textChunks);

// store embeddings into the vector db along with the actual content (metadata.text) so we can retrieve it later
await index.upsert(
  embeddings.map((embeddingValues, idx) => {
    return {
      id: `vec-${idx}`,
      values: embeddingValues,
      metadata: {
        text: textChunks[idx],
      },
    };
  })
);
