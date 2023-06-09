<div align="center">
  <h1> EasyEigenFactory </h1>
</div>

EasyEigen Factory is a project inspire from  Eigen Layer Restaking Solution. We suggest everyone design their own restake contract and base on our zk and staker contracts.

---
## Demo Link

Staker EEVMOS Contract: [`0x42C5d61A1bCafeD5150c58d6274F6244E23441a9`](https://testnet.escan.live/address/0x42C5d61A1bCafeD5150c58d6274F6244E23441a9#code)

ZK verifier:
[`0x9C6603BB1F5a9781C9E2Bc5131189557aA350b81`](https://testnet.escan.live/address/0x9C6603BB1F5a9781C9E2Bc5131189557aA350b81#code)

Restake Contract & Cross-Chain: [`0xE8104407214415e5775e3643CAb2579b80712472`](https://testnet.escan.live/address/0xE8104407214415e5775e3643CAb2579b80712472#code)

EasyEigen Factory Github: [github.com/kidneyweakx/easyeigen](https://github.com/kidneyweakx/easyeigen)

Frontend: [kidneyweakx.com/easyeigen](https://kidneyweakx.com/easyeigen)

Demo Video: [YouTube](https://youtu.be/YF_5urb5VtQ)

## Our Tech Stack:

1. Solidity(staker and relayer) [`contracts`](./contracts/): for staking to EVMOS and restaking to ensure relayer safety.
2. Circom [`circom`](./circuits/): generate ZK proof to slash to evil relayer
3. Pre-compile Extension [`precompiles`](./contracts/precompiles/): to connect with EVMOS

## Project
Our project involves creating a restaking system that utilizes the EEF contract to provide pooled security using the EVMOS consensus. This allows us to create a secure and efficient system that is resistant to attacks and provides users with peace of mind.

In addition to the restaking system, we are also creating a cross-chain bridge that allows other non-Cosmos chains to deliver their data more securely and trustlessly. This bridge utilizes Zero Knowledge proofs to generate fraud proof and slash relayers, ensuring that the system remains secure and reliable.(Optimistic Method like Nomad Bridge)

Our demo provides an optimistic bridge solution that allows users to transfer assets between different chains with ease. The system is designed to be user-friendly and easy to use, allowing users to restake their assets and transfer them between chains with confidence.

Overall, our project aims to create a secure and efficient restaking system that utilizes the latest technologies to provide users with a seamless experience. We believe that our system has the potential to revolutionize the way that assets are restaked and transferred between different chains, and we are excited to continue developing and improving our solution.

Your contribution to this system is greatly appreciated. Your work on the EVMOS pre-compile has been instrumental in scaling the EVM and making it more efficient, which is crucial for achieving system decentralization. We are impressed by your expertise and dedication to improving the performance and security of the system.

## How we do it?

User can stake their EVMOS into LSD (Liquidity Staking Derivatives) and get EEVMOS token. This EEVMOS token can **"restake"** into the bridge to register relayer.
![2023-05-31 00.23.08.jpg](https://cdn.dorahacks.io/static/files/1886d7999a72ac05fe86853496eb02b9.jpg)

Then the relayer can stake it into another contract and do some cross-chain solutions (we use optimistic way to ensure the cross-chain safety)

If relayers cross fake proof. And Slasher can get their EEVMOS token.
It equals to slash relayer's token
![2023-05-31 00.23.13.jpg](https://cdn.dorahacks.io/static/files/1886d78cea38a40cf4ed5d9456e8e0b0.jpg)

## Step By Step

0. copy `.env.example` to `.env` and fill in private key

```bash
cp .env.example .env
```

1. deploy Stake contract to stake and store the address

> you need to edit [deployProcess](./scripts/tasks/deployProcess.ts) 

``` typescript
// delete the constructer (line 11)
const deployContract = await contractFactory.connect(signer).deploy()
```

> then, deploy the contract

``` bash
# deploy
npm run deploy:Staker

# stake
npm run stakeEE
```

2. compile zk and deploy verifier contract

``` bash
# compile zk and generate solidity
npm run circom:dev

# deploy
npm run deploy:zk
```

3. deploy restake contract

> write the contract address in [deployProcess](./scripts/tasks/deployProcess.ts) 

> then, deploy the contract

```bash
npm run deploy:Restake
```

4. now you can register or slash the relayers

> register relayer and relay fake data

```bash
npx ts-node ./scripts/slash/restake.ts
npx ts-node ./scripts/slash/relayer.ts
```

> slash it

```bash
npx ts-node ./scripts/slash/slash.ts
```

> unban slash idenity

```bash
npx ts-node ./scripts/slash/unban.ts
```

## Code Contributer
[kidneyweakx](https://github.com/kidneyweakx)

[Yeetai](https://github.com/yeeetai)

[PianoChicken](https://github.com/Pianochicken)