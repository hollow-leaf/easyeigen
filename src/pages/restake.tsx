import { Button, Grid, TextField } from "@mui/material"
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { useState } from "react"
import { RestakeCard } from "../components/Card/RestakeCard"
import { useStEvmosContractAddressHook } from "../hooks/useContractAddress.hook"

function Page() {
    return (
        <Grid sx={{
            m: 0,
        }} container rowSpacing={4}>
            <Grid container item justifyContent={'center'}>
                <RestakeCard />
            </Grid>
        </Grid>
    )
}

export default Page