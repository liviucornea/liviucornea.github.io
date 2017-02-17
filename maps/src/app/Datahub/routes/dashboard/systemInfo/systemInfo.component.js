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
var systemInfo_service_1 = require("./systemInfo.service");
//import {Chart} from './systemInfo.loader.ts';
var _ = require('lodash');
require('Chart.js');
var SystemInfoComponent = (function () {
    function SystemInfoComponent(systemInfo) {
        this.systemInfo = systemInfo;
        // lineChart
        this.lineChartData = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];
        this.lineChartType = 'line';
        this.lineChartOptions = {
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
            animation: false,
            responsive: true
        };
        //  public monitorInfoData: any;
        this.SystemInfo = new SystemInfo();
        this.currentDrive = new Drive();
        this.allDrives = [];
        this.MemoryChart = { 'Data': { 'labels': ['Free'], 'datasets': [{ 'data': [0], 'label': 'Memory status' }] },
            'ChartType': 'line'
        };
        this.CPUChart = { 'Data': { 'labels': ['Usage'], 'datasets': [{ 'data': [0], 'label': 'CPU Usage' }] },
            'ChartType': 'bar'
        };
    }
    SystemInfoComponent.prototype.ngOnInit = function () {
        var self = this;
        self.getSystemInformation();
    };
    SystemInfoComponent.prototype.getSystemInformation = function () {
        var self = this;
        var subscription = self.systemInfo.getSystemMonitoringInfo().subscribe(function (resp) {
            self.SystemInfo = resp;
            self.buildMemoryChartInfo();
            self.buildCPUChartInfo();
            self.allDrives = _.cloneDeep(self.SystemInfo.DriveInfo);
            self.allDrives.forEach(function (x) {
                self.makeDriveChartReady(x);
            });
            self.currentDrive = self.allDrives[0];
            subscription.unsubscribe();
        });
    };
    // chart is expecting 2 arrays of info to build the chart based on
    SystemInfoComponent.prototype.makeDriveChartReady = function (drive) {
        drive.ChartType = 'pie';
        drive.ChartLabels = ['UsedDiskSpaceInGB', 'FreeDiskSpaceInGB'];
        drive.ChartData = [drive.UsedDiskSpaceInGB, drive.FreeDiskSpaceInGB];
        drive.ChartOptions = {
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
            animation: false,
            responsive: true
        };
    };
    SystemInfoComponent.prototype.driveChanged = function (driveLetter) {
        this.currentDrive = this.allDrives.find(function (x) { return x.DriveLetter === driveLetter; });
    };
    SystemInfoComponent.prototype.randomizeType = function () {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
        this.currentDrive.ChartType = this.currentDrive.ChartType === 'doughnut' ? 'pie' : 'doughnut';
        this.MemoryChart.ChartType = this.MemoryChart.ChartType === 'line' ? 'bar' : 'line';
        this.CPUChart.ChartType = this.CPUChart.ChartType === 'line' ? 'bar' : 'line';
    };
    SystemInfoComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    SystemInfoComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    SystemInfoComponent.prototype.buildMemoryChartInfo = function () {
        var self = this;
        self.MemoryChart.Data = {
            'labels': ['Free RAM(GB)', 'Used RAM(GB)', 'Total RAM(GB)'],
            'datasets': [{ 'label': 'Memory Status',
                    'data': [self.SystemInfo.FreeRAMInMB / 1000, self.SystemInfo.TotalRAMInGB - self.SystemInfo.FreeRAMInMB / 1000, self.SystemInfo.TotalRAMInGB]
                }]
        };
    };
    SystemInfoComponent.prototype.buildCPUChartInfo = function () {
        var self = this;
        self.CPUChart.Data = {
            'labels': ['In Use', 'Total'],
            'datasets': [{ 'label': 'CPU Usage for: ' + self.SystemInfo.HostName,
                    'data': [self.SystemInfo.CPUUsage, 100]
                }]
        };
    };
    SystemInfoComponent = __decorate([
        core_1.Component({
            selector: 'system-info',
            template: require('./systemInfo.html')
        }), 
        __metadata('design:paramtypes', [systemInfo_service_1.SystemInformationService])
    ], SystemInfoComponent);
    return SystemInfoComponent;
}());
exports.SystemInfoComponent = SystemInfoComponent;
var Drive = (function () {
    function Drive() {
        //properties for UI usage
        this.ChartType = 'pie';
        this.ChartLabels = ['UsedDiskSpaceInGB', 'FreeDiskSpaceInGB'];
        this.ChartData = [0, 0];
        this.ChartOptions = {
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
            animation: false,
            responsive: true
        };
    }
    return Drive;
}());
exports.Drive = Drive;
var SystemInfo = (function () {
    function SystemInfo() {
        this.CPUUsage = 0;
        this.FreeRAMInMB = 0;
        this.TotalRAMInMB = 0;
        this.TotalRAMInGB = 0;
        this.DriveInfo = [];
        this.HostName = '';
    }
    return SystemInfo;
}());
exports.SystemInfo = SystemInfo;
//# sourceMappingURL=systemInfo.component.js.map