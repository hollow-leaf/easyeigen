// @ts-ignore
import { buildPoseidon } from 'circomlibjs'
// @ts-ignore
const { groth16 } = require('snarkjs')
import { BigNumber } from 'ethers'

export async function exportSolidity({ proof, publicSignals }: any) {
  const rawCallData: string = await groth16.exportSolidityCallData(proof, publicSignals);
  const tokens = rawCallData
    .replace(/["[\]\s]/g, '')
    .split(',')
    .map(BigNumber.from)
  const [a1, a2, b1, b2, b3, b4, c1, c2, ...inputs] = tokens
  const a: [BigNumber, BigNumber] = [a1, a2]
  const b: [[BigNumber, BigNumber], [BigNumber, BigNumber]] = [
    [b1, b2],
    [b3, b4],
  ]
  const c: [BigNumber, BigNumber] = [c1, c2]
  return {
    a, b, c, inputs,
  }
}

export async function generateProof (circuitInputs: any, filePathWASM: any, filePathZKEY: any) {
  const { proof, publicSignals } = await groth16.fullProve(
    circuitInputs,
    filePathWASM,
    filePathZKEY,
  )
  const solidityProof = await exportSolidity({ proof, publicSignals })
  return solidityProof
}
async function main() {
  const poseidon = await buildPoseidon()
  const number = 20
  const hash = poseidon.F.toString(poseidon([number]))

  const WASM_FILE_PATH = 'circuits/testV.wasm'
  const ZKEY_FILE_PATH = 'circuits/testV.zkey'
  console.log('start')
  const circuitInputs = {
    value: `${number}`,
    hash: `${hash}`,
  }

  const proofData = await generateProof(
    circuitInputs,
    WASM_FILE_PATH,
    ZKEY_FILE_PATH
  )
  console.log(`['${proofData.a[0]._hex}', '${proofData.a[1]._hex}']`)
  console.log(`[['${proofData.b[0][0]._hex}', '${proofData.b[0][1]._hex}'],['${proofData.b[1][0]._hex}', '${proofData.b[1][1]._hex}']]`)
  console.log(`['${proofData.c[0]._hex}', '${proofData.c[1]._hex}']`)
  console.log(`['${proofData.inputs[0]._hex}', '${proofData.inputs[1]._hex}']`)
}

main()
