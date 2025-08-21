// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TimeLockVault
 * @dev A simple time-locked ETH vault where users can lock ETH until a specified timestamp
 */
contract TimeLockVault is Ownable {
    struct Lock {
        uint256 amount;
        uint64 unlockAt;
        bool withdrawn;
    }

    mapping(address => Lock) public locks;

    event Locked(address indexed user, uint256 amount, uint64 unlockAt);
    event Withdrawn(address indexed user, uint256 amount);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Create a new time lock for the sender
     * @param unlockAt The timestamp when the lock can be withdrawn
     */
    function createLock(uint64 unlockAt) external payable {
        // TODO-1: require unlockAt > block.timestamp (future)
        
        // TODO-2: require msg.value > 0
        
        locks[msg.sender] = Lock({
            amount: msg.value,
            unlockAt: unlockAt,
            withdrawn: false
        });

        emit Locked(msg.sender, msg.value, unlockAt);
    }

    /**
     * @dev Withdraw the locked ETH (only after unlock time)
     */
    function withdraw() external {
        Lock storage lock = locks[msg.sender];
        
        // TODO-3: enforce not withdrawn, amount > 0, time reached
        // Add checks for:
        // - require(!lock.withdrawn, "ALREADY_WITHDRAWN");
        // - require(lock.amount > 0, "NO_LOCK");
        // - require(block.timestamp >= lock.unlockAt, "TOO_EARLY");
        
        uint256 amount = lock.amount;
        lock.withdrawn = true;
        lock.amount = 0;

        // Use call for ETH transfer and revert on failure
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "TRANSFER_FAILED");

        emit Withdrawn(msg.sender, amount);
    }

    /**
     * @dev Emergency rescue function (owner only)
     * @param amount Amount of ETH to rescue
     */
    function rescue(uint256 amount) external onlyOwner {
        // TODO-4: onlyOwner; send ETH to owner via `call`; revert on failure
        // Add: (bool success, ) = payable(owner()).call{value: amount}("");
        // Add: require(success, "RESCUE_FAILED");
    }

    /**
     * @dev Get lock info for a user
     */
    function getLock(address user) external view returns (uint256 amount, uint64 unlockAt, bool withdrawn) {
        Lock memory lock = locks[user];
        return (lock.amount, lock.unlockAt, lock.withdrawn);
    }
}