import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {ScotiaControlConfig} from "./scotia.config";
import {toDateString} from "../../../../../../ReusableServices/genericfunctions";

@Component({
    selector: 'scotia',
    template:   `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class BmiScotia {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = ScotiaControlConfig;
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
            this.getScotiaIndexName(date);
        }

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.customMessages = [];
        var ReportDate = this.formBuilder.data.find(x=> x.name == "ReportDate");
        var IndexName = this.formBuilder.data.find(x=> x.name == "IndexName");
        var IndexDescription = this.formBuilder.data.find(x=> x.name == "IndexDescription");

        switch (outputData.updatedValue.controlName) {
            case "ReportDate":
                var date = outputData.updatedValue.value;
                this.getScotiaIndexName(date);
                break;
            case "IndexName":
                var indexNameSelected = outputData.updatedValue.value;
                if(indexNameSelected == ""){
                    this.vmMatrix.bindCustomDropDown(IndexDescription, null);
                    break;
                }
                this.apiService.getArrayFromQuery("GetScotiaIndexDescription", JSON.stringify({
                    Parameters: [{Name: "@pName", Value: indexNameSelected},
                        {Name: "@pReportDate", Value: ReportDate.val}]
                })).subscribe(
                    res=> {
                        this.vmMatrix.bindCustomDropDown(IndexDescription, res);
                    },
                    error => {
                        this.alert.error("GetScotiaIndexDescription. Error in retrieving drop down info" + error.status);
                    },
                    () => {
                    }
                );
                break;
            case "Preview":
                this.showReport();
                break;
        }
    }

    getScotiaIndexName(date){
        var IndexName = this.formBuilder.data.find(x=> x.name == "IndexName");
        var IndexDescription = this.formBuilder.data.find(x=> x.name == "IndexDescription");

        this.vmMatrix.bindCustomDropDown(IndexName, null);
        this.vmMatrix.bindCustomDropDown(IndexDescription, null);

        this.apiService.getArrayFromQuery("GetScotiaIndexName", JSON.stringify({
            Parameters: [{Name: "@pReportDate", Value: date}]
        })).subscribe(
            res=> {
                this.vmMatrix.bindCustomDropDown(IndexName, res);
            },
            error => {
                this.alert.error("GetScotiaIndexName. Error in retrieving drop down info" + error.status);
            },
            () => {
            }
        );
    }

    showReport() {
        var selectedDate = this.formBuilder.data.find(x=> x.name == "ReportDate").val;
        var indexDescription = this.formBuilder.data.find(x=> x.name == "IndexDescription").val;

        this.apiService.getArrayFromQuery("Benchmark_GetScotiaIndex", JSON.stringify({
            Parameters: [{Name: "@Date", Value: selectedDate},
                {Name: "@IndexName", Value: indexDescription}]
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
                this.alert.error("Benchmark_GetScotiaIndex : async error #" + error.status);
            },
            () => {
            }
        );
    }
}