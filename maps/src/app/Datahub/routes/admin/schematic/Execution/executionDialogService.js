"use strict";
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