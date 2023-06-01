import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { erc20ABI, useAccount, useContractRead } from 'wagmi'
import { Button } from '@mui/material'
import { useState } from "react";
import { BigNumber } from 'ethers'
import { prepareWriteContract, writeContract, waitForTransaction} from '@wagmi/core'
import { useRelayerContractAddressHook, useStEvmosContractAddressHook } from '../../hooks/useContractAddress.hook'
import { relayerABI } from "../../contracts/relayer";
import { stakerABI } from "../../contracts/staker";
import { parseEther } from 'ethers/lib/utils.js';
import { ConstructionOutlined } from '@mui/icons-material';
import { LoadingDialog } from "../Dialog/LoadingDialog"


export function RelayerProcessButton({ isRelayer, disabled, label }: any) {
  const [writing, setWriting] = useState(false)
  const registerRelayerAddresses = useRelayerContractAddressHook()
  const { address,  } = useAccount()
  const stEvmosAddresses = useStEvmosContractAddressHook()


  async function register () {
    setWriting(true)
    const approveConfig = await prepareWriteContract({
      address: stEvmosAddresses,
      abi: stakerABI,
      functionName: 'approve',
      args: [registerRelayerAddresses.toString(), parseEther('1')],
    })
    const {hash:approveHash} = await writeContract(approveConfig)
    await waitForTransaction({
      confirmations: 3,
      hash: approveHash,
    })

    const config = await prepareWriteContract({
      address: registerRelayerAddresses,
      abi: relayerABI,
      functionName: 'register',
    })
    const {hash:registerHash} = await writeContract(config)
    await waitForTransaction({
      confirmations: 3,
      hash: registerHash,
    })
  }

  async function quit () {
    setWriting(true)
    const config = await prepareWriteContract({
      address: registerRelayerAddresses,
      abi: relayerABI,
      functionName: 'quit',
    })
    const {hash:quitHash} = await writeContract(config)
    await waitForTransaction({
      confirmations: 3,
      hash: quitHash,
    })
  }

  return (
    <>
      {
        <Button
          variant="contained"
          disabled={writing}
          disableElevation
          color="success"
          style={{
            textTransform: 'none',
          }}
          sx={{
            width: '120px',
          }}
          onClick={() => { 
            console.log(isRelayer)
            !isRelayer 
            ? register()
            .finally(() => {
              setWriting(false)
            })
            : quit()
            .finally(() => {
              setWriting(false)
            })
          }
        }
        >
          {label}
        </Button>
      }
      <LoadingDialog open={writing}/>

    </>
  )
}