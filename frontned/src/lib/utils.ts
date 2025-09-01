import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ethers } from "ethers";
import contractABI from "../../abi/abi.json"; // your ABI file


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const CONTRACT_ADDRESS = "0x48bd1031E170a2178607bD287B025c383f5A61b5";

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  // Create provider from MetaMask
  const provider = new ethers.BrowserProvider(window.ethereum);

  // Create signer (user's wallet)
  const signer = await provider.getSigner();

  // Create contract instance
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

  return contract;
};
