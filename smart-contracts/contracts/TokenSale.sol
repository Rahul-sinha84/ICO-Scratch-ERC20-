// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Token.sol";
import "./KycContract.sol";
import "./MoneyCollector.sol";

contract TokenSale is KYCContract {
    Token tokenContract;
    MoneyCollector moneyContract;
    uint256 private rate;
    uint256 public weiCollected;
    uint256 public tokenCollected;

    event TokenBuy(address buyer, uint256 amount, uint256 totalWei);
    event MoneyTransferred(address receiver, uint256 amount);

    constructor(
        Token _tokenContract,
        MoneyCollector _moneyContract,
        uint256 _rate
    ) {
        tokenContract = _tokenContract;
        moneyContract = _moneyContract;
        rate = _rate;
    }

    function getTokenFromWei(uint256 _value) public view returns (uint256) {
        uint256 value = _value / rate;
        return value;
    }

    function buyToken(uint256 _tokenAmount) public payable {
        require(checkKyc(msg.sender), "Not KYC registered !!");
        require(
            getTokenFromWei(msg.value) == _tokenAmount,
            "Requested Token is not equal to the wei provided !!"
        );
        require(
            tokenContract.getBalance(address(this)) >= _tokenAmount,
            "Not enough token left !!"
        );
        require(
            tokenContract.transfer(msg.sender, _tokenAmount),
            "Some error occured while transferring the tokens !!"
        );
        weiTransfer();
        weiCollected += msg.value;
        tokenCollected += _tokenAmount;

        emit TokenBuy(msg.sender, _tokenAmount, weiCollected);
    }

    function weiTransfer() public payable {
        (bool success, ) = payable(address(moneyContract)).call{
            value: msg.value
        }("");
        require(
            success,
            "Some error occurred while transferring the wei to the moneyContract !!"
        );

        emit MoneyTransferred(address(moneyContract), msg.value);
    }

    receive() external payable {
        buyToken(getTokenFromWei(msg.value));
    }
}
