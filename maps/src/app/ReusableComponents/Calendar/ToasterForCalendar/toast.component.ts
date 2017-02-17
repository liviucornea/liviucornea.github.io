import {Component, Input, Output, EventEmitter } from '@angular/core';
import {ToastData, ToastyService} from "../../../ReusableServices/toasty.service";
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {CalendarToastyService} from "../../../ReusableServices/calendar.toast.service";

/**
 * A Toast component shows message with title and close button.
 */
@Component({
  selector: 'calendar-toast',
  template: require("./toast.html")
})
export class CalendarToastComponent {

  @Input() toast: ToastData;
  @Output('closeToast') closeToastEvent = new EventEmitter();
  toastService:CalendarToastyService;

 constructor(toastSer:CalendarToastyService){
   this.toastService=toastSer;
 }
  close($event: any) {
    $event.preventDefault();
    this.closeToastEvent.next(this.toast);
  }
  eventDetail(){
    this.toastService.eventDetailClicked();
  }
}
