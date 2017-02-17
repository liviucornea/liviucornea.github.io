System.register(['@angular/core', "@angular/common", "@angular/router", "@angular/forms", "../../../../../../ReusableComponents/SharedModule", "./pia", "./pia.routes"], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, forms_1, SharedModule_1, pia_1, pia_routes_1;
    var MpdbPIAModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (SharedModule_1_1) {
                SharedModule_1 = SharedModule_1_1;
            },
            function (pia_1_1) {
                pia_1 = pia_1_1;
            },
            function (pia_routes_1_1) {
                pia_routes_1 = pia_routes_1_1;
            }],
        execute: function() {
            MpdbPIAModule = (function () {
                function MpdbPIAModule() {
                }
                MpdbPIAModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, pia_routes_1.MpdbPIARouting
                        ],
                        declarations: [pia_1.MpdbPIA],
                    }), 
                    __metadata('design:paramtypes', [])
                ], MpdbPIAModule);
                return MpdbPIAModule;
            }());
            exports_1("MpdbPIAModule", MpdbPIAModule);
        }
    }
});
//# sourceMappingURL=pia.module.js.map