import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {NotificationRouting} from "./notification.routing";
import {NotificationAlert} from "./notificationAlert";

@NgModule({
    imports:      [ BrowserModule, NotificationRouting, SharedModule],
    declarations: [NotificationAlert ],

})
export class NotificationModule { }

