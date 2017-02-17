//import {FORM_DIRECTIVES} from "angular2/common";
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
var core_1 = require("@angular/core");
var ReportBuilder = (function () {
    function ReportBuilder() {
        this.pluginValue = "";
        this.visiblePlugin = true;
        this.showValidation = false;
        this.enableInsert = false;
        this.formBuilderNotifier = new core_1.EventEmitter();
        this.title = "Form";
        this.isEmptyResult = false;
        this.PageType = "view";
        this.pageName = "";
        this.IsHideCancel = false;
    }
    ReportBuilder.prototype.ngOnInit = function () {
        this.editViewRowDataTable = this.pluginInput;
    };
    ReportBuilder.prototype.injectDataAndConfig = function (data, config, pageType) {
        this.gridSettings = config;
        this.PageType = pageType;
        this.editViewRowDataTable = data;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReportBuilder.prototype, "formBuilderNotifier", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ReportBuilder.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReportBuilder.prototype, "pluginInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReportBuilder.prototype, "gridSettings", void 0);
    __decorate([
        core_1.Input('PageType'), 
        __metadata('design:type', String)
    ], ReportBuilder.prototype, "PageType", void 0);
    __decorate([
        core_1.Input('pageName'), 
        __metadata('design:type', String)
    ], ReportBuilder.prototype, "pageName", void 0);
    __decorate([
        core_1.Input('httpProxy'), 
        __metadata('design:type', Object)
    ], ReportBuilder.prototype, "httpProxy", void 0);
    __decorate([
        core_1.Input('IsHideCancel'), 
        __metadata('design:type', Boolean)
    ], ReportBuilder.prototype, "IsHideCancel", void 0);
    __decorate([
        core_1.Input('NodeClass'), 
        __metadata('design:type', String)
    ], ReportBuilder.prototype, "nodeClass", void 0);
    ReportBuilder = __decorate([
        core_1.Component({
            template: require("./reportBuilder.html"),
            selector: 'reportBuilder',
        }), 
        __metadata('design:paramtypes', [])
    ], ReportBuilder);
    return ReportBuilder;
}());
exports.ReportBuilder = ReportBuilder;
//# sourceMappingURL=reportBuilder.js.map