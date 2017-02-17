/**
 * Created by vikhnv2 on 6/2/2016.
 */
import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {CustomRouterLink} from '../../../ReusableDirectives/routerLink/routerLink';
import {TradeDetails, ViewMode} from './tradeDetails';
import {EtfApiService} from '../etfcrService';
import {CommonFunctions} from "../helpers/commonFunctions";
import {Trade} from "../models/trade";

@Component({
    selector: 'trade-analysis',
    templateUrl: 'app/EMT/EtfCreationRedemption/tradeAnalysis/tradeAnalysis.html',
    styleUrls: ['app/EMT/EtfCreationRedemption/EtfCreationRedemption.css'],
    directives: [CustomRouterLink, TradeDetails],
    providers: [EtfApiService]
})

/*@RouteConfig([
 {name: 'FilterByFund', path: '/recommendations/by-fund', component: TradeDetails, useAsDefault: true},
 {name: 'FilterByCountry', path: '/recommendations/by-country', component: TradeDetails}
 ])*/

export class TradeAnalysis {
    filter:any = ViewMode;
    private viewMode:ViewMode;
    private showRecommended:boolean = true;
    private tradeDate:string;
    private fundTicker:string;
    private trades:Trade[] = [];

    constructor(private _routeParams:RouteParams, private _apiService:EtfApiService) {
    }

    ngOnInit() {
        this.tradeDate = this._routeParams.get('date');
        this.changeView(this.filter.ByFund);
    }

    applyFilter() {
        this.onApplyFilter();
    }

    changeView(viewMode:ViewMode) {
        this.viewMode = viewMode;
        this.applyFilter();
    }

    toggleShowTrades() {
        this.showRecommended = !this.showRecommended;
    }

    private onApplyFilter():void {
        // clear the trades.
        this.trades.length = 0;

        this._apiService.getTrades(CommonFunctions.convertBooleanToByte(this.showRecommended), this.tradeDate, this.fundTicker).subscribe(
            res => {
                let trades:Trade[] = [];
                for (var index = 0; index < res.DataTable.length; index++) {
                    trades.push(new Trade(res.DataTable[index]));
                }
                this.trades = trades;
            },
            err => {
                console.log(err);
            }
        );
    }
}

