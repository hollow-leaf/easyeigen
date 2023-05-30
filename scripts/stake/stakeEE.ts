import { BytesLike, ethers } from 'ethers'
import { config as dotenvConfig } from 'dotenv'
import { stakerABI, stakerAddress } from '../config'
import { sleep } from '../utils/helpers'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main () {
  const evmos = new ethers.providers.JsonRpcProvider(process.env.EVMOS_RPC_URL)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, evmos)
  const stakeContract = new ethers.Contract(stakerAddress.main, stakerABI.abi, wallet)

  const nodeStake = 'evmosvaloper10t6kyy4jncvnevmgq6q2ntcy90gse3yxa7x2p4'
  const etherAmount = '0.1'
  const ethAmt = ethers.utils.parseEther(etherAmount)

  const deposit = await stakeContract.deposit({
    value: ethAmt,
  })
  await deposit.wait()
  console.log(`Deposit ${etherAmount} EVMOS success`)

  let balance = await stakeContract.balanceOf(await wallet.getAddress())
  console.log('EEVMOS Balance', ethers.utils.formatEther(balance.toString()), 'before staking')
  await sleep(12000)

  const estStakeDeposit = await stakeContract.estimateGas.staking(nodeStake, ethAmt)
  const stakeDeposit = await stakeContract.staking(nodeStake, ethAmt, { gasLimit: estStakeDeposit })
  await stakeDeposit.wait()
  console.log(`Stake deposit ${etherAmount} EVMOS success`)

  balance = await stakeContract.balanceOf(await wallet.getAddress())
  console.log('EEVMOS Balance', ethers.utils.formatEther(balance.toString()), '(after staking)')
}

main().catch((e) => { console.error(e) })
