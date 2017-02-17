"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_routing_1 = require('./app.routing');
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var SharedModule_1 = require("./ReusableComponents/SharedModule");
var http_1 = require("@angular/http");
var admin_module_1 = require("./Datahub/routes/admin/admin.module");
var home_Module_1 = require("./Datahub/routes/home/home.Module");
var CORSBrowserXHr_1 = require("./CORSBrowserXHr");
var applications_module_1 = require("./Datahub/routes/applications/applications.module");
var accessdenied_module_1 = require("./Datahub/routes/accessdenied/accessdenied.module");
var pagenotfound_module_1 = require("./Datahub/routes/pagenotfound/pagenotfound.module");
var pageRedirect_module_1 = require("./Datahub/routes/pageRedirect/pageRedirect.module");
var dashboard_module_1 = require("./Datahub/routes/dashboard/dashboard.module");
var userProfile_module_1 = require('./Datahub/routes/userProfile/userProfile.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule, http_1.HttpModule,
                forms_1.FormsModule, router_1.RouterModule,
                app_routing_1.routing, SharedModule_1.SharedModule, home_Module_1.HomeModule, admin_module_1.AdminModule, applications_module_1.ApplicationsModule, accessdenied_module_1.AccessDeniedModule, pagenotfound_module_1.PageNotFoundModule, pageRedirect_module_1.PageRedirectModule, dashboard_module_1.DashboardModule, userProfile_module_1.UserProfileModule
            ],
            declarations: [app_component_1.AppComponent],
            providers: [{ provide: http_1.BrowserXhr, useClass: CORSBrowserXHr_1.CORSBrowserXHr }],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map