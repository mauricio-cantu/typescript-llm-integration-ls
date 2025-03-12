import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
    googleAiApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    groqApiKey: process.env.GROQ_API_KEY
  },
})