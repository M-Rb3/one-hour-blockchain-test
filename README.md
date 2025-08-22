# One-Hour Full-Stack Blockchain Test (Template)

## What You Build

An Ethereum VotingDAO smart contract that allows users to create proposals, vote on them, and determine winners, complete with comprehensive tests and optional frontend interface.

## Timebox: ~60 Minutes

- **50 minutes**: Core contract + frontend (required)
- **10 minutes**: Polish optional + tests (if time permits)

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Quick Start

```bash
# Clone and install dependencies
git clone https://github.com/M-Rb3/code-assessment
cd code-assessment
npm install

# Run tests (your main focus)
npm test

# Optional: Start frontend development server
npm run dev
```

## Your Mission: Complete the TODOs

You have a **working template** with strategic TODOs. **DO NOT start from scratch** - just complete the marked sections.

### 🔥 Required TODOs (Core - 50 minutes)

#### Smart Contract (`contracts/VotingDAO.sol`)

- **TODO-1**: Implement proposal creation logic

  - Add a new Proposal to the proposals array
  - Initialize voteCount to 0 and active to true
  - Emit ProposalCreated event with the proposal ID and description

- **TODO-2**: Implement voting logic with proper validations

  - Validate that proposalId is valid (less than proposals.length)
  - Validate that the proposal is active
  - Validate that the voter hasn't already voted on this proposal
  - Mark the voter as having voted
  - Increment the vote count for the proposal
  - Emit Voted event

- **TODO-3**: Implement proposal ending logic

  - Validate that proposalId is valid
  - Validate that the proposal is currently active
  - Mark the proposal as inactive (set active to false)

- **TODO-4**: Implement winning proposal logic

  - Iterate through all proposals
  - Find the active proposal with the highest vote count
  - Return the ID of the winning proposal
  - If no active proposals exist, return type(uint).max

- **TODO-5**: Implement proposal retrieval logic

  - Validate that proposalId is valid
  - Return the proposal details (description, voteCount, active)

- **TODO-6**: Implement proposal count logic

  - Return the length of the proposals array

- **TODO-7**: Implement has voted check logic
  - Return the value from the hasVoted mapping for the given proposalId and voter

#### Tests (`test/VotingDAO.test.cjs`)

- **TODO-A**: Complete "Should prevent voting on inactive proposals" test
- **TODO-B**: Complete "Should prevent ending invalid proposal ID" test
- **TODO-C**: Complete "Should ignore inactive proposals when finding winner" test
- **TODO-D**: Complete "Should return false for different proposals" test
- **TODO-E**: Complete "Should handle empty proposals array" test
- **TODO-F**: Complete "Should handle proposal with zero votes" test

### 🎯 Frontend TODOs (Required - 50 minutes)

#### Web3 Service (`frontend/src/lib/web3.ts`)

- **TODO-1**: Implement wallet connection logic

  - Check if MetaMask (or any wallet) is available
  - Connect to the wallet provider
  - Get the signer from the provider
  - Return the connected address
  - Handle errors appropriately

- **TODO-2**: Implement contract connection logic

  - Validate that wallet is connected
  - Create a new contract instance with the provided address
  - Store the contract instance
  - Handle errors appropriately

- **TODO-3**: Implement proposal creation

  - Validate that contract is connected
  - Call the createProposal function on the contract
  - Wait for the transaction to be mined
  - Handle errors appropriately

- **TODO-4**: Implement voting logic

  - Validate that contract is connected
  - Call the vote function on the contract with the proposal ID
  - Wait for the transaction to be mined
  - Handle errors appropriately

- **TODO-5**: Implement proposal ending logic

  - Validate that contract is connected
  - Call the endProposal function on the contract
  - Wait for the transaction to be mined
  - Handle errors appropriately

- **TODO-6**: Implement proposal count retrieval

  - Validate that contract is connected
  - Call getProposalCount on the contract
  - Return the count as a number
  - Handle errors appropriately

- **TODO-7**: Implement single proposal retrieval

  - Validate that contract is connected
  - Call getProposal on the contract with the proposal ID
  - Return a Proposal object with the correct structure
  - Handle errors appropriately

- **TODO-8**: Implement all proposals retrieval

  - Get the total proposal count
  - Loop through all proposals and get their details
  - Return an array of Proposal objects
  - Handle errors appropriately

- **TODO-9**: Implement winning proposal retrieval

  - Validate that contract is connected
  - Call getWinningProposal on the contract
  - Return the winning proposal ID as a number
  - Handle errors appropriately

- **TODO-10**: Implement has voted check

  - Validate that contract is connected
  - Call hasVotedOnProposal on the contract
  - Return whether the address has voted
  - Handle errors appropriately

- **TODO-11**: Implement current address retrieval

  - Validate that wallet is connected
  - Get the current address from the signer
  - Return the address as a string
  - Handle errors appropriately

- **TODO-12**: Implement connection status check
  - Return true if both wallet and contract are connected
  - Return false otherwise

#### React Component (`frontend/src/pages/Index.tsx`)

- **TODO-1**: Implement wallet connection UI

  - Call web3Service.connectWallet()
  - Update UI state (userAddress, isConnected)
  - Show loading state during connection
  - Display success/error messages

- **TODO-2**: Implement contract connection UI

  - Validate contract address input
  - Call web3Service.connectContract()
  - Show loading state during connection
  - Display success/error messages

- **TODO-3**: Implement data loading UI

  - Call web3Service.getAllProposals()
  - Update proposals state
  - Handle loading states and errors

- **TODO-4**: Implement winning proposal display

  - Call web3Service.getWinningProposal()
  - Update winningProposal state
  - Handle case when no winner exists

- **TODO-5**: Implement proposal creation UI

  - Validate input field
  - Call web3Service.createProposal()
  - Clear input and refresh data
  - Show loading and success/error states

- **TODO-6**: Implement voting UI

  - Call web3Service.vote() with proposal ID
  - Refresh proposals and winning proposal
  - Show loading and success/error states

- **TODO-7**: Implement proposal ending UI

  - Call web3Service.endProposal() with proposal ID
  - Refresh proposals and winning proposal
  - Show loading and success/error states

- **TODO-8**: Implement address formatting

  - Format wallet address for display (first 6 + last 4 chars)

## Testing Your Work

```bash
# Run all tests
npm test

# Run specific test
npx hardhat test --grep "TODO-A"

# Run with gas reporting
npx hardhat test --gas-report
```

## Rubric (Pass/Fail)

### ✅ Must Pass (Required)

- [ ] All 7 contract TODOs implemented correctly
- [ ] All 12 web3 service TODOs implemented correctly
- [ ] All 8 React component TODOs implemented correctly
- [ ] Contract compiles without errors
- [ ] Frontend runs without errors (`npm run dev` in frontend directory)
- [ ] Proper error handling (reverts with expected messages)
- [ ] Tests use proper validation patterns
- [ ] Code follows security patterns (proper validation, state management)
- [ ] Wallet connection works with any wallet (MetaMask, WalletConnect, etc.)

### 🏆 Bonus Points (Optional)

- [ ] All tests pass (`npm test` succeeds)
- [ ] Additional edge case tests
- [ ] Gas optimization considerations
- [ ] Clean, readable code style
- [ ] Thoughtful error messages
- [ ] Additional UI features (loading states, better error handling)

## Run Commands Reference

```bash
# Essential commands
npm install           # Install dependencies
npm test             # Run all tests
npm run dev          # Show help for running tests + frontend

# Development commands
npx hardhat compile  # Compile contracts
npx hardhat node     # Start local blockchain
npx hardhat clean    # Clean artifacts

# Frontend (optional)
cd frontend && npm run dev  # Start Vite dev server on port 5173
```

## Project Structure

```
code-assessment/
├── package.json              # Main project config
├── hardhat.config.cjs        # Hardhat configuration
├── contracts/
│   └── VotingDAO.sol         # Main contract (has TODOs)
├── test/
│   └── VotingDAO.test.cjs    # Test suite (has TODOs)
├── .github/workflows/
│   └── ci.yml                # GitHub Actions CI
└── frontend/                 # Vite + React app (has TODOs)
    ├── package.json
    └── src/
        ├── lib/
        │   └── web3.ts      # Web3 service (has TODOs)
        └── pages/
            └── Index.tsx    # Main component (has TODOs)
```

## Success Criteria Summary

**Minimum viable submission:**

- Contract compiles ✅
- All contract TODOs completed ✅
- All web3 service TODOs completed ✅
- All React component TODOs completed ✅
- Frontend runs without errors ✅
- Wallet connection works ✅

**Excellent submission:**

- Above + all tests pass + clean code + additional features ✅

Good luck! Focus on the core functionality first, then polish if time permits.
