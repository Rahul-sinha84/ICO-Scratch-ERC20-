// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MoneyCollector {
    address private owner;

    event MoneyIn(address sender, uint256 amount, uint256 balance);
    event MoneyWithdrawn(address receiver, uint256 amount, uint256 balance);

    constructor() {
        owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function deposit() public payable {
        emit MoneyIn(msg.sender, msg.value, getBalance());
    }

    function withdrawMoney(uint256 _amount) public {
        require(msg.sender == owner, "Only Owner required !!");
        require(
            getBalance() >= _amount,
            "Requested amount is greater than actual balance !!"
        );

        (bool success, ) = payable(owner).call{value: _amount}("");
        require(success, "Transaction failed !!");
        emit MoneyWithdrawn(owner, _amount, getBalance());
    }

    receive() external payable {
        deposit();
    }
}
