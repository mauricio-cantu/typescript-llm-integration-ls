import { streamText } from "ai";
import { readFileSync } from "node:fs";
import path from "node:path";
import { gemini2_0 } from "../models.ts";
import { configDotenv } from "dotenv";

configDotenv();

const filePath = "./dog-skating.webp";

const result = streamText({
  model: gemini2_0,
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Describe the attached image. Be very detailed about what you can see from it. Answer in Brazilian Portuguese.",
        },
      ],
    },
    {
      role: "user",
      content: [
        {
          type: "image",
          image: readFileSync(path.join(import.meta.dirname, filePath)),
        },
      ],
    },
  ],
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
console.log("\n");
