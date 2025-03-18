import { experimental_createMCPClient, generateText } from "ai";
import { configDotenv } from "dotenv";
import { gemini1_5Pro } from "../models.ts";

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
  model: gemini1_5Pro,
  tools,
  maxSteps: 2,
  prompt: "How many public repos does mauricio-cantu have?",
});

console.log(response.text);
