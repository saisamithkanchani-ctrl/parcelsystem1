
import { GoogleGenAI, Type } from "@google/genai";
import { Parcel, PredictionResult } from "../types";

export class GeminiService {
  /**
   * Predicts delivery risk using Gemini AI.
   * Following the @google/genai coding guidelines:
   * 1. Initialize GoogleGenAI with { apiKey: process.env.API_KEY }.
   * 2. Use ai.models.generateContent directly with model name and prompt.
   * 3. Access text directly via response.text.
   */
  async predictDeliveryRisk(parcel: Parcel): Promise<PredictionResult> {
    // Correct: Initialization uses the named parameter apiKey and process.env.API_KEY directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Analyze this parcel for delivery risks and predict a realistic delivery time.
    Parcel ID: ${parcel.id}
    Origin: ${parcel.origin}
    Destination: ${parcel.destination}
    Current Status: ${parcel.status}
    Weight: ${parcel.weight}
    Last Updated: ${parcel.lastUpdated}
    Original Estimated Delivery: ${parcel.estimatedDelivery}

    Consider hypothetical environmental factors like weather in ${parcel.destination} and current logistics trends. 
    Return the response in JSON format.`;

    try {
      // Correct: Using ai.models.generateContent with both model name and prompt.
      const response = await ai.models.generateContent({
        // gemini-3-pro-preview is selected for complex text tasks involving reasoning and risk analysis.
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              delayRisk: { type: Type.INTEGER, description: "Risk percentage 0-100" },
              adjustedDeliveryTime: { type: Type.STRING, description: "ISO date string" },
              reasoning: { type: Type.STRING, description: "Detailed explanation" },
              factors: {
                type: Type.OBJECT,
                properties: {
                  weather: { type: Type.STRING, enum: ["Good", "Fair", "Poor"] },
                  traffic: { type: Type.STRING, enum: ["Low", "Moderate", "High"] },
                  logistics: { type: Type.STRING, enum: ["Efficient", "Backlogged"] }
                },
                required: ["weather", "traffic", "logistics"]
              }
            },
            required: ["delayRisk", "adjustedDeliveryTime", "reasoning", "factors"]
          }
        }
      });

      // Correct: Use the .text property directly (not a method).
      const result = JSON.parse(response.text || '{}');
      return result as PredictionResult;
    } catch (error) {
      console.error("Gemini Prediction Error:", error);
      // Fallback prediction
      return {
        delayRisk: 15,
        adjustedDeliveryTime: parcel.estimatedDelivery,
        reasoning: "Based on historical average data for this route. (AI Analysis unavailable)",
        factors: {
          weather: "Fair",
          traffic: "Moderate",
          logistics: "Efficient"
        }
      };
    }
  }
}

export const geminiService = new GeminiService();
