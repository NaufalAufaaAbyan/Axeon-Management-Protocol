use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};
use crate::state::{GroupVault, UserSubscription};
use crate::error::AxeonErrorCode;

#[derive(Accounts)]
pub struct Subscribe<'info> {
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
        init,
        payer = user,
        space = UserSubscription::SPACE,
        seeds = [b"sub", group_vault.key().as_ref(), user.key().as_ref()],
        bump
    )]
    pub user_subscription: Account<'info, UserSubscription>,

    pub system_program: Program<'info, System>,
}

// PERUBAHAN NAMA FUNGSI DI SINI
pub fn subscribe_handler(ctx: Context<Subscribe>) -> Result<()> {
    let group_vault = &mut ctx.accounts.group_vault;
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

    user_subscription.user = ctx.accounts.user.key();
    user_subscription.group_vault = group_vault.key();
    user_subscription.joined_at = clock.unix_timestamp;
    user_subscription.expires_at = clock.unix_timestamp + 2_592_000; 
    user_subscription.is_active = true;
    user_subscription.bump = ctx.bumps.user_subscription;

    group_vault.total_members = group_vault.total_members.checked_add(1).ok_or(AxeonErrorCode::MathOverflow)?;

    msg!("Transaksi Sukses! Member terdaftar. Dana langsung diteruskan ke Admin.");
    Ok(())
}