const storage = require('./storage');

const signals = {
  buy: 'buy',
  sell: 'sell',
  hold: null
};

const selectors = [
  {
    key: 'poloniex.ETH-BTC',
    [signals.buy]: 0.0025,
    [signals.sell]: 0.006
  },
  {
    key: 'kraken.XETH-XXBT',
    [signals.buy]: 0.006,
    [signals.sell]: 0.0025
  }
];

function getTimestamp() {
  var d = new Date();
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

module.exports = function container(get, set, clear) {
  let mySelector, otherSelector;

  return {
    name: 'arb',
    description: 'Exploit the arbitrage oportunities',

    getOptions: function () {
      this.option('period', 'period length', String, '30s');
      this.option('min_periods', 'min. number of history periods', Number, 52);
    },

    calculate: function (s) {
      if (!s.arb) {
        if (s.selector === selectors[0].key){
          mySelector = selectors[0];
          otherSelector = selectors[1];
        } else {
          mySelector = selectors[1];
          otherSelector = selectors[0];
        }
        
        s.arb = {};
      }
    },

    onPeriod: function (s, cb) {
      const myRate = s.period.close;
      const savingPromise = storage.setLastRate(mySelector.key, myRate);

      s.signal = signals.hold;

      const signalPromise = storage.getLastRate(otherSelector.key)
        .then(otherRate => {
          if (!otherRate) {
            s.arb = {
              myRate,
              otherRate: '-',
              diff: '-',
              relativeDiff: '-'
            }
            return;
          }

          let high, low, signal;
          if (myRate > otherRate) {
            high = myRate;
            low = otherRate;
            signal = signals.sell;
          } else {
            high = otherRate;
            low = myRate;
            signal = signals.buy;
          }
          const diff = myRate - otherRate;
          const relativeDiff = diff / high;
          const absDiff = Math.abs(relativeDiff);

          if (absDiff > mySelector[signal]) {
            s.signal = signal;
          }

          s.arb = {
            myRate,
            otherRate,
            diff: absDiff,
            relativeDiff
          }
        });
      
      Promise.all([savingPromise, signalPromise]).then(cb);
    },

    onReport: function (s) {
      const { myRate, otherRate, diff, relativeDiff } = s.arb;
      var rep = `\n${mySelector.key}\t${myRate}\t${otherRate}\t${diff}\t${relativeDiff * 100}%`;
      var balance = `\nETH: ${s.balance.asset}\tBTC: ${s.balance.currency}`;
      return [rep, balance];

      // var cols = [mySelector, myRate, otherRate, diff, relativeDiff];

      // return cols;
    }
  };
}
