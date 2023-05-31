import { BytesLike, ethers } from 'ethers'
import { config as dotenvConfig } from 'dotenv'
import { restakerABI, restakerAddress } from '../config'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main () {
  const evmos = new ethers.providers.JsonRpcProvider(process.env.EVMOS_RPC_URL)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, evmos)
  const restakeContract = new ethers.Contract(restakerAddress.main, restakerABI.abi, wallet)

  const relay = await restakeContract.relay(wallet.address, wallet.address, 50, 1) // fake proof
  await relay.wait()
  console.log('Relay success')
}

main().catch((err) => {
  console.error(err)
})
