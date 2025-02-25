import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";

export const deepSeekR1Groq = groq("deepseek-r1-distill-llama-70b");
export const gemini1_5Pro = google("gemini-1.5-pro");
export const gemini2_0 = google("gemini-2.0-flash-exp");
