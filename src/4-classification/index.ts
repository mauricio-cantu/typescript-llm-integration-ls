import { generateObject } from "ai";
import { gemini2_0 } from '../models.ts';

// Change this to play around
const prompt = "I'm not sure how to descrivbe the experience I had in this restaurant"

const { object } = await generateObject({
    model: gemini2_0,
    output: 'enum',
    enum: ['positive', 'negative', 'neutral'],
    system: 'Classify the sentiment of the text as positive, negative or neutral.',
    prompt
})

console.clear();
console.log(object);