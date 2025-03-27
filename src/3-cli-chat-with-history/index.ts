import { type CoreMessage, generateText } from "ai";
import { configDotenv } from "dotenv";
import { createInterface } from "node:readline";
import { gemini2_0 } from "../models.ts";
import {
  createBrasilApiMCPClient,
  createGithubMCPClient,
} from "../11-mcp/smitheryClients.ts";
configDotenv();

const githubClient = await createGithubMCPClient();
const githubTools = await githubClient.tools();

const brasilApiClient = await createBrasilApiMCPClient();
const brasilApiTools = await brasilApiClient.tools();

const toolSet = {
  // ...githubTools,
  ...brasilApiTools,
};

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chatHistory: CoreMessage[] = [];

function chatLoop() {
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
      const result = await generateText({
        model: gemini2_0,
        messages: [...chatHistory, newUserMessage],
        tools: {
          ...toolSet,
        },
        maxSteps: 10,
      });

      console.log("\nLLM:\n");
      console.log(result.text);

      const llmResponseMessage = result.response.messages;
      chatHistory.push(newUserMessage, ...llmResponseMessage);
    } catch (error) {
      console.error("Error:", error);
      process.exit();
    }

    chatLoop();
  });
}

chatLoop();
