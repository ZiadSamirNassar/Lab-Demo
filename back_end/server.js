import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(), express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Medical Lab Management Server is running 🚀');
});

app.listen(PORT)