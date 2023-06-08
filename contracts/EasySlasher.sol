// SPDX-License-Identifier: LGPL-v3
// Slashing is move the control access from others to this contract
pragma solidity >=0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interface/ISlashVerifier.sol";

contract EasySlasher is Ownable {

    ISlashVerifier public slashVerifier;

    constructor(address _slashVerifierAddress) {
        slashVerifier = ISlashVerifier(_slashVerifierAddress);
    }

    struct ProofData {
        uint[2] a;
        uint[2][2] b;
        uint[2] c;
    }

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

    function verifyProof(ProofData memory proofData, uint[4] memory input) internal view returns (bool) {
        return slashVerifier.verifyProof(
            proofData.a,
            proofData.b,
            proofData.c,
            input
        );
    }
}
