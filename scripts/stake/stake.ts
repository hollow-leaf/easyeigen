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

  const nodeStake = 'evmos1lngjsefg92rpyjk9860wnm6mspkz9x2g9q8k8z'
  const ethAmt = ethers.utils.parseEther('1')
  const staking = await stakeContract.stakeTokens(nodeStake, ethAmt)
  await staking.wait()

  console.log('Staked 1 EVMOS')

  await sleep(5000)

  const withdrawRewards = await stakeContract.withdrawRewards(nodeStake)
  console.log('Withdrew rewards', withdrawRewards)

  await sleep(5000)

  const delegation = await stakeContract.delegation(nodeStake)
  console.log('Delegation', delegation)

  const rewards = await stakeContract.getDelegateRewards(nodeStake)
  console.log('Rewards', rewards)
}

main().catch((e) => { console.error(e) })
