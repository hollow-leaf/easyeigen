import { Button, Grid, Skeleton, TextField, alpha, Typography } from "@mui/material";
import { prepareWriteContract, writeContract, waitForTransaction } from "@wagmi/core"
import { useAccount } from "wagmi"
import { useEffect, useState } from "react";
import { useRelayerContractAddressHook, useStEvmosContractAddressHook } from "../../hooks/useContractAddress.hook";
import { relayerABI } from "../../contracts/relayer";
import { LoadingDialog } from "../Dialog/LoadingDialog"
import { readContract } from "@wagmi/core";
import { RelayerDisplay } from "../Display/RelayerDisplay";
import { stakerABI } from "../../contracts/staker";
import { useCurrentRole, useBanCheck } from "../../hooks/current-role.hook";
import { parseEther } from 'ethers/lib/utils.js';
import { useCurrentStakedBalance, useCurrentEvmosBalance } from "../../hooks/current-balance.hook";
import { useRouter } from 'next/router';

export function RelayerForm({
}: any) {
  const { address,  } = useAccount()
  const [loading, setLoading] = useState(false)
  const registerRelayerAddresses = useRelayerContractAddressHook()
  const stEvmosAddresses = useStEvmosContractAddressHook()
  const [isRelayer, setIsRelayer] = useState(false)
  const stBalance = useCurrentStakedBalance()
  const isBan = useBanCheck()

  useEffect(() => {
    if(address){
      getRelayer()
    }
  }, [address])
  

  async function register () {
    setLoading(true)
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
    setLoading(true)
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

  async function getRelayer () {
    const data = await readContract({
      address: registerRelayerAddresses,
      abi: relayerABI,
      functionName: 'registered',
      args:[address]
    })
    setIsRelayer(!!data)
  }

  return (
    <>
      <Grid container rowSpacing={4} justifyContent="center">
        <RelayerDisplay
          stBalance={stBalance}
          isRelayer={isRelayer}
          isBan={isBan}
          />
        <Grid container item xs={12} columnSpacing={3} justifyContent="center">
          <Grid item>
          <Button
            variant="contained"
            disabled={loading}
            color= {!isRelayer ? "success" : "error"}
            style={{
              textTransform: 'none',
            }}
            sx={{
              width: '120px',
            }}
            onClick={() => { 
              !isRelayer 
              ? register()
              .finally(async () => {
                await getRelayer()
                setLoading(false)
              })
              : quit()
              .finally(async () => {
                await getRelayer()
                setLoading(false)
              })
            }
          }
          >
          {
            isRelayer ? 'Quit' : 'Register'
          }
        </Button>
          </Grid>
        </Grid>
      </Grid>
      <LoadingDialog 
        open={loading}/>
    </>
  )
}