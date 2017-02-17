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
var router_1 = require("@angular/router");
var portfolio_config_1 = require("./portfolio.config");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var MpdbPortfolio = (function () {
    function MpdbPortfolio(alert, vmMatrix, route, apiService) {
        this.alert = alert;
        this.vmMatrix = vmMatrix;
        this.route = route;
        this.apiService = apiService;
        this.tabsListData = [];
        this.tabControlConfig = portfolio_config_1.PortfolioConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
        this.addEditMode = 'add';
    }
    MpdbPortfolio.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.key = params['key'];
        });
        if (this.key) {
            switch (this.key) {
                case "FP":
                    this.selectedSystemId = 18;
                    break;
                case "PIA":
                    this.selectedSystemId = 19;
                    break;
                case "PIC":
                    this.selectedSystemId = 23;
                    break;
            }
            this.getTabsData();
        }
    };
    MpdbPortfolio.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    MpdbPortfolio.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    MpdbPortfolio.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    MpdbPortfolio.prototype.displayTabInfo = function (tabInfo) {
        this.formBuilder = null;
        this.customMessages = [];
        this.updatedControlsList = [];
        switch (tabInfo.TabKey) {
            case 'AddPortfolio':
                this.addEditMode = 'add';
                break;
            case 'EditPortfolio':
                this.addEditMode = 'edit';
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "EditPortfolioFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(function (x) { return x.name == "PortfolioSearchOptions"; }).val = "PortfolioNumber";
                    this.loadPortfolios();
                }
                break;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    MpdbPortfolio.prototype.doActionFromChildTab = function (outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];
        switch (outputData.TabKey) {
            case 'AddPortfolio':
                this.pluginInput = null;
                break;
            case 'EditPortfolio':
                this.pluginInput = outputData.updatedValue.value;
                break;
        }
    };
    MpdbPortfolio.prototype.loadPortfolios = function () {
        var _this = this;
        var SearchByNumberAndName = this.formBuilder.data.find(function (x) { return x.name == "SearchByNumberAndName"; });
        this.apiService.getArrayFromQuery("ManagedProgramDB_Portfolio", JSON.stringify({
            Parameters: [{ Name: "@Type", Value: -1 },
                { Name: "@Id", Value: 0 },
                { Name: "@PortfolioNumber", Value: '' },
                { Name: "@PortfolioName", Value: '' },
                { Name: "@PortfolioManager", Value: '' },
                { Name: "@ProjectedAUM", Value: 0 },
                { Name: "@InceptionDate", Value: '' },
                { Name: "@Notes", Value: '' },
                { Name: "@SystemId", Value: this.selectedSystemId },
                { Name: "@LoginName", Value: this.apiService.CurrentUser.LoginName },
                { Name: "@LookupYear", Value: '' }]
        })).subscribe(function (res) {
            SearchByNumberAndName.dataSource = res;
        }, function (error) {
            _this.alert.error("loadPortfolios.ManagedProgramDB_Portfolio. Error in retrieving drop down info" + error.status);
        }, function () { });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], MpdbPortfolio.prototype, "tabBuilderControl", void 0);
    MpdbPortfolio = __decorate([
        core_1.Component({
            selector: 'portfolio',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>\n            <div class=\"col-sm-12 col-md-6\">\n                <addEditPortfolio [pluginInput]=\"pluginInput\" [addEditMode]=\"addEditMode\"\n                    [httpProxy]=\"apiService\" [SystemId]=\"selectedSystemId\"></addEditPortfolio>\n            </div>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, matrixService_1.matrixService, router_1.ActivatedRoute, apiService_1.ApiService])
    ], MpdbPortfolio);
    return MpdbPortfolio;
}());
exports.MpdbPortfolio = MpdbPortfolio;
//# sourceMappingURL=portfolio.js.map