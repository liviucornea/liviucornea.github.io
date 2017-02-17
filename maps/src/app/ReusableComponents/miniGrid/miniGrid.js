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
var alertService_1 = require("../../ReusableServices/alertService");
var core_1 = require("@angular/core");
var miniMatrixService_1 = require("../../ReusableServices/miniMatrixService");
var MiniGridComponenet = (function () {
    function MiniGridComponenet(alert, vmMatrix) {
        var _this = this;
        this.alertService = alert;
        this.vmMatrixService = vmMatrix;
        this.gridSettings = this.vmMatrixService.getTestDataConfig();
        this.headersAndDataSets = this.vmMatrixService.getConfigAndData();
        this.parentLine = this.selectedRow;
        this.vmMatrixService.pushEventToDirectivesEvent.subscribe(function (x) { _this.inputPushed(x); });
    }
    MiniGridComponenet.prototype.ngOnInit = function () {
        var _this = this;
        this.registery = this.vmMatrixService.subscribeDirective(this.selectedRow);
        //this.identification=registery.directiveId;
        this.correlatedColumnName = this.registery.configObj.correlationColumn;
        this.registery.clickCallback.subscribe(function (result) { return _this.markCells(result); });
        this.markCells(this.selectedRow);
    };
    MiniGridComponenet.prototype.inputPushed = function (input) {
        if (input.Id === this.registery.modelObj.Id) {
            this.markCells(input);
        }
    };
    MiniGridComponenet.prototype.markCells = function (row) {
        var correlatedColumnNameLocal = this.correlatedColumnName;
        var value = row.cells.find(function (x) { return x.name === correlatedColumnNameLocal; });
        if (value) {
            var data = this.headersAndDataSets;
            data.forEach(function (table) {
                var dSet = table.dataSet;
                dSet.forEach(function (line) {
                    var correlatedFiled = line.cells.find(function (x) {
                        return x.name === correlatedColumnNameLocal;
                    });
                    if (correlatedFiled) {
                        correlatedFiled.val = value.val;
                    }
                });
            });
        }
    };
    MiniGridComponenet.prototype.inputClicked = function (line) {
        line.val = !line.val;
        this.checkAllCorrelations();
        this.vmMatrixService.partialCorrelation(this.registery.directiveId, { isAllTrue: this.isAllTrue, isAllFalse: this.isAllFalse });
    };
    MiniGridComponenet.prototype.checkAllCorrelations = function () {
        var correlatedColumnName = this.correlatedColumnName;
        var tempArray = new Array();
        var result = true;
        var data = this.headersAndDataSets;
        data.forEach(function (table) {
            var dSet = table.dataSet;
            dSet.forEach(function (line) {
                var correlatedFiled = line.cells.find(function (x) { return x.name === correlatedColumnName; });
                if (correlatedFiled) {
                    tempArray.push(correlatedFiled.val);
                }
            });
        });
        this.isAllFalse = tempArray.every(function (x) { return x === false; });
        this.isAllTrue = tempArray.every(function (x) { return x === true; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MiniGridComponenet.prototype, "selectedRow", void 0);
    MiniGridComponenet = __decorate([
        core_1.Component({
            template: require("./miniGrid.html"),
            selector: 'miniGrid'
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, miniMatrixService_1.MiniMatrixService])
    ], MiniGridComponenet);
    return MiniGridComponenet;
}());
exports.MiniGridComponenet = MiniGridComponenet;
//# sourceMappingURL=miniGrid.js.map