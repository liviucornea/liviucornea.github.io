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
var alertService_1 = require("../../../../../ReusableServices/alertService");
var core_1 = require('@angular/core');
// file contains code to facilitate communication between pipelines and schematics on execution page
// it is used when pipeline is calling for execution and to send to parent the messages for each schematic
var ExecutionDialogService = (function () {
    function ExecutionDialogService(alertService) {
        this.alertService = alertService;
        this.sendExecutionMessage$ = new core_1.EventEmitter();
        this.schematicRuntimeValue$ = new core_1.EventEmitter();
        this.askForSchematicsRuntimeValue$ = new core_1.EventEmitter();
        this.configToggle$ = new core_1.EventEmitter();
        this.messageToggle$ = new core_1.EventEmitter();
    }
    ExecutionDialogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [alertService_1.AlertService])
    ], ExecutionDialogService);
    return ExecutionDialogService;
}());
exports.ExecutionDialogService = ExecutionDialogService;
//# sourceMappingURL=executionDialogService.js.map