import { Button, Card, CardContent, Grid, Skeleton, TextField, Typography, alpha } from "@mui/material";
import { useAccount, useBalance, useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import { relayerABI } from "../../contracts/relayer";
import { useRelayerContractAddressHook } from "../../hooks/useContractAddress.hook";
import { BigNumber } from "ethers";
import { useCurrentStakedBalance, useCurrentEvmosBalance } from "../../hooks/current-balance.hook";
import { useCurrentRole, useBanCheck } from "../../hooks/current-role.hook";
import { RelayerDisplay } from "../Display/RelayerDisplay";
import { RelayerForm } from "../Form/RelayerForm";

export function RelayerCard(
) {
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
                    <Typography display={'inline-block'} sx={{
                        fontSize: '20px'
                    }}>
                        Relayer
                    </Typography>
                </div>
            </Grid>
            <RelayerForm />
        </Card>
    )
}