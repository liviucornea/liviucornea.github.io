import {Component} from '@angular/core';
import {AlertService} from "../../ReusableServices/alertService";
@Component({
    template: require("./notification.html"),
    selector: 'tdamNotifications'
})
export class Notification {
    active = true;
    constructor(private alert:AlertService) {
    };

    closeAlerts(i) {
        this.alert.alerts.splice(i, 1);

    };

    clickOK() {
        this.alert.requestConfirmationAnswer$.emit("OK");
        this.alert.askConfirmation = false;
        this.closeAll();
    };

    clickCancel() {
        this.alert.requestConfirmationAnswer$.emit("CANCEL");
        this.alert.askConfirmation = false;
        this.closeAll();
    }
    closeAll(){
        this.alert.alerts = [];
    }

}