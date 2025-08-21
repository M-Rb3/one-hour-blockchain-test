# One-Hour Full-Stack Blockchain Test (Template)

## What You Build
An Ethereum TimeLockVault smart contract that allows users to lock ETH until a specified timestamp, complete with comprehensive tests and optional frontend interface.

## Timebox: ~60 Minutes
- **50 minutes**: Core contract + tests (required)
- **10 minutes**: Polish + optional frontend (if time permits)

## Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start
```bash
# Clone and install dependencies
git clone <your-repo>
cd one-hour-blockchain-test
npm install

# Run tests (your main focus)
npm test

# Optional: Start frontend development server
npm run dev
```

## Your Mission: Complete the TODOs

You have a **working template** with strategic TODOs. **DO NOT start from scratch** - just complete the marked sections.

### 🔥 Required TODOs (Core - 50 minutes)

#### Smart Contract (`contracts/TimeLockVault.sol`)
- **TODO-1**: Add validation `require(unlockAt > block.timestamp, "INVALID_TIME");`
- **TODO-2**: Add validation `require(msg.value > 0, "NO_VALUE");`
- **TODO-3**: Add withdraw validations:
  ```solidity
  require(!lock.withdrawn, "ALREADY_WITHDRAWN");
  require(lock.amount > 0, "NO_LOCK");
  require(block.timestamp >= lock.unlockAt, "TOO_EARLY");
  ```
- **TODO-4**: Complete rescue function:
  ```solidity
  (bool success, ) = payable(owner()).call{value: amount}("");
  require(success, "RESCUE_FAILED");
  ```

#### Tests (`test/TimeLockVault.t.js`)
- **TODO-A**: Complete "cannot withdraw before unlock" test
- **TODO-B**: Complete "allows withdraw after unlock" test (use time helpers)

### 🎯 Optional TODOs (Frontend - 10 minutes)
If you finish early, wire the frontend buttons in `frontend/pages/index.js` to:
- Connect wallet (MetaMask)
- Display user's lock status
- Call contract functions

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
- [ ] All 4 contract TODOs implemented correctly
- [ ] All tests pass (`npm test` succeeds)
- [ ] Contract compiles without errors
- [ ] Proper error handling (reverts with expected messages)
- [ ] Tests use time helpers correctly
- [ ] Code follows security patterns (CEI pattern, proper validation)

### 🏆 Bonus Points (Optional)
- [ ] Frontend integration working
- [ ] Additional edge case tests
- [ ] Gas optimization considerations
- [ ] Clean, readable code style
- [ ] Thoughtful error messages

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
cd frontend && npm run dev  # Start Next.js on port 5173
```

## Project Structure
```
one-hour-blockchain-test/
├── package.json              # Main project config
├── hardhat.config.js         # Hardhat configuration
├── contracts/
│   └── TimeLockVault.sol     # Main contract (has TODOs)
├── test/
│   └── TimeLockVault.t.js    # Test suite (has TODOs)
├── .github/workflows/
│   └── ci.yml                # GitHub Actions CI
└── frontend/                 # Optional Next.js app
    ├── package.json
    └── pages/index.js
```

## Tips for Success

### Time Management
1. **First 10 min**: Read code, understand the contract flow
2. **Next 30 min**: Complete contract TODOs, run tests frequently
3. **Next 10 min**: Complete test TODOs, ensure all pass
4. **Last 10 min**: Polish or attempt frontend (optional)

### Testing Strategy
- Run `npm test` after each TODO completion
- Focus on making existing tests pass first
- Read test descriptions to understand expected behavior
- Use `console.log()` in tests for debugging if needed

### Common Patterns
- **Time helpers**: `time.increaseTo(timestamp)` to simulate time passing
- **Balance checks**: Compare `balanceBefore` vs `balanceAfter`
- **Revert testing**: `expect(...).to.be.revertedWith("MESSAGE")`
- **Event testing**: `expect(...).to.emit(contract, "EventName")`

## Smart Contract Security Notes

The contract implements several security patterns you should understand:
- **Checks-Effects-Interactions**: Validate, update state, then external calls
- **Reentrancy protection**: State changes before ETH transfers
- **Input validation**: Require statements for all user inputs
- **Access control**: Owner-only functions using OpenZeppelin Ownable

## Debugging Help

If tests fail:
1. Check the exact error message
2. Ensure TODO validations match expected revert strings
3. Verify timestamps in time-travel tests
4. Check that all require statements are implemented

If contract won't compile:
1. Check Solidity syntax
2. Ensure all imports are correct
3. Verify pragma version matches hardhat config

## Success Criteria Summary

**Minimum viable submission:**
- Contract compiles ✅
- All TODOs completed ✅
- `npm test` passes ✅

**Excellent submission:**
- Above + clean code + frontend attempt ✅

Good luck! Focus on the core functionality first, then polish if time permits.