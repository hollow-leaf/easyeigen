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
  console.log('stakeAddr', stakerAddress.main)
  // const stakeContract = new ethers.Contract('0xda4c3028d22290B337D9bd46B10F8C2522694600', stakerABI.abi, wallet)

  const nodeStake = 'evmosvaloper10t6kyy4jncvnevmgq6q2ntcy90gse3yxa7x2p4'
  const etherAmount = '0.1'
  const ethAmt = ethers.utils.parseEther(etherAmount)

  // console.log('---------- Deposit & Staking ----------')
  // // Deposit EVMOS
  const deposit = await stakeContract.deposit({ value: ethAmt })
  await deposit.wait()
  console.log(`Deposit ${etherAmount} EVMOS success`)

  let eevmosBalance = await stakeContract.balanceOf(await wallet.getAddress())
  console.log('EEVMOS Balance', ethers.utils.formatEther(eevmosBalance.toString()), '(before staking)')
  console.log('Contract Balance', ethers.utils.formatEther((await evmos.getBalance(stakeContract.address)).toString()))
  console.log('Wallet Deposit Balance', ethers.utils.formatEther((await stakeContract.deposits(await wallet.getAddress())).toString()))
  await sleep(12000)

  // // Stake EVMOS then get EEVMOS
  // const estStakeDeposit = await stakeContract.estimateGas.staking(nodeStake, ethAmt)
  const stakeDeposit = await stakeContract.staking(nodeStake, ethAmt)
  await stakeDeposit.wait()
  console.log(`Stake ${etherAmount} EVMOS success`)

  eevmosBalance = await stakeContract.balanceOf(await wallet.getAddress())
  console.log('EEVMOS Balance', ethers.utils.formatEther(eevmosBalance.toString()), '(after staking)')
  await sleep(12000)

  // // Unstake EVMOS then burn EEVMOS
  // const estUnstakeDeposit = await stakeContract.estimateGas.unstaking(nodeStake, ethAmt)
  // console.log('test')
  // const unstakeDeposit = await stakeContract.unstaking(nodeStake, ethAmt, { gasLimit: estUnstakeDeposit })
  // await unstakeDeposit.wait()
  // console.log(`Unstake ${etherAmount} EVMOS success`)

  // eevmosBalance = await stakeContract.balanceOf(await wallet.getAddress())
  // console.log('EEVMOS Balance', ethers.utils.formatEther(eevmosBalance.toString()), '(after unstaking)')

  // console.log('---------- Deposit & Withdraw ----------')
  // let evmosBalance = await evmos.getBalance(await wallet.getAddress())
  // console.log('EVMOS Balance', ethers.utils.formatEther(evmosBalance.toString()), '(before withdraw)')

  // // Deposit EVMOS
  // const deposit = await stakeContract.deposit({ value: ethAmt })
  // await deposit.wait()
  // console.log(`Deposit ${etherAmount} EVMOS success`)
  // evmosBalance = await evmos.getBalance(await wallet.getAddress())
  // console.log('EVMOS Balance', ethers.utils.formatEther(evmosBalance.toString()), '(after deposit)')

  // Withdraw EVMOS from deposit
  // const withdraw = await stakeContract.withdraw(ethAmt)
  // await withdraw.wait()
  // console.log(`Withdraw ${etherAmount} EVMOS success`)
  // evmosBalance = await evmos.getBalance(await wallet.getAddress())
  // console.log('EVMOS Balance', ethers.utils.formatEther(evmosBalance.toString()), '(after withdraw)')
}

main().catch((e) => { console.error(e) })
