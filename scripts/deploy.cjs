const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying VotingDAO contract...");

  // Get the network from hardhat runtime environment
  const network = hre.network.name;
  console.log("Network:", network);

  // Check if private key is set for testnet deployment
  if (network !== "hardhat" && !process.env.PRIVATE_KEY) {
    console.error("❌ PRIVATE_KEY not found in environment variables");
    console.error("Please set your private key in the .env file");
    process.exit(1);
  }

  const VotingDAO = await ethers.getContractFactory("VotingDAO");
  const votingDAO = await VotingDAO.deploy();

  console.log("⏳ Waiting for deployment...");
  await votingDAO.waitForDeployment();

  const address = await votingDAO.getAddress();
  console.log("✅ VotingDAO deployed successfully!");
  console.log("📍 Contract address:", address);
  console.log("🔗 Network:", network);

  // Save contract address to file for frontend
  const fs = require("fs");
  const contractInfo = {
    address: address,
    network: network,
    deployedAt: new Date().toISOString(),
  };

  fs.writeFileSync("deployment.json", JSON.stringify(contractInfo, null, 2));
  console.log("💾 Contract info saved to deployment.json");

  // Verify contract on Etherscan if API key is provided
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("🔍 Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("✅ Contract verified on Etherscan!");
    } catch (error) {
      console.log("⚠️  Contract verification failed:", error.message);
    }
  }

  console.log("\n🎉 Deployment complete!");
  console.log("📝 Next steps:");
  console.log("1. Copy the contract address above");
  console.log("2. Update your frontend with the contract address");
  console.log("3. Test the contract functions");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
