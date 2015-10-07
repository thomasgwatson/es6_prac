import tape from 'tape'
import {buildOrder} from './buildOrder'
import logger from 'debug'
const debug = logger('course-schedule.test')

// wach 'DEBUG=*,-babel DEBUG_COLORS=true babel-node buildOrder.test.js'

const testData = [
  { name: 'Simplest case',
    given: {dependencies: [[9, 1]]},
    expected: [1, 9],
  },
  // { name: 'Simplest cycle case',
  //   given: {dependencies: [[9, 1], [1, 9]]},
  //   expected: 'cycle',
  // },
  { name: 'Multiple dependencies on the one project',
    given: {dependencies: [[9, 1], [9, 2], [1, 2]]},
    expected: [2, 1, 9],
  },
  { name: 'List does not include cycle',
    given: {dependencies: [[9, 1], [1, 4], [2, 3], [4, 3]]},
    expected: [3, 2, 4, 1, 9],
  },
  { name: 'List includes cycle',
    given: {dependencies: [[9, 1], [1, 4], [3, 1], [2, 3], [4, 3]]},
    expected: 'cycle',
  },
  { name: 'List does not include cycle',
    given: {dependencies: [[9, 1], [1, 4], [2, 3], [4, 3], [2, 5], [5, 7], [7, 8]]},
    expected: [3, 4, 8, 7, 1, 5, 9, 2],
  },
  { name: 'novel example one',
    given: {dependencies: [['main', 'foo'], ['main', 'bar'], ['bar', 'baz'], ['baz', 'qux'], ['baz', 'zip']]},
    expected: ['foo', 'qux', 'zip', 'baz', 'bar', 'main'],
  },
]

for (const {name, given, expected} of testData) {
  tape(name, (t) => {
    t.plan(1)
    const standardStartTime = process.hrtime()
    given.dependencies.map(([a, b]) => a * b)
    const standardDelta = process.hrtime(standardStartTime)
    const startTime = process.hrtime()
    const actual = buildOrder(given.dependencies)
    const delta = process.hrtime(startTime)
    debug('run-time: delta', delta, 'standardDelta: ', standardDelta)
    debug('run-time: ', (embiggen(delta)) / (embiggen(standardDelta)))
    t.deepEqual(actual, expected)
  })
}

const embiggen = ([seconds, nanos]) => {
  return seconds * 1e9 + nanos
}
