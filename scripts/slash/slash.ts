import { BytesLike, ethers } from 'ethers'
import { config as dotenvConfig } from 'dotenv'
import { slashABI, slashAddress } from '../config'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main () {
  const evmos = new ethers.providers.JsonRpcProvider(process.env.EVMOS_RPC_URL)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, evmos)
  const slashContract = new ethers.Contract(slashAddress.main, slashABI.abi, wallet)

  const isBan = await slashContract.isBan(wallet.address)
  console.log(`${wallet.address} isBan`, isBan)

  const banStaker = await slashContract.banStaker([wallet.address])
  await banStaker.wait()
  console.log('Put stakers on EasySlasher banList')

  const isBanAfterBan = await slashContract.isBan(wallet.address)
  console.log(`${wallet.address} isBanAfterBan`, isBanAfterBan)

  const unbanStaker = await slashContract.unbanStaker([wallet.address])
  await unbanStaker.wait()
  console.log('Remove stakers from EasySlasher banList')

  const isBanAfterUnban = await slashContract.isBan(wallet.address)
  console.log(`${wallet.address} isBanAfterUnban`, isBanAfterUnban)
}

main().catch((e) => { console.error(e) })
