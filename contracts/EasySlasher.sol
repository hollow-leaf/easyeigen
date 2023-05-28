// SPDX-License-Identifier: LGPL-v3
// Slashing is move the control access from others to this contract
pragma solidity >=0.8.17;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract EasySlasher is Ownable {

    mapping(address => mapping(address => bool)) internal _whitelistedContractDetails;
    mapping(address => bool) internal frozenStatus;

    /// @notice Emitted when `operator` begins to allow `contractAddress` to slash them.
    event OptedIntoSlashing(address indexed operator, address indexed contractAddress);

    /// @notice Emitted when `contractAddress` signals that it will no longer be able to slash `operator` when the `contractCanSlashOperator`.
    event SlashingAbilityRevoked(address indexed operator, address indexed contractAddress, bool contractCanSlashOperator);

    /**
     * @notice Emitted when `slashingContract` 'freezes' the `slashedOperator`.
     * @dev The `slashingContract` must have permission to slash the `slashedOperator`, i.e. `canSlash(slasherOperator, slashingContract)` must return 'true'.
     */
    event OperatorFrozen(address indexed slashedOperator, address indexed slashingContract);

    /// @notice Emitted when `previouslySlashedAddress` is 'unfrozen', allowing them to again move deposited funds within EigenLayer.
    event FrozenStatusReset(address indexed previouslySlashedAddress);


    /**
     * @notice Gives the `contractAddress` permission to slash the funds of the caller.
     * @dev Typically, this function must be called prior to registering for a middleware.
     */
    function optIntoSlashing(address contractAddress) external {
        // require(delegation.isOperator(msg.sender), "Slasher.optIntoSlashing: msg.sender is not a registered operator");
        _optIntoSlashing(msg.sender, contractAddress);
    }

    /**
     * @notice Used for 'slashing' a certain operator.
     * @param toBeFrozen The operator to be frozen.
     * @dev Technically the operator is 'frozen' (hence the name of this function), and then subject to slashing pending a decision by a human-in-the-loop.
     * @dev The operator must have previously given the caller (which should be a contract) the ability to slash them, through a call to `optIntoSlashing`.
     */
    function freezeOperator(address toBeFrozen) external {
        require(
            canSlash(toBeFrozen, msg.sender),
            "Slasher.freezeOperator: msg.sender does not have permission to slash this operator"
        );
        _freezeOperator(toBeFrozen, msg.sender);
    }

    /**
     * @notice Removes the 'frozen' status from each of the `frozenAddresses`
     * @dev Callable only by the contract owner (i.e. governance).
     */
    function resetFrozenStatus(address[] calldata frozenAddresses) external onlyOwner {
        for (uint256 i = 0; i < frozenAddresses.length;) {
            _resetFrozenStatus(frozenAddresses[i]);
            unchecked {
                ++i;
            }
        }
    }

    /**
     * @notice this function is a called by middlewares during an operator's deregistration to make sure the operator's stake at deregistration 
     *         is slashable until serveUntilBlock
     * @param operator the operator whose stake update is being recorded
     * @dev removes the middleware's slashing contract to the operator's linked list and revokes the middleware's (i.e. caller's) ability to
     * slash `operator` once `serveUntilBlock` is reached
     */
    function revokeSlashingAbility(address operator, address contractAddress) external {
        // revoke the middleware's ability to slash `operator` after `serverUntil`
        _revokeSlashingAbility(operator, contractAddress);
    }

    /**
     * @notice Used to determine whether `staker` is actively 'frozen'. If a staker is frozen, then they are potentially subject to
     * slashing of their funds, and cannot cannot deposit or withdraw from the strategyManager until the slashing process is completed
     * and the staker's status is reset (to 'unfrozen').
     * @param staker The staker of interest.
     * @return Returns 'true' if `staker` themselves has their status set to frozen, OR if the staker is delegated
     * to an operator who has their status set to frozen. Otherwise returns 'false'.
     */
    function isFrozen(address staker) external view returns (bool) {
        if (frozenStatus[staker]) {
            return true;
        // } else if (delegation.isDelegated(staker)) {
        //     address operatorAddress = delegation.delegatedTo(staker);
        //     return (frozenStatus[operatorAddress]);
        } else {
            return false;
        }
    }

    /// @notice Returns true if `slashingContract` is currently allowed to slash `toBeSlashed`.
    function canSlash(address toBeSlashed, address slashingContract) public view returns (bool) {
        if (_whitelistedContractDetails[toBeSlashed][slashingContract]) {
            return true;
        } else {
            return false;
        }
    }

    // INTERNAL FUNCTIONS
    function _optIntoSlashing(address operator, address contractAddress) internal {
        //allow the contract to slash anytime
        _whitelistedContractDetails[operator][contractAddress] = true;
        emit OptedIntoSlashing(operator, contractAddress);
    }

    function _revokeSlashingAbility(address operator, address contractAddress) internal {
        require(_whitelistedContractDetails[operator][contractAddress] == true, "EasySlasher._revokeSlashingAbility: contract already can not slash");
        // contractAddress can not slash operator now
        _whitelistedContractDetails[operator][contractAddress] = false;
        emit SlashingAbilityRevoked(operator, contractAddress, false);
    }

    function _freezeOperator(address toBeFrozen, address slashingContract) internal {
        if (!frozenStatus[toBeFrozen]) {
            frozenStatus[toBeFrozen] = true;
            emit OperatorFrozen(toBeFrozen, slashingContract);
        }
    }

    function _resetFrozenStatus(address previouslySlashedAddress) internal {
        if (frozenStatus[previouslySlashedAddress]) {
            frozenStatus[previouslySlashedAddress] = false;
            emit FrozenStatusReset(previouslySlashedAddress);
        }
    }

}