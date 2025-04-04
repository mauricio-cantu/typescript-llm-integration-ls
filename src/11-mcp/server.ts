import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "example-server",
  version: "1.0.0",
});

server.tool(
  "get-github-user-data",
  "Gets information from a GitHub's user",
  { username: z.string() },
  async ({ username }) => {
    const request = await fetch(`https://api.github.com/users/${username}`);
    const response = await request.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
