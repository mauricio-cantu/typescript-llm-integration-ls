import { streamText } from "ai";
import { deepSeekR1Groq } from "../models";

const streamLlm = (prompt: string) => {
  const response = streamText({
    model: deepSeekR1Groq,
    prompt,
  });

  return response.textStream;
};

const streamResponse = streamLlm("Quem é Bill Gates?");

for await (const chunk of streamResponse) {
  process.stdout.write(chunk);
}
