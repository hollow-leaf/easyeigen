import { BytesLike, ethers } from 'ethers'
import { config as dotenvConfig } from 'dotenv'
import { restakerABI, restakerAddress, stakerABI, stakerAddress } from '../config'
import { resolve } from 'path'
import { sleep } from '../utils/helpers'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main () {
  const evmos = new ethers.providers.JsonRpcProvider(process.env.EVMOS_RPC_URL)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, evmos)
  const restakeContract = new ethers.Contract(restakerAddress.main, restakerABI.abi, wallet)
  const stakeContract = new ethers.Contract(stakerAddress.main, stakerABI.abi, wallet)

  let eevmosBalance = await stakeContract.balanceOf(await wallet.getAddress())
  console.log('EEVMOS Balance', ethers.utils.formatEther(eevmosBalance.toString()), '(before restaking)')

  const approve = await stakeContract.approve(restakerAddress.main, ethers.utils.parseEther('10'))
  approve.wait()
  await sleep(12000)

  const stakeDeposit = await restakeContract.register()
  await stakeDeposit.wait()
  console.log('Register EVMOS success')
  // Restake EVMOS then lose EEVMOS
  eevmosBalance = await stakeContract.balanceOf(await wallet.getAddress())
  console.log('EEVMOS Balance', ethers.utils.formatEther(eevmosBalance.toString()), '(after staking)')

  // const quit = await restakeContract.quit()
  // await quit.wait()

  // eevmosBalance = await stakeContract.balanceOf(await wallet.getAddress())

  // console.log('EEVMOS Balance', ethers.utils.formatEther(eevmosBalance.toString()), '(quit)')
}

main().catch((err) => {
  console.error(err)
})
