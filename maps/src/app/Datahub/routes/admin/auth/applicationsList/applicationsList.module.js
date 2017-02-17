"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var applicationsList_routes_1 = require("./applicationsList.routes");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var applicationsList_1 = require("./applicationsList");
var ApplicationsListModule = (function () {
    function ApplicationsListModule() {
    }
    ApplicationsListModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, applicationsList_routes_1.ApplicationsListRouting, SharedModule_1.SharedModule],
            declarations: [applicationsList_1.ApplicationsList],
        }), 
        __metadata('design:paramtypes', [])
    ], ApplicationsListModule);
    return ApplicationsListModule;
}());
exports.ApplicationsListModule = ApplicationsListModule;
//# sourceMappingURL=applicationsList.module.js.map