/**
 * Created by vikhnv2 on 5/30/2016.
 */
import {Injectable} from 'angular2/core';
import 'rxjs/Rx';
import {HttpAbstract} from "../../ReusableServices/httpAbstract";

@Injectable()
export class EtfApiService {
    private baseURL:string = "http://localhost:34156/api/tdam/emt/";

    constructor(private httpBase:HttpAbstract) {
    }

    getBasketFunds(basketDate:string) {
        this.httpBase.setBaseAddress(this.baseURL);
        return this.httpBase.fetch('etfcreateredeemgetfundslistbybasketdate?p_dtmBasketDate=' + basketDate);
    }

    getTradeOrders(tradeDate:string) {
        this.httpBase.setBaseAddress(this.baseURL);
        return this.httpBase.fetch('etfcreateredeemgetorderslist?p_dtmEffectiveDate=' + tradeDate);
    }

    getTrades(showRecommended:number, tradeDate:string, fundTicker:string) {
        this.httpBase.setBaseAddress(this.baseURL);
        return this.httpBase.fetch('etfcreateredeemgettradedetailsbyeffectivedayandfund?&p_intIDMarketFlag=' + showRecommended + '&p_dtmEffectiveDate=' + tradeDate + '&p_vchFundTicker=' + (fundTicker ? fundTicker : ''));
    }

    /*private extractData(res: Response) {
     if (res.status < 200 || res.status >= 300) {
     throw new Error('Bad response status: ' + res.status);
     }
     let body = res.json();
     return body.data || {};
     }

     private handleError(error: any) {
     // In a real world app, we might send the error to remote logging infrastructure
     let errMsg = error.message || 'Server error';
     console.error(errMsg); // log to console instead
     return Observable.throw(errMsg);
     }*/
}
