# Molybdenum42 (Mo42) Token

## ERC20 Standard
This token implements the **ERC20** standard, ensuring compatibility with major wallets and exchanges.

## Features
* **Total Supply**: $42,000,000$ Mo42.
* **Initial Distribution**: $40,000,000$ Mo42 are held by the Multisig wallet for secure management.
* **Controlled Minting**: The `mint` function allows for the creation of new tokens, but it is strictly limited to the contract owner (the Multisig).

## Interacting with the Token
* **Add to MetaMask**: Use the Contract Address below and the ticker **Mo42**.
* **Standard Transfers**: Users can use the `transfer` function to send Mo42 to any valid address.

## Security Design
The token uses the **Ownable** pattern. Upon deployment, the `transferOwnership` function was called to grant full administrative control to the Multisig contract.

**Contract Address**: `0xB29a1A1F5Ea46D9e9819DcE573D58706f442817a`

# Whitepaper:

## 1. Introduction
Molybdenum42 is a decentralized digital asset built on the Ethereum Sepolia Testnet. The project is named after the chemical element Molybdenum (atomic number 42, nothing more ...).

## 2. Tokenomics
- **Token Name**: Molybdenum42
- **Symbol**: Mo42
- **Standard**: ERC20 (OpenZeppelin)
- **Decimals**: 18
- **Total Supply**: 42,000,000 Mo42 (but still mintable)
- **Initial Distribution**: 40,000,000 tokens are held by the Multisig vault for secure management, 2,000,000 left on deployer hands for demo purposes.

## 3. Security Architecture
The core philosophy of Mo42 is decentralized security. 
- **Ownership**: The token contract ownership has been transferred to a Multisig wallet.
- **Privileges**: Critical functions like `mint` can only be executed via a consensus of multiple authorized owners.

## 4. Multisig Consensus Mechanism
To ensure the safety of high-value assets, every sensitive transaction requires:
- **Submission**: Proposed by one owner.
- **Validation**: Confirmed by at least 2 out of 3 owners.
- **Execution**: Finalized on-chain once the threshold is met.
But anyone who hold some token can interact with it like any othe ERC20 token (transfer etc ...).

## 5. Technical Stack
- **Language**: Solidity ^0.8.28
- **Framework**: Hardhat
- **Library**: OpenZeppelin Contracts (Access, ERC20)
- **Network**: Ethereum Sepolia Testnet