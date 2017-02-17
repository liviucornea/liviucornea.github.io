System.register(['@angular/core', "@angular/platform-browser", "@angular/forms", "@angular/router", "./tabDemo", "./tabDemo.routing", "../../../../../ReusableComponents/SharedModule"], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, forms_1, router_1, tabDemo_1, tabDemo_routing_1, SharedModule_1;
    var TabDemoModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (tabDemo_1_1) {
                tabDemo_1 = tabDemo_1_1;
            },
            function (tabDemo_routing_1_1) {
                tabDemo_routing_1 = tabDemo_routing_1_1;
            },
            function (SharedModule_1_1) {
                SharedModule_1 = SharedModule_1_1;
            }],
        execute: function() {
            TabDemoModule = (function () {
                function TabDemoModule() {
                }
                TabDemoModule = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule, SharedModule_1.SharedModule, tabDemo_routing_1.TabDemoRoute],
                        declarations: [tabDemo_1.TabDemo]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TabDemoModule);
                return TabDemoModule;
            }());
            exports_1("TabDemoModule", TabDemoModule);
        }
    }
});
//# sourceMappingURL=tabDemo.Module.js.map