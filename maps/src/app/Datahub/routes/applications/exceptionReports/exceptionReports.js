"use strict";
var core_1 = require("@angular/core");
var navigationService_1 = require("../../../../ReusableServices/navigationService");
var ExceptionReports = (function () {
    function ExceptionReports(navService) {
        this.navService = navService;
        this.uploadOptions = {};
        this.navService.getChildMenu(['Applications', 'ExceptionReports']);
        this.navService.getLeftMenuRoutes(['ExceptionReports']);
    }
    ExceptionReports.prototype.ngOnInit = function () {
        this.uploadOptions = {
            data: { databaseUpload: true, removeAfterUpload: false },
            allowedExtensions: ['txt', 'xlsx', 'xls'],
            multiple: true,
            maxUploadSize: 20000,
            maxUploads: 2,
            autoUpload: false
        };
    };
    ExceptionReports.prototype.setUploadOptions = function () {
        this.uploadOptions = { fileName: "New File Name.txt" };
    };
    ExceptionReports = __decorate([
        core_1.Component({
            selector: 'exceptionReports',
            template: require('./exceptionReports.html')
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService])
    ], ExceptionReports);
    return ExceptionReports;
}());
exports.ExceptionReports = ExceptionReports;
//# sourceMappingURL=exceptionReports.js.map