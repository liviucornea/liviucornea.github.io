"use strict";
var core_1 = require('@angular/core');
var navigationService_1 = require("../../../ReusableServices/navigationService");
var apiService_1 = require("../../../ReusableServices/apiService");
var Applications = (function () {
    function Applications(navService, apiService) {
        this.navService = navService;
        this.apiService = apiService;
    }
    Applications.prototype.ngOnDestroy = function () {
        this.apiService.setApplicationsBaseUrl();
    };
    Applications = __decorate([
        core_1.Component({
            selector: 'applications',
            template: ""
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, apiService_1.ApiService])
    ], Applications);
    return Applications;
}());
exports.Applications = Applications;
//# sourceMappingURL=applications.js.map