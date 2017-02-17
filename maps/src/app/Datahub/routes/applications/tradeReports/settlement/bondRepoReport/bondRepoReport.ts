import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {toDateString} from "../../../../../../ReusableServices/genericfunctions";
import {BondRepoReportControlConfig} from "./bondRepoReport.config";

@Component({
    selector: 'bondRepoReport',
    template: `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class BondRepoReport {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = BondRepoReportControlConfig;
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

            var date = new Date();
            this.formBuilder.data.find(x=> x.name == "EndDate").val = toDateString(date);
            date.setDate(date.getDate()-15);
            this.formBuilder.data.find(x=> x.name == "StartDate").val = toDateString(date);
            this.formBuilder.data.find(x=> x.name == "Account").val = "";
            this.formBuilder.data.find(x=> x.name == "ShowCancellations").val = false;
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
        var dFromP = this.formBuilder.data.find(x=> x.name == "StartDate").val;
        var dToP = this.formBuilder.data.find(x=> x.name == "EndDate").val;
        var showCancells = this.formBuilder.data.find(x=> x.name == "ShowCancellations").val;
        var accountID = this.formBuilder.data.find(x=> x.name == "Account").val;

        if (accountID == "") {accountID = 0;}

        this.apiService.getArrayFromQuery("BondRepo_Report", JSON.stringify({
            Parameters: [
                {Name: "@dFromP", Value: dFromP},
                {Name: "@dToP", Value: dToP},
                {Name: "@showCancells", Value: showCancells},
                {Name: "@accountID", Value: accountID}
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
                this.alert.error("BondRepo_Report : async error #" + error.status);
            },
            () => {
            }
        );
    }
}