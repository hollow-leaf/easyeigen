import { BytesLike, ethers } from 'ethers'
import { config as dotenvConfig } from 'dotenv'
import { stakeABI, stakeAddress } from '../config'
import { sleep } from '../utils/helpers'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main () {
  const evmos = new ethers.providers.JsonRpcProvider(process.env.EVMOS_RPC_URL)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, evmos)
  const stakeContract = new ethers.Contract(stakeAddress.main, stakeABI.abi, wallet)
  const tx = await stakeContract.approveRequiredMethods()
  await tx.wait()
  console.log('Approved required methods')

  await sleep(5000)

  const nodeStake = 'evmosvaloper10t6kyy4jncvnevmgq6q2ntcy90gse3yxa7x2p4'
  const etherAmount = '0.1'
  const ethAmt = ethers.utils.parseEther(etherAmount)
  const stakingEstimateGas = await stakeContract.estimateGas.stakeTokens(nodeStake, ethAmt)
  const staking = await stakeContract.stakeTokens(nodeStake, ethAmt, { gasLimit: stakingEstimateGas })
  await staking.wait()
  console.log(`Staked ${etherAmount} EVMOS`)

  await sleep(5000)

  const delegation = await stakeContract.getDelegation(nodeStake)
  console.log('Delegation', delegation)

  const rewards = await stakeContract.getDelegationRewards(nodeStake)
  console.log('Rewards', rewards)

  const withdrawRewards = await stakeContract.withdrawRewards(nodeStake)
  console.log('withdrawRewards', withdrawRewards)
}

main().catch((e) => { console.error(e) })
