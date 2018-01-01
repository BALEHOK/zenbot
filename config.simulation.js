let c = module.exports = require('./config');

const simulationConfig = {
  "avg_slippage_pct": 0.045,
  "buy_stop_pct": 18,
  "markdown_buy_pct": 0,
  "markup_pct": 0.31222571708571234,
  "markup_sell_pct": 0,
  "max_sell_loss_pct": 25,
  "max_slippage_pct": 5,
  "min_periods": 20,
  "order_type": "taker",
  "period": "111m",
  "profit_stop_enable_pct": 16,
  "profit_stop_pct": 20,
  "rsi_periods": 14,
  "sar_af": 0.21436636522273272,
  "sar_max_af": 0.4791213370941391,
  "sell_stop_pct": 36,
  "show_options": true,
  "strategy": "sar"
};

Object.assign(c, simulationConfig);

c.selector = 'poloniex.ETH-BTC';
c.asset_capital = 0;
c.currency_capital = 0.009;
c.days = 20;

c.paper = true;
