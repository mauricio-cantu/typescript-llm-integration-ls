import { streamText } from "ai";
import { configDotenv } from "dotenv";
import { gemini1_5Pro } from "../models";
configDotenv();

// RAG: Retrieval Augmented Generation

const askLlm = (prompt: string) => {
  const response = streamText({
    model: gemini1_5Pro,
    prompt,
    system: "Answer in Brazilian Portuguese",
  });

  return response.textStream;
};

const prompt = "Quais foram as principais decisões tomadas na reunião de hoje?";
const context = `
Reunião de Planejamento - 29 de Março de 2025

Participantes: João, Maria, Carlos, Ana

Decisões apresentadas na reunião:
1. O time de engenharia migrará o sistema de autenticação para OAuth 2.0 até o final do próximo trimestre.
2. A equipe de produto priorizará a implementação do novo dashboard de métricas nas próximas sprints.
3. O orçamento para infraestrutura na nuvem será aumentado em 15% para suportar o crescimento do tráfego.
4. O suporte ao cliente passará a usar um chatbot baseado em IA para triagem inicial dos chamados.
`;

/*

*/

const promptWithContext = `
    Based on this context: \n
    ${context}
    \n
    Answer this: ${prompt}
`;

const streamResponse = askLlm(promptWithContext);

for await (const chunk of streamResponse) {
  process.stdout.write(chunk);
}
