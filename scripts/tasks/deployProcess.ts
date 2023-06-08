import { task } from 'hardhat/config'
import { writeFileSync } from '../../helpers/pathHelper'

task('deploy:contract', 'Deploy contract')
  .addParam('contract')
  .setAction(async ({ contract }, hre) => {
    await hre.run('compile')
    const [signer] = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory(contract)
    // if you mint in constructor, you need to add value in deploy function
    const deployContract = await contractFactory.connect(signer).deploy('0x9C6603BB1F5a9781C9E2Bc5131189557aA350b81', '0x42C5d61A1bCafeD5150c58d6274F6244E23441a9')
    console.log(`${contract} deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, `${contract}.json`, addressData)

    await deployContract.deployed()
  },
  )
