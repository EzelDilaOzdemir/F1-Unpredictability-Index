
import { GoogleGenAI, Type } from "@google/genai";
import { CircuitAnalysis, ComparisonData } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCircuitAnalysis = async (circuitId: string, circuitName: string): Promise<CircuitAnalysis> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the Formula 1 circuit "${circuitName}" (${circuitId}) for its "Unpredictability Index". 
    Focus on factors like:
    1. Weather volatility (probability of sudden rain/track temp changes).
    2. Safety Car frequency (historical averages).
    3. Overtaking difficulty vs success.
    4. DNF (Did Not Finish) rates due to mechanical or technical errors vs track difficulty.
    5. Strategy variance (how often alternative pit strategies win).
    
    Also provide:
    - A yearly unpredictability score for the last 10 seasons (2014-2024).
    - A yearly count of Safety Car (SC) and Virtual Safety Car (VSC) deployments combined for the last 10 seasons (2014-2024).
    
    Return the data in a structured JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          circuitId: { type: Type.STRING },
          metrics: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER, description: "Total unpredictability score 0-100" },
              weatherVolatility: { type: Type.NUMBER, description: "0-100" },
              safetyCarFrequency: { type: Type.NUMBER, description: "Average per race, e.g., 0.8" },
              overtakesPerRace: { type: Type.NUMBER },
              dnfRate: { type: Type.NUMBER, description: "Percentage" },
              strategyVariance: { type: Type.NUMBER, description: "0-100" }
            },
            required: ["score", "weatherVolatility", "safetyCarFrequency", "overtakesPerRace", "dnfRate", "strategyVariance"]
          },
          historicalContext: { type: Type.STRING },
          topContributingFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
          recentTriggers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                event: { type: Type.STRING },
                impact: { type: Type.STRING }
              }
            }
          },
          historicalTrend: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                season: { type: Type.INTEGER },
                score: { type: Type.NUMBER }
              },
              required: ["season", "score"]
            }
          },
          safetyCarTrend: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                season: { type: Type.INTEGER },
                deployments: { type: Type.NUMBER }
              },
              required: ["season", "deployments"]
            }
          }
        },
        required: ["circuitId", "metrics", "historicalContext", "topContributingFactors", "recentTriggers", "historicalTrend", "safetyCarTrend"]
      }
    }
  });

  // Correctly extract text output using .text property (not a method)
  const jsonStr = response.text || '{}';
  return JSON.parse(jsonStr);
};

export const compareCircuits = async (circuitNames: string[]): Promise<ComparisonData> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Compare the following F1 circuits for their unpredictability: ${circuitNames.join(", ")}. 
    Generate a full comparison report with metrics for each and a final ranking from most to least unpredictable. 
    Explain WHY the #1 circuit takes the top spot.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          circuits: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                circuitId: { type: Type.STRING },
                metrics: {
                  type: Type.OBJECT,
                  properties: {
                    score: { type: Type.NUMBER },
                    weatherVolatility: { type: Type.NUMBER },
                    safetyCarFrequency: { type: Type.NUMBER },
                    overtakesPerRace: { type: Type.NUMBER },
                    dnfRate: { type: Type.NUMBER },
                    strategyVariance: { type: Type.NUMBER }
                  }
                },
                historicalContext: { type: Type.STRING }
              }
            }
          },
          ranking: { type: Type.ARRAY, items: { type: Type.STRING } },
          insight: { type: Type.STRING }
        }
      }
    }
  });

  // Correctly extract text output using .text property (not a method)
  const jsonStr = response.text || '{}';
  return JSON.parse(jsonStr);
};
