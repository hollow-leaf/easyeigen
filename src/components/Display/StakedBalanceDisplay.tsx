import { Typography } from "@mui/material";
import { formatted } from "../../utils/ether-big-number";
import { useAccount, useContractRead, useToken } from "wagmi";
import { useStEvmosContractAddressHook } from "../../hooks/useContractAddress.hook";

export function StakedBalanceDisplay({
  size = '18px',
  balance,
  isTokenDisplayed = true
}: any) {
  return (
    <Typography
      sx={{
        fontWeight: 'normal',
        fontSize: size,
      }}
    >
      Your EE: {balance}
    </Typography>
  )
}