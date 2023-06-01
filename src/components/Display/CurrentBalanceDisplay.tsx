import { Typography } from "@mui/material";
import { formatted } from "../../utils/ether-big-number";
import { useAccount, useContractRead, useToken } from "wagmi";
import { useStEvmosContractAddressHook } from "../../hooks/useContractAddress.hook";

export function CurrentBalanceDisplay({
  size = '14px',
  balance,
  isTokenDisplayed = true,
  type
}: any) {
  return (
    <Typography
      sx={{
        fontWeight: 'normal',
        fontSize: size,
        padding: '0 0 20px 0'
      }}
    >
      { type } Balance: {balance}
    </Typography>
  )
}