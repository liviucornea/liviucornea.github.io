"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var navigationService_1 = require("../../../ReusableServices/navigationService");
var apiService_1 = require("../../../ReusableServices/apiService");
var Admin = (function () {
    function Admin(apiService, navService, location) {
        this.apiService = apiService;
        this.navService = navService;
        this.location = location;
        apiService.setApplicationsBaseUrl();
    }
    Admin = __decorate([
        core_1.Component({
            selector: 'admin',
            template: "",
        }), 
        __metadata('design:paramtypes', [apiService_1.ApiService, navigationService_1.NavigationService, common_1.Location])
    ], Admin);
    return Admin;
}());
exports.Admin = Admin;
//# sourceMappingURL=admin.js.map