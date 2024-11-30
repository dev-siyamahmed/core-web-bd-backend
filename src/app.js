import cors from 'cors';
import express from 'express';
import { UsersRoutes } from './app/modules/user/user.routes.js';

const app = express();

// parsers
app.use(express.json());


// cors origin
const corsOptions = {
  // origin: ["*", "http://localhost:5173", "http://localhost:5174"],
  origin: ["*", "https://core-web-bd-front-end.vercel.app", "https://core-web-bd-front-end.vercel.app"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// application routes
app.use('/api/v1', UsersRoutes);

// Home route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Server' });
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
