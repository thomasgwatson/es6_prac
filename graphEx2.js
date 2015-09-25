const sevenNodeAList = new Map([
  [1, new Set([2, 3])],
  [2, new Set([1, 4, 5])],
  [3, new Set([1, 6, 7])],
  [4, new Set([2])],
  [5, new Set([2])],
  [6, new Set([3])],
  [7, new Set([3])],
]
  )
let bft
bft = (aList, start) => {
  const queue = []
  const nodeList = []
  const visited = new Set()
  queue.push(start)
  while (queue.length > 0) {
    const node = queue.shift()
    nodeList.push(node)
    visited.add(node)
    const neighbors = aList.get(node)
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) queue.push(neighbor)
    }
  }
  return nodeList
}

let findPathViaBFS
findPathViaBFS = (aList, start, end) => {
  const queue = []
  const visited = new Set()
  queue.push([start])
  while (queue.length > 0) {
    console.log(queue)
    const path = queue.shift()
    const node = path[path.length - 1]
    if (node === end) return path
    visited.add(node)
    const neighbors = aList.get(node)
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) queue.push(path.concat([neighbor]))
    }
  }
}

findPathViaBFS = (aList, start, end) => {
  const queue = []
  const visited = new Map()
  visited.set(start, null)
  queue.push(start)
  while (queue.length > 0) {
    const node = queue.shift()
    if (node === end) return buildPath(visited, end)
    const neighbors = aList.get(node)
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor)
        visited.set(neighbor, node)
      }
    }
  }
}

// write this!!
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

findPathViaBFS = (aList, start, end) => {
  const pathMap = new Map()
  let node, prev
  for ([node, prev] of bft(aList, start)) {
    pathMap.set(node, prev)
    if (node === end) break
  }
  return buildPath(pathMap, end)
}

const buildPath = (visitedMap, end) => {
  const path = [end]
  let previous
  while ((previous = visitedMap.get(path[0]))) {
    path.unshift(previous)
  }
  return path
}

// console.log('got:', bft(sevenNodeAList, 1), 'expected:', [1, 2, 3, 4, 5, 6, 7])
// console.log('got:', bft(sevenNodeAList, 2), 'expected:', [2, 1, 4, 5, 3, 6, 7])
// console.log('got:', findPathViaBFS(sevenNodeAList, 1, 5), 'expected:', [1, 2, 5])
// console.log('got:', findPathViaBFS(sevenNodeAList, 2, 5), 'expected:', [2, 5])
console.log('got:', findPathViaBFS(sevenNodeAList, 7, 4), 'expected:', [7, 3, 1, 2, 4])
// console.log(buildPath(new Map([[1, null], [2, 1], [3, 2], [4, 3]]), 4))
