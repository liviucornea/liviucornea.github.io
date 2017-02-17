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
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var addEditPortfolio_1 = require("./addEditPortfolio/addEditPortfolio");
var ApplicationsCommonModule = (function () {
    function ApplicationsCommonModule() {
    }
    ApplicationsCommonModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule, SharedModule_1.SharedModule
            ],
            exports: [
                addEditPortfolio_1.AddEditPortfolio
            ],
            declarations: [
                addEditPortfolio_1.AddEditPortfolio
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ApplicationsCommonModule);
    return ApplicationsCommonModule;
}());
exports.ApplicationsCommonModule = ApplicationsCommonModule;
//# sourceMappingURL=applicationsComponentsModule.js.map