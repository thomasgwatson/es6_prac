// f(0) -> undefined
// f(1) -> 1
// f(2) -> 2
// f(3) -> 6
// f(4) -> 24

// f(1) -> 1
// f(2) -> 2*1
// f(3) -> 3*2*1
// f(4) -> 4*3*2*1

// f(1) -> 1
// f(2) -> 2 * f(1)
// f(3) -> 3 * f(2)
// f(4) -> 4 * f(3)

// f(n) -> n * f(n-1)