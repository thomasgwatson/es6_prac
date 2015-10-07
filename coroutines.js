import Promise from 'bluebird'
global.Promise = Promise
import fs from 'fs'
Promise.promisifyAll(fs)

let getContentsThru
getContentsThru = (fileName) =>
  fs.readFileAsync(fileName, 'utf8')
  .then((fileNameContents) =>
    fs.readFileAsync(fileNameContents.trim(), 'utf8'))

getContentsThru = Promise.coroutine(function * (fileName){
  const fileNameContents = yield fs.readFileAsync(fileName, 'utf8')
  return yield fs.readFileAsync(fileNameContents.trim(), 'utf8')
})

// es 2016
// getContentsThru = function ^ (fileName){
//   const fileNameContents = await fs.readFileAsync(fileName, 'utf8')
//   return await fs.readFileAsync(fileNameContents.trim(), 'utf8')
// }

// getContentsThru('data.txt')
// .then((contents) => { console.log(contents) })

Promise.coroutine(function * () {
  console.log(yield getContentsThru('data.txt'))
})()

// PromiseValue--Error yield Promise()
// coroutine takes generator and returns a promise