"use strict";
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