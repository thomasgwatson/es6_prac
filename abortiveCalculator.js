/**
 * @param {string} s
 * @return {number}
 *
 * recursive solution possible
 * if whitespace ignore
 * if number && !operator, set as total
 * if operator, set as operator
 * if number && operator, conduct operation on total
 * if parens open, create stack. Add c
 *
 */

/**
 * @param {string} s
 * @return {number}
 */
var isInt = {
  '0': true,
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
  '6': true,
  '7': true,
  '8': true,
  '9': true,
}

var operatorFunctions = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '(': function (x, y) { return x + y },
}

var calculate = function (s) {
  if (s.length === 1) return parseInt(s, 10)
  var string = s.slice(0)
  var results = [0]
  for (var i = string.length - 1; i >= 0; i--) {
    var cur = string[i] // current could be ),(,+,- or digit
    // console.log(cur)
    if (cur === ')') { results.push(0) }
    if (isInt[cur]) {
      var end = i
      while (isInt[string[i - 1]]) {
        // console.log(i, "in while loop")
        i--
      }
      // console.log(i, end, string.slice(i,end+1), "string.slice(i,end)")
      results.push(parseInt(string.slice(i, end + 1), 10))
    }
    if (cur === '+' || cur === '-' || cur === '(') {
      var rightValue = results.pop()
      var leftValue = results.pop()
      // console.log(rightValue, leftValue, operatorFunctions[cur](leftValue, rightValue))
      results.push(operatorFunctions[cur](leftValue, rightValue))
    }
  }
  // console.log(results, "results are the end")
  return results.reduce(function (sum, next) {
    // console.log(sum, next, "sum and next")
    return sum + next
  })
}

console.log('result: ', calculate('1 + 111'))
console.log('result: ', calculate('2 + 1 -1 '))
console.log('result: ', calculate('(1+(4+5+2)-3)+(6+8)'))
