import express from "express";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import { authRouter } from "./server/routes/auth.js";
import { aiRouter } from "./server/routes/ai.js";
import { knowledgeRouter } from "./server/routes/knowledge.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/ai", aiRouter);
  app.use("/api/knowledge", knowledgeRouter);

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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
