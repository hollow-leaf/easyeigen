// SPDX-License-Identifier: LGPL-v3
pragma solidity >=0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Restake {
    IERC20 public eevmos;
    constructor(address _eevmos) {
        eevmos = IERC20(_eevmos);
    }

    function register() public {
        require(eevmos.balanceOf(msg.sender) >= 1 * 10 ** 18, "You need at least 1 EEVMOS to register");
        eevmos.transferFrom(msg.sender, address(this), 1* 10 ** 18);
    }
}
