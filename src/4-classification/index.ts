import { generateObject } from "ai";
import { gemini2_0 } from "../models.ts";
import { configDotenv } from "dotenv";

configDotenv();

// Change this to play around
const prompt = "Não sei dizer, achei mais ou menos";

const { object } = await generateObject({
  model: gemini2_0,
  output: "enum",
  enum: ["positive", "negative", "neutral"],
  system:
    "Classify the sentiment of the text as positive, negative or neutral.",
  prompt,
});

console.clear();
console.log(object);
