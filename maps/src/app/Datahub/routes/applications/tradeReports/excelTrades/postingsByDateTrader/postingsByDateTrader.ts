import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {
    PostingsByDateTraderControlConfig,
    DetailsDisplayGridConfig_B, SummaryDisplayGridConfig_B,
    DetailsDisplayGridConfig_E, SummaryDisplayGridConfig_E,
    DetailsDisplayGridConfig_F, SummaryDisplayGridConfig_F,
    DetailsDisplayGridConfig_FX, SummaryDisplayGridConfig_FX,
    DetailsDisplayGridConfig_MF, SummaryDisplayGridConfig_MF
} from "./postingsByDateTrader.config";

@Component({
    selector: 'postingsByDateTrader',
    template: `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class PostingsByDateTrader {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = PostingsByDateTraderControlConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    detailsGridView: any;
    summaryGridView: any;
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

            this.formBuilder.data.find(x=> x.name == "TradeType").val = "B";
            this.formBuilder.data.find(x=> x.name == "ReportDate").val = this.formBuilder.data.find(x=> x.name == "ReportDate").dataSource[0].Value;
        }

        this.detailsGridView = tabInfo.TabControls.find(x=> x.ComponentName == "DetailsDisplayGrid");
        if (this.detailsGridView) {
            this.detailsGridView.ShowDefault = false;
        }

        this.summaryGridView = tabInfo.TabControls.find(x=> x.ComponentName == "SummaryDisplayGrid");
        if (this.summaryGridView) {
            this.summaryGridView.ShowDefault = false;
        }

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];

        switch (outputData.updatedValue.controlName) {

            case "TradeType":
                var tradeType = this.formBuilder.data.find(x=> x.name == "TradeType").val;
                this.detailsGridView.ShowDefault = false;
                this.summaryGridView.ShowDefault = false;

                switch (tradeType) {
                    case "B":
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "OneTab").TabControls.find(c => c.ComponentName == "DetailsDisplayGrid").gridSettings = DetailsDisplayGridConfig_B;
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "OneTab").TabControls.find(c => c.ComponentName == "SummaryDisplayGrid").gridSettings = SummaryDisplayGridConfig_B;
                        break;
                    case "E":
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "OneTab").TabControls.find(c => c.ComponentName == "DetailsDisplayGrid").gridSettings = DetailsDisplayGridConfig_E;
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "OneTab").TabControls.find(c => c.ComponentName == "SummaryDisplayGrid").gridSettings = SummaryDisplayGridConfig_E;
                        break;
                    case "F":
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "OneTab").TabControls.find(c => c.ComponentName == "DetailsDisplayGrid").gridSettings = DetailsDisplayGridConfig_F;
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "OneTab").TabControls.find(c => c.ComponentName == "SummaryDisplayGrid").gridSettings = SummaryDisplayGridConfig_F;
                        break;
                    case "FX":
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "OneTab").TabControls.find(c => c.ComponentName == "DetailsDisplayGrid").gridSettings = DetailsDisplayGridConfig_FX;
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "OneTab").TabControls.find(c => c.ComponentName == "SummaryDisplayGrid").gridSettings = SummaryDisplayGridConfig_FX;
                        break;
                    case "MF":
                    case "CP":
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "OneTab").TabControls.find(c => c.ComponentName == "DetailsDisplayGrid").gridSettings = DetailsDisplayGridConfig_MF;
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "OneTab").TabControls.find(c => c.ComponentName == "SummaryDisplayGrid").gridSettings = SummaryDisplayGridConfig_MF;
                        break;
                }
                break;

            case "RunReport":
                this.showReport();
                break;
        }
    }

    showReport() {
        var sDate = this.formBuilder.data.find(x=> x.name == "ReportDate").val;
        var sType = this.formBuilder.data.find(x=> x.name == "TradeType").val;

        this.apiService.getArrayFromQuery("ExcelTradesReport", JSON.stringify({
            Parameters: [
                {Name: "@Date", Value: sDate},
                {Name: "@Type", Value: sType},
                {Name: "@User", Value: ""}
            ]
        })).subscribe(
            res=> {
                res.forEach(x=> {

                    x.Messages = (x.Messages == null ? "" : x.Messages) + (x.Messages != null && x.IOMessages != null ? " " : "") + (x.IOMessages == null ? "" : x.IOMessages);

                    if (x.IOExportDate != null && x.IOTranID != null && x.IOTranID != 0) {
                        x.Status = "[A]";
                        x.IOStatus = "ACCEPTED";
                        x.Messages = "";
                    }
                    else if (x.ExportDate != null && x.IOExportDate == null && x.IOStatus == null && x.IOMessages == null) {
                        x.Status = "[N]";
                        x.IOStatus = "NOT SENT";
                    }
                    else if (x.Messages.indexOf("XRef Error") >= 0 || x.IOMessages.indexOf("XRef Error") >= 0) {
                        x.Status = "[X]";
                        x.IOStatus = "XREF ERROR";
                    }
                    else {
                        x.Status = "[R]";
                        x.IOStatus = "REJECTED";
                    }

                    switch(x.TranMode) {
                        case 0:
                            x.TranMode = "New Posting";
                            break;
                        case 1:
                            x.TranMode = "Cancellation";
                            break;
                        case 2:
                            x.TranMode = "Update";
                            break;
                        case 3:
                            x.TranMode = "Update Canc.";
                            break;
                        default:
                            x.TranMode = "Unknown Mode";
                            break;
                    }

                    if (x.CUSIP == null || x.CUSIP == "") {
                        x.CUSIP = x.SEDOL;
                    }

                    if (sType == "FX") {
                        x.SecurityID = x.BuyCurrency;
                        if (x.BuyCurrency.indexOf("CCT") == 0) {
                            x.BuyCurrency = x.BuyCurrency.substring(3);
                        }
                    }
                });

                this.detailsGridView.ShowDefault = true;
                this.detailsGridView.data = res;

                var nAccepted = res.filter(x=> x.Status == "[A]").length;
                var nRejected = res.filter(x=> x.Status == "[N]" || x.Status == "[R]").length;
                var nXRefError = res.filter(x=> x.Status == "[X]").length;

                if( res.length > 0){
                    var messageBlock = ["Total Allocations", "Received: " + res.length, "Accepted: " + nAccepted, "Rejected: " + nRejected, "XRef Errors: " + nXRefError];
                    this.customMessages.push({text: messageBlock, alert: "alert-info"});
                }

                this.summaryGridView.ShowDefault = true;
                this.summaryGridView.data = res;

                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            },
            error => {
                this.alert.error("ExcelTradesReport : async error #" + error.status);
            },
            () => {
            }
        );
    }
}