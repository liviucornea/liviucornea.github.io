"use strict";
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