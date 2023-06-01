import { Opacity } from "@mui/icons-material";
import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, LinearProgress } from "@mui/material";
import { useEffect } from "react";

export function LoadingDialog ({
  open,
}: any) {
  return (
    <Dialog 
      open={open}
    > 
      <DialogTitle>
        Transaction Confirming...
      </DialogTitle>
      <DialogContent>
        <LinearProgress/>
      </DialogContent>
    </Dialog>
  )
}