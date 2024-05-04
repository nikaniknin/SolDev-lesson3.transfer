import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";


const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

const senderKeypaiir = getKeypairFromEnvironment("SECRET_KEY");

console.log(`fromPubkey: ${senderKeypaiir.publicKey}`);

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

//const bal = 
//check balance before transfer


const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const senderBlanceBeforeLamports = await connection.getBalance(senderKeypaiir.publicKey);
const receiverBalanceiBeforeLamports = await connection.getBalance(toPubkey);

const senderBlanceBeforeSOL = senderBlanceBeforeLamports / LAMPORTS_PER_SOL;
const receiverBalanceiBeforeSOL = receiverBalanceiBeforeLamports / LAMPORTS_PER_SOL;

console.log(`💰 Balance for Sender ${senderKeypaiir.publicKey} is ${senderBlanceBeforeSOL}!`);
console.log(`💰 Balance for Receiver ${toPubkey} is ${receiverBalanceiBeforeSOL}!`);

