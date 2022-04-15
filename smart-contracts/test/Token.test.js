const { ethers } = require("hardhat");
const chai = require("./setupChai");
const { expect } = chai;
const { BigNumber } = ethers;

describe("Token", () => {
  let tokenInstance, deployer, recepient, anotherAccount;
  const name = "Flat Coin",
    symbol = "FLT",
    amount = 100000000;
  before(async () => {
    [deployer, recepient, anotherAccount] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(name, symbol, amount);
    tokenInstance = await token.deployed();
    await tokenInstance.initialTransfer(deployer.address, amount);
  });

  it("deployed Successfully", async () => {
    expect(tokenInstance.address).to.not.be.equal(0x0);
    expect(tokenInstance.address).to.not.be.equal(null);
    expect(tokenInstance.address).to.not.be.equal(undefined);
    expect(tokenInstance.address).to.not.be.equal("");
  });

  it("initial parameters should be correct", async () => {
    const _name = await tokenInstance.getName();
    const _symbol = await tokenInstance.getSymbol();
    const _owner = await tokenInstance.getOwner();
    const _amount = await tokenInstance.getTotalSupply();
    const deployerBal = await tokenInstance.getBalance(deployer.address);
    expect(_name).to.be.equal(name);
    expect(_symbol).to.be.equal(symbol);
    expect(_amount).to.be.equal(BigNumber.from(amount));
    expect(_owner).to.be.equal(deployer.address);
    expect(deployerBal).to.be.equal(BigNumber.from(amount));
  });

  it("Transfering of Tokens", async () => {
    const amountToTransfer = 2000;
    await expect(
      tokenInstance
        .connect(recepient)
        .transfer(deployer.address, amountToTransfer),
      "Should not be executed if the account does not have enough tokens !!"
    ).to.eventually.be.rejected;

    const prevBalanceSender = await tokenInstance.getBalance(deployer.address);
    await expect(tokenInstance.transfer(recepient.address, amountToTransfer)).to
      .eventually.be.fulfilled;
    const recepientAddress = await tokenInstance.getBalance(recepient.address);
    const afterBalanceSender = await tokenInstance.getBalance(deployer.address);
    expect(recepientAddress).to.be.equal(BigNumber.from(amountToTransfer));
    expect(afterBalanceSender).to.be.equal(
      BigNumber.from(prevBalanceSender).sub(amountToTransfer)
    );
  });

  it("Allowance", async () => {
    const amountToTransfer = 200;

    const senderBalanceBefore = await tokenInstance.getBalance(
      recepient.address
    );
    await expect(
      tokenInstance.approve(recepient.address, anotherAccount.address, 100),
      "Approval amount set to 100"
    ).to.eventually.be.fulfilled;

    await expect(
      tokenInstance.transferFrom(
        recepient.address,
        anotherAccount.address,
        amountToTransfer
      ),
      "Should be rejected if amount send is more than the allowed value !!"
    ).to.eventually.be.rejected;

    await expect(
      tokenInstance.approve(
        recepient.address,
        anotherAccount.address,
        amountToTransfer
      ),
      "Approval amount set to 200"
    ).to.eventually.be.fulfilled;

    await expect(
      tokenInstance.transferFrom(
        recepient.address,
        anotherAccount.address,
        amountToTransfer
      ),
      "Executing transaction from recepient to anotherAccount "
    ).to.eventually.be.fulfilled;

    const receiverBalance = await tokenInstance.getBalance(
      anotherAccount.address
    );
    const senderBalanceAfter = await tokenInstance.getBalance(
      recepient.address
    );

    expect(receiverBalance).to.be.equal(BigNumber.from(amountToTransfer));

    expect(senderBalanceAfter).to.be.equal(
      BigNumber.from(senderBalanceBefore).sub(amountToTransfer)
    );
  });
});
