import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import paymentRoutes from './routes/payment.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'], // Mengizinkan akses HANYA dari frontend lu
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/payments', paymentRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Axeon Server is Active',
    version: '1.0.0-hackathon-ready'
  });
});

app.listen(PORT, () => {
  logger.info(`🚀 Axeon Backend (Prisma) flying on http://localhost:${PORT}`);
});