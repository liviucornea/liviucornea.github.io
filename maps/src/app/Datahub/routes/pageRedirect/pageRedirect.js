"use strict";
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var PageRedirect = (function () {
    function PageRedirect(router, activatedRoute) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.activatedRoute.params.forEach(function (params) {
            var path = params['path'];
            _this.router.navigateByUrl(path);
        });
    }
    PageRedirect = __decorate([
        core_1.Component({
            selector: 'pageRedirect',
            template: ''
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
    ], PageRedirect);
    return PageRedirect;
}());
exports.PageRedirect = PageRedirect;
//# sourceMappingURL=pageRedirect.js.map