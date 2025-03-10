import { Pinecone } from "@pinecone-database/pinecone";
import { embedMany, streamText } from "ai";
import { deepSeekR1Groq, geminiEmbedding } from "../models.ts";

// This example applies RAG based on embeddings created in 9-embeddings/index.ts

async function generateEmbeddings(textChunks: string[]) {
  const { embeddings } = await embedMany({
    model: geminiEmbedding,
    values: textChunks,
  });

  return embeddings;
}

const askLlm = (prompt: string) => {
  const response = streamText({
    model: deepSeekR1Groq,
    prompt,
    system:
      "You're a helpful assistant. Answer the user based on the provided context only. If there's no context provided or you aren't able to answer the question with the provided context, simply answer 'Sorry, I don'k know how to answer this.'.",
  });

  return response.textStream;
};

// pinecone config
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
const index = pc.index("demo-index");

// Change this to play around
const userPrompt = "tell me more about her education";

// create embeddings for the user's prompt
const [promptEmbedding] = await generateEmbeddings([userPrompt]);

// get similar contents from vector db
const relevantEmbeddings = await index.query({
  vector: promptEmbedding,
  topK: 3, // 3 most relevant contents
  includeMetadata: true, // so we can take the actual chunk of text of that embedding
});

// get text from retrieved contents
const relevantTexts = relevantEmbeddings.matches.map(
  (match) => match.metadata?.text || ""
);

// adds the retrieved context to the initial prompt
const promptWithContext = `
Based on the following context: ${relevantTexts.join("\n\n")} \n
Answer this: ${userPrompt}`;

const llmResponse = askLlm(promptWithContext);

for await (const responseChunk of llmResponse) {
  process.stdout.write(responseChunk);
}
