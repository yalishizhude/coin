let { coinModal } = require('./modal')
let { getCoinList, getAllCoin} = require('./controller.js')

let _getCoin = async() => {
  let [ price, change] = await Promise.all([getAllCoin(), getCoinList()]) 
  let priceMap = price.map
  let changeMap = change.map
  for(let c in priceMap) {
    let coin = Object.assign(priceMap[c], changeMap[c])
    coinModal.update({
      code: coin.code
    }, {
      $push: {
        history: coin
      }
    }, e => e?console.error(e):void 0)
  }
  setTimeout(_getCoin, 1000 * 60 * 5)
}
_getCoin()
module.exports = {}