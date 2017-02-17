"use strict";
var core_1 = require("@angular/core");
var displayGrid_1 = require("../../../../../ReusableComponents/displayGrid/displayGrid");
var roleControlConfig_1 = require("./roleControlConfig");
var adminAuthApiService_1 = require("../adminAuthApiService");
var AuthRole = (function () {
    function AuthRole(adminAuthApiService) {
        this.adminAuthApiService = adminAuthApiService;
        this.controlConfig = roleControlConfig_1.RoleControlConfig;
    }
    AuthRole.prototype.ngAfterViewInit = function () {
        this.refreshRoles();
    };
    AuthRole.prototype.refreshRoles = function () {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.adminAuthApiService, "role");
    };
    __decorate([
        core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], AuthRole.prototype, "dataTable", void 0);
    AuthRole = __decorate([
        core_1.Component({
            selector: 'auth',
            template: '<div><displayGrid></displayGrid></div>',
        }), 
        __metadata('design:paramtypes', [adminAuthApiService_1.AdminAuthApiService])
    ], AuthRole);
    return AuthRole;
}());
exports.AuthRole = AuthRole;
//# sourceMappingURL=role.js.map