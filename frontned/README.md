# One-Hour ERC-721 Mint API (Template)

## ⏰ Timebox: ~60 minutes
- **45-50 minutes:** Core implementation
- **10-15 minutes:** Testing and polish

## 🎯 Overview

This is a pre-configured Node.js/Express API template for implementing ERC-721 NFT minting functionality. The boilerplate is ready-to-run with all dependencies, testing framework, and CI pipeline configured.

## 📋 What's Provided

✅ **Complete Express.js API structure**  
✅ **Ethers.js v6 integration with provider/signer setup**  
✅ **Standard ERC-721 ABI with mint/ownerOf functions**  
✅ **Jest test suite with mocked blockchain calls**  
✅ **GitHub Actions CI pipeline**  
✅ **TypeScript configuration**  
✅ **ESLint setup**  

## 🎯 Your Tasks (TODOs)

You need to implement **3 small TODOs** in the routes and **2 test cases**:

### Core Implementation (`src/routes/nft.ts`)
- **TODO-1:** Validate Ethereum address format in `POST /api/mint`
- **TODO-2:** Implement contract mint call in `POST /api/mint`  
- **TODO-3:** Implement ownerOf lookup in `GET /api/owner/:tokenId`

### Test Implementation (`tests/nft.test.ts`)
- **TODO-A:** Test invalid address validation (currently skipped)
- **TODO-B:** Test owner lookup with mocked contract (currently skipped)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D321Fa95c77e4665
WALLET_PRIVATE_KEY=your_private_key_here
PORT=3000
```

### 3. Run in Development Mode
```bash
npm run dev
```

### 4. Test Your Implementation
```bash
npm test
npm run lint
```

## 📡 API Endpoints

### Health Check
```
GET /health
Response: { "status": "ok" }
```

### Mint NFT
```
POST /api/mint
Body: { "to": "0x...", "tokenURI": "optional" }
Response: { "success": true, "txHash": "0x..." }
```

### Get Token Owner
```
GET /api/owner/:tokenId
Response: { "owner": "0x..." }
```

## 🧪 Testing Strategy

Tests use **mocked contracts** (no real blockchain calls):
- 1 passing sample test for health endpoint
- 2 basic structure tests for error cases
- 2 TODO tests for you to implement

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
```

## 📝 Implementation Hints

### TODO-1: Address Validation
```typescript
import { isAddress } from 'ethers';
if (!isAddress(to)) {
  return res.status(400).json({ error: 'Invalid address format' });
}
```

### TODO-2: Contract Mint Call
```typescript
const contract = getContract();
const tx = await contract.safeMint(to, tokenURI || "");
res.json({ success: true, txHash: tx.hash });
```

### TODO-3: Owner Lookup
```typescript
const contract = getContract();
const owner = await contract.ownerOf(tokenId);
res.json({ owner });
```

### Test Mocking Pattern
```typescript
const { getContract } = require('../src/lib/eth');
const mockContract = { ownerOf: jest.fn().mockResolvedValue('0x123...') };
getContract.mockReturnValue(mockContract);
```

## ✅ Acceptance Criteria

### Functional Requirements
- [ ] Address validation returns 400 for invalid addresses
- [ ] Mint endpoint calls contract and returns transaction hash
- [ ] Owner lookup returns correct owner address
- [ ] Proper error handling for contract failures
- [ ] Both TODO test cases pass

### Technical Requirements  
- [ ] All TypeScript types are correct
- [ ] ESLint passes with no errors
- [ ] All tests pass (including the 2 you implement)
- [ ] No hardcoded values (use environment variables)

### Code Quality
- [ ] Clean, readable code with proper error handling
- [ ] Appropriate HTTP status codes
- [ ] Meaningful error messages
- [ ] No console.log statements (use proper logging)

## 🔧 Available Scripts

```bash
npm run dev          # Start development server with auto-reload
npm start            # Start production server  
npm test             # Run test suite
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run build        # Build TypeScript to JavaScript
```

## 📁 Project Structure

```
erc721-mint-api/
├── src/
│   ├── server.ts           # Express server setup
│   ├── routes/nft.ts       # NFT endpoints (YOUR TODOs HERE)
│   └── lib/eth.ts          # Ethereum/contract helpers
├── tests/
│   └── nft.test.ts         # Test suite (2 TODOs HERE)  
├── abi/
│   └── erc721.json         # Standard ERC-721 ABI
├── .github/workflows/
│   └── ci.yml              # GitHub Actions CI
└── [config files...]
```

## 💡 Tips for Success

1. **Start with TODO-1** (easiest) to get familiar with the codebase
2. **Run tests frequently** to ensure your changes work
3. **Use the provided error handling patterns** - don't reinvent them
4. **Check the ABI file** to understand available contract methods
5. **Mock properly in tests** - no real blockchain calls needed

## 🚨 Common Gotchas

- Don't forget to handle async/await properly
- Contract calls can throw - wrap in try/catch
- Address validation is case-insensitive  
- Token ID must be a number for ownerOf calls
- Tests use mocked contracts, not real ones

---

**Good luck! Focus on clean, working code over perfect code. You've got this! 🚀**