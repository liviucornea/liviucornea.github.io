"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var logs_routes_1 = require("./logs.routes");
var logs_1 = require("./logs");
var LogsModule = (function () {
    function LogsModule() {
    }
    LogsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, platform_browser_1.BrowserModule, SharedModule_1.SharedModule, logs_routes_1.LogsRoutes],
            declarations: [logs_1.Logs]
        }), 
        __metadata('design:paramtypes', [])
    ], LogsModule);
    return LogsModule;
}());
exports.LogsModule = LogsModule;
//# sourceMappingURL=logs.Module.js.map