(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[797],{54997:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/stake",function(){return n(26593)}])},92599:function(e,t,n){"use strict";n.d(t,{o:function(){return u}});var a=n(85893),i=n(50657),r=n(37645),s=n(6514),o=n(81458);function u(e){let{open:t}=e;return(0,a.jsxs)(i.Z,{open:t,children:[(0,a.jsx)(r.Z,{children:"Transaction Confirming..."}),(0,a.jsx)(s.Z,{children:(0,a.jsx)(o.Z,{})})]})}},59495:function(e,t,n){"use strict";n.d(t,{H:function(){return a}});let a=[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Transfer",type:"event"},{stateMutability:"payable",type:"fallback"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"approveRequiredMethods",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"subtractedValue",type:"uint256"}],name:"decreaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"deposit",outputs:[],stateMutability:"payable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"deposits",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"string",name:"_validatorAddr",type:"string"}],name:"getDelegation",outputs:[{internalType:"uint256",name:"shares",type:"uint256"},{components:[{internalType:"string",name:"denom",type:"string"},{internalType:"uint256",name:"amount",type:"uint256"}],internalType:"struct Coin",name:"balance",type:"tuple"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"string",name:"_validatorAddr",type:"string"}],name:"getDelegationRewards",outputs:[{components:[{internalType:"string",name:"denom",type:"string"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"uint8",name:"precision",type:"uint8"}],internalType:"struct DecCoin[]",name:"rewards",type:"tuple[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"addedValue",type:"uint256"}],name:"increaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"string",name:"_validatorAddr",type:"string"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"staking",outputs:[{internalType:"int64",name:"completionTime",type:"int64"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"string",name:"_validatorAddr",type:"string"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"unstakeTokens",outputs:[{internalType:"int64",name:"completionTime",type:"int64"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"string",name:"_validatorAddr",type:"string"}],name:"withdrawRewards",outputs:[{components:[{internalType:"string",name:"denom",type:"string"},{internalType:"uint256",name:"amount",type:"uint256"}],internalType:"struct Coin[]",name:"amount",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"},{stateMutability:"payable",type:"receive"}]},51039:function(e,t,n){"use strict";n.d(t,{Q:function(){return o},p:function(){return u}});var a=n(69077),i=n(66730),r=n(59495),s=n(76364);function o(){let e=(0,i.h)(),{address:t}=(0,a.mA)(),{data:n}=(0,a.do)({address:e,abi:r.H,functionName:"balanceOf",args:[t]});return n?(0,s.M)(n).toString():0}function u(){let{address:e}=(0,a.mA)(),{data:t,isError:n,isLoading:i}=(0,a.KQ)({address:e});return t?null==t?void 0:t.formatted.toString():null}},66730:function(e,t,n){"use strict";n.d(t,{A:function(){return o},h:function(){return s}});var a=n(69077);let i={Alfajores:"","Gnosis Chiado":"",Goerli:"",hardhat:"","Mantle Testnet":"","Polygon Mumbai":"","Scroll Alpha":"",Sepolia:"","Evmos Testnet":"0xda4c3028d22290B337D9bd46B10F8C2522694600"},r={Alfajores:"","Gnosis Chiado":"",Goerli:"",hardhat:"","Mantle Testnet":"","Polygon Mumbai":"","Scroll Alpha":"",Sepolia:"","Evmos Testnet":"0x7eb88f14f90d86c5F28fD918Fad8620941c9f65B"};function s(){let{chain:e}=(0,a.LN)();return console.log("chain: ",e),void 0!==e?i[e.name]:""}function o(){let{chain:e}=(0,a.LN)();return console.log("chain: ",e),void 0!==e?r[e.name]:""}},26593:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return C}});var a=n(85893),i=n(86886),r=n(66242),s=n(15861),o=n(69077),u=n(67294),l=n(59495),p=n(11163),d=n(66730),y=n(83321),c=n(99937),m=n(56371),f=n(92599);function b(e){let{method:t,disabled:n,reverse:i,valAddress:r,balance:s}=e,[p,b]=(0,u.useState)(!1),x=(0,d.h)(),{address:h}=(0,o.mA)();async function T(e){b(!0);let t=await (0,c.$q)({address:x,abi:l.H,functionName:"deposit",overrides:{from:h,value:(0,m.parseEther)(e.toString())}}),{hash:n}=await (0,c.n9)(t);await (0,c.Mn)({confirmations:5,hash:n});let a=await (0,c.$q)({address:x,abi:l.H,functionName:"staking",args:[r,(0,m.parseEther)(e.toString())]}),{hash:i}=await (0,c.n9)(a);await (0,c.Mn)({hash:i})}async function g(e){b(!0),console.log(r,(0,m.parseEther)(e.toString()))}return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(y.Z,{variant:"contained",disabled:p,disableElevation:!0,color:"success",style:{textTransform:"none"},sx:{width:"120px"},onClick:()=>{t?T(s).finally(()=>{b(!1)}):g(s).finally(()=>{b(!1)})},children:"Next"}),(0,a.jsx)(f.o,{open:p})]})}function x(e){let{size:t="14px",balance:n,isTokenDisplayed:i=!0,type:r}=e;return(0,a.jsxs)(s.Z,{sx:{fontWeight:"normal",fontSize:t,padding:"0 0 20px 0"},children:[r," Balance: ",n]})}var h=n(46817),T=n(41796);function g(e){let{balance:t,onChange:n}=e,[r,s]=(0,u.useState)(0);return(0,u.useEffect)(()=>{s(0),n(0)},[t]),(0,a.jsxs)(i.ZP,{container:!0,item:!0,justifyContent:"space-between",alignItems:"center",sx:{padding:"0 0 5px 0"},children:[(0,a.jsx)(i.ZP,{item:!0,xs:9,children:(0,a.jsx)(h.Z,{placeholder:"Amount",value:r,type:"number",onChange:e=>{let t=e.target.value;s(Number(t)),n(Number(t))},sx:{ml:"0px",width:"100%"}})}),(0,a.jsx)(i.ZP,{item:!0,xs:2,children:(0,a.jsx)(y.Z,{variant:"outlined",size:"small",sx:{borderRadius:"20px"},style:{background:"#7c7c7c",color:(0,T.Fq)("#292929",.8),borderColor:(0,T.Fq)("#292929",.8),borderWidth:"2px",textTransform:"none"},onClick:()=>{s(Number(t)),n(Number(t))},children:"Max"})})]})}function v(e){let{onChange:t}=e,[n,r]=(0,u.useState)(!0),s=e=>{r(e),t(e)};return(0,a.jsxs)(i.ZP,{container:!0,item:!0,justifyContent:"space-between",alignItems:"center",sx:{padding:"0 0 20px 0"},children:[(0,a.jsx)(i.ZP,{container:!0,item:!0,xs:6,justifyContent:"flex-end",children:(0,a.jsx)(y.Z,{variant:"outlined",size:"large",sx:{borderRadius:"20px 0 0 20px",width:"100%",backgroundColor:!0===n?(0,T.Fq)("#000000",.8):"transparent",color:!0===n?"#fff":(0,T.Fq)("#000000",.8),"&:hover":{backgroundColor:(0,T.Fq)("#bdbdbd",.8)}},onClick:()=>s(!0),children:"Stake"})}),(0,a.jsx)(i.ZP,{container:!0,item:!0,xs:6,children:(0,a.jsx)(y.Z,{variant:"outlined",size:"large",sx:{borderRadius:"0 20px 20px 0",width:"100%",backgroundColor:!1===n?(0,T.Fq)("#000000",.8):"transparent",color:!1===n?"#fff":(0,T.Fq)("#000000",.8),"&:hover":{backgroundColor:(0,T.Fq)("#bdbdbd",.8)}},onClick:()=>s(!1),children:"Withdraw"})})]})}function w(e){let{size:t="18px",balance:n,isTokenDisplayed:i=!0}=e;return(0,a.jsxs)(s.Z,{sx:{fontWeight:"normal",fontSize:t},children:["Your EE: ",n]})}var j=n(51039);function M(e){var t;let{valAddress:n}=e,y=(0,d.h)(),{address:c}=(0,o.mA)(),[m,f]=(0,u.useState)(!1),[h,T]=(0,u.useState)((0,j.Q)()),[M,C]=(0,u.useState)((0,j.p)()),[S,k]=(0,u.useState)(!0),[Z,A]=(0,u.useState)(0),{data:_}=(0,o.do)({address:y,abi:l.H,functionName:"allowance",args:[c,y]}),E=(0,p.useRouter)();return(0,a.jsxs)(r.Z,{sx:{p:5,backgroundColor:"rgba(124,124,124)",boxShadow:"0px 0px",width:"50%"},style:{borderRadius:"20px"},children:[(0,a.jsx)(i.ZP,{container:!0,item:!0,alignItems:"center",justifyContent:"center",sx:{padding:"0 0 20px 0"},children:(0,a.jsx)("div",{style:{display:"flex"},children:(0,a.jsx)(s.Z,{display:"inline-block",sx:{fontSize:"20px"},children:"Stake"})})}),(0,a.jsx)(i.ZP,{container:!0,item:!0,sx:{padding:"0 0 20px 0"},justifyContent:"center",children:(0,a.jsx)(w,{balance:h,isTokenDisplayed:!1})}),(0,a.jsx)(v,{onChange:e=>{k(e)}}),(0,a.jsx)(g,{balance:S?M:h,onChange:e=>{A(e)}}),(0,a.jsx)(x,{type:S?"EVMOS":"EE",balance:S?M:h,isTokenDisplayed:!1,method:S}),(0,a.jsx)(i.ZP,{container:!0,item:!0,xs:12,alignItems:"center",justifyContent:"flex-end",children:(0,a.jsx)(b,{balance:Z,method:S,valAddress:null===(t=E.query)||void 0===t?void 0:t.valAddress})})]})}var C=function(e){return(0,a.jsx)(i.ZP,{sx:{m:0},container:!0,rowSpacing:4,children:(0,a.jsx)(i.ZP,{container:!0,item:!0,justifyContent:"center",children:(0,a.jsx)(M,{})})})}},76364:function(e,t,n){"use strict";n.d(t,{M:function(){return r}});var a=n(2593),i=n(61744);function r(e){return Number(i.formatEther(e)).toFixed(6)}a.O$.from(10).pow(18)}},function(e){e.O(0,[449,657,817,774,888,179],function(){return e(e.s=54997)}),_N_E=e.O()}]);