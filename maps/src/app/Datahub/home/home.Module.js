System.register(['@angular/core', "./home", "./home.routing", "@angular/platform-browser", "../../ReusableComponents/SharedModule"], function(exports_1, context_1) {
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
    var core_1, home_1, home_routing_1, platform_browser_1, SharedModule_1;
    var HomeModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (home_routing_1_1) {
                home_routing_1 = home_routing_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (SharedModule_1_1) {
                SharedModule_1 = SharedModule_1_1;
            }],
        execute: function() {
            HomeModule = class HomeModule {
            };
            HomeModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule, home_routing_1.HomeRouting, SharedModule_1.SharedModule],
                    declarations: [home_1.Home],
                }), 
                __metadata('design:paramtypes', [])
            ], HomeModule);
            exports_1("HomeModule", HomeModule);
        }
    }
});
//# sourceMappingURL=home.Module.js.map