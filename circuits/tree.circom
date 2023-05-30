pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template selector() {
    signal input inputs[2];
    signal input x;
    signal output out[2];

    x * (1 - x) === 0;
    out[0] <== (inputs[1] - inputs[0]) * x + inputs[0];
    out[1] <== (inputs[0] - inputs[1]) * x + inputs[1];
}

template treeCheck(levels) {
  signal input root;
  signal input leaf;
  signal input pathElements[levels];
  signal input pathIndices[levels];

  component selectors[levels];
  component hash[levels];

  for (var i = 0; i < levels; i++) {
    selectors[i] = selector();
    selectors[i].inputs[0] <== i == 0 ? leaf : hash[i - 1].out;
    selectors[i].inputs[1] <== pathElements[i];
    selectors[i].x <== pathIndices[i];

    hash[i] = Poseidon(2);
    hash[i].inputs[0] <== selectors[i].out[0];
    hash[i].inputs[1] <== selectors[i].out[1];
  }
}