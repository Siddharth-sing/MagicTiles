//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

////////////////// Using This ONE

contract Casino {
    address payable public _casinoOwner;

    constructor() {
        _casinoOwner = payable(msg.sender);
    }

    uint256 public _balanceOfCasino;
    uint256 public _gamblerId;
    uint256 GAMBLER_CREATION_CHARGE = 1 ether;
    struct Gambler {
        uint256 gamblerIDS;
        address gamblerWalletAdressS;
        uint256 gamblePriceS;
    }
    mapping(uint256 => Gambler) private _gamblersList;
    event GamblerCreated(uint256, address, uint256);

    function createGambler(address _gamblerWalletAddress) public payable {
        require(msg.value>0, "Error placing bet !!");
        (bool sent, bytes memory data) = address(this).call{value: msg.value}("");
        require(sent, "Failed to send Ether to casino");
        _gamblerId = _gamblerId + 1;
        _gamblersList[_gamblerId] = Gambler(
            _gamblerId,
            _gamblerWalletAddress,
            msg.value
        );
        emit GamblerCreated(_gamblerId, _gamblerWalletAddress, msg.value);
    }

    function placeBetIfGamblerPreExist(uint256 _GamblerId) public payable {
        require(msg.value>0, "Error placing bet !!");
        (bool sent, bytes memory data) = address(this).call{value: msg.value}("");
        _gamblersList[_GamblerId].gamblePriceS = msg.value;
    }

    function checkExistingGambler() public view returns (uint256 id)
    {
        for (uint256 i = 1; i <= _gamblerId; i++) {
            if (_gamblersList[i].gamblerWalletAdressS == msg.sender) {
                return i;
            }
        }
    }

    // how to add ETH to casino as an owner
    function ownerAddsFundsToCasino() public payable returns (bool) {
        (bool sent, bytes memory data) = address(this).call{value: msg.value}(
            ""
        );
        return sent;
    }

    function result(bool win, uint256 gambler_Id) public {
        if (win) {
            uint256 prizeETH = _gamblersList[gambler_Id].gamblePriceS * 2;
            require(
                address(this).balance >= prizeETH,
                "Not Enough funds right now"
            );
            emit GamblerCreated(
                gambler_Id,
                _gamblersList[gambler_Id].gamblerWalletAdressS,
                prizeETH
            );
            (bool sent, bytes memory data) = _gamblersList[gambler_Id]
                .gamblerWalletAdressS
                .call{value: prizeETH}("");
            require(sent, "Failed to send Ether to casino owner");
            _balanceOfCasino -= prizeETH;
        }
    }

    receive() external payable {
        _balanceOfCasino = msg.value + _balanceOfCasino;
    }

    fallback() external payable {}
}
