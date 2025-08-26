import { ethers, Contract, JsonRpcProvider, Wallet } from 'ethers';
import * as erc721Abi from '../../abi/erc721.json';

// Environment variables validation
const requiredEnvVars = ['VITE_APP_RPC_URL', 'VITE_APP_CONTRACT_ADDRESS', 'VITE_APP_WALLET_PRIVATE_KEY'];
for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Initialize provider and signer
const provider = new JsonRpcProvider(import.meta.env.VITE_APP_RPC_URL);
const wallet = new Wallet(import.meta.env.VITE_APP_WALLET_PRIVATE_KEY!, provider);

/**
 * Get the ERC-721 contract instance with signer for write operations
 */
export function getContract(): Contract {
  return new Contract(
    import.meta.env.VITE_APP_CONTRACT_ADDRESS!,
    erc721Abi,
    wallet // Use wallet (signer) for both read and write operations
  );
}

/**
 * Get the ERC-721 contract instance with provider for read-only operations
 */
export function getReadOnlyContract(): Contract {
  return new Contract(
    import.meta.env.VITE_APP_CONTRACT_ADDRESS!,
    erc721Abi,
    provider
  );
}

/**
 * Validate if a string is a valid Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return ethers.isAddress(address);
}

/**
 * Get the current gas price
 */
export async function getGasPrice(): Promise<bigint> {
  const feeData = await provider.getFeeData();
  return feeData.gasPrice || ethers.parseUnits('20', 'gwei');
}

export { ethers };