import { BytesLike, ethers } from 'ethers'
import { config as dotenvConfig } from 'dotenv'
import { slashABI, slashAddress } from '../config'
import { sleep } from '../utils/helpers'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main () {
  const evmos = new ethers.providers.JsonRpcProvider(process.env.EVMOS_RPC_URL)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, evmos)
  const slashContract = new ethers.Contract(slashAddress.main, slashABI.abi, wallet)
  const tx = await slashContract.optIntoSlashing(slashAddress.main)
  await tx.wait()
  console.log('Give EasySlasher permission to slash caller')

  await sleep(5000)

  const canSlash = await slashContract.canSlash(wallet.address, slashAddress.main)
  console.log('canSlash', canSlash)

  const revokeSlashingAbility = await slashContract.revokeSlashingAbility(wallet.address, slashAddress.main)
  console.log('revokeSlashingAbility', revokeSlashingAbility)

  await sleep(5000)

  const canSlashAfterRevoke = await slashContract.canSlash(wallet.address, slashAddress.main)
  console.log('canSlashAfterRevoke', canSlashAfterRevoke)
}

main().catch((e) => { console.error(e) })
