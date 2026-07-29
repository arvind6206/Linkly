import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import linkRoutes from './routes/linkRoutes.js'
import redirectRoutes from './routes/redirectRoute.js'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

app.use('/api/links', linkRoutes);

app.use('/', redirectRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });