import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {PipelinesSchematicsChartService} from "../pipelineSchematicsChart/pipelineSchematicsChart.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";
import * as _ from 'lodash';

@Component({
    selector: 'running-list',
    encapsulation: ViewEncapsulation.None,
    template: require('./runningProcesses.html'),
    styles: [require('./runningProcesses.scss')]
})

export class RunningProcessesComponent implements OnInit, OnDestroy {
    data: any;
    private runningList: Array<any> = [];
    private countSubscription: Subscription;
    private refreshListSubscript: Subscription;
    private countsSinceLastRefresh: number = 0;
    private startRefresh$ = new Subject();
    private stopRefresh$ = new Subject();
    private lblAutoUpdate: string = "Automatic update is ON";
    private autoUpdate: boolean = true;
    private colorThresholdList: Array<any> = [];

    constructor(private httpService: PipelinesSchematicsChartService) {
    }

    ngOnInit() {
        let self = this;
        const interval$ = Observable.interval(30000).startWith(0);
        const intervalThatStops$ = interval$.takeUntil(self.stopRefresh$);
        self.refreshListSubscript = self.startRefresh$.switchMapTo(intervalThatStops$).switchMapTo(self.httpService.getRunningProcesses()).subscribe(res => {
            self.countsSinceLastRefresh = 0;
            self.buildTheListForUi(res);
        });

        self.httpService.getColorThresholds().subscribe((res) => {
            self.colorThresholdList = _.sortBy(JSON.parse(res), ['TimeInMinute']);
            self.startRefresh$.next();

        });
        self.countSubscription = Observable.interval(1000).subscribe(x => self.countsSinceLastRefresh++);
    }

    buildTheListForUi(theList: any) {
        let self = this;
        self.runningList = theList;
        let today = new Date();
        self.runningList.forEach(x => {
            let StartDate = new Date(x.StartDate);
            let diffMs = today.getTime() - StartDate.getTime();
            let minutesDuration = Math.round(diffMs / 60000);
            let notFoundColor = 'Red';
            let thresholdObjColor = self.colorThresholdList.find(item => minutesDuration <= item.TimeInMinute);
            if (thresholdObjColor) {
                x.Color = thresholdObjColor.Color;
            } else {
                x.Color = notFoundColor;
            }
        })
    }

    toggleAutoUpdate() {
        let self = this;
        self.autoUpdate = !self.autoUpdate;
        if (self.autoUpdate) {
            self.countsSinceLastRefresh = 0;
            self.lblAutoUpdate = "Automatic update is ON";
            self.startRefresh$.next();
        } else {
            self.lblAutoUpdate = "Automatic update is OFF";
            self.stopRefresh$.next();
        }
    }

    ngOnDestroy() {
        this.countSubscription.unsubscribe();
        this.refreshListSubscript.unsubscribe();
        this.startRefresh$.unsubscribe();
        this.stopRefresh$.unsubscribe();
    }

}