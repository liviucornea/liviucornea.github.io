import {NgModule, Pipe, ModuleWithProviders}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {DraggableComponent} from "./dragdrop/draggable.component";
import {DroppableComponent} from "./dragdrop/droppable.component";
import {SortableContainer} from "./dragdrop/sortable.component";
import {DataTransferEffect, DragImage, DragDropConfig} from "./dragdrop/dnd.config";
import {DragDropService} from "../ReusableServices/dnd.service";
import {ToastyComponent} from "./standardToasty/toasty.component";
import {ToastyService, ToastyConfig} from "../ReusableServices/toasty.service";
import {ToastComponent} from "./standardToasty/toast.component";
import { BrowserModule } from '@angular/platform-browser';
import { SlimLoadingBarService
} from "../ReusableServices/slimLoadingBarService";
import {SlimSliderComponent} from "./slimSlider/SlimSlider";
import {ToastCommunicationService} from "../Datahub/routes/admin/Demo/toastDemo/toast.communication.service";
import {CalendarToastComponent} from "./Calendar/ToasterForCalendar/toast.component";
import {CalendarToastyComponent} from "./Calendar/ToasterForCalendar/toasty.component";
import {CalendarToastyService, CalendarToastyConfig} from "../ReusableServices/calendar.toast.service";

@NgModule({
    imports: [
        BrowserModule, CommonModule, FormsModule,RouterModule,HttpModule
    ],
    exports: [
         DraggableComponent,DroppableComponent,SortableContainer,ToastComponent, ToastyComponent,SlimSliderComponent, CalendarToastComponent,CalendarToastyComponent
    ],
    declarations: [
        DraggableComponent,DroppableComponent,SortableContainer,ToastComponent, ToastyComponent, SlimSliderComponent,CalendarToastComponent,CalendarToastyComponent
    ],
    providers: [ DataTransferEffect,DragImage,DragDropConfig,DragDropService, ToastyService, ToastyConfig, CalendarToastyService, CalendarToastyConfig, ToastCommunicationService,SlimLoadingBarService
    ],
})
export class AuxComponentsModule {}

