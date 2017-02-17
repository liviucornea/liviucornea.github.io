"use strict";
var core_1 = require('@angular/core');
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var analysisConstructionTool_config_1 = require("./analysisConstructionTool.config");
var managedProgramDbService_1 = require("../managedProgramDbService");
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
    }
    MpdbAnalysisConstructionTool.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    MpdbAnalysisConstructionTool.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
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
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "AdminFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
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
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], MpdbAnalysisConstructionTool.prototype, "tabBuilderControl", void 0);
    MpdbAnalysisConstructionTool = __decorate([
        core_1.Component({
            selector: 'analysisConstructionTool',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService, managedProgramDbService_1.ManagedProgramDbService])
    ], MpdbAnalysisConstructionTool);
    return MpdbAnalysisConstructionTool;
}());
exports.MpdbAnalysisConstructionTool = MpdbAnalysisConstructionTool;
//# sourceMappingURL=analysisConstructionTool.js.map