import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const verifyPaymentSignature = (req: Request, res: Response, next: NextFunction): void => {
  const signature = req.headers['x-callback-signature'];
  
  // Jika tidak ada signature sama sekali
  if (!signature) {
    res.status(401).send('Missing Signature');
    return;
  }

  const payload = JSON.stringify(req.body);
  const secret = process.env.PAYMENT_GATEWAY_SECRET || 'axeon_secret_key_2026';
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  // Validasi kecocokan
  if (signature !== expectedSignature) {
    console.warn('🚨 Spoofed webhook detected and blocked!');
    res.status(401).send('Invalid Signature');
    return;
  }

  next();
};