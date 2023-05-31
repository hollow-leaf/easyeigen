import { Button, Card, CardContent, Grid, Skeleton, TextField, Typography, alpha } from "@mui/material";
import { erc20ABI, useAccount, useBalance, useContractRead } from "wagmi";
import { useState } from "react";
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import { stakerABI } from "../../contracts/staker";
import Image from "next/image";
import { useStEvmosContractAddressHook } from "../../hooks/useContractAddress.hook";
import { ProcessButton } from "../Button/ProcessButton";
import { BigNumber } from "ethers";
import { CurrentBalanceDisplay } from "../Display/CurrentBalanceDisplay";
import { RestakedBalanceDisplay } from "../Display/ReStakedBalanceDisplay";
import { GetMaxBalanceDisplay } from "../Display/GetMaxBalanceDisplay";
import { SetProcessDisplay } from "../Display/SetProcessDisplay";
import { useCurrentStakedBalance, useCurrentEvmosBalance } from "../../hooks/current-balance.hook";

export function RestakeCard() {
    const stEvmosAddresses = useStEvmosContractAddressHook()
    const { address } = useAccount()
    const [writing, setWriting] = useState(false)
    const [isWithdraw, setProcess] = useState(0)
    const [amount, setAmount] = useState(0)
    const balance = useCurrentEvmosBalance()
    const { data: any } = useContractRead({
        address: stEvmosAddresses,
        abi: stakerABI,
        functionName: 'allowance',
        args: [address!, stEvmosAddresses]
    })

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
                <RestakedBalanceDisplay balance={balance} isTokenDisplayed={false} />
            </Grid>

            <SetProcessDisplay
                onChange={(e: any) => {
                    setProcess(e)
                }}
            />
            <GetMaxBalanceDisplay
                balance={balance}
                onChange={(e: any) => {
                    setAmount(e.target.value)
                }}
            />
            <CurrentBalanceDisplay balance={balance} isTokenDisplayed={false} />


            <Grid container item xs={12} alignItems={'center'} justifyContent="flex-end">
                {
                    <ProcessButton method={isWithdraw} />
                }
            </Grid>
        </Card>
    )
}