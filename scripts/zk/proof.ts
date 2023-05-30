// @ts-ignore
import { groth16 } from 'snarkjs'
// @ts-ignore
import { buildPoseidon } from 'circomlibjs'
import { BigNumber } from 'ethers'

export async function exportSolidity({ proof, publicSignals }: any) {
  const rawCallData: string = await groth16.exportSolidityCallData(proof, publicSignals);
  const tokens = rawCallData
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map(BigNumber.from);
  const [a1, a2, b1, b2, b3, b4, c1, c2, ...inputs] = tokens;
  const a: [BigNumber, BigNumber] = [a1, a2] ;
  const b: [[BigNumber, BigNumber], [BigNumber, BigNumber]] = [
    [b1, b2],
    [b3, b4],
  ]
  const c: [BigNumber, BigNumber] = [c1, c2]
  return {
    a, b, c, inputs
  }
}

export async function generateProof(circuitInputs: any, filePathWASM: any, filePathZKEY: any) {
  const { proof, publicSignals } = await groth16.fullProve(
    circuitInputs,
    filePathWASM,
    filePathZKEY
  )
  const solidityProof = await exportSolidity({ proof, publicSignals })
  return solidityProof
}
// TODO: generate proof for test circuit
async function main() {
  const WASM_FILE_PATH = 'circuits/slash.wasm'
  const ZKEY_FILE_PATH = 'circuits/slash.zkey'

  const poseidon = await buildPoseidon()
  const amount = 20
  const receiver = '0x41725273FF50458aF4CFd10Ad1CeF7d10B729Bb0'
  const relayer = '0x41725273FF50458aF4CFd10Ad1CeF7d10B729Bb0'
  const hash = poseidon.F.toString(poseidon([amount, receiver, relayer]))
  console.log('poseidon hash:',hash)
  const circuitInputs = {
    relayer: `${relayer}`,
    receiver: `${receiver}`,
    amount: `${amount}`,
    hash: `0x1`,
  }

  const proofData = await generateProof(
    circuitInputs,
    WASM_FILE_PATH,
    ZKEY_FILE_PATH
  )
  console.log(`['${proofData.a[0]._hex}', '${proofData.a[1]._hex}']`)
  console.log(`[['${proofData.b[0][0]._hex}', '${proofData.b[0][1]._hex}'],['${proofData.b[1][0]._hex}', '${proofData.b[1][1]._hex}']]`)
  console.log(`['${proofData.c[0]._hex}', '${proofData.c[1]._hex}']`)
  console.log(
    `['${proofData.inputs[0]._hex}', 
    '${proofData.inputs[1]._hex}', 
    '${proofData.inputs[2]._hex}', 
    '${proofData.inputs[3]._hex}']`)
  // console.log(`['${proofData.inputs[0]._hex}', '${proofData.inputs[1]._hex}']`)
}

main()