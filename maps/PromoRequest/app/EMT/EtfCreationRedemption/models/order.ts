/**
 * Created by vikhnv2 on 6/3/2016.
 */
import {CommonFunctions} from '../helpers/commonFunctions';

export class Order {
    id:number;
    orderNumber:number;
    orderType:string;
    fundTicker:string;
    country:string;
    creationUnits:number;
    brokerId:number;
    brokerName:string;
    cashInKind:string;
    settlement:string;
    sedol:number;
    specialInstructions:string;
    tradeDate:Date;
    hasTradeFlag:boolean = true;

    constructor(source:any) {
        if (source) {
            this.orderNumber = source['OrderNumber'];
            this.orderType = source['OrderTypeDesc'];
            this.fundTicker = source['FundTicker'];
            this.country = source['CountrySrc'];
            this.creationUnits = source['CU'];
            this.brokerId = source['BrokerID'];
            this.brokerName = source['Brokerage'];
            this.cashInKind = source['CashInKind'];
            this.sedol = source['SEDOL'];
            this.specialInstructions = source['SpecialInstructionEq'];
            this.settlement = source['Settlement'];
            this.tradeDate = CommonFunctions.parseUTCDate(source['TradeDate']);
        }
    }
}