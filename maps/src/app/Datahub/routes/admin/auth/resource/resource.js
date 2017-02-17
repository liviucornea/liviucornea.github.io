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
var core_1 = require("@angular/core");
var displayGrid_1 = require("../../../../../ReusableComponents/displayGrid/displayGrid");
var resourceControlConfig_1 = require("./resourceControlConfig");
var adminAuthApiService_1 = require("../adminAuthApiService");
var AuthResource = (function () {
    function AuthResource(adminAuthApiService) {
        this.adminAuthApiService = adminAuthApiService;
        this.controlConfig = resourceControlConfig_1.ResourceControlConfig;
    }
    AuthResource.prototype.ngAfterViewInit = function () {
        this.refreshResources();
    };
    AuthResource.prototype.refreshResources = function () {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.adminAuthApiService, "resource");
    };
    __decorate([
        core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], AuthResource.prototype, "dataTable", void 0);
    AuthResource = __decorate([
        core_1.Component({
            selector: 'authResource',
            template: '<div><displayGrid></displayGrid></div>',
        }), 
        __metadata('design:paramtypes', [adminAuthApiService_1.AdminAuthApiService])
    ], AuthResource);
    return AuthResource;
}());
exports.AuthResource = AuthResource;
//# sourceMappingURL=resource.js.map