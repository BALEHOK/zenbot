var s = {
  options: {
    conf: './config.arb.poloniex.js',
    paper: true,
    strategy: 'arb',
    sell_stop_pct: 0,
    buy_stop_pct: 0,
    profit_stop_enable_pct: 0,
    profit_stop_pct: 0,
    max_slippage_pct: 2,
    buy_pct: 100,
    sell_pct: 100,
    order_adjust_time: 3000,
    max_sell_loss_pct: 3.8,
    order_poll_time: 5000,
    markdown_buy_pct: 0,
    markup_sell_pct: 0,
    order_type: 'taker',
    poll_trades: 13000,
    currency_capital: 1000,
    asset_capital: 0,
    rsi_periods: 14,
    avg_slippage_pct: 0.045,
    debug: undefined,
    stats: true,
    mode: 'paper',
    mongo: {
      host: 'localhost',
      port: 27017,
      db: 'zenbot4',
      username: null,
      password: null,
      replicaSet: null
    },
    selector: 'poloniex.ETH-BTC',
    wait_for_settlement: 5000,
    post_only: true,
    days: 2,
    symmetrical: false,
    balance_snapshot_period: '15m',
    cancel_after: 'day',
    markup_pct: 1,
    period: '15s',
    min_periods: 52
  },
  selector: 'poloniex.ETH-BTC',
  exchange: {
    name: 'poloniex',
    historyScan: 'backward',
    makerFee: 0.15,
    takerFee: 0.25,
    getProducts: [Function: getProducts
    ],
    getTrades: [Function: getTrades
    ],
    getBalance: [Function: getBalance
    ],
    getQuote: [Function: getQuote
    ],
    cancelOrder: [Function: cancelOrder
    ],
    trade: [Function: trade
    ],
    buy: [Function: buy
    ],
    sell: [Function: sell
    ],
    getOrder: [Function: getOrder
    ],
    getCursor: [Function: getCursor
    ]
  },
  product_id: 'ETH-BTC',
  asset: 'ETH',
  currency: 'BTC',
  product: {
    asset: 'ETH',
    currency: 'BTC',
    min_total: '0.0001',
    max_size: null,
    increment: '0.00000001',
    label: 'Ethereum/Bitcoin'
  },
  balance: {
    id: 'poloniex.ETH-BTC-15m1682480',
    selector: 'poloniex.ETH-BTC',
    time: 1514232000000,
    currency: '0.00997829',
    asset: 0,
    price: 0.05234623,
    start_capital: 0.00999144,
    start_price: 0.04837087,
    consolidated: 0.00997829,
    profit: -0.0013161266043733401,
    buy_hold: 0.01081258650653172,
    buy_hold_profit: 0.08218500101403994,
    vs_buy_hold: -0.07715975322164899
  },
  ctx: {
    option: [Function: option
    ]
  },
  lookback: [],
  day_count: 1,
  my_trades: [],
  vol_since_last_blink: 0.000024050000000000002,
  strategy: {
    name: 'arb',
    description: 'Exploit the arbitrage oportunities',
    getOptions: [Function: getOptions
    ],
    calculate: [Function: calculate
    ],
    onPeriod: [Function: onPeriod
    ],
    onReport: [Function: onReport
    ]
  },
  port: 20066,
  url: '192.168.56.1: 20066/trades',
  last_day:
    Bucket{
     size: BucketSize{
      spec: '1d', value: 1, granularity: 'd'
    },
      value: 17525
    },
  period: {
    period_id: '15s100949079',
    size: '15s',
    time: 1514236185000,
    open: 0.052817,
    high: 0.052817,
    low: 0.05278794,
    close: 0.05278794,
    volume: 9.241804360000001,
    close_time: 1514236195000,
    id: '4ac6c59a',
    selector: 'poloniex.ETH-BTC',
    session_id: '527af772',
    rsi_avg_gain: 0.000027524269538760763,
    rsi_avg_loss: 0.000024223296923263068,
    rsi: 53
  },
  in_preroll: undefined,
  arb: {
    selector: 'poloniex.ETH-BTC',
    myRate: 0.05278794,
    otherRate: 0.05237,
    diff: 0.0004179399999999986,
    relativeDiff: 0.007917338695164058
  },
  last_period_id: '15s100949079',
  signal: 'sell',
  acted_on_stop: false,
  action: null,
  orig_capital: 0.00999144,
  orig_price: 0.04837087,
  start_capital: 1000,
  start_price: 0.05278794
}

