import axios from 'axios';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

export class TelegramService {
  private botToken = process.env.TELEGRAM_BOT_TOKEN;
  private baseUrl = `https://api.telegram.org/bot${this.botToken}`;

  /**
   * Generates a unique, one-time use Telegram invite link.
   * @param groupId The target Telegram Group ID (Dynamic from Database)
   * @param walletAddress The subscriber's verified wallet address
   */
  async createUniqueInviteLink(groupId: string, walletAddress: string) {
    try {
      logger.info(`🤖 Requesting Telegram invite link for wallet: ${walletAddress} in group: ${groupId}`);

      // Hit Telegram API to create a single-use invite link
      const response = await axios.post(`${this.baseUrl}/createChatInviteLink`, {
        chat_id: groupId,
        name: `Axeon Access - ${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`,
        member_limit: 1, // Link expires after 1 use
        expire_date: Math.floor(Date.now() / 1000) + (3600 * 24), // Link expires in 24 hours if unused
      });

      if (response.data.ok) {
        logger.info(`✅ Telegram invite link generated successfully!`);
        return {
          success: true,
          inviteLink: response.data.result.invite_link
        };
      }

      return { success: false, reason: 'Failed to get a valid response from Telegram API' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(`❌ Telegram API Error: ${error.response?.data?.description || error.message}`);
      } else {
        logger.error(`❌ Unknown Telegram Error: ${(error as Error).message}`);
      }
      return { success: false, reason: 'Internal error during Telegram communication' };
    }
  }

  /**
   * Kicks a member when their subscription expires (To be used by Cron Job).
   * @param groupId The target Telegram Group ID (Dynamic from Database)
   * @param userId The Telegram User ID to be kicked
   */
  async kickMember(groupId: string, userId: string) {
    try {
      // Ban member from the group
      await axios.post(`${this.baseUrl}/banChatMember`, {
        chat_id: groupId,
        user_id: userId,
        revoke_messages: false
      });
      
      // Immediately unban so they aren't blacklisted forever,
      // allowing them to rejoin if they renew their subscription.
      await axios.post(`${this.baseUrl}/unbanChatMember`, {
        chat_id: groupId,
        user_id: userId
      });
      
      logger.info(`👢 Member ${userId} successfully kicked due to expired subscription.`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(`❌ Failed to kick member: ${error.response?.data?.description || error.message}`);
      } else {
        logger.error(`❌ Unknown Error during kick: ${(error as Error).message}`);
      }
    }
  }
}