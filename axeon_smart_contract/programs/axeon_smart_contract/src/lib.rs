use anchor_lang::prelude::*;

declare_id!("AUDVu7j6i6BoVSR1VRYHzyzWztJuJhG3d3DGYN8hjy3g");

#[program]
pub mod axeon_smart_contract {
    use super::*;

    pub fn initialize_vault(
        ctx: Context<InitializeVault>,
        name: String,
        price: u64,
        duration: i64,
    ) -> Result<()> {
        // Validasi panjang nama maksimal 64 karakter
        require!(name.len() <= 64, VaultError::NameTooLong);
        require!(!name.trim().is_empty(), VaultError::NameEmpty);
        require!(price > 0, VaultError::InvalidPrice);

        let vault = &mut ctx.accounts.vault;

        vault.creator = ctx.accounts.creator.key();
        vault.name = name.clone();
        vault.price = price;
        vault.duration = duration;
        vault.bump = ctx.bumps.vault;

        msg!("Axeon Vault '{}' deployed by {}", vault.name, vault.creator);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct InitializeVault<'info> {
    #[account(
        init,
        payer = creator,
        // 8  discriminator
        // 32 creator pubkey
        // 4  string length prefix + 64 max name bytes
        // 8  price u64
        // 8  duration i64
        // 1  bump u8
        space = 8 + 32 + (4 + 64) + 8 + 8 + 1,
        seeds = [b"axeon_vault", creator.key().as_ref(), name.as_bytes()],
        bump
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub creator: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Vault {
    pub creator: Pubkey,   // 32
    pub name: String,      // 4 + 64
    pub price: u64,        // 8
    pub duration: i64,     // 8
    pub bump: u8,          // 1
}

#[error_code]
pub enum VaultError {
    #[msg("Vault name cannot be empty.")]
    NameEmpty,
    #[msg("Vault name exceeds 64 characters.")]
    NameTooLong,
    #[msg("Price must be greater than zero.")]
    InvalidPrice,
}