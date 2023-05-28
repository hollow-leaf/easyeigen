// SPDX-License-Identifier: LGPL-v3
// Slashing is move the control access from others to this contract
pragma solidity >=0.8.17;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract EasySlasher is Ownable {

    mapping(address => bool) internal banList;

    event BanStaker(address indexed slashedStaker, address indexed slashingContract);
    event UnbanStaker(address indexed slashedStaker, address indexed slashingContract);

    function banStaker(address[] calldata stakerAddresses) external onlyOwner {
        for (uint256 i = 0; i < stakerAddresses.length;) {
            _banStaker(stakerAddresses[i]);
            unchecked {
                ++i;
            }
        }
    }

    function unbanStaker(address[] calldata stakerAddresses) external onlyOwner {
        for (uint256 i = 0; i < stakerAddresses.length;) {
            _unbanStaker(stakerAddresses[i]);
            unchecked {
                ++i;
            }
        }
    }

    function isBan(address staker) external view returns (bool) {
        return banList[staker];
    }

    // Internal Functions
    function _banStaker(address staker) internal {
        if (!banList[staker]) {
            banList[staker] = true;
            emit BanStaker(staker, address(this));
        }
    }

    function _unbanStaker(address staker) internal {
        if (banList[staker]) {
            banList[staker] = false;
            emit UnbanStaker(staker, address(this));
        }
    }
}
