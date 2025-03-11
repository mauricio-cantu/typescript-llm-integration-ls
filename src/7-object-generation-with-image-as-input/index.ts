import { generateObject } from "ai";
import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { gemini2_0 } from "../models.ts";

const eiffel = process.argv.at(-1) === "eiffel";
const filePath = eiffel ? "./eiffel.jpg" : "./cristo-redentor.jpg";

const result = await generateObject({
  model: gemini2_0,
  schema: z.object({
    name: z.string().describe("It's name"),
    country: z.string().describe("Which country it's located"),
    city: z.string().describe("Which city it's located"),
    inaugurationDate: z.string().describe("Date of inauguration"),
    height: z.string().describe("Its height in meters"),
    description: z.string().describe("Short story of its creation"),
    materials: z.array(z.string()).describe("Main materials it's made of")
  }),
  system:
    "You'll receive an image of a landmark and you'll have to provide the requested information about it. Final answer must be in Brazilian Portuguese.",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Use this image to provide the information requested as per the JSON schema.",
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
