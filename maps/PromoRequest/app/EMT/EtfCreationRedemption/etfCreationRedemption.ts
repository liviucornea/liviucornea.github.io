/**
 * Created by vikhnv2 on 5/26/2016.
 */
import {Component} from 'angular2/core';
//import {RouteConfig, RouterOutlet} from 'angular2/router';
import {CommonFunctions} from './helpers/commonFunctions';
import {Order} from './models/order'
import {OrderSummary} from './orderSummary/orderSummary';
import  {CashInLieuInstructions} from './cilInstructions/cilInstructions';
import  {NsccBasket} from './nsccBasket/nsccBasket';
import {EtfApiService} from './etfcrService';
import {CustomRouterLink} from '../../ReusableDirectives/routerLink/routerLink';

@Component({
    selector: 'etf-creation-redemption',
    templateUrl: 'app/EMT/EtfCreationRedemption/etfCreationRedemption.html',
    styleUrls: ['app/EMT/EtfCreationRedemption/etfCreationRedemption.css'],
    directives: [CustomRouterLink, OrderSummary, CashInLieuInstructions, NsccBasket],
    providers: [EtfApiService]
})

/*@RouteConfig([
 { name: 'EtfCreationRedemption', path: '/etf-creation-redemption/...', component: EtfCreationRedemption, useAsDefault: true },
 { name: 'TradeAnalysis', path: '/trade-analysis', component: TradeAnalysis }
 ])*/

export class EtfCreationRedemption {
    private tradeDate:string = CommonFunctions.today();
    private basketDate:string;
    private disabledCss:string;
    private sumOrders:Order[] = [];
    private cilOrders:Order[] = [];

    constructor(private _apiService:EtfApiService) {
    }

    ngOnInit() {
        this.onSubmit();
    }

    // Submit button click event handler.
    private onSubmit():void {
        // clear the orders.
        this.sumOrders.length = 0;
        this.cilOrders.length = 0;

        this._apiService.getBasketFunds(this.tradeDate).subscribe(
            res => {
                this.basketDate = (res.DataTable && res.DataTable.length > 0) ? this.tradeDate : 'Not Available';
                this.allowTradeAnalysis(this.isValidBasket);
            },
            err => {
                console.log(err);
            }
        );

        this._apiService.getTradeOrders(this.tradeDate).subscribe(
            res => {
                let orders:Order[] = [];
                for (var index = 0; index < res.DataTable.length; index++) {
                    orders.push(new Order(res.DataTable[index]));
                }
                this.allowTradeAnalysis(this.disabledCss != 'disabled' && (orders && orders.length > 0));
                this.sumOrders = CommonFunctions.cloneObjectArray(orders, ['tradeDate']);
                this.cilOrders = CommonFunctions.cloneObjectArray(orders, ['tradeDate']);
            },
            err => {
                console.log(err);
            }
        );
    }

    // OrderSummary onSelectionChange event handler.
    onOrderSummarySelectionChange(selectedCount:number) {
        this.allowTradeAnalysis(this.isValidBasket && selectedCount > 0);
    }

    // Enables or disables the Trade Analysis button.
    private allowTradeAnalysis(proceed:boolean):void {
        this.disabledCss = !proceed ? 'disabled' : '';
    }

    // Returns true id the basket date is valid.
    private get isValidBasket():boolean {
        return (Date.parse(this.basketDate) > 0);
    }
}
