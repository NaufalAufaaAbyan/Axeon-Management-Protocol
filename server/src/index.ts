import express from 'express';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// 1. Inisialisasi Bot Sentinel
if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined in .env');
}
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// 2. Command Dasar buat Testing
bot.start((ctx) => {
  ctx.reply('Axeon Sentinel Bot is online and ready to guard the vault! 🛡️');
});

bot.command('ping', (ctx) => {
  ctx.reply('PONG! Backend Orchestrator is connected.');
});

// 3. Jalankan Bot (Long Polling)
bot.launch().then(() => {
  console.log('🤖 Telegram Sentinel Bot is running...');
}).catch((err) => {
  console.error('Failed to start bot:', err);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// 4. Jalankan Server Express
app.listen(port, () => {
  console.log(`🚀 Axeon Orchestrator Backend running on port ${port}`);
});