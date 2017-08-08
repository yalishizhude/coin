const request = require('request')
const { listUrl, coinUrl } = require('./config.js')
const data = require('./data.json')

let _request = (url, json) => new Promise((resolve, reject) => {
  url += '&n=' + Math.random()
  request(url, (err, resp, body) => {
    if (err) {
      reject(err)
    } else {
      try {
        resolve(JSON.parse(body)) 
      } catch(e) {
        console.error(e)
        resolve(body)
      }
    }
  })
})

let getCoinDetail = async(code, name) => {
  let result = {
    name,
    code
  }
  try {
    let year = (new Date()).getFullYear()
    coin = await _request(coinUrl+'&coinname='+code)
    result = Object.assign(result, coin)
    result.time = new Date(year + '-' + result.updateTime)
    result.timestamp = new Date()
    result.change7d = parseInt(result.changeWeek.replace(' CNY', ''))
    result.change24h = parseInt(result.change24H.replace(' CNY', ''))
  } catch(e) {
    console.error(name, e)
  }
  return result
}

let getCoinList = async () => {
  let promiseList =  []
  let list = []
  let map = {}
  data.forEach(item => {
    promiseList.push(getCoinDetail(item.code, item.name))
  })
  try {
    list = await Promise.all(promiseList) 
    list.forEach(item => map[item.code] = item)
  } catch(e) {
    console.error(e)
  }
  return {
    map,
    list
  }
}

let getAllCoin = async () => {
  let map = {}
  let list = []
  try {
    coinObj = await _request(listUrl) 
    data.forEach(item => {
      let price = parseFloat(coinObj[item.code.toLowerCase()+'2cny'])
      let coin = {
        code: item.code,
        name: item.name,
        price
      }
      list.push(coin)
      map[item.code] = coin
    })
  } catch(e) {
    console.error(e)
  }
  return {
    list,
    map
  }
}

module.exports = {
  getCoinDetail,
  getCoinList,
  getAllCoin
}