"use strict";
var core_1 = require('@angular/core');
var pageRedirect_1 = require("./pageRedirect");
var pageredirect_routes_1 = require("./pageredirect.routes");
var PageRedirectModule = (function () {
    function PageRedirectModule() {
    }
    PageRedirectModule = __decorate([
        core_1.NgModule({
            imports: [pageredirect_routes_1.PageRedirectRouting
            ],
            declarations: [pageRedirect_1.PageRedirect]
        }), 
        __metadata('design:paramtypes', [])
    ], PageRedirectModule);
    return PageRedirectModule;
}());
exports.PageRedirectModule = PageRedirectModule;
//# sourceMappingURL=pageRedirect.module.js.map