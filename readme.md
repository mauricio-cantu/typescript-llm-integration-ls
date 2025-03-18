# Learning Session: Integrating LLMs into TypeScript projects

This repo contains the source files and examples for the Learning Session "Integrating LLMs into TypeScript projects: Exploring Vercel's AI SDK".

Some of the topics presented:

- Prompt Engineering
- Context window/tokens/completions
- Text generation/streaming
- Classification/sentiment analysis
- Image description
- Structured/typed outputs
- Image generation
- Tool calls
- RAG
- Embeddings
- Similarity search
- Vector data storage/retrieval
- UI hooks to integrate with LLMs
- MCP (Model Context Protocol)

## Repo structure

In `src/` directory you'll find examples using features from the `sdk-core` package from Vercel's AI SDK which allow different types of interaction with LLMs (text/image generation, structured outputs, embeddings and so on).

In `packages/ui` you'll find examples using Vercel's AI SDK to build AI-powered frontend applications as well as examples using the `sdk-ui` package which provides hooks to easily integrate with LLMs from frontend frameworks (such as React and Vue). Check their specific `README.md` files for detailed context and instructions on how to setup/run.

## How to setup and run examples

Below instructions are for the examples present in `src` directory! For the frontend examples present in `packages/ui`, refer to their specific `README.md` files for detailed context and instructions on how to setup/run them.

- Recommended to run Node.js in LTS version. If you have nvm installed, run `nvm use`.
- Rename `.env.example` at the root directory to `.env` and paste your API Keys as values to the env variables (check links at the end to know where to get API keys).
- Install the dependencies with `npm i`.

You're ready to go!

In the root `package.json` there are already individual scripts to run some examples.

Models are exported from `src/models.ts`. Use the ones already exported or add new ones if you'd like. If you're going to use different models/providers, don't forget to add the necessary API Key in the root `.env` file (check links at the end to know where to get API keys).

## Useful links and resources

- [Vercel's AI SDK docs](https://sdk.vercel.ai/docs/introduction)
- [Groq Console](https://console.groq.com/): Some free models to test via API (such as Deepseek and Llama ones)
- [Google Generative AI](https://ai.google.dev/gemini-api/docs/quickstart): Free Google models to test via API
- [cheahjs/free-llm-api-resources](https://github.com/cheahjs/free-llm-api-resources): Repo with a list of free LLM inference resources accessible via API
- Vector DBs with free plans: [Pinecone](https://www.pinecone.io/), [Chroma](https://docs.trychroma.com/docs/overview/introduction), [pgvector (vector extension for Postgres)](https://github.com/pgvector/pgvector)
- MCP servers: [Pulse](https://www.pulsemcp.com/servers), [Smithery](https://smithery.ai/)
