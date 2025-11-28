import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from "../types";

// Using the mapped name for 'gemini lite' as per SDK guidelines
const MODEL_NAME = 'gemini-flash-lite-latest';

const TOPICS = [
  "Kubernetes Security Vulnerabilities",
  "AWS Lambda Cold Start Optimizations",
  "OpenAI Enterprise API Updates",
  "PostgreSQL 17 Performance Benchmarks",
  "Linux Kernel eBPF Features",
  "Terraform Licensing Changes Impact",
  "NVIDIA Data Center GPU Specs",
  "Rust in Linux Kernel Developments",
  "WebAssembly in Enterprise Architectures",
  "Zero Trust Architecture Implementation Patterns"
];

const SYSTEM_INSTRUCTION = `
You are a Senior Enterprise IT Analyst. Your task is to research the provided TOPIC using Google Search and generate a structured news brief.

### STRICT CONSTRAINTS (LEGAL & QUALITY):
1. **TRANSFORMATION:** You must synthesize facts from multiple sources. DO NOT copy narrative sentences. Convert all findings into objective, analytical bullet points.
2. **CITATIONS:** You must include the source URL for every claim in the metadata.
3. **CURIOSITY:** The 'notification_teaser' field must be a question or incomplete fact that creates urgency (FOMO) and forces the user to open the app.
4. **OUTPUT:** Respond ONLY with valid, parseable JSON. Do not wrap in markdown code blocks.

### JSON STRUCTURE:
{
  "post_title": "Technical Headline (Max 10 words)",
  "notification_teaser": "Urgent/Curious teaser string (Max 120 chars)",
  "publish_date": "ISO_8601_DATE",
  "category": "Enterprise IT",
  "content": {
    "key_fact": "The single most important technical spec or number.",
    "analysis_points": [
      "Bullet 1: Technical implication.",
      "Bullet 2: Market impact.",
      "Bullet 3: Security/Risk assessment."
    ]
  },
  "source_citations": ["url1", "url2"]
}
`;

export const fetchNewsBrief = async (): Promise<NewsArticle> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Rotate topics to simulate fresh news from the scheduler
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Research the latest technical details regarding: ${topic}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        // responseMimeType is NOT set because we are using googleSearch tool
      },
    });

    const text = response.text || "";
    
    // Clean up potentially markdown-wrapped JSON
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(cleanText);
    } catch (e) {
      console.error("Failed to parse JSON from Gemini response", text);
      throw new Error("Data formatting error: AI response was not valid JSON");
    }

    // Extract grounding chunks for display (Critical for Legal/Copyright mitigation)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingUrls = groundingChunks
      .map((chunk: any) => chunk.web)
      .filter((web: any) => web && web.uri && web.title);

    // If the model didn't return citations in the body but we have grounding, merge them
    const combinedCitations = Array.from(new Set([
      ...(parsedData.source_citations || []),
      ...groundingUrls.map((g: any) => g.uri)
    ]));

    return {
      id: crypto.randomUUID(),
      ...parsedData,
      source_citations: combinedCitations,
      grounding_urls: groundingUrls,
    };

  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};