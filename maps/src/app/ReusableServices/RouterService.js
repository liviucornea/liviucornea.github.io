System.register(["@angular/core"], function(exports_1, context_1) {
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
    var core_1;
    var RouterService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            RouterService = (function () {
                function RouterService() {
                    this.OnNavContentChange = new core_1.EventEmitter();
                    /* this.alert = altService;
                     this.appSettingsService = appSettingsSrv;*/
                    console.log('hi');
                    this.nameExpression = /^[A-Z][a-zA-Z ]{3,}$/;
                    this.routerLinkExpression = /^[A-Z][a-zA-Z ]{3,}$/;
                    this.pathExpression = /^\/[a-zA-Z ]{3,}$/;
                    this.roleExpression = /^[a-zA-Z ]{4,}$/;
                }
                RouterService.prototype.setLeftNavigationItems = function (navItems) {
                    var nameExpression = this.nameExpression;
                    var routerLinkExpression = this.routerLinkExpression;
                    var pathExpression = this.pathExpression;
                    var roleExpression = this.pathExpression;
                    try {
                        if (this.validateNavItems(navItems)) {
                            navItems.forEach(function (navItem) {
                                if (!nameExpression.test(navItem.Name)) {
                                    return;
                                }
                                navItem.RouteLink.forEach(function (rl) {
                                    if (!routerLinkExpression.test(rl)) {
                                        return;
                                    }
                                });
                                if (!pathExpression.test(navItem.Path)) {
                                    return;
                                }
                                navItem.Roles.forEach(function (role) {
                                    if (!roleExpression.test(role)) {
                                        return;
                                    }
                                });
                            });
                            this.navContent = navItems;
                        }
                    }
                    catch (exception) {
                        return;
                    }
                };
                RouterService.prototype.validateNavItems = function (navItems) {
                    return true;
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], RouterService.prototype, "OnNavContentChange", void 0);
                RouterService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], RouterService);
                return RouterService;
            }());
            exports_1("RouterService", RouterService);
        }
    }
});
//# sourceMappingURL=RouterService.js.map