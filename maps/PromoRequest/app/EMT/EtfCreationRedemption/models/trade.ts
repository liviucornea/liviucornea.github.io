/**
 * Created by vikhnv2 on 6/10/2016.
 */
import {CommonFunctions} from '../helpers/commonFunctions';

export class Trade {
    id:number;
    orderNumber:number;
    fundNumber:number;
    fundTicker:string;
    cusip:string;
    country:string;
    isIdMarket:string;
    msciCountry:string;
    quantity:number;
    marketValueTrades:number;
    marketValueUnrealized:number;
    projectedPrice:number;
    mvcu:number;
    mvTradeToMVCU:number;
    isin:string;
    sharesTradedActual:number;
    sharesTradedDesigned:number;
    portfolio:string;
    sedol:number;
    side:string;
    units:number;
    wshSecurityID:number;

    constructor(source:any) {
        if (source) {
            this.cusip = source['CUSIP'];
            this.country = source['Country'];
            this.fundNumber = source['FundNumber'];
            this.fundTicker = source['FundTicker'];
            this.isin = source['ISIN'];
            this.msciCountry = source['MSCICountry'];
            this.mvcu = source['MVCU'];
            this.mvTradeToMVCU = source['MVTradeToMVCU'];
            this.marketValueTrades = source['MarketValueTrades'];
            this.marketValueUnrealized = source['MarketValueUnrealized'];
            this.sharesTradedActual = source['NumberOfSharesToTradeActual'];
            this.sharesTradedDesigned = source['NumberOfSharesToTradeDesigned'];
            this.orderNumber = source['OrderNumber'];
            this.portfolio = source['Portfolio'];
            this.projectedPrice = source['ProjectedPrice'];
            this.quantity = source['Quantity'];
            this.side = source['Side'];
            this.sedol = source['SEDOL'];
            this.units = source['UnitsNumber'];
            this.wshSecurityID = source['WshSecurityID'];
            this.isIdMarket = CommonFunctions.convertToYesNo(CommonFunctions.convertByteToBoolean(source['MarketIDFlag']));
        }
    }
}