import { generateText } from "ai";
import { configDotenv } from "dotenv";
import { gemini2_0 } from "../models.ts";

configDotenv();

// This example applies RAG based on embeddings created in 9-embeddings/for-rag.ts

const askLlm = async (prompt: string) => {
  const response = await generateText({
    model: gemini2_0,
    prompt,
    system:
      "You're a helpful assistant. Answer the user based on the provided context only. If there's no context provided or you aren't able to answer the question with the provided context, simply answer 'Sorry, I don'k know how to answer this.'.",
  });

  return response.text;
};

const userPrompt = "tell me more about her education";

// Simulate return from Vector DB
const relevantContents = [
  `projects focused on making AI systems more transparent, explainable, and unbiased.

Education:

PhD in Computer Science – Stanford University (2015)
MSc in Artificial Intelligence – MIT (2012)
BSc in Computer Science – UC Berkeley (2010)
Professional Experience:

Founder & CEO – NeuralMind AI (2020 - Present)

Built an AI-powered search engine that enhances academic research by retrieving the most relevant studies based on semantic meaning.
Developed a RAG-based system to process and summarize vast amounts of research papers`,
];

// adds the retrieved context to the initial prompt
const promptWithContext = `
Based on the following context: ${relevantContents.join("\n\n")} \n
Answer this: ${userPrompt}`;

const llmResponse = await askLlm(promptWithContext);

console.clear();
console.log("LLM response:\n" + llmResponse);
