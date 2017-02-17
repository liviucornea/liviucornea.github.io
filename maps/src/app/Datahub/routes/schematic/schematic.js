System.register(['@angular/core', '@angular/router', "../../../ReusableComponents/navbarVert/navbarVert", "../../../ReusableServices/navigationService"], function(exports_1, context_1) {
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
    var core_1, router_1, navbarVert_1, navigationService_1;
    var Schematic;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (navbarVert_1_1) {
                navbarVert_1 = navbarVert_1_1;
            },
            function (navigationService_1_1) {
                navigationService_1 = navigationService_1_1;
            }],
        execute: function() {
            Schematic = (function () {
                function Schematic(navService) {
                    this.navService = navService;
                    this.navService.getLeftMenuRoutes('Schematic');
                }
                Schematic = __decorate([
                    core_1.Component({
                        selector: 'schematic',
                        templateUrl: '../../..//Datahub/routes/schematic/schematic.html',
                        directives: [router_1.RouterOutlet, navbarVert_1.NavBarVert],
                    }), 
                    __metadata('design:paramtypes', [navigationService_1.NavigationService])
                ], Schematic);
                return Schematic;
            }());
            exports_1("Schematic", Schematic);
        }
    }
});
//# sourceMappingURL=schematic.js.map