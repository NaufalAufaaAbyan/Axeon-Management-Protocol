use anchor_lang::prelude::*;

#[error_code]
pub enum AxeonErrorCode {
    #[msg("Akses ditolak: Anda bukan admin dari Vault ini.")]
    UnauthorizedAdmin,
    
    #[msg("Jumlah pembayaran tidak sesuai dengan harga langganan.")]
    InvalidPaymentAmount,
    
    #[msg("Masa aktif langganan Anda sudah habis.")]
    SubscriptionExpired,
    
    #[msg("Terjadi kesalahan perhitungan matematis (Overflow).")]
    MathOverflow,
    
    #[msg("Grup ini tidak ditemukan atau belum diinisialisasi.")]
    VaultNotInitialized,
}