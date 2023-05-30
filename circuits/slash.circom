pragma circom 2.0.0;

include "./tree.circom";
include "../node_modules/circomlib/circuits/comparators.circom";
include "../node_modules/circomlib/circuits/poseidon.circom";

template slash(levels) {
  signal input root;
  signal input path[levels];
  signal input idx[levels];
  signal input crossAmount;
  signal input sender;
  
  // leaf index
  component leafIndexNum = Bits2Num(levels);
  for (var i = 0; i < levels; i++) {
      leafIndexNum.in[i] <== idx[i];
  }
  // 1. verify user account exist
  component userLeaf = Poseidon(1);
  userLeaf.inputs[0] <== crossAmount;

  // 2. verify user account include
  component userTree = treeCheck(levels);
  userTree.root <== accountRoot;
  userTree.leaf <== userLeaf.out;
  for(var i = 0; i < levels; i++) {
      userTree.pathElements[i] <== path[i];
      userTree.pathIndices[i] <== idx[i];
  }
}

component main{public [accountRoot, sender, borrowAmount]} = cred(3);