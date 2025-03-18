import { generateText, tool } from "ai";
import console from "console";
import { configDotenv } from "dotenv";
import { z } from "zod";
import { deepSeekR1Groq } from "../models.ts";

configDotenv();

const getDataFromGithubProfileTool = tool({
  description: "Get information from a GitHub's profile",
  parameters: z.object({
    username: z.string().describe("The username from GitHub profile"),
  }),
  execute: async ({ username }) => {
    const request = await fetch(`https://api.github.com/users/${username}`);
    const response = await request.json();

    return response;
  },
});

const getWeatherTool = tool({
  description: "Get weather for a location",
  parameters: z.object({
    city: z.string().describe("City to get weather from"),
    country: z.string().describe("Country the city is from"),
  }),
  execute: async ({ city, country }) => {
    // simulating API response
    return {
      city,
      country,
      temperature: 20,
      degrees: "Celsius",
    };
  },
});

const result = await generateText({
  model: deepSeekR1Groq,
  system: "Answer in Brazilian Portuguese.",
  tools: {
    getDataFromGithubProfile: getDataFromGithubProfileTool,
    // getWeather: getWeatherTool,
  },
  prompt: "Quantos repositorios publicos mauricio-cantu tem no github?",
  maxSteps: 10,
});
console.clear();
console.log(result.text);
