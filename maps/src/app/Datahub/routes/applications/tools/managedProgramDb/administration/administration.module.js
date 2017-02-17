"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var administration_routes_1 = require("./administration.routes");
var administration_1 = require("./administration");
var MpdbAdministrationModule = (function () {
    function MpdbAdministrationModule() {
    }
    MpdbAdministrationModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, administration_routes_1.MpdbAdministrationRouting
            ],
            declarations: [administration_1.MpdbAdministration],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], MpdbAdministrationModule);
    return MpdbAdministrationModule;
}());
exports.MpdbAdministrationModule = MpdbAdministrationModule;
//# sourceMappingURL=administration.module.js.map