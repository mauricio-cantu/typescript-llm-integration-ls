import { experimental_createMCPClient as createMCPClient } from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import { configDotenv } from "dotenv";
configDotenv();

export const createGithubMCPClient = async () => {
  const GH_PAT = process.env.GH_PAT;
  if (!GH_PAT) {
    throw new Error("Please define GH_PAT in your env file");
  }
  return await createMCPClient({
    transport: new StdioMCPTransport({
      command: "npx",
      args: [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@smithery-ai/github",
        "--config",
        `{"githubPersonalAccessToken":"${GH_PAT}"}`,
      ],
    }),
  });
};

export const createBrasilApiMCPClient = async () => {
  return await createMCPClient({
    transport: new StdioMCPTransport({
      command: "npx",
      args: [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@mauricio-cantu/brasil-api-mcp-server",
      ],
    }),
  });
};
