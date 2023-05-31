import { Button, Card, CardContent, Grid, Skeleton, TextField, Typography, alpha } from "@mui/material";
import { useAccount, useBalance, useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import { relayerABI } from "../../contracts/relayer";
import { useRelayerContractAddressHook } from "../../hooks/useContractAddress.hook";
import { RelayerProcessButton } from "../Button/RelayerProcessButton";
import { BigNumber } from "ethers";
import { useCurrentStakedBalance, useCurrentEvmosBalance } from "../../hooks/current-balance.hook";
import { useCurrentRole, useBanCheck } from "../../hooks/current-role.hook";

export function RelayerCard(
    {valAddress}:any
) {
    const registerRelayerAddresses = useRelayerContractAddressHook()
    const { address } = useAccount()
    const [stBalance, setStBalance] = useState(useCurrentStakedBalance())
    const [isRelayer, setProcess] = useState(useCurrentRole())
    const [isBan, setBanState] = useState(useBanCheck())

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
            { !isBan 
            ? <>
            { isRelayer 
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
                            { Number(stBalance) > 1
                                ?   <>
                                    You have {stBalance} EE
                                    <br/>
                                    You can register relayer 🥳 
                                    </>
                                :   <>
                                    You need to have more than1 EE
                                    </>
                            }
                            
                        </Typography>
                    </div>
                </Grid>} 
            <Grid container item xs={12} alignItems={'center'} justifyContent="center">
                {
                    Number(stBalance) > 1
                    ? <RelayerProcessButton 
                    isRelayer={isRelayer} 
                    label={isRelayer ? 'Quit' : 'Register' }
                    />
                    : null
                }
            </Grid>
            </>
            :
            <Grid container item alignItems={'center'} justifyContent="center" sx={{ padding: '0 0 20px 0' }}>
                    <div style={{ display: 'flex' }}>
                        <Typography display={'inline-block'} sx={{
                            fontSize: '20px'
                        }}>
                            You are a bad guy
                        </Typography>
                    </div>
                </Grid>
            }
            
        </Card>
    )
}