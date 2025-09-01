# One-Hour Full-Stack Blockchain Test (Template)

## What You Build

An Ethereum VotingDAO smart contract that allows users to create proposals, vote on them, and determine winners, complete with comprehensive tests and optional frontend interface.

## Timebox: ~60 Minutes

- **50 minutes**: Core contract + frontend(no need to complete it fully)
- **10 minutes**: Polish optional + tests (if time permits)

## Setup

### Option 1: Docker

#### Prerequisites

- Docker and Docker Compose installed

#### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/M-Rb3/one-hour-blockchain-test
cd one-hour-blockchain-test

# Run the Docker setup script
# On Linux/Mac:
chmod +x scripts/docker-setup.sh
./scripts/docker-setup.sh

# On Windows:
scripts/docker-setup.bat

# Or manually:
docker-compose up -d
```

#### Docker Commands

```bash
# View logs
docker-compose logs -f

# Run tests
docker-compose exec blockchain-test npm test

# Compile contracts
docker-compose exec blockchain-test npm run compile

# Stop services
docker-compose down
```

### Option 2: Local Setup

#### Prerequisites

- Node.js 24+
- npm or yarn
- MetaMask or any Web3 wallet

#### Quick Start

```bash
# Clone and install dependencies
git clone https://github.com/M-Rb3/one-hour-blockchain-test

cd one-hour-blockchain-test

npm install

# Setup environment (optional for deployment)
cp env.example .env
# Edit .env with your configuration

# Run tests (your main focus)
npm test

# Optional: Start frontend development server
npm run dev
```

## Deploy to testnet

## The deployment will save contract info to deployment.json

## Use this address in your frontend

````

## Your Mission: Complete the TODOs

You have a **working template** with strategic TODOs. **DO NOT start from scratch** - just complete the marked sections.

### Required TODOs (Core - 50 minutes)

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


### Frontend TODOs (frontned/src/pages/Index.tsx)





## Run Commands Reference

### Docker Commands (Recommended)

```bash
# Setup and start
docker-compose up -d              # Start all services
docker-compose down               # Stop all services

# Development
docker-compose exec blockchain-test npm test     # Run tests
docker-compose exec blockchain-test npm run compile  # Compile contracts
docker-compose logs -f            # View logs

# Frontend (accessible at http://localhost:5173)
# Hardhat Node (accessible at http://localhost:8545)
```

### Local Commands

```bash
# Essential commands
npm install           # Install dependencies
npm test             # Run all tests
npm run dev          # Show help for running tests + frontend

# Development commands
npm run compile      # Compile contracts
npx hardhat node     # Start local blockchain
npx hardhat clean    # Clean artifacts

# Deployment commands

Both npm scripts and direct npx hardhat commands work:

## Using npx hardhat directly
```bash
npx hardhat run scripts/deploy.cjs                    # Deploy to local network
npx hardhat run scripts/deploy.cjs --network sepolia  # Deploy to Sepolia testnet
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> # Verify contract on Etherscan
```

## Other useful commands
```bash
npx hardhat compile  # Compile contracts
npx hardhat test     # Run tests
npx hardhat node     # Start local blockchain node
```

# Frontend
cd frontned && npm run dev  # Start Vite dev server on port 5173
```

## Project Structure

```
one-hour-blockchain-test
/
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker services
├── .dockerignore             # Docker ignore file
├── package.json              # Main project config
├── hardhat.config.cjs        # Hardhat configuration
├── env.example               # Environment variables template
├── deployment.json           # Generated after deployment
├── contracts/
│   └── VotingDAO.sol         # Main contract (has TODOs)
├── scripts/
│   ├── deploy.cjs            # Deployment script
│   ├── docker-setup.sh       # Linux/Mac Docker setup
│   └── docker-setup.bat      # Windows Docker setup
├── test/
│   └── VotingDAO.test.cjs    # Test suite (has TODOs)
├── .github/workflows/
│   └── ci.yml                # GitHub Actions CI
└── frontned/                 # Vite + React app (has TODOs)
    ├── package.json
    └── src/
        ├── lib/
        │   └── web3.ts      # Web3 service (has TODOs)
        └── pages/
            └── Index.tsx    # Main component (has TODOs)
```

````
