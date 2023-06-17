import { getDefaultClient } from 'connectkit'
import { Chain, configureChains, createClient, sepolia } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { goerli, polygonMumbai, celoAlfajores, gnosisChiado } from 'wagmi/chains'

export const makeChain = (name: string, rpc: string, id: number) => {
  return {
    id: id,
    name: name,
    network: name,
    nativeCurrency: {
      decimals: 18,
      name: name,
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: [rpc],
      },
      public: {
        http: [rpc],
      }
    },
    testnet: true,
  }
}
const defaultChains: Chain[] = [
  makeChain('Evmos Testnet', 'https://jsonrpc-t.evmos.nodestake.top/', 9000),
  makeChain('Evmos', 'https://eth.bd.evmos.org:8545', 9001),
  goerli,
  sepolia,
  gnosisChiado,
];

const { chains, provider, webSocketProvider } = configureChains(
  // TODO: pull flag from .env and reconfigure this config object
  defaultChains,
  [
    publicProvider(),
  ],
)

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: 'EEF',
    provider,
    webSocketProvider,
    chains,
  })
)
