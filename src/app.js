import cors from 'cors';
import express from 'express';



const app = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Server' });
});

export default app;
