const { ethers } = require("hardhat");

async function main() {
    const deployer = (await ethers.provider.getSigner()).getAddress();
    const Molybdenum42 = await ethers.getContractFactory("Molydbenum42", deployer);
    const to = "here enter an address"; // Replace with the desired recipient address
    const amount = ethers.parseUnits("1000", 18);

    const fragment = Molybdenum42.interface.getFunction("transfer"); // Here you can change the function name
    const data = Molybdenum42.interface.encodeFunctionData(fragment, [to, amount]);

    console.log("Données encodées pour le Multisig :");
    console.log(data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});