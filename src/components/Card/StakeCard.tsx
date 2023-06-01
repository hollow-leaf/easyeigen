import { Button, Card, CardContent, Grid, Skeleton, TextField, Typography, alpha } from "@mui/material";
import { erc20ABI, useAccount, useBalance, useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import { stakerABI } from "../../contracts/staker";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useStEvmosContractAddressHook } from "../../hooks/useContractAddress.hook";
import { ProcessButton } from "../Button/ProcessButton";
import { BigNumber } from "ethers";
import { CurrentBalanceDisplay } from "../Display/CurrentBalanceDisplay";
import { GetMaxBalanceDisplay } from "../Display/GetMaxBalanceDisplay";
import { SetProcessDisplay } from "../Display/SetProcessDisplay";
import { StakedBalanceDisplay } from "../Display/StakedBalanceDisplay";
import { useCurrentStakedBalance, useCurrentEvmosBalance } from "../../hooks/current-balance.hook";

export function StakeCard(
    {valAddress}:any
) {
    const stEvmosAddresses = useStEvmosContractAddressHook()
    const { address } = useAccount()
    const [writing, setWriting] = useState(false)
    const [stBalance, setStBalance] = useState(useCurrentStakedBalance())
    const [balance, setBalance] = useState(useCurrentEvmosBalance())
    const [isStake, setProcess] = useState(true)
    const [amount, setAmount] = useState(0)
    const { data: any } = useContractRead({
        address: stEvmosAddresses,
        abi: stakerABI,
        functionName: 'allowance',
        args: [address!, stEvmosAddresses]
    })
    
    const router = useRouter()

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
                        Stake
                    </Typography>
                </div>
            </Grid>
            <Grid container item sx={{ padding: '0 0 20px 0' }} justifyContent="center">
                <StakedBalanceDisplay balance={stBalance} isTokenDisplayed={false} />
            </Grid>

            <SetProcessDisplay
                onChange={(e: any) => {
                    setProcess(e)
                }}
            />
            <GetMaxBalanceDisplay
                balance={isStake ? balance: stBalance}
                onChange={(e: any) => {
                    setAmount(e)
                }}
            />
            
            <CurrentBalanceDisplay 
                type={isStake ? 'EVMOS' : 'EE'} 
                balance={isStake ? balance: stBalance } 
                isTokenDisplayed={false} 
                method={isStake}
            />

            <Grid container item xs={12} alignItems={'center'} justifyContent="flex-end">
                {
                    <ProcessButton 
                        balance={amount}
                        method={isStake} 
                        valAddress={router.query?.valAddress} />
                }
            </Grid>
        </Card>
    )
}