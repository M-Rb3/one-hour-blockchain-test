import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Proposal } from "../lib/web3";
import { toast } from "sonner";
import { ethers } from "@/lib/eth";

const DAOVoting: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [newProposal, setNewProposal] = useState("");
  const [loading, setLoading] = useState(false);
  const [winningProposal, setWinningProposal] = useState<number | null>(null);

  useEffect(() => {
    if (isConnected && contractAddress) {
      loadProposals();
      loadWinningProposal();
    }
  }, [isConnected, contractAddress]);

  const checkNetwork = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    console.log("Connected to:", network.name);
  };


  /**
   * TODO-1: Implement wallet connection UI
   * - Update UI state (userAddress, isConnected)
   * - Show loading state during connection
   * - Display success/error messages
   */
  const connectWallet = async () => {
    // TODO-1: Add implementation here

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsConnected(true);
        setUserAddress(accounts[0]);
      } catch (error) {
        console.error("User rejected request:", error);
      }
    } else {

      toast.error("MetaMask not found!");

    }
  };

  /**
   * TODO-2: Implement contract connection UI
   * - Validate contract address input
   * - Show loading state during connection
   * - Display success/error messages
   */
  const connectContract = async () => {
    // TODO-2: Add implementation here
    toast.error("Contract connection not implemented");
  };

  /**
   * TODO-3: Implement data loading UI
   * - Update proposals state
   * - Handle loading states and errors
   */
  const loadProposals = async () => {
    // TODO-3: Add implementation here
  };

  /**
   * TODO-4: Implement winning proposal display
   * - Update winningProposal state
   * - Handle case when no winner exists
   */
  const loadWinningProposal = async () => {
    // TODO-4: Add implementation here
  };

  /**
   * TODO-5: Implement proposal creation UI
   * - Validate input field
   * - Clear input and refresh data
   * - Show loading and success/error states
   */
  const createProposal = async () => {
    // TODO-5: Add implementation here
    toast.error("Proposal creation not implemented");
  };

  /**
   * TODO-6: Implement voting UI
   * - Refresh proposals and winning proposal
   * - Show loading and success/error states
   */
  const voteOnProposal = async (proposalId: number) => {
    // TODO-6: Add implementation here
    toast.error("Voting not implemented");
  };

  /**
   * TODO-7: Implement proposal ending UI
   * - Refresh proposals and winning proposal
   * - Show loading and success/error states
   */
  const endProposal = async (proposalId: number) => {
    // TODO-7: Add implementation here
    toast.error("Proposal ending not implemented");
  };

  /**
   * TODO-8: Implement address formatting
   * - Format wallet address for display (first 6 + last 4 chars)
   */
  const formatAddress = (address: string) => {
    // TODO-8: Add implementation here
    return address;
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">DAO Voting dApp</h1>
        <p className="text-gray-600">
          Create proposals and vote on them using your wallet
        </p>
      </div>

      {/* Wallet Connection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Wallet Connection</CardTitle>
          <CardDescription>
            Connect your wallet to interact with the DAO
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <Button
              onClick={connectWallet}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Connecting..." : "Connect Wallet"}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Connected Address:
                </span>
                <Badge variant="secondary">{formatAddress(userAddress)}</Badge>
              </div>

              <div className="space-y-2">
                <Input
                  placeholder="Enter contract address"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                />
                <Button
                  onClick={connectContract}
                  disabled={loading || !contractAddress}
                  className="w-full"
                >
                  {loading ? "Connecting..." : "Connect Contract"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Proposal */}
      {isConnected && contractAddress && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Proposal</CardTitle>
            <CardDescription>
              Submit a new proposal for the community to vote on
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Enter proposal description"
                value={newProposal}
                onChange={(e) => setNewProposal(e.target.value)}
                disabled={loading}
              />
              <Button
                onClick={createProposal}
                disabled={loading || !newProposal.trim()}
                className="w-full"
              >
                {loading ? "Creating..." : "Create Proposal"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Winning Proposal */}
      {winningProposal !== null && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">
              🏆 Winning Proposal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-700">
              <strong>Proposal #{winningProposal}:</strong>{" "}
              {proposals[winningProposal]?.description}
              <br />
              <span className="text-sm">
                Votes: {proposals[winningProposal]?.voteCount}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Proposals List */}
      {isConnected && contractAddress && (
        <Card>
          <CardHeader>
            <CardTitle>All Proposals</CardTitle>
            <CardDescription>View and vote on all proposals</CardDescription>
          </CardHeader>
          <CardContent>
            {proposals.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No proposals yet. Create the first one!
              </p>
            ) : (
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">
                            Proposal #{proposal.id}
                          </h3>
                          <Badge
                            variant={proposal.active ? "default" : "secondary"}
                          >
                            {proposal.active ? "Active" : "Ended"}
                          </Badge>
                          {winningProposal === proposal.id && (
                            <Badge
                              variant="outline"
                              className="text-green-600 border-green-600"
                            >
                              🏆 Winner
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">
                          {proposal.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          Votes: {proposal.voteCount}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="flex gap-2">
                      {proposal.active && (
                        <Button
                          onClick={() => voteOnProposal(proposal.id)}
                          disabled={loading}
                          size="sm"
                        >
                          {loading ? "Voting..." : "Vote"}
                        </Button>
                      )}
                      {proposal.active && (
                        <Button
                          onClick={() => endProposal(proposal.id)}
                          disabled={loading}
                          variant="outline"
                          size="sm"
                        >
                          {loading ? "Ending..." : "End Proposal"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DAOVoting;
