import {Component} from '@angular/core';
import {NavigationService} from "../../../../../ReusableServices/navigationService";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {Location} from "@angular/common";

@Component({
    selector: 'excelTrades',
    template: `<tileView [menuItemsList]="childItems"></tileView>`
})

export class ExcelTrades {
    alert: AlertService;
    private childItems: Array<any> = [];

    constructor(private navigationService: NavigationService, private alt:AlertService, private location:Location) {
        this.alert = alt;
    }

    ngOnInit()
    {
        this.childItems = this.navigationService.getChildMenusForTileView('ExcelTrades');
    }
}