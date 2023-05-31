import { Button, Grid, TextField, alpha } from "@mui/material";
import { useState } from "react";

export function SetRelayerProcessDisplay({
  onChange
}: any) {
  const [isRegister, setProcess] = useState(true)
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
            backgroundColor: isRegister === true ? alpha('#000000', 0.8) : 'transparent',
            color: isRegister === true ? '#fff' : alpha('#000000', 0.8),
            '&:hover': {
              backgroundColor: alpha('#bdbdbd', 0.8),
            },
          }}
          onClick={() => handleButtonClick(true)}
        >
          Register
        </Button>
      </Grid>
      <Grid container item xs={6}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderRadius: '0 20px 20px 0',
            width: '100%',
            backgroundColor: isRegister === false ? alpha('#000000', 0.8) : 'transparent',
            color: isRegister === false ? '#fff' : alpha('#000000', 0.8),
            '&:hover': {
              backgroundColor: alpha('#bdbdbd', 0.8),
            },
          }}
          onClick={() => handleButtonClick(false)}
        >
          Quit
        </Button>
      </Grid>
    </Grid >
  )
}
