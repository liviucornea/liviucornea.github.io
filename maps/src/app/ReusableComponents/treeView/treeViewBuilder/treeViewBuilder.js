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
var matrixService_1 = require("../../../ReusableServices/matrixService");
var interFormsService_1 = require("../../../ReusableServices/interFormsService");
var httpAbstract_1 = require("../../../ReusableServices/httpAbstract");
var ruleService_1 = require("../../../ReusableServices/ruleService");
var navigationService_1 = require("../../../ReusableServices/navigationService");
var apiService_1 = require("../../../ReusableServices/apiService");
var alertService_1 = require("../../../ReusableServices/alertService");
var _Score_1 = require("../../../ReusableServices/rulesSource/_Score");
var appSettingsService_1 = require("../../../ReusableServices/appSettingsService");
var TreeViewBuilder = (function () {
    function TreeViewBuilder(ruleSrv, httpProx, vmMatrix, interFormsService, navService, alert, apiService, appSettingsService) {
        this.ruleSrv = ruleSrv;
        this.httpProx = httpProx;
        this.vmMatrix = vmMatrix;
        this.interFormsService = interFormsService;
        this.navService = navService;
        this.alert = alert;
        this.apiService = apiService;
        this.appSettingsService = appSettingsService;
        this.editAddClicked = true;
        this.grandParentLevel = 0;
        this.showTreeViewdata = false;
        this.ruleService = ruleSrv;
        this.matrixService = vmMatrix;
        this.interFormService = interFormsService;
        this.httpProxy = httpProx;
    }
    TreeViewBuilder.prototype.ngOnInit = function () {
        var _this = this;
        this.mainConfig = this.jsonConfig;
        var dataSourceAddressTables = [];
        //Load all dropdown values here
        for (var index in this.mainConfig.Definitions)
            for (var key in this.mainConfig.Definitions[index]["ColumnDefinitions"]) {
                if (this.mainConfig.Definitions[index]["ColumnDefinitions"][key].dataSourceAddress) {
                    dataSourceAddressTables.push(this.mainConfig.Definitions[index]["ColumnDefinitions"][key].dataSourceAddress.tableName);
                }
            }
        if (dataSourceAddressTables.length) {
            this.apiService.fetchMultipleList(dataSourceAddressTables).subscribe(function (res) {
                // check if res in not an Array
                var i = 0;
                for (var jIndex in _this.mainConfig.Definitions) {
                    for (var key in _this.mainConfig.Definitions[jIndex]["ColumnDefinitions"]) {
                        if (_this.mainConfig.Definitions[jIndex]["ColumnDefinitions"][key].dataSourceAddress) {
                            _this.mainConfig.Definitions[jIndex]["ColumnDefinitions"][key].dataSource = res[i];
                            i++;
                        }
                    }
                }
                _this.loadTreeViewData();
            }, function (error) {
                _this.alert.error("Error in retrieving master data: async error #" + error.status);
            }, function () {
            });
        }
        else {
            this.loadTreeViewData();
        }
        // this.loadTreeViewData();
    };
    TreeViewBuilder.prototype.loadTreeViewData = function () {
        //this.mainConfig= this.jsonConfig;
        this.maintreeViewInput = Object.create(Object.prototype);
        this.maintreeViewInput.visiblePlugin = false;
        this.maintreeViewInput.gridSettings = this.mainConfig;
        this.maintreeViewInput.pluginInput = this.apiResult;
        this.ruleConfig = this.jsonConfig.RulesConfig;
        var deleteAddEditCb = this.deleteAddEditCalled;
        var deleteAddEditCompleteCb = this.deleteAddEditCallCompleted;
        ;
        var that = this;
        this.fbDeleteNotifierObservable = this.interFormService.formBuilderDeleteNotifier.subscribe(function (x) {
            deleteAddEditCb(that);
        });
        this.fbAddNotifierObservable = this.interFormService.formBuilderAddNotifier.subscribe(function (x) {
            deleteAddEditCb(that);
        });
        this.fbEditNotifierObservable = this.interFormService.formBuilderEditNotifier.subscribe(function (x) {
            deleteAddEditCb(that);
        });
        this.addEditCompletedObservable = this.interFormService.addEditCompleted.subscribe(function (x) {
            deleteAddEditCompleteCb(that);
        });
        this.getTreeViewdataFromApi(this);
    };
    TreeViewBuilder.prototype.getTreeViewdataFromApi = function (that) {
        var _this = this;
        that.httpProxy.fetch(that.treeViewApiUrl).subscribe(function (x) {
            if (x) {
                _this.apiResult = JSON.parse(x);
                _this.interFormService.setTreeViewApiResult(_this.apiResult);
                _this.interFormService.setTreeViewRuleConfig(_this.ruleConfig);
                that.addRootAsArray(_this.apiResult);
                that.loadTreeView(that, _this.apiResult, true);
                _this.ruleErrors = [];
                that.showClicked();
            }
        }, function (error) {
            _this.alert.error("Error in retrieving data: async error #" + error.status);
        }, function () {
        });
    };
    TreeViewBuilder.prototype.addRootAsArray = function (obj) {
        var newArray = new Array();
        var newObj = Object.create(Object.prototype);
        var modelName = this.mainConfig.RootModel;
        var myObject = obj[modelName];
        for (var key in myObject) {
            if (!_Score_1._Score.isObject(myObject[key])) {
                newObj[key] = myObject[key];
            }
        }
        newArray.push(newObj);
        myObject[modelName] = newArray;
    };
    TreeViewBuilder.prototype.ngOnDestroy = function () {
        this.fbDeleteNotifierObservable.unsubscribe();
        this.fbAddNotifierObservable.unsubscribe();
        this.fbEditNotifierObservable.unsubscribe();
        this.addEditCompletedObservable.unsubscribe();
    };
    TreeViewBuilder.prototype.loadTreeView = function (context, input, firstLoad) {
        context.vmMatrix.resetTreeViewBlockCount();
        var finalResult = context.matrixService.extractNodes(input, context.mainConfig);
        var result = finalResult.treeArray;
        var skipList = finalResult.skipList;
        context.interFormService.setSkipList(skipList);
        context.children = result.filter(function (x) { return x.type === 'node'; });
        context.children.sort(context.sortByTabOrder);
        var mainPageObject = result.filter(function (x) { return x.type === 'leaf'; });
        var mainPageObjectArray = new Array();
        mainPageObjectArray.push(mainPageObject[0].mainPageObject);
        context.mainPage = context.vmMatrix.extractMatrixNew(skipList, mainPageObject[0].modelName, mainPageObjectArray, context.mainConfig);
        context.mainHeader = context.vmMatrix.extractHeaderNew(skipList, mainPageObject[0].modelName, mainPageObjectArray, context.mainConfig);
        context.formData = context.vmMatrix.editMatrixNew(skipList, mainPageObject[0].modelName, context.mainPage[0].cells, context.mainHeader, context.mainConfig);
        context.processChildren(context.children);
    };
    TreeViewBuilder.prototype.sortByTabOrder = function (a, b) {
        if (a.tabOrder < b.tabOrder)
            return -1;
        if (a.tabOrder > b.tabOrder)
            return 1;
        return 0;
    };
    TreeViewBuilder.prototype.deleteAddEditCalled = function (context) {
        var blank = new Array();
        var opMode = context.interFormService.addEditDeleteMode;
        //context.component.instance.injectDataAndConfigAndChildren({data:blank, modelName:context.mainConfig.RootModel}, blank,context.mainConfig,"");
        if (opMode === "delete") {
            context.deleteAddEditCallCompleted(context);
        }
    };
    TreeViewBuilder.prototype.checkIfRulesSatisfied = function (context) {
        var _this = this;
        var finalResult = true;
        this.ruleErrors = [];
        if (this.ruleConfig) {
            this.ruleConfig.forEach(function (x) {
                var ruleType = x.ruleType;
                var columnNames = x.ruleAssociates;
                var applicationMode = x.applyTo;
                var modelName = x.apiObject;
                var ruleValue = x.ruleValue;
                context.ruleService.clearExistingValidations();
                context.ruleService.associateRule(x, context); //ruleType, columnNames,ruleValue);
                var result = _this.ruleService.validateRules(context.apiResult, modelName, ruleType, applicationMode);
                if (result.hasErrors || result.errorMessage.length) {
                    if (result.errorMessage) {
                        //this.ruleErrors.push();
                        result.errorMessage.forEach(function (x) {
                            _this.ruleErrors.push(x);
                        });
                        finalResult = false;
                    }
                }
            });
        }
        return finalResult;
    };
    TreeViewBuilder.prototype.deleteAddEditCallCompleted = function (context) {
        var _this = this;
        //if(context.checkIfRulesSatisfied(context)) {
        context.interFormService.cleanApi(context.apiResult);
        context.interFormService.rebuildRootObject(context.apiResult);
        context.httpProxy.insert(context.treeViewApiUrl, JSON.stringify(context.apiResult)).subscribe(function (res) {
            if (res) {
                context.alert.addAlert(context.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                context.getTreeViewdataFromApi(context);
            }
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () {
        });
        //}
    };
    TreeViewBuilder.prototype.softDelete = function (inputObj) {
        this.findDeletedObj(inputObj);
        if (this.deletedObject) {
            this.removeObjectFromInput(inputObj);
        }
    };
    TreeViewBuilder.prototype.removeObjectFromInput = function (input) {
        for (var colInd in input) {
            var obj = input[colInd];
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                var index = obj.indexOf(this.deletedObject);
                if (index > -1) {
                    obj.splice(index, 1);
                }
                else
                    (this.removeObjectFromInput(obj));
            }
            if (Object.prototype.toString.call(obj) === '[object Object]') {
                this.removeObjectFromInput(obj);
            }
        }
    };
    TreeViewBuilder.prototype.findDeletedObj = function (input) {
        var _this = this;
        var lookup = input.Action;
        if (lookup) {
            if (lookup === "Deleted") {
                this.deletedObject = input;
            }
        }
        for (var colInd in input) {
            var obj = input[colInd];
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                obj.forEach(function (x) { return _this.findDeletedObj(x); });
            }
            if (Object.prototype.toString.call(obj) === '[object Object]') {
                this.findDeletedObj(obj);
            }
        }
    };
    TreeViewBuilder.prototype.processChildren = function (kids) {
        var _this = this;
        var children = kids;
        for (var child in children) {
            // x is a list of the children of every node that has children and is NOT the root node
            var x = children[child].elementList;
            var modelName = children[child].modelName;
            var newObject = Object.create(Object.prototype);
            for (var ele in x) {
                var elem = x[ele];
                newObject[modelName] = elem;
                var finalResult = this.matrixService.extractNodesLight(newObject);
                var result = finalResult.treeArray;
                var skipList = finalResult.skipList;
                var mainPageObject = result.filter(function (xx) { return xx.type === 'leaf'; });
                var childrenList = result.filter(function (xx) { return xx.type === 'node'; });
                var mainPageObjectArray = new Array();
                mainPageObjectArray.push(mainPageObject[0].mainPageObject);
                var mainPage = this.vmMatrix.extractMatrixNew(skipList, mainPageObject[0].modelName, mainPageObjectArray, this.mainConfig);
                var mainHeader = this.vmMatrix.extractHeaderNew(skipList, mainPageObject[0].modelName, mainPageObjectArray, this.mainConfig);
                var formData = this.vmMatrix.editMatrixNew(skipList, mainPageObject[0].modelName, mainPage[0].cells, mainHeader, this.mainConfig);
                elem.config = this.mainConfig;
                elem.model = formData;
                elem.mainPageObject = mainPageObject;
                elem.expanded = mainPageObject[0].expanded;
                elem.level = mainPageObject[0].level;
                elem.childrenArrayList = [];
                if (childrenList.length) {
                    var objElem = Object.assign({}, elem);
                    objElem["config"] = {};
                    objElem["mainPageObject"] = [];
                    objElem["model"] = [];
                    childrenList.sort(this.sortByTabOrder);
                    childrenList.forEach(function (x) {
                        var tempObj = Object.assign({}, objElem);
                        var k = {};
                        k['elementList'] = x.elementList;
                        k['blankModel'] = x.blankModel;
                        k['blankModelConfig'] = x.blankModelConfig;
                        k['modelName'] = x.modelName;
                        k['parentModelName'] = modelName;
                        k['parentModel'] = JSON.stringify(tempObj);
                        elem.childrenArrayList.push(k);
                    });
                }
                elem.viewDetail = false;
                elem.editDetail = false;
                elem.addDetail = false;
                var summaryObject = JSON.parse(JSON.stringify(newObject));
                elem.summaryObject = this.prepareSummaryText(summaryObject, skipList);
                var grandChildren = result.filter(function (x) { return x.type === 'node'; });
                if (grandChildren.length) {
                    grandChildren.forEach(function (z) {
                        _this.processChildren([z]);
                    });
                }
                for (var _i = 0, _a = elem.config.Definitions; _i < _a.length; _i++) {
                    var defn = _a[_i];
                    if (defn.ModelName == modelName) {
                        elem.nodeClass = defn.NodeClass;
                    }
                }
            }
        }
    };
    TreeViewBuilder.prototype.prepareSummaryText = function (inputObject, skipList) {
        var newString = "";
        var modelName;
        var summaryObjectArray = new Array();
        for (var colInd in inputObject) {
            modelName = colInd;
            var obj = inputObject[colInd];
            this.interFormService.injectSkipList(skipList);
            this.test = this.interFormService.cleanObjectForSummary(obj);
        }
        /* for (var ind in this.test){
         newString=newString+ind +': "'+this.test[ind]+'"'+","
         }*/
        var config = this.mainConfig.Definitions.find(function (x) { return x.ModelName === modelName; });
        for (var ind in this.test) {
            if (config.ColumnDefinitions.find(function (x) { return x.dbColumnName === ind; }).isPartOfSummary) {
                summaryObjectArray.push({ lbl: ind, val: this.test[ind] });
            }
        }
        return summaryObjectArray;
    };
    TreeViewBuilder.prototype.showClicked = function () {
        this.showTreeViewdata = true;
        this.maintreeViewInput.visiblePlugin = true;
        this.maintreeViewInput.data = this.formData;
        this.maintreeViewInput.modelName = this.mainConfig.RootModel;
        this.maintreeViewInput.children = this.children;
        this.maintreeViewInput.mainConfig = this.mainConfig;
        this.maintreeViewInput.pageType = 'configPage';
        this.interFormService.treeViewInputArrived.emit(this.maintreeViewInput);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeViewBuilder.prototype, "jsonConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TreeViewBuilder.prototype, "treeViewApiUrl", void 0);
    TreeViewBuilder = __decorate([
        core_1.Component({
            selector: 'treeViewBuilder',
            template: require('./treeView.html')
        }), 
        __metadata('design:paramtypes', [ruleService_1.RuleService, httpAbstract_1.HttpAbstract, matrixService_1.matrixService, interFormsService_1.InterFormsService, navigationService_1.NavigationService, alertService_1.AlertService, apiService_1.ApiService, appSettingsService_1.AppSettingsService])
    ], TreeViewBuilder);
    return TreeViewBuilder;
}());
exports.TreeViewBuilder = TreeViewBuilder;
//# sourceMappingURL=treeViewBuilder.js.map