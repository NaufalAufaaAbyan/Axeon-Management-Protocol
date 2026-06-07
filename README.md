# Axeon-Management-Protocol

> Solana-based subscription infrastructure for non-custodial premium Telegram community management.

![GitHub stars](https://img.shields.io/github/stars/Opayys/Axeon-Management-Protocol?style=for-the-badge&logo=github) ![GitHub forks](https://img.shields.io/github/forks/Opayys/Axeon-Management-Protocol?style=for-the-badge&logo=github) ![GitHub issues](https://img.shields.io/github/issues/Opayys/Axeon-Management-Protocol?style=for-the-badge&logo=github) ![Last commit](https://img.shields.io/github/last-commit/Opayys/Axeon-Management-Protocol?style=for-the-badge&logo=github) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white) ![License](https://img.shields.io/badge/license-LICENSE-green?style=for-the-badge)

## 📑 Table of Contents

- [Description](#description)
- [Key Features](#key-features)
- [Use Cases](#use-cases)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Key Dependencies](#key-dependencies)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Contributing](#contributing)
- [License](#license)

## 📝 Description

Axeon Protocol is an institution-grade, non-custodial access management system designed for premium Telegram communities on the Solana blockchain. By bridging traditional payment pathways with on-chain verification, it allows creators and administrators to automate subscription billing and group membership without relying on centralized or custodial intermediaries.

## ✨ Key Features

- **🦀 Rust Anchor Smart Contract** — Manages subscription agreements directly on-chain using a customized Rust program built with the Anchor Framework.
- **🤖 Telegraf Bot Sentinel** — Monitors the Solana blockchain in the background to dynamically enforce or revoke Telegram group access based on subscriber status.
- **🔗 Stateless PDA Architecture** — Utilizes Program Derived Addresses with dedicated seeds to store subscriber information directly on the Solana ledger.
- **🔐 Privy Embedded Wallets** — Integrates social logins and embedded Web3 wallets to allow friction-free transactions and on-chain subscriptions.
- **🐻 Zustand State Management** — Implements Zustand in the client dashboard to provide lightweight, performant global state tracking.

## 🎯 Use Cases

- Automating paid subscription onboarding and automatic membership revocation for Telegram-based trading groups.
- Setting up a decentralized paywall for content creators to manage premium channels using Program Derived Addresses.
- Bridges traditional payment notifications with decentralized on-chain subscription verification.

## 🛠️ Tech Stack

- 🟨 **JavaScript**
- ⬢ **Node.js**
- 🔷 **Prisma**
- 🦀 **Rust**

**Notable libraries:** Zustand

## ⚡ Quick Start

```bash

# 1. Clone the repository
git clone https://github.com/Opayys/Axeon-Management-Protocol.git

# 2. Install dependencies
npm install

# 3. Start the dev server
cargo run
```

## 📦 Key Dependencies

```
next-themes: ^0.4.6
react-hot-toast: ^2.6.0
sonner: ^2.0.7
zustand: ^5.0.12
```

## 🚀 Available Scripts

- **test** — `make test`
- **build** — `cargo build`
- **run** — `cargo run`
- **test** — `cargo test`

## 📁 Project Structure

```
.
├── axeon_smart_contract
│   ├── Anchor.toml
│   ├── Cargo.lock
│   ├── Cargo.toml
│   ├── migrations
│   │   └── deploy.ts
│   ├── package.json
│   ├── programs
│   │   └── axeon_smart_contract
│   │       ├── Cargo.toml
│   │       └── src
│   │           ├── constants.rs
│   │           ├── error.rs
│   │           ├── instructions
│   │           │   └── ...
│   │           ├── instructions.rs
│   │           ├── lib.rs
│   │           └── state.rs
│   ├── rust-toolchain.toml
│   └── tsconfig.json
├── package.json
├── server
│   ├── dev.db
│   ├── package.json
│   ├── prisma
│   │   ├── dev.db
│   │   ├── migrations
│   │   │   ├── 20260511154437_init
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   └── schema.prisma
│   ├── src
│   │   ├── config
│   │   │   ├── prisma.ts
│   │   │   ├── solana.ts
│   │   │   └── telegram.ts
│   │   ├── controllers
│   │   │   └── payment.controller.ts
│   │   ├── index.ts
│   │   ├── routes
│   │   │   └── payment.routes.ts
│   │   ├── services
│   │   │   ├── solana.service.ts
│   │   │   └── telegram.service.ts
│   │   └── utils
│   │       └── logger.ts
│   └── tsconfig.json
└── web
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── postcss.config.mjs
    ├── src
    │   ├── app
    │   │   ├── about
    │   │   │   └── page.tsx
    │   │   ├── blog
    │   │   │   └── page.tsx
    │   │   ├── changelog
    │   │   │   └── page.tsx
    │   │   ├── dashboard
    │   │   │   ├── admin
    │   │   │   │   └── ...
    │   │   │   ├── layout.tsx
    │   │   │   └── user
    │   │   │       └── ...
    │   │   ├── docs
    │   │   │   └── page.tsx
    │   │   ├── favicon.ico
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   ├── login
    │   │   │   └── page.tsx
    │   │   ├── page.tsx
    │   │   ├── privacy
    │   │   │   └── page.tsx
    │   │   ├── security
    │   │   │   └── page.tsx
    │   │   └── terms
    │   │       └── page.tsx
    │   ├── components
    │   │   ├── PaymentSection.tsx
    │   │   ├── magic
    │   │   │   ├── ClickSpark.tsx
    │   │   │   ├── FlickeringGrid.tsx
    │   │   │   ├── GridBackground.tsx
    │   │   │   └── Shuffle.tsx
    │   │   ├── navbar
    │   │   │   └── navbar.tsx
    │   │   └── providers
    │   │       ├── ContextMenuProvider.tsx
    │   │       ├── ThemeProvider.tsx
    │   │       └── WalletContextProvider.tsx
    │   ├── idl
    │   │   └── axeon_protocol.json
    │   ├── lib
    │   │   ├── anchor.ts
    │   │   ├── api.ts
    │   │   ├── axeon_smart_contract.json
    │   │   └── dictionary.ts
    │   └── store
    │       └── useAxeonStore.ts
    └── tsconfig.json
```

## 🛠️ Development Setup

### Node.js / JavaScript
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` (or `yarn` / `pnpm install` / `bun install`)
3. Start the dev server: see the **Quick Start** above

### Rust
1. Install Rust via [rustup](https://rustup.rs/)
2. `cargo build && cargo run`

## 📜 License

This project is licensed under the **LICENSE** License.

---
