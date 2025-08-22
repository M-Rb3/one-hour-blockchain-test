# DAO Voting dApp

A complete decentralized autonomous organization (DAO) voting application built with Solidity smart contracts and React frontend.

## Features

- **Smart Contract**: VotingDAO contract with proposal creation, voting, and result tracking
- **Frontend**: React application with MetaMask integration
- **Real-time Updates**: Live proposal and vote count updates
- **User-friendly UI**: Modern interface built with shadcn/ui components

## Smart Contract Features

### VotingDAO Contract

- **Create Proposal**: Submit new proposals for community voting
- **Vote**: Cast votes on active proposals (one vote per address per proposal)
- **End Proposal**: Mark proposals as inactive
- **Get Winning Proposal**: Find the proposal with the highest vote count among active proposals
- **Events**: Track proposal creation and voting activities

### Contract Functions

```solidity
function createProposal(string memory description) external
function vote(uint proposalId) external
function endProposal(uint proposalId) external
function getWinningProposal() external view returns (uint winningId)
function getProposal(uint proposalId) external view returns (string, uint, bool)
function getProposalCount() external view returns (uint)
function hasVotedOnProposal(uint proposalId, address voter) external view returns (bool)
```

## Frontend Features

- **MetaMask Integration**: Connect your wallet securely
- **Proposal Management**: Create, view, and manage proposals
- **Voting Interface**: Easy-to-use voting buttons for each proposal
- **Real-time Updates**: Automatic refresh of proposal data
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MetaMask browser extension
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mystic/test
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontned
   npm install
   ```

3. **Start local blockchain**

   ```bash
   # From the root directory
   npx hardhat node
   ```

4. **Deploy the contract**

   ```bash
   # In a new terminal, from the root directory
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. **Start the frontend**
   ```bash
   # From the frontned directory
   npm run dev
   ```

### Usage

1. **Connect MetaMask**

   - Open the application in your browser
   - Click "Connect MetaMask"
   - Approve the connection in MetaMask

2. **Connect to Contract**

   - Copy the deployed contract address from the deployment output
   - Paste it in the "Contract Address" field
   - Click "Connect Contract"

3. **Create Proposals**

   - Enter a proposal description
   - Click "Create Proposal"
   - Confirm the transaction in MetaMask

4. **Vote on Proposals**

   - View all active proposals
   - Click "Vote" on any proposal you want to support
   - Confirm the transaction in MetaMask

5. **End Proposals**
   - Click "End Proposal" to mark a proposal as inactive
   - This prevents further voting on the proposal

## Project Structure

```
├── contracts/
│   ├── TimeLockVault.sol    # Original time lock contract
│   └── VotingDAO.sol        # DAO voting contract
├── frontned/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DAOVoting.tsx    # Main voting component
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── lib/
│   │   │   └── web3.ts          # Web3 service for contract interaction
│   │   └── App.tsx              # Main app component
│   ├── abi/
│   │   └── votingDAO.json       # Contract ABI
│   └── package.json
├── scripts/
│   └── deploy.js               # Contract deployment script
├── hardhat.config.js           # Hardhat configuration
└── package.json
```

## Smart Contract Details

### Proposal Structure

```solidity
struct Proposal {
    string description;    // Proposal description
    uint voteCount;        // Number of votes received
    bool active;          // Whether the proposal is active
}
```

### Events

- `ProposalCreated(uint id, string description)`: Emitted when a new proposal is created
- `Voted(uint proposalId, address voter)`: Emitted when someone votes on a proposal

### Security Features

- One vote per address per proposal
- Only active proposals can receive votes
- Proper access control for proposal ending

## Testing

### Smart Contract Testing

```bash
# Run contract tests
npx hardhat test
```

### Frontend Testing

```bash
# From the frontned directory
npm test
```

## Deployment

### Local Development

```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### Testnet Deployment

1. Update `hardhat.config.js` with your testnet configuration
2. Set up environment variables for private keys
3. Deploy using the appropriate network flag

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue in the repository.
