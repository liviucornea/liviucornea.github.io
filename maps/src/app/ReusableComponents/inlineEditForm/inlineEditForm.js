//import {FORM_DIRECTIVES} from "angular2/common";
"use strict";
var core_1 = require("@angular/core");
var alertService_1 = require("../../ReusableServices/alertService");
var appSettingsService_1 = require("../../ReusableServices/appSettingsService");
var crudService_1 = require("../../ReusableServices/crudService");
var inlineEditForm = (function () {
    function inlineEditForm(alt, appSettingsSrv, crudSrv) {
        var _this = this;
        this.alt = alt;
        this.appSettingsSrv = appSettingsSrv;
        this.crudSrv = crudSrv;
        this.refreshRequest = new core_1.EventEmitter();
        this.pageName = "";
        this.alert = alt;
        this.appSettingsService = appSettingsSrv;
        this.localRow = this.columns;
        this.refreshRequest.subscribe(function () { _this.handler(_this.crudService.getCallerContext()); });
        this.crudService = crudSrv;
        this.callerContext = this.crudService.getCallerContext();
        this.crudService.OnCrudOperationSuccess.subscribe(function (message) {
            _this.saveRequested(message);
        });
    }
    inlineEditForm.prototype.saveClicked = function () {
        this.crudService.updateInlineRecord(this.columns, this.gridSettings, this.pageName, this.httpProxy);
    };
    inlineEditForm.prototype.cancelClicked = function () {
        this.selectedRow.inlineEditEnabled = false;
    };
    inlineEditForm.prototype.saveRequested = function (message) {
        this.refreshRequest.emit(message);
        this.selectedRow.inlineEditEnabled = false;
    };
    inlineEditForm.prototype.inputClicked = function () {
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], inlineEditForm.prototype, "refreshRequest", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], inlineEditForm.prototype, "columns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], inlineEditForm.prototype, "selectedRow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], inlineEditForm.prototype, "gridSettings", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], inlineEditForm.prototype, "handler", void 0);
    __decorate([
        core_1.Input('httpProxy'), 
        __metadata('design:type', Object)
    ], inlineEditForm.prototype, "httpProxy", void 0);
    __decorate([
        core_1.Input('pageName'), 
        __metadata('design:type', String)
    ], inlineEditForm.prototype, "pageName", void 0);
    inlineEditForm = __decorate([
        core_1.Component({
            template: require("./inlineEditForm.html"),
            selector: 'inlineEditForm',
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, appSettingsService_1.AppSettingsService, crudService_1.crudService])
    ], inlineEditForm);
    return inlineEditForm;
}());
exports.inlineEditForm = inlineEditForm;
//# sourceMappingURL=inlineEditForm.js.map