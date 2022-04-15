const hre = require("hardhat");

const main = async () => {
  const { ethers } = hre;

  const [deployer] = await ethers.getSigners();
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("Flat Coin", "FLT", 100000000);
  const tokenInstance = await token.deployed();

  const MoneyContract = await ethers.getContractFactory("MoneyCollector");
  const moneyContract = await MoneyContract.deploy();
  await moneyContract.deployed();

  const TokenSale = await ethers.getContractFactory("TokenSale");
  const tokenSale = await TokenSale.deploy(
    token.address,
    moneyContract.address,
    100
  );
  await tokenSale.deployed();

  await tokenInstance.initialTransfer(tokenSale.address, 100000000);
  console.log(
    `TokenSale: ${tokenSale.address}, MoneyCollector: ${moneyContract.address}, Token: ${token.address}`
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
