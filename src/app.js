import express from 'express';
import cors from 'cors';
import { UsersRoutes } from './app/modules/user/user.routes.js';

const app = express();

// parsers
app.use(express.json());

app.use(
  cors({
    origin: ["https://core-web-bd-front-end.vercel.app"], // Add your frontend's deployed URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Include all allowed methods
    credentials: true,
  })
);

// cors origin
// const corsOptions = {
//   origin: [
//     'https://core-web-bd-front-end.vercel.app',  // Production
//     // 'http://localhost:5173'                      // Local Development
//   ],
//   credentials: true,
//   optionSuccessStatus: 200,
// };


// app.use(cors(corsOptions));

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
