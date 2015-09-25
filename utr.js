// f(0) -> 1
// f(1) -> 2
// f(2) -> 3
// f(3) -> 6
// f(4) -> 7
// f(5) -> 14

// f(0) -> 1
// f(1) -> f(0)*2
// f(2) -> f(1)+1
// f(3) -> f(2)*2
// f(4) -> f(3)+1
// f(5) -> f(4)*2

// f(n) -> if(is odd) then f(n-1)*2 else f(n-1) + 1

// f(n) -> let ph = f(n-1)
// if(n is odd) then ph * 2 else ph + 1

const growTree = (cycles) => {
  if(cycles === 0) return 1

  const previousHeight = growTree(cycles - 1)
  const isSeasonSpring = cycles % 2 === 1

  return isSeasonSpring ? previousHeight * 2 : previousHeight + 1
}

console.log("called with 0", growTree(0), "expect 1")
console.log("called with 1", growTree(1), "expect 2")
console.log("called with 2", growTree(2), "expect 3")
console.log("called with 3", growTree(3), "expect 6")
console.log("called with 4", growTree(4), "expect 7")
console.log("called with 5", growTree(5), "expect 14")