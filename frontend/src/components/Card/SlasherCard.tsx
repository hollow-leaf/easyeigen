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
import { StakedBalanceDisplay } from "../Display/StakedBalanceDisplay";
import { useCurrentStakedBalance, useCurrentEvmosBalance } from "../../hooks/current-balance.hook";
import { SlashForm } from "../Form/SlashForm";

export function SlasherCard(
    {valAddress}:any
) {
    const stEvmosAddresses = useStEvmosContractAddressHook()
    const { address } = useAccount()
    const [writing, setWriting] = useState(false)
    const [balance, setBalance] = useState(useCurrentEvmosBalance())
    const [isWithdraw, setProcess] = useState(0)
    const [amount, setAmount] = useState(0)
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
            <SlashForm/>
        </Card>
    )
}