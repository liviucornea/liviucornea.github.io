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
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var managedProgramDbService_1 = require("../managedProgramDbService");
var tasks_config_1 = require("./tasks.config");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var MpdbTasks = (function () {
    function MpdbTasks(alert, apiService, vmMatrix, mpdbService) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.mpdbService = mpdbService;
        this.tabsListData = [];
        this.tabControlConfig = tasks_config_1.TasksConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    MpdbTasks.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    MpdbTasks.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    MpdbTasks.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    MpdbTasks.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData, this.mpdbService);
    };
    MpdbTasks.prototype.displayTabInfo = function (tabInfo) {
        this.formBuilder = null;
        this.customMessages = [];
        switch (tabInfo.TabKey) {
            case 'ImportNewAccounts':
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "ImportNewAccountsFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
            case 'InitiateAutoUpload':
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "InitiateAutoUploadFormBuilder"; });
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
    ], MpdbTasks.prototype, "tabBuilderControl", void 0);
    MpdbTasks = __decorate([
        core_1.Component({
            selector: 'tasks',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService, managedProgramDbService_1.ManagedProgramDbService])
    ], MpdbTasks);
    return MpdbTasks;
}());
exports.MpdbTasks = MpdbTasks;
//# sourceMappingURL=tasks.js.map