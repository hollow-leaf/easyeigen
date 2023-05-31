import { BytesLike, ethers } from 'ethers'
import { config as dotenvConfig } from 'dotenv'
import { restakerABI, restakerAddress } from '../config'
import { resolve } from 'path'
import { generateProof } from '../zk/proof'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main () {
  const evmos = new ethers.providers.JsonRpcProvider(process.env.EVMOS_RPC_URL)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, evmos)
  const restakeContract = new ethers.Contract(restakerAddress.main, restakerABI.abi, wallet)

  const value = await restakeContract.getRelayer(await wallet.getAddress())
  console.log(value)

  const circuitInputs = {
    relayer: value[0].toString(),
    receiver: value[1].toString(),
    amount: value[2].toString(),
    hash: value[3].toString(),
  }
  const proofData = await generateProof(
    circuitInputs,
    'circuits/slash.wasm',
    'circuits/slash.zkey',
  )

  const slash = await restakeContract.slash(proofData, wallet.address) // fake proof
  await slash.wait()
  console.log('Slash success')
}

main().catch((e) => { console.error(e) })
