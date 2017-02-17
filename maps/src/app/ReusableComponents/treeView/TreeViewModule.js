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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var treeViewBuilder_1 = require("./treeViewBuilder/treeViewBuilder");
var treeViewMain_1 = require("./treeViewMain/treeViewMain");
var treeViewAddEditForm_1 = require("./treeViewAddEditForm/treeViewAddEditForm");
var treeViewChildrenParser_1 = require("./treeViewChildrenParser/treeViewChildrenParser");
var reportBuilder_1 = require("./reportBuilder/reportBuilder");
var SharedModule_1 = require("../SharedModule");
var TreeViewModule = (function () {
    function TreeViewModule() {
    }
    TreeViewModule = __decorate([
        core_1.NgModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, SharedModule_1.SharedModule],
            exports: [treeViewBuilder_1.TreeViewBuilder, treeViewMain_1.treeViewMain, treeViewAddEditForm_1.treeViewAddEditForm, treeViewChildrenParser_1.treeViewChildrenParser, reportBuilder_1.ReportBuilder],
            declarations: [treeViewBuilder_1.TreeViewBuilder, treeViewMain_1.treeViewMain, treeViewAddEditForm_1.treeViewAddEditForm, treeViewChildrenParser_1.treeViewChildrenParser, reportBuilder_1.ReportBuilder],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], TreeViewModule);
    return TreeViewModule;
}());
exports.TreeViewModule = TreeViewModule;
//# sourceMappingURL=TreeViewModule.js.map