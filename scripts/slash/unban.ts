import { BytesLike, ethers } from 'ethers'
import { config as dotenvConfig } from 'dotenv'
import { restakerABI, restakerAddress } from '../config'
import { resolve } from 'path'
import Readline from 'readline'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

function main () {
  const evmos = new ethers.providers.JsonRpcProvider(process.env.EVMOS_RPC_URL)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, evmos)
  const restakeContract = new ethers.Contract(restakerAddress.main, restakerABI.abi, wallet)

  const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('Enter address to unban: ', async (address) => {
    const isban = await restakeContract.isBan(address)
    console.log(address, 'isban:', isban)
    if (isban) {
      const unban = await restakeContract.unbanStaker([address])
      await unban.wait()
      console.log('Unban success')
    }
  })
}

main()
