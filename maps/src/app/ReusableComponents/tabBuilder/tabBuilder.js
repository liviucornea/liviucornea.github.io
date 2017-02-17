"use strict";
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