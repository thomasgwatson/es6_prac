import Promise from 'bluebird'
global.Promise = Promise
import fs from 'fs'
Promise.promisifyAll(fs)
// const readFileAsync = Promise.promisify(fs.readFile)

const getContentsThru = (fileName) =>
  fs.readFileAsync(fileName, 'utf8')
  .then((fileNameContents) =>
    fs.readFileAsync(fileNameContents.trim(), 'utf8'))

// const readFileAsync = (fileName, encoding) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(fileName, encoding, (err, contents) => {
//       if (err) return reject(err)
//       resolve(contents)
//     })
//   })
// }

getContentsThru('data.txt')
.then((contents) => { console.log(contents) })
