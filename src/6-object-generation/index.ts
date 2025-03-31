import { generateObject } from "ai";
import { z } from "zod";
import { gemini1_5Pro } from "../models.ts";
import { configDotenv } from "dotenv";

configDotenv();

const result = await generateObject({
  model: gemini1_5Pro,
  schema: z
    .array(
      z.object({
        fullName: z.string().describe("User's name"),
        age: z.number().describe("User's age"),
        email: z.string().describe("User's email"),
      })
    )
    .describe("Array of users"),
  prompt:
    "Generate an array of 10 users as the provided JSON schema. Use real names and emails.",
});

// schema inference
console.log(result.object[0].fullName);

console.log(JSON.stringify(result.object, null, 2));
