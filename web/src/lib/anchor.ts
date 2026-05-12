import { Program, AnchorProvider, Idl } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import idl from "./axeon_smart_contract.json";

export const PROGRAM_ID = new PublicKey("AUDVu7j6i6BoVSR1VRYHzyzWztJuJhG3d3DGYN8hjy3g");

export const getProvider = (wallet: AnchorWallet, rpcEndpoint?: string) => {
  const connection = new Connection(
    rpcEndpoint || "https://api.devnet.solana.com",
    "confirmed"
  );

  return new AnchorProvider(connection, wallet, {
    preflightCommitment: "confirmed",
    commitment: "confirmed",
  });
};

export const getProgram = (provider: AnchorProvider) => {
  return new Program(idl as Idl, provider);
};