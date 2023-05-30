import { MerkleTree } from 'merkletreejs'
// @ts-ignore
import { buildPoseidon } from 'circomlibjs'

const getPoseidonHashFunction = async () => {
  const poseidon = await buildPoseidon()
  return (inputs: any) => {
    const inputsArray = Array.isArray(inputs) ? inputs : [inputs]
    return MerkleTree.bufferify(MerkleTree.bigNumberify(
      poseidon.F.toString(poseidon(inputsArray.map(MerkleTree.bigNumberify))),
    ))
  }
}

const anyToBigNumber = (input: any) => {
  if (typeof input === 'string') {
    return MerkleTree.bigNumberify(MerkleTree.bufferToHex(Buffer.from(input)))
  } else if (typeof input === 'boolean') {
    return MerkleTree.bigNumberify(input ? 1 : 0)
  } else if (typeof input === 'number') {
    return MerkleTree.bigNumberify(input)
  } else {
    throw new Error('not support type')
  }
}

