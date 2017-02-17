import {Component, View, Injector} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {AlertService} from "../../../ReusableServices/alertService";
import {ApiService} from "../../../ReusableServices/apiService";

@Component({
    selector: 'nlogInstance',
    templateUrl: 'app/Datahub/routes/log/nlogInstance.html',
    styleUrls: ['app/Datahub/routes/log/nlogInstance.css'],
})
export class NlogInstance {
    alert: AlertService;
    api: ApiService;

    sampleValue: string = "2016-01-11T13:49:42.7";
    sampleDate: Date = new Date("2016-01-11T13:49:42.7");

    instanceId: any;
    nlogInstance: Array<Object>;

    constructor(private ap: ApiService, private alt: AlertService, private params: RouteParams) {
        this.api = ap;
        this.alert = alt;

        this.instanceId = params.get('instanceId');
        this.refresh();
    }

    stringAsDate(str) {
        return new Date(str);
    }

    refresh() {
        this.api.getNLogByInstanceId(this.instanceId)
        .subscribe(
            res => {
                this.nlogInstance = res.json();
            },
            error => {
                this.alert.error("async error #" + error.status);
            },
            () => { }
        );
    }

    clear() {
        this.nlogInstance = Array<Object>();
    }
}