System.register(['@angular/core', '@angular/router', "../../ReusableServices/RouterService", "../../ReusableComponents/navbarVert/navbarVert", "../../ReusableServices/navigationService", "../../ReusableServices/httpAbstract", "../../ReusableServices/crudService", "../../ReusableServices/matrixService", "../../ReusableServices/miniMatrixService"], function(exports_1, context_1) {
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
    var core_1, router_1, RouterService_1, navbarVert_1, navigationService_1, httpAbstract_1, crudService_1, matrixService_1, miniMatrixService_1;
    var Home;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (RouterService_1_1) {
                RouterService_1 = RouterService_1_1;
            },
            function (navbarVert_1_1) {
                navbarVert_1 = navbarVert_1_1;
            },
            function (navigationService_1_1) {
                navigationService_1 = navigationService_1_1;
            },
            function (httpAbstract_1_1) {
                httpAbstract_1 = httpAbstract_1_1;
            },
            function (crudService_1_1) {
                crudService_1 = crudService_1_1;
            },
            function (matrixService_1_1) {
                matrixService_1 = matrixService_1_1;
            },
            function (miniMatrixService_1_1) {
                miniMatrixService_1 = miniMatrixService_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(rt, nav, http, cr, mat, mm) {
                    this.rt = rt;
                    this.nav = nav;
                    this.http = http;
                    this.cr = cr;
                    this.mat = mat;
                    this.mm = mm;
                    this.nav.getLeftMenuRoutes('Home');
                }
                Home = __decorate([
                    core_1.Component({
                        //moduleId: module.id,
                        selector: 'datahub',
                        template: '<navBarVert></navBarVert>',
                        directives: [router_1.ROUTER_DIRECTIVES, navbarVert_1.NavBarVert],
                    }), 
                    __metadata('design:paramtypes', [RouterService_1.RouterService, navigationService_1.NavigationService, httpAbstract_1.HttpAbstract, crudService_1.crudService, matrixService_1.matrixService, miniMatrixService_1.MiniMatrixService])
                ], Home);
                return Home;
            }());
            exports_1("Home", Home);
        }
    }
});
//# sourceMappingURL=home.js.map