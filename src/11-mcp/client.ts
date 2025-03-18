import { generateText } from "ai";
import { configDotenv } from "dotenv";
import { deepSeekR1Groq } from "../models.ts";
import { createPuppeteerMCPClient } from "./puppeteerClient.ts";
configDotenv();

// const client = await experimental_createMCPClient({
//   transport: {
//     type: "stdio",
//     command: "npx",
//     args: ["tsx", "src/11-mcp/server.ts"],
//   },
// });
const client = await createPuppeteerMCPClient();
const tools = await client.tools();

const response = await generateText({
  model: deepSeekR1Groq,
  tools,
  maxSteps: 10,
  prompt: "Visit Google and take a screenshot",
});

console.log(response.text);
