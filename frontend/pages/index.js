import { useState } from 'react';

export default function Home() {
  const [unlockTime, setUnlockTime] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>🔒 TimeLockVault Frontend (Optional)</h1>
      
      <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3>📋 Optional UI Task</h3>
        <p>If you finish the core contract + tests early, you can wire these buttons to interact with your deployed contract:</p>
        <ul>
          <li>Connect to MetaMask/wallet</li>
          <li>Deploy contract or connect to existing one</li>
          <li>Wire the "Create Lock" and "Withdraw" functions</li>
          <li>Display lock status and balance</li>
        </ul>
        <p><strong>Note:</strong> This is optional - focus on the Solidity contract and tests first!</p>
      </div>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>🔐 Create Lock</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Amount (ETH):</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.1"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Unlock Time:</label>
            <input
              type="datetime-local"
              value={unlockTime}
              onChange={(e) => setUnlockTime(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <button 
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onClick={() => alert('TODO: Wire to contract.createLock()')}
          >
            Create Lock 🔒
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>💸 Withdraw</h3>
          <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
            <p><strong>Your Lock Status:</strong></p>
            <p>Amount: --- ETH</p>
            <p>Unlock Time: ---</p>
            <p>Status: ---</p>
          </div>
          <button 
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onClick={() => alert('TODO: Wire to contract.withdraw()')}
          >
            Withdraw 💰
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
        <h4>🛠️ Development Notes</h4>
        <p>To wire this frontend to your contract:</p>
        <ol>
          <li>Install ethers.js: <code>npm install ethers</code></li>
          <li>Add wallet connection logic</li>
          <li>Import your contract ABI</li>
          <li>Deploy contract to local hardhat network</li>
          <li>Replace button alerts with actual contract calls</li>
        </ol>
      </div>
    </div>
  );
}