System.register(['@angular/core', "./tabDemoConfig", "../../../../../ReusableComponents/tabBuilder/tabBuilder", "../../../../../ReusableServices/apiService", "../../../../../ReusableServices/matrixService", "../../../../../ReusableServices/alertService"], function(exports_1, context_1) {
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
    var core_1, tabDemoConfig_1, tabBuilder_1, apiService_1, matrixService_1, alertService_1;
    var TabDemo;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tabDemoConfig_1_1) {
                tabDemoConfig_1 = tabDemoConfig_1_1;
            },
            function (tabBuilder_1_1) {
                tabBuilder_1 = tabBuilder_1_1;
            },
            function (apiService_1_1) {
                apiService_1 = apiService_1_1;
            },
            function (matrixService_1_1) {
                matrixService_1 = matrixService_1_1;
            },
            function (alertService_1_1) {
                alertService_1 = alertService_1_1;
            }],
        execute: function() {
            TabDemo = (function () {
                function TabDemo(apiService, vmMatrix, alert) {
                    this.apiService = apiService;
                    this.vmMatrix = vmMatrix;
                    this.alert = alert;
                    this.tabsListData = [];
                    this.tabControlConfig = tabDemoConfig_1.TabDemoMainControlConfig;
                    this.gettabsData();
                }
                TabDemo.prototype.gettabsData = function () {
                    var _this = this;
                    this.tabControlConfig.TabsList.forEach(function (x) {
                        _this.tabsListData.push({
                            TabKey: x.TabKey,
                            TabName: x.TabName
                        });
                    });
                };
                TabDemo.prototype.showSpecificTab = function (tabData) {
                    var _this = this;
                    var urlList = [];
                    if (this.tabBuilderControl) {
                        var tabInfo = this.tabControlConfig.TabsList.find(function (p) { return p.TabKey == tabData.TabKey; });
                        tabInfo.TabControls.forEach(function (x) {
                            x.httpProxy = _this.apiService;
                            x.gridSettings.ColumnConfiguration.forEach(function (p) {
                                if (p.dataSourceAddress) {
                                    urlList.push({
                                        url: p.dataSourceAddress.tableName,
                                        body: p.dataSourceAddress.dbParameters
                                    });
                                }
                            });
                        });
                        if (urlList) {
                            var index = -1;
                            this.apiService.fetchMultipleListWithBody(urlList).subscribe(function (res) {
                                tabInfo.TabControls.forEach(function (x) {
                                    x.httpProxy = _this.apiService;
                                    x.gridSettings.ColumnConfiguration.forEach(function (p) {
                                        if (p.dataSourceAddress) {
                                            ++index;
                                            p.dataSource = res[index];
                                        }
                                    });
                                });
                                _this.displayTabInfo(tabInfo);
                            }, function (error) {
                                _this.alert.error("Error in retrieving drop down info" + error.status);
                            }, function () { });
                        }
                        else {
                            this.displayTabInfo(tabInfo);
                        }
                    }
                };
                TabDemo.prototype.displayTabInfo = function (tabInfo) {
                    var tempObj = tabInfo.TabControls.find(function (c) { return c.ComponentName == 'alert'; });
                    if (tempObj) {
                        var headerForDataTable = this.vmMatrix.extractHeader([], tempObj.gridSettings);
                        tempObj.data = this.vmMatrix.addMatrix(headerForDataTable, tempObj.gridSettings);
                    }
                    this.tabBuilderControl.displayTabInfo(tabInfo);
                };
                TabDemo.prototype.doActionfromChildTab = function (outputData) {
                    var updatedControlsList = [];
                    if (outputData.TabKey.toLowerCase() == 'menu') {
                        var tabInfo = this.tabControlConfig.TabsList.find(function (p) { return p.TabKey == outputData.TabKey; });
                        tabInfo.TabControls.forEach(function (x) {
                            if (x.ComponentName.toLowerCase() == 'menuitem') {
                                if (outputData.updatedValue.customButton.Name.toLowerCase() == 'publish') {
                                    x.ShowDefault = true;
                                    updatedControlsList.push(x);
                                }
                                else {
                                    x.ShowDefault = false;
                                    updatedControlsList.push(x);
                                }
                            }
                        });
                    }
                    if (updatedControlsList.length) {
                        this.tabBuilderControl.LoadSpecificTabsByUpdate(updatedControlsList);
                    }
                };
                __decorate([
                    core_1.ViewChild(tabBuilder_1.TabBuilder), 
                    __metadata('design:type', tabBuilder_1.TabBuilder)
                ], TabDemo.prototype, "tabBuilderControl", void 0);
                TabDemo = __decorate([
                    core_1.Component({
                        selector: 'tabDemo',
                        templateUrl: '../../../../..//Datahub/routes/admin/Demo/tabDemo/tabDemo.html',
                    }), 
                    __metadata('design:paramtypes', [apiService_1.ApiService, matrixService_1.matrixService, alertService_1.AlertService])
                ], TabDemo);
                return TabDemo;
            }());
            exports_1("TabDemo", TabDemo);
        }
    }
});
//# sourceMappingURL=tabDemo.js.map