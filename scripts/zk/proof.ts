// @ts-ignore
import { groth16 } from 'snarkjs'
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
// TODO: generate proof for test circuit
async function main() {
  const WASM_FILE_PATH = 'circuits/slash.wasm'
  const ZKEY_FILE_PATH = 'circuits/slash.zkey'

  const circuitInputs = {
    accountRoot: '0xf7722b1b523044f46cda3cead3408f9023d64b43d1e1a6c9e648c74fe82768',
    crossAmount: ,
    path: [
      '0x2a09a9fd93c590c26b91effbb2499f07e8f7aa12e2b4940a3aed2411cb65e11c',
      '0x231be438cf8d6a322f51a7182ae96fb67aa3a7d1673abecc96955fa51f6d7168',
      '0x1426f40e9cfe0434cb31c11912ae7d04d7b60f73d78a07b344f7e2b054f01e43'
    ],
    idx: [ 0, 0, 1 ],
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