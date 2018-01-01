const c = require('./config');
const Poloniex = require('poloniex.js');

const client = new Poloniex('YOUR-API-KEY', 'YOUR-API-SECRET');

client.returnCompleteBalances((err, body) => {
  console.log('resp', body.ETH, body.BTC);
})
