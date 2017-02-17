"use strict";
var core_1 = require("@angular/core");
var interFormsService_1 = require("../../../../../ReusableServices/interFormsService");
var matrixService_1 = require("../../../../../ReusableServices/matrixService");
var configBuilderAddEditForm = (function () {
    function configBuilderAddEditForm(intFormSer, matrixService) {
        this.intFormSer = intFormSer;
        this.matrixService = matrixService;
        this.PageType = "view";
        this.pageName = "";
        this.pluginValue = "";
        this.visiblePlugin = true;
        this.interFormsService = intFormSer;
    }
    configBuilderAddEditForm.prototype.ngOnInit = function () {
        this.editViewRowDataTable = this.pluginInput;
    };
    configBuilderAddEditForm.prototype.cancelClicked = function () {
        this.interFormsService.closeCurrentlyOpenedForm();
    };
    configBuilderAddEditForm.prototype.saveClicked = function () {
        var primaryColumnName = this.matrixService.getPrimaryColumnName(this.gridSettings);
        this.pluginValue = this.matrixService.buildJSONObject(this.editViewRowDataTable, primaryColumnName);
        switch (this.PageType) {
            case "configBuilderAddColumn":
                this.interFormsService.columnInserted.emit(this.pluginValue);
                break;
            case "configBuilderAddPage":
                this.interFormsService.pageInserted.emit(this.pluginValue);
                break;
        }
    };
    configBuilderAddEditForm.prototype.inputClicked = function (input) {
        if (input === undefined) {
            return;
        }
        this.selectedInput = input;
        var inputConfig = this.gridSettings.ColumnConfiguration.find(function (z) { return z.dbColumnName === input.name; });
        if (inputConfig.isComplexTypeInline) {
            input.isToggleable = true;
            this.interFormsService.assignControl(input);
        }
    };
    __decorate([
        core_1.Input('originalInput'), 
        __metadata('design:type', Object)
    ], configBuilderAddEditForm.prototype, "originalInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], configBuilderAddEditForm.prototype, "pluginInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], configBuilderAddEditForm.prototype, "gridSettings", void 0);
    __decorate([
        core_1.Input('pageType'), 
        __metadata('design:type', String)
    ], configBuilderAddEditForm.prototype, "PageType", void 0);
    __decorate([
        core_1.Input('pageName'), 
        __metadata('design:type', String)
    ], configBuilderAddEditForm.prototype, "pageName", void 0);
    __decorate([
        core_1.Input('NodeClass'), 
        __metadata('design:type', String)
    ], configBuilderAddEditForm.prototype, "nodeClass", void 0);
    configBuilderAddEditForm = __decorate([
        core_1.Component({
            template: require("./configBuilderAddEditForm.html"),
            selector: 'configBuilderAddEditForm'
        }), 
        __metadata('design:paramtypes', [interFormsService_1.InterFormsService, matrixService_1.matrixService])
    ], configBuilderAddEditForm);
    return configBuilderAddEditForm;
}());
exports.configBuilderAddEditForm = configBuilderAddEditForm;
//# sourceMappingURL=configBuilderAddEditForm.js.map