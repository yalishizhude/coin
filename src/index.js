const Koa = require('koa')
let app = new Koa()
let router = require('./router')
require('./task.js')

app.use(router)
app.listen(888)

console.log('Listening on 888...')