System.register(["@angular/core", "@angular/router", "../../../pipes/tokenFilter", "../../../../ReusableComponents/displayGrid/displayGrid", "../../../../ReusableServices/apiService", "../../../../ReusableServices/alertService", "../../../../ReusableServices/componentsConfigService", "../../../../ReusableComponents/navbarVert/navbarVert"], function(exports_1, context_1) {
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
    var core_1, router_1, tokenFilter_1, displayGrid_1, apiService_1, alertService_1, componentsConfigService_1, navbarVert_1;
    var AuthRole;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (tokenFilter_1_1) {
                tokenFilter_1 = tokenFilter_1_1;
            },
            function (displayGrid_1_1) {
                displayGrid_1 = displayGrid_1_1;
            },
            function (apiService_1_1) {
                apiService_1 = apiService_1_1;
            },
            function (alertService_1_1) {
                alertService_1 = alertService_1_1;
            },
            function (componentsConfigService_1_1) {
                componentsConfigService_1 = componentsConfigService_1_1;
            },
            function (navbarVert_1_1) {
                navbarVert_1 = navbarVert_1_1;
            }],
        execute: function() {
            AuthRole = (function () {
                function AuthRole(ap, alt, componentsConfigService) {
                    this.ap = ap;
                    this.alt = alt;
                    this.componentsConfigService = componentsConfigService;
                    this.newRole = {};
                    this.searchKey = "";
                    this.childConfig = this.componentsConfigService.AuthRoleControlConfig.theChild;
                    this.controlConfig = this.componentsConfigService.AuthRoleControlConfig.theParent;
                    this.api = ap;
                    this.alert = alt;
                }
                AuthRole.prototype.ngAfterViewInit = function () {
                    this.refreshRoles();
                };
                AuthRole.prototype.refreshRoles = function () {
                    this.dataTable.GetParentPageDetails(this.controlConfig, this.api, "role");
                };
                __decorate([
                    core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
                    __metadata('design:type', displayGrid_1.DisplayGridComponent)
                ], AuthRole.prototype, "dataTable", void 0);
                AuthRole = __decorate([
                    core_1.Component({
                        selector: 'auth',
                        template: '<div><displayGrid></displayGrid></div>',
                        directives: [displayGrid_1.DisplayGridComponent, router_1.RouterLink, router_1.RouterOutlet, navbarVert_1.NavBarVert],
                        pipes: [tokenFilter_1.TokenFilterPipe],
                    }), 
                    __metadata('design:paramtypes', [apiService_1.ApiService, alertService_1.AlertService, componentsConfigService_1.ComponentsConfigService])
                ], AuthRole);
                return AuthRole;
            }());
            exports_1("AuthRole", AuthRole);
        }
    }
});
//# sourceMappingURL=role.js.map