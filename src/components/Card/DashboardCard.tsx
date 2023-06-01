import { Button, Card, CardContent, Grid, Skeleton, TextField, Typography, alpha } from "@mui/material";
import { erc20ABI, useAccount, useBalance, useContractRead } from "wagmi";
import { useState } from "react";
import Image from "next/image";
import { BigNumber } from "ethers";
import { formatted, invokeFormat } from "../../utils/ether-big-number";
import { CurrentBalanceDisplay } from "../Display/CurrentBalanceDisplay";
import { TotalStakedBalanceDisplay } from "../Display/TotalStakedBalanceDisplay";
import { ValidatorsDisplay } from "../Display/ValidatorsDisplay";
import { useCurrentStakedBalance, useCurrentEvmosBalance } from "../../hooks/current-balance.hook";

export function DashboardCard() {
    const balance = useCurrentStakedBalance()
    return (
        <Card
            sx={{
                p: 5,
                backgroundColor: 'rgba(124,124,124)',
                boxShadow: "0px 0px",
                width: '50%',
            }}
            style={{ borderRadius: "20px" }}
        >
            <Grid container item alignItems={'center'} justifyContent="center" sx={{ padding: '0 0 20px 0' }}>
                <div style={{ display: 'flex' }}>
                    <Image src="./evmos.png" width={30} height={30} style={{ padding: '0 10px 0 0' }} alt="token" />
                    <Typography display={'inline-block'} sx={{
                        fontSize: '20px'
                    }}>
                        EVMOS
                    </Typography>
                </div>
            </Grid>
            <Grid container item sx={{ padding: '0 0 20px 0' }} justifyContent="center">
                <TotalStakedBalanceDisplay balance={balance} isTokenDisplayed={false} />
            </Grid>

            <Grid container item sx={{ padding: '0 0 20px 0' }} justifyContent="center">
                <ValidatorsDisplay />
            </Grid>
        </Card>
    )
}