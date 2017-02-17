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
/**
 * Created by vikhnv2 on 12/2/2016.
 */
var core_1 = require('@angular/core');
var displayGrid_1 = require('../displayGrid/displayGrid');
var CollapsePanel = (function () {
    function CollapsePanel() {
        this.collapsed = true;
        this.enabled = false;
        //
    }
    CollapsePanel.prototype.collapsePanel = function (collapse) {
        this.collapsed = collapse;
    };
    CollapsePanel.prototype.setPanelContent = function (dataGridConfig, dataContent) {
        this.dataContent = dataContent;
        this.enabled = (dataContent && dataContent.length > 0);
        this.dataTable.injectConfigAndData(dataGridConfig, dataContent, null, null);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CollapsePanel.prototype, "key", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CollapsePanel.prototype, "title", void 0);
    __decorate([
        core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], CollapsePanel.prototype, "dataTable", void 0);
    CollapsePanel = __decorate([
        core_1.Component({
            selector: 'collapse-panel',
            template: require('./collapsePanel.html'),
        }), 
        __metadata('design:paramtypes', [])
    ], CollapsePanel);
    return CollapsePanel;
}());
exports.CollapsePanel = CollapsePanel;
//# sourceMappingURL=collapsePanel.component.js.map