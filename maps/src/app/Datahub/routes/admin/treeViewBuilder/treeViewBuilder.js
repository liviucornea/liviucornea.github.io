System.register(['@angular/core', "../../../../ReusableServices/matrixService", "../../../../ReusableServices/interFormsService", "./treeViewMainConfig", "../../../../ReusableServices/httpAbstract", "../../../../ReusableServices/ruleService", "./ruleConfiguration", "../../../../ReusableServices/navigationService"], function(exports_1, context_1) {
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
    var core_1, matrixService_1, interFormsService_1, treeViewMainConfig_1, httpAbstract_1, ruleService_1, ruleConfiguration_1, navigationService_1;
    var TreeViewBuilder;
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
            function (treeViewMainConfig_1_1) {
                treeViewMainConfig_1 = treeViewMainConfig_1_1;
            },
            function (httpAbstract_1_1) {
                httpAbstract_1 = httpAbstract_1_1;
            },
            function (ruleService_1_1) {
                ruleService_1 = ruleService_1_1;
            },
            function (ruleConfiguration_1_1) {
                ruleConfiguration_1 = ruleConfiguration_1_1;
            },
            function (navigationService_1_1) {
                navigationService_1 = navigationService_1_1;
            }],
        execute: function() {
            TreeViewBuilder = class TreeViewBuilder {
                constructor(ruleSrv, httpProx, vmMatrix, interFormsService, navService) {
                    this.ruleSrv = ruleSrv;
                    this.httpProx = httpProx;
                    this.vmMatrix = vmMatrix;
                    this.interFormsService = interFormsService;
                    this.navService = navService;
                    this.editAddClicked = true;
                    this.grandParentLevel = 0;
                    this.navService.getChildMenu(['Admin', 'treeViewBuilder']);
                    this.navService.getLeftMenuRoutes(['treeViewBuilder']);
                    this.ruleService = ruleSrv;
                    //this.apiResult=treeViewApiMock;
                    this.matrixService = vmMatrix;
                    this.mainConfig = treeViewMainConfig_1.treeViewMainConfig;
                    this.ruleConfig = ruleConfiguration_1.ruleConfig;
                    this.interFormService = interFormsService;
                    this.httpProxy = httpProx;
                    this.maintreeViewInput = Object.create(Object.prototype);
                    this.maintreeViewInput.visiblePlugin = false;
                    this.maintreeViewInput.gridSettings = this.mainConfig;
                    this.maintreeViewInput.pluginInput = this.apiResult;
                    let deleteAddEditCb = this.deleteAddEditCalled;
                    let deleteAddEditCompleteCb = this.deleteAddEditCallCompleted;
                    ;
                    let that = this;
                    this.interFormService.formBuilderDeleteNotifier.subscribe(x => {
                        deleteAddEditCb(that);
                    });
                    this.interFormService.formBuilderAddNotifier.subscribe(x => {
                        deleteAddEditCb(that);
                    });
                    this.interFormService.formBuilderEditNotifier.subscribe(x => {
                        deleteAddEditCb(that);
                    });
                    this.interFormService.addEditCompleted.subscribe(x => {
                        deleteAddEditCompleteCb(that);
                    });
                    this.httpProxy.fetch("/treemodel/customer/1").subscribe((x) => {
                        if (x) {
                            this.apiResult = JSON.parse(x);
                            //this.apiResult=treeViewApiMock;
                            that.loadTreeView(that, this.apiResult, true);
                            this.ruleErrors = "Success!";
                            this.ruleConfig.forEach(x => {
                                var ruleType = x.ruleType;
                                var columnNames = x.ruleAssociates;
                                var applicationMode = x.applyTo;
                                var modelName = x.apiObject;
                                that.ruleService.associateRule(ruleType, columnNames);
                                var result = that.ruleService.validateRules(that.apiResult, modelName, ruleType, applicationMode);
                                if (!result.hasErrors) {
                                    this.ruleErrors = result.errorMessage;
                                }
                            });
                        }
                    });
                }
                loadTreeView(context, input, firstLoad) {
                    context.vmMatrix.resetTreeViewBlockCount();
                    var finalResult = context.matrixService.extractNodes(input, context.mainConfig);
                    var result = finalResult.treeArray;
                    var skipList = finalResult.skipList;
                    context.interFormService.setSkipList(skipList);
                    context.children = result.filter(x => x.type === 'node');
                    var mainPageObject = result.filter(x => x.type === 'leaf');
                    var mainPageObjectArray = new Array();
                    mainPageObjectArray.push(mainPageObject[0].mainPageObject);
                    context.mainPage = context.vmMatrix.extractMatrixNew(skipList, mainPageObject[0].modelName, mainPageObjectArray, context.mainConfig);
                    context.mainHeader = context.vmMatrix.extractHeaderNew(skipList, mainPageObject[0].modelName, mainPageObjectArray, context.mainConfig);
                    context.formData = context.vmMatrix.editMatrixNew(skipList, mainPageObject[0].modelName, context.mainPage[0].cells, context.mainHeader, context.mainConfig);
                    context.processChildren(context.children);
                }
                deleteAddEditCalled(context) {
                    var blank = new Array();
                    var opMode = context.interFormService.addEditDeleteMode;
                    //context.component.instance.injectDataAndConfigAndChildren({data:blank, modelName:context.mainConfig.RootModel}, blank,context.mainConfig,"");
                    if (opMode === "delete") {
                        context.deleteAddEditCallCompleted(context);
                    }
                }
                deleteAddEditCallCompleted(context) {
                    context.interFormService.cleanApi(context.apiResult);
                    context.httpProxy.insert("/treemodel/customer/1", JSON.stringify(context.apiResult)).subscribe((x) => {
                        if (x) {
                            context.httpProxy.fetch("/treemodel/customer/1").subscribe((x) => {
                                if (x) {
                                    context.loadTreeView(context, JSON.parse(x), false);
                                }
                            });
                        }
                    });
                    /*if (context.interFormService.addEditDeleteMode==="delete") {
                     this.deletedObject = undefined;
                     context.softDelete(context.apiResult);
                     }*/
                }
                softDelete(inputObj) {
                    this.findDeletedObj(inputObj);
                    if (this.deletedObject) {
                        this.removeObjectFromInput(inputObj);
                    }
                }
                removeObjectFromInput(input) {
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
                }
                findDeletedObj(input) {
                    var lookup = input.Action;
                    if (lookup) {
                        if (lookup === "Deleted") {
                            this.deletedObject = input;
                        }
                    }
                    for (var colInd in input) {
                        var obj = input[colInd];
                        if (Object.prototype.toString.call(obj) === '[object Array]') {
                            obj.forEach(x => this.findDeletedObj(x));
                        }
                        if (Object.prototype.toString.call(obj) === '[object Object]') {
                            this.findDeletedObj(obj);
                        }
                    }
                }
                processChildren(kids) {
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
                            var mainPageObject = result.filter(xx => xx.type === 'leaf');
                            var childrenList = result.filter(xx => xx.type === 'node');
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
                            elem.editDetail = false;
                            elem.addDetail = false;
                            var summaryObject = JSON.parse(JSON.stringify(newObject));
                            elem.summaryObject = this.prepareSummaryText(summaryObject, skipList);
                            var grandChildren = result.filter(x => x.type === 'node');
                            if (grandChildren.length) {
                                grandChildren.forEach(z => {
                                    this.processChildren([z]);
                                });
                            }
                            for (var defn of elem.config.Definitions) {
                                if (defn.ModelName == modelName) {
                                    elem.nodeClass = defn.NodeClass;
                                }
                            }
                        }
                    }
                }
                prepareSummaryText(inputObject, skipList) {
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
                    var config = this.mainConfig.Definitions.find(x => x.ModelName === modelName);
                    for (var ind in this.test) {
                        if (config.ColumnDefinitions.find(x => x.dbColumnName === ind).isPartOfSummary) {
                            summaryObjectArray.push({ lbl: ind, val: this.test[ind] });
                        }
                    }
                    return summaryObjectArray;
                }
                showClicked() {
                    this.maintreeViewInput.visiblePlugin = true;
                    this.maintreeViewInput.data = this.formData;
                    this.maintreeViewInput.modelName = this.mainConfig.RootModel;
                    this.maintreeViewInput.children = this.children;
                    this.maintreeViewInput.mainConfig = this.mainConfig;
                    this.maintreeViewInput.pageType = 'configPage';
                    this.interFormService.treeViewInputArrived.emit(this.maintreeViewInput);
                }
            };
            TreeViewBuilder = __decorate([
                core_1.Component({
                    selector: 'login',
                    templateUrl: '../../../..//Datahub/routes/admin/treeViewBuilder/treeView.html',
                }), 
                __metadata('design:paramtypes', [ruleService_1.RuleService, httpAbstract_1.HttpAbstract, matrixService_1.matrixService, interFormsService_1.InterFormsService, navigationService_1.NavigationService])
            ], TreeViewBuilder);
            exports_1("TreeViewBuilder", TreeViewBuilder);
        }
    }
});
//# sourceMappingURL=treeViewBuilder.js.map