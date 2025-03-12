import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { smoothStream, streamText } from 'ai';

export default defineLazyEventHandler(async () => {
  const googleApiKey = useRuntimeConfig().googleAiApiKey;
  if (!googleApiKey) throw new Error('Missing provider API key');
  
  const googleProvider = createGoogleGenerativeAI({
    apiKey: googleApiKey,
  })

  const geminiModel = googleProvider('gemini-2.0-flash-exp')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return defineEventHandler(async (event: any) => {
    const { messages } = await readBody(event);
    
    const result = streamText({
      model: geminiModel,
      messages,
      experimental_transform: smoothStream({
        delayInMs: 10,
        chunking: 'word',
      }),
    });

    return result.toDataStreamResponse();
  });
});