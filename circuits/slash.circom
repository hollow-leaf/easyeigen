pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template slash() {
  signal input relayer;
  signal input receiver;
  signal input amount;
  signal input hash;

  component poseidon = Poseidon(3);
  poseidon.inputs[0] <== amount;
  poseidon.inputs[1] <== receiver;
  poseidon.inputs[2] <== relayer;
  
  signal invalid;
  invalid <-- poseidon.out != hash;
  invalid === 1;
}

component main{public [relayer, receiver, amount, hash]} = slash();