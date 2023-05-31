"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[560],{92599:function(e,t,n){n.d(t,{o:function(){return u}});var a=n(85893),i=n(50657),s=n(37645),p=n(6514),r=n(81458);function u(e){let{open:t}=e;return(0,a.jsxs)(i.Z,{open:t,children:[(0,a.jsx)(s.Z,{children:"Transaction Confirming..."}),(0,a.jsx)(p.Z,{children:(0,a.jsx)(r.Z,{})})]})}},18542:function(e,t,n){n.d(t,{Z:function(){return a}});let a=[{inputs:[{internalType:"address",name:"_slashVerifierAddress",type:"address"},{internalType:"address",name:"_eevmos",type:"address"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"slashedStaker",type:"address"},{indexed:!0,internalType:"address",name:"slashingContract",type:"address"}],name:"BanStaker",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"slashedStaker",type:"address"},{indexed:!0,internalType:"address",name:"slashingContract",type:"address"}],name:"UnbanStaker",type:"event"},{inputs:[{internalType:"address[]",name:"stakerAddresses",type:"address[]"}],name:"banStaker",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"relayer",type:"address"}],name:"checkRelayer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"eevmos",outputs:[{internalType:"contract IERC20",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"relayer",type:"address"}],name:"getRelayer",outputs:[{internalType:"uint256[4]",name:"",type:"uint256[4]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"staker",type:"address"}],name:"isBan",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"quit",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"register",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"registered",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"relayer",type:"uint256"},{internalType:"uint256",name:"receiver",type:"uint256"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"uint256",name:"hash",type:"uint256"}],name:"relay",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"},{internalType:"uint256",name:"",type:"uint256"}],name:"relayProofs",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{components:[{internalType:"uint256[2]",name:"a",type:"uint256[2]"},{internalType:"uint256[2][2]",name:"b",type:"uint256[2][2]"},{internalType:"uint256[2]",name:"c",type:"uint256[2]"}],internalType:"struct Restake.ProofData",name:"proofData",type:"tuple"},{internalType:"address",name:"relayer",type:"address"}],name:"slash",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"slashVerifier",outputs:[{internalType:"contract ISlashVerifier",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address[]",name:"stakerAddresses",type:"address[]"}],name:"unbanStaker",outputs:[],stateMutability:"nonpayable",type:"function"}]},59495:function(e,t,n){n.d(t,{H:function(){return a}});let a=[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Transfer",type:"event"},{stateMutability:"payable",type:"fallback"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"approveRequiredMethods",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"subtractedValue",type:"uint256"}],name:"decreaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"deposit",outputs:[],stateMutability:"payable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"deposits",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"string",name:"_validatorAddr",type:"string"}],name:"getDelegation",outputs:[{internalType:"uint256",name:"shares",type:"uint256"},{components:[{internalType:"string",name:"denom",type:"string"},{internalType:"uint256",name:"amount",type:"uint256"}],internalType:"struct Coin",name:"balance",type:"tuple"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"string",name:"_validatorAddr",type:"string"}],name:"getDelegationRewards",outputs:[{components:[{internalType:"string",name:"denom",type:"string"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"uint8",name:"precision",type:"uint8"}],internalType:"struct DecCoin[]",name:"rewards",type:"tuple[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"addedValue",type:"uint256"}],name:"increaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"string",name:"_validatorAddr",type:"string"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"staking",outputs:[{internalType:"int64",name:"completionTime",type:"int64"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"string",name:"_validatorAddr",type:"string"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"unstakeTokens",outputs:[{internalType:"int64",name:"completionTime",type:"int64"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"string",name:"_validatorAddr",type:"string"}],name:"withdrawRewards",outputs:[{components:[{internalType:"string",name:"denom",type:"string"},{internalType:"uint256",name:"amount",type:"uint256"}],internalType:"struct Coin[]",name:"amount",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"},{stateMutability:"payable",type:"receive"}]},51039:function(e,t,n){n.d(t,{Q:function(){return r},p:function(){return u}});var a=n(69077),i=n(66730),s=n(59495),p=n(76364);function r(){let e=(0,i.h)(),{address:t}=(0,a.mA)(),{data:n}=(0,a.do)({address:e,abi:s.H,functionName:"balanceOf",args:[t]});return n?(0,p.M)(n).toString():0}function u(){let{address:e}=(0,a.mA)(),{data:t,isError:n,isLoading:i}=(0,a.KQ)({address:e});return t?null==t?void 0:t.formatted.toString():null}},66730:function(e,t,n){n.d(t,{A:function(){return r},h:function(){return p}});var a=n(69077);let i={Alfajores:"","Gnosis Chiado":"",Goerli:"",hardhat:"","Mantle Testnet":"","Polygon Mumbai":"","Scroll Alpha":"",Sepolia:"","Evmos Testnet":"0xda4c3028d22290B337D9bd46B10F8C2522694600"},s={Alfajores:"","Gnosis Chiado":"",Goerli:"",hardhat:"","Mantle Testnet":"","Polygon Mumbai":"","Scroll Alpha":"",Sepolia:"","Evmos Testnet":"0x7eb88f14f90d86c5F28fD918Fad8620941c9f65B"};function p(){let{chain:e}=(0,a.LN)();return console.log("chain: ",e),void 0!==e?i[e.name]:""}function r(){let{chain:e}=(0,a.LN)();return console.log("chain: ",e),void 0!==e?s[e.name]:""}},76364:function(e,t,n){n.d(t,{M:function(){return s}});var a=n(2593),i=n(61744);function s(e){return Number(i.formatEther(e)).toFixed(6)}a.O$.from(10).pow(18)}}]);