// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Token {
    string private name;
    string private symbol;
    uint256 private totalTokens;
    address private owner;

    event Transfer(address from, address to, uint256 value);
    event Allowance(address spender, address receiver, uint256 value);

    // storing tokens for seperate users
    mapping(address => uint256) private owners;

    //allowance for 'transfer from' functionality
    mapping(address => mapping(address => uint256)) private allowances;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalTokens
    ) {
        name = _name;
        symbol = _symbol;
        totalTokens = _totalTokens;
        owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getSymbol() public view returns (string memory) {
        return symbol;
    }

    function getTotalSupply() public view returns (uint256) {
        return totalTokens;
    }

    function getBalance(address _address) public view returns (uint256) {
        return owners[_address];
    }

    function getAllowedBalance(address _from, address _to)
        public
        view
        returns (uint256)
    {
        return allowances[_from][_to];
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(
            getBalance(msg.sender) >= _value,
            "Not enough value in the sender's account !!"
        );

        owners[msg.sender] -= _value;
        owners[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(
        address _spender,
        address _receiver,
        uint256 _value
    ) public {
        allowances[_spender][_receiver] = _value;

        emit Allowance(_spender, _receiver, _value);
    }

    function transferFrom(
        address _spender,
        address _receiver,
        uint256 _value
    ) public {
        require(
            allowances[_spender][_receiver] >= _value,
            "Requested value is more than the allowed value !!"
        );
        require(
            owners[_spender] >= _value,
            "Not enough value in the sender's account !!"
        );
        owners[_spender] -= _value;
        owners[_receiver] += _value;

        allowances[_spender][_receiver] -= _value;

        emit Transfer(_spender, _receiver, _value);
    }

    function initialTransfer(address _address, uint256 _value) public {
        require(msg.sender == owner, "Executed only by the owner !!");
        require(
            getTotalSupply() >= _value,
            "Cannot exceeds the total token supply !!"
        );
        require(_address != address(0), "Cannot supply to 0th account !!");

        owners[_address] += _value;
        emit Transfer(address(this), _address, _value);
    }
}
