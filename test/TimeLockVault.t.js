const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("TimeLockVault", function () {
  let timeLockVault;
  let owner;
  let user;

  // Helper function to deploy contract and get signers
  async function deployTimeLockVault() {
    const [deployerOwner, testUser] = await ethers.getSigners();
    const TimeLockVault = await ethers.getContractFactory("TimeLockVault");
    const vault = await TimeLockVault.deploy();
    return { vault, owner: deployerOwner, user: testUser };
  }

  beforeEach(async function () {
    const deployment = await deployTimeLockVault();
    timeLockVault = deployment.vault;
    owner = deployment.owner;
    user = deployment.user;
  });

  describe("Time Lock Functionality", function () {
    it("should allow creating a valid time lock", async function () {
      const unlockTime = (await time.latest()) + 3600; // 1 hour from now
      const lockAmount = ethers.parseEther("1.0");

      await expect(
        timeLockVault.connect(user).createLock(unlockTime, { value: lockAmount })
      ).to.emit(timeLockVault, "Locked")
        .withArgs(user.address, lockAmount, unlockTime);

      const lock = await timeLockVault.getLock(user.address);
      expect(lock.amount).to.equal(lockAmount);
      expect(lock.unlockAt).to.equal(unlockTime);
      expect(lock.withdrawn).to.be.false;
    });

    it("TODO-A: cannot withdraw before unlock", async function () {
      const unlockTime = (await time.latest()) + 3600; // 1 hour from now
      const lockAmount = ethers.parseEther("0.5");

      // Create lock
      await timeLockVault.connect(user).createLock(unlockTime, { value: lockAmount });

      // TODO-A: Try to withdraw immediately and expect revert with "TOO_EARLY"
      // Add: await expect(timeLockVault.connect(user).withdraw()).to.be.revertedWith("TOO_EARLY");
    });

    it("TODO-B: allows withdraw after unlock", async function () {
      const unlockTime = (await time.latest()) + 1800; // 30 minutes from now
      const lockAmount = ethers.parseEther("0.3");

      // Create lock
      await timeLockVault.connect(user).createLock(unlockTime, { value: lockAmount });

      // TODO-B: Time travel to after unlock time and verify successful withdrawal
      // Add: await time.increaseTo(unlockTime);
      // Add: const balanceBefore = await ethers.provider.getBalance(user.address);
      // Add: await timeLockVault.connect(user).withdraw();
      // Add: const balanceAfter = await ethers.provider.getBalance(user.address);
      // Add: expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });
  });

  describe("Edge Cases", function () {
    it("should handle multiple users independently", async function () {
      const [, user1, user2] = await ethers.getSigners();
      const unlockTime = (await time.latest()) + 7200; // 2 hours from now
      
      await timeLockVault.connect(user1).createLock(unlockTime, { value: ethers.parseEther("1.0") });
      await timeLockVault.connect(user2).createLock(unlockTime, { value: ethers.parseEther("2.0") });

      const lock1 = await timeLockVault.getLock(user1.address);
      const lock2 = await timeLockVault.getLock(user2.address);
      
      expect(lock1.amount).to.equal(ethers.parseEther("1.0"));
      expect(lock2.amount).to.equal(ethers.parseEther("2.0"));
    });
  });
});