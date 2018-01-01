let c = module.exports = require('./config');

c.selector = 'poloniex.ETH-BTC';
c.strategy = 'trend_ema';
c.asset_capital = 0;
c.currency_capital = 0.009;
c.days = 2;
c.avg_slippage_pct = 0.045;
c.buy_pct = 100;
c.buy_stop_pct = 0;
c.markup_pct = 1;
c.max_sell_loss_pct = 3.8;
c.max_slippage_pct = 2;
c.order_adjust_time = 5000;
c.profit_stop_enable_pct = 0;
c.profit_stop_pct = 0;
c.rsi_periods = 14;
c.sell_pct = 100;
c.sell_stop_pct = 0;

c.min_periods = 36;
c.neutral_rate = 0.03;
c.oversold_rsi = 22;
c.oversold_rsi_periods = 30;
c.period = '1m';
c.trend_ema = 20;

c.paper = true;
