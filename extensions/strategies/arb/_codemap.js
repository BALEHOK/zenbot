module.exports = {
  _ns: 'zenbot',

  'strategies.arb': require('./strategy'),
  'strategies.list[]': '#strategies.arb'
}
