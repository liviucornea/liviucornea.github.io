"use strict";
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var localization_routes_1 = require("./localization.routes");
var localization_1 = require("./localization");
var language_Module_1 = require("./language/language.Module");
var valueSet_Module_1 = require("./valueSet/valueSet.Module");
var LocalizationModule = (function () {
    function LocalizationModule() {
    }
    LocalizationModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, forms_1.FormsModule, router_1.RouterModule, SharedModule_1.SharedModule, localization_routes_1.LocalizationRouting, language_Module_1.LanguageModule, valueSet_Module_1.ValueSetModule
            ],
            declarations: [localization_1.Localization]
        }), 
        __metadata('design:paramtypes', [])
    ], LocalizationModule);
    return LocalizationModule;
}());
exports.LocalizationModule = LocalizationModule;
//# sourceMappingURL=localization.Module.js.map