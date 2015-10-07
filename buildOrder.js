import logger from 'debug'
const debug = logger('buildOrder')
// let debug = console.log

export let buildOrder

buildOrder = (adjListFromFile) => {
  const depsAdjMap = adjListToadjMap(adjListFromFile)
  let result = []
  for (let [ key, _value ] of depsAdjMap) {
    const current = returnPath(depsAdjMap, key)
    if (current === 'cycle') return current
    result.push(current)
  }
  return sortAndCondense(result)
}

let returnPath
returnPath = (aList, key) => {
  const dftInstance = dft(aList, key)
  let visited = new Set()
  let result = []
  for (const [current, _parent] of dftInstance) {
    visited.add(current) // add current to visited set
    if (current) result.push(current)
    const neighbors = aList.get(current) // get neighbours of current
    if (neighbors) {
      for (let neighbor of neighbors) {
        if (visited.has(neighbor)) return 'cycle'
      }
    }
  }
  return result
}

let sortAndCondense = (pathList) => {
  pathList.sort((a, b) => { return a.length - b.length })
  let buildOrder = []
  for (let path of pathList) {
    for (var i = path.length - 1; i > -1; i--) {
      if (buildOrder.indexOf(path[i]) < 0) buildOrder.push(path[i])
    }
  }
  return buildOrder
}

let dft
dft = function * (aList, startNodes, visited = new Set(), parent = null) {
  if (!Array.isArray(startNodes)) startNodes = [startNodes]
  if (startNodes.length === 0) return
  let [head, ...rest] = startNodes
  if (!visited.has(head)) {
    visited.add(head)
    yield [head, parent]
    const children = aList.get(head)
    yield * dft(aList, children, visited, head)
  }
  yield * dft(aList, rest, visited, parent)
}

const adjListToadjMap = (adjList) => {
  let edgeEnd, edgeStart
  const adjMap = new Map()
  for ([edgeStart, edgeEnd] of adjList) {
    if (adjMap.has(edgeStart)) adjMap.set(edgeStart, adjMap.get(edgeStart).concat([edgeEnd]))
    else adjMap.set(edgeStart, [edgeEnd])
  }
  return adjMap
}
