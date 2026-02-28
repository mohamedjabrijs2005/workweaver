import express from "express";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import { authRouter } from "./server/routes/auth.js";
import { aiRouter } from "./server/routes/ai.js";
import { knowledgeRouter } from "./server/routes/knowledge.js";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cookieParser());

  // CORS middleware - allow requests from anywhere during deployment
  app.use((req, res, next) => {
    const acceptedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:3001",
      process.env.VITE_API_URL || "",
    ].filter(Boolean);
    
    const origin = req.headers.origin;
    if (acceptedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
      res.header("Access-Control-Allow-Origin", origin || "*");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/ai", aiRouter);
  app.use("/api/knowledge", knowledgeRouter);

  // 404 handler
  app.use("/api/*", (req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  // Error handling middleware - ensure all errors return JSON
  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Server error:", err);
    res.status(err.status || 500).json({
      error: err.message || "Internal server error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  // Fallback to index.html for SPA in production
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: "dist" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
