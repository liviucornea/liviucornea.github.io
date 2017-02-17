import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {toDateString} from "../../../../../../ReusableServices/genericfunctions";
import {TradesControlConfig, CustomizeFieldsListConfig} from "./trades.config";
import {InterFormsService} from "../../../../../../ReusableServices/interFormsService";
import {SettlementService} from "../settlementService";
import {AssignableListItems} from "../../../../../../ReusableComponents/assignableListItems/assignableListItems";

@Component({
    selector: 'trades',
    templateUrl: 'trades.html'
})

export class Trades {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = TradesControlConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    summaryGridView: any;
    detailsGridView: any;
    formBuilder: any;
    assignableList: any = AssignableListItems;
    availableFieldsTitle: string = "";
    selectedFieldsTitle: string = "";
    showCustomizeFields: boolean = false;
    customizeFieldsTitle: string = "";
    customizeFieldsInstructions: string = "";
    customizeFieldsResult: string = "";
    showAddIssue: boolean = false;
    addIssueTitle: string = "";
    addIssueInstructions: string = "";
    addIssueResult: string = "";
    issueTypesList: Array<any> = [];
    selectedIssueType: number = 1;
    cycleNine: boolean = false;
    issueNotes: string = "";
    customizeFieldsListConfig: any = CustomizeFieldsListConfig;
    nCoreID: number;
    nIssueID: number;
    parentRow: any;
    reportType: string;

    constructor(private alert: AlertService, private apiService: ApiService, private intFormSvc:InterFormsService, private vmMatrix: matrixService, private settlementService: SettlementService) {
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
        this.vmMatrix.showSpecificTab(this,tabData,this.settlementService);
    }

    displayTabInfo(tabInfo) {
        this.customMessages = [];

        this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "FormBuilder");
        if (this.formBuilder) {
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);

            var date = new Date();
            this.formBuilder.data.find(x=> x.name == "System").val = "";
            this.formBuilder.data.find(x=> x.name == "CustodianAccount").val = "";
            this.formBuilder.data.find(x=> x.name == "Broker").val = "";
            this.formBuilder.data.find(x=> x.name == "ProductGroup").val = "";
            this.formBuilder.data.find(x=> x.name == "StartDate").val = toDateString(date);
            this.formBuilder.data.find(x=> x.name == "EndDate").val = toDateString(date);
        }

        this.summaryGridView = tabInfo.TabControls.find(x=> x.ComponentName == "TradesSummaryDisplayGrid");
        if (this.summaryGridView) {
            this.summaryGridView.ShowDefault = false;
        }

        this.detailsGridView = tabInfo.TabControls.find(x=> x.ComponentName == "TradesDetailsDisplayGrid");
        if (this.detailsGridView) {
            this.detailsGridView.ShowDefault = false;
        }

        this.assignableList.gridSettings = this.customizeFieldsListConfig;
        this.assignableList.gridSettings.CustomButtons.find(x=> x.value == 'Save').disabled = true;

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];

        switch(outputData.updatedValue.controlName) {
            case "DetailsReport":
                this.reportType = "details";
                this.customizeGrid();
                this.showReport();
                break;
            case "SummaryReport":
                this.reportType = "summary";
                this.showReport();
                break;
            case "CustomizeFields":
                this.customizeFields();
                break;
            case "CustomReport":
                this.reportType = "custom";
                this.customizeGrid();
                this.showReport();
                break;
            case "ResetParameters":
                this.resetParameters();
                break;
            case "AddIssue":
                this.parentRow = outputData.updatedValue.parentRow;
                this.nCoreID = outputData.updatedValue.parentRow.primaryKey.value;
                this.startAddIssue();
                break;
            case "CloseIssue":
                this.parentRow = outputData.updatedValue.parentRow;
                this.nIssueID = outputData.updatedValue.value.primaryKey.value;
                this.closeIssue();
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
                {Name: "@sPMLogin", Value: null},
                {Name: "@MaxLines", Value: MaxLines}
            ]
        })).subscribe(
            res=> {
                res.forEach(x=> {
                    x.TradeDate = x.TradeDate.substring(0, x.TradeDate.lastIndexOf(" "));
                    x.SettleDate = x.SettleDate.substring(0, x.SettleDate.lastIndexOf(" "));
                    }
                );
                switch(this.reportType) {
                    case "summary":
                        this.summaryGridView.ShowDefault = true;
                        this.detailsGridView.ShowDefault = false;
                        this.summaryGridView.data = res;
                        break;
                    case "details":
                    case "custom":
                        this.summaryGridView.ShowDefault = false;
                        this.detailsGridView.ShowDefault = true;
                        this.detailsGridView.data = res;
                        break;
                }
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
                    x.val = false;
                    break;
                default:
                    x.val = "";
                    break;
            }
        })
    }

    customizeFields() {
        this.showCustomizeFields = true;
        this.customizeFieldsTitle = "Customize Fields";
        this.customizeFieldsInstructions = "Please choose from the available fields to produce a custom report";
        this.availableFieldsTitle = "Available Fields";
        this.selectedFieldsTitle = "Selected Fields";

        let subscription = this.apiService.getArrayFromQuery("SettlementGetTableFields", JSON.stringify({
            Parameters: [
                {Name: "@sLoginName", Value: this.apiService.CurrentUser.LoginName}
            ]
        })).subscribe(
            res=> {
                this.assignableList.inputList = res.filter(x=>x.CustomField == "No");
                this.assignableList.assignedList = res.filter(x=>x.CustomField == "Yes");
                this.assignableList.gridSettings.CustomButtons.find(x=> x.value == 'Save').disabled = false;
                subscription.unsubscribe();
            },
            error => {
                this.customizeFieldsResult = "Error :" + error.status;
                subscription.unsubscribe();
            },
            () => {
                //   this.apiService.notifySpinner(false);
            }
        );
    }

    customizeGrid() {
        var tab = this.tabControlConfig.TabsList.find(t=> t.TabKey == "OneTab");
        var config = tab.TabControls.find(x=> x.ComponentName == "TradesDetailsDisplayGrid");
        var column;

        this.apiService.getArrayFromQuery("SettlementGetTableFields", JSON.stringify({
            Parameters: [
                {Name: "@sLoginName", Value: this.apiService.CurrentUser.LoginName}
            ]
        })).subscribe(
            res=> {
                res.forEach(x=> {
                    column = config.gridSettings.ColumnConfiguration.find(c=> c.dbColumnName == x.DBName);
                    if (column) {
                        column.isVisible = (this.reportType == "details" || x.CustomField == "Yes") ? true : false;
                    }
                })
            },
            error => {
                this.alert.error("SettlementGetTableFields : async error #" + error.status);
            },
            () => {
                //   this.apiService.notifySpinner(false);
            }
        );
    }

    closeCustomizeFields() {
        this.showCustomizeFields = false;
        this.customizeFieldsResult = "";
    }

    saveSelectedFields(outputdata) {
        var sCustomFields = "";

        outputdata.value.forEach((x)=> {
            sCustomFields += "," + x.Value;
        });

        let subscription = this.apiService.executeNonQuery("SettlementUpdateTableFields", JSON.stringify({
            Parameters: [
                {Name: "@sLoginName", Value: this.apiService.CurrentUser.LoginName},
                {Name: "@sCustomFields", Value: sCustomFields}
                ]
        })).subscribe(
            res=>{
                this.customizeFieldsResult = "Custom fields saved successfully";
                subscription.unsubscribe();
            }
            , error => {
                this.customizeFieldsResult = "Error :" + error.status;
                subscription.unsubscribe();
            },
            () => {
                //   this.apiService.notifySpinner(false);
            }
        );
    }

    startAddIssue() {
        this.showAddIssue = true;
        this.addIssueTitle = "Add Settlement Issue";

        this.selectedIssueType = 1;
        this.cycleNine = false;
        this.issueNotes = "";

        this.apiService.getArrayFromQuery("SettlementGetSecurityInfo", JSON.stringify({
            Parameters: [
                {Name: "@nCoreID", Value: this.nCoreID},
            ]
        })).subscribe(
            res=> {
                this.addIssueInstructions = res[0].Info. replace(/<b>/gi,"").replace(/<\/b>/gi,"");
            },
            error => {
                this.addIssueResult = "Error :" + error.status;
            },
            () => {
                //   this.apiService.notifySpinner(false);
            }
        );

        this.apiService.getArrayFromQuery("SettlementGetIssueTypes", JSON.stringify({
            Parameters: []
        })).subscribe(
            res=> {
                this.issueTypesList = res;
            },
            error => {
                this.addIssueResult = "Error :" + error.status;
            },
            () => {
                //   this.apiService.notifySpinner(false);
            }
        );
    }

    closeAddIssue() {
        this.showAddIssue = false;
        this.addIssueResult = "";
        this.parentRow.collapsed = true;
        this.showReport();
//        this.parentRow.collapsed = false;
    }

    addIssue() {

        let subscription = this.apiService.executeNonQuery("SettlementAddIssue", JSON.stringify({
            Parameters: [
                {Name: "@nCoreID", Value: this.nCoreID},
                {Name: "@nSettlementIssue", Value: this.selectedIssueType},
                {Name: "@nCycleNine", Value: this.cycleNine},
                {Name: "@sNote", Value: this.issueNotes},
                {Name: "@sUserID", Value: this.apiService.CurrentUser.LoginName}
            ]
        })).subscribe(
            res=>{
                this.addIssueResult = "New Issue saved successfully";
                subscription.unsubscribe();
            }
            , error => {
                this.addIssueResult = "Error :" + error.status;
                subscription.unsubscribe();
            },
            () => {
                //   this.apiService.notifySpinner(false);
            }
        );
    }

    closeIssue() {

        this.apiService.executeNonQuery("SettlementCloseIssue", JSON.stringify({
            Parameters: [
                {Name: "@nIssueID", Value: this.nIssueID},
                {Name: "@sLoginName", Value: this.apiService.CurrentUser.LoginName}
            ]
        })).subscribe(
            res=>{
                this.alert.addAlert("Issue closed successfully");
            }
            , error => {
                this.alert.error("SettlementCloseIssue : async error #" + error.status);
            },
            () => {
                this.parentRow.collapsed = true;
//                this.parentRow.collapsed = false;
            }
        );
    }
}