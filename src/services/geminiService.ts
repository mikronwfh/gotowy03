
import { GoogleGenAI, Type } from "@google/genai";
import { BusinessProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStrategyTool = async (
  toolName: string, 
  profile: BusinessProfile,
  model: string = 'gemini-3-flash-preview'
) => {
  const prompt = `
    You are a world-class business strategist. Generate a detailed ${toolName} for the following business:
    Name: ${profile.name}
    Industry: ${profile.industry}
    Stage: ${profile.stage}
    Audience: ${profile.targetAudience}
    Description: ${profile.description}

    Provide the output in a structured markdown format with clear headings and actionable bullet points.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
};

export const chatWithCopilot = async (
  messages: { role: 'user' | 'model', text: string }[],
  profile: BusinessProfile
) => {
  const systemInstruction = `
    You are BizNexus Copilot, a senior business advisor. Your goal is to help the user grow their business: "${profile.name}".
    Context:
    - Industry: ${profile.industry}
    - Stage: ${profile.stage}
    - Target: ${profile.targetAudience}
    - Description: ${profile.description}
    Be professional, data-driven, and highly actionable. If you don't know something, suggest how to research it.
  `;

  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction,
    },
  });

  // History for the chat
  const history = messages.slice(0, -1).map(m => ({
    role: m.role,
    parts: [{ text: m.text }]
  }));

  const lastMessage = messages[messages.length - 1].text;
  const result = await chat.sendMessage({ message: lastMessage });
  return result.text;
};

export const generateMarketingContent = async (
  format: string,
  topic: string,
  profile: BusinessProfile
) => {
  const prompt = `
    Generate high-converting ${format} content about "${topic}" for ${profile.name}.
    Audience: ${profile.targetAudience}
    Tone: Professional yet engaging.
    Include: Headline, body copy, and a clear Call to Action (CTA).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });

  return response.text;
};
