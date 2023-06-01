import { Card, CardContent, Skeleton, Typography } from '@mui/material'
import { useAccount, useBalance, useEnsName } from 'wagmi'
import { BigNumber } from 'ethers'

export function Account() {
  const { address,  } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: balance, isError, isLoading } = useBalance({
    address,
  })
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>
          {ensName ?? address}
        </Typography>
        {
          isLoading ?
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> :
          <Typography component="div">
            {balance?.value._hex} {balance?.symbol}
          </Typography>  
        }
        
      </CardContent>
    </Card>
  )
}
