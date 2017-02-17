import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {LateTradesReportControlConfig} from "./lateTradesReport.config";
import {toDateString} from "../../../../../../ReusableServices/genericfunctions";

@Component({
    selector: 'lateTradesReport',
    template: `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class LateTradesReport {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = LateTradesReportControlConfig;
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

        this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "FormBuilder");
        if (this.formBuilder) {

            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);

            this.apiService.getArrayFromQuery("GetLastBusDay", JSON.stringify({ Parameters: []
            })).subscribe(
                res=> {
                    if(res.length == 1){
                        var date = new Date(res[0].LastBusDay);
                        this.formBuilder.data.find(x=> x.name == "ToDate").val = toDateString(date);
                        date.setDate(date.getDate()-30);
                        this.formBuilder.data.find(x=> x.name == "FromDate").val = toDateString(date);
                    }
                },
                error => {
                    this.alert.error("GetLastBusDay. Error in retrieving last business date" + error.status);
                },
                () => {
                }
            );
        }

        this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "DisplayGrid");
        if (this.gridView) {
            this.gridView.ShowDefault = false;
        }

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];

        if (outputData.updatedValue.controlName == "RunReport") {
            this.showReport();
        }
    }

    showReport() {
        var fromDate = this.formBuilder.data.find(x=> x.name == "FromDate").val;
        var toDate = this.formBuilder.data.find(x=> x.name == "ToDate").val;

        this.apiService.getArrayFromQuery("GetComplianceLateTrades", JSON.stringify({
            Parameters: [
                {Name: "@ToDate", Value: toDate},
                {Name: "@FromDate", Value: fromDate}
            ]
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
                this.alert.error("GetComplianceLateTrades : async error #" + error.status);
            },
            () => {
            }
        );
    }
}