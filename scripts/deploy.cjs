const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying VotingDAO contract...");

  const VotingDAO = await ethers.getContractFactory("VotingDAO");
  const votingDAO = await VotingDAO.deploy();

  await votingDAO.waitForDeployment();

  const address = await votingDAO.getAddress();
  console.log("VotingDAO deployed to:", address);
  console.log("Contract address for frontend:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
