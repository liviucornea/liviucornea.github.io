"use strict";
var core_1 = require("@angular/core");
var matrixService_1 = require("./matrixService");
var MiniMatrixService = (function () {
    function MiniMatrixService(matrix) {
        var _this = this;
        this.testData = {
            Countries: [
                {
                    IsActive: false,
                    Name: "TAIWAN",
                    Shares: 10
                },
                {
                    IsActive: false,
                    Name: "India",
                    Shares: 20
                }
            ],
            Sedol: [
                {
                    IsActive: false,
                    Number: 6640400,
                    Shares: 45
                },
                {
                    IsActive: false,
                    Number: 885258,
                    Shares: 95
                }]
        };
        this.testDataConfig = {
            correlationColumn: "IsActive",
            Countries: {
                ColumnConfiguration: [
                    {
                        "dbColumnName": "IsActive",
                        "htmlControlType": "checkbox",
                        "isVisible": true,
                        "isRequired": false,
                        "displayName": "TradeFlag",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "isAllowGridLevelEdit": true,
                        "columnFormat": { format: "font-awesome", pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                    },
                    {
                        "dbColumnName": "Name",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "displayName": "Name",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "isAllowGridLevelEdit": true,
                    },
                    {
                        "dbColumnName": "Shares",
                        "htmlControlType": "number",
                        "isVisible": true,
                        "isRequired": false,
                        "displayName": "Id",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "isAllowGridLevelEdit": true,
                    }
                ]
            },
            Sedol: {
                ColumnConfiguration: [
                    {
                        "dbColumnName": "IsActive",
                        "htmlControlType": "checkbox",
                        "isVisible": true,
                        "isRequired": false,
                        "displayName": "TradeFlag",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "isAllowGridLevelEdit": true,
                        "columnFormat": { format: "font-awesome", pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                    },
                    {
                        "dbColumnName": "Number",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "displayName": "Number",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "isAllowGridLevelEdit": true,
                    },
                    {
                        "dbColumnName": "Shares",
                        "htmlControlType": "number",
                        "isVisible": true,
                        "isRequired": false,
                        "displayName": "Shared",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "isAllowGridLevelEdit": true,
                    }
                ]
            }
        };
        this.sequence = 0;
        this.mService = matrix;
        this.correlationObjectCollection = new Array();
        this.mService.inputClickedEvent.subscribe(function (x) { _this.inputClicked(x); });
        this.pushEventToDirectivesEvent = new core_1.EventEmitter();
    }
    MiniMatrixService.prototype.getConfigAndData = function () {
        var result = this.mService.extractMultiHeader(this.testData, this.testDataConfig);
        return result;
    };
    MiniMatrixService.prototype.getTestDataConfig = function () {
        return this.testDataConfig;
    };
    MiniMatrixService.prototype.inputClicked = function (input) {
        this.pushEventToDirectivesEvent.emit(input.row);
    };
    MiniMatrixService.prototype.partialCorrelation = function (directiveId, result) {
        var match = this.correlationObjectCollection.find(function (x) { return x.directiveId === directiveId; });
        var correlationColumnName = this.testDataConfig.correlationColumn;
        if (match) {
            var savedModelData = match.modelObj.cells.find(function (x) { return x.name === correlationColumnName; });
            if (savedModelData) {
                if (result.isAllTrue) {
                    savedModelData.val = true;
                }
                else {
                    savedModelData.val = false;
                }
            }
        }
    };
    MiniMatrixService.prototype.subscribeDirective = function (modelObject) {
        this.sequence++;
        var directiveObj = {
            clickCallback: new core_1.EventEmitter(),
            partiallySelected: new core_1.EventEmitter(),
            directiveId: this.sequence,
            modelObj: modelObject,
            configObj: this.testDataConfig,
        };
        this.correlationObjectCollection.push(directiveObj);
        return directiveObj;
    };
    MiniMatrixService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [matrixService_1.matrixService])
    ], MiniMatrixService);
    return MiniMatrixService;
}());
exports.MiniMatrixService = MiniMatrixService;
//# sourceMappingURL=miniMatrixService.js.map