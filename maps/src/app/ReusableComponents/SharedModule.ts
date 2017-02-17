import {NgModule}       from '@angular/core';

import {HttpAbstract} from "../ReusableServices/httpAbstract";
import {AlertService} from "../ReusableServices/alertService";
import {AppSettingsService} from "../ReusableServices/appSettingsService";
import {ApiService} from "../ReusableServices/apiService";
import {crudService} from "../ReusableServices/crudService";
import {matrixService} from "../ReusableServices/matrixService";
import {MiniMatrixService} from "../ReusableServices/miniMatrixService";
import {Notification} from "./notification/notification";
import {InterFormsService} from "../ReusableServices/interFormsService";
import {SampleService} from "../ReusableServices/sampleService";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SpinnerComponent} from "./spinner/spinner.component";
import {sqlQueryBuilder} from "./sqlQueryBuilder/sqlQueryBuilder";
import {navBar} from "./navbar/navbar";
import {NavBarVert} from "./navbarVert/navbarVert";
import {TypeAhead} from "./typeahead/typeahead";
import {ExpandCollapseTrigger} from "./expandCollapse/expandCollapseTrigger";
import {Pagination} from "./pagination/pagination";
import {DisplayGridComponent} from "./displayGrid/displayGrid";
import {DisplayGridFilterService} from './displayGrid/displayGridFilterService';
import {NavigationService} from "../ReusableServices/navigationService";
import {RouterModule} from "@angular/router";
import {FormBuilder} from "./formBuilder/formBuilder";
import {FormBuilderInline} from "./formBuilderInline/formBuilderInline";
import {CustomDropDown} from "./CustomDropDown/CustomDropDown";
import {inlineEditForm} from "./inlineEditForm/inlineEditForm";
import {JsonEdit} from "./jsonEdit/json.edit.component";
import {LastItem} from "./jsonEdit/lastItem.component";
import {HttpModule} from "@angular/http";
import {AuthGuard} from "../ReusableServices/AuthGuard";
import {RuleService} from "../ReusableServices/ruleService";
import {TokenFilterPipe} from "../Datahub/pipes/tokenFilter";
import {TableEditConfig} from  '../Datahub/routes/admin/schematic/editViaTable/tableEdit';
import {CustomUploader} from "./upload/uploader";
import {UPLOAD_DIRECTIVES} from "../ReusableDirectives/upload/ng-uploader";
import {Ng2Uploader} from "../ReusableServices/uploadService";
import {LocalizationService} from "../ReusableServices/localizationService";
import {LocalizationTranslatePipe} from "../Datahub/pipes/localizationTranslatePipe";
import {MiniGridComponenet} from "./miniGrid/miniGrid";
import {FormatGridColumnPipe} from "../Datahub/pipes/formatGridColumn";
import {BreadCrumb} from "./breadcrumb/breadcrumb";
import {TabBuilder} from "./tabBuilder/tabBuilder";
import {TileView} from "./tileView/tileView";
import {ImportExportService} from "../ReusableServices/importExportService";
import {Accordion} from "./accordion/accordion.component";
import {AccordionBodyContent} from "./accordion/accordionBodyContent.directive";
import {AccordionHeaderContent} from "./accordion/accordionHeaderContent.directive";
import {AssignableListItems} from "./assignableListItems/assignableListItems";
import {CheckBoxListComponent} from "./checkBoxList/checkBoxList";
import {MultiSelectSearchFilter} from "../Datahub/pipes/searchFilterPipe";

@NgModule({
    imports: [
        CommonModule, FormsModule, RouterModule, HttpModule
    ],
    exports: [
        Accordion, AccordionBodyContent, AccordionHeaderContent, SpinnerComponent, sqlQueryBuilder, navBar, NavBarVert, CustomDropDown, FormBuilder, FormBuilderInline,
        inlineEditForm, LastItem, JsonEdit, Notification, TableEditConfig, ExpandCollapseTrigger, MiniGridComponenet,
        TypeAhead, Pagination, DisplayGridComponent, UPLOAD_DIRECTIVES, CustomUploader, BreadCrumb, TabBuilder, TileView,
        FormatGridColumnPipe, TokenFilterPipe, LocalizationTranslatePipe, AssignableListItems, CheckBoxListComponent, MultiSelectSearchFilter
    ],
    declarations: [
        Accordion, AccordionBodyContent, AccordionHeaderContent, SpinnerComponent, sqlQueryBuilder, navBar, NavBarVert, CustomDropDown, FormBuilder, FormBuilderInline,
        inlineEditForm, LastItem, JsonEdit, Notification, TableEditConfig, ExpandCollapseTrigger, MiniGridComponenet,
        TypeAhead, Pagination, DisplayGridComponent, UPLOAD_DIRECTIVES, CustomUploader, BreadCrumb, TabBuilder, TileView,
        FormatGridColumnPipe, TokenFilterPipe, LocalizationTranslatePipe, AssignableListItems, CheckBoxListComponent, MultiSelectSearchFilter
    ],
    entryComponents: [sqlQueryBuilder, DisplayGridComponent, FormBuilder],
    providers: [HttpAbstract, SampleService, NavigationService, Notification, AppSettingsService, HttpAbstract, AlertService, ApiService, AuthGuard,
        RuleService, crudService, matrixService, MiniMatrixService,
        InterFormsService, Ng2Uploader, LocalizationService, DisplayGridFilterService, ImportExportService
    ],
})
export class SharedModule {
}