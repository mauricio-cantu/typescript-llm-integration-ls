import { experimental_createMCPClient } from "ai";
import { configDotenv } from "dotenv";
configDotenv();

export const createPuppeteerMCPClient = async () => {
  return await experimental_createMCPClient({
    transport: {
      type: "stdio",
      command: "docker",
      args: [
        "run",
        "-i",
        "--rm",
        "--init",
        "-e",
        "DOCKER_CONTAINER=true",
        "mcp/puppeteer",
      ],
    },
  });
};
