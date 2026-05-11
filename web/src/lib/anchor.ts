import { Program, AnchorProvider, Idl } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import idl from "./axeon_program.json";

// Kalau lu butuh nge-referensi Program ID di tempat lain
export const PROGRAM_ID = new PublicKey("5z8M2zUxD7L8TcA4SuvhJKc73A69M9KyrtDpdo8Fgok");

export const getProvider = (wallet: AnchorWallet, network: string = "https://api.devnet.solana.com") => {
  const connection = new Connection(network, "confirmed");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "confirmed",
  });
  return provider;
};

export const getProgram = (provider: AnchorProvider) => {
  // Versi terbaru cuma butuh (idl, provider)
  return new Program(idl as Idl, provider);
};