import { ethers } from "ethers";
import votingDAOABI from "../../abi/votingDAO.json";

export interface Proposal {
  id: number;
  description: string;
  voteCount: number;
  active: boolean;
}
