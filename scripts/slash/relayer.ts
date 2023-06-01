import { BytesLike, ethers } from 'ethers'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
const restakerABI = require('../../artifacts/contracts/Restake.sol/Restake.json')

dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main () {
  const evmos = new ethers.providers.JsonRpcProvider(process.env.EVMOS_RPC_URL)

  const addr = '0x7eb88f14f90d86c5F28fD918Fad8620941c9f65B'
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, evmos)
  const restakeContract = new ethers.Contract(addr, restakerABI.abi, wallet)
  console.log('Relayer', await wallet.getAddress(), 'Relaying...')
  const relay = await restakeContract.relay(wallet.address, wallet.address, 50, 1) // fake proof
  await relay.wait()
  console.log('Relay success')
}

main().catch((err) => {
  console.error(err)
})
