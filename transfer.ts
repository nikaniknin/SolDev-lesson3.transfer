import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    LAMPORTS_PER_SOL,

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

console.log(`💰 Balance before transaction for Sender ${senderKeypaiir.publicKey} is ${senderBlanceBeforeSOL}!`);
console.log(`💰 Balance before transaction for Receiver ${toPubkey} is ${receiverBalanceiBeforeSOL}!`);

//create transaction 
const transaction = new Transaction();

const LAMPORTS_TO_SEND = 70000;

// create instruction 1
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypaiir.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND
});
// get time of the Transaction-start
const startTime = new Date().getTime();

//add instruction to transaction
transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypaiir]); //connection, tranasction, payer

// get time of the Transaction-end
const endTime = new Date().getTime();

console.log(`💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `);

// print transaction-time
console.log(`Transaction time: ${endTime - startTime} ms`);

console.log(`Transaction signature is ${signature}!`);

//check balance after transfer - doesnt work - run separate instruction: npx esrun transfer_get_balance.ts Dv4BH6DY91Y2rXsXKgXYgvc4pVAhFKA6zvhXVG8eXGjQ
//console.log(`💰 Balance after transaction for Sender ${senderKeypaiir.publicKey} is ${senderBlanceBeforeSOL}!`);
//console.log(`💰 Balance after transaction for Receiver ${toPubkey} is ${receiverBalanceiBeforeSOL}!`);


//Instructions:
//npm init -y
//npm install
//npm install @solana/web3.js
//npm install dotnev --save  --?
//npm install @solana-developers/helpers

//Running code
//npx esrun transfer.ts (destination wallet address)
//npx esrun transfer.ts Dv4BH6DY91Y2rXsXKgXYgvc4pVAhFKA6zvhXVG8eXGjQ
//to check balance after transaction: npx esrun transfer_get_balance.ts Dv4BH6DY91Y2rXsXKgXYgvc4pVAhFKA6zvhXVG8eXGjQ

//https://solscan.io/tx/4T6iFv42pGr8MSYfeaMfDoP7NDD759ETE7xsSFhU55pgnnRDBviJDvrU51CN3jL9ErBLDmEPPWiMWfjLcvvhvvgS?cluster=devnet

//transfer 5000, fee 5000.

/*
Challenge - Answer the following questions:

1. How much SOL did the transfer take? What is this in USD?
Answer: Fee was 0.000005 SOL ($0.000722) - the same, no matter how much was the transfer

2. Can you find your transaction on https://explorer.solana.com? Remember we are using the devnet network.
Answer: https://solscan.io/tx/4T6iFv42pGr8MSYfeaMfDoP7NDD759ETE7xsSFhU55pgnnRDBviJDvrU51CN3jL9ErBLDmEPPWiMWfjLcvvhvvgS?cluster=devnet
https://solscan.io/tx/4LdtCMK5a6M4fPHKTbLTLFLvox62QHrAiNV6dHaXhy6uJZhQAyTWLHFMRWUWv8Ln7C78j1whJqPCp6jTpPXK8zgs?cluster=devnet

3. How long does the transfer take?
Answer: around 1640

4. What do you think "confirmed" means?
Answer: done, approved and written ti the network
*/