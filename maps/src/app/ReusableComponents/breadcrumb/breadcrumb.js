"use strict";
var core_1 = require('@angular/core');
var navigationService_1 = require("../../ReusableServices/navigationService");
var common_1 = require('@angular/common');
var BreadCrumb = (function () {
    function BreadCrumb(navigation, loc) {
        var _this = this;
        this.navigation = navigation;
        this.loc = loc;
        this.navigation.bredCrumbEmitter.subscribe(function (data) {
            _this.breadCrumbList = data;
        });
    }
    BreadCrumb = __decorate([
        core_1.Component({
            selector: 'breadcrumb',
            template: require('./breadcrumb.html'),
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, common_1.Location])
    ], BreadCrumb);
    return BreadCrumb;
}());
exports.BreadCrumb = BreadCrumb;
//# sourceMappingURL=breadcrumb.js.map