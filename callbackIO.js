import fs from 'fs'

const getContentsThru = (fileName, callback) => {
  fs.readFile(fileName, 'utf8', (err, fileName) => {
    if (err) return callback(err)
    fs.readFile(fileName.trim(), 'utf8', callback)
  })
}

getContentsThru('data.txt', (err, contents) => {
  if (err) throw err
  console.log(contents)
})