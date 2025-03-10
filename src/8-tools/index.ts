import { generateText, tool } from "ai";
import { z } from "zod";
import { deepSeekR1Groq } from "../models.ts";

export interface GitHubUser {
  name: string;
  public_repos: number;
  id: number;
  location: string;
  company: string;
}

const result = await generateText({
  model: deepSeekR1Groq,
  tools: {
    githubUser: tool({
      description: "Get information from a GitHub's profile",
      parameters: z.object({
        username: z.string().describe("The username from GitHub profile"),
      }),
      execute: async ({ username }) => {
        const request = await fetch(`https://api.github.com/users/${username}`);
        const response = (await request.json()) as GitHubUser;

        return {
          publicRepos: response.public_repos,
          id: response.id,
          name: response.name,
          location: response.location,
          company: response.company,
        };
      },
    }),
  },
  // change to any GH user to play around
  prompt:
    "Where does the person that owns mauricio-cantu profile on GitHub work?",
  maxSteps: 2,
});

console.log(result.text);
