export interface StockImmediateInfo {
    code:string;
    openToday:string;
    closeYesterday: string;
    high:string;
    low: string;
    totalVolumes: string;
    deal:PriceVolume;
    askToSells:PriceVolume[];
    askToBuys:PriceVolume[];
    company:string;
}

export interface PriceVolume {
    price:string;
    volume:string;
}