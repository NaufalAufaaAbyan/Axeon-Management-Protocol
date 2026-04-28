use anchor_lang::prelude::*;

pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("GYNmNqL6epMSAJe61FEW146UNZPzDSKNvRCtB1UN22t2"); 

#[program]
pub mod axeon_protocol {
    use super::*;

    pub fn initialize_vault(ctx: Context<InitializeVault>, group_id: String, subscription_fee: u64) -> Result<()> {
        // Panggil fungsi yang namanya sudah diubah
        initialize_vault_handler(ctx, group_id, subscription_fee)
    }

    pub fn subscribe(ctx: Context<Subscribe>) -> Result<()> {
        subscribe_handler(ctx)
    }

    pub fn renew(ctx: Context<Renew>) -> Result<()> {
        renew_handler(ctx)
    }
}