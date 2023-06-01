import { writeContract, prepareWriteContract, waitForTransaction, fetchFeeData } from '@wagmi/core';
import { useStEvmosContractAddressHook } from '../../hooks/useContractAddress.hook';
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { invokeFormat } from '../../utils/ether-big-number';

export function MintDialog({
  open,
  onClose
}: any) {
  // const stEvmosAddresses = useStEvmosContractAddressHook()
  // const [amount, setAmount] = useState(0)
  // async function mint() {
  //   const feeData = await fetchFeeData()
  //   const config = await prepareWriteContract({
  //     address: stEvmosAddresses,
  //     abi: DaiABI,
  //     functionName: 'mint',
  //     args: [amount, { gasLimit: "68658" }]
  //   })
  //   const { hash } = await writeContract(config)
  //   await waitForTransaction({
  //     hash,
  //   })
  // }
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        Give me money
      </DialogTitle>
      <DialogContent>
        <Grid container columnGap={2} justifyContent="center" alignItems="center">
          <Grid item>
            <TextField
              placeholder='money'
              onChange={(e) => {
                // setAmount(Number(e.target.value))
              }}
            >
            </TextField>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              onClick={() => {
                // mint()
                //   .finally(() => {
                //     onClose()
                //   })
              }}
            >
              mint
            </Button>
          </Grid>
        </Grid>

      </DialogContent>
    </Dialog>
  )
}