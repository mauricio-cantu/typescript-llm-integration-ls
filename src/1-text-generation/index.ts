import { generateText } from "ai";
import { deepSeekR1Groq } from "../models.ts";

const askLlm = async (prompt: string) => {
  const response = await generateText({
    model: deepSeekR1Groq,
    prompt,
  });

  return response.text;
};

askLlm("Quem foi Steve Jobs?").then(console.log);
