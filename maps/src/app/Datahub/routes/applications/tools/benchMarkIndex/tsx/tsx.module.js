"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var tsx_routes_1 = require("./tsx.routes");
var tsx_1 = require("./tsx");
var BmiTsxModule = (function () {
    function BmiTsxModule() {
    }
    BmiTsxModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, tsx_routes_1.BmiTsxRouting
            ],
            declarations: [tsx_1.BmiTsx],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BmiTsxModule);
    return BmiTsxModule;
}());
exports.BmiTsxModule = BmiTsxModule;
//# sourceMappingURL=tsx.module.js.map