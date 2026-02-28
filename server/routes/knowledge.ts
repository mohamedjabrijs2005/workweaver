import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db.js";
import { verifyToken, AuthRequest } from "../auth.js";

export const knowledgeRouter = Router();

knowledgeRouter.post("/save", verifyToken, (req: AuthRequest, res) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user?.id;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const id = uuidv4();

    db.prepare(
      "INSERT INTO knowledge (id, user_id, title, content, tags) VALUES (?, ?, ?, ?, ?)"
    ).run(id, userId, title, content, tags ? JSON.stringify(tags) : null);

    return res.status(201).json({ id, title, message: "Knowledge saved successfully" });
  } catch (error: any) {
    console.error("Save knowledge error:", error);
    res.status(500).json({ error: error?.message || "Failed to save knowledge" });
  }
});

knowledgeRouter.get("/search", verifyToken, (req: AuthRequest, res) => {
  try {
    const { q } = req.query;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let results;
    if (q) {
      results = db.prepare(
        "SELECT * FROM knowledge WHERE user_id = ? AND (title LIKE ? OR content LIKE ?)"
      ).all(userId, `%${q}%`, `%${q}%`);
    } else {
      results = db.prepare("SELECT * FROM knowledge WHERE user_id = ?").all(userId);
    }

    return res.json({ results: Array.isArray(results) ? results : [] });
  } catch (error: any) {
    console.error("Search knowledge error:", error);
    return res.status(500).json({ error: error?.message || "Failed to search knowledge" });
  }
});

knowledgeRouter.get("/dashboard/summary", verifyToken, (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const sessions = db.prepare("SELECT * FROM sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 5").all(userId);
    const knowledge = db.prepare("SELECT * FROM knowledge WHERE user_id = ? ORDER BY created_at DESC LIMIT 5").all(userId);
    
    const totalFocusTime = db.prepare("SELECT SUM(duration_minutes) as total FROM sessions WHERE user_id = ?").get(userId) as any;

    return res.json({
      recentSessions: Array.isArray(sessions) ? sessions : [],
      recentKnowledge: Array.isArray(knowledge) ? knowledge : [],
      totalFocusTime: totalFocusTime?.total || 0
    });
  } catch (error: any) {
    console.error("Dashboard summary error:", error);
    return res.status(500).json({ error: error?.message || "Failed to fetch summary" });
  }
});
