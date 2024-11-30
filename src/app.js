import cors from 'cors';
import express from 'express';
import { UsersRoutes } from './app/modules/user/user.routes.js';



const app = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', UsersRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Server' });
});

export default app;
