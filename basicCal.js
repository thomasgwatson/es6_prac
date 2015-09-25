const calculate = (string) => {
  return parseInt(tokenize(string).reduce(reduceTokenToStack, [])[0], 10)
}

const tokenize = (string) => string.match(/\d+|\+|\-|\(|\)/g)

const reduceTokenToStack = (stack, token) => {
  const top = peek(stack)
  if (isNum(token)) return reduceNumberToStack(stack, token)
  if (token === ')') {
    stack.pop()
    stack.pop()
    return reduceNumberToStack(stack, top)
  }
  return stack.concat([token])
}

const reduceNumberToStack = (stack, number) => {
  const top = peek(stack)
  if (!isOperant(top)) return stack.concat([number])
  else return stack.concat([runOperation(stack.pop(), stack.pop(), number)])
}

const isNum = (token) => typeof token === 'number' || digitRegex.test(token)

const digitRegex = /\d+/

const isOperant = (token) => operantSet.has(token)

const operantSet = new Set(['+', '-'])

const peek = (stack) => stack[stack.length - 1]

const operatorFunctions = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '*': function (x, y) { return x * y },
  '/': function (x, y) { return x / y },
}

const runOperation = function (operation, firstInt, secondInt) {
  return operatorFunctions[operation](parseInt(firstInt, 10), parseInt(secondInt, 10))
}

// const testData = [
//   {given: {stack: [], token: '('}, expect: ['(']},
//   {given: {stack: ['('], token: '4'}, expect: ['(', '4']},
//   {given: {stack: ['(', '4'], token: '-'}, expect: ['(', '4', '-']},
//   {given: {stack: ['(', '4', '-'], token: '3'}, expect: ['(', 1]},
//   //
//   {given: {stack: ['(', 1], token: ')'}, expect: [1]},
//   {given: {stack: ['2', '+', '(', 1], token: ')'}, expect: [3]},
// ]

// const runTests = () => {
//   for (let {given, expect} of testData) {
//     const actual = reduceTokenToStack(given.stack, given.token)
//     if (!eq(actual, expect)) {
//       console.log('No bueno given: ', given, ' expected:', expect, ' got: ', actual)
//     }
//   }
//   console.log('okay')
// }

const testData = [
  {given: '(1+(4+5+2)-3)+(6+8)', expect: 23},
  {given: ' 2-1 + 2 ', expect: 3},

]

const runTests = () => {
  for (let {given, expect} of testData) {
    const actual = calculate(given)
    if (!eq(actual, expect)) {
      console.log('No bueno given: ', given, ' expected:', expect, ' got: ', actual)
    }
  }
  console.log('okay')
}

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b)

if (process.env.TEST) runTests()
