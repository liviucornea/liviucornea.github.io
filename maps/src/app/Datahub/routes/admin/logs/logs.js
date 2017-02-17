"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var displayGrid_1 = require("../../../../ReusableComponents/displayGrid/displayGrid");
var logsControlConfig_1 = require("./logsControlConfig");
var adminApiService_1 = require("../adminApiService");
var Logs = (function () {
    function Logs(adminApiService) {
        this.adminApiService = adminApiService;
        this.controlConfig = logsControlConfig_1.LogsControlConfig;
    }
    Logs.prototype.ngAfterViewInit = function () {
        this.refreshLogs();
    };
    Logs.prototype.refreshLogs = function () {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.adminApiService, "logs");
    };
    __decorate([
        core_2.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], Logs.prototype, "dataTable", void 0);
    Logs = __decorate([
        core_1.Component({
            selector: 'logs',
            template: "<div><displayGrid></displayGrid></div>"
        }), 
        __metadata('design:paramtypes', [adminApiService_1.AdminApiService])
    ], Logs);
    return Logs;
}());
exports.Logs = Logs;
//# sourceMappingURL=logs.js.map