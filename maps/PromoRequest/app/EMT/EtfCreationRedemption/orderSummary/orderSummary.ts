/**
 * Created by vikhnv2 on 5/27/2016.
 */
import {Component, EventEmitter, Input, OnChanges, Output} from 'angular2/core';
import {Order} from '../models/order';
import {FileImport} from '../controls/fileImport';

@Component({
    selector: 'order-summary',
    templateUrl: 'app/EMT/EtfCreationRedemption/orderSummary/orderSummary.html',
    styleUrls: ['app/EMT/EtfCreationRedemption/etfCreationRedemption.css'],
    directives: [FileImport]
})

export class OrderSummary implements OnChanges {
    @Input() orders:Order[];
    @Output() onSelectionChange = new EventEmitter<number>();

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

        this.onSelectionChange.emit(this.selectedOrders);
    }
}


