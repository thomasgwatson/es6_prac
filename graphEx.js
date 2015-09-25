const adjacencyMap = [
  ['LAX', new Set(['LAS', 'PHX'])],
  ['LAS', new Set(['LAX', 'PHX', 'DEN'])],
  ['PHX', new Set(['LAX', 'LAS', 'DEN', 'DFW', 'ORD'])],
  ['DEN', new Set(['LAS', 'PHX', 'ORD'])],
  ['DFW', new Set(['PHX', 'ORD', 'HOU'])],
  ['ORD', new Set(['DEN', 'PHX', 'DFW', 'HOU', 'ATL', 'JFK'])],
  ['HOU', new Set(['DFW', 'ORD', 'ATL', 'MCO'])],
  ['ATL', new Set(['HOU', 'ORD', 'JFK', 'MCO'])],
  ['JFK', new Set(['ORD', 'ATL', 'MCO'])],
  ['MCO', new Set(['HOU', 'ATL', 'JFK'])],
]

// distance: undefined, neighbors :

// const prepareVertex = (vertex) => [vertex[0], {distance: undefined, neighbors: vertex[1]}]

const airlineNetwork = new Map(adjacencyMap)

// console.log(airlineNetwork.get('MCO'))

const findShortestRoute = (graph, start, end) => {
  const unvisited = new Set(graph.keys())
  let workRecord = prepareWorkRecord(graph)
  workRecord[start] = {distance: 0, path: `${start}`}
  unvisited.delete(start)
  return checkNeighborsForEnd(unvisited, workRecord, graph, start, end)
}

const prepareWorkRecord = (graph) => {
  let workRecord = {}
  graph.forEach((value, key) => workRecord[key] = {distance: undefined, path: undefined})
  return workRecord
}

const checkNeighborsForEnd = (unvisited, workRecord, graph, start, end) => {
  const neighbors = graph.get(start)
  // get tentative distances from start.neighbours
  // check those distances against current distances, update distance and path if smaller
  neighbors.forEach((value) => { if (unvisited.has(value)) updateDistance(value, workRecord, start) }) // yes it mutates the shit out of workRecord
  const result = solutionExists(workRecord, end)
  if (result) return result
  const newStart = findNewStart(unvisited, workRecord) // determine new start (ignore visited vertices), remove from unvisited
  if (newStart) return checkNeighborsForEnd(unvisited, workRecord, graph, newStart, end)
}

const updateDistance = (value, workRecord, start) => {
  const currentRecord = workRecord[value]
  const tentativeDistance = workRecord[start].distance + 1
  if (!currentRecord.distance || currentRecord.distance > tentativeDistance) {
    currentRecord.distance = tentativeDistance
    currentRecord.path = workRecord[start].path += `-${value}`
  }
}

const solutionExists = (workRecord, end) => {
  for (const record in workRecord) {
    console.log(workRecord[record])
    let vertex = workRecord[record]
    if (vertex.path && vertex.path.indexOf(end) > -1) return vertex.path
  }
  return undefined
}

const findNewStart = (unvisited, workRecord) => {
  // check distances in workRecord, holding on to the shortest that is in the unvisited list
  let newStart = [undefined, 9999999]
  for (var vertex in unvisited) {
    if (workRecord[vertex].distance < newStart[1]) newStart = [vertex, workRecord[vertex].distance]
  }
  return newStart[0]
}

const testData = [
  {given: [airlineNetwork, 'LAS', 'LAX'], expect: 'LAS-LAX'},
  {given: [airlineNetwork, 'ORD', 'LAX'], expect: 'ORD-PHX-LAX'},
  {given: [airlineNetwork, 'ATL', 'LAX'], expect: 'ATL-ORD-PHX-LAX'},
]

const runTests = (fn, testCases) => {
  for (let {given, expect} of testCases) {
    const actual = fn(...given)
    if (!eq(actual, expect)) {
      console.log('No bueno given: ', given, ' expected:', expect, ' got: ', actual)
    }
  }
  console.log('okay')
}

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// if (process.env.TEST) runTests(findShortestRoute, testData)
if (process.env.TEST) runTests(findShortestRoute, testData)

// Mapping over maps:
// const distances = graph.map(function([key, value]){return {key: key, distance: undefined, path: undefined}})
// const distances = graph.keys().map(function(key){return {key: undefined, path: undefined}})
// const distances = new Map(graph.keys().map((x) => {x: undefined}))
// const distances = new Map(graph.keys().map((x) => {x,undefined}))
