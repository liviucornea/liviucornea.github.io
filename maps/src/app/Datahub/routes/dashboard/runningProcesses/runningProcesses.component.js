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
var pipelineSchematicsChart_service_1 = require("../pipelineSchematicsChart/pipelineSchematicsChart.service");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var _ = require('lodash');
var RunningProcessesComponent = (function () {
    function RunningProcessesComponent(httpService) {
        this.httpService = httpService;
        this.runningList = [];
        this.countsSinceLastRefresh = 0;
        this.startRefresh$ = new Subject_1.Subject();
        this.stopRefresh$ = new Subject_1.Subject();
        this.lblAutoUpdate = "Automatic update is ON";
        this.autoUpdate = true;
        this.colorThresholdList = [];
    }
    RunningProcessesComponent.prototype.ngOnInit = function () {
        var self = this;
        var interval$ = Observable_1.Observable.interval(30000).startWith(0);
        var intervalThatStops$ = interval$.takeUntil(self.stopRefresh$);
        self.refreshListSubscript = self.startRefresh$.switchMapTo(intervalThatStops$).switchMapTo(self.httpService.getRunningProcesses()).subscribe(function (res) {
            self.countsSinceLastRefresh = 0;
            self.buildTheListForUi(res);
        });
        self.httpService.getColorThresholds().subscribe(function (res) {
            self.colorThresholdList = _.sortBy(JSON.parse(res.ConfigurationValue), ['TimeInMinute']);
            self.startRefresh$.next();
        });
        self.countSubscription = Observable_1.Observable.interval(1000).subscribe(function (x) { return self.countsSinceLastRefresh++; });
    };
    RunningProcessesComponent.prototype.buildTheListForUi = function (theList) {
        var self = this;
        self.runningList = theList;
        var today = new Date();
        self.runningList.forEach(function (x) {
            var StartDate = new Date(x.StartDate);
            var diffMs = today.getTime() - StartDate.getTime();
            var minutesDuration = Math.round(diffMs / 60000);
            var notFoundColor = 'Red';
            var thresholdObjColor = self.colorThresholdList.find(function (item) { return minutesDuration <= item.TimeInMinute; });
            if (thresholdObjColor) {
                x.Color = thresholdObjColor.Color;
            }
            else {
                x.Color = notFoundColor;
            }
        });
    };
    RunningProcessesComponent.prototype.toggleAutoUpdate = function () {
        var self = this;
        self.autoUpdate = !self.autoUpdate;
        if (self.autoUpdate) {
            self.countsSinceLastRefresh = 0;
            self.lblAutoUpdate = "Automatic update is ON";
            self.startRefresh$.next();
        }
        else {
            self.lblAutoUpdate = "Automatic update is OFF";
            self.stopRefresh$.next();
        }
    };
    RunningProcessesComponent.prototype.ngOnDestroy = function () {
        this.countSubscription.unsubscribe();
        this.refreshListSubscript.unsubscribe();
        this.startRefresh$.unsubscribe();
        this.stopRefresh$.unsubscribe();
    };
    RunningProcessesComponent = __decorate([
        core_1.Component({
            selector: 'running-list',
            encapsulation: core_1.ViewEncapsulation.None,
            template: require('./runningProcesses.html'),
            styles: [require('./runningProcesses.scss')]
        }), 
        __metadata('design:paramtypes', [pipelineSchematicsChart_service_1.PipelinesSchematicsChartService])
    ], RunningProcessesComponent);
    return RunningProcessesComponent;
}());
exports.RunningProcessesComponent = RunningProcessesComponent;
//# sourceMappingURL=runningProcesses.component.js.map