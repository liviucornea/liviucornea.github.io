"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var toastyDemo_1 = require("./toastyDemo");
var toastyDemo_routing_1 = require("./toastyDemo.routing");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var AuxComponenetsModule_1 = require("../../../../../ReusableComponents/AuxComponenetsModule");
var ToastDemoModule = (function () {
    function ToastDemoModule() {
    }
    ToastDemoModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule, SharedModule_1.SharedModule, AuxComponenetsModule_1.AuxComponentsModule, toastyDemo_routing_1.ToastDemoRoute],
            declarations: [toastyDemo_1.ToastDemo]
        }), 
        __metadata('design:paramtypes', [])
    ], ToastDemoModule);
    return ToastDemoModule;
}());
exports.ToastDemoModule = ToastDemoModule;
//# sourceMappingURL=toastyDemo.Module.js.map