"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var pagenotfound_routing_1 = require("./pagenotfound.routing");
var pagenotfound_1 = require("./pagenotfound");
var PageNotFoundModule = (function () {
    function PageNotFoundModule() {
    }
    PageNotFoundModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, pagenotfound_routing_1.PageNotFoundRouting
            ],
            declarations: [pagenotfound_1.PageNotFound],
        }), 
        __metadata('design:paramtypes', [])
    ], PageNotFoundModule);
    return PageNotFoundModule;
}());
exports.PageNotFoundModule = PageNotFoundModule;
//# sourceMappingURL=pagenotfound.module.js.map