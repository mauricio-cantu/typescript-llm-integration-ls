import { experimental_createMCPClient, generateText } from "ai";
import { configDotenv } from "dotenv";
import { gemini2_0 } from "../models.ts";
configDotenv();

const client = await experimental_createMCPClient({
  transport: {
    type: "stdio",
    command: "npx",
    args: ["tsx", "src/11-mcp/server.ts"],
  },
});

const tools = await client.tools();

const response = await generateText({
  model: gemini2_0,
  tools,
  maxSteps: 10,
  prompt:
    "Summarize this video in en https://www.youtube.com/watch?v=wSHmygPQukQ",
});

console.log(response.text);
