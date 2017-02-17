import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {Params, ActivatedRoute} from "@angular/router";
import keyBy = require("lodash/keyBy");
import {PortfolioConfig} from "./portfolio.config";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {ApiService} from "../../../../../../ReusableServices/apiService";

@Component({
    selector: 'portfolio',
    template: `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>
            <div class="col-sm-12 col-md-6">
                <addEditPortfolio [pluginInput]="pluginInput" [addEditMode]="addEditMode"
                    [httpProxy]="apiService" [SystemId]="selectedSystemId"></addEditPortfolio>
            </div>`
})

export class MpdbPortfolio {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = PortfolioConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    key;
    selectedSystemId: number;
    formBuilder: any;
    addEditMode: string = 'add';
    httpProxy: any;
    pluginInput: any;

    constructor(private alert: AlertService, private vmMatrix: matrixService, private route: ActivatedRoute,
                private apiService: ApiService){
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.key = params['key'];
        });
        if (this.key) {
            switch (this.key) {
                case "FP":
                    this.selectedSystemId = 18;
                    break;
                case "PIA":
                    this.selectedSystemId = 19;
                    break;
                case "PIC":
                    this.selectedSystemId = 23;
                    break;
            }
            this.getTabsData();
        }
    }

    ngOnDestroy(): void {
        this.tabsListData = [];
    }

    getTabsData() {
        this.tabControlConfig.TabsList.forEach((x)=> {
            this.tabsListData.push(
                {
                    TabKey: x.TabKey,
                    TabName: x.TabName
                });
        });
    }

    showSpecificTab(tabData){
        this.vmMatrix.showSpecificTab(this,tabData);
    }

    displayTabInfo(tabInfo) {
        this.formBuilder = null;
        this.customMessages = [];
        this.updatedControlsList = [];

        switch (tabInfo.TabKey) {
            case 'AddPortfolio':
                this.addEditMode = 'add';
                break;
            case 'EditPortfolio':
                this.addEditMode = 'edit';
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "EditPortfolioFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(x=> x.name == "PortfolioSearchOptions").val = "PortfolioNumber";
                    this.loadPortfolios();
                }
                break;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];

        switch (outputData.TabKey) {
            case 'AddPortfolio':
                this.pluginInput = null;
                break;
            case 'EditPortfolio':
                this.pluginInput = outputData.updatedValue.value;
                break;
        }
    }

    loadPortfolios() {
        var SearchByNumberAndName = this.formBuilder.data.find(x=> x.name == "SearchByNumberAndName");

        this.apiService.getArrayFromQuery("ManagedProgramDB_Portfolio", JSON.stringify({
            Parameters: [{Name: "@Type", Value: -1},
                {Name: "@Id", Value: 0},
                {Name: "@PortfolioNumber", Value: ''},
                {Name: "@PortfolioName", Value: ''},
                {Name: "@PortfolioManager", Value: ''},
                {Name: "@ProjectedAUM", Value: 0},
                {Name: "@InceptionDate", Value: ''},
                {Name: "@Notes", Value: ''},
                {Name: "@SystemId", Value: this.selectedSystemId},
                {Name: "@LoginName", Value: this.apiService.CurrentUser.LoginName },
                {Name: "@LookupYear", Value: ''}]
        })).subscribe(
            res=> {
                SearchByNumberAndName.dataSource = res;
            },
            error => {
                this.alert.error("loadPortfolios.ManagedProgramDB_Portfolio. Error in retrieving drop down info" + error.status);
            },
            () => {}
        );
    }
}