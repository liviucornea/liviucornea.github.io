import {Component, ViewChild} from '@angular/core';
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {
    MainControlConfig,
    ImplementChangePortfolioDisplayGridConfig, ImplementChangePortfolioDisplayGridConfig_2,
    ImplementChangePortfolioDisplayGridConfig_4, ImplementChangePortfolioDisplayGridConfig_5,
    ImplementChangePortfolioDisplayGridConfig_6, ImplementChangePortfolioDisplayGridConfig_7
} from "./reports.config";
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {ManagedProgramDbService} from "../managedProgramDbService";

@Component({
    selector: 'reports',
    template: `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class MpdbReports {
    tabsListData: Array<any> = [];
    tabControlConfig: any = MainControlConfig;
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    updatedControlsList: Array<any> = [];
    gridView: any;
    formBuilder: any;
    customMessages: Array<any> = [];

    constructor(private alert: AlertService, private apiService: ApiService, private vmMatrix: matrixService, private mpdbService: ManagedProgramDbService) {
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

    showSpecificTab(tabData)
    {
        this.vmMatrix.showSpecificTab(this,tabData,this.mpdbService);
    }

    displayTabInfo(tabInfo) {
        this.gridView = null;
        this.formBuilder = null;
        this.customMessages = [];

        switch (tabInfo.TabKey) {

            case 'ImplementChangePortfolio':
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "ImplementChangePortfolioFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(x=> x.name == "SystemType").val = this.formBuilder.data.find(x=> x.name == "SystemType").dataSource[1].Value;
                    this.formBuilder.data.find(x=> x.name == "ReportType").val = this.formBuilder.data.find(x=> x.name == "ReportType").dataSource[0].Value;
                    this.formBuilder.data.find(x=> x.name == "YearToReport").val = (new Date()).getFullYear().toString();
                    this.formBuilder.data.find(x=> x.name == "FilterColumn").val = "@sProjectManager";
                    this.formBuilder.data.find(x=> x.name == "SelectionRule").val = "0";
                    this.formBuilder.data.find(x=> x.name == "SelectionRuleCreate").val = "0";
                }
                this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "ImplementChangePortfolioDisplayGrid");
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                break;

            case 'ModelHoldings':
                this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "ModelHoldingsDisplayGrid");
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                this.showModelHoldings();
                break;

            case 'ModulesReport':
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "ModulesReportFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(x=> x.name == "EquityModule").val = -1;
                    this.formBuilder.data.find(x=> x.name == "FixedIncomeModule").val = -1;
                }
                this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "ModulesReportDisplayGrid");
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                break;

            case 'Portfolio':
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "PortfolioFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(x=> x.name == "SystemType").val = this.formBuilder.data.find(x=> x.name == "SystemType").dataSource[1].Value;
                    this.formBuilder.data.find(x=> x.name == "ReportType").val = this.formBuilder.data.find(x=> x.name == "ReportType").dataSource[0].Value;
                    this.formBuilder.data.find(x=> x.name == "YearToReport").val = (new Date()).getFullYear().toString();
                }
                this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "PortfolioDisplayGrid");
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                break;
        }

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];

        switch (outputData.TabKey) {
            case 'ImplementChangePortfolio':
                this.implementChangePortfolioAction(outputData);
                break;
            case 'ModulesReport':
                this.modulesReportAction(outputData);
                break;
            case 'Portfolio':
                this.portfolioAction(outputData);
                break;
        }
    }

    implementChangePortfolioAction(outputData) {
        switch (outputData.updatedValue.controlName) {
            case "ReportType":
                var reportType = this.formBuilder.data.find(x=> x.name == "ReportType").val;
                this.gridView.ShowDefault = false;

                switch (reportType) {
                    case "1":
                    case "3":
                        this.formBuilder.data.find(x=> x.name == "SystemType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "ReportType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "YearToReport").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "FilterColumn").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "FilterValue").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "SelectionRule").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "TraderName").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "SelectionRuleCreate").isVisible = false;
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "ImplementChangePortfolio").TabControls.find(c => c.ComponentName == "ImplementChangePortfolioDisplayGrid").gridSettings = ImplementChangePortfolioDisplayGridConfig;
                        break;
                    case "2":
                        this.formBuilder.data.find(x=> x.name == "SystemType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "ReportType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "YearToReport").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "FilterColumn").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "FilterValue").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "SelectionRule").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "TraderName").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "SelectionRuleCreate").isVisible = false;
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "ImplementChangePortfolio").TabControls.find(c => c.ComponentName == "ImplementChangePortfolioDisplayGrid").gridSettings = ImplementChangePortfolioDisplayGridConfig_2;
                        break;
                    case "4":
                        this.formBuilder.data.find(x=> x.name == "SystemType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "ReportType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "YearToReport").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "FilterColumn").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "FilterValue").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "SelectionRule").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "TraderName").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "SelectionRuleCreate").isVisible = false;
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "ImplementChangePortfolio").TabControls.find(c => c.ComponentName == "ImplementChangePortfolioDisplayGrid").gridSettings = ImplementChangePortfolioDisplayGridConfig_4;
                        break;
                    case "5":
                        this.formBuilder.data.find(x=> x.name == "SystemType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "ReportType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "YearToReport").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "FilterColumn").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "FilterValue").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "SelectionRule").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "TraderName").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "SelectionRuleCreate").isVisible = false;
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "ImplementChangePortfolio").TabControls.find(c => c.ComponentName == "ImplementChangePortfolioDisplayGrid").gridSettings = ImplementChangePortfolioDisplayGridConfig_5;
                        break;
                    case "6":
                        this.formBuilder.data.find(x=> x.name == "SystemType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "ReportType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "YearToReport").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "FilterColumn").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "FilterValue").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "SelectionRule").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "TraderName").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "SelectionRuleCreate").isVisible = true;
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "ImplementChangePortfolio").TabControls.find(c => c.ComponentName == "ImplementChangePortfolioDisplayGrid").gridSettings = ImplementChangePortfolioDisplayGridConfig_6;
                        break;
                    case "7":
                        this.formBuilder.data.find(x=> x.name == "SystemType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "ReportType").isVisible = true;
                        this.formBuilder.data.find(x=> x.name == "YearToReport").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "FilterColumn").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "FilterValue").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "SelectionRule").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "TraderName").isVisible = false;
                        this.formBuilder.data.find(x=> x.name == "SelectionRuleCreate").isVisible = false;
                        this.tabControlConfig.TabsList.find(t => t.TabKey == "ImplementChangePortfolio").TabControls.find(c => c.ComponentName == "ImplementChangePortfolioDisplayGrid").gridSettings = ImplementChangePortfolioDisplayGridConfig_7;
                        break;
                }
                break;

            case "RunReport":
                this.showImplementChangePortfolio();
                break;
        }
    }

    modulesReportAction(outputData) {

        if (outputData.updatedValue.controlName == "Search") {
            this.showModulesReport();
        }
    }

    portfolioAction(outputData) {

        if (outputData.updatedValue.controlName == "RunReport") {
            this.showPortfolio();
        }
    }

    showImplementChangePortfolio() {

        var filterValue = this.formBuilder.data.find(x=> x.name == "FilterValue").val.replace('%','[%]') + '%';

        var reportType = this.formBuilder.data.find(x=> x.name == "ReportType").val;
        var projectManager = this.formBuilder.data.find(x=> x.name == "FilterColumn").val == "@sProjectManager" ? filterValue : "";
        var action = this.formBuilder.data.find(x=> x.name == "FilterColumn").val == "@sAction" ? filterValue : "";
        var source = this.formBuilder.data.find(x=> x.name == "FilterColumn").val == "@sSource" ? filterValue : "";
        var notes = this.formBuilder.data.find(x=> x.name == "FilterColumn").val == "@sNotes" ? filterValue : "";
        var FMCObjectiveCode = this.formBuilder.data.find(x=> x.name == "FilterColumn").val == "@sFMCObjectiveCode" ? filterValue : "";
        var systemId = this.formBuilder.data.find(x=> x.name == "SystemType").val;
        var selectionId;

        switch (reportType) {
            case "5":
                selectionId = this.formBuilder.data.find(x=> x.name == "SelectionRule").val;
                break;
            case "6":
            case "7":
                selectionId = this.formBuilder.data.find(x=> x.name == "SelectionRuleCreate").val;
                break;
        }

        var lookupYear = this.formBuilder.data.find(x=> x.name == "YearToReport").val;
        var objectiveTransaction = this.formBuilder.data.find(x=> x.name == "FilterColumn").val == "@sObjectiveTransaction" ? filterValue : "";

        this.apiService.getArrayFromQuery("ManagedProgramDB_Report_PortfolioChangeRequest", JSON.stringify({
            Parameters: [
                {Name: "@type", Value: reportType},
                {Name: "@sProjectManager", Value: projectManager},
                {Name: "@sAction", Value: action},
                {Name: "@sSource", Value: source},
                {Name: "@sNotes", Value: notes},
                {Name: "@sFMCObjectiveCode", Value: FMCObjectiveCode},
                {Name: "@SystemId", Value: systemId},
                {Name: "@iSelectionId", Value: selectionId},
                {Name: "@LookupYear", Value: lookupYear},
                {Name: "@sObjectiveTransaction", Value: objectiveTransaction}]
        })).subscribe(
            res=> {
                this.gridView.ShowDefault = true;
                this.gridView.data = res;
                if( res.length > 0){
                    var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                    this.customMessages.push({text: messageBlock, alert: "alert-info"});
                }
                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            }
            , error => {
                this.alert.error("ManagedProgramDB_Report_PortfolioChangeRequest : async error #" + error.status);
            },
            () => {
            }
        );
    }

    showModelHoldings() {

        this.apiService.getArrayFromQuery("ManagedProgramDb_PACTMissingPureModel").subscribe(
            res=> {
                this.gridView.ShowDefault = true;
                this.gridView.data = res;
                if( res.length > 0){
                    var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                    this.customMessages.push({text: messageBlock, alert: "alert-info"});
                }
                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            }
            , error => {
                this.alert.error("ManagedProgramDb_PACTMissingPureModel : async error #" + error.status);
            },
            () => {
            }
        );
    }

    showModulesReport() {
        var equityModuleID = this.formBuilder.data.find(x=> x.name == "EquityModule").val;
        var fixedIncomeModuleID = this.formBuilder.data.find(x=> x.name == "FixedIncomeModule").val;

        this.apiService.getArrayFromQuery("ManagedProgramDb_PACTModels", JSON.stringify({
            Parameters: [
                {Name: "@EquityModuleId", Value: equityModuleID},
                {Name: "@FixedIncomeModuleId", Value: fixedIncomeModuleID}]
        })).subscribe(
            res=> {
                this.gridView.ShowDefault = true;
                this.gridView.data = res;
                if( res.length > 0){
                    var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                    this.customMessages.push({text: messageBlock, alert: "alert-info"});
                }
                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            }
            , error => {
                this.alert.error("ManagedProgramDb_PACTModels : async error #" + error.status);
            },
            () => {
            }
        );
    }

    showPortfolio() {
        var systemId = this.formBuilder.data.find(x=> x.name == "SystemType").val;
        var reportType = this.formBuilder.data.find(x=> x.name == "ReportType").val;
        var lookupYear = this.formBuilder.data.find(x=> x.name == "YearToReport").val;
        var projectManager = this.formBuilder.data.find(x=> x.name == "PortfolioManager").val;
        var notes = this.formBuilder.data.find(x=> x.name == "Notes").val;

        this.apiService.getArrayFromQuery("ManagedProgramDB_Report_Portfolio", JSON.stringify({
            Parameters: [
                {Name: "@type", Value: reportType},
                {Name: "@sProjectManager", Value: projectManager},
                {Name: "@sNotes", Value: notes},
                {Name: "@SystemId", Value: systemId},
                {Name: "@LookupYear", Value: lookupYear},
                {Name: "@LoginName", Value: this.apiService.CurrentUser.LoginName}]
        })).subscribe(
            res=> {
                this.gridView.ShowDefault = true;
                this.gridView.data = res;
                if( res.length > 0){
                    var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                    this.customMessages.push({text: messageBlock, alert: "alert-info"});
               }
                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            }
            , error => {
                this.alert.error("ManagedProgramDB_Report_Portfolio : async error #" + error.status);
            },
            () => {
            }
        );
    }
}