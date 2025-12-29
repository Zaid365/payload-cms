
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCmsAdvice = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert software architect specializing in Payload CMS and headless architectures. 
        Provide concise, practical advice on data modeling, collection structures, and API integration. 
        Keep responses professional and developer-focused.`,
        temperature: 0.7,
      },
    });
    return response.text || "Sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The architect is busy right now. Please try again later.";
  }
};
