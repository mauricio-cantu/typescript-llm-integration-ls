import { generateText, tool } from "ai";
import console from "console";
import { configDotenv } from "dotenv";
import { z } from "zod";
import { deepSeekR1Groq } from "../models.ts";

configDotenv();

const getDataFromGithubProfileTool = tool({
  description: "Gets information from a GitHub's user",
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
  description: "Gets weather for a location",
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

const sendEmailTool = tool({
  description: "Sends email",
  parameters: z.object({
    to: z.string(),
    content: z.string(),
  }),
  execute: async ({ to, content }) => {
    // send email via API would go here...

    return {
      to,
      content,
      sentAt: new Date().toISOString(),
    };
  },
});

const result = await generateText({
  model: deepSeekR1Groq,
  system: "Answer in Brazilian Portuguese.",
  tools: {
    getDataFromGithubProfile: getDataFromGithubProfileTool,
    getWeather: getWeatherTool,
    sendEmail: sendEmailTool,
  },
  prompt: `Quero que voce faça algumas coisas. 
    Primeiro, quero que voce busque quantos repositorios publicos o usuario mauricio-cantu tem no github.
    Depois, quero que busque a temperatura atual em Porto Alegre, Brasil.
    Depois, quero que envie um email para email@gmail.com. O conteudo do email deve ser um texto mostrando os dados que voce coletou.
    Ao final me mostre o email que foi gerado e a hora que foi enviado.`,
  maxSteps: 10,
});

console.log(result.text);
