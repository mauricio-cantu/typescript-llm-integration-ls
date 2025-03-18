import { generateText } from "ai";
import { configDotenv } from "dotenv";
import { deepSeekR1Groq } from "../models.ts";
configDotenv();

const askLlm = async (prompt: string) => {
  const response = await generateText({
    model: deepSeekR1Groq,
    prompt,
  });

  return response.text;
};

askLlm("O que são LLMs?").then(console.log);
