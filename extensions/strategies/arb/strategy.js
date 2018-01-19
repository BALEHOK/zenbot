const storage = require('./storage');

const signals = {
  buy: 'buy',
  sell: 'sell',
  hold: null
};

const selectors = {
  poloniex: 'poloniex.ETH-BTC',
  kraken: 'kraken.XETH-XXBT',
  quadriga: 'quadriga.ETH-BTC'
}

const excahnges = [
  [
    {
      key: selectors.poloniex,
      sellTreshold: 0.01,
    },
    {
      key: selectors.kraken,
      sellTreshold: 0.005,
    }
  ], [
    {
      key: selectors.poloniex,
      sellTreshold: 0.02,
    },
    {
      key: selectors.quadriga,
      sellTreshold: 0.005,
    }
  ]
];

function getTimestamp() {
  var d = new Date();
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

module.exports = function container(get, set, clear) {
  let myExchange, otherExchange;
  let arbTrades;

  arbTrades = get('db.createCollection')('arb_rates');

  return {
    name: 'arb',
    description: 'Exploit the arbitrage oportunities',

    getOptions: function () {
      this.option('period', 'period length', String, '30s');
      this.option('min_periods', 'min. number of history periods', Number, 52);
      this.option('otherSelector', 'specify the other selector for arbitrage', String, 'none');

      if (!s.options || !s.options.otherSelector) {
        console.error('specify the other selector for arbitrage');
        process.exit(1);
      }

      mySelector = s.options.selector.normalized;
      otherSelector = s.options.otherSelector;

      excahnges.forEach(pair => {
        const ex1 = pair[0];
        const ex2 = pair[1];
        if (ex1.key === mySelector && ex2.key === otherSelector) {
          myExchange = ex1;
          otherExchange = ex2;
        } else if (ex1.key === otherSelector && ex2.key === mySelector) {
          myExchange = ex2;
          otherExchange = ex1;
        }
      })
    },

    calculate: function (s) {
    },

    onPeriod: function (s, cb) {
      const myRate = s.period.close;
      const savingPromise = storage.setLastRate(myExchange.key, myRate);

      s.signal = signals.hold;
      let testSignal = signals.hold;

      const signalPromise = storage.getLastRate(otherExchange.key)
        .then(otherRate => {
          // console.log('saving', myExchange.key, myRate)
          // console.log('receiving', otherExchange.key, otherRate)

          if (!otherRate) {
            s.arb = {
              selector: myExchange.key,
              myRate,
              otherRate: '-',
              diff: '-',
              relativeDiff: '-',
              signal: testSignal
            }
            return;
          }

          const diff = myRate - otherRate;
          const relativeDiff = diff / high;
          const absDiff = Math.abs(relativeDiff);

          let signal, operatinThreshold;
          if (myRate > otherRate) {
            signal = signals.sell;
            operatinThreshold = myExchange.sellTreshold;
          } else {
            signal = signals.buy;
            operatinThreshold = otherExchange.sellTreshold;
          }

          if (absDiff > operatinThreshold) {
            s.signal = signal;
            testSignal = signal;
          }

          s.arb = {
            id: `${myExchange.key}_${getTimestamp()}`,
            selector: myExchange.key,
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
      var rep = `\n${selector}\t${myRate}\t${otherRate}\t${typeof relativeDiff === 'number' ? (((relativeDiff * 1000000) | 0) / 10000) : relativeDiff}%\t${signal}`;
      return [rep];
    }
  };
}
