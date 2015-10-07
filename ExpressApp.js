import express from 'express'

const app = express()

// capture req start
app.use((req, res, next) => {
  const start = process.hrtime()
  const oldEnd = res.end
  // mutates res
  res.end = (...args) => {
    console.log(process.hrtime(start))
    oldEnd.call(res, ...args)
  }
  next()
})

app.use((req, res, next) => {
  res.end('hello world')
  next()
})

// // capture res end
// app.use((req, res) => {

// })

app.listen(3005)
