"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var analysisConstructionTool_config_1 = require("./analysisConstructionTool.config");
var managedProgramDbService_1 = require("../managedProgramDbService");
var displayGrid_1 = require("../../../../../../ReusableComponents/displayGrid/displayGrid");
var MpdbAnalysisConstructionTool = (function () {
    function MpdbAnalysisConstructionTool(alert, apiService, vmMatrix, mpdbService) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.mpdbService = mpdbService;
        this.tabsListData = [];
        this.tabControlConfig = analysisConstructionTool_config_1.AnalysisConstructionToolConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
        this.showDialog = false;
        this.modalGrid = displayGrid_1.DisplayGridComponent;
        this.modalGridSettings = analysisConstructionTool_config_1.ModalGridConfig;
        this.modalPageName = "modalGrid";
    }
    MpdbAnalysisConstructionTool.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    MpdbAnalysisConstructionTool.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    MpdbAnalysisConstructionTool.prototype.closeModalWindow = function () {
        this.showDialog = false;
        //this.gridView.gridSettings.columnConfig.forEach(x=> x.isAllowGridLevelEdit true,)
        // this.gridView.gridSettings.ChildType = "IsSpreadsheetGrid";
    };
    MpdbAnalysisConstructionTool.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    MpdbAnalysisConstructionTool.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData, this.mpdbService);
    };
    MpdbAnalysisConstructionTool.prototype.displayTabInfo = function (tabInfo) {
        this.formBuilder = null;
        this.customMessages = [];
        switch (tabInfo.TabKey) {
            case 'Admin':
                this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "AdminDisplayGrid"; });
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "AdminFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                this.modalGrid.gridSettings = this.modalGridSettings;
                break;
            case 'Lockdown':
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "LockdownFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
            case 'ConstructionTool':
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "ConstructionToolFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    MpdbAnalysisConstructionTool.prototype.doActionFromChildTab = function (outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];
        switch (outputData.TabKey) {
            case 'Admin':
                this.adminAction(outputData);
                break;
            case 'Lockdown':
                //this.lockdownAction(outputData);
                break;
            case 'ConstructionTool':
                //this.constructionToolAction(outputData);
                break;
        }
    };
    MpdbAnalysisConstructionTool.prototype.adminAction = function (outputData) {
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "Module":
                var moduleSelected = outputData.updatedValue.value;
                if (moduleSelected == "") {
                    this.gridView.ShowDefault = false;
                    this.gridView.data = [];
                    break;
                }
                else {
                    this.displayModule(moduleSelected);
                }
                break;
            case "Edit":
                this.getPendingPortfolioModule(this.formBuilder.data.find(function (x) { return x.name == "Module"; }).val);
                break;
        }
    };
    MpdbAnalysisConstructionTool.prototype.displayModule = function (moduleSelected) {
        var _this = this;
        this.apiService.getArrayFromQuery("ManagedProgramDB_GetModuleContent", JSON.stringify({
            Parameters: [{ Name: "@ModuleIDIn", Value: moduleSelected }] })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("displayModule.ManagedProgramDB_GetModuleContent : async error #" + error.status);
        }, function () { });
    };
    MpdbAnalysisConstructionTool.prototype.getPendingPortfolioModule = function (moduleSelected) {
        var _this = this;
        var subscription = this.apiService.getArrayFromQuery("ManagedProgramDB_GetPendingPortfolioModule", JSON.stringify({
            Parameters: [{ Name: "@ModuleIDIn", Value: moduleSelected }] })).subscribe(function (res) {
            _this.modalGrid.data = res;
            subscription.unsubscribe();
            _this.showDialog = true;
        }, function (error) {
            _this.modalGrid.error = "getPendingPortfolioModule.ManagedProgramDB_GetPendingPortfolioModule : async error #" + error.status;
            subscription.unsubscribe();
        }, function () { });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], MpdbAnalysisConstructionTool.prototype, "tabBuilderControl", void 0);
    MpdbAnalysisConstructionTool = __decorate([
        core_1.Component({
            selector: 'analysisConstructionTool',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>\n            <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" style=\"display:block !important;\" *ngIf=\"showDialog\">\n                <div class=\"modal-dialog\">\n                    <div class=\"modal-content standard-callout-background\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" (click)=\"closeModalWindow();\"><span aria-hidden=\"true\">&times;</span></button>\n                            <h4 class=\"modal-title\">Pending change request portfolios</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <b>The following portfolios will not be processed since there is a pending change request:</b>\n                            <br/>\n                            <div class=\"col-sm-12\">\n                                <displayGrid [inputPageName]=\"modalPageName\" [inputGridSettings]=\"modalGrid.gridSettings\"\n                                             [pluginInput]=\"modalGrid.data\"></displayGrid>\n                            </div>\n                            <br/>\n                            <b>{{modalGrid.error}}</b>\n                        </div>\n                    </div>\n                </div>\n            </div>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService, managedProgramDbService_1.ManagedProgramDbService])
    ], MpdbAnalysisConstructionTool);
    return MpdbAnalysisConstructionTool;
}());
exports.MpdbAnalysisConstructionTool = MpdbAnalysisConstructionTool;
//# sourceMappingURL=analysisConstructionTool.js.map