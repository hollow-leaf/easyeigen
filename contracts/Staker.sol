// SPDX-License-Identifier: LGPL-v3
pragma solidity >=0.8.17;

import "./precompiles/stateful/Staking.sol";
import "./precompiles/stateful/Distribution.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Staker is ERC20{
    string[] private stakingMethods = [MSG_DELEGATE];
    string[] private distributionMethods = [MSG_WITHDRAW_DELEGATOR_REWARD];

    constructor () ERC20("EEVMOS", "EE") {}

    function approveRequiredMethods() public {
        bool success = STAKING_CONTRACT.approve(
            msg.sender,
            type(uint256).max,
            stakingMethods
        );
        require(success, "Failed to approve delegate method");
        success = DISTRIBUTION_CONTRACT.approve(
            msg.sender,
            distributionMethods
        );
        require(success, "Failed to approve withdraw delegator rewards method");
    }

    function stakeTokens(
        string memory _validatorAddr
    ) public payable returns (int64 completionTime) {
        _mint(msg.sender, msg.value);
        approveRequiredMethods();
        return STAKING_CONTRACT.delegate(address(this), _validatorAddr, msg.value);
    }

    function unstakeTokens(
      string memory _validatorAddr, uint256 _amount
    ) public returns (int64 completionTime) {
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        _burn(msg.sender, _amount);
        return STAKING_CONTRACT.undelegate(address(this), _validatorAddr, _amount);
    }

    function withdrawRewards(
        string memory _validatorAddr
    ) public returns (Coin[] memory amount) {
        return
            DISTRIBUTION_CONTRACT.withdrawDelegatorRewards(
                msg.sender,
                _validatorAddr
            );
    }
    // view function
    function getDelegation(
        string memory _validatorAddr
    ) public view returns (uint256 shares, Coin memory balance) {
        return STAKING_CONTRACT.delegation(msg.sender, _validatorAddr);
    }
    function getDelegationRewards(
        string memory _validatorAddr
    ) public view returns (DecCoin[] memory rewards) {
        return
            DISTRIBUTION_CONTRACT.delegationRewards(msg.sender, _validatorAddr);
    }
    receive() external payable {}
}
