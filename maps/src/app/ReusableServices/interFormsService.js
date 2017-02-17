"use strict";
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var InterFormsService = (function () {
    function InterFormsService() {
        this.treeViewAddedFields = new Array();
        this.treeViewSummarySkipFields = new Array();
        this.columnInserted = new core_1.EventEmitter();
        this.pageInserted = new core_1.EventEmitter();
        this.formBuilderDeleteNotifier = new core_1.EventEmitter();
        this.formBuilderEditNotifier = new core_1.EventEmitter();
        this.formBuilderAddNotifier = new core_1.EventEmitter();
        this.addEditCompleted = new core_1.EventEmitter();
        this.currentThreeLevelChange = new core_1.EventEmitter();
        this.treeViewInputArrived = new core_1.EventEmitter();
        this.notifyUploadOptionsChange = new Subject_1.Subject();
        this.notifyUploadInit = new Subject_1.Subject();
        this.spinnerEmitter = new Subject_1.Subject();
        this.buildTreeViewCleanupList();
    }
    InterFormsService.prototype.buildTreeViewCleanupList = function () {
        this.treeViewAddedFields.push("blockSequence");
        this.treeViewAddedFields.push("mainPageObject");
        this.treeViewAddedFields.push("config");
        this.treeViewAddedFields.push("model");
        this.treeViewAddedFields.push("nodeClass");
        this.treeViewAddedFields.push("indent");
        this.treeViewAddedFields.push("elementList");
        this.treeViewAddedFields.push("blankModel");
        this.treeViewAddedFields.push("blankModelConfig");
        this.treeViewAddedFields.push("modelName");
        this.treeViewAddedFields.push("level");
        this.treeViewAddedFields.push("expanded");
        this.treeViewAddedFields.push("summaryObject");
        this.treeViewAddedFields.push("viewDetail");
        this.treeViewAddedFields.push("editDetail");
        this.treeViewAddedFields.push("addDetail");
        for (var key in this.treeViewAddedFields) {
            this.treeViewSummarySkipFields.push(this.treeViewAddedFields[key]);
        }
    };
    InterFormsService.prototype.startSpinner = function (scope, text) {
        var spinner = {
            isSpinnerRunning: true,
            spinnerText: text,
            spinnerScope: scope
        };
        this.spinnerEmitter.next(spinner);
    };
    InterFormsService.prototype.stopSpinner = function () {
        var spinner = {
            isSpinnerRunning: false
        };
        this.spinnerEmitter.next(spinner);
    };
    InterFormsService.prototype.setTreeViewRuleConfig = function (ruleConfig) {
        this.treeViewRuleConfig = ruleConfig;
    };
    InterFormsService.prototype.getTreeViewRuleConfig = function () {
        return this.treeViewRuleConfig;
    };
    InterFormsService.prototype.setTreeViewApiResult = function (result) {
        this.treeViewApiResult = result;
    };
    InterFormsService.prototype.getTreeViewApiResult = function () {
        return this.treeViewApiResult;
    };
    InterFormsService.prototype.setMainModelName = function (modelName) {
        this.mainModelName = modelName;
    };
    InterFormsService.prototype.getMainModelName = function () {
        return this.mainModelName;
    };
    InterFormsService.prototype.cleanApi = function (mainObj) {
        var _this = this;
        this.deleteObjectProperties(mainObj);
        for (var colInd in mainObj) {
            var obj = mainObj[colInd];
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                obj.forEach(function (x) { return _this.cleanApi(x); });
            }
            if (Object.prototype.toString.call(obj) === '[object Object]') {
                this.cleanApi(obj);
            }
        }
    };
    InterFormsService.prototype.rebuildRootObject = function (input) {
        var modelName = this.getMainModelName();
        var mainObj = input[modelName];
        var rootobj = input[modelName][modelName][0];
        for (var colInd in mainObj) {
            var obj = mainObj[colInd];
            if (Object.prototype.toString.call(obj) !== '[object Array]') {
                mainObj[colInd] = rootobj[colInd];
            }
        }
        delete mainObj[modelName];
    };
    InterFormsService.prototype.deleteObjectProperties = function (input) {
        var inputObj = input;
        this.treeViewAddedFields.forEach(function (x) {
            delete inputObj[x];
        });
    };
    InterFormsService.prototype.injectSkipList = function (skipList) {
        var _this = this;
        skipList.forEach(function (x) {
            if (!_this.treeViewSummarySkipFields.find(function (xx) { return xx === x; })) {
                _this.treeViewSummarySkipFields.push(x);
            }
        });
    };
    InterFormsService.prototype.cleanObjectForSummary = function (mainObj) {
        this.deleteObjectPropertiesForSummary(mainObj);
        var cleanObj = Object.create(Object.prototype);
        for (var colInd in mainObj) {
            var obj = mainObj[colInd];
            var check = Object.prototype.toString.call(obj);
            if (Object.prototype.toString.call(obj) !== '[object Array]') {
                cleanObj[colInd] = mainObj[colInd];
            }
        }
        return cleanObj;
    };
    InterFormsService.prototype.deleteObjectPropertiesForSummary = function (input) {
        var inputObj = input;
        this.treeViewSummarySkipFields.forEach(function (x) {
            delete inputObj[x];
        });
    };
    InterFormsService.prototype.setCurrentForm = function (currentForm) {
        this.currentTreeViewForm = currentForm;
    };
    InterFormsService.prototype.closeCurrentlyOpenedForm = function () {
        if (this.currentTreeViewForm) {
            this.currentTreeViewForm.addDetail = false;
            this.currentTreeViewForm.editDetail = false;
        }
    };
    InterFormsService.prototype.assignControl = function (control) {
        this.inputControl = control;
    };
    InterFormsService.prototype.saveValueInControl = function (val) {
        this.inputControl.val = val;
    };
    InterFormsService.prototype.getSkipList = function () {
        return this.skipList;
    };
    InterFormsService.prototype.setSkipList = function (skipList) {
        this.skipList = skipList;
    };
    InterFormsService.prototype.setCurrentTreeLeve = function (level) {
        this.currentThreeLevelChange.emit(level);
    };
    InterFormsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], InterFormsService);
    return InterFormsService;
}());
exports.InterFormsService = InterFormsService;
//# sourceMappingURL=interFormsService.js.map