// Using generator, do fib

const listOfFib = (length) => {
  if (length === 1) return [1]
  const pair = [1, 1]
  if (length === 2) return pair
  const list = [1, 1]
  for (var i = 1; i <= length - 2; i++) {
    list.push(pair[0] + pair[1])
    pair[0] = pair[1]
    pair[1] = list[list.length - 1]
  }
  return list
}

const nthFibNumber = (n) => {
  return listOfFib(n)[n - 1]
}

const fibs = function * () {
  yield 1
  yield 1
  const pair = [1, 1]
  for (;;) {
    const nextNumber = pair[0] + pair[1]
    pair[0] = pair[1]
    pair[1] = nextNumber
    yield nextNumber
  }
}

// find the largest fib number under 100

const fg = fibs()
// let fib
// do {
//   fib = fg.next()
//   console.log(fib.value)
// } while (fib.value < 100)

for (let fib of fg) {
  console.log(fib)
  if (fib > 100) break
}

// console.log(fib.value)

// console.log(listOfFib(1))
// console.log(listOfFib(2))
// console.log(listOfFib(3))
// console.log(listOfFib(4))
// console.log(listOfFib(5))
// console.log(listOfFib(6))
// console.log(nthFibNumber(6))
