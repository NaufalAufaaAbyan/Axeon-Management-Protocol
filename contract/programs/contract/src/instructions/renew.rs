use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};
use crate::state::{GroupVault, UserSubscription};
use crate::error::AxeonErrorCode;

#[derive(Accounts)]
pub struct Renew<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        address = group_vault.admin @ AxeonErrorCode::UnauthorizedAdmin
    )]
    pub admin_wallet: SystemAccount<'info>,

    #[account(
        mut,
        seeds = [b"vault", group_vault.admin.as_ref(), group_vault.group_id.as_bytes()],
        bump = group_vault.bump
    )]
    pub group_vault: Account<'info, GroupVault>,

    #[account(
        mut,
        seeds = [b"sub", group_vault.key().as_ref(), user.key().as_ref()],
        bump = user_subscription.bump
    )]
    pub user_subscription: Account<'info, UserSubscription>,

    pub system_program: Program<'info, System>,
}

// PERUBAHAN NAMA FUNGSI DI SINI
pub fn renew_handler(ctx: Context<Renew>) -> Result<()> {
    let group_vault = &ctx.accounts.group_vault;
    let user_subscription = &mut ctx.accounts.user_subscription;
    let clock = Clock::get()?;

    invoke(
        &system_instruction::transfer(
            &ctx.accounts.user.key(),
            &ctx.accounts.admin_wallet.key(),
            group_vault.subscription_fee,
        ),
        &[
            ctx.accounts.user.to_account_info(),
            ctx.accounts.admin_wallet.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

    let current_time = clock.unix_timestamp;
    let thirty_days: i64 = 2_592_000;

    if user_subscription.expires_at > current_time {
        user_subscription.expires_at = user_subscription.expires_at.checked_add(thirty_days).ok_or(AxeonErrorCode::MathOverflow)?;
    } else {
        user_subscription.expires_at = current_time.checked_add(thirty_days).ok_or(AxeonErrorCode::MathOverflow)?;
    }

    user_subscription.is_active = true;

    msg!("Perpanjangan Sukses! Masa aktif ditambah 30 hari.");
    Ok(())
}