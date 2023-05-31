import { Button, Grid, TextField, alpha } from "@mui/material";
import { useState } from "react";

export function SetProcessDisplay({
  onChange
}: any) {
  const [isStake, setProcess] = useState(true)
  const handleButtonClick = (selectedButton: boolean) => {
    setProcess(selectedButton);
    onChange(selectedButton);
  };

  return (
    <Grid container item justifyContent="space-between" alignItems='center' sx={{ padding: '0 0 20px 0' }}>
      <Grid container item xs={6} justifyContent="flex-end">
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderRadius: '20px 0 0 20px',
            width: '100%',
            backgroundColor: isStake === true ? alpha('#000000', 0.8) : 'transparent',
            color: isStake === true ? '#fff' : alpha('#000000', 0.8),
            '&:hover': {
              backgroundColor: alpha('#bdbdbd', 0.8),
            },
          }}
          onClick={() => handleButtonClick(true)}
        >
          Stake
        </Button>
      </Grid>
      <Grid container item xs={6}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderRadius: '0 20px 20px 0',
            width: '100%',
            backgroundColor: isStake === false ? alpha('#000000', 0.8) : 'transparent',
            color: isStake === false ? '#fff' : alpha('#000000', 0.8),
            '&:hover': {
              backgroundColor: alpha('#bdbdbd', 0.8),
            },
          }}
          onClick={() => handleButtonClick(false)}
        >
          Withdraw
        </Button>
      </Grid>
    </Grid >
  )
}
