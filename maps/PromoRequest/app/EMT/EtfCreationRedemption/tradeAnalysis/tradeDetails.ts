/**
 * Created by vikhnv2 on 6/8/2016.
 */
import {Component, Input, OnChanges} from 'angular2/core';
import {Trade} from '../models/trade';

@Component({
    selector: 'trade-details',
    templateUrl: 'app/EMT/EtfCreationRedemption/tradeAnalysis/tradeDetails.html',
    styleUrls: ['app/EMT/EtfCreationRedemption/EtfCreationRedemption.css']
})

export class TradeDetails implements OnChanges {
    @Input() trades:Trade[];
    @Input() viewMode:ViewMode;

    constructor() {

    }

    ngOnChanges(changes) {
        if (changes['viewMode']) {
            //
        }
    }
}

export enum ViewMode {ByFund, ByCountry}
