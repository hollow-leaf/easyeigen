import { useAccount, useContractRead, useBalance } from "wagmi"
import { useRelayerContractAddressHook } from "./useContractAddress.hook"
import { relayerABI } from "../contracts/relayer"
import { formatted } from "../utils/ether-big-number"

export function useCurrentRole() {
  const registerRelayerAddresses = useRelayerContractAddressHook()
  const { address,  } = useAccount()
  const { data: relayer } = useContractRead({
    address: registerRelayerAddresses,
    abi: relayerABI,
    functionName: 'registered',
    args:[address]
  })
  return relayer ? true : false
}

export function useBanCheck() {
  const registerRelayerAddresses = useRelayerContractAddressHook()
  const { address,  } = useAccount()
  const { data: badGuy } = useContractRead({
    address: registerRelayerAddresses,
    abi: relayerABI,
    functionName: 'isBan',
    args:[address]
  })
  return badGuy ? true : false
}