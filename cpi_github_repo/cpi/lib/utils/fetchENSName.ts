import { ethers } from "ethers";

export async function getENSName(address: string): Promise<string | null> {
  // Connect to the Ethereum mainnet
  const provider = new ethers.InfuraProvider("mainnet", process.env.NEXT_PUBLIC_INFURA_PROJECT_ID);

  try {
    // Look up the ENS name
    const ensName = await provider.lookupAddress(address);
    return ensName;
  } catch (error) {
    console.error("Error fetching ENS name:", error);
    return null;
  }
}