"use strict";
var core_1 = require("@angular/core");
var alertService_1 = require("../../../ReusableServices/alertService");
var interFormsService_1 = require("../../../ReusableServices/interFormsService");
var matrixService_1 = require("../../../ReusableServices/matrixService");
var treeViewMain = (function () {
    function treeViewMain(alert, elementRef, interFormService, vmMat) {
        var _this = this;
        this.interFormService = interFormService;
        this.vmMat = vmMat;
        this.pluginValue = "";
        this.showValidation = false;
        this.enableInsert = false;
        this.formBuilderNotifier = new core_1.EventEmitter();
        this.isEmptyResult = false;
        this.alert = alert;
        this.elemRef = elementRef;
        this.matrixService = vmMat;
        this.addEditObjectConfig = {};
        this.addEditObject = {};
        this.NodeClass = "";
        this.editAddClicked = false;
        this.isMainPageVisible = true;
        this.canAdd = true;
        this.treeViewInputArrivedObservable = this.interFormService.treeViewInputArrived.subscribe(function (x) {
            return _this.injectDataAndConfigAndChildren(x);
        });
    }
    treeViewMain.prototype.ngOnInit = function () {
        if (this.maintreeViewInput) {
            this.editViewRowDataTable = this.maintreeViewInput.pluginInput;
        }
    };
    treeViewMain.prototype.ngOnDestroy = function () {
        this.fbDeleteNotifierObservable.unsubscribe();
        this.fbAddNotifierObservable.unsubscribe();
        this.fbEditNotifierObservable.unsubscribe();
        this.addEditCompletedObservable.unsubscribe();
        this.treeViewInputArrivedObservable.unsubscribe();
    };
    treeViewMain.prototype.deleteAddEditCalled = function (context, selectedRecord, op) {
        switch (op) {
            case "edit":
                context.editAddClicked = true;
                var modelName = selectedRecord.mainPageObject[0].modelName;
                context.pluginInput = selectedRecord.mainPageObject[0].blankModel;
                context.gridSettings = selectedRecord.mainPageObject[0].blankModelConfig;
                context.originalInput = selectedRecord;
                var target = selectedRecord;
                for (var dataKey in context.pluginInput) {
                    var val = target[dataKey];
                    context.pluginInput[dataKey] = val;
                }
                var mainPageObjectArray = new Array();
                mainPageObjectArray.push(context.pluginInput);
                var configObj = Object.create(Object.prototype);
                configObj["Definitions"] = new Array();
                configObj["Definitions"].push({ "ColumnDefinitions": context.gridSettings, "ModelName": modelName });
                var skipList = context.interFormService.getSkipList();
                var mainPage = context.matrixService.extractMatrixNew(skipList, modelName, mainPageObjectArray, configObj);
                var mainHeader = context.matrixService.extractHeaderNew(skipList, modelName, mainPageObjectArray, configObj);
                context.addEditObject = context.matrixService.editMatrixNew(skipList, modelName, mainPage[0].cells, mainHeader, configObj);
                break;
            case "add":
                context.editAddClicked = true;
                context.pluginInput = selectedRecord.blankModel;
                context.gridSettings = selectedRecord.blankModelConfig;
                context.originalInput = selectedRecord;
                var mainPageObjectArray = new Array();
                mainPageObjectArray.push(selectedRecord.blankModel);
                var configObj = Object.create(Object.prototype);
                configObj["Definitions"] = new Array();
                configObj["Definitions"].push({ "ColumnDefinitions": selectedRecord.blankModelConfig, "ModelName": selectedRecord.modelName });
                var skipList = context.interFormService.getSkipList();
                var mainPage = context.matrixService.extractMatrixNew(skipList, selectedRecord.modelName, mainPageObjectArray, configObj);
                var mainHeader = context.matrixService.extractHeaderNew(skipList, selectedRecord.modelName, mainPageObjectArray, configObj);
                context.addEditObject = context.matrixService.editMatrixNew(skipList, selectedRecord.modelName, mainPage[0].cells, mainHeader, configObj);
                selectedRecord.addDetail = true;
                break;
            case "delete":
                break;
        }
    };
    treeViewMain.prototype.setTreeViewVisibility = function (visibility) {
        this.maintreeViewInput.visiblePlugin = visibility;
    };
    treeViewMain.prototype.injectDataAndConfigAndChildren = function (input) {
        var _this = this;
        this.visiblePlugin = input.visiblePlugin;
        var deleteAddEditCb = this.deleteAddEditCalled;
        var kids = input.children;
        this.maintreeViewInput.gridSettings = input.mainConfig;
        this.PageType = input.pageType;
        this.editViewRowDataTable = input.data;
        this.mainModelName = input.modelName;
        this.interFormService.setMainModelName(this.mainModelName);
        this.children = input.children;
        this.PageType = input.pageType;
        var that = this;
        if (this.children && this.children.length > 0) {
            this.children.sort(function (a, b) {
                return a.TabOrder > b.TabOrder;
            });
            this.children.forEach(function (x) {
                _this.getChildRulesConfig(x);
            });
        }
        this.fbDeleteNotifierObservable = this.interFormService.formBuilderDeleteNotifier.subscribe(function (x) {
            deleteAddEditCb(that, x, "delete");
        });
        this.fbAddNotifierObservable = this.interFormService.formBuilderAddNotifier.subscribe(function (x) {
            deleteAddEditCb(that, x, "add");
        });
        this.fbEditNotifierObservable = this.interFormService.formBuilderEditNotifier.subscribe(function (x) {
            // deleteAddEditCb(that, x,"edit");
        });
        this.addEditCompletedObservable = this.interFormService.addEditCompleted.subscribe(function (x) {
            that.editAddClicked = false;
        });
        //show first tab by default
        if (this.children.length) {
            this.childClicked(this.children[0]);
        }
    };
    treeViewMain.prototype.cancelClicked = function () {
        this.returnCallBack("cancel");
    };
    treeViewMain.prototype.returnCallBack = function (returnData) {
        this.formBuilderNotifier.emit({
            value: returnData
        });
        this.maintreeViewInput.visiblePlugin = false;
    };
    treeViewMain.prototype.childClicked = function (child) {
        var _this = this;
        this.isMainPageVisible = false;
        this.children.forEach(function (x) {
            x.visible = false;
            x.addDetail = false;
            x.elementList.forEach(function (e) {
                e.editDetail = false;
                _this.resetChildDetailMode(e);
            });
            x.activeClassChild = "";
        });
        child.visible = true;
        child.activeClassChild = "active";
        this.canAdd = child.modelName !== this.interFormService.getMainModelName();
    };
    treeViewMain.prototype.resetChildDetailMode = function (obj) {
        var _this = this;
        obj.childrenArrayList.forEach(function (c) {
            c.addDetail = false;
            c.elementList.forEach(function (o) {
                o.editDetail = false;
                _this.resetChildDetailMode(o);
            });
        });
    };
    treeViewMain.prototype.getChildRulesConfig = function (child) {
        var _this = this;
        if (child.childrenArrayList && child.childrenArrayList.length > 0) {
            child.childrenArrayList.forEach(function (x) {
                if (x.elementList && x.elementList.length > 0) {
                    x.elementList.forEach(function (z) {
                        z.childRulesConfig = _this.maintreeViewInput.gridSettings.RulesConfig.filter(function (p) { return p.apiObject == z.mainPageObject[0].modelName; });
                        if (!z.childRulesConfig) {
                            z.childRulesConfig = [];
                        }
                        if (z.elementList && z.elementList.length) {
                            _this.getChildRulesConfig(z);
                        }
                    });
                }
            });
        }
        else {
            if (child.elementList && child.elementList.length > 0) {
                for (var i = 0; i < child.elementList.length; i++) {
                    child.elementList[i].childRulesConfig = this.maintreeViewInput.gridSettings.RulesConfig.filter(function (p) { return p.apiObject == child.elementList[i].mainPageObject[0].modelName; });
                    if (!child.elementList[i].childRulesConfig) {
                        child.elementList[i].childRulesConfig = [];
                    }
                    if (child.elementList[i].elementList || (child.elementList[i].childrenArrayList && child.elementList[i].childrenArrayList.length > 0)) {
                        this.getChildRulesConfig(child.elementList[i]);
                    }
                }
            }
        }
    };
    treeViewMain.prototype.showMainPage = function () {
        this.isMainPageVisible = true;
        this.children.forEach(function (x) {
            x.visible = false;
            x.activeClassChild = "";
        });
    };
    treeViewMain.prototype.addClicked = function (line) {
        line.childRulesConfig = this.maintreeViewInput.gridSettings.RulesConfig.filter(function (p) { return p.apiObject == line.modelName; });
        if (!line.childRulesConfig) {
            line.childRulesConfig = [];
        }
        this.interFormService.closeCurrentlyOpenedForm();
        this.interFormService.addEditDeleteMode = "add";
        this.interFormService.formBuilderAddNotifier.emit(line);
        this.interFormService.setCurrentForm(line);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], treeViewMain.prototype, "formBuilderNotifier", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], treeViewMain.prototype, "maintreeViewInput", void 0);
    treeViewMain = __decorate([
        core_1.Component({
            template: require("./treeViewMain.html"),
            selector: 'treeViewMain'
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, core_1.ElementRef, interFormsService_1.InterFormsService, matrixService_1.matrixService])
    ], treeViewMain);
    return treeViewMain;
}());
exports.treeViewMain = treeViewMain;
//# sourceMappingURL=treeViewMain.js.map