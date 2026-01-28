# 42SPE_Tokenizer
This 42 project aims to create its own token on Web 3 (blockchain of our choice).

## My choices

**Name**: I chose **Molybdenum42** simply because it is element 42 in the periodic table.

**Eth**: The most well-known, most documented blockchain with the largest community.

**Sepolia**: A testnet that offers small, accessible POW faucets. Ideal for testing efficiently and benefits from Ethereum tools such as the Etherscan explorer.

**Hardhat**: Chosen for its flexibility and powerful testing environment.

## How to use & redeploy

### Requirements

- Node.js & npm installed
- A **Sepolia API Key** (Alchemy or Infura)
- A **Etherscan API Key** (for verification)
- A **Wallet Private Key** (Metamask) with some Sepolia ETH.

### Installation & Setup

1. **Install dependencies:**
```bash
npm install
```
Environment Variables:

Rename .env.example to .env (or create a new .env file).

Fill in your keys (API Keys and Private Key) as requested in the file.

Commands

To run the tests: Tests are located in deployment/test. Run them with:
```Bash
npx hardhat test
```
To deploy the token: The deployment script is located in deployment/scripts.
```Bash
npx hardhat run ./deployment/scripts/deploy.cjs --network sepolia
```
(You can use --network localhost if you are running a local node)
Documentation

You can find detailed documentation specific to the token architecture and the multisig contract in the documentation/ folder.
Deployed Token (Mandatory)

Token Name: Molybdenum42 (MOL42) Contract Address:

```
0xB29a1A1F5Ea46D9e9819DcE573D58706f442817a
```

Explorer Link: https://sepolia.etherscan.io/address/0x76286AA80082699A56F76c96B59288393D343e89

Multisig
Contract Address:

```
0x76286AA80082699A56F76c96B59288393D343e89
```

Explorer Link: https://sepolia.etherscan.io/address/0x76286AA80082699A56F76c96B59288393D343e89