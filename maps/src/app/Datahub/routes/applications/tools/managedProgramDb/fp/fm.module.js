System.register(['@angular/core', "@angular/common", "@angular/router", "@angular/forms", "../../../../../../ReusableComponents/SharedModule", "./fp", "./fp.routes"], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, forms_1, SharedModule_1, fp_1, fp_routes_1;
    var MpdbFPModule;
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
            function (fp_1_1) {
                fp_1 = fp_1_1;
            },
            function (fp_routes_1_1) {
                fp_routes_1 = fp_routes_1_1;
            }],
        execute: function() {
            MpdbFPModule = (function () {
                function MpdbFPModule() {
                }
                MpdbFPModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, fp_routes_1.MpdbFPRouting
                        ],
                        declarations: [fp_1.MpdbFP],
                    }), 
                    __metadata('design:paramtypes', [])
                ], MpdbFPModule);
                return MpdbFPModule;
            }());
            exports_1("MpdbFPModule", MpdbFPModule);
        }
    }
});
//# sourceMappingURL=fm.module.js.map