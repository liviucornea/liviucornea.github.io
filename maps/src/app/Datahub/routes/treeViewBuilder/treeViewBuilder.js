System.register(['@angular/core', "../../../ReusableServices/matrixService", "../../../ReusableServices/interFormsService", "./treeViewApiMock", "./treeViewMainConfig", "../../../ReusableServices/httpAbstract", "../../../ReusableComponents/treeView/treeViewMain/treeViewMain"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, matrixService_1, interFormsService_1, treeViewApiMock_1, treeViewMainConfig_1, httpAbstract_1, treeViewMain_1;
    var treeViewBuilder;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (matrixService_1_1) {
                matrixService_1 = matrixService_1_1;
            },
            function (interFormsService_1_1) {
                interFormsService_1 = interFormsService_1_1;
            },
            function (treeViewApiMock_1_1) {
                treeViewApiMock_1 = treeViewApiMock_1_1;
            },
            function (treeViewMainConfig_1_1) {
                treeViewMainConfig_1 = treeViewMainConfig_1_1;
            },
            function (httpAbstract_1_1) {
                httpAbstract_1 = httpAbstract_1_1;
            },
            function (treeViewMain_1_1) {
                treeViewMain_1 = treeViewMain_1_1;
            }],
        execute: function() {
            treeViewBuilder = (function () {
                function treeViewBuilder(httpProx, vmMatrix, elementRef, interFormsService) {
                    this.httpProx = httpProx;
                    this.vmMatrix = vmMatrix;
                    this.elementRef = elementRef;
                    this.interFormsService = interFormsService;
                    this.editAddClicked = true;
                    this.grandParentLevel = 0;
                    this.showVisiblePlugin = false;
                    //this.dc=dcl;
                    this.elemRef = elementRef;
                    this.apiResult = treeViewApiMock_1.treeViewApiMock;
                    this.matrixService = vmMatrix;
                    this.mainConfig = treeViewMainConfig_1.treeViewMainConfig;
                    this.interFormService = interFormsService;
                    this.httpProxy = httpProx;
                    var deleteAddEditCb = this.deleteAddEditCalled;
                    var deleteAddEditCompleteCb = this.deleteAddEditCallCompleted;
                    ;
                    var that = this;
                    this.interFormService.formBuilderDeleteNotifier.subscribe(function (x) {
                        deleteAddEditCb(that);
                    });
                    this.interFormService.formBuilderAddNotifier.subscribe(function (x) {
                        deleteAddEditCb(that);
                    });
                    this.interFormService.formBuilderEditNotifier.subscribe(function (x) {
                        deleteAddEditCb(that);
                    });
                    this.interFormService.addEditCompleted.subscribe(function (x) {
                        deleteAddEditCompleteCb(that);
                    });
                    that.loadTreeView(that, that.apiResult, true);
                    /* this.httpProxy.fetch("/treemodel/customer/1").subscribe((x)=>{
                         /!*if (x){
                             that.loadTreeView(that,JSON.parse(x));
                         }
                         else *!/
                         {
                         }
                     });*/
                }
                treeViewBuilder.prototype.loadTreeView = function (context, input, firstLoad) {
                    context.vmMatrix.resetTreeViewBlockCount();
                    var finalResult = context.matrixService.extractNodes(input, context.mainConfig);
                    var result = finalResult.treeArray;
                    var skipList = finalResult.skipList;
                    context.interFormService.setSkipList(skipList);
                    context.children = result.filter(function (x) { return x.type === 'node'; });
                    var mainPageObject = result.filter(function (x) { return x.type === 'leaf'; });
                    var mainPageObjectArray = new Array();
                    mainPageObjectArray.push(mainPageObject[0].mainPageObject);
                    context.mainPage = context.vmMatrix.extractMatrixNew(skipList, mainPageObject[0].modelName, mainPageObjectArray, context.mainConfig);
                    context.mainHeader = context.vmMatrix.extractHeaderNew(skipList, mainPageObject[0].modelName, mainPageObjectArray, context.mainConfig);
                    context.formData = context.vmMatrix.editMatrixNew(skipList, mainPageObject[0].modelName, context.mainPage[0].cells, context.mainHeader, context.mainConfig);
                    context.processChildren(context.children);
                };
                treeViewBuilder.prototype.deleteAddEditCalled = function (context) {
                    var blank = new Array();
                    var opMode = context.interFormService.addEditDeleteMode;
                    context.component.instance.injectDataAndConfigAndChildren({ data: blank, modelName: context.mainConfig.RootModel }, blank, context.mainConfig, "");
                    if (opMode === "delete") {
                        context.deleteAddEditCallCompleted(context);
                    }
                };
                treeViewBuilder.prototype.deleteAddEditCallCompleted = function (context) {
                    context.interFormService.cleanApi(context.apiResult);
                    if (context.interFormService.addEditDeleteMode === "delete") {
                        this.deletedObject = undefined;
                        context.softDelete(context.apiResult);
                    }
                    context.loadTreeView(context, context.apiResult, false);
                };
                treeViewBuilder.prototype.softDelete = function (inputObj) {
                    this.findDeletedObj(inputObj);
                    if (this.deletedObject) {
                        this.removeObjectFromInput(inputObj);
                    }
                };
                treeViewBuilder.prototype.removeObjectFromInput = function (input) {
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
                treeViewBuilder.prototype.findDeletedObj = function (input) {
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
                treeViewBuilder.prototype.processChildren = function (kids) {
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
                            //var result = this.matrixService.extractNodes(newObject).treeArray;
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
                            if (childrenList.length) {
                                elem.elementList = childrenList[0].elementList;
                                elem.blankModel = childrenList[0].blankModel;
                                elem.blankModelConfig = childrenList[0].blankModelConfig;
                                elem.modelName = childrenList[0].name;
                            }
                            elem.viewDetail = false;
                            var summaryObject = JSON.parse(JSON.stringify(newObject));
                            elem.summaryObject = this.prepareSummaryText(summaryObject, skipList);
                            var grandChildren = result.filter(function (x) { return x.type === 'node'; });
                            if (grandChildren.length) {
                                grandChildren.forEach(function (z) {
                                    _this.processChildren([z]);
                                });
                            }
                            // set the nodeClass of this element to be the same as its parent by searching for the Model Name
                            for (var _i = 0, _a = elem.config.Definitions; _i < _a.length; _i++) {
                                var defn = _a[_i];
                                if (defn.ModelName == modelName) {
                                    elem.nodeClass = defn.NodeClass;
                                }
                            }
                        }
                    }
                };
                treeViewBuilder.prototype.prepareSummaryText = function (inputObject, skipList) {
                    var newString = "";
                    for (var colInd in inputObject) {
                        var obj = inputObject[colInd];
                        this.interFormService.injectSkipList(skipList);
                        this.test = this.interFormService.cleanObjectForSummary(obj);
                    }
                    for (var ind in this.test) {
                        newString = newString + ind + ': "' + this.test[ind] + '"' + ",";
                    }
                    return newString;
                };
                treeViewBuilder.prototype.showClicked = function () {
                    this.treeViewMainComponent.injectDataAndConfigAndChildren({ data: this.formData, modelName: this.mainConfig.RootModel }, this.children, this.mainConfig, 'configPage');
                    this.showVisiblePlugin = true;
                };
                __decorate([
                    core_1.ViewChild(treeViewMain_1.treeViewMain), 
                    __metadata('design:type', treeViewMain_1.treeViewMain)
                ], treeViewBuilder.prototype, "treeViewMainComponent", void 0);
                treeViewBuilder = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: '../../..//Datahub/routes/treeViewBuilder/treeView.html',
                        directives: [treeViewMain_1.treeViewMain]
                    }), 
                    __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract, matrixService_1.matrixService, core_1.ElementRef, interFormsService_1.InterFormsService])
                ], treeViewBuilder);
                return treeViewBuilder;
            }());
            exports_1("treeViewBuilder", treeViewBuilder);
        }
    }
});
//# sourceMappingURL=treeViewBuilder.js.map