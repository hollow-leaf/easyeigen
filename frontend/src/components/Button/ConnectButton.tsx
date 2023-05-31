import { Button } from "@mui/material"
import { ConnectKitButton } from "connectkit"

export function ConnectButton ({children}: any) {
  return (
    <ConnectKitButton.Custom>
        {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
          return (
            <Button 
              color={isConnected ? 'error' : 'primary'}
              onClick={show}
            >
              {
                isConnected ? 
                "Disconnect"
                : "Connect"
              }
            </Button>
          );
        }}
      </ConnectKitButton.Custom>
  )
}