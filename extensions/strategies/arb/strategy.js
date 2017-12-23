const storage = require('./storage');

const selectors = [
  'poloniex.ETH-BTC',
  'kraken.XETH-XXBT'
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
        mySelector = s.selector;
        otherSelector = selectors[0] === mySelector ? selectors[1] : selectors[0];

        s.arb = {};
      }

      console.log('arb calculate');
    },

    onPeriod: function (s, cb) {
      console.log('arb onPeriod');
      
      const myRate = s.period.close;
      const savingPromise = storage.setLastRate(mySelector, myRate);

      s.signal = null;

      const signalPromise = storage.getLastRate(otherSelector)
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

          let high, low;
          if (myRate > otherRate) {
            high = myRate;
            low = otherRate;
          } else {
            high = otherRate;
            low = myRate;
          }
          const diff = high - low;;
          const relativeDiff = diff / high;

          s.arb = {
            myRate,
            otherRate,
            diff,
            relativeDiff
          }
        });
      
      Promise.all([savingPromise, signalPromise]).then(cb);
    },

    onReport: function (s) {
      const { myRate, otherRate, diff, relativeDiff } = s.arb;
      var rep = `\n${mySelector}\t${myRate}\t${otherRate}\t${diff}\t${relativeDiff * 100}`;
      return [rep];

      // var cols = [mySelector, myRate, otherRate, diff, relativeDiff];

      // return cols;
    }
  };
}
