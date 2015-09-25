// f(int) -> int
// f(1) -> 1
// f(2) -> 2
// f(3) -> 3
// f(4) -> 5
// f(5) -> 8
// f(6) -> 13

// f(1) -> 1
// f(2) -> 2

// f(3) -> f(n-1) + f(n-2)
// f(4) -> 5
// f(5) -> 8
// f(6) -> 13

// f(n) -> f(n-1) + f(n-2)

const fib = (int) => {
  if(int === 1) return 1
  if(int === 2) return 2
  return fib(int-2) + fib(int-1)
}

console.log(fib(1))
console.log(fib(2))
console.log(fib(3))
console.log(fib(4))
console.log(fib(5))
console.log(fib(6))