const g = function * () {
  console.log('started')
  const str = yield
  yield str.toUpperCase()
}

const gi = g()

console.log(gi.next()) // value: undefined, done: false
console.log(gi.next('bar')) // value: 'BAR', done: false
console.log(gi.next()) // value: undefined, done: true
