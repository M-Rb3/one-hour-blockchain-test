// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title VotingDAO
 * @dev A simple DAO voting contract for proposals and voting
 * 
 * TODO: Complete the implementation of this DAO voting contract
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
     * 
     * TODO-1: Implement proposal creation logic
     * - Add a new Proposal to the proposals array
     * - Initialize voteCount to 0 and active to true
     * - Emit ProposalCreated event with the proposal ID and description
     */
    function createProposal(string memory description) external {
        // TODO-1: Add implementation here
    }

    /**
     * @dev Vote on a proposal
     * @param proposalId The ID of the proposal to vote on
     * 
     * TODO-2: Implement voting logic with proper validations
     * - Validate that proposalId is valid (less than proposals.length)
     * - Validate that the proposal is active
     * - Validate that the voter hasn't already voted on this proposal
     * - Mark the voter as having voted
     * - Increment the vote count for the proposal
     * - Emit Voted event
     */
    function vote(uint proposalId) external {
        // TODO-2: Add implementation here
    }

    /**
     * @dev End a proposal (mark as inactive)
     * @param proposalId The ID of the proposal to end
     * 
     * TODO-3: Implement proposal ending logic
     * - Validate that proposalId is valid
     * - Validate that the proposal is currently active
     * - Mark the proposal as inactive (set active to false)
     */
    function endProposal(uint proposalId) external {
        // TODO-3: Add implementation here
    }

    /**
     * @dev Get the winning proposal (highest vote count among active proposals)
     * @return winningId The ID of the winning proposal
     * 
     * TODO-4: Implement winning proposal logic
     * - Iterate through all proposals
     * - Find the active proposal with the highest vote count
     * - Return the ID of the winning proposal
     * - If no active proposals exist, return type(uint).max
     */
    function getWinningProposal() external view returns (uint winningId) {
        // TODO-4: Add implementation here
    }

    /**
     * @dev Get proposal details
     * @param proposalId The ID of the proposal
     * @return description The proposal description
     * @return voteCount The number of votes
     * @return active Whether the proposal is active
     * 
     * TODO-5: Implement proposal retrieval logic
     * - Validate that proposalId is valid
     * - Return the proposal details (description, voteCount, active)
     */
    function getProposal(uint proposalId) external view returns (string memory description, uint voteCount, bool active) {
        // TODO-5: Add implementation here
    }

    /**
     * @dev Get total number of proposals
     * @return The total number of proposals
     * 
     * TODO-6: Implement proposal count logic
     * - Return the length of the proposals array
     */
    function getProposalCount() external view returns (uint) {
        // TODO-6: Add implementation here
    }

    /**
     * @dev Check if an address has voted on a specific proposal
     * @param proposalId The ID of the proposal
     * @param voter The address to check
     * @return Whether the address has voted
     * 
     * TODO-7: Implement has voted check logic
     * - Return the value from the hasVoted mapping for the given proposalId and voter
     */
    function hasVotedOnProposal(uint proposalId, address voter) external view returns (bool) {
        // TODO-7: Add implementation here
    }
}
