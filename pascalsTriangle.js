// f(1) ->         [1]
// f(2) ->        [1,1]
// f(3) ->      [1, 2, 1]
// f(4) ->    [1, 3, 3, 1]
// f(5) ->   [1, 4, 6, 4, 1]
// f(6) ->  [1, 5, 10, 10, 5, 1]

// f(1) ->         [1]
// f(2) ->        [1,1]
// f(3) ->      [1, 2, 1]
// f(4) ->    [1, 3, 3, 1]
// f(5) ->   [1, 4, 6, 4, 1]
// f(6) ->  [1, 5, 10, 10, 5, 1]
// f(7) ->[1, 6, 15, 20, 15, 6, 1]

// f(1) ->         [1]
// f(2) ->        f(1)[0], f(1)[1]
// f(3) ->      f(1)[0], f(2), f(1)[1]
// f(4) ->    [1, 3, 3, 1]
// f(5) ->   [1, 4, 6, 4, 1]
// f(6) ->  [1, 5, 10, 10, 5, 1]
// f(7) ->[1, 6, 15, 20, 15, 6, 1]
// f(8) ->[1, 7, 21, 35, 35, 21, 7, 1]

// f(n)[i] -> f(n-1)[i - 1] + f(n-1)[i]
// f(n)[0] -> 1
// f(n)[-1] -> 1

// output.length = n
// output[0] = 1
// output[-1] = 1
// basecases:
// f(1) ->         [1]
// f(2) ->        [1,1]
// output[1] = n-1
// output[-2] = n-1
// rows are mirrored

const rowOfPascalsTriangle = (rowIndex) => {
  return Array.apply(null, {length: rowIndex}).map((_, colIndex) => valueOfPascalsTriangle(colIndex, rowIndex))
}

const valueOfPascalsTriangle = function(index, rowIndex) {
  if(rowIndex <= 2) return 1
  if(index === 0 || /* last column? */ (rowIndex - index - 1) === 0) return 1
  return valueOfPascalsTriangle(index-1, rowIndex-1) + valueOfPascalsTriangle(index, rowIndex-1)
}

const memoized = (fn) => {
  return (...args) => {
    fn.memo = fn.memo || {}
    const key = JSON.stringify(...args)
    if(fn.memo[key]) return fn.memo[key]
    const results = fn(...args)
    fn.memo[key] = results
    return results
  }
}

// console.log("Got:", rowOfPascalsTriangle(4), "expected: [ 1, 3, 3, 1 ]")
// console.log("Got:", rowOfPascalsTriangle(5), "expected: [ 1, 4, 6, 4, 1 ]")
// console.log("Got:", rowOfPascalsTriangle(6), "expected: [ 1, 5, 10, 10, 5, 1]")
// console.log("Got:", rowOfPascalsTriangle(7), "expected: [ 1, 6, 15, 20, 15, 6, 1 ]")
// console.log("Got:", rowOfPascalsTriangle(12), "expected: [ 1, 3, 3, 1 ]")

// console.log(valueOfPascalsTriangle(0,1))
// console.log(valueOfPascalsTriangle(1,3))
// console.log(valueOfPascalsTriangle(2,5))
// console.log(valueOfPascalsTriangle(3,7))


const memoedRowOfPascalsTriangle = memoized(rowOfPascalsTriangle)

console.log(memoedRowOfPascalsTriangle(parseInt(process.argv[2])))