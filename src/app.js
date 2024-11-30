import express from "express";
import cors from "cors";
import path from "path";
import { UsersRoutes } from "./app/modules/user/user.routes.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: ["https://core-web-bd-front-end.vercel.app"],
    // origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Include PATCH and OPTIONS
    credentials: true,
  })
);

// Application routes
app.use("/api/v1", UsersRoutes);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Server" });
});

// Serve static files from the React app
app.use(express.static(path.join(path.resolve(), "client/build")));

// Handle undefined routes (React SPA fallback)
app.use("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "client/build", "index.html"));
});

// Client-side error handler
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default app;
