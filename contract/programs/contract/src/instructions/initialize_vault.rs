use anchor_lang::prelude::*;
use crate::state::GroupVault;

#[derive(Accounts)]
#[instruction(group_id: String)]
pub struct InitializeVault<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init,
        payer = admin,
        space = GroupVault::SPACE,
        seeds = [b"vault", admin.key().as_ref(), group_id.as_bytes()],
        bump
    )]
    pub group_vault: Account<'info, GroupVault>,

    pub system_program: Program<'info, System>,
}

// PERUBAHAN NAMA FUNGSI DI SINI
pub fn initialize_vault_handler(ctx: Context<InitializeVault>, group_id: String, subscription_fee: u64) -> Result<()> {
    let vault = &mut ctx.accounts.group_vault;
    
    vault.admin = ctx.accounts.admin.key();
    vault.group_id = group_id;
    vault.subscription_fee = subscription_fee;
    vault.total_members = 0;
    vault.bump = ctx.bumps.group_vault;

    msg!("Berhasil! Brankas Grup '{}' telah aktif di Solana.", vault.group_id);
    Ok(())
}