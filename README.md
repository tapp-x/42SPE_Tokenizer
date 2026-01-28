# 42SPE_Tokenizer
This 42 project aims to create its own token on Web 3 (blockchain of our choice).

## My choices

Name : I chose Molybdenum42 simply because it is element 42 in the periodic table, nothing more...

Eth : the most well-known, most documented blockchain with the largest community

Sepolia : A testnet that I had already tried out and which has small, very accessible POW faucets. Ideal for getting tokens quickly and easily, and benefits from Ethereum tools such as the Etherscan explorer.

Hardhat : I chose Hardhat because I found it easy to use before, but the switch from version 2 to version 3 caused me quite a few problems during the project.

## How to redeploy a token

### Requirements

- get sepolia api key 

- get token on sepolia faucet 

- add metamask to your browser and create at least 3 accounts

- get etherscan api key

### Process

- init a npm projet
- install depedencies
- add hardhat (v2)
- init a hardhat project
- store the 2 contracts in "contracts" folder
- add the deploy scripts in the "scripts" folder
- fill the .env example with your keys / address
- run tests if you want with
```
npx hardhat test
```
- and then launch the scrip : 
```bash
npx hardhat run ./scripts/deploy.cjs --network < localhost /or/ sepolia >
```

## Documentation

You can find documentation specific to the token and multisig contract in the documentation folder.

## Token 

My token CA : 
```
0xB29a1A1F5Ea46D9e9819DcE573D58706f442817a
```
The token is deployed on the sepolia testnet and can be found here : https://sepolia.etherscan.io/address/0xb29a1a1f5ea46d9e9819dce573d58706f442817a

## Multisig 

CA:
```
0x76286AA80082699A56F76c96B59288393D343e89
```
The multisig contract can be found here : https://sepolia.etherscan.io/address/0x76286AA80082699A56F76c96B59288393D343e89
