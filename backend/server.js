import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sessionRoutes from './routes/sessionRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/sessions', sessionRoutes);

app.get('/', (req, res) => {
    res.json({ message: "API Running with modules.." });
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });