import express, { Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import { authRouter } from "./server/routes/auth.js";
import { aiRouter } from "./server/routes/ai.js";
import { knowledgeRouter } from "./server/routes/knowledge.js";

// Wrapper to catch async errors in route handlers
const asyncHandler = (fn: (req: any, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error("Async route error:", error);
      if (!res.headersSent) {
        res.status(500).json({ 
          error: error?.message || "Internal server error",
          ...(process.env.NODE_ENV === "development" && { stack: error?.stack })
        });
      }
    });
  };
};

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

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/ai", aiRouter);
  app.use("/api/knowledge", knowledgeRouter);

  // 404 handler for API routes
  app.use("/api/*", (req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  // Error handling middleware - ensure all errors return JSON
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal server error";
    
    console.error(`[${status}] ${message}`, err);
    
    if (!res.headersSent) {
      res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    // In development, Vite handles HTML via middleware
  } else {
    app.use(express.static("dist"));
    // Fallback to index.html for SPA in production
    app.get("*", (req, res) => {
      try {
        res.sendFile("index.html", { root: "dist" });
      } catch (error: any) {
        console.error("Failed to send index.html:", error);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to load application" });
        }
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
