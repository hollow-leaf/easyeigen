import { Button, Grid, TextField, alpha, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCurrentRole, useBanCheck } from "../../hooks/current-role.hook";
import { useRelayerContractAddressHook } from "../../hooks/useContractAddress.hook";
import { useAccount, useBalance, useContractRead } from "wagmi";
import { readContract } from "@wagmi/core";
import { relayerABI } from "../../contracts/relayer";

export function RelayerDisplay({
  isRelayer,
  stBalance,
  isBan,
}: any) {
  return (
    <Grid container item justifyContent="space-between" alignItems='center' sx={{ padding: '0 0 20px 0' }}>
      {isBan ?
         <Grid container item alignItems={'center'} justifyContent="center" sx={{ padding: '0 0 20px 0' }}>
         <div style={{ display: 'flex' }}>
           <Typography display={'inline-block'} sx={{
             fontSize: '20px'
           }}>
             You are a bad guy.
           </Typography>
         </div>
       </Grid>
        : isRelayer
          ? <Grid container item alignItems={'center'} justifyContent="center" sx={{ padding: '0 0 20px 0' }}>
            <div style={{ display: 'flex' }}>
              <Typography display={'inline-block'} sx={{
                fontSize: '20px'
              }}>
                You already registered
              </Typography>
            </div>
          </Grid>
          : <Grid container item alignItems={'center'} justifyContent="center" sx={{ padding: '0 0 20px 0' }}>
            <div style={{ display: 'flex' }}>
              <Typography display={'inline-block'} sx={{
                fontSize: '20px'
              }}>
                {Number(stBalance) > 1
                  ? <>
                    You have {stBalance} EE
                    <br />
                    You can register relayer 🥳
                  </>
                  : <>
                    You need to have more than1 EE
                  </>
                }

              </Typography>
            </div>
          </Grid>
      }

    </Grid >
  )
}
