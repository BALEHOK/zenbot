let c = module.exports = require('./config');

c.days_training = 3;
c.days_test = 2;
c.period = '5m';

c.strategy = 'forex_analytics';
c.modelfile = 'models/model1.json';
c.selector = 'poloniex.ETH-BTC';
c.asset_capital = 0;
c.currency_capital = 0.009;

c.paper = true;
