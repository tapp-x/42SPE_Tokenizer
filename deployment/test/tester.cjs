//SPDX-License-Identifier: MIT

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tokenizer 42 Project - Molybdenum42 Contract", function () {
    let Molybdenum42, molybdenum42;
    let Multisig, multisig;
    let owner1, owner2, owner3, otherAccount;

    const quorum = 2; // Number of required signatures

    beforeEach(async function () {
        [owner1, owner2, owner3, otherAccount] = await ethers.getSigners();

        Multisig = await ethers.getContractFactory("Multisig");
        multisig = await Multisig.deploy([owner1.address, owner2.address, owner3.address], quorum);
        Token = await ethers.getContractFactory("Molydbenum42");
        token = await Token.deploy(1000);

        await token.transferOwnership(multisig.target);
    });

    // Tests for mandatory part
    describe("Mandatory part : Token Molybdenum42", function () {
        it("The name must contain '42'", async function () {
            expect(await token.name()).to.contain("42");
        });

        it("A random account can't mint", async function () {
            const amount = 100;
            await expect(token.connect(otherAccount).mint(otherAccount.address, ethers.parseUnits(amount.toString(), 18)))
                .to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
        });
    });

    // Tests for bonus part : multisig
    describe("Bonus part: Multisig Security", function () {
            // The transaction is expected to fail because msg.sender is not the owner (multisig).
        it("Quorum of signatures must be reached for minting.", async function () {
            const mintAmount = 100;

            const payload = token.interface.encodeFunctionData("mint", [otherAccount.address, mintAmount]);
            await multisig.connect(owner1).submitTransaction(token.target, 0, payload);
            await multisig.connect(owner1).confirmTransaction(0);
            await expect(multisig.connect(owner1).executeTransaction(0))
                .to.be.revertedWith("Not enough confirmations");
            await multisig.connect(owner2).confirmTransaction(0);
            await multisig.connect(owner1).executeTransaction(0);
            expect(await token.balanceOf(otherAccount.address)).to.equal(ethers.parseUnits(mintAmount.toString(), 18));
        });

        it("The mulstisig contract can send token to another account.", async function () {
            const transferAmount = 50;
            const mintAmount = 100;

            // First mint some tokens to the multisig contract
            let mintPayload = token.interface.encodeFunctionData("mint", [multisig.target, mintAmount]);
            await multisig.connect(owner1).submitTransaction(token.target, 0, mintPayload);
            await multisig.connect(owner1).confirmTransaction(0);
            await multisig.connect(owner2).confirmTransaction(0);
            await multisig.connect(owner1).executeTransaction(0);
            expect(await token.balanceOf(multisig.target)).to.equal(ethers.parseUnits(mintAmount.toString(), 18));

            // Then transfer some tokens to otherAccount
            const transferPayload = token.interface.encodeFunctionData("transfer", [otherAccount.address, transferAmount]);
            await multisig.connect(owner1).submitTransaction(token.target, 0, transferPayload);
            await multisig.connect(owner2).confirmTransaction(1);
            await multisig.connect(owner3).confirmTransaction(1);
            await multisig.connect(owner1).executeTransaction(1);
            expect(await token.balanceOf(otherAccount.address)).to.equal(transferAmount);
        });

        it("Non-owners cannot submit, confirm, or execute transactions.", async function () {
            const mintAmount = 100;
            const payload = token.interface.encodeFunctionData("mint", [otherAccount.address, mintAmount]);

            await expect(multisig.connect(otherAccount).submitTransaction(token.target, 0, payload))
                .to.be.revertedWith("Not owner");
            await multisig.connect(owner1).submitTransaction(token.target, 0, payload);
            await expect(multisig.connect(otherAccount).confirmTransaction(0))
                .to.be.revertedWith("Not owner");
            await multisig.connect(owner1).confirmTransaction(0);
            await expect(multisig.connect(otherAccount).executeTransaction(0))
                .to.be.revertedWith("Not owner");
        });
    });
});