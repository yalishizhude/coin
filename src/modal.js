const { dbUrl } = require('./config')
let mongoose = require('mongoose')
mongoose.connect(`${dbUrl}`)
let Schema = mongoose.Schema

const coinSchema = new Schema({
  name: String,
  code: {
    type: String,
    uppercase: true,
    trim: true
  },
  history: [{
    price: Number,
    change1h: Number,
    change24h: Number,
    change7d: Number,
    timestamp: Date,
    time: Date,
    updateTime: String,
    totalCoins: Number,
    holders: Number,
    coinsPerHolders: Number
  }]
})

const coinModal = mongoose.model('Coin', coinSchema)

module.exports = {
  coinSchema,
  coinModal
}