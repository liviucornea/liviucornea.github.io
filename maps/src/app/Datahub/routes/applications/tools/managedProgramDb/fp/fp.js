System.register(['@angular/core', "../../../../../../ReusableServices/navigationService", "@angular/common"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, navigationService_1, common_1;
    var MpdbFP;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (navigationService_1_1) {
                navigationService_1 = navigationService_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            MpdbFP = (function () {
                function MpdbFP(navService, location) {
                    this.navService = navService;
                    this.location = location;
                    //navService.setCurrentPage(location.path(false));
                }
                MpdbFP = __decorate([
                    core_1.Component({
                        selector: 'fp',
                        template: "\n    childPage\n"
                    }), 
                    __metadata('design:paramtypes', [navigationService_1.NavigationService, common_1.Location])
                ], MpdbFP);
                return MpdbFP;
            }());
            exports_1("MpdbFP", MpdbFP);
        }
    }
});
//# sourceMappingURL=fp.js.map