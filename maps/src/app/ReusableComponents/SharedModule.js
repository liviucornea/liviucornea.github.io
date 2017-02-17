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
var httpAbstract_1 = require("../ReusableServices/httpAbstract");
var alertService_1 = require("../ReusableServices/alertService");
var appSettingsService_1 = require("../ReusableServices/appSettingsService");
var apiService_1 = require("../ReusableServices/apiService");
var crudService_1 = require("../ReusableServices/crudService");
var matrixService_1 = require("../ReusableServices/matrixService");
var miniMatrixService_1 = require("../ReusableServices/miniMatrixService");
var notification_1 = require("./notification/notification");
var interFormsService_1 = require("../ReusableServices/interFormsService");
var sampleService_1 = require("../ReusableServices/sampleService");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var spinner_component_1 = require("./spinner/spinner.component");
var sqlQueryBuilder_1 = require("./sqlQueryBuilder/sqlQueryBuilder");
var navbar_1 = require("./navbar/navbar");
var navbarVert_1 = require("./navbarVert/navbarVert");
var typeahead_1 = require("./typeahead/typeahead");
var expandCollapseTrigger_1 = require("./expandCollapse/expandCollapseTrigger");
var pagination_1 = require("./pagination/pagination");
var displayGrid_1 = require("./displayGrid/displayGrid");
var displayGridFilterService_1 = require('./displayGrid/displayGridFilterService');
var navigationService_1 = require("../ReusableServices/navigationService");
var router_1 = require("@angular/router");
var formBuilder_1 = require("./formBuilder/formBuilder");
var formBuilderInline_1 = require("./formBuilderInline/formBuilderInline");
var CustomDropDown_1 = require("./CustomDropDown/CustomDropDown");
var inlineEditForm_1 = require("./inlineEditForm/inlineEditForm");
var json_edit_component_1 = require("./jsonEdit/json.edit.component");
var lastItem_component_1 = require("./jsonEdit/lastItem.component");
var http_1 = require("@angular/http");
var AuthGuard_1 = require("../ReusableServices/AuthGuard");
var ruleService_1 = require("../ReusableServices/ruleService");
var tokenFilter_1 = require("../Datahub/pipes/tokenFilter");
var tableEdit_1 = require('../Datahub/routes/admin/schematic/editViaTable/tableEdit');
var uploader_1 = require("./upload/uploader");
var ng_uploader_1 = require("../ReusableDirectives/upload/ng-uploader");
var uploadService_1 = require("../ReusableServices/uploadService");
var localizationService_1 = require("../ReusableServices/localizationService");
var localizationTranslatePipe_1 = require("../Datahub/pipes/localizationTranslatePipe");
var miniGrid_1 = require("./miniGrid/miniGrid");
var formatGridColumn_1 = require("../Datahub/pipes/formatGridColumn");
var breadcrumb_1 = require("./breadcrumb/breadcrumb");
var tabBuilder_1 = require("./tabBuilder/tabBuilder");
var tileView_1 = require("./tileView/tileView");
var importExportService_1 = require("../ReusableServices/importExportService");
var accordion_component_1 = require("./accordion/accordion.component");
var accordionBodyContent_directive_1 = require("./accordion/accordionBodyContent.directive");
var accordionHeaderContent_directive_1 = require("./accordion/accordionHeaderContent.directive");
var assignableListItems_1 = require("./assignableListItems/assignableListItems");
var checkBoxList_1 = require("./checkBoxList/checkBoxList");
var searchFilterPipe_1 = require("../Datahub/pipes/searchFilterPipe");
var multiSelectSearchFilterPipe_1 = require("../Datahub/pipes/multiSelectSearchFilterPipe");
var matInput_component_1 = require("./matInput/matInput.component");
var focusForwarder_directive_1 = require("../ReusableDirectives/focusForwarder/focusForwarder.directive");
var excelService_1 = require("../ReusableServices/excelService");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, forms_1.FormsModule, router_1.RouterModule, http_1.HttpModule
            ],
            exports: [
                accordion_component_1.Accordion, accordionBodyContent_directive_1.AccordionBodyContent, accordionHeaderContent_directive_1.AccordionHeaderContent, spinner_component_1.SpinnerComponent, sqlQueryBuilder_1.sqlQueryBuilder, navbar_1.navBar, navbarVert_1.NavBarVert, CustomDropDown_1.CustomDropDown, formBuilder_1.FormBuilder, formBuilderInline_1.FormBuilderInline,
                inlineEditForm_1.inlineEditForm, lastItem_component_1.LastItem, json_edit_component_1.JsonEdit, notification_1.Notification, tableEdit_1.TableEditConfig, expandCollapseTrigger_1.ExpandCollapseTrigger, miniGrid_1.MiniGridComponenet,
                typeahead_1.TypeAhead, pagination_1.Pagination, displayGrid_1.DisplayGridComponent, ng_uploader_1.UPLOAD_DIRECTIVES, uploader_1.CustomUploader, breadcrumb_1.BreadCrumb, tabBuilder_1.TabBuilder, tileView_1.TileView,
                formatGridColumn_1.FormatGridColumnPipe, tokenFilter_1.TokenFilterPipe, localizationTranslatePipe_1.LocalizationTranslatePipe, assignableListItems_1.AssignableListItems, checkBoxList_1.CheckBoxListComponent, searchFilterPipe_1.SearchFilterPipe, multiSelectSearchFilterPipe_1.MultiSelectSearchFilterPipe, matInput_component_1.MatInputComponent, focusForwarder_directive_1.FocusForwarder
            ],
            declarations: [
                accordion_component_1.Accordion, accordionBodyContent_directive_1.AccordionBodyContent, accordionHeaderContent_directive_1.AccordionHeaderContent, spinner_component_1.SpinnerComponent, sqlQueryBuilder_1.sqlQueryBuilder, navbar_1.navBar, navbarVert_1.NavBarVert, CustomDropDown_1.CustomDropDown, formBuilder_1.FormBuilder, formBuilderInline_1.FormBuilderInline,
                inlineEditForm_1.inlineEditForm, lastItem_component_1.LastItem, json_edit_component_1.JsonEdit, notification_1.Notification, tableEdit_1.TableEditConfig, expandCollapseTrigger_1.ExpandCollapseTrigger, miniGrid_1.MiniGridComponenet,
                typeahead_1.TypeAhead, pagination_1.Pagination, displayGrid_1.DisplayGridComponent, ng_uploader_1.UPLOAD_DIRECTIVES, uploader_1.CustomUploader, breadcrumb_1.BreadCrumb, tabBuilder_1.TabBuilder, tileView_1.TileView,
                formatGridColumn_1.FormatGridColumnPipe, tokenFilter_1.TokenFilterPipe, localizationTranslatePipe_1.LocalizationTranslatePipe, assignableListItems_1.AssignableListItems, checkBoxList_1.CheckBoxListComponent, searchFilterPipe_1.SearchFilterPipe, multiSelectSearchFilterPipe_1.MultiSelectSearchFilterPipe, matInput_component_1.MatInputComponent, focusForwarder_directive_1.FocusForwarder
            ],
            entryComponents: [sqlQueryBuilder_1.sqlQueryBuilder, displayGrid_1.DisplayGridComponent, formBuilder_1.FormBuilder],
            providers: [httpAbstract_1.HttpAbstract, sampleService_1.SampleService, navigationService_1.NavigationService, notification_1.Notification, appSettingsService_1.AppSettingsService, httpAbstract_1.HttpAbstract, alertService_1.AlertService, apiService_1.ApiService, AuthGuard_1.AuthGuard,
                ruleService_1.RuleService, crudService_1.crudService, matrixService_1.matrixService, miniMatrixService_1.MiniMatrixService,
                interFormsService_1.InterFormsService, uploadService_1.Ng2Uploader, localizationService_1.LocalizationService, displayGridFilterService_1.DisplayGridFilterService, importExportService_1.ImportExportService, excelService_1.ExcelService
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=SharedModule.js.map