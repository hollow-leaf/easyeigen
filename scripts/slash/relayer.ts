import { BytesLike, ethers } from 'ethers'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
import { restakerABI, restakerAddress } from '../config'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main () {
  const evmos = new ethers.providers.JsonRpcProvider(process.env.EVMOS_RPC_URL)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, evmos)
  const restakeContract = new ethers.Contract(restakerAddress.main, restakerABI.abi, wallet)
  console.log('Relayer', await wallet.getAddress(), 'Relaying...')
  const relay = await restakeContract.relay(wallet.address, wallet.address, 50, 1) // fake proof
  await relay.wait()
  console.log('Relay success')
}

main().catch((err) => {
  console.error(err)
})
