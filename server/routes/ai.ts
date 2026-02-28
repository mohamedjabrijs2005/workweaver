import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import { v4 as uuidv4 } from "uuid";
import { verifyToken, AuthRequest } from "../auth.js";
import { db } from "../db.js";

export const aiRouter = Router();

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  return new GoogleGenAI({ apiKey });
};

aiRouter.post("/detect-context", verifyToken, async (req: AuthRequest, res) => {
  try {
    const { input } = req.body;
    if (!input || !input.trim()) {
      return res.status(400).json({ error: "Input is required" });
    }

    const ai = getAiClient();

    const prompt = `
      Analyze the following user input and determine their current work context.
      Categorize it into one of the following: study, coding, research, project.
      Return a JSON object with the 'context' and a 'confidenceScore' (0-100).
      
      Input: "${input}"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    if (!response.text) {
      return res.status(500).json({ error: "Invalid response from AI model" });
    }

    let result;
    try {
      result = JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to parse AI response:", response.text);
      return res.status(500).json({ error: "Invalid JSON response from AI" });
    }

    res.json(result);
  } catch (error: any) {
    console.error("AI Error:", error);
    res.status(500).json({ error: error?.message || "Failed to detect context" });
  }
});

aiRouter.post("/generate-workspace", verifyToken, async (req: AuthRequest, res) => {
  try {
    const { context } = req.body;
    if (!context || !context.trim()) {
      return res.status(400).json({ error: "Context is required" });
    }

    const ai = getAiClient();

    const prompt = `
      Generate a smart workspace setup for the context: "${context}".
      Suggest 3 key tasks, 2 tools to use, and a short motivational message.
      Return as JSON with keys: tasks (array of strings), tools (array of strings), message (string).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    if (!response.text) {
      return res.status(500).json({ error: "Invalid response from AI model" });
    }

    let result;
    try {
      result = JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to parse AI response:", response.text);
      return res.status(500).json({ error: "Invalid JSON response from AI" });
    }

    res.json(result);
  } catch (error: any) {
    console.error("AI Error:", error);
    res.status(500).json({ error: error?.message || "Failed to generate workspace" });
  }
});

aiRouter.post("/deep-work/start", verifyToken, (req: AuthRequest, res) => {
  const { context, duration } = req.body;
  // In a real app, we might create a session record here
  res.json({ message: "Deep work session started", context, duration });
});

aiRouter.post("/deep-work/end", verifyToken, (req: AuthRequest, res) => {
  const { context, duration_minutes, focus_score } = req.body;
  const userId = req.user?.id;

  try {
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!context || duration_minutes === undefined) {
      return res.status(400).json({ error: "Context and duration_minutes are required" });
    }

    const id = uuidv4();
    db.prepare(
      "INSERT INTO sessions (id, user_id, context, duration_minutes, focus_score) VALUES (?, ?, ?, ?, ?)"
    ).run(id, userId, context, duration_minutes, focus_score);

    res.json({ message: "Session saved successfully" });
  } catch (error: any) {
    console.error("Deep work end error:", error);
    res.status(500).json({ error: error?.message || "Failed to save session" });
  }
});
