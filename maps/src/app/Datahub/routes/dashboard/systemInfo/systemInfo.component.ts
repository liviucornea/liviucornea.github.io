import {Component, OnInit} from '@angular/core';
import {SystemInformationService} from "./systemInfo.service";
//import {Chart} from './systemInfo.loader.ts';

import * as _ from 'lodash';
require('Chart.js');

@Component({
    selector: 'system-info',
    template: require('./systemInfo.html')
})
export class SystemInfoComponent implements OnInit {
     // lineChart
    public lineChartData: Array<any> = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];
    public lineChartType: string = 'line';
    public lineChartOptions: any = {
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

    public SystemInfo : SystemInfo = new SystemInfo();
    public currentDrive: any = new Drive();
    public allDrives: Array<Drive> = [];
    public MemoryChart : any = {'Data': {'labels': ['Free'], 'datasets':[{'data':[0], 'label': 'Memory status'}]} ,
        'ChartType': 'line'
    };
    public CPUChart : any = {'Data': {'labels': ['Usage'], 'datasets':[{'data':[0], 'label': 'CPU Usage'}]} ,
        'ChartType': 'bar'
    };

    constructor(private systemInfo: SystemInformationService) {

    }

    ngOnInit() {
        var self = this;
        self.getSystemInformation();
    }


    getSystemInformation() {
        var self = this;
        let subscription = self.systemInfo.getSystemMonitoringInfo().subscribe(resp => {
            self.SystemInfo = resp;
            self. buildMemoryChartInfo();
            self.buildCPUChartInfo();
            self.allDrives = _.cloneDeep(self.SystemInfo.DriveInfo);
            self.allDrives.forEach((x) => {
                self.makeDriveChartReady(x)
            });
            self.currentDrive = self.allDrives[0];
            subscription.unsubscribe();
        })

    }

    // chart is expecting 2 arrays of info to build the chart based on
    makeDriveChartReady(drive: any) {
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

    }

    driveChanged(driveLetter: any) {
        this.currentDrive = this.allDrives.find(x => x.DriveLetter === driveLetter);
    }


    public randomizeType(): void {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
        this.currentDrive.ChartType = this.currentDrive.ChartType === 'doughnut' ? 'pie' : 'doughnut';
        this.MemoryChart.ChartType = this.MemoryChart.ChartType === 'line' ? 'bar' : 'line';
        this.CPUChart.ChartType = this.CPUChart.ChartType === 'line' ? 'bar' : 'line';
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
    buildMemoryChartInfo(){
        let self = this;
        self.MemoryChart.Data = {
            'labels':['Free RAM(GB)','Used RAM(GB)', 'Total RAM(GB)'],
            'datasets': [{'label': 'Memory Status',
                 'data': [self.SystemInfo.FreeRAMInMB/1000, self.SystemInfo.TotalRAMInGB - self.SystemInfo.FreeRAMInMB/1000, self.SystemInfo.TotalRAMInGB]
                }]

        };
    }
    buildCPUChartInfo(){
        let self = this;
        self.CPUChart.Data = {
            'labels':['In Use','Total'],
            'datasets': [{'label': 'CPU Usage for: ' + self.SystemInfo.HostName ,
                'data': [self.SystemInfo.CPUUsage, 100]
            }]

        };
    }



}

export class Drive {
    // properties from API
    public DriveLetter: string;
    public TotalDiskSpace: number;
    public UsedDiskSpace: string;
    public FreeDiskSpace: string;
    public TotalDiskSpaceInGB: string;
    public UsedDiskSpaceInGB: string;
    public FreeDiskSpaceInGB: string;

    //properties for UI usage
    public ChartType: string = 'pie';
    public ChartLabels: string[] = [];
    public ChartData: number[] = [];
    public ChartOptions: any = {
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        },
        animation: false,
        responsive: true
    };
    constructor() { }
}
export class SystemInfo {
    public CPUUsage: number = 0;
    public FreeRAMInMB: number = 0;
    public TotalRAMInMB: number = 0;
    public TotalRAMInGB: number = 0;
    public DriveInfo: Array<Drive> = [];
    public HostName: string = '';
    constructor (){}
}