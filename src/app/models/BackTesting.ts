export interface BackTesting {
  backTestingId:string;
  StrategyResult:StrategyResult;
  Plot:Plot;
  TradeDetailList:TradeDetailList;
  PlotCompare:PlotCompare;
}

export interface StrategyResult {
  stock_id:string;
  trader_fund:number;
  MeanProfitPer:number;
  FinalProfit:number;
  FinalProfitPer:number;
  MaxLoss:number;
  MaxLossPer:number;
  AnnualReturnPer:number;
  AnnualSharpRatio:number;
}

export interface Plot {
  labels:Date[];
  series:number[];
  signal:number[];
  trade_price:number[];
}

export interface TradeDetailList {
  TradeDetail:TradeDetail[];
}

export interface TradeDetail {
  labels:Date;
  EverytimeProfit:number;
  RealizedProfit:number;
  UnrealizedProfit:number;
  trader_fund:number;
  hold_cost:number;
  hold_volume:number;
}

export interface PlotCompare {
  labels:Date[];
  series:number[];
  market_series:number[];
}
