import cors from 'cors';
import express from 'express';
import { UsersRoutes } from './app/modules/user/user.routes.js';



const app = express();

//parsers
app.use(express.json());

const corsOptions = {
  origin: ["*", "http://localhost:5173", "http://localhost:5174"],
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
  next(createError(404, { message: "Route not found" }));
});

// Invalid URL handler
app.get("*", (req, res) => {
  res.status(404).json({ message: "Invalid URL" });
});



export default app;
