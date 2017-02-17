import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {WorldGovernmentBondIndexControlConfig} from "./worldGovernmentBondIndex.config";
import {toDateString} from "../../../../../../ReusableServices/genericfunctions";

@Component({
    selector: 'worldGovernmentBondIndex',
    template:   `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class BmiWorldGovernmentBondIndex {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = WorldGovernmentBondIndexControlConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    gridView: any;
    formBuilder: any;

    constructor(private alert: AlertService, private apiService: ApiService, private vmMatrix: matrixService) {
    }

    ngOnInit() {
        this.getTabsData();
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
        this.customMessages = [];

        this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "DisplayGrid");
        if (this.gridView) {
            this.gridView.ShowDefault = false;
        }

        this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "FormBuilder");
        if (this.formBuilder) {

            var d = new Date();
            d.setDate(d.getDate()-2);
            var date = toDateString(d);

            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            this.formBuilder.data.find(x=> x.name == "ReportDate").val = date;
        }

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "Preview":
                this.showReport();
                break;
        }
    }

    showReport() {
        var selectedDate = this.formBuilder.data.find(x=> x.name == "ReportDate").val;

        this.apiService.getArrayFromQuery("Benchmark_GetWGBIndex", JSON.stringify({
            Parameters: [{Name: "@Date", Value: selectedDate}]
        })).subscribe(
            res=> {
                this.gridView.ShowDefault = true;
                this.gridView.data = res;
                if( res.length > 0){
                    var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                    this.customMessages.push({text: messageBlock, alert: "alert-info"});
                }
                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            },
            error => {
                this.alert.error("Benchmark_GetWGBIndex : async error #" + error.status);
            },
            () => {
            }
        );
    }
}