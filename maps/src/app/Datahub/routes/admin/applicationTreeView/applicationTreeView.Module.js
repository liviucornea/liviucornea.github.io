"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var forms_1 = require("@angular/forms");
var applicationTreeView_1 = require("./applicationTreeView");
var applicationTreeView_routing_1 = require("./applicationTreeView.routing");
var TreeViewModule_1 = require("../../../../ReusableComponents/treeView/TreeViewModule");
var ApplicationTreeViewModule = (function () {
    function ApplicationTreeViewModule() {
    }
    ApplicationTreeViewModule = __decorate([
        core_1.NgModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, applicationTreeView_routing_1.ApplicationTreeViewRouting, SharedModule_1.SharedModule, TreeViewModule_1.TreeViewModule],
            declarations: [applicationTreeView_1.ApplicationTreeView],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ApplicationTreeViewModule);
    return ApplicationTreeViewModule;
}());
exports.ApplicationTreeViewModule = ApplicationTreeViewModule;
//# sourceMappingURL=applicationTreeView.Module.js.map