import { BytesLike, ethers } from 'ethers'
import { config as dotenvConfig } from 'dotenv'
import { stakerABI, stakerAddress, stakeABI, stakeAddress } from '../config'
import { sleep } from '../utils/helpers'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main () {
  const evmos = new ethers.providers.JsonRpcProvider(process.env.EVMOS_RPC_URL)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, evmos)
  const stakeContract = new ethers.Contract(stakerAddress.main, stakerABI.abi, wallet)

  const tx = await stakeContract.approveRequiredMethods()
  await tx.wait()
  console.log('Approved required methods')

  await sleep(5000)
  const nodeStake = 'evmosvaloper10t6kyy4jncvnevmgq6q2ntcy90gse3yxa7x2p4'
  const etherAmount = '0.1'
  const ethAmt = ethers.utils.parseEther(etherAmount)

  const deposit = await stakeContract.deposit({
    value: ethAmt,
  })
  await deposit.wait()
  console.log('deposit success')

  let balance = await stakeContract.balanceOf(await wallet.getAddress())
  console.log('Balance', balance.toString())
  await sleep(12000)
  const estSd = await stakeContract.estimateGas.staking(nodeStake, ethAmt)
  const sd = await stakeContract.staking(nodeStake, ethAmt, { gasLimit: estSd })
  await sd.wait()
  console.log('success sd', sd)

  balance = await stakeContract.balanceOf(await wallet.getAddress())
  console.log('Balance', balance.toString())
  console.log(`Staked ${etherAmount} EVMOS`)
}

main().catch((e) => { console.error(e) })