var s2 = {
  options: {
    conf: './config.arb.poloniex.js',
    paper: true,
    strategy: 'arb',
    sell_stop_pct: 0,
    buy_stop_pct: 0,
    profit_stop_enable_pct: 0,
    profit_stop_pct: 0,
    max_slippage_pct: 2,
    buy_pct: 100,
    sell_pct: 100,
    order_adjust_time: 3000,
    max_sell_loss_pct: 3.8,
    order_poll_time: 5000,
    markdown_buy_pct: 0,
    markup_sell_pct: 0,
    order_type: 'taker',
    poll_trades: 13000,
    currency_capital: 1000,
    asset_capital: 0,
    rsi_periods: 14,
    avg_slippage_pct: 0.045,
    debug: undefined,
    stats: true,
    mode: 'paper',
    mongo: {
      host: 'localhost',
      port: 27017,
      db: 'zenbot4',
      username: null,
      password: null,
      replicaSet: null
    },
    selector: 'poloniex.ETH-BTC',
    wait_for_settlement: 5000,
    post_only: true,
    days: 2,
    symmetrical: false,
    balance_snapshot_period: '15m',
    cancel_after: 'day',
    markup_pct: 1,
    period: '15s',
    min_periods: 52
  },
  selector: 'poloniex.ETH-BTC',
  exchange: {
    name: 'poloniex',
    historyScan: 'backward',
    makerFee: 0.15,
    takerFee: 0.25,
    getProducts: [Function: getProducts
    ],
    getTrades: [Function: getTrades
    ],
    getBalance: [Function: getBalance
    ],
    getQuote: [Function: getQuote
    ],
    cancelOrder: [Function: cancelOrder
    ],
    trade: [Function: trade
    ],
    buy: [Function: buy
    ],
    sell: [Function: sell
    ],
    getOrder: [Function: getOrder
    ],
    getCursor: [Function: getCursor
    ]
  },
  product_id: 'ETH-BTC',
  asset: 'ETH',
  currency: 'BTC',
  product: {
    asset: 'ETH',
    currency: 'BTC',
    min_total: '0.0001',
    max_size: null,
    increment: '0.00000001',
    label: 'Ethereum/Bitcoin'
  },
  balance: {
    id: 'poloniex.ETH-BTC-15m1682480',
    selector: 'poloniex.ETH-BTC',
    time: 1514232000000,
    currency: '0.00997829',
    asset: 0,
    price: 0.05234623,
    start_capital: 0.00999144,
    start_price: 0.04837087,
    consolidated: 0.00997829,
    profit: -0.0013161266043733401,
    buy_hold: 0.01081258650653172,
    buy_hold_profit: 0.08218500101403994,
    vs_buy_hold: -0.07715975322164899
  },
  ctx: {
    option: [Function: option
    ]
  },
  lookback: [],
  day_count: 1,
  my_trades: [],
  vol_since_last_blink: 175.17446605000004,
  strategy: {
    name: 'arb',
    description: 'Exploit the arbitrage oportunities',
    getOptions: [Function: getOptions
    ],
    calculate: [Function: calculate
    ],
    onPeriod: [Function: onPeriod
    ],
    onReport: [Function: onReport
    ]
  },
  port: 20066,
  url: '192.168.56.1: 20066/trades',
  last_day:
    Bucket{
    size: BucketSize{
      spec: '1d', value: 1, granularity: 'd'
    },
      value: 17525
  },
  period: {
    period_id: '15s100949080',
    size: '15s',
    time: 1514236200000,
    open: 0.052802,
    high: 0.052802,
    low: 0.05250524,
    close: 0.05250524,
    volume: 175.17444200000003,
    close_time: 1514236213000
  },
  in_preroll: undefined,
  arb: {
    selector: 'poloniex.ETH-BTC',
    myRate: 0.05250524,
    otherRate: 0.05237,
    diff: 0.00013524000000000175,
    relativeDiff: 0.002575742916326099
  },
  last_period_id: '15s100949080',
  signal: null,
  acted_on_stop: false,
  action: null,
  orig_capital: 0.00999144,
  orig_price: 0.04837087,
  start_capital: 1000,
  start_price: 0.05278794,
  last_signal: 'sell',
  acted_on_trend: true
}