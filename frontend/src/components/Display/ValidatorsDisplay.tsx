import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import axios from 'axios';
import { formatted } from "../../utils/ether-big-number";

export function ValidatorsDisplay() {
    const url: string = 'https://api.mintscan.io/v1/evmos-testnet/validators';

    const router = useRouter()
    const [data, setData] = useState<any>()
    useEffect(() => {
        const response = axios.get(url);
        response
            .then(({ data }) => {
                const topFiveData = data.slice(0, 5)
                data = topFiveData.map((el: any, index: any) => {
                    return {
                        ...el,
                        id: index + 1,
                    }
                })
                setData(data)
            })
            .catch(e => {
                console.log(e)
            })
    }, []
    )

    const handleRowClick = (address: any) => {
        router.push({pathname: `/stake`,
        query: {valAddress: address}});
    };

    return (
        <TableContainer >
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">TOP 5 RANK</TableCell>
                        <TableCell align="right">VALIDATORS</TableCell>
                        <TableCell align="right">VOTING POWER</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((data: any, index: any) => (
                        <TableRow
                            key={data.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={() => { handleRowClick(data.operator_address) }} hover
                        >
                            <TableCell component="th" align="center" scope="row">{data.rank}</TableCell>
                            <TableCell align="right">{data.moniker}</TableCell>
                            <TableCell align="right">{Math.floor(Number(formatted(data.tokens)))}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
