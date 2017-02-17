System.register(['@angular/core', "@angular/platform-browser", "../../../../ReusableComponents/SharedModule", "@angular/forms", "./treeViewBuilder", "./treeViewBuilder.routing", "../../../../ReusableComponents/treeView/treeViewMain/treeViewMain", "../../../../ReusableComponents/treeView/treeViewChildrenParser/treeViewChildrenParser", "../../../../ReusableComponents/treeView/treeViewAddEditForm/treeViewAddEditForm", "../../../../ReusableComponents/treeView/reportBuilder/reportBuilder"], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, SharedModule_1, forms_1, treeViewBuilder_1, treeViewBuilder_routing_1, treeViewMain_1, treeViewChildrenParser_1, treeViewAddEditForm_1, reportBuilder_1;
    var TreeViewBuilderModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (SharedModule_1_1) {
                SharedModule_1 = SharedModule_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (treeViewBuilder_1_1) {
                treeViewBuilder_1 = treeViewBuilder_1_1;
            },
            function (treeViewBuilder_routing_1_1) {
                treeViewBuilder_routing_1 = treeViewBuilder_routing_1_1;
            },
            function (treeViewMain_1_1) {
                treeViewMain_1 = treeViewMain_1_1;
            },
            function (treeViewChildrenParser_1_1) {
                treeViewChildrenParser_1 = treeViewChildrenParser_1_1;
            },
            function (treeViewAddEditForm_1_1) {
                treeViewAddEditForm_1 = treeViewAddEditForm_1_1;
            },
            function (reportBuilder_1_1) {
                reportBuilder_1 = reportBuilder_1_1;
            }],
        execute: function() {
            TreeViewBuilderModule = class TreeViewBuilderModule {
            };
            TreeViewBuilderModule = __decorate([
                core_1.NgModule({
                    imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, treeViewBuilder_routing_1.TreeViewBuilderRouting, SharedModule_1.SharedModule],
                    declarations: [treeViewBuilder_1.TreeViewBuilder, treeViewAddEditForm_1.treeViewAddEditForm, treeViewChildrenParser_1.treeViewChildrenParser, treeViewMain_1.treeViewMain, reportBuilder_1.ReportBuilder],
                }), 
                __metadata('design:paramtypes', [])
            ], TreeViewBuilderModule);
            exports_1("TreeViewBuilderModule", TreeViewBuilderModule);
        }
    }
});
//# sourceMappingURL=treeViewBuilder.Module.js.map