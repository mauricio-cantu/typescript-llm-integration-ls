import { experimental_createMCPClient } from "ai";
import { configDotenv } from "dotenv";
configDotenv();

export const createYoutubeTranscriptMCPClient = async () => {
  const YT_API_KEY = process.env.YT_API_KEY;
  if (!YT_API_KEY) {
    throw new Error("Please define YT_API_KEY in your env file");
  }
  return await experimental_createMCPClient({
    transport: {
      type: "stdio",
      command: "npx",
      args: [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@icraft2170/youtube-data-mcp-server",
        "--config",
        `{"youtubeApiKey":"${YT_API_KEY}","youtubeTranscriptLang":"en"}`,
      ],
    },
  });
};

export const createGithubMCPClient = async () => {
  const GH_PAT = process.env.GH_PAT;
  if (!GH_PAT) {
    throw new Error("Please define GH_PAT in your env file");
  }
  return await experimental_createMCPClient({
    transport: {
      type: "stdio",
      command: "npx",
      args: [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@smithery-ai/github",
        "--config",
        `{"githubPersonalAccessToken":"${GH_PAT}"}`,
      ],
    },
  });
};
