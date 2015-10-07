let bft
bft = function * (aList, start) {
  const queue = []
  const visited = new Set()
  visited.add(start)
  queue.push(start)
  yield [start, null]
  while (queue.length > 0) {
    const node = queue.shift()
    const neighbors = aList.get(node)
    visited.add(node)
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor)
        yield [neighbor, node]
      }
    }
  }
}

const flattenByDepth = function (nodeList) {
  if (!Array.isArray(nodeList)) nodeList = [nodeList]
  if (nodeList.length === 0) return nodeList

  const [head, ...rest] = nodeList
  return [head].concat(flattenByDepth(head.children)).concat(flattenByDepth(rest))
}

let dft
dft = function * (aList, startNodes, visited = new Set(), parent = null) {
  if (!Array.isArray(startNodes)) startNodes = [startNodes]
  if (startNodes.length === 0) return
  // if (aList.get(startNodes).size === 0 && startNodes.length === 0) return yield [startNodes, null]
  let [head, ...rest] = startNodes
  if (!visited.has(head)) {
    visited.add(head)
    yield [head, parent]
    const children = aList.get(head)
    yield * dft(aList, children, visited, head)
  }
  yield * dft(aList, rest, visited, parent)
}

let detectCycle = (aList, start) => {
  const dftInstance = dft(aList, start)
  let current, next
  let visited = new Set()
  next = dftInstance.next() // skip past start value
  current = next.value && next.value[0]
  while (!next.done) {
    console.log(next)
    // add currrent to visited set
    visited.add(current)
    // get neighbours of current
    const neighbors = aList.get(current)
    // if any appear in set return true
    for (let neighbor of neighbors) {
      if (visited.has(neighbor)) return true
    }
    next = dftInstance.next()
    current = next.value && next.value[0]
  }
  return false
}

detectCycle = (aList, start) => {
  const dftInstance = dft(aList, start)
  let visited = new Set()
  for (const [current, _parent] of dftInstance) {
    visited.add(current) // add currrent to visited set
    const neighbors = aList.get(current) // get neighbours of current
    for (let neighbor of neighbors) {
      if (visited.has(neighbor)) return true
    }
  }
  return false
}

const sevenNodeAListCycle = new Map([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6, 7]],
  [4, []],
  [5, [6]],
  [6, [3]],
  [7, []],
])

const sevenNodeAList = new Map([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6, 7]],
  [4, []],
  [5, [6]],
  [6, []],
  [7, []],
])

const oneNodeAList = new Map([
  [1, []],
])

const oneNodeAListCycle = new Map([
  [1, [3]],
  [3, [1]],
])

const threeNodeAList = new Map([
  [1, [2]],
  [2, [3]],
  [3, []],
])

const threeNodeAListCycle = new Map([
  [1, [2]],
  [2, [3]],
  [3, [1]],
])

// console.log('got:', detectCycle(oneNodeAListCycle, 1), 'expected:', true)
// console.log('got:', detectCycle(oneNodeAList, 1), 'expected:', false)
console.log('got:', detectCycle(threeNodeAList, 1), 'expected:', false)
console.log('got:', detectCycle(threeNodeAListCycle, 1), 'expected:', true)
console.log('got:', detectCycle(sevenNodeAList, 1), 'expected:', true)
console.log('got:', detectCycle(sevenNodeAListCycle, 1), 'expected:', true)
// console.log('got:', [...dft(oneNodeAList, 1)].map((x) => x[0]), 'expected:', [1])
// console.log('got:', [...dft(threeNodeAList, 1)].map((x) => x[0]), 'expected:', [1, 2, 3])
// console.log('got:', [...dft(sevenNodeAList, 1)].map((x) => x[0]), 'expected:', [1, 2, 4, 5, 6, 3, 7])
// console.log('got:', [...dft(sevenNodeAListCycle, 1)].map((x) => x[0]), 'expected:', [1, 2, 4, 5, 6, 3, 7])
// console.log('got:', [...bft(sevenNodeAList, 1)].map((x) => x[0]), 'expected:', [1, 2, 3, 4, 5, 6, 7])
// console.log('got:', [...bft(sevenNodeAList, 2)].map((x) => x[0]), 'expected:', [2, 1, 4, 5, 3, 6, 7])
