const router = require('koa-router')()
let { getCoinList, getAllCoin } = require('./controller.js')

router.get('/day', async ctx => {
  let all = await getCoinList()
  ctx.body = {
    list: all.list.sort((a, b) => b.change24h - a.change24h)
  }
})
.get('/week', async ctx => {
  let all = await getCoinList()
  ctx.body = {
    list: all.sort((a, b) => b.change7d - a.change7d)
  }
})
.get('/', async ctx => {
  let all = await getAllCoin()
  ctx.body = {
    list: all.list
  }
})


module.exports =  router.routes()