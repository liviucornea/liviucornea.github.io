import {Component, Injectable, EventEmitter} from 'angular2/core';
import {AppNotificationsMSG} from './appSettings' ;

@Injectable()
@Component({

})
export class AlertService {
    public requestConfirmationAnswer$: EventEmitter<any>;
    public askConfirmation: boolean = false;
    public notificationTitle :string = AppNotificationsMSG.notificationTitle;
    alerts: Array<any> = new Array<any>();

    constructor() {
        this.requestConfirmationAnswer$ =  new EventEmitter();
    }

    ok(text: string = "N/A") {
        this.addAlert(text, "success");
    }

    warn(text: string = "N/A") {
        this.addAlert(text, "warning");
        this.notificationTitle = 'Warning';
    }

    error(text: string = "N/A") {
        this.addAlert(text, "danger");
        this.notificationTitle = 'Error';
    }

    addAlert(text: string = "N/A", type: string = "success") {
        let alert = new Alert(text,type);
        this.notificationTitle = AppNotificationsMSG.notificationTitle;
        if(this.alerts.find(function(o){ return o.text === text && o.type === type}) === undefined){
            this.alerts.push(alert);
        }

        console.log(alert.text);
    }

    addAlertAndRequestAnswer(text: string = "N/A", type: string = "inputRequired") {
        this.askConfirmation = true;
        this.notificationTitle =  AppNotificationsMSG.deletionTitle;
        let alert = new Alert(text,type);
        if(this.alerts.find(function(o){ return o.text === text && o.type === type}) === undefined){
            this.alerts.push(alert);
        }

        console.log(alert.text);
    }


};

export class Alert {
    constructor(public text: string, public type:string){}
};