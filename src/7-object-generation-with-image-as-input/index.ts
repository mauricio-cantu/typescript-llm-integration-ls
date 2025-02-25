import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

const jim = process.argv.at(-1) === "jim";
const filePath = jim ? "./jim-the-office.jpg" : "./eleven-stranger-things.jpg";

const result = await generateObject({
  model: google("gemini-1.5-pro-latest"),
  schema: z.object({
    name: z.string().describe("Name of the character"),
    show: z.string().describe("Movie or series the character belongs to"),
    actor: z.string().describe("Actor or actress who plays the character"),
    age: z.number().describe("Age of the actor"),
    otherShows: z
      .array(z.string())
      .describe("Other movies/shows the actor has appeared in."),
    country: z.string().describe("Country of origin of the actor"),
  }),
  system:
    "You'll receive an image of a character and you'll have to provide the requested information using that image.",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Use this image provide the information requested as per the schema.",
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

console.clear();
console.log(JSON.stringify(result.object, null, 2));
