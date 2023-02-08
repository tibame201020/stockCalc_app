export interface StrategySummary {
  name: string;
  zh_name: string;
  description: string;
  formula: string;
  link: string;
}

export interface StrategyResult {
  strategyId: string;
  stock_id: string;
  start_date: string;
  end_date: string;
  StrategyName: string;
  MaxLossPer: string;
  MaxLossPer0050: string;
  FinalProfitPer: string;
  FinalProfitPer0050: string;
}

export interface BackTestingParam {
  strategyName: string;
  stockCode: string;
  userFunds: number;
  beginDate: string;
  endDate: string;
}
