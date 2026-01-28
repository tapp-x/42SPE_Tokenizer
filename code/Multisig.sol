// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Multisig Wallet
 * @dev Contract allowing owners to submit, confirm, and execute transactions after consensus.
 */
contract Multisig is Ownable {
    // --- State Variables ---
    
    address[] public owners; // List of authorized addresses
    uint256 public requiredConfirmations; // Number of required signatures for execution

    struct Transaction {
        address to; // Call destination
        uint256 value; // Amount in Wei to send
        bytes data; // Call data for contract interaction
        bool executed; // Execution status
        uint256 confirmations; // Current signature count
    }

    Transaction[] public transactions;
    // Mapping: txIndex => ownerAddress => hasConfirmed
    mapping(uint256 => mapping(address => bool)) public isConfirmed;
    // Mapping for quick owner membership verification
    mapping(address => bool) public isOwner;

    // --- Events ---

    event SubmitTransaction(address indexed owner, uint256 indexed txIndex, address indexed to, uint256 value, bytes data);
    event ConfirmTransaction(address indexed owner, uint256 indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint256 indexed txIndex);

    /**
     * @param _owners List of initial owners
     * @param _requiredConfirmations Number of required signatures
     */
    constructor(address[] memory _owners, uint256 _requiredConfirmations) Ownable(msg.sender) {
        require(_owners.length > 0, "Owners required");
        require(
            _requiredConfirmations > 0 && _requiredConfirmations <= _owners.length,
            "Invalid number of required confirmations"
        );

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }
        requiredConfirmations = _requiredConfirmations;
    }

    // --- Modifiers ---

    modifier onlyMultisigOwner() {
        require(isOwner[msg.sender], "Not owner");
        _;
    }

    modifier txExists(uint256 _txIndex) {
        require(_txIndex < transactions.length, "Transaction does not exist");
        _;
    }

    modifier notExecuted(uint256 _txIndex) {
        require(!transactions[_txIndex].executed, "Transaction already executed");
        _;
    }

    modifier notConfirmed(uint256 _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "Transaction already confirmed");
        _;
    }

    /**
     * @notice Proposes a new transaction.
     */
    function submitTransaction(
        address _to,
        uint256 _value,
        bytes memory _data
    ) public onlyMultisigOwner {
        uint256 txIndex = transactions.length;
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                confirmations: 0
            })
        );
        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    /**
     * @notice Approves a pending transaction.
     */
    function confirmTransaction(uint256 _txIndex)
        public
        onlyMultisigOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.confirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    /**
     * @notice Executes the transaction if the signature threshold is reached.
     */
    function executeTransaction(uint256 _txIndex)
        public
        onlyMultisigOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        require(
            transaction.confirmations >= requiredConfirmations,
            "Not enough confirmations"
        );

        // Update status before external call (Reentrancy protection)
        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "Transaction failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    receive() external payable {}
}