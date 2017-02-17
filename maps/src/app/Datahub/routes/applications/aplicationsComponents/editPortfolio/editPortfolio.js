"use strict";
var core_1 = require('@angular/core');
var matrixService_1 = require("../../../../../ReusableServices/matrixService");
var editPortfolio_config_1 = require("./editPortfolio.config");
var apiService_1 = require("../../../../../ReusableServices/apiService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var EditPortfolio = (function () {
    function EditPortfolio(vmMatrix, apiService, alert) {
        this.vmMatrix = vmMatrix;
        this.apiService = apiService;
        this.alert = alert;
        this.gridSettings = editPortfolio_config_1.PortfolioComponentConfig;
        this.allPortfolios = [];
    }
    EditPortfolio.prototype.ngOnInit = function () {
        this.searchPortfolios();
        //this.setDataSources();
    };
    EditPortfolio.prototype.displayFormBuilderInfo = function () {
        this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
    };
    EditPortfolio.prototype.onPortfolioSelected = function (portfolio) {
        var self = this;
        var portfolioId = portfolio.id;
        self.currentPortfolio = new PortfolioItem(portfolio.id, portfolio.number, portfolio.name);
        //self.getPortfolioById(portfolioNumber);
    };
    EditPortfolio.prototype.getPortfolio = function (portfolio) {
        var self = this;
    };
    EditPortfolio.prototype.searchPortfolios = function () {
        var _this = this;
        this.apiService.getArrayFromQuery("ManagedProgramDB_Portfolio", JSON.stringify({
            Parameters: [{ Name: "@pType", Value: -1 },
                { Name: "@pSystemId", Value: this.SystemId },
                { Name: "@pLoginName", Value: 'ghindg2' }] //this.apiService.CurrentUser.LoginName
        })).subscribe(function (res) {
            _this.allPortfolios = res;
        }, function (error) {
            _this.alert.error("ManagedProgramDB_GetGroup. Error in retrieving drop down info" + error.status);
        }, function () { });
    };
    EditPortfolio.prototype.setDataSources = function () {
        var _this = this;
        var PortfolioManager = this.gridSettings.ColumnConfiguration.find(function (p) { return p.dbColumnName == 'PortfolioManager'; });
        var urlList = [{ url: PortfolioManager.dataSourceAddress.tableName, body: PortfolioManager.dataSourceAddress.dbParameters }];
        this.apiService.fetchMultipleListWithBody(urlList).subscribe(function (res) {
            PortfolioManager.dataSource = res;
            _this.displayFormBuilderInfo();
        }, function (error) {
            _this.alert.error("Error in retrieving drop down info" + error.status);
        }, function () {
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], EditPortfolio.prototype, "SystemId", void 0);
    EditPortfolio = __decorate([
        core_1.Component({
            selector: 'editPortfolio',
            templateUrl: "..//editPortfolio/editPortfolio.html"
        }), 
        __metadata('design:paramtypes', [matrixService_1.matrixService, apiService_1.ApiService, alertService_1.AlertService])
    ], EditPortfolio);
    return EditPortfolio;
}());
exports.EditPortfolio = EditPortfolio;
var PortfolioItem = (function () {
    function PortfolioItem(id, number, name) {
        this.id = id;
        this.number = number;
        this.name = name;
    }
    return PortfolioItem;
}());
exports.PortfolioItem = PortfolioItem;
//# sourceMappingURL=editPortfolio.js.map