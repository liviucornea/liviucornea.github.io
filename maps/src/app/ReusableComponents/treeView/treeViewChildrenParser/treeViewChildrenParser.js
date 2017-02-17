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
//import {FORM_DIRECTIVES} from "angular2/common";
var core_1 = require("@angular/core");
var interFormsService_1 = require("../../../ReusableServices/interFormsService");
var matrixService_1 = require("../../../ReusableServices/matrixService");
var alertService_1 = require("../../../ReusableServices/alertService");
var appSettingsService_1 = require("../../../ReusableServices/appSettingsService");
var ruleService_1 = require("../../../ReusableServices/ruleService");
var treeViewChildrenParser = (function () {
    function treeViewChildrenParser(matSV, intFormSer, alert, appSettingsService, ruleService) {
        var _this = this;
        this.matSV = matSV;
        this.intFormSer = intFormSer;
        this.alert = alert;
        this.appSettingsService = appSettingsService;
        this.ruleService = ruleService;
        this.title = "Form";
        this.addEditClicked = false;
        this.subChild = false;
        this.interFormService = intFormSer;
        this.matrixService = matSV;
        this.show = false;
        this.currentLevel = 3;
        this.canAddDelete = true;
        this.interFormService.currentThreeLevelChange.subscribe(function (x) { return _this.levelChanged(x); });
    }
    treeViewChildrenParser.prototype.levelChanged = function (x) {
        this.currentLevel = x + 2;
    };
    treeViewChildrenParser.prototype.addClicked = function (line) {
        this.interFormService.closeCurrentlyOpenedForm();
        this.interFormService.addEditDeleteMode = "add";
        this.deleteAddEditCalled(line, "add");
        this.interFormService.setCurrentForm(line);
    };
    treeViewChildrenParser.prototype.deleteClicked = function (line) {
        var _this = this;
        line.Action = "Delete";
        this.interFormService.addEditDeleteMode = "delete";
        var deletedModelName = line.mainPageObject[0].modelName;
        this.ruleService.errorsResultSet = [];
        var temp = {};
        var tempObj;
        var deletedObj = [];
        var updatedObj;
        var validatedModelName;
        if (line.level > 2) {
            tempObj = JSON.parse(this.children.parentModel);
            temp[this.children.parentModelName] = [];
            deletedObj = tempObj[deletedModelName];
            deletedObj.find(function (p) { return p[deletedModelName + "_Id"] == line[deletedModelName + "_Id"]; }).Action = "Delete";
            updatedObj = deletedObj.filter(function (p) { return p.Action != "Delete"; });
            tempObj[deletedModelName] = updatedObj;
            temp[this.children.parentModelName].push(tempObj);
            validatedModelName = this.children.parentModelName;
        }
        else {
            tempObj = Object.assign({}, JSON.parse(JSON.stringify(this.interFormService.getTreeViewApiResult())));
            temp[this.mainModelName] = [];
            deletedObj = tempObj[this.mainModelName][deletedModelName];
            updatedObj = deletedObj.filter(function (p) { return p.Action != "Delete"; });
            tempObj[this.mainModelName][deletedModelName] = updatedObj;
            temp[this.mainModelName].push(tempObj);
            validatedModelName = this.mainModelName;
        }
        if (!this.ruleService.checkIfRulesSatisfied(temp, this.ruleService.getRulesByModel(validatedModelName, this.interFormService.getTreeViewRuleConfig()))) {
            if (this.ruleService.errorsResultSet && this.ruleService.errorsResultSet.length > 0) {
                this.alert.warn("Cannot delete a record. At least one " + deletedModelName + " is required !");
                line.Action = "Read";
            }
        }
        else {
            this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deletionQuestionMsg);
            var subscription_1 = this.alert.requestConfirmationAnswer$.subscribe(function (answer) {
                subscription_1.unsubscribe();
                _this.alert.askConfirmation = false;
                if (answer != "OK") {
                    line.Action = "Read";
                    return;
                }
                _this.interFormService.formBuilderDeleteNotifier.emit(line);
            });
        }
    };
    treeViewChildrenParser.prototype.editClicked = function (line) {
        this.interFormService.closeCurrentlyOpenedForm();
        this.interFormService.addEditDeleteMode = "edit";
        line.editDetail = !line.editDetail;
        line.viewDetail = false;
        this.deleteAddEditCalled(line, "edit");
        this.interFormService.setCurrentForm(line);
    };
    treeViewChildrenParser.prototype.moreClicked = function (line) {
        line.editDetail = false;
        line.viewDetail = !line.viewDetail;
    };
    treeViewChildrenParser.prototype.ngOnInit = function () {
        this.elementList = [];
        if (this.children && this.children.elementList) {
            this.elementList = this.children.elementList;
            this.mainModelName = this.interFormService.getMainModelName();
            if (!this.subChild)
                this.canAddDelete = this.children.modelName !== this.interFormService.getMainModelName();
            else
                this.canAddDelete = true;
        }
        else {
            this.editViewRowDataTable = this.pluginInput;
        }
        this.indentLevel = new Array(this.children.indent);
    };
    treeViewChildrenParser.prototype.childClicked = function (ln) {
        ln.elementList.forEach(function (x) {
            x.expanded = !x.expanded;
        });
        this.interFormService.setCurrentTreeLeve(ln.level);
    };
    treeViewChildrenParser.prototype.deleteAddEditCalled = function (selectedRecord, op) {
        switch (op) {
            case "edit":
                this.editAddClicked = true;
                var modelName = selectedRecord.mainPageObject[0].modelName;
                this.pluginInput = selectedRecord.mainPageObject[0].blankModel;
                this.gridSettings = selectedRecord.mainPageObject[0].blankModelConfig;
                this.originalInput = selectedRecord;
                var target = selectedRecord;
                for (var dataKey in this.pluginInput) {
                    var val = target[dataKey];
                    this.pluginInput[dataKey] = val;
                }
                var mainPageObjectArray = new Array();
                mainPageObjectArray.push(this.pluginInput);
                var configObj = Object.create(Object.prototype);
                configObj["Definitions"] = new Array();
                configObj["Definitions"].push({ "ColumnDefinitions": this.gridSettings, "ModelName": modelName });
                var skipList = this.interFormService.getSkipList();
                var mainPage = this.matrixService.extractMatrixNew(skipList, modelName, mainPageObjectArray, configObj);
                var mainHeader = this.matrixService.extractHeaderNew(skipList, modelName, mainPageObjectArray, configObj);
                this.addEditObject = this.matrixService.editMatrixNew(skipList, modelName, mainPage[0].cells, mainHeader, configObj);
                break;
            case "add":
                this.editAddClicked = true;
                this.pluginInput = selectedRecord.blankModel;
                this.gridSettings = selectedRecord.blankModelConfig;
                this.originalInput = selectedRecord;
                var mainPageObjectArray = new Array();
                mainPageObjectArray.push(selectedRecord.blankModel);
                var configObj = Object.create(Object.prototype);
                configObj["Definitions"] = new Array();
                configObj["Definitions"].push({ "ColumnDefinitions": selectedRecord.blankModelConfig, "ModelName": selectedRecord.modelName });
                var skipList = this.interFormService.getSkipList();
                var mainPage = this.matrixService.extractMatrixNew(skipList, selectedRecord.modelName, mainPageObjectArray, configObj);
                var mainHeader = this.matrixService.extractHeaderNew(skipList, selectedRecord.modelName, mainPageObjectArray, configObj);
                this.addEditObject = this.matrixService.editMatrixNew(skipList, selectedRecord.modelName, mainPage[0].cells, mainHeader, configObj);
                selectedRecord.addDetail = true;
                break;
            case "delete":
                break;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], treeViewChildrenParser.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], treeViewChildrenParser.prototype, "pluginInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], treeViewChildrenParser.prototype, "gridSettings", void 0);
    __decorate([
        core_1.Input('children'), 
        __metadata('design:type', Object)
    ], treeViewChildrenParser.prototype, "children", void 0);
    __decorate([
        core_1.Input('NodeClass'), 
        __metadata('design:type', String)
    ], treeViewChildrenParser.prototype, "nodeClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], treeViewChildrenParser.prototype, "subChild", void 0);
    treeViewChildrenParser = __decorate([
        core_1.Component({
            template: require("./treeViewChildrenParser.html"),
            selector: 'treeViewChildrenParser',
        }), 
        __metadata('design:paramtypes', [matrixService_1.matrixService, interFormsService_1.InterFormsService, alertService_1.AlertService, appSettingsService_1.AppSettingsService, ruleService_1.RuleService])
    ], treeViewChildrenParser);
    return treeViewChildrenParser;
}());
exports.treeViewChildrenParser = treeViewChildrenParser;
//# sourceMappingURL=treeViewChildrenParser.js.map