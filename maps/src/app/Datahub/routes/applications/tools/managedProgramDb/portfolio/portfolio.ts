import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {Params, ActivatedRoute} from "@angular/router";
import keyBy = require("lodash/keyBy");
import {EditPortfolio} from "../../../aplicationsComponents/editPortfolio/editPortfolio";

@Component({
    selector: 'portfolio',
    template: `<template ngFor let-itemOption [ngForOf]="modeSelections">
                <span style="margin-right: 20px"></span><input type="radio" [checked]="(itemOption.Value === selectedMode)"
                       [value]="itemOption.Value" name="modeSelector" [(ngModel)]="selectedMode">
                <span>{{itemOption.Description}}</span>
            </template>
            <br/>
        <editPortfolio [SystemId]="selectedSystemId"></editPortfolio>`
})

export class MpdbPortfolio {

    @ViewChild(EditPortfolio) editPortfolioControl: EditPortfolio;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    key;
    selectedMode = 'edit';
    modeSelections: Array<any> = [
            {Value: 'add', Description: 'Add Portfolio'},
            {Value: 'edit', Description: 'Edit Portfolio'}
        ];
    selectedSystemId: number;

    constructor(private alert: AlertService, private vmMatrix: matrixService,
                private route: ActivatedRoute)
    {}

    ngOnInit() {
        var self = this;
        self.route.params.forEach((params: Params) => {
            self.key = params['key'];
        });
        if (self.key) {
            switch (self.key) {
                case "FP":
                    self.selectedSystemId = 18;
                    break;
                case "PIA":
                    self.selectedSystemId = 19;
                    break;
                case "PIC":
                    self.selectedSystemId = 23;
                    break;
            }

            //this.getTabsData();
        }
    }

    ngOnDestroy(): void {

    }

    showSpecificTab(tabData){
        this.vmMatrix.showSpecificTab(this,tabData);
    }

    displayTabInfo(tabInfo) {
        this.customMessages = [];

        switch (tabInfo.TabKey) {
            case 'AddPortfolio':

                break;
            case 'EditPortfolio':

                break;
        }

    }
}