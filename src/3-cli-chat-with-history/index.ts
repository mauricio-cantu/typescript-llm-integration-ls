import { type CoreMessage, generateText } from "ai";
import { configDotenv } from "dotenv";
import { createInterface } from "node:readline";
import { gemini2_0 } from "../models.ts";
import { createGithubMCPClient } from "../11-mcp/smitheryGithubClient.ts";
configDotenv();

// const githubClient = await createGithubMCPClient();
// const toolSet = await githubClient.tools();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chatHistory: CoreMessage[] = [];

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
      const result = await generateText({
        model: gemini2_0,
        messages: [...chatHistory, newUserMessage],
        tools: {
          // ...toolSet,
        },
        maxSteps: 10,
      });

      console.log("\nLLM:\n");
      console.log(result.text);

      const llmResponseMessage = result.response.messages;
      chatHistory.push(newUserMessage, ...llmResponseMessage);
      debugger;
    } catch (error) {
      console.error("Error:", error);
      process.exit();
    }

    askQuestion();
  });
}

askQuestion();
