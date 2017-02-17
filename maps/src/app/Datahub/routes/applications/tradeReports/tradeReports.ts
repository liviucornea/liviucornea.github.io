import {Component} from "@angular/core";
import {NavigationService} from "../../../../ReusableServices/navigationService";
import {Location} from "@angular/common";

@Component({
    selector: 'tradeReports',
    template: ``
})

export class TradeReports {
    constructor(private navService:NavigationService, private location:Location) {
    }
}
