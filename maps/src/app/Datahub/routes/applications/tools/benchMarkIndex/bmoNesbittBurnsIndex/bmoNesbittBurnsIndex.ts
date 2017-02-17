import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {BmoNesbittBurnsIndexControlConfig} from "./bmoNesbittBurnsIndex.config";
import {toDateString} from "../../../../../../ReusableServices/genericfunctions";

@Component({
    selector: 'bmoNesbittBurnsIndex',
    template:   `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class BmiBMONesbittBurnsIndex {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = BmoNesbittBurnsIndexControlConfig;
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

            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            this.formBuilder.data.find(x=> x.name == "ReportDate").val = toDateString(d);
        }

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.customMessages = [];
        if (outputData.updatedValue.controlName == "Preview") {
            this.showReport();
        }
    }

    showReport() {
        var selectedDate = this.formBuilder.data.find(x=> x.name == "ReportDate").val;
        var spSelected = this.formBuilder.data.find(x=> x.name == "BMONesbittBurnsIndex").val;

        this.apiService.getArrayFromQuery("GetMaxDateFromTblIndexNesbittBurns", JSON.stringify({Parameters: [
            {Name: "@pMonth", Value: new Date(selectedDate).getMonth() + 1},
            {Name: "@pYear", Value: new Date(selectedDate).getFullYear()}
        ]})).subscribe(
            res=>{
                if(res.length == 1){
                    this.apiService.getArrayFromQuery("GetNesbittBurnsIndex", JSON.stringify({
                        Parameters: [
                            {Name: "@pSpName", Value: spSelected},
                            {Name: "@pDate", Value: res[0].maxdate}]
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
                            this.alert.error("GetNesbittBurnsIndex : async error #" + error.status);
                        },
                        () => {
                        }
                    );
                }
            },
            error => {
                this.alert.error("GetMaxDateFromTblIndexNesbittBurns : async error #" + error.status);
            },
            () => { });
    }
}