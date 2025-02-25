import { experimental_generateImage as generateImage } from "ai";

const result = await generateImage({
  // @ts-expect-error
  // TODO
  model: null,
  prompt: "Vintage car at a high speed in a cyberpunk scenario.",
});
