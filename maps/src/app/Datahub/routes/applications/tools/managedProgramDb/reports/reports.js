"use strict";
var core_1 = require('@angular/core');
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var reports_config_1 = require("./reports.config");
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var managedProgramDbService_1 = require("../managedProgramDbService");
var MpdbReports = (function () {
    function MpdbReports(alert, apiService, vmMatrix, mpdbService) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.mpdbService = mpdbService;
        this.tabsListData = [];
        this.tabControlConfig = reports_config_1.MainControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    MpdbReports.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    MpdbReports.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    MpdbReports.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    MpdbReports.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData, this.mpdbService);
    };
    MpdbReports.prototype.displayTabInfo = function (tabInfo) {
        this.gridView = null;
        this.formBuilder = null;
        this.customMessages = [];
        switch (tabInfo.TabKey) {
            case 'ImplementChangePortfolio':
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "ImplementChangePortfolioFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).val = this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).dataSource[1].Value;
                    this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).val = this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).dataSource[0].Value;
                    this.formBuilder.data.find(function (x) { return x.name == "YearToReport"; }).val = (new Date()).getFullYear().toString();
                    this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).val = "@sProjectManager";
                    this.formBuilder.data.find(function (x) { return x.name == "SelectionRule"; }).val = "0";
                    this.formBuilder.data.find(function (x) { return x.name == "SelectionRuleCreate"; }).val = "0";
                }
                this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "ImplementChangePortfolioDisplayGrid"; });
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                break;
            case 'ModelHoldings':
                this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "ModelHoldingsDisplayGrid"; });
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                this.showModelHoldings();
                break;
            case 'ModulesReport':
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "ModulesReportFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(function (x) { return x.name == "EquityModule"; }).val = -1;
                    this.formBuilder.data.find(function (x) { return x.name == "FixedIncomeModule"; }).val = -1;
                }
                this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "ModulesReportDisplayGrid"; });
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                break;
            case 'Portfolio':
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "PortfolioFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).val = this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).dataSource[1].Value;
                    this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).val = this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).dataSource[0].Value;
                    this.formBuilder.data.find(function (x) { return x.name == "YearToReport"; }).val = (new Date()).getFullYear().toString();
                }
                this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "PortfolioDisplayGrid"; });
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                break;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    MpdbReports.prototype.doActionFromChildTab = function (outputData) {
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
    };
    MpdbReports.prototype.implementChangePortfolioAction = function (outputData) {
        switch (outputData.updatedValue.controlName) {
            case "ReportType":
                var reportType = this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).val;
                this.gridView.ShowDefault = false;
                switch (reportType) {
                    case "1":
                    case "3":
                        this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "YearToReport"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterValue"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRule"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "TraderName"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRuleCreate"; }).isVisible = false;
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "ImplementChangePortfolio"; }).TabControls.find(function (c) { return c.ComponentName == "ImplementChangePortfolioDisplayGrid"; }).gridSettings = reports_config_1.ImplementChangePortfolioDisplayGridConfig;
                        break;
                    case "2":
                        this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "YearToReport"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterValue"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRule"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "TraderName"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRuleCreate"; }).isVisible = false;
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "ImplementChangePortfolio"; }).TabControls.find(function (c) { return c.ComponentName == "ImplementChangePortfolioDisplayGrid"; }).gridSettings = reports_config_1.ImplementChangePortfolioDisplayGridConfig_2;
                        break;
                    case "4":
                        this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "YearToReport"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterValue"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRule"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "TraderName"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRuleCreate"; }).isVisible = false;
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "ImplementChangePortfolio"; }).TabControls.find(function (c) { return c.ComponentName == "ImplementChangePortfolioDisplayGrid"; }).gridSettings = reports_config_1.ImplementChangePortfolioDisplayGridConfig_4;
                        break;
                    case "5":
                        this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "YearToReport"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterValue"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRule"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "TraderName"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRuleCreate"; }).isVisible = false;
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "ImplementChangePortfolio"; }).TabControls.find(function (c) { return c.ComponentName == "ImplementChangePortfolioDisplayGrid"; }).gridSettings = reports_config_1.ImplementChangePortfolioDisplayGridConfig_5;
                        break;
                    case "6":
                        this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "YearToReport"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterValue"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRule"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "TraderName"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRuleCreate"; }).isVisible = true;
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "ImplementChangePortfolio"; }).TabControls.find(function (c) { return c.ComponentName == "ImplementChangePortfolioDisplayGrid"; }).gridSettings = reports_config_1.ImplementChangePortfolioDisplayGridConfig_6;
                        break;
                    case "7":
                        this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).isVisible = true;
                        this.formBuilder.data.find(function (x) { return x.name == "YearToReport"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "FilterValue"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRule"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "TraderName"; }).isVisible = false;
                        this.formBuilder.data.find(function (x) { return x.name == "SelectionRuleCreate"; }).isVisible = false;
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "ImplementChangePortfolio"; }).TabControls.find(function (c) { return c.ComponentName == "ImplementChangePortfolioDisplayGrid"; }).gridSettings = reports_config_1.ImplementChangePortfolioDisplayGridConfig_7;
                        break;
                }
                break;
            case "RunReport":
                this.showImplementChangePortfolio();
                break;
        }
    };
    MpdbReports.prototype.modulesReportAction = function (outputData) {
        if (outputData.updatedValue.controlName == "Search") {
            this.showModulesReport();
        }
    };
    MpdbReports.prototype.portfolioAction = function (outputData) {
        if (outputData.updatedValue.controlName == "RunReport") {
            this.showPortfolio();
        }
    };
    MpdbReports.prototype.showImplementChangePortfolio = function () {
        var _this = this;
        var filterValue = this.formBuilder.data.find(function (x) { return x.name == "FilterValue"; }).val.replace('%', '[%]') + '%';
        var reportType = this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).val;
        var projectManager = this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).val == "@sProjectManager" ? filterValue : "";
        var action = this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).val == "@sAction" ? filterValue : "";
        var source = this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).val == "@sSource" ? filterValue : "";
        var notes = this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).val == "@sNotes" ? filterValue : "";
        var FMCObjectiveCode = this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).val == "@sFMCObjectiveCode" ? filterValue : "";
        var systemId = this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).val;
        var selectionId;
        switch (reportType) {
            case "5":
                selectionId = this.formBuilder.data.find(function (x) { return x.name == "SelectionRule"; }).val;
                break;
            case "6":
            case "7":
                selectionId = this.formBuilder.data.find(function (x) { return x.name == "SelectionRuleCreate"; }).val;
                break;
        }
        var lookupYear = this.formBuilder.data.find(function (x) { return x.name == "YearToReport"; }).val;
        var objectiveTransaction = this.formBuilder.data.find(function (x) { return x.name == "FilterColumn"; }).val == "@sObjectiveTransaction" ? filterValue : "";
        this.apiService.getArrayFromQuery("ManagedProgramDB_Report_PortfolioChangeRequest", JSON.stringify({
            Parameters: [
                { Name: "@type", Value: reportType },
                { Name: "@sProjectManager", Value: projectManager },
                { Name: "@sAction", Value: action },
                { Name: "@sSource", Value: source },
                { Name: "@sNotes", Value: notes },
                { Name: "@sFMCObjectiveCode", Value: FMCObjectiveCode },
                { Name: "@SystemId", Value: systemId },
                { Name: "@iSelectionId", Value: selectionId },
                { Name: "@LookupYear", Value: lookupYear },
                { Name: "@sObjectiveTransaction", Value: objectiveTransaction }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("ManagedProgramDB_Report_PortfolioChangeRequest : async error #" + error.status);
        }, function () {
        });
    };
    MpdbReports.prototype.showModelHoldings = function () {
        var _this = this;
        this.apiService.getArrayFromQuery("ManagedProgramDb_PACTMissingPureModel").subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("ManagedProgramDb_PACTMissingPureModel : async error #" + error.status);
        }, function () {
        });
    };
    MpdbReports.prototype.showModulesReport = function () {
        var _this = this;
        var equityModuleID = this.formBuilder.data.find(function (x) { return x.name == "EquityModule"; }).val;
        var fixedIncomeModuleID = this.formBuilder.data.find(function (x) { return x.name == "FixedIncomeModule"; }).val;
        this.apiService.getArrayFromQuery("ManagedProgramDb_PACTModels", JSON.stringify({
            Parameters: [
                { Name: "@EquityModuleId", Value: equityModuleID },
                { Name: "@FixedIncomeModuleId", Value: fixedIncomeModuleID }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("ManagedProgramDb_PACTModels : async error #" + error.status);
        }, function () {
        });
    };
    MpdbReports.prototype.showPortfolio = function () {
        var _this = this;
        var systemId = this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).val;
        var reportType = this.formBuilder.data.find(function (x) { return x.name == "ReportType"; }).val;
        var lookupYear = this.formBuilder.data.find(function (x) { return x.name == "YearToReport"; }).val;
        var projectManager = this.formBuilder.data.find(function (x) { return x.name == "PortfolioManager"; }).val;
        var notes = this.formBuilder.data.find(function (x) { return x.name == "Notes"; }).val;
        this.apiService.getArrayFromQuery("ManagedProgramDB_Report_Portfolio", JSON.stringify({
            Parameters: [
                { Name: "@type", Value: reportType },
                { Name: "@sProjectManager", Value: projectManager },
                { Name: "@sNotes", Value: notes },
                { Name: "@SystemId", Value: systemId },
                { Name: "@LookupYear", Value: lookupYear },
                { Name: "@LoginName", Value: this.apiService.CurrentUser.LoginName }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("ManagedProgramDB_Report_Portfolio : async error #" + error.status);
        }, function () {
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], MpdbReports.prototype, "tabBuilderControl", void 0);
    MpdbReports = __decorate([
        core_1.Component({
            selector: 'reports',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService, managedProgramDbService_1.ManagedProgramDbService])
    ], MpdbReports);
    return MpdbReports;
}());
exports.MpdbReports = MpdbReports;
//# sourceMappingURL=reports.js.map