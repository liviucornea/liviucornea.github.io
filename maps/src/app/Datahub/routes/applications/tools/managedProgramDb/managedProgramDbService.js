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
var core_1 = require('@angular/core');
var apiService_1 = require("../../../../../ReusableServices/apiService");
var ManagedProgramDbService = (function () {
    function ManagedProgramDbService(apiService) {
        this.apiService = apiService;
    }
    ManagedProgramDbService.prototype.checkBusinessValidations = function (inputRecords, pageName) {
        switch (pageName) {
            case "RebalEntryUploadDisplayGrid":
                inputRecords.forEach(function (x) {
                    var line = x;
                    x.cells.forEach(function (y) {
                        if (y.name.toLowerCase() == 'missed account' && y.val == true) {
                            line.checkBox.disabled = true;
                        }
                        else if (y.name.toLowerCase() == 'existing instruction' && y.val == true) {
                            line.checkBox.disabled = true;
                        }
                    });
                });
                break;
            case "RebalEntryAuditDisplayGrid":
                inputRecords.forEach(function (x) {
                    var line = x;
                    x.cells.forEach(function (y) {
                        if (y.name.toLowerCase() == 'reviewed' && y.val == true) {
                            line.checkBox.disabled = true;
                        }
                    });
                });
                break;
            case "ModuleUpdateDisplayGrid":
                inputRecords.forEach(function (x) {
                    var line = x;
                    var b = x.cells.find(function (y) { return y.name.toLowerCase() == 'moid' && y.val == 66; });
                    if (b)
                        x.cells.forEach(function (y) {
                            if (y.name.toLowerCase() == 'name') {
                                y.val = y.val + '<br/><b>*Selectable through Modeling Tool by user</b>';
                            }
                            else if (y.name.toLowerCase() == 'mid') {
                                y.disabled = true;
                            }
                        });
                });
                break;
        }
    };
    ManagedProgramDbService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [apiService_1.ApiService])
    ], ManagedProgramDbService);
    return ManagedProgramDbService;
}());
exports.ManagedProgramDbService = ManagedProgramDbService;
//# sourceMappingURL=managedProgramDbService.js.map