System.register(['@angular/core', '@angular/router', "./apiService"], function(exports_1, context_1) {
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
    var core_1, router_1, apiService_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (apiService_1_1) {
                apiService_1 = apiService_1_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService(_api, _router) {
                    this._api = _api;
                    this._router = _router;
                    this.componentRoles = {};
                    // main page stuff
                    this.componentRoles["home"] = [];
                    this.componentRoles["contact"] = [];
                    this.componentRoles["test"] = ['test'];
                    // main applications
                    this.componentRoles["logs"] = ['all', 'logs'];
                    this.componentRoles["auth"] = ['all', 'auth'];
                    // auth sub controls (for example
                    this.componentRoles["auth/resource"] = [];
                    this.componentRoles["auth/roleresource"] = [];
                    // subscribe to the router events
                    //Balaji
                    /*this._router.subscribe(
                        value => {
            
                            //this.isAuthorizedPath(_location.path(), auth => {
                            this.isAuthorizedPath('/' + value, auth => {
            
                                //this.isAuthenticated = auth;
            
                                if (!auth) {
                                    _router.navigateByUrl('noauth');
                                }
                            });
                        });*/
                }
                AuthService.prototype.getComponentRoles = function (urlPath) {
                    if (urlPath[0] == '/')
                        urlPath = urlPath.substring(1);
                    return this.componentRoles[urlPath] ? this.componentRoles[urlPath] : [];
                };
                AuthService.prototype.isAuthorizedPath = function (urlPath, callback) {
                    var requiredRoles = this.getComponentRoles(urlPath);
                    if (requiredRoles && requiredRoles.length > 0) {
                        this._api.getAuthCurrentUserRoles()
                            .subscribe(function (res) {
                            var roles = res.json();
                            var isAuthorized = false;
                            for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
                                var role = roles_1[_i];
                                if (requiredRoles.indexOf(role.Name.toLowerCase()) >= 0)
                                    isAuthorized = true;
                            }
                            callback(isAuthorized);
                        }, function (error) {
                            console.log("error: " + error);
                        });
                    }
                    else {
                        callback(true);
                    }
                };
                AuthService.prototype.isAuthorizedInstruction = function (instruction, callback) {
                    var componentPath = instruction.component.urlPath;
                    var instChild = instruction.child;
                    while (instChild != null) {
                        componentPath += '/' + instChild.component.urlPath;
                        instChild = instChild.child;
                    }
                    this.isAuthorizedPath(componentPath, callback);
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [apiService_1.ApiService, router_1.Router])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=auth.js.map