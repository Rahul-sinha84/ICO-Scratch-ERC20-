// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract KYCContract {
    address private owner;
    mapping(address => bool) isKyc;
    uint256 private totalKYCs;

    event KycUpdate(address user, string message);

    constructor() {
        owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getTotalKyc() public view returns (uint256) {
        return totalKYCs;
    }

    function checkKyc(address _address) public view returns (bool) {
        return isKyc[_address];
    }

    function approveKyc(address _address) public onlyOwner {
        require(!isKyc[_address], "Already KYC approved !!");
        isKyc[_address] = true;
        totalKYCs++;
        emit KycUpdate(_address, "KYC approved Successfully !!");
    }

    function revokeKyc(address _address) public onlyOwner {
        require(isKyc[_address], "Not KYC approved !!");
        isKyc[_address] = false;
        totalKYCs--;
        emit KycUpdate(_address, "KYC revoked Successfully !!");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner required !!");
        _;
    }
}
