"use strict";
var core_1 = require('@angular/core');
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var router_1 = require("@angular/router");
var editPortfolio_1 = require("../../../aplicationsComponents/editPortfolio/editPortfolio");
var MpdbPortfolio = (function () {
    function MpdbPortfolio(alert, vmMatrix, route) {
        this.alert = alert;
        this.vmMatrix = vmMatrix;
        this.route = route;
        this.updatedControlsList = [];
        this.customMessages = [];
        this.selectedMode = 'edit';
        this.modeSelections = [
            { Value: 'add', Description: 'Add Portfolio' },
            { Value: 'edit', Description: 'Edit Portfolio' }
        ];
    }
    MpdbPortfolio.prototype.ngOnInit = function () {
        var self = this;
        self.route.params.forEach(function (params) {
            self.key = params['key'];
        });
        if (self.key) {
            switch (self.key) {
                case "FP":
                    self.selectedSystemId = 18;
                    break;
                case "PIA":
                    self.selectedSystemId = 19;
                    break;
                case "PIC":
                    self.selectedSystemId = 23;
                    break;
            }
        }
    };
    MpdbPortfolio.prototype.ngOnDestroy = function () {
    };
    MpdbPortfolio.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    MpdbPortfolio.prototype.displayTabInfo = function (tabInfo) {
        this.customMessages = [];
        switch (tabInfo.TabKey) {
            case 'AddPortfolio':
                break;
            case 'EditPortfolio':
                break;
        }
    };
    __decorate([
        core_1.ViewChild(editPortfolio_1.EditPortfolio), 
        __metadata('design:type', editPortfolio_1.EditPortfolio)
    ], MpdbPortfolio.prototype, "editPortfolioControl", void 0);
    MpdbPortfolio = __decorate([
        core_1.Component({
            selector: 'portfolio',
            template: "<template ngFor let-itemOption [ngForOf]=\"modeSelections\">\n                <span style=\"margin-right: 20px\"></span><input type=\"radio\" [checked]=\"(itemOption.Value === selectedMode)\"\n                       [value]=\"itemOption.Value\" name=\"modeSelector\" [(ngModel)]=\"selectedMode\">\n                <span>{{itemOption.Description}}</span>\n            </template>\n            <br/>\n        <editPortfolio [SystemId]=\"selectedSystemId\"></editPortfolio>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, matrixService_1.matrixService, router_1.ActivatedRoute])
    ], MpdbPortfolio);
    return MpdbPortfolio;
}());
exports.MpdbPortfolio = MpdbPortfolio;
//# sourceMappingURL=portfolio.js.map