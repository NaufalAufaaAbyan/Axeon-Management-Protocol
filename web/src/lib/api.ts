// src/lib/api.ts

export const verifyPayment = async (data: {
  signature: string;
  amount: number;
  walletAddress: string;
  currency: 'SOL' | 'USDC';
  vaultId: string;       // Target Vault (Grup Premium)
  telegramId: string;    // Target User Telegram untuk Sentinel Bot
}) => {
  try {
    const response = await fetch('http://localhost:3001/api/payments/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Axeon Backend is unreachable." };
  }
};

export const linkTelegramBot = async (groupId: string, walletAddress: string) => {
  // Placeholder: Nanti nembak ke endpoint Express lu (misal: /api/settings/telegram)
  console.log(`Linking Bot to Group: ${groupId} for ${walletAddress}`);
  return { success: true, message: "Sentinel Connected" };
};

export const getSubscribers = async (vaultId: string) => {
  // Placeholder: Nanti fetch dari DB Prisma lu (misal: /api/vaults/${vaultId}/subscribers)
  console.log(`Fetching subs for ${vaultId}`);
  return []; 
};