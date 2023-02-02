export interface SimpleSheet {
    financialSheetId:string;
    currentAssets: number;
    nonCurrentAssets: number;
    totalAssets: number;
    currentLiabilities: number;
    nonCurrentLiabilities: number;
    totalLiabilities: number;
    equity: number;
    liabilitiesAndEquity: number;
    ordinaryCnt: number;
    navps: number;
    operatingRevenue: number;
    operatingCosts: number;
    grossProfit: number;
    grossProfitPercent: number;
    operatingExpenses: number;
    operatingIncome: number;
    nonOperatingIncome: number;
    eps: number;
    operatingActivities: number;
    investingActivities: number;
    financingActivities: number;
    deps: number;
}

export interface OptionMap {
    key:string;
    value:string;
}

export const CompareTargetList:OptionMap[] = [
    {
        key: 'eps',
        value: '基本每股盈餘'
    },
    {
        key:'currentAssets',
        value:'流動資產'
    },
    {
        key:'nonCurrentAssets',
        value:'非流動資產'
    },
    {
        key:'totalAssets',
        value:'總資產'
    },
    {
        key:'currentLiabilities',
        value:'流動負債'
    },
    {
        key:'nonCurrentLiabilities',
        value:'非流動負債'
    },
    {
        key:'totalLiabilities',
        value:'總負債'
    },
    {
        key:'equity',
        value:'權益'
    },
    {
        key:'liabilitiesAndEquity',
        value:'負債及權益總計'
    },
    {
        key:'navps',
        value:'每股淨額'
    },
    {
        key: 'operatingRevenue',
        value: '本業營收'
    },
    {
        key: 'operatingCosts',
        value: '本業成本'
    },
    {
        key: 'grossProfit',
        value: '毛利'
    },
    {
        key: 'grossProfitPercent',
        value: '毛利率'
    },
    {
        key: 'operatingExpenses',
        value: '營業費用'
    },
    {
        key: 'operatingIncome',
        value: '本業收入'
    },
    {
        key: 'nonOperatingIncome',
        value: '外業收入'
    },
    {
        key: 'deps',
        value: '稀釋每股盈餘'
    },
    {
        key: 'operatingActivities',
        value: '營業活動之淨現金流入（流出）'
    },
    {
        key: 'investingActivities',
        value: '投資活動之淨現金流入（流出）'
    },
    {
        key: 'financingActivities',
        value: '籌資活動之淨現金流入（流出）'
    },
]