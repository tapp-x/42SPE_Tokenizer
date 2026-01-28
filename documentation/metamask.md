# MetaMask Setup & Sepolia Faucet

To interact with the Molybdenum42 token and the Multisig wallet on the Ethereum Sepolia Testnet, follow these configuration steps.

### 1. Enable or Add Sepolia Test Network
Sepolia is a default test network in MetaMask. 
- Open MetaMask.
- Click the network selector (top left).
- Toggle **"Show test networks"** to **ON**.
- Select **Sepolia** from the list.

**Manual Configuration (if not visible):**
https://revoke.cash/learn/wallets/add-network/ethereum-sepolia

### 2. Manage Multiple Accounts (Multisig Consensus)
To demonstrate the Multisig functionality, you must simulate the consensus between different owners .
- Click your profile icon in MetaMask.
- Select **"Create Account"** to generate **Account 2** and **Account 3**.
- Ensure these addresses match the `ownersAddresses` defined in your deployment script.
- You will need to switch between these accounts to **confirm** a transaction before it can be **executed** .

### 3. Get Sepolia ETH (Faucet)
You need SepoliaETH to pay for the "Gas" required to submit, confirm, and execute transactions.
Go to this website, paste your address and wait with the cat. 
https://sepolia-faucet.pk910.de/

### 4. Import the Mo42 Token
Once the token is deployed:
- Go to the **"Assets"** (or **"Tokens"**) tab in MetaMask.
- Click **"Import Tokens"**.
- Paste the `Molybdenum42` contract address.
- The symbol **Mo42** and decimals **18** should auto-fill. 