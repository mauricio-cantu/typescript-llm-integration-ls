import { cosineSimilarity, embed, embedMany } from "ai";
import { geminiEmbedding } from "../models.ts";
import { configDotenv } from "dotenv";

configDotenv();

const values = ["gato", "açucar", "violão"];

const { embeddings } = await embedMany({
  model: geminiEmbedding,
  values,
});

const vectorDb = embeddings.map((embedding, index) => ({
  value: values[index],
  embedding,
}));

const term = "ingrediente para receitas doces";
// instrumento musical
// felino

const { embedding: termEmbedding } = await embed({
  model: geminiEmbedding,
  value: term,
});

const similarities = vectorDb.map((entry) => ({
  value: entry.value,
  similarity: cosineSimilarity(entry.embedding, termEmbedding),
}));

const sortedSimilarities = similarities.sort(
  (a, b) => b.similarity - a.similarity
);

console.table(sortedSimilarities);
