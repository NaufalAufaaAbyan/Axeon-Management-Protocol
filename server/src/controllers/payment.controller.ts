import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { SolanaService } from '../services/solana.service';
import { TelegramService } from '../services/telegram.service';
import prisma from '../config/prisma';
import { addMonths } from 'date-fns';

const solanaService = new SolanaService();
const telegramService = new TelegramService();

export const processPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Extract payload from Frontend (Sekarang nangkep telegramId juga)
    const { signature, amount, walletAddress, vaultId, telegramId, currency = 'SOL' } = req.body;

    if (!signature || !amount || !walletAddress || !vaultId || !telegramId) {
      res.status(400).json({ success: false, message: "Incomplete payload detected. Please provide Telegram ID." });
      return;
    }

    logger.info(`Processing ${currency} payment from: ${walletAddress} (TG: ${telegramId}) for Vault: ${vaultId}`);

    // 2. Find Vault and Creator in Database
    const vault = await prisma.vault.findUnique({
      where: { id: vaultId },
      include: { creator: true } 
    });

    if (!vault || !vault.creator.telegramGroupId) {
       res.status(404).json({ success: false, message: "Vault or Telegram Sentinel not configured by Creator." });
       return;
    }

    // 3. Verify Transaction on Solana
    const verification = await solanaService.verifyPayment(signature, amount, currency, vault.creatorWallet);
    
    if (!verification.success) {
      logger.warn(`Solana Verification Failed: ${verification.reason}`);
      res.status(400).json({ success: false, message: verification.reason });
      return;
    }

    // 4. Generate Telegram Link
    const telegram = await telegramService.createUniqueInviteLink(vault.creator.telegramGroupId, walletAddress);
    
    if (!telegram.success) {
      res.status(500).json({ success: false, message: "Payment valid, but Sentinel failed to generate link." });
      return;
    }

    // 5. Save Subscription Status to Database (Termasuk telegramId)
    await prisma.subscription.create({
      data: {
        userWallet: walletAddress,
        telegramId: telegramId,
        vaultId: vaultId,
        txSignature: signature,
        expiryDate: addMonths(new Date(), 1),
        status: "ACTIVE"
      }
    });

    logger.info(`Access Granted. Link sent to ${walletAddress}`);
    
    // 6. Send Access Ticket to Frontend
    res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
      inviteLink: telegram.inviteLink
    });

  } catch (error) {
    const err = error as Error;
    logger.error(`Fatal Exception: ${err.message}`);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};