// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title VotingDAO
 * @dev A simple DAO voting contract for proposals and voting
 */
contract VotingDAO {
    struct Proposal {
        string description;
        uint voteCount;
        bool active;
    }

    Proposal[] public proposals;
    mapping(uint => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint id, string description);
    event Voted(uint proposalId, address voter);

    /**
     * @dev Create a new proposal
     * @param description The description of the proposal
     */
    function createProposal(string memory description) external {
        proposals.push(Proposal({
            description: description,
            voteCount: 0,
            active: true
        }));

        emit ProposalCreated(proposals.length - 1, description);
    }

    /**
     * @dev Vote on a proposal
     * @param proposalId The ID of the proposal to vote on
     */
    function vote(uint proposalId) external {
        require(proposalId < proposals.length, "INVALID_PROPOSAL_ID");
        require(proposals[proposalId].active, "PROPOSAL_NOT_ACTIVE");
        require(!hasVoted[proposalId][msg.sender], "ALREADY_VOTED");

        hasVoted[proposalId][msg.sender] = true;
        proposals[proposalId].voteCount++;

        emit Voted(proposalId, msg.sender);
    }

    /**
     * @dev End a proposal (mark as inactive)
     * @param proposalId The ID of the proposal to end
     */
    function endProposal(uint proposalId) external {
        require(proposalId < proposals.length, "INVALID_PROPOSAL_ID");
        require(proposals[proposalId].active, "PROPOSAL_ALREADY_ENDED");

        proposals[proposalId].active = false;
    }

    /**
     * @dev Get the winning proposal (highest vote count among active proposals)
     * @return winningId The ID of the winning proposal
     */
    function getWinningProposal() external view returns (uint winningId) {
        uint maxVotes = 0;
        winningId = type(uint).max; // No winning proposal found

        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].active && proposals[i].voteCount > maxVotes) {
                maxVotes = proposals[i].voteCount;
                winningId = i;
            }
        }
    }

    /**
     * @dev Get proposal details
     * @param proposalId The ID of the proposal
     * @return description The proposal description
     * @return voteCount The number of votes
     * @return active Whether the proposal is active
     */
    function getProposal(uint proposalId) external view returns (string memory description, uint voteCount, bool active) {
        require(proposalId < proposals.length, "INVALID_PROPOSAL_ID");
        Proposal memory proposal = proposals[proposalId];
        return (proposal.description, proposal.voteCount, proposal.active);
    }

    /**
     * @dev Get total number of proposals
     * @return The total number of proposals
     */
    function getProposalCount() external view returns (uint) {
        return proposals.length;
    }

    /**
     * @dev Check if an address has voted on a specific proposal
     * @param proposalId The ID of the proposal
     * @param voter The address to check
     * @return Whether the address has voted
     */
    function hasVotedOnProposal(uint proposalId, address voter) external view returns (bool) {
        return hasVoted[proposalId][voter];
    }
}
