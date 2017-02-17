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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var draggable_component_1 = require("./dragdrop/draggable.component");
var droppable_component_1 = require("./dragdrop/droppable.component");
var sortable_component_1 = require("./dragdrop/sortable.component");
var dnd_config_1 = require("./dragdrop/dnd.config");
var dnd_service_1 = require("../ReusableServices/dnd.service");
var toasty_component_1 = require("./standardToasty/toasty.component");
var toasty_service_1 = require("../ReusableServices/toasty.service");
var toast_component_1 = require("./standardToasty/toast.component");
var platform_browser_1 = require('@angular/platform-browser');
var slimLoadingBarService_1 = require("../ReusableServices/slimLoadingBarService");
var SlimSlider_1 = require("./slimSlider/SlimSlider");
var toast_communication_service_1 = require("../Datahub/routes/admin/Demo/toastDemo/toast.communication.service");
var toast_component_2 = require("./Calendar/ToasterForCalendar/toast.component");
var toasty_component_2 = require("./Calendar/ToasterForCalendar/toasty.component");
var calendar_toast_service_1 = require("../ReusableServices/calendar.toast.service");
var AuxComponentsModule = (function () {
    function AuxComponentsModule() {
    }
    AuxComponentsModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule, common_1.CommonModule, forms_1.FormsModule, router_1.RouterModule, http_1.HttpModule
            ],
            exports: [
                draggable_component_1.DraggableComponent, droppable_component_1.DroppableComponent, sortable_component_1.SortableContainer, toast_component_1.ToastComponent, toasty_component_1.ToastyComponent, SlimSlider_1.SlimSliderComponent, toast_component_2.CalendarToastComponent, toasty_component_2.CalendarToastyComponent
            ],
            declarations: [
                draggable_component_1.DraggableComponent, droppable_component_1.DroppableComponent, sortable_component_1.SortableContainer, toast_component_1.ToastComponent, toasty_component_1.ToastyComponent, SlimSlider_1.SlimSliderComponent, toast_component_2.CalendarToastComponent, toasty_component_2.CalendarToastyComponent
            ],
            providers: [dnd_config_1.DataTransferEffect, dnd_config_1.DragImage, dnd_config_1.DragDropConfig, dnd_service_1.DragDropService, toasty_service_1.ToastyService, toasty_service_1.ToastyConfig, calendar_toast_service_1.CalendarToastyService, calendar_toast_service_1.CalendarToastyConfig, toast_communication_service_1.ToastCommunicationService, slimLoadingBarService_1.SlimLoadingBarService
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], AuxComponentsModule);
    return AuxComponentsModule;
}());
exports.AuxComponentsModule = AuxComponentsModule;
//# sourceMappingURL=AuxComponenetsModule.js.map