import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Telegraf, Context, Markup } from 'telegraf';
import { PrismaClient } from '@prisma/client';
import paymentRoutes from './routes/payment.routes';
import { logger } from './utils/logger';

/**
 * AXEON MANAGEMENT PROTOCOL - CORE ENGINE
 * Built for Indonesia National Campus Hackathon 2026
 */

// --- 1. INITIALIZATION ---
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Configuration Guards
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GROUP_ID = process.env.TELEGRAM_GROUP_ID;
const ADMIN_ID = process.env.ADMIN_TELEGRAM_ID; 

if (!BOT_TOKEN) {
    logger.error("❌ Critical: TELEGRAM_BOT_TOKEN is missing in .env");
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// --- 2. TELEGRAM UI COMPONENTS ---

const mainMenu = Markup.inlineKeyboard([
    [
        Markup.button.callback('🛡️ Get Access Link', 'action_get_link'),
        Markup.button.callback('⏳ Subscription Status', 'action_status')
    ],
    [
        Markup.button.callback('💳 Buy/Renew License', 'action_buy'),
        Markup.button.callback('💬 Support Center', 'action_support')
    ]
]);

// --- 3. BOT MIDDLEWARE ---

// Global Activity Logger
bot.use(async (ctx: Context, next) => {
    if (ctx.from) {
        const username = ctx.from.username || ctx.from.id;
        const action = ctx.callbackQuery ? `Click Button: ${(ctx.callbackQuery as any).data}` : 'Send Message';
        logger.info(`[Bot Activity] @${username} | ${action}`);
    }
    return next();
});

// --- 4. BOT COMMAND HANDLERS ---

bot.start((ctx) => {
    return ctx.reply(
        `🛸 AXEON PROTOCOL v1.0\n` +
        `--------------------------\n` +
        `Halo ${ctx.from.first_name}!\n` +
        `Sistem manajemen komunitas terdesentralisasi lu sudah aktif.\n\n` +
        `Silakan pilih opsi di bawah:`,
        mainMenu
    );
});

bot.help((ctx) => {
    return ctx.reply('💡 Butuh bantuan? Gunakan tombol di menu /start atau hubungi admin.');
});

// --- 5. ACTION HANDLERS (CALLBACKS) ---

/**
 * GATEKEEPER: Cek validitas langganan di Database sebelum kasih link grup
 */
bot.action('action_get_link', async (ctx) => {
    try {
        await ctx.answerCbQuery("Verifying Wallet via Axeon Protocol...");
        const telegramId = ctx.from?.id.toString();

        const subscription = await prisma.subscription.findFirst({
            where: { 
                telegramId: telegramId,
                status: "ACTIVE" 
            }
        });

        if (subscription && GROUP_ID) {
            const inviteLink = await ctx.telegram.createChatInviteLink(GROUP_ID, {
                member_limit: 1,
                expire_date: Math.floor(Date.now() / 1000) + 3600 // Valid 1 jam
            });
            return ctx.reply(
                `✅ AKSES DITERIMA!\n\n` +
                `ID: ${telegramId}\n` +
                `Status: Terverifikasi (Solana On-Chain)\n\n` +
                `Silakan join melalui link eksklusif ini:\n${inviteLink.invite_link}`
            );
        } else {
            return ctx.reply(
                `❌ AKSES DITOLAK!\n\n` +
                `Data pembayaran tidak ditemukan di Axeon Vault.\n\n` +
                `Selesaikan pembayaran di: http://localhost:3000/dashboard`
            );
        }
    } catch (err) {
        logger.error("Error Get Link Action:", err);
        return ctx.reply("⚠️ Gagal memproses permintaan. Pastikan Bot adalah Admin di grup.");
    }
});

/**
 * STATUS: Ambil data real-time dari database Prisma
 */
bot.action('action_status', async (ctx) => {
    try {
        await ctx.answerCbQuery("Retrieving status...");
        const telegramId = ctx.from?.id.toString();

        const sub = await prisma.subscription.findFirst({
            where: { telegramId: telegramId },
            orderBy: { createdAt: 'desc' }
        });

        if (!sub) {
            return ctx.reply("🔍 Status: Wallet/ID anda belum terdaftar di protokol kami.");
        }

        const expiry = new Date(sub.expiryDate);
        const diffDays = Math.ceil((expiry.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

        return ctx.reply(
            `📊 AXEON SUBSCRIPTION DATA\n` +
            `--------------------------\n` +
            `• User ID : ${telegramId}\n` +
            `• Status  : ${diffDays > 0 ? '✅ ACTIVE' : '❌ EXPIRED'}\n` +
            `• Plan    : ${sub.planName || 'Premium'}\n` +
            `• Sisa    : ${diffDays > 0 ? diffDays : 0} Hari\n` +
            `• Expiry  : ${expiry.toLocaleDateString('id-ID')}\n` +
            `--------------------------\n` +
            `Verified via Solana Devnet`
        );
    } catch (err) {
        logger.error("Status Check Error:", err);
        return ctx.reply("⚠️ Gagal mengambil data status langganan.");
    }
});

bot.action('action_buy', (ctx) => {
    ctx.answerCbQuery();
    return ctx.reply("💳 Navigasi ke Axeon Dashboard untuk aktivasi lisensi:\nhttp://localhost:3000/dashboard");
});

bot.action('action_support', (ctx) => {
    ctx.answerCbQuery();
    return ctx.reply("💬 Butuh bantuan teknis? Hubungi kami di @AxeonSupport");
});

// --- 6. ADMIN COMMANDS ---

bot.command('kick', async (ctx) => {
    const senderId = ctx.from.id.toString();
    if (senderId !== ADMIN_ID) return ctx.reply("⛔ Akses ditolak: Hanya Admin yang bisa menggunakan command ini.");

    const reply = ctx.message && 'reply_to_message' in ctx.message ? ctx.message.reply_to_message : null;
    if (!reply || !reply.from) return ctx.reply("💡 Cara pakai: Balas (reply) chat user lalu ketik /kick");

    try {
        await ctx.banChatMember(reply.from.id);
        await ctx.unbanChatMember(reply.from.id); // Supaya bisa join lagi jika re-subscribe
        return ctx.reply(`✅ User @${reply.from.username || reply.from.id} telah dihapus dari grup.`);
    } catch (err) {
        logger.error("Kick Error:", err);
        return ctx.reply("❌ Gagal menendang user. Pastikan bot punya izin Admin.");
    }
});

// --- 7. EXPRESS SERVER SETUP ---

app.use(cors({ 
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
    credentials: true 
}));
app.use(express.json());

// Routes
app.use('/api/payments', paymentRoutes);

// API Health Check
app.get('/health', (_req, res) => {
    res.status(200).json({ 
        status: 'Operational', 
        service: 'Axeon Protocol Engine',
        uptime: `${Math.floor(process.uptime())}s`
    });
});

// --- 8. SERVER LIFECYCLE ---

const startServer = async () => {
    try {
        // Start Bot
        await bot.launch();
        logger.info("📡 Axeon Telegram Bot: ACTIVE (Polling)");

        // Start Express API
        app.listen(PORT, () => {
            logger.info(`🚀 Axeon API flying on http://localhost:${PORT}`);
        });
    } catch (err) {
        logger.error("Startup Failed:", err);
        process.exit(1);
    }
};

startServer();

// Graceful Shutdown
process.once('SIGINT', () => {
    bot.stop('SIGINT');
    logger.info("Server SIGINT: Bot stopped.");
});
process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
    logger.info("Server SIGTERM: Bot stopped.");
});