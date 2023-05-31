import { Button, Grid, TextField, alpha } from "@mui/material";
import { useEffect, useState } from "react";

export function GetMaxBalanceDisplay({
  balance,
  onChange
}: any) {
  const [amount, setAmount] = useState(0)
  useEffect(() => {
    setAmount(0)
    onChange(0)
  },[balance])
  return (
    <Grid container item justifyContent="space-between" alignItems='center' sx={{ padding: '0 0 5px 0' }}>
      <Grid item xs={9}>
        <TextField
          placeholder="Amount"
          value={amount}
          type="number"
          onChange={(e) => {
            const value = e.target.value
            setAmount(Number(value))
            onChange(Number(value))
          }}
          sx={{
            ml: '0px',
            width: '100%'
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: '20px',
          }}
          style={{
            background: '#7c7c7c',
            color: alpha("#292929", 0.8),
            borderColor: alpha("#292929", 0.8),
            borderWidth: '2px',
            textTransform: 'none',
          }}
          onClick={() => {
            setAmount(Number(balance))
            onChange(Number(balance))
          }}
        >
          Max
        </Button>
      </Grid>
    </Grid>
  )
}
