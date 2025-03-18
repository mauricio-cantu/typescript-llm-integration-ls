import { experimental_createMCPClient } from "ai";
import { configDotenv } from "dotenv";
configDotenv();

export const createFetchMCPClient = async () => {
  return await experimental_createMCPClient({
    transport: {
      type: "stdio",
      command: "docker",
      args: ["run", "-i", "--rm", "mcp/fetch"],
    },
  });
};
