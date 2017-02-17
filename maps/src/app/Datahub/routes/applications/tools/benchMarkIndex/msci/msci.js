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
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var msci_config_1 = require("./msci.config");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var BmiMsci = (function () {
    function BmiMsci(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = msci_config_1.MsciControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    BmiMsci.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    BmiMsci.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    BmiMsci.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    BmiMsci.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    BmiMsci.prototype.displayTabInfo = function (tabInfo) {
        this.customMessages = [];
        this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "DisplayGrid"; });
        if (this.gridView) {
            this.gridView.ShowDefault = false;
        }
        this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "FormBuilder"; });
        if (this.formBuilder) {
            var d = new Date();
            d.setDate(d.getDate() - 2);
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val = genericfunctions_1.toDateString(d);
            this.formBuilder.data.find(function (x) { return x.name == "IndexType"; }).val = "REGION";
            this.formBuilder.data.find(function (x) { return x.name == "IndexTypeInclude"; }).val = "NONE";
            this.formBuilder.data.find(function (x) { return x.name == "IndexTypeExclude"; }).val = "NONE";
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    BmiMsci.prototype.doActionFromChildTab = function (outputData) {
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "IndexType":
                this.formBuilder.data.find(function (x) { return x.name == "Region"; }).isVisible = outputData.updatedValue.value == "REGION";
                this.formBuilder.data.find(function (x) { return x.name == "Country"; }).isVisible = outputData.updatedValue.value == "COUNTRY";
                break;
            case "IndexTypeInclude":
                this.formBuilder.data.find(function (x) { return x.name == "RegionInclude"; }).isVisible = outputData.updatedValue.value == "REGION";
                this.formBuilder.data.find(function (x) { return x.name == "CountryInclude"; }).isVisible = outputData.updatedValue.value == "COUNTRY";
                break;
            case "IndexTypeExclude":
                this.formBuilder.data.find(function (x) { return x.name == "RegionExclude"; }).isVisible = outputData.updatedValue.value == "REGION";
                this.formBuilder.data.find(function (x) { return x.name == "CountryExclude"; }).isVisible = outputData.updatedValue.value == "COUNTRY";
                break;
            case "Preview":
                this.showReport();
                break;
        }
    };
    BmiMsci.prototype.getSummaryData = function (data) {
        var countriesSummary = [];
        var countries = this.formBuilder.data.find(function (x) { return x.name == "Country"; });
        countries.masterdataSource.forEach(function (x) {
            var countryData = data.filter(function (y) { return y.ISO == x.value; });
            if (countryData.length > 0) {
                var weightSum = 0;
                var closingMarketCapSum = 0;
                for (var i = countryData.length; i--;) {
                    weightSum += countryData[i].Weight;
                    closingMarketCapSum += countryData[i].Closing_Security_Market_Cap;
                }
                countriesSummary.push({
                    RegionCountry: x.name, CountryCode: x.value,
                    ClosingMarketCap: closingMarketCapSum, Weight: weightSum
                });
            }
        });
        return countriesSummary;
    };
    BmiMsci.prototype.getCountrySummaryData = function (data, iso) {
        var summary = [];
        var countryData = data.filter(function (x) { return x.ISO == iso; });
        countryData.forEach(function (x) {
            summary.push({ CountryCode: x.ISO, Weight: x.Weight, Date: x.Date, Name: x.Name,
                TICKER: x.TICKER, IndexMarketCap: x.Index_Market_Cap, ForeignInclusionFactor: x.foreign_inclusion_factor,
                Price: x.price, Currency: x.Price_ISO_currency_symbol });
        });
        return summary;
    };
    BmiMsci.prototype.showReport = function () {
        var _this = this;
        var indexType;
        var includeIndexType = -1;
        var excludeIndexType = -1;
        var indexCode = "";
        var includeIndexCode = "";
        var excludeIndexCode = "";
        var selectedDate = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val;
        var indexTypeSelected = this.formBuilder.data.find(function (x) { return x.name == "IndexType"; }).val;
        var regionsSelected = this.formBuilder.data.find(function (x) { return x.name == "Region"; }).val;
        var countriesSelected = this.formBuilder.data.find(function (x) { return x.name == "Country"; }).val;
        var includeIndexTypeSelected = this.formBuilder.data.find(function (x) { return x.name == "IndexTypeInclude"; }).val;
        var includeRegionsSelected = this.formBuilder.data.find(function (x) { return x.name == "RegionInclude"; }).val;
        var includeCountriesSelected = this.formBuilder.data.find(function (x) { return x.name == "CountryInclude"; }).val;
        var excludeIndexTypeSelected = this.formBuilder.data.find(function (x) { return x.name == "IndexTypeExclude"; }).val;
        var excludeRegionsSelected = this.formBuilder.data.find(function (x) { return x.name == "RegionExclude"; }).val;
        var excludeCountriesSelected = this.formBuilder.data.find(function (x) { return x.name == "CountryExclude"; }).val;
        if (indexTypeSelected == "REGION") {
            indexType = 0;
            indexCode = regionsSelected;
        }
        else if (indexTypeSelected == "COUNTRY") {
            indexType = 1;
            indexCode = countriesSelected;
        }
        if (includeIndexTypeSelected == "REGION") {
            includeIndexType = 0;
            includeIndexCode = includeRegionsSelected;
        }
        else if (includeIndexTypeSelected == "COUNTRY") {
            includeIndexType = 1;
            includeIndexCode = includeCountriesSelected;
        }
        if (excludeIndexTypeSelected == "REGION") {
            excludeIndexType = 0;
            excludeIndexCode = excludeRegionsSelected;
        }
        else if (excludeIndexTypeSelected == "COUNTRY") {
            excludeIndexType = 1;
            excludeIndexCode = excludeCountriesSelected;
        }
        this.apiService.getArrayFromQuery("Benchmark_GetMSCIIndex", JSON.stringify({
            Parameters: [
                { Name: "@pReportDate", Value: selectedDate },
                { Name: "@pIndexType", Value: indexType },
                { Name: "@pIndexCode", Value: indexCode },
                { Name: "@pIncludeIndexType", Value: includeIndexType },
                { Name: "@pIncludeIndexCode", Value: includeIndexCode },
                { Name: "@pExcludeIndexType", Value: excludeIndexType },
                { Name: "@pExcludeIndexCode", Value: excludeIndexCode }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            var masterData = _this.getSummaryData(res);
            if (masterData.length > 0) {
                var messageBlock = [masterData.length + (masterData.length > 1 ? " records " : " record ") + "found"];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            masterData.forEach(function (p) {
                p.childData = res.filter(function (c) { return c.ISO == p.CountryCode; });
            });
            _this.gridView.data = masterData;
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("GetMSCIIndex : async error #" + error.status);
        }, function () {
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], BmiMsci.prototype, "tabBuilderControl", void 0);
    BmiMsci = __decorate([
        core_1.Component({
            selector: 'msci',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], BmiMsci);
    return BmiMsci;
}());
exports.BmiMsci = BmiMsci;
//# sourceMappingURL=msci.js.map