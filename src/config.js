const { URL } = require('url')
const dbUrl = 'mongodb://coin-db:27017/coin'
const coinUrl = 'http://www.btc38.com/trade/getCoinHold.php?1=1'
const listUrl = 'http://www.btc38.com/httpAPI.php?1=1'

module.exports = {
  dbUrl,
  listUrl,
  coinUrl
}