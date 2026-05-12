import { Router } from 'express';
import { processPayment } from '../controllers/payment.controller';

const router = Router();

router.post('/verify', processPayment);

export default router;