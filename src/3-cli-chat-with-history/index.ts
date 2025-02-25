import { type CoreMessage, streamText } from "ai";
import { createInterface } from "node:readline";
import { gemini2_0 } from "../models.ts";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let chatHistory: CoreMessage[] = [];

function askQuestion() {
  console.log("\n\n");

  rl.question("> ", async (prompt) => {
    const newUserMessage: CoreMessage = {
      role: "user",
      content: [
        {
          type: "text",
          text: prompt,
        },
      ],
    };

    try {
      const result = streamText({
        model: gemini2_0,
        messages: [...chatHistory, newUserMessage],
      });

      console.log("\nLLM:");
      for await (const chunk of result.textStream) {
        process.stdout.write(chunk);
      }

      const llmResponseMessage = (await result.response).messages;
      chatHistory.push(newUserMessage, ...llmResponseMessage);
    } catch (error) {
      console.error("Error:", error);
      process.exit(1);
    }

    askQuestion();
  });
}

askQuestion();
