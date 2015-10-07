import fs from 'fs'

const getContentsThru = (fileName) =>
  readFileAsync(fileName, 'utf8')
  .then((fileNameContents) =>
    readFileAsync(fileNameContents.trim(), 'utf8'))

const readFileAsync = (fileName, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, encoding, (err, contents) => {
      if (err) return reject(err)
      resolve(contents)
    })
  })
}

getContentsThru('data.txt')
.then((contents) => { console.log(contents) })
