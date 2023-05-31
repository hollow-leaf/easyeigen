import { task } from 'hardhat/config'
import { writeFileSync } from '../../helpers/pathHelper'

task('deploy:contract', 'Deploy contract')
  .addParam('contract')
  .setAction(async ({ contract }, hre) => {
    await hre.run('compile')
    const [signer] = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory(contract)
    // if you mint in constructor, you need to add value in deploy function
    const deployContract = await contractFactory.connect(signer).deploy('0xFc7105D8dcE953931c5987Dd2d048a477e225448', '0xda4c3028d22290B337D9bd46B10F8C2522694600')
    console.log(`${contract} deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, `${contract}.json`, addressData)

    await deployContract.deployed()
  },
  )
