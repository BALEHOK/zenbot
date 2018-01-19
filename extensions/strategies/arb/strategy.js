const storage = require('./storage');

const signals = {
  buy: 'buy',
  sell: 'sell',
  hold: null
};

const poloSell = 0.02;
const krakenSell = 0.005;
const selectors = [
  {
    key: 'poloniex.ETH-BTC',
    [signals.buy]: krakenSell,
    [signals.sell]: poloSell
  },
  {
    key: 'kraken.XETH-XXBT',
    [signals.buy]: poloSell,
    [signals.sell]: krakenSell
  }
];


// const poloSell = 0.02;
// const quadrigaSell = 0.005;
// const selectors = [
//   {
//     key: 'poloniex.ETH-BTC',
//     [signals.buy]: quadrigaSell,
//     [signals.sell]: poloSell
//   },
//   {
//     key: 'quadriga.ETH-BTC',
//     [signals.buy]: poloSell,
//     [signals.sell]: quadrigaSell
//   }
// ];

function getTimestamp() {
  var d = new Date();
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

module.exports = function container(get, set, clear) {
  let mySelector, otherSelector;
  let arbTrades;

  arbTrades = get('db.createCollection')('arb_rates');

  return {
    name: 'arb',
    description: 'Exploit the arbitrage oportunities',

    getOptions: function () {
      this.option('period', 'period length', String, '30s');
      this.option('min_periods', 'min. number of history periods', Number, 52);
    },

    calculate: function (s) {
      if (!s.arb) {
        if (s.options.selector.normalized === selectors[0].key) {
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
      let testSignal = signals.hold;

      const signalPromise = storage.getLastRate(otherSelector.key)
        .then(otherRate => {
          console.log('saving', mySelector.key, myRate)
          console.log('receiving', otherSelector.key, otherRate)

          if (!otherRate) {
            s.arb = {
              selector: mySelector.key,
              myRate,
              otherRate: '-',
              diff: '-',
              relativeDiff: '-',
              signal: testSignal
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
            testSignal = signal;
          }

          s.arb = {
            id: `${mySelector.key}_${getTimestamp()}`,
            selector: mySelector.key,
            myRate,
            otherRate,
            diff,
            relativeDiff,
            signal: testSignal
          };

          arbTrades.save(s.arb, (err) => { if (err) console.log('failed to save arbitrage trade', err) });
        })
        .then(cb);
    },

    onReport: function (s) {
      const { selector, myRate, otherRate, diff, relativeDiff, signal } = s.arb;
      var rep = `\n${selector}\t${myRate}\t${otherRate}\t${typeof relativeDiff === 'number' ? (((relativeDiff * 1000000) | 0)/10000) : relativeDiff}%\t${signal}`;
      return [rep];
    }
  };
}
