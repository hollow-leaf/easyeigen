(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[818],{60777:function(n,e,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/relayer",function(){return i(52263)}])},52263:function(n,e,i){"use strict";i.r(e),i.d(e,{default:function(){return w}});var t=i(85893),a=i(86886),s=i(66242),r=i(15861),c=i(83321),o=i(99937),l=i(69077),d=i(67294),x=i(66730),u=i(18542),h=i(92599);function f(n){let{isRelayer:e,stBalance:i,isBan:s}=n;return(0,t.jsx)(a.ZP,{container:!0,item:!0,justifyContent:"space-between",alignItems:"center",sx:{padding:"0 0 20px 0"},children:s?(0,t.jsx)(a.ZP,{container:!0,item:!0,alignItems:"center",justifyContent:"center",sx:{padding:"0 0 20px 0"},children:(0,t.jsx)("div",{style:{display:"flex"},children:(0,t.jsx)(r.Z,{display:"inline-block",sx:{fontSize:"20px"},children:"You are a bad guy."})})}):e?(0,t.jsx)(a.ZP,{container:!0,item:!0,alignItems:"center",justifyContent:"center",sx:{padding:"0 0 20px 0"},children:(0,t.jsx)("div",{style:{display:"flex"},children:(0,t.jsx)(r.Z,{display:"inline-block",sx:{fontSize:"20px"},children:"You already registered"})})}):(0,t.jsx)(a.ZP,{container:!0,item:!0,alignItems:"center",justifyContent:"center",sx:{padding:"0 0 20px 0"},children:(0,t.jsx)("div",{style:{display:"flex"},children:(0,t.jsx)(r.Z,{display:"inline-block",sx:{fontSize:"20px"},children:Number(i)>1?(0,t.jsxs)(t.Fragment,{children:["You have ",i," EE",(0,t.jsx)("br",{}),"You can register relayer \uD83E\uDD73"]}):(0,t.jsx)(t.Fragment,{children:"You need to have more than1 EE"})})})})})}var p=i(59495),j=i(56371),y=i(51039);function m(n){let{}=n,{address:e}=(0,l.mA)(),[i,s]=(0,d.useState)(!1),r=(0,x.A)(),m=(0,x.h)(),[g,w]=(0,d.useState)(!1),b=(0,y.Q)(),Z=function(){let n=(0,x.A)(),{address:e}=(0,l.mA)(),{data:i}=(0,l.do)({address:n,abi:u.Z,functionName:"isBan",args:[e]});return!!i}();async function C(){s(!0);let n=await (0,o.$q)({address:m,abi:p.H,functionName:"approve",args:[r.toString(),(0,j.parseEther)("1")]}),{hash:e}=await (0,o.n9)(n);await (0,o.Mn)({confirmations:3,hash:e});let i=await (0,o.$q)({address:r,abi:u.Z,functionName:"register"}),{hash:t}=await (0,o.n9)(i);await (0,o.Mn)({confirmations:3,hash:t})}async function E(){s(!0);let n=await (0,o.$q)({address:r,abi:u.Z,functionName:"quit"}),{hash:e}=await (0,o.n9)(n);await (0,o.Mn)({confirmations:3,hash:e})}async function P(){let n=await (0,o.a4)({address:r,abi:u.Z,functionName:"registered",args:[e]});console.log(!!n),w(!!n)}return(0,d.useEffect)(()=>{e&&P()},[e]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(a.ZP,{container:!0,rowSpacing:4,justifyContent:"center",children:[(0,t.jsx)(f,{stBalance:b,isRelayer:g,isBan:Z}),(0,t.jsx)(a.ZP,{container:!0,item:!0,xs:12,columnSpacing:3,justifyContent:"center",children:(0,t.jsx)(a.ZP,{item:!0,children:(0,t.jsx)(c.Z,{variant:"contained",disabled:i,color:g?"error":"success",style:{textTransform:"none"},sx:{width:"120px"},onClick:()=>{g?E().finally(async()=>{await P(),s(!1)}):C().finally(async()=>{await P(),s(!1)})},children:g?"Quit":"Register"})})})]}),(0,t.jsx)(h.o,{open:i})]})}function g(){return(0,t.jsxs)(s.Z,{sx:{p:5,backgroundColor:"rgba(124,124,124)",boxShadow:"0px 0px",width:"50%"},style:{borderRadius:"20px"},children:[(0,t.jsx)(a.ZP,{container:!0,item:!0,alignItems:"center",justifyContent:"center",sx:{padding:"0 0 20px 0"},children:(0,t.jsx)("div",{style:{display:"flex"},children:(0,t.jsx)(r.Z,{display:"inline-block",sx:{fontSize:"20px"},children:"Relayer"})})}),(0,t.jsx)(m,{})]})}var w=function(n){return(0,t.jsx)(a.ZP,{sx:{m:0},container:!0,rowSpacing:4,children:(0,t.jsx)(a.ZP,{container:!0,item:!0,justifyContent:"center",children:(0,t.jsx)(g,{})})})}}},function(n){n.O(0,[449,657,560,774,888,179],function(){return n(n.s=60777)}),_N_E=n.O()}]);