// SPDX-License-Identifier: MIT

const { ethers } = require("hardhat");
require("dotenv").config();

/**
 * Main deployment script for Multisig and Molybdenum42 contracts.
 */
async function main() {
    // Set up provider and deployer address.
    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
    const deployer = (await ethers.provider.getSigner()).getAddress();

    // Initialize the three owners for the multisig contract.
    const owner1 = new ethers.Wallet(process.env.PRIVATE_KEY_A, provider);
    const owner2 = new ethers.Wallet(process.env.PRIVATE_KEY_B, provider);
    const owner3 = new ethers.Wallet(process.env.PRIVATE_KEY_C, provider);

    const ownersAddresses = [
        owner1.getAddress(),
        owner2.getAddress(),
        owner3.getAddress()
    ];

    /* * LOCALHOST TESTING BLOCK
    * const [deployer] = await ethers.getSigners();
    * console.log("Deployer : ", deployer)
    * const provider = ethers.provider;
    * console.log(provider);
    * const ownersAddresses = [
    * "",
    * "", // your addresses
    * ""
    * ];
    */
    
    console.log("Owners : ", ownersAddresses);
    
    const requiredSignatures = 2;
    const decimals = 18;

    // --- Multisig Deployment ---
    const Multisig = await ethers.getContractFactory("Multisig", deployer);
    const multisig = await Multisig.deploy(ownersAddresses, requiredSignatures);
    console.log("Awaiting Multisig deployment...");
    await multisig.waitForDeployment();
    const addressMultisig = await multisig.getAddress();
    console.log("Multisig contract deployed at:", addressMultisig);
    
    // --- Token Deployment ---
    const initialSupply = 42000000;
    const multisigSupply = 40000000;
    
    const Token = await ethers.getContractFactory("Molydbenum42", deployer);
    console.log("Awaiting Token deployment...");
    const token = await Token.deploy(initialSupply);
    await token.waitForDeployment();
    const addressToken = await token.getAddress();
    console.log("Token contract deployed at:", addressToken);

    // --- Distribution and Ownership Transfer ---
    console.log("Starting token distribution...");
    // Use parseUnits to handle decimals and prevent overflow.
    const tx1 = await token.transfer(addressMultisig, ethers.parseUnits(multisigSupply.toString(), decimals)); 
    await tx1.wait();
    console.log(`Transferred ${multisigSupply} tokens to multisig: ${addressMultisig}`);

    console.log("Transferring token contract ownership to multisig...");
    const tx = await token.transferOwnership(addressMultisig);
    await tx.wait();
    console.log("Ownership successfully transferred to multisig.");
}

main()
.then(() => console.log("Deployment process finished successfully."))
.catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
});