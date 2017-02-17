import {Component, Input, Output, EventEmitter } from '@angular/core';
import {ToastData, ToastyService} from "../../ReusableServices/toasty.service";
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";

/**
 * A Toast component shows message with title and close button.
 */
@Component({
  selector: 'ng2-toast',
  template: require("./toast.html")
})
export class ToastComponent {

  @Input() toast: ToastData;
  @Output('closeToast') closeToastEvent = new EventEmitter();
  toastService:ToastyService;

 constructor(toastSer:ToastyService){
   this.toastService=toastSer;
 }
  close($event: any) {
    $event.preventDefault();
    this.closeToastEvent.next(this.toast);
  }
}
