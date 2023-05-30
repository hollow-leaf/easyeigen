// SPDX-License-Identifier: LGPL-v3
pragma solidity >=0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "./EasySlasher.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./interface/ISlashVerifier.sol";
contract Restake is Ownable {
    IERC20 public eevmos;

    mapping(address => uint[4]) public relayProofs;
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

    mapping(address => bool) public registered;
    function register() public {
        require(eevmos.balanceOf(msg.sender) >= 1 * 10 ** 18, "You need at least 1 EEVMOS to register");
        eevmos.transferFrom(msg.sender, address(this), 1* 10 ** 18);
        registered[msg.sender] = true;
    }

    function quit() public {
        require(registered[msg.sender], "You need to register first");
        registered[msg.sender] = false;
        eevmos.transferFrom(address(this), msg.sender, 1* 10 ** 18); 
    }
    
    function relay(uint relayer, uint receiver, uint amount, uint hash) public {
        require(registered[msg.sender], "You need to register first");
        relayProofs[msg.sender] = [relayer, receiver, amount, hash];
    }

    function slash (ProofData memory proofData, address relayer) external {      
        require(verifyProof(proofData, relayProofs[relayer]), "Verification Failed");
        registered[relayer] = false;
        registered[msg.sender] = true;
    }
}
