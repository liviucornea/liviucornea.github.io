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
var core_1 = require("@angular/core");
var alertService_1 = require("../../../ReusableServices/alertService");
var appSettingsService_1 = require("../../../ReusableServices/appSettingsService");
var interFormsService_1 = require("../../../ReusableServices/interFormsService");
var ruleService_1 = require("../../../ReusableServices/ruleService");
var matrixService_1 = require("../../../ReusableServices/matrixService");
var treeViewAddEditForm = (function () {
    function treeViewAddEditForm(alert, elementRef, appSettingsService, intFormSer, ruleService, matrixService) {
        this.appSettingsService = appSettingsService;
        this.intFormSer = intFormSer;
        this.ruleService = ruleService;
        this.matrixService = matrixService;
        this.PageType = "view";
        this.pageName = "";
        this.pluginValue = "";
        this.visiblePlugin = true;
        this.alert = alert;
        this.elemRef = elementRef;
        this.interFormService = intFormSer;
    }
    treeViewAddEditForm.prototype.ngOnInit = function () {
        this.editViewRowDataTable = this.pluginInput;
    };
    treeViewAddEditForm.prototype.injectDataAndConfig = function (data, config, pageType) {
        this.gridSettings = config;
        this.PageType = pageType;
        this.editViewRowDataTable = data;
    };
    treeViewAddEditForm.prototype.cancelClicked = function () {
        this.interFormService.closeCurrentlyOpenedForm();
    };
    treeViewAddEditForm.prototype.saveClicked = function () {
        var _this = this;
        this.ruleService.errorsResultSet = [];
        var formMode = this.interFormService.addEditDeleteMode;
        var temp = {};
        switch (formMode) {
            case "add":
                var newObj = Object.create(Object.prototype);
                temp[this.originalInput.modelName] = [];
                for (var colInd in this.editViewRowDataTable) {
                    this.editViewRowDataTable[colInd]["errors"] = [];
                    var column = this.editViewRowDataTable[colInd];
                    column = this.getDropDownIdValue(column);
                    newObj[column.name] = column.val;
                }
                for (var x in this.originalInput.blankModel) {
                    if (x.endsWith("_Id")) {
                        newObj[x] = this.originalInput.blankModel[x];
                    }
                }
                newObj["Action"] = "Insert";
                var name = this.originalInput.modelName;
                var ref = this.originalInput[name];
                if (!ref) {
                    ref = this.originalInput.elementList;
                }
                temp[this.originalInput.modelName].push(newObj);
                //Check whether the rules are satisfied
                if (!this.ruleService.checkIfRulesSatisfied(temp, this.ruleService.getRulesByModel(name, this.interFormService.getTreeViewRuleConfig()))) {
                    if (this.ruleService.errorsResultSet && this.ruleService.errorsResultSet.length > 0) {
                        this.ruleService.errorsResultSet.forEach(function (x) {
                            var tempRowTable = _this.editViewRowDataTable.find(function (p) { return p.name == x.name; });
                            if (tempRowTable && x.message.length > 0) {
                                tempRowTable["errors"].push(x.name + "_" + x.message);
                            }
                        });
                    }
                }
                else {
                    if (ref) {
                        ref.push(newObj);
                    }
                    this.interFormService.addEditCompleted.emit("");
                }
                break;
            case "edit":
                var tempObj = Object.assign({}, this.originalInput);
                temp[tempObj.mainPageObject[0].modelName] = [];
                for (var colInd in this.editViewRowDataTable) {
                    this.editViewRowDataTable[colInd]["errors"] = [];
                    var column = this.editViewRowDataTable[colInd];
                    column = this.getDropDownIdValue(column);
                    tempObj[column.name] = column.val;
                }
                tempObj["Action"] = "Update";
                temp[tempObj.mainPageObject[0].modelName].push(tempObj);
                if (!this.ruleService.checkIfRulesSatisfied(temp, this.ruleService.getRulesByModel(tempObj.mainPageObject[0].modelName, this.interFormService.getTreeViewRuleConfig()))) {
                    if (this.ruleService.errorsResultSet && this.ruleService.errorsResultSet.length > 0) {
                        this.ruleService.errorsResultSet.forEach(function (x) {
                            var tempRowTable = _this.editViewRowDataTable.find(function (p) { return p.name == x.name; });
                            if (tempRowTable && x.message.length > 0) {
                                tempRowTable["errors"].push(x.name + "_" + x.message);
                            }
                        });
                    }
                }
                else {
                    for (var colInd in this.editViewRowDataTable) {
                        var column = this.editViewRowDataTable[colInd];
                        column = this.getDropDownIdValue(column);
                        this.originalInput[column.name] = column.val;
                    }
                    this.originalInput["Action"] = "Update";
                    this.interFormService.addEditCompleted.emit("");
                }
                break;
        }
    };
    treeViewAddEditForm.prototype.getDropDownIdValue = function (column) {
        if (column.dataSourceAddress && column.masterdataSource) {
            var primaryColName = this.matrixService.getdbColumnNameForDataSourceAddress(column.dataSourceAddress);
            column.val = this.matrixService.getDropDownIdValue(column.masterdataSource, primaryColName, primaryColName, column.val);
        }
        return column;
    };
    treeViewAddEditForm.prototype.getDropDownResult = function (result, obj) {
        var dropDownId = 0;
        obj.val = result.Value;
        if (obj.name) {
            var tempControl = this.editViewRowDataTable.find(function (c) { return c.name == obj.name; });
            var dbColumnName = "";
            if (tempControl.dataSource) {
                dbColumnName = this.matrixService.getdbColumnNameForDataSourceAddress(tempControl.dataSourceAddress);
            }
            var dropDowndata = tempControl.masterdataSource.find(function (p) { return p[dbColumnName] === obj.val; });
            if (tempControl && tempControl.associatedDropdownControl) {
                if (dropDowndata) {
                    dropDownId = dropDowndata[tempControl.dataSourceAddress.dbColumnName];
                }
                var x = this.editViewRowDataTable.find(function (p) { return p.name == tempControl.associatedDropdownControl; });
                x["customdataSource"] = [];
                var tempcustomDropdownSource = [];
                if (dropDowndata && dropDowndata[tempControl.dataSourceAddress.PrimaryKeyColumn]) {
                    tempcustomDropdownSource = x.masterdataSource.filter(function (c) { return c[x.dataSourceAddress.ForeignKeyColumn] == dropDownId; });
                }
                else {
                    tempcustomDropdownSource = x.masterdataSource.filter(function (c) { return c[tempControl.dataSourceAddress.dbColumnName] == dropDownId; });
                }
                if (tempcustomDropdownSource) {
                    var tempdbColumnName = this.matrixService.getdbColumnNameForDataSourceAddress(x.dataSourceAddress);
                    x["customdataSource"] = this.matrixService.getArrayDataSource(tempcustomDropdownSource, x.dataSourceAddress["displayColumnName"], tempdbColumnName, x.dataSourceAddress["defaultValue"]);
                }
                x.val = "";
            }
        }
    };
    __decorate([
        core_1.Input('originalInput'), 
        __metadata('design:type', Object)
    ], treeViewAddEditForm.prototype, "originalInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], treeViewAddEditForm.prototype, "pluginInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], treeViewAddEditForm.prototype, "gridSettings", void 0);
    __decorate([
        core_1.Input('PageType'), 
        __metadata('design:type', String)
    ], treeViewAddEditForm.prototype, "PageType", void 0);
    __decorate([
        core_1.Input('pageName'), 
        __metadata('design:type', String)
    ], treeViewAddEditForm.prototype, "pageName", void 0);
    __decorate([
        core_1.Input('childRulesConfig'), 
        __metadata('design:type', Object)
    ], treeViewAddEditForm.prototype, "childRulesConfig", void 0);
    __decorate([
        core_1.Input('NodeClass'), 
        __metadata('design:type', String)
    ], treeViewAddEditForm.prototype, "nodeClass", void 0);
    treeViewAddEditForm = __decorate([
        core_1.Component({
            template: require("./treeViewAddEditForm.html"),
            selector: 'treeViewAddEditForm',
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, core_1.ElementRef, appSettingsService_1.AppSettingsService, interFormsService_1.InterFormsService, ruleService_1.RuleService, matrixService_1.matrixService])
    ], treeViewAddEditForm);
    return treeViewAddEditForm;
}());
exports.treeViewAddEditForm = treeViewAddEditForm;
//# sourceMappingURL=treeViewAddEditForm.js.map