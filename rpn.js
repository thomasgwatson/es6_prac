/**
 * @param {string[]} tokens
 * @return {number}
 *
 * So, you just need a stack to hold values until an operator comes along
 * You need a set of conditionals that handle returning the final value and the operations
 *
 */
const operants = new Set(['*', '/', '-', '+'])

var evalRPN = function (tokens) {
  return tokens.reduce(reduceTokenToStack, [])[0]
}

var operatorFunctions = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '*': function (x, y) { return x * y },
  '/': function (x, y) { return x / y },
}

const reduceTokenToStack = (stack, token) => {
  if (operants.has(token)) {
    var result = parseInt(runOperation(token, stack.pop(), stack.pop()), 10)
    stack.push(result)
  } else {
    stack.push(parseInt(token, 10))
  }
  return stack
}

var runOperation = function (operation, secondInt, firstInt) {
  if (operation === '/' && (secondInt === 0 || firstInt === 0)) { return 0 }
  return operatorFunctions[operation](firstInt, secondInt)
}

const testData = [
  [['1'], 1],
  [['2', '1', '+', '3', '*'], 9],
  [['4', '13', '5', '/', '+'], 6],
]

const runTests = () => {
  for (let [input, expected] of testData) {
    const actual = evalRPN(input)
    if (actual !== expected) {
      console.log('No bueno given: ', input, ' expected:', expected, ' got: ', actual)
    }
  }
  console.log('okay')
}

if (process.env.TEST) runTests()
