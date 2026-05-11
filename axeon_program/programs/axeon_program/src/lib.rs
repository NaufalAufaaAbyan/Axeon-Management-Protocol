use anchor_lang::prelude::*;

declare_id!("5z8M2zUxD7L8TcA4SuvhJKc73A69M9KyrtDpdo8Fgok");

#[program]
pub mod axeon_program {
    use super::*;

    pub fn initialize_vault(
        ctx: Context<InitializeVault>,
        vault_name: String,
        price: u64,
        duration: i64, 
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.creator = ctx.accounts.creator.key();
        vault.name = vault_name;
        vault.price = price;
        vault.duration = duration;
        vault.total_subscribers = 0;
        vault.bump = ctx.bumps.vault;
        Ok(())
    }

    // FUNGSI BARU: User bayar langganan
    pub fn subscribe(ctx: Context<Subscribe>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        let subscriber_info = &mut ctx.accounts.subscriber_info;

        // Logika Transfer SOL dari User ke Creator
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.subscriber.key(),
            &vault.creator,
            vault.price,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.subscriber.to_account_info(),
                ctx.accounts.creator.to_account_info(),
            ],
        )?;

        // Catat data langganan
        subscriber_info.vault = vault.key();
        subscriber_info.subscriber = ctx.accounts.subscriber.key();
        subscriber_info.expiry = Clock::get()?.unix_timestamp + vault.duration;
        subscriber_info.active = true;

        vault.total_subscribers += 1;

        msg!("New Subscriber: {}", ctx.accounts.subscriber.key());
        Ok(())
    }
}

#[account]
pub struct Vault {
    pub creator: Pubkey,
    pub name: String,
    pub price: u64,
    pub duration: i64,
    pub total_subscribers: u64,
    pub bump: u8,
}

// Data per-user
#[account]
pub struct SubscriberInfo {
    pub vault: Pubkey,
    pub subscriber: Pubkey,
    pub expiry: i64,
    pub active: bool,
}

#[derive(Accounts)]
#[instruction(vault_name: String)]
pub struct InitializeVault<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + 32 + 36 + 8 + 8 + 8 + 1, 
        seeds = [b"axeon_vault", creator.key().as_ref(), vault_name.as_bytes()],
        bump
    )]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Subscribe<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,

    #[account(
        init,
        payer = subscriber,
        space = 8 + 32 + 32 + 8 + 1,
        seeds = [b"sub_info", vault.key().as_ref(), subscriber.key().as_ref()],
        bump
    )]
    pub subscriber_info: Account<'info, SubscriberInfo>,

    #[account(mut)]
    pub subscriber: Signer<'info>,

    /// CHECK: Manual validation to ensure the creator's wallet receives the subscription fee.
    /// This account is checked against the vault's stored creator address in the constraint.
    #[account(mut, constraint = creator.key() == vault.creator)]
    pub creator: UncheckedAccount<'info>, 

    pub system_program: Program<'info, System>,
}