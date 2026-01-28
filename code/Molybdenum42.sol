// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Molydbenum42 Token
 * @dev Implementation of the Molybdenum42 token using ERC20 and Ownable standards.
 */
contract Molydbenum42 is ERC20, Ownable {
    
    /**
     * @dev Constructor that mints the initial supply to the deployer.
     * @param initialSupply The total amount of tokens to mint (in full units).
     */
    constructor(uint256 initialSupply) ERC20("Molybdenum42", "Mo42") Ownable(msg.sender) {
        // Minting in Wei: multiply by 10^decimals to handle full token units.
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /**
     * @notice Mints new tokens to a specific address.
     * @dev Only the contract owner can call this function for evaluation purposes.
     * @param to The address that will receive the minted tokens.
     * @param amount The amount of tokens to mint (in full units).
     */
    function mint(address to, uint256 amount) public onlyOwner {
        // Minting in Wei: multiply by 10^decimals to handle full token units.
        _mint(to, amount * 10 ** decimals());
    }
}