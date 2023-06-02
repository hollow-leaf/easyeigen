import { Button, Grid, Skeleton, TextField, alpha, Typography } from "@mui/material";
import { prepareWriteContract, writeContract, waitForTransaction } from "@wagmi/core"
import { useEffect, useState } from "react";
import { invokeFormat } from "../../utils/ether-big-number";
import { useRelayerContractAddressHook } from "../../hooks/useContractAddress.hook";
import { relayerABI } from "../../contracts/relayer";
import { LoadingDialog } from "../Dialog/LoadingDialog"
import { generateProof } from "../../services/proof.service";
import { useContractRead } from "wagmi";
import { readContract } from "@wagmi/core";

export function SlashForm({
}: any) {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const registerRelayerAddresses = useRelayerContractAddressHook()
  const [proof, setProof] = useState<any[]>([]);
  const [isProofExist, setProofCheck] = useState(false);
  
  useEffect(()=>{
    const proofExist = proof.length !== 0
    setProofCheck(proofExist)
  },[proof])

  async function getProof( relayerAddress : string ){
    setLoading(true)
    const value:any = await readContract({
      address: registerRelayerAddresses,
      abi: relayerABI,
      functionName: 'getRelayer',
      args:[relayerAddress]
    })

      const circuitInputs = {
      relayer: value[0].toString(),
      receiver: value[1].toString(),
      amount: value[2].toString(),
      hash: value[3].toString(),
    }

    const proofData = await generateProof(
      circuitInputs
    )
    setProof(proofData)
  }
  
  async function slash ( relayerAddress : string) {
    setLoading(true)
    const config = await prepareWriteContract({
      address: registerRelayerAddresses,
      abi: relayerABI,
      functionName: 'slash',
      args:[proof, relayerAddress]
    })
    const {hash:registerHash} = await writeContract(config)
    await waitForTransaction({
      hash: registerHash,
    })

  }

  return (
    <>
      <Grid container rowSpacing={2} justifyContent="center">
        <Grid container item alignItems={'center'} justifyContent="center" sx={{ padding: '0 0 0 0' }}>
                  <div style={{ display: 'flex' }}>
                      <Typography display={'inline-block'} sx={{
                          fontSize: '20px'
                      }}>
                          Slasher
                      </Typography>
                  </div>
              </Grid>
        <Grid container item alignItems={'center'} justifyContent="center" sx={{ padding: '0 0 0 0' }}>
          <div style={{ display: 'flex' }}>
            <Typography display={'inline-block'} sx={{
              fontSize: '20px'
            }}>
              {!isProofExist ? '1. You need to generate proof first.' : '2. You can try to slashing relayer.'}
              
            </Typography>
          </div>
        </Grid>
        <Grid container item>
          <TextField
            type="string"
            label="Relayer Address"
            placeholder="enter address"
            onChange={(e) => {
              setAddress(e.target.value)
            }}
            disabled={loading}
            style={{
              width: '100%'
            }}
          />
        </Grid>
        <Grid container item xs={12} columnSpacing={3} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              disabled={loading}
              color= {!isProofExist ? 'info' : 'error'}
              style={{
                textTransform: 'none',
              }}
              sx={{
                width: '120px',
              }}
              onClick={() => {
                if(proof.length === 0){
                  getProof(address)
                      .finally(() => {
                      setLoading(false)
                    })
                }else{
                  slash(address)
                    .finally(() => {
                    setLoading(false)
                  })
                }
              }}
            >
              {!isProofExist ? 'Generate' : 'Slash'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <LoadingDialog 
        open={loading} 
        title={!isProofExist ? 'Generating Proof....' : 'Slashing...'}/>
    </>
  )
}