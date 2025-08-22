const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VotingDAO", function () {
  let VotingDAO;
  let votingDAO;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    VotingDAO = await ethers.getContractFactory("VotingDAO");
    votingDAO = await VotingDAO.deploy();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await votingDAO.getAddress()).to.be.properAddress;
    });

    it("Should start with 0 proposals", async function () {
      expect(await votingDAO.getProposalCount()).to.equal(0);
    });
  });

  describe("Proposal Creation", function () {
    it("Should create a proposal successfully", async function () {
      const description = "Test proposal";

      await expect(votingDAO.connect(addr1).createProposal(description))
        .to.emit(votingDAO, "ProposalCreated")
        .withArgs(0, description);

      expect(await votingDAO.getProposalCount()).to.equal(1);

      const [desc, voteCount, active] = await votingDAO.getProposal(0);
      expect(desc).to.equal(description);
      expect(voteCount).to.equal(0);
      expect(active).to.be.true;
    });

    it("Should create multiple proposals", async function () {
      await votingDAO.connect(addr1).createProposal("Proposal 1");
      await votingDAO.connect(addr2).createProposal("Proposal 2");

      expect(await votingDAO.getProposalCount()).to.equal(2);
    });
  });

  describe("Voting", function () {
    beforeEach(async function () {
      await votingDAO.connect(addr1).createProposal("Test proposal");
    });

    it("Should allow voting on a proposal", async function () {
      await expect(votingDAO.connect(addr1).vote(0))
        .to.emit(votingDAO, "Voted")
        .withArgs(0, addr1.address);

      const [desc, voteCount, active] = await votingDAO.getProposal(0);
      expect(voteCount).to.equal(1);
    });

    it("Should prevent voting twice on the same proposal", async function () {
      await votingDAO.connect(addr1).vote(0);

      await expect(votingDAO.connect(addr1).vote(0)).to.be.revertedWith(
        "ALREADY_VOTED"
      );
    });

    it("Should allow multiple addresses to vote", async function () {
      await votingDAO.connect(addr1).vote(0);
      await votingDAO.connect(addr2).vote(0);
      await votingDAO.connect(addr3).vote(0);

      const [desc, voteCount, active] = await votingDAO.getProposal(0);
      expect(voteCount).to.equal(3);
    });

    it("Should prevent voting on invalid proposal ID", async function () {
      await expect(votingDAO.connect(addr1).vote(1)).to.be.revertedWith(
        "INVALID_PROPOSAL_ID"
      );
    });

    it("Should prevent voting on inactive proposals", async function () {
      // TODO-A: Complete this test
      // - End the proposal first
      // - Try to vote on the ended proposal
      // - Should revert with "PROPOSAL_NOT_ACTIVE"
    });
  });

  describe("Ending Proposals", function () {
    beforeEach(async function () {
      await votingDAO.connect(addr1).createProposal("Test proposal");
    });

    it("Should end a proposal successfully", async function () {
      await votingDAO.connect(addr1).endProposal(0);

      const [desc, voteCount, active] = await votingDAO.getProposal(0);
      expect(active).to.be.false;
    });

    it("Should prevent voting on ended proposals", async function () {
      await votingDAO.connect(addr1).endProposal(0);

      await expect(votingDAO.connect(addr2).vote(0)).to.be.revertedWith(
        "PROPOSAL_NOT_ACTIVE"
      );
    });

    it("Should prevent ending a proposal twice", async function () {
      await votingDAO.connect(addr1).endProposal(0);

      await expect(votingDAO.connect(addr1).endProposal(0)).to.be.revertedWith(
        "PROPOSAL_ALREADY_ENDED"
      );
    });

    it("Should prevent ending invalid proposal ID", async function () {
      // TODO-B: Complete this test
      // - Try to end a proposal with invalid ID
      // - Should revert with "INVALID_PROPOSAL_ID"
    });
  });

  describe("Winning Proposal", function () {
    beforeEach(async function () {
      await votingDAO.connect(addr1).createProposal("Proposal 1");
      await votingDAO.connect(addr2).createProposal("Proposal 2");
      await votingDAO.connect(addr3).createProposal("Proposal 3");
    });

    it("Should return the proposal with highest votes", async function () {
      // Vote on proposal 0 (2 votes)
      await votingDAO.connect(addr1).vote(0);
      await votingDAO.connect(addr2).vote(0);

      // Vote on proposal 1 (1 vote)
      await votingDAO.connect(addr1).vote(1);

      // Vote on proposal 2 (3 votes)
      await votingDAO.connect(addr1).vote(2);
      await votingDAO.connect(addr2).vote(2);
      await votingDAO.connect(addr3).vote(2);

      const winningId = await votingDAO.getWinningProposal();
      expect(winningId).to.equal(2);
    });

    it("Should return max uint when no active proposals", async function () {
      await votingDAO.connect(addr1).endProposal(0);
      await votingDAO.connect(addr1).endProposal(1);
      await votingDAO.connect(addr1).endProposal(2);

      const winningId = await votingDAO.getWinningProposal();
      expect(winningId).to.equal(ethers.MaxUint256);
    });

    it("Should ignore inactive proposals when finding winner", async function () {
      // TODO-C: Complete this test
      // - Vote on proposal 0 (2 votes)
      // - Vote on proposal 1 (1 vote)
      // - End proposal 0 (highest votes)
      // - Get winning proposal should return proposal 1
    });
  });

  describe("Has Voted Check", function () {
    beforeEach(async function () {
      await votingDAO.connect(addr1).createProposal("Test proposal");
    });

    it("Should return false for non-voters", async function () {
      const hasVoted = await votingDAO.hasVotedOnProposal(0, addr1.address);
      expect(hasVoted).to.be.false;
    });

    it("Should return true for voters", async function () {
      await votingDAO.connect(addr1).vote(0);

      const hasVoted = await votingDAO.hasVotedOnProposal(0, addr1.address);
      expect(hasVoted).to.be.true;
    });

    it("Should return false for different proposals", async function () {
      // TODO-D: Complete this test
      // - Vote on proposal 0
      // - Check hasVoted for proposal 1 (should be false)
    });
  });

  describe("Edge Cases", function () {
    it("Should handle empty proposals array", async function () {
      // TODO-E: Complete this test
      // - Get proposal count should return 0
      // - Get winning proposal should return max uint
      // - Try to get proposal 0 should revert
    });

    it("Should handle proposal with zero votes", async function () {
      // TODO-F: Complete this test
      // - Create a proposal
      // - Get winning proposal should return that proposal
      // - Vote count should be 0
    });
  });
});
