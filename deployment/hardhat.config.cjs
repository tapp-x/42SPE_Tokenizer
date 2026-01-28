require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_URL, PRIVATE_KEY_A, PRIVATE_KEY_B, PRIVATE_KEY_C, ETHERSCNAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
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
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCNAN_API_KEY
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
};
