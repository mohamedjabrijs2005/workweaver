import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db.js";
import { verifyToken, AuthRequest } from "../auth.js";

export const knowledgeRouter = Router();

knowledgeRouter.post("/save", verifyToken, (req: AuthRequest, res) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user?.id;
    const id = uuidv4();

    db.prepare(
      "INSERT INTO knowledge (id, user_id, title, content, tags) VALUES (?, ?, ?, ?, ?)"
    ).run(id, userId, title, content, tags ? JSON.stringify(tags) : null);

    res.status(201).json({ id, title, message: "Knowledge saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save knowledge" });
  }
});

knowledgeRouter.get("/search", verifyToken, (req: AuthRequest, res) => {
  try {
    const { q } = req.query;
    const userId = req.user?.id;

    let results;
    if (q) {
      results = db.prepare(
        "SELECT * FROM knowledge WHERE user_id = ? AND (title LIKE ? OR content LIKE ?)"
      ).all(userId, `%${q}%`, `%${q}%`);
    } else {
      results = db.prepare("SELECT * FROM knowledge WHERE user_id = ?").all(userId);
    }

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: "Failed to search knowledge" });
  }
});

knowledgeRouter.get("/dashboard/summary", verifyToken, (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    
    const sessions = db.prepare("SELECT * FROM sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 5").all(userId);
    const knowledge = db.prepare("SELECT * FROM knowledge WHERE user_id = ? ORDER BY created_at DESC LIMIT 5").all(userId);
    
    const totalFocusTime = db.prepare("SELECT SUM(duration_minutes) as total FROM sessions WHERE user_id = ?").get(userId) as any;

    res.json({
      recentSessions: sessions,
      recentKnowledge: knowledge,
      totalFocusTime: totalFocusTime?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});
