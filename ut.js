function growTree(growthCycle){
  var currentHeight = 1
  if(growthCycle === 0){
    return currentHeight
  }
  for (var i = 1; i <= growthCycle; i++) {
    if(i%2 !== 0){
      currentHeight *= 2
    } else {
      currentHeight += 1
    }
  };
  return  currentHeight
}

console.log("called with 0", growTree(0), "expect 1")
console.log("called with 1", growTree(1), "expect 2")
console.log("called with 2", growTree(2), "expect 3")
console.log("called with 3", growTree(3), "expect 6")
console.log("called with 4", growTree(4), "expect 7")
console.log("called with 5", growTree(5), "expect 14")