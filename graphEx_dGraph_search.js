// ### Course Schedule My Submissions Question Solution (from leetcode)
// There are a total of n courses you have to take, labeled from 0 to n - 1.
// Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]
// Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?
// For example:
//     2, [[1,0]]
//
// There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.
//
//     2, [[1,0],[0,1]]

// There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

/*

5, [[1,2],[2,3],[4, 3], [4, 2]]

-construct a adjacency map of pre-recs?
-traverse graph

*/
let checkCoursesForDependencyProblems
checkCoursesForDependencyProblems = (numOfCourses, coursesArray = []) => {
  const coursesAdjMap = adjListToadjMap(coursesArray)
  let areDepsGenerator = areDepedenciesOkayViaBFS(coursesAdjMap)
  let key
  for (let key of coursesAdjMap.keys()) {
    console.log(key)
    if (areDepsGenerator(coursesAdjMap, key)) {}
    else return false
  }
  return true
}

checkCoursesForDependencyProblems = (numOfCourses, coursesArray = []) => {
  const coursesAdjMap = adjListToadjMap(coursesArray)
  for (let key of coursesAdjMap.keys()) {
    console.log(key)
    if (areDepedenciesOkayViaBFS(coursesAdjMap, key)) {}
    else return false
  }
  return true
}

let areDepedenciesOkayViaBFS
areDepedenciesOkayViaBFS = (aList, start) => {
  const queue = []
  const visited = new Set()
  queue.push([start])
  while (queue.length > 0) {
    const path = queue.shift()
    const node = path[path.length - 1]
    if (visited.has(node)) return false
    visited.add(node)
    const neighbors = aList.get(node)
    if (neighbors) {
      for (let neighbor of neighbors) {
        queue.push(path.concat([neighbor]))
      }
    }
  }
  return true
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

const adjList1 = [[0, 1], [1, 4], [2, 3], [4, 3], [5, 6]]
const adjList2 = [[0, 1], [1, 4], [3, 1], [2, 3], [4, 3], [5, 6]]

console.log(adjListToadjMap(adjList1))
console.log(adjListToadjMap(adjList2))
console.log(checkCoursesForDependencyProblems(9, adjList2))
console.log(checkCoursesForDependencyProblems(9, adjList1))

// console.log(areDepedenciesOkayViaBFS(adjListToadjMap(adjList1), 1))
// console.log(areDepedenciesOkayViaBFS(adjListToadjMap(adjList2), 1))
// console.log(areDepedenciesOkayViaBFS(adjListToadjMap(adjList2), 3))

