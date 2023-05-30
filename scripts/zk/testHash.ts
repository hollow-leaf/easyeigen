// @ts-ignore
import { buildPoseidon } from 'circomlibjs'
import Readline from 'readline'

async function main() {
  const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const poseidon = await buildPoseidon()
  readline.question('Enter a number: ', (inputs: string) => {
    const hash = poseidon.F.toString(poseidon([inputs]))
    console.log(hash)
  })
}

main()
