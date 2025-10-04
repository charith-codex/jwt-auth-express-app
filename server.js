import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRouter from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Server is Live!'));

app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
