# 🛡️ Axeon Protocol
### *Institution-Grade Subscription Infrastructure for Telegram Communities on Solana*

Axeon Protocol adalah protokol manajemen akses komunitas premium yang **non-custodial** dan **stateless**. Kami menjembatani fragmentasi antara pembayaran dunia nyata (Fiat/QRIS) dengan verifikasi on-chain di Solana, memungkinkan otomatisasi manajemen member secara desentralisasi.

---

## 📖 1. Deskripsi Project
### Apa yang dibangun?
Infrastruktur tingkat institusi untuk kreator konten dan admin komunitas premium di Telegram untuk mengelola langganan secara otomatis menggunakan Smart Contract Solana sebagai *Single Source of Truth*.

### Untuk siapa?
Kreator konten, penyedia sinyal trading, dan komunitas eksklusif yang membutuhkan sistem penagihan otomatis yang transparan dan tidak dapat dimanipulasi.

### Kenapa di Solana?
- **Speed & Low Cost:** Memungkinkan validasi akses ribuan member secara real-time dengan biaya transaksi rendah.
- **Programmable Money:** Memastikan pembayaran langganan langsung mengalir ke vault kreator secara otomatis tanpa perantara.

---

## 🛠️ 2. Tech Stack
- **Program (Smart Contract):** Rust & Anchor Framework v0.29.0
- **Frontend:** Next.js 14 (App Router), Tailwind CSS
- **Authentication:** Privy.io (Embedded Wallets & Social Login)
- **Backend Service:** Node.js (TypeScript), Telegraf.js (Bot Sentinel)
- **Environment:** Fedora Linux, Vs-Code

---

## 🏗️ 3. Arsitektur Sistem
Axeon menggunakan mekanisme **PDA (Program Derived Address)** untuk meminimalkan ketergantungan pada database tradisional (Stateless Architecture).

### Alur Kerja Utama:
1. **Registration:** Admin mendaftarkan Grup ID melalui Dashboard Web.
2. **Subscription:** User memilih paket langganan dan melakukan tanda tangan transaksi melalui Privy.
3. **On-Chain Storage:** Data disimpan dalam akun PDA dengan seeds `[b"subscriber", user_pubkey, group_id]`.
4. **Enforcement:** Bot Sentinel secara berkala mengecek status PDA di Solana. Jika expired, Bot mengeksekusi instruksi *kick* secara otomatis.

---

## 🔒 4. Fitur Keamanan (Security)
- **Signer Authorization:** Validasi di level Smart Contract memastikan hanya admin terdaftar yang bisa mengubah konfigurasi.
- **On-Chain Validation:** Pengecekan waktu kedaluwarsa dilakukan langsung menggunakan `Clock::get()?.unix_timestamp`.
- **Stateless Backend:** Backend tidak menyimpan Private Key; semua verifikasi bersifat transparan di blockchain.

---

## 🚀 5. Cara Install & Run (Lokal)

### **A. Smart Contract**
```bash
cd contract
anchor build
solana program deploy target/deploy/contract.so

---

### **B. Backend Bot**
```bash
cd backend
npm install
# Setup .env dengan TELEGRAM_BOT_TOKEN dan PROGRAM_ID
npx tsx src/index.ts

### **C. Frontend Dashboard**
```bash
cd web
npm install
npm run dev

---

## 📍 6. Contract Address
| Network | Address |
| :--- | :--- |
| **Solana Devnet** | `4UqaYx35pwj7uQPho1ggUs3z4nYBTSUfrEKAnusEGdKg` |

---

## 🔗 7. Live Demo
* **Axeon Protocol Demo:** [https://axeon-management-protocol.vercel.app](https://axeon-management-protocol.vercel.app)

---

## 👥 Tim & Kontribusi (UNAMABCC)
* **Naufal Aufaa Abyan** ([@opayybaikk](https://x.com/NaufalByann)) - 
* **Reza Dwi Wiranata** ([@rejak_](https://x.com/rezawrntaa?s=21)) - 
* **Adil Daisuke** (()) -
* **Della Selfia Riyani ((https://x.com/delluyyy07?s=11)) -
* **Superteam Indonesia Community** - Mentorship & Ecosystem Support.

---
**© 2026 Axeon Protocol.** *Built for Indonesia National Campus Hackathon.*
