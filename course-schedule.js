// https://leetcode.com/problems/course-schedule/

import logger from 'debug'
const debug = logger('course-schedule')

export let canFinish
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

canFinish = (numOfCourses, coursesArray = []) => {
  const coursesAdjMap = adjListToadjMap(coursesArray)
  const courseSet = coursesArray.reduce((memo, [a, b]) => memo.add(a).add(b), new Set())
  let cache = new Set()
  if (courseSet.size > numOfCourses) return false
  for (let key of coursesAdjMap.keys()) {
    cache = areDepedenciesOkayViaBFS(coursesAdjMap, key, numOfCourses, cache)
    debug(cache)
    if (!cache) return false
  }
  return true
}

let areDepedenciesOkayViaBFS
areDepedenciesOkayViaBFS = (aList, start, numOfCourses, cache) => {
  const queue = []
  if (cache.has(start)) return cache
  const visited = new Set()
  queue.push(start)
  while (queue.length > 0) {
    const node = queue.shift()
    if (visited.has(node)) return false
    visited.add(start)
    const neighbors = aList.get(node)
    if (neighbors) {
      for (let neighbor of neighbors) {
        queue.push(neighbor)
      }
    }
  }
  visited.forEach((x) => cache.add(x))
  return cache
}

// areDepedenciesOkayViaBFS = function * (aList, start) {
//   console.log(start, "this is in the generator")
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

const adjListToadjMap = (adjList) => {
  let edgeEnd, edgeStart
  const adjMap = new Map()
  for ([edgeEnd, edgeStart] of adjList) {
    if (adjMap.has(edgeStart)) adjMap.set(edgeStart, adjMap.get(edgeStart).concat([edgeEnd]))
    else adjMap.set(edgeStart, [edgeEnd])
  }
  return adjMap
}

// const flattenByDepth = function (nodeList, graphMap, visited = new Set()) {
//   if (!Array.isArray(nodeList)) nodeList = [nodeList]
//   if (nodeList.size === 0) return nodeList

//   // convert Map keys into array of keys
//   const [head, ...rest] = nodeList
//   visited.add(head)
//   debug(visited)
//   return [head].concat(flattenByDepth(graphMap.get(head), graphMap, visited)).concat(flattenByDepth(rest, graphMap, visited))
// }

const adjList1 = [[0, 1], [1, 4], [2, 3], [4, 3], [5, 6]]
const adjList2 = [[0, 1], [1, 4], [3, 1], [2, 3], [4, 3], [5, 6]]
const adjList3 = [[0, 1]]

console.log(adjListToadjMap(adjList1))
console.log(adjListToadjMap(adjList2))

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

