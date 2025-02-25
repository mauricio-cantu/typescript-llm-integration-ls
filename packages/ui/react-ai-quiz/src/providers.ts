import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";

export const googleModel = createGoogleGenerativeAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY,
});

export const groqModel = createGroq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

// other models can go here...
