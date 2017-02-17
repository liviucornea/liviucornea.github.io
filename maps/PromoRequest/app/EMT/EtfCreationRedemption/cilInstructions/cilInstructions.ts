/**
 * Created by vikhnv2 on 5/27/2016.
 */
import {Component, Input, OnChanges} from 'angular2/core';
import {Order} from '../models/order';
import {FileImport} from '../controls/fileImport';

@Component({
    selector: 'cil-instructions',
    templateUrl: 'app/EMT/EtfCreationRedemption/cilInstructions/cilInstructions.html',
    styleUrls: ['app/EMT/EtfCreationRedemption/etfCreationRedemption.css'],
    directives: [FileImport]
})

export class CashInLieuInstructions implements OnChanges {
    @Input() orders:Order[];

    private status:string = "Not Loaded";
    private statusColour:string = "danger";
    private ordersAny:boolean = false;
    private selectedOrders:number;

    constructor() {
    }

    ngOnChanges(changes) {
        if (changes['orders']) {
            this.ordersAny = (this.orders && this.orders.length > 0);
            this.status = this.ordersAny ? "Loaded" : "Not Loaded";
            this.statusColour = this.ordersAny ? "success" : "danger";
            this.selectedOrders = this.orders.length;
        }
    }

    selectionChange(e) {
        if (e.target.checked) {
            this.selectedOrders++;
        }
        else {
            this.selectedOrders--;
        }

        //console.log(this.selectedOrders);
    }
}
