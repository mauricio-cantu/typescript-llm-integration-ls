# AI-Powered Quiz app (React + Vercel's AI SDK showcase)

Simple application to showcase the integration of Vercel's AI SDK into a React app. In this sample app, users can provide a topic and the LLM will create questions and aswers to build up a quiz about it.

To work with other LLM models/providers, export them from `src/providers.ts` file. Don't forget to add the necessary API Key in the .env file.

## Setting the project up

### Create the .env file

```shell
cp .env.example .env
```

Then enter the necessary API Keys as values.

### Install the deps

```shell
npm i # or yarn, pnpm, bun...
```

### Run it

```shell
npm run dev # or yarn, pnpm, bun...
```
