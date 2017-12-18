module.exports = function container (get, set, clear) {
  return {
    name: 'arb',
    description: 'Expoit the arbitrage oportunities',

    getOptions: function () {
      this.option('period', 'period length', String, '1m');
      this.option('min_periods', 'min. number of history periods', Number, 52);
    },

    calculate: function (s) {
      if (!s.arb) {
        s.arb = {};
      }

      s.prevCalc = (new Date()).toString();
      s.period.arb = (new Date()).toString();

      console.log('arb calc');
    },

    onPeriod: function (s, cb) {
      console.log('arb onPeriod', s.period.arb);

      s.signal = null;
      cb();
    },

    onReport: function (s) {
      var cols = [s.prevCalc, s.period.arb];
      return cols;
    }
  };
}
