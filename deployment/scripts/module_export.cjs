module.exports = [
    [
        "0x000", // The three public address for the project
        "0x000",
        "0x000"
    ],
    2 
];

// The first array contains the owners addresses
// The second element is the number of required signatures

// command to launch : 

// npx hardhat verify --network sepolia --constructor-args scripts/module_export.cjs <contract address>