require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_URL, PRIVATE_KEY_A, PRIVATE_KEY_B, PRIVATE_KEY_C, ETHERSCNAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./code",
    tests: "./deployment/test",
    scripts: "./deployment/scripts"
  },
  networks: {
    hardhat: {
    },
    sepolia: {
      url: ALCHEMY_URL,
      accounts: [PRIVATE_KEY_A, PRIVATE_KEY_B, PRIVATE_KEY_C]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://docs.etherscan.io/getting-an-api-key
    apiKey: ETHERSCNAN_API_KEY
  },
  sourcify: {
    enabled: true
  }
};
