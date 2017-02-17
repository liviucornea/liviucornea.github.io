import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {toDateString} from "../../../../../../ReusableServices/genericfunctions";
import {TradeReportByPMControlConfig} from "./tradeReportByPM.config";

@Component({
    selector: 'tradeReportByPM',
    template: `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class TradeReportByPM {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = TradeReportByPMControlConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    gridView: any;
    formBuilder: any;

    constructor(private alert: AlertService, private apiService: ApiService, private vmMatrix: matrixService) {
    }

    ngOnInit() {
        this.getTabsData();
        var tab = this.tabControlConfig.TabsList.find(t=> t.TabKey == "OneTab");
        if (tab) {
            var config = tab.TabControls.find(x=> x.ComponentName == "FormBuilder");
            if (config) {
                var column = config.gridSettings.ColumnConfiguration.find(c=> c.dbColumnName == "Account");
                if (column) {
                    var parameter =  column.dataSourceAddress.dbParameters.Parameters.find(p=> p.Name == "@sPMLogin");
                    if (parameter) {
                        parameter.Value = this.apiService.CurrentUser.LoginName;
                    }
                }
            }
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
        this.customMessages = [];

        this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "FormBuilder");
        if (this.formBuilder) {
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);

            var date = new Date();
            this.formBuilder.data.find(x=> x.name == "System").val = "";
            this.formBuilder.data.find(x=> x.name == "Account").val = "";
            this.formBuilder.data.find(x=> x.name == "CustodianAccount").val = "";
            this.formBuilder.data.find(x=> x.name == "Broker").val = "";
            this.formBuilder.data.find(x=> x.name == "ProductGroup").val = "";
            this.formBuilder.data.find(x=> x.name == "StartDate").val = toDateString(date);
            this.formBuilder.data.find(x=> x.name == "EndDate").val = toDateString(date);
            this.formBuilder.data.find(x=> x.name == "ExcludeCancellations").val = true;
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

        switch(outputData.updatedValue.controlName) {
            case "RunReport":
                this.showReport();
                break;
            case "ResetParameters":
                this.resetParameters();
                break;
        }
    }

    showReport() {
        var sCoreID = this.formBuilder.data.find(x=> x.name == "TradeHubID").val.replace("'", "''");
        var sSystem = this.formBuilder.data.find(x=> x.name == "System").val.replace("'", "''");
        var sAccount = this.formBuilder.data.find(x=> x.name == "Account").val.replace("'", "''");
        var sCustodianAccount = this.formBuilder.data.find(x=> x.name == "CustodianAccount").val.replace("'", "''");
        var sRIC = this.formBuilder.data.find(x=> x.name == "RIC").val.replace("'", "''");
        var sCUSIP = this.formBuilder.data.find(x=> x.name == "CUSIP").val.replace("'", "''");
        var sISIN = this.formBuilder.data.find(x=> x.name == "ISIN").val.replace("'", "''");
        var sSEDOL = this.formBuilder.data.find(x=> x.name == "SEDOL").val.replace("'", "''");
        var sBroker = this.formBuilder.data.find(x=> x.name == "Broker").val.replace("'", "''");
        var dShares = this.formBuilder.data.find(x=> x.name == "NumberOfShares").val.replace("'", "''");
        var nIOMemo = this.formBuilder.data.find(x=> x.name == "InvestOneMemo").val.replace("'", "''");
        var dtStartDate = this.formBuilder.data.find(x=> x.name == "StartDate").val.replace("'", "''");
        var dtEndDate = this.formBuilder.data.find(x=> x.name == "EndDate").val.replace("'", "''");
        var sProductGroup = this.formBuilder.data.find(x=> x.name == "ProductGroup").val.replace("'", "''");
        var bExcludeCancel = this.formBuilder.data.find(x=> x.name == "ExcludeCancellations").val;
        var sPMLogin = this.apiService.CurrentUser.LoginName;
        var MaxLines = 1000;

        if (sCoreID == "") {sCoreID = null}
        if (sSystem == "") {sSystem = null}
        if (sAccount == "") {sAccount = null}
        if (sCustodianAccount == "") {sCustodianAccount = null}
        if (sRIC == "") {sRIC = null}
        if (sCUSIP == "") {sCUSIP = null}
        if (sISIN == "") {sISIN = null}
        if (sSEDOL == "") {sSEDOL = null}
        if (sBroker == "") {sBroker = null}
        if (dShares == "") {dShares = null}
        if (nIOMemo == "") {nIOMemo = null}
        if (sProductGroup == "") {sProductGroup = null}

        this.apiService.getArrayFromQuery("SettlementTradesReportFull", JSON.stringify({
            Parameters: [
                {Name: "@sCoreIDs", Value: sCoreID},
                {Name: "@dShares", Value: dShares},
                {Name: "@nIOMemo", Value: nIOMemo},
                {Name: "@dtStartDate", Value: dtStartDate},
                {Name: "@dtEndDate", Value: dtEndDate},
                {Name: "@sAccount", Value: sAccount},
                {Name: "@sCustodianAccount", Value: sCustodianAccount},
                {Name: "@sRIC", Value: sRIC},
                {Name: "@sIOSecurityCode", Value: null},
                {Name: "@sCUSIP", Value: sCUSIP},
                {Name: "@sISIN", Value: sISIN},
                {Name: "@sSEDOL", Value: sSEDOL},
                {Name: "@sBroker", Value: sBroker},
                {Name: "@sSystem", Value: sSystem},
                {Name: "@sProductGroup", Value: sProductGroup},
                {Name: "@bExcludeCancel", Value: bExcludeCancel},
                {Name: "@sPMLogin", Value: sPMLogin},
                {Name: "@MaxLines", Value: MaxLines}
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
                this.alert.error("SettlementTradesReportFull : async error #" + error.status);
            },
            () => {
            }
        );
    }

    resetParameters() {
        this.formBuilder.data.forEach(x=> {
            switch (x.name) {
                case "StartDate":
                case "EndDate":
                    x.val = toDateString(new Date());
                    break;
                case "ExcludeCancellations":
                    x.val = true;
                    break;
                default:
                    x.val = "";
                    break;
            }
        })
    }
}