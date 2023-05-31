import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { ConnectButton } from '../Button/ConnectButton';
import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import Image from "next/image";
import { useStEvmosContractAddressHook } from '../../hooks/useContractAddress.hook';
import { Padding } from '@mui/icons-material';
// import { MintDialog } from '../Dialog/MintDialog';

const pages = [
    {
        label: 'Dashboard',
        link: '/dashboard'
    },
    {
        label: 'Relayer',
        link: '/relayer'
    },
    {
        label: 'Slasher',
        link: '/slasher'
    },
]


export function ApplicationBar() {
    const { isConnected, isReconnecting } = useAccount()
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const index = pages.findIndex(e => e.link === router.pathname)
    const [value, setValue] = React.useState(index)

    React.useEffect(() => {
        setValue(pages.findIndex(e => e.link === router.pathname))
    }, [router.pathname])
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }
    function redirect(e: React.SyntheticEvent, link: string) {
        e.preventDefault()
        router.push(link)
    }

    return (
        <>
            <AppBar position="static" elevation={0} style={{
                backgroundColor: '#0f0f0f',
                boxShadow: '0 0 20px 8px rgba(124,124,124,.7)'
            }}>
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Image
                            src="./EEF_LOGO.png"
                            alt="logo"
                            width={100}
                            height={90}
                            onClick={() => {
                                setOpen(true)
                            }}
                        />
                        {
                            isConnected && !isReconnecting ? <Box sx={{ flexGrow: 1 }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    centered
                                >
                                    {pages.map((page) => (
                                        <Tab
                                            sx={{
                                                textTransform: 'none',
                                                color: '#e3e3e3'
                                            }}
                                            component="a"
                                            key={page.label}
                                            label={page.label}
                                            href={page.link}
                                            onClick={(e: any) => redirect(e, page.link)}
                                        />
                                    ))}
                                </Tabs>
                            </Box> : null
                        }

                        <Box sx={{ flexGrow: 0 }}>
                            <ConnectButton />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* <MintDialog open={open} onClose={() => {
        setOpen(false)
      }}/> */}
        </>
    );
}