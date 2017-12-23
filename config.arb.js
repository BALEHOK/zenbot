let c = module.exports = require('./config');

c.selector = 'poloniex.ETH-BTC';
c.strategy = 'arb';
c.paper = true;

c.asset_capital = 0;
c.avg_slippage_pct = 0.045;
c.currency_capital = 0.009;
c.days = 2;
c.buy_pct = 100;
c.buy_stop_pct = 0;
c.markup_pct = 1;
c.max_sell_loss_pct = 3.8;
c.max_slippage_pct = 2;
c.order_adjust_time = 5000;
// become a market taker (high fees) or a market maker (low fees)
c.order_type = 'taker';
c.period = '20s';
// ms to poll new trades at
c.poll_trades = 10000
c.profit_stop_enable_pct = 0;
c.profit_stop_pct = 0;
c.rsi_periods = 14;
c.sell_pct = 100;
c.sell_stop_pct = 0;
