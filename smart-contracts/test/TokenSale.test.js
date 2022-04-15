const { ethers, waffle } = require("hardhat");
const chai = require("chai");
const expect = chai.expect;
const { BigNumber } = ethers;

describe("TokenSale", () => {
  let tokenSaleInstance,
    moneyCollectorInstance,
    tokenInstance,
    deployer,
    recepient,
    name = "FLat Coin",
    symbol = "FLT",
    totalTokens = 100000000,
    rate = 1,
    provider = waffle.provider;

  before(async () => {
    [deployer, recepient] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(name, symbol, totalTokens);
    tokenInstance = await token.deployed();

    const MoneyCollector = await ethers.getContractFactory("MoneyCollector");
    const moneyCollector = await MoneyCollector.deploy();
    moneyCollectorInstance = await moneyCollector.deployed();

    const TokenSale = await ethers.getContractFactory("TokenSale");
    const tokenSale = await TokenSale.deploy(
      tokenInstance.address,
      moneyCollectorInstance.address,
      rate
    );
    tokenSaleInstance = await tokenSale.deployed();

    await tokenInstance.initialTransfer(tokenSaleInstance.address, totalTokens);
  });

  it("Deployed Successfully", async () => {
    expect(moneyCollectorInstance.address).to.be.not.equal(0x0);
    expect(moneyCollectorInstance.address).to.be.not.equal(null);
    expect(moneyCollectorInstance.address).to.be.not.equal(undefined);
    expect(moneyCollectorInstance.address).to.be.not.equal("");

    expect(tokenSaleInstance.address).to.be.not.equal(0x0);
    expect(tokenSaleInstance.address).to.be.not.equal(null);
    expect(tokenSaleInstance.address).to.be.not.equal(undefined);
    expect(tokenSaleInstance.address).to.be.not.equal("");

    expect(tokenInstance.address).to.be.not.equal(0x0);
    expect(tokenInstance.address).to.be.not.equal(null);
    expect(tokenInstance.address).to.be.not.equal(undefined);
    expect(tokenInstance.address).to.be.not.equal("");
  });

  it("Initial parameters should be correct", async () => {
    const _name = await tokenInstance.getName();
    const _symbol = await tokenInstance.getSymbol();
    const _owner = await tokenInstance.getOwner();
    const _amount = await tokenInstance.getTotalSupply();
    const contractBalance = await tokenInstance.getBalance(
      tokenSaleInstance.address
    );
    expect(_name).to.be.equal(name);
    expect(_symbol).to.be.equal(symbol);
    expect(_amount).to.be.equal(BigNumber.from(totalTokens));
    expect(_owner).to.be.equal(deployer.address);
    expect(contractBalance).to.be.equal(BigNumber.from(totalTokens));

    const _rate = await tokenSaleInstance.rate();
    expect(_rate).to.be.equal(BigNumber.from(rate));
  });

  it("KYC handle", async () => {
    await expect(tokenSaleInstance.approveKyc(deployer.address)).to.eventually
      .be.fulfilled;
    await expect(
      tokenSaleInstance.checkKyc(deployer.address)
    ).to.eventually.be.equal(true);

    await expect(
      tokenSaleInstance.checkKyc(recepient.address)
    ).to.eventually.be.equal(false);
    await expect(tokenSaleInstance.revokeKyc(recepient.address)).to.eventually
      .be.rejected;

    await expect(tokenSaleInstance.approveKyc(deployer.address)).to.eventually
      .be.rejected;
    await expect(tokenSaleInstance.revokeKyc(deployer.address)).to.eventually.be
      .fulfilled;
    const val = await tokenSaleInstance.checkKyc(deployer.address);
    expect(val).to.be.equal(false);
  });

  const depTokens = 5000;
  it("Buy Tokens", async () => {
    await expect(
      tokenSaleInstance.buyToken(depTokens, { value: depTokens }),
      "Not KYC registered !!"
    ).to.eventually.be.rejected;
    await expect(tokenSaleInstance.approveKyc(deployer.address)).to.eventually
      .be.fulfilled;
    await expect(
      tokenSaleInstance.buyToken(depTokens, { value: depTokens + 1 }),
      "Token price is not equal to the given amount !!"
    ).to.eventually.be.rejected;
    await expect(
      tokenSaleInstance.buyToken(totalTokens + 1, { value: totalTokens + 1 }),
      "The requested amount of token is greater than the available tokens !!"
    ).to.eventually.be.rejected;

    await expect(tokenSaleInstance.buyToken(depTokens, { value: depTokens })).to
      .eventually.be.fulfilled;
    const depTokensAfter = await tokenInstance.getBalance(deployer.address);
    const weiCollected = await tokenSaleInstance.weiCollected();
    const tokenCollected = await tokenSaleInstance.tokenCollected();
    const contractBalance = await tokenInstance.getBalance(
      tokenSaleInstance.address
    );
    expect(depTokensAfter).to.be.equal(BigNumber.from(depTokens));
    expect(weiCollected).to.be.equal(BigNumber.from(depTokens));
    expect(tokenCollected).to.be.equal(BigNumber.from(depTokens));
    expect(contractBalance).to.be.equal(
      BigNumber.from(totalTokens).sub(depTokens)
    );
  });

  it("Withdrawl of money", async () => {
    const moneyCollected = await moneyCollectorInstance.getBalance();
    expect(moneyCollected).to.be.equal(BigNumber.from(depTokens));

    await expect(
      moneyCollectorInstance.connect(recepient).withdrawMoney(depTokens),
      "Only can be withdrawn by the owner !!"
    ).to.eventually.be.rejected;
    await expect(
      moneyCollectorInstance.withdrawMoney(depTokens + 1),
      "Cannot withdraw money more than the available money !!"
    ).to.eventually.be.rejected;

    await expect(moneyCollectorInstance.withdrawMoney(depTokens)).to.eventually
      .be.fulfilled;

    const moneyContractBal = await provider.getBalance(
      moneyCollectorInstance.address
    );
    expect(moneyContractBal).to.be.equal(0);
  });
});
