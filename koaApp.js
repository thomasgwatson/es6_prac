import koa from 'koa'

const app = koa()

// capture req start
app.use(function * (next) {
  const start = process.hrtime()
  console.log('path', this.request.path)
  yield next
  console.log('res status', this.response.status)
  console.log('req/res time', process.hrtime(start))
})

app.use(function * (next) {
  this.response.status = 201
  this.response.body = 'Hello World'
  yield next
})

// // capture res end
// app.use((req, res) => {

// })

app.listen(3005)
