import { Request, Response } from 'express';
import { redis } from '../config/redis';
// Nanti kita import Telegram dan Solana service di sini

export const handleQrisWebhook = async (req: Request, res: Response): Promise<void> => {
  const { transaction_id, user_id, group_id, plan_days } = req.body;

  try {
    // 1. Cek Idempotency di Redis
    const isProcessed = await redis.get(`tx:${transaction_id}`);
    if (isProcessed) {
      console.log(`♻️ Transaction ${transaction_id} already processed. Skipping.`);
      res.status(200).send('Already Processed');
      return;
    }

    // 2. Kalkulasi Expiry Time
    const expiresAt = Math.floor(Date.now() / 1000) + (plan_days * 86400);

    // TODO: 3. Catat Hash ke Solana (Audit Log)
    console.log(`[Mock] Writing to Solana PDA for user: ${user_id}`);

    // TODO: 4. Generate Telegram Invite Link & Send via Bot
    console.log(`[Mock] Generating Telegram access for group: ${group_id}`);

    // 5. Tandai transaksi selesai di Redis (Simpan selama 24 jam)
    await redis.set(`tx:${transaction_id}`, 'done', 'EX', 86400);

    console.log(`✅ Payment ${transaction_id} processed successfully.`);
    res.status(200).send('Success');
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).send('Internal Server Error');
  }
};