import { Connection, clusterApiUrl } from '@solana/web3.js';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

export class SolanaService {
  private connection: Connection;

  constructor() {
    // Menggunakan RPC dari .env, fallback ke Devnet jika kosong
    const rpcUrl = process.env.SOLANA_RPC_URL || clusterApiUrl('devnet');
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  /**
   * Verifies SOL or Token (USDC/PYUSD) payments dynamically for any Creator
   * @param signature Transaction signature from the frontend
   * @param expectedAmount The required subscription price
   * @param currency The asset used ('SOL' or 'USDC')
   * @param recipientWallet The specific Creator's wallet address expecting the funds
   */
  async verifyPayment(signature: string, expectedAmount: number, currency: 'SOL' | 'USDC' = 'SOL', recipientWallet: string) {
    try {
      logger.info(`🔍 [Scanner] Initiating ${currency} verification: ${signature}`);

      // Fetch parsed transaction details
      const tx = await this.connection.getParsedTransaction(signature, {
        maxSupportedTransactionVersion: 0,
        commitment: 'confirmed'
      });

      if (!tx || !tx.meta) {
        return { success: false, reason: 'Transaction not found or not finalized' };
      }

      if (tx.meta.err) {
        return { success: false, reason: 'Transaction failed on-chain (Status: Error)' };
      }

      let amountReceived = 0;

      // --- SOL VERIFICATION LOGIC ---
      if (currency === 'SOL') {
        const accountKeys = tx.transaction.message.accountKeys;
        const receiverIndex = accountKeys.findIndex(acc => acc.pubkey.toBase58() === recipientWallet);

        if (receiverIndex === -1) {
          return { success: false, reason: 'Target recipient wallet not involved in this transaction' };
        }

        const preBalance = tx.meta.preBalances[receiverIndex];
        const postBalance = tx.meta.postBalances[receiverIndex];
        
        // Convert lamports to SOL
        amountReceived = (postBalance - preBalance) / 1_000_000_000;
      } 
      
      // --- TOKEN VERIFICATION LOGIC (USDC / SPL-Token) ---
      else {
        // Find token balance changes owned by the targeted recipient
        const receiverPostToken = tx.meta.postTokenBalances?.find(b => b.owner === recipientWallet);
        const receiverPreToken = tx.meta.preTokenBalances?.find(b => b.owner === recipientWallet);

        if (!receiverPostToken) {
          return { success: false, reason: 'No incoming token flow detected for the recipient wallet' };
        }

        const postAmt = receiverPostToken.uiTokenAmount.uiAmount || 0;
        const preAmt = receiverPreToken?.uiTokenAmount.uiAmount || 0;
        
        amountReceived = postAmt - preAmt;
        
        logger.info(`✅ Token detected. Mint: ${receiverPostToken.mint} | Amount: ${amountReceived}`);
      }

      logger.info(`📊 Verification Result: Detected ${amountReceived}, Expected ${expectedAmount}`);

      // Check if amount is sufficient (with minor tolerance for rounding)
      if (amountReceived < (expectedAmount - 0.000001)) {
        return { 
          success: false, 
          reason: `Insufficient funds. Received: ${amountReceived}, Expected: ${expectedAmount}` 
        };
      }

      return { success: true, amount: amountReceived };

    } catch (error) {
      const err = error as Error;
      logger.error(`❌ Solana Service Error: ${err.message}`);
      return { success: false, reason: 'Failed to connect to Solana RPC' };
    }
  }
}