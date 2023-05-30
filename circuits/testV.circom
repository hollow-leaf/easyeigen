pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template testV () {
  signal input value;

  signal input hash;

  component poseidon = Poseidon(1);
  poseidon.inputs[0] <== value;
  log(poseidon.out);
  log("hash",hash);
  hash === poseidon.out;
}

component main{public[value, hash]} = testV();