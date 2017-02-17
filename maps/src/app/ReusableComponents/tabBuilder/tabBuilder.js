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
var interFormsService_1 = require("../../ReusableServices/interFormsService");
var TabBuilder = (function () {
    function TabBuilder(intFormSvc) {
        this.intFormSvc = intFormSvc;
        this.tabEmitter = new core_1.EventEmitter();
        this.tabContentEmitter = new core_1.EventEmitter();
        this.showTabHeaders = false;
        this.pageControls = [];
        this.tabs = [];
        this.messages = [];
    }
    TabBuilder.prototype.ngOnInit = function () {
        if (this.tabsList && this.tabsList.length) {
            if (this.tabsList.length > 1) {
                this.showTabHeaders = true;
            }
            this.buildTabs();
            this.childClicked(this.tabs[0]);
        }
    };
    TabBuilder.prototype.buildTabs = function () {
        var _this = this;
        if (this.tabsList && this.tabsList.length) {
            this.tabsList.forEach(function (x) {
                _this.tabs.push({
                    TabKey: x.TabKey,
                    TabName: x.TabName,
                    activeClassChild: "",
                    visible: false
                });
            });
        }
    };
    TabBuilder.prototype.childClicked = function (tabData) {
        this.selectedTab = tabData;
        this.tabs.forEach(function (x) {
            x.activeClassChild = "";
            x.visible = false;
        });
        this.tabEmitter.emit({
            TabKey: tabData.TabKey
        });
    };
    TabBuilder.prototype.displayTabInfo = function (incomingTabInfo) {
        var _this = this;
        var tempTabData = this.tabs.find(function (p) { return p.TabKey == incomingTabInfo.TabKey; });
        tempTabData.activeClassChild = "active";
        tempTabData.visible = true;
        this.pageControls = [];
        this.messages = [];
        incomingTabInfo.TabControls.forEach(function (x) {
            _this.pageControls.push(x);
        });
        this.intFormSvc.stopSpinner();
    };
    TabBuilder.prototype.updateDataFromComponents = function (outputValue, componentName) {
        //TODO: Balaji
        // this.intFormSvc.spinnerRunning = true;
        this.tabContentEmitter.emit({
            updatedValue: outputValue,
            ComponentName: componentName,
            TabKey: this.selectedTab.TabKey
        });
    };
    TabBuilder.prototype.LoadSpecificTabsByUpdate = function (incomingTabsList) {
        var _this = this;
        if (this.pageControls && this.pageControls.length) {
            incomingTabsList.forEach(function (x) {
                var index = _this.pageControls.findIndex(function (p) { return p.ComponentName == x.ComponentName; });
                if (index >= 0) {
                    _this.pageControls[index] = x;
                }
            });
        }
        this.intFormSvc.stopSpinner();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TabBuilder.prototype, "tabsList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TabBuilder.prototype, "tabEmitter", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TabBuilder.prototype, "tabContentEmitter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TabBuilder.prototype, "messages", void 0);
    TabBuilder = __decorate([
        core_1.Component({
            selector: 'tabBuilder',
            template: require('./tabBuilder.html'),
        }), 
        __metadata('design:paramtypes', [interFormsService_1.InterFormsService])
    ], TabBuilder);
    return TabBuilder;
}());
exports.TabBuilder = TabBuilder;
//# sourceMappingURL=tabBuilder.js.map