import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";


const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

const senderKeypaiir = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solan`
);

//npm init -y
//npm install
//npm install @solana/web3.js
//npm install dotnev --save  --?
//npm install @solana-developers/helpers

//npx esrun transfer.ts (destination wallet address)