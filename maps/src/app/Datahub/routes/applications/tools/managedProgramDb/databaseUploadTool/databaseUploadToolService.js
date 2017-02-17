System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var DatabaseUploadToolService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DatabaseUploadToolService = (function () {
                function DatabaseUploadToolService() {
                }
                DatabaseUploadToolService.prototype.checkBusinessValidations = function (inputRecords, pageName) {
                    if (pageName == 'RebalEntryUploadDisplayGrid') {
                        inputRecords.forEach(function (x) {
                            var line = x;
                            x.cells.forEach(function (y) {
                                if (y.name.toLowerCase() == 'missed account' && y.val == true) {
                                    y.columnCss = 'missedAccount';
                                    line.checkBox.disabled = true;
                                }
                                else if (y.name.toLowerCase() == 'existing instruction' && y.val == true) {
                                    y.columnCss = 'existingInstruction';
                                    line.checkBox.disabled = true;
                                }
                            });
                        });
                    }
                    else if (pageName == 'RebalEntryAuditDisplayGrid') {
                        inputRecords.forEach(function (x) {
                            var line = x;
                            x.cells.forEach(function (y) {
                                if (y.name.toLowerCase() == 'reviewed' && y.val == true) {
                                    y.columnCss = 'passAudit';
                                    line.checkBox.disabled = true;
                                }
                            });
                        });
                    }
                };
                DatabaseUploadToolService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DatabaseUploadToolService);
                return DatabaseUploadToolService;
            }());
            exports_1("DatabaseUploadToolService", DatabaseUploadToolService);
        }
    }
});
//# sourceMappingURL=databaseUploadToolService.js.map