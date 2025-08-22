import { Router, Request, Response } from 'express';
import { getContract } from '../lib/eth';

const router = Router();

interface MintRequest {
  to: string;
  tokenURI?: string;
}

// POST /api/mint - Mint a new NFT
router.post('/mint', async (req: Request, res: Response) => {
  try {
    const { to, tokenURI }: MintRequest = req.body;

    if (!to) {
      return res.status(400).json({ error: 'Missing required field: to' });
    }

    // TODO-1: Validate address format using ethers.isAddress()
    // Hint: import { isAddress } from 'ethers' and check if 'to' is a valid address
    // Return 400 with appropriate error message if invalid
    
    const contract = getContract();
    
    // TODO-2: Call the contract's mint method
    // For standard ERC721 with safeMint: contract.safeMint(to, tokenURI || "")
    // For simple mint: contract.mint(to)
    // Store the transaction in a variable called 'tx'
    // Handle any errors that might occur during minting
    
    // TODO: Return the transaction hash and any other relevant data
    // Example: res.json({ success: true, txHash: tx.hash })
    
    // Placeholder response - remove this when implementing TODOs
    res.status(501).json({ error: 'Mint endpoint not implemented yet' });
    
  } catch (error) {
    console.error('Mint error:', error);
    res.status(500).json({ error: 'Failed to mint NFT' });
  }
});

// GET /api/owner/:tokenId - Get owner of a specific token
router.get('/owner/:tokenId', async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;

    if (!tokenId || isNaN(Number(tokenId))) {
      return res.status(400).json({ error: 'Invalid token ID' });
    }

    const contract = getContract();
    
    // TODO-3: Call contract.ownerOf(tokenId) to get the owner address
    // Store the result in a variable called 'owner'
    // Handle the case where the token doesn't exist (contract will throw)
    // Return the owner address in the response
    
    // Placeholder response - remove this when implementing TODO-3
    res.status(501).json({ error: 'Owner lookup not implemented yet' });
    
  } catch (error: any) {
    console.error('Owner lookup error:', error);
    
    // Handle specific contract errors
    if (error.message?.includes('nonexistent token') || error.message?.includes('invalid token ID')) {
      return res.status(404).json({ error: 'Token not found' });
    }
    
    res.status(500).json({ error: 'Failed to get token owner' });
  }
});

export default router;