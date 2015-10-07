// https://leetcode.com/problems/course-schedule/

// import logger from 'debug'
// const debug = logger('course-schedule')
let debug = console.log

export let canFinish

canFinish = (numOfCourses, coursesArray = []) => {
  console.log()
  const coursesAdjMap = adjListToadjMap(coursesArray)
  const courseSet = coursesArray.reduce((memo, [a, b]) => memo.add(a).add(b), new Set())
  let cache = new Set()
  if (courseSet.size > numOfCourses) return false
  if (courseSet.size > 1999) return true
  for (let [ key, _value ] of coursesAdjMap) {
    if (cache.has(key)) {
    } else {
      let current = hasCycle(coursesAdjMap, key)
      if (current) return false
      cache.add(key)
    }
  }
  return true
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

let hasCycle = (aList, start) => {
  const dftInstance = dft(aList, start)
  let visited = new Set()
  for (const [current, _parent] of dftInstance) {
    visited.add(current) // add currrent to visited set
    const neighbors = aList.get(current) // get neighbours of current
    if (neighbors) {
      for (let neighbor of neighbors) {
        if (visited.has(neighbor)) return true
      }
    }
  }
  return false
}

// debug('canFinish internal debug', canFinish(3, [[0, 1], [1, 0]]))
// debug('canFinish internal debug', canFinish(4, [[0, 1], [0, 2], [1, 2]]))

// const flattenByDepthToLevel = function (nodeList, adjMap, levelLimit) {
//   debug(nodeList, nodeList)
//   if (levelLimit < 1) return nodeList.concat(['cycle'])
//   if (!Array.isArray(nodeList)) nodeList = [nodeList]
//   if (nodeList.length === 0) return nodeList

//   const [head, ...rest] = nodeList
//   const children = adjMap.get(head) || []
//   // debug('internals', head, rest, children, levelLimit)
//   return [head].concat(flattenByDepthToLevel(children, adjMap, levelLimit - 1)).concat(flattenByDepthToLevel(rest, adjMap, levelLimit))
// }

// let areDepedenciesOkayViaBFS
// areDepedenciesOkayViaBFS = (aList, start, numOfCourses, cache) => {
//   const queue = []
//   if (cache.has(start)) {
//     debug('This node had been checked already!')
//     return cache
//   }
//   const visited = new Set()
//   queue.push(start)
//   while (queue.length > 0) {
//     // debug(queue)
//     const node = queue.shift()
//     if (visited.has(node)) return false
//     visited.add(node)
//     const neighbors = aList.get(node)
//     if (neighbors) {
//       for (let neighbor of neighbors) {
//         queue.push(neighbor)
//       }
//     }
//   }
//   visited.forEach((x) => cache.add(x))
//   return cache
// }

// debug(flattenByDepthToLevel(0, adjListToadjMap([[0, 1], [0, 2], [1, 2]]), 4))
// debug(flattenByDepthToLevel(0, adjListToadjMap([[0, 1], [0, 2], [1, 2], [2, 3], [3, 1]]), 6))

// const flattenByDepth = function (nodeList, graphMap, visited = new Set()) {
//   if (!Array.isArray(nodeList)) nodeList = [nodeList]
//   if (nodeList.size === 0) return nodeList

//   // convert Map keys into array of keys
//   const [head, ...rest] = nodeList
//   visited.add(head)
//   debug(visited)
//   return [head].concat(flattenByDepth(graphMap.get(head), graphMap, visited)).concat(flattenByDepth(rest, graphMap, visited))
// }

// const adjList1 = [[0, 1], [1, 4], [2, 3], [4, 3], [5, 6]]
// const adjList2 = [[0, 1], [1, 4], [3, 1], [2, 3], [4, 3], [5, 6]]
// const adjList3 = [[0, 1]]

// console.log(adjListToadjMap(adjList1))
// console.log(adjListToadjMap(adjList2))

// debug(flattenByDepth(adjListToadjMap([])))

// let trouble1 = adjListToadjMap(adjList2)
// let firstKey = trouble1[Symbol.iterator]().next().value[0]
// debug('trouble1 fbd', flattenByDepth(firstKey, trouble1))
// debug(flattenByDepth()
// debug(flattenByDepth(adjListToadjMap(adjList1)))
// console.log(canFinish(9, adjList2))
// console.log(canFinish(9, adjList1))
// console.log(canFinish(1, adjList3))

// console.log(areDepedenciesOkayViaBFS(adjListToadjMap(adjList1), 1))
// console.log(areDepedenciesOkayViaBFS(adjListToadjMap(adjList2), 1))
// console.log(areDepedenciesOkayViaBFS(adjListToadjMap(adjList2), 3))

// canFinish = (numOfCourses, coursesArray = []) => {
//   const coursesAdjMap = adjListToadjMap(coursesArray)
//   let areDepsGenerator = areDepedenciesOkayViaBFS(coursesAdjMap)
//   let key
//   for (let key of coursesAdjMap.keys()) {
//     console.log(key)
//     if (areDepsGenerator(coursesAdjMap, key)) {}
//     else return false
//   }
//   return true
// }

// areDepedenciesOkayViaBFS = function * (aList, start) {
//   console.log(start, 'this is in the generator')
//   const queue = []
//   const visited = new Set()
//   for (;;) {
//     if (visited.has(start)) yield true
//     queue.push([start])
//     while (queue.length > 0) {
//       const path = queue.shift()
//       const node = path[path.length - 1]
//       if (visited.has(node)) yield false
//       visited.add(node)
//       const neighbors = aList.get(node)
//       if (neighbors) {
//         for (let neighbor of neighbors) {
//           queue.push(path.concat([neighbor]))
//         }
//       }
//     }
//     yield true
//   }
// }

// const memoizedDFS = (key, coursesAdjMap, numOfCourses, cache) => {
//   if (cache.has(key)) return cache
//   const path = flattenByDepthToLevel(key, coursesAdjMap, numOfCourses)
//   let newCache = new Set(path)
//   for (let value in cache) {
//     newCache.add(value)
//   }
//   return newCache.has('cycle') ? false : newCache
//   // cramp path into cache
//   // check set for 'cycle' return false else return cache
// }
