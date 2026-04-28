use anchor_lang::prelude::*;

/// -----------------------------------
/// STATE: GROUP VAULT (BRANKAS ADMIN)
/// -----------------------------------
#[account]
pub struct GroupVault {
    pub admin: Pubkey,          // Dompet admin yang bikin grup
    pub group_id: String,       // ID Unik Grup (Bisa dari Telegram Chat ID)
    pub subscription_fee: u64,  // Harga langganan (dalam satuan terkecil, misal lamports/USDC desimal)
    pub token_mint: Pubkey,     // Jenis token yang diterima (Pubkey USDC)
    pub total_members: u32,     // Total member aktif saat ini
    pub bump: u8,               // Bump seed untuk keamanan PDA
}

impl GroupVault {
    // Menghitung ukuran ruang yang dibutuhkan di blockchain
    // 8 bytes discriminator + 32 (Pubkey) + 32 (String max length) + 8 (u64) + 32 (Pubkey) + 4 (u32) + 1 (u8)
    pub const SPACE: usize = 8 + 32 + 32 + 8 + 32 + 4 + 1;
}

/// -----------------------------------
/// STATE: USER SUBSCRIPTION (KARTU MEMBER)
/// -----------------------------------
#[account]
pub struct UserSubscription {
    pub user: Pubkey,           // Dompet member yang berlangganan
    pub group_vault: Pubkey,    // Mengacu ke brankas grup mana
    pub joined_at: i64,         // Kapan pertama kali join (Unix Timestamp)
    pub expires_at: i64,        // Kapan masa aktif habis (Unix Timestamp)
    pub is_active: bool,        // Status aktif/tidak (membantu Sentinel Bot membaca status)
    pub bump: u8,               // Bump seed PDA
}

impl UserSubscription {
    // 8 bytes discriminator + 32 (Pubkey) + 32 (Pubkey) + 8 (i64) + 8 (i64) + 1 (bool) + 1 (u8)
    pub const SPACE: usize = 8 + 32 + 32 + 8 + 8 + 1 + 1;
}