import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const result = await generateText({
  model: google("gemini-2.0-flash-exp"),
  providerOptions: {
    google: { responseModalities: ["TEXT", "IMAGE"] },
  },
  prompt: "Generate an image of a comic cat",
});

for (const file of result.files) {
  if (file.mimeType.startsWith("image/")) {
    // use the image
  }
}
