import {Injectable} from '@angular/core';
import {HttpAbstract} from "../../../../ReusableServices/httpAbstract";
import {BaThemeConfigProvider} from '../../../theme/theme.configProvider';

@Injectable()
export class PipelinesSchematicsChartService {
    private dashBoardURL: string = '/dashboard';
    private _data = {
        processesData: {
            labels: [],
            series: [],
            legendItems: []
        },
        processesOptions: {
            fullWidth: true,
            donut: true,
            showLabel: true,
            height: '300px',
            weight: '300px',
            labelDirection: 'explode',
            labelInterpolationFnc: function (value) {
                return value[0];
            }
        },


    };

    constructor(private _baConfig: BaThemeConfigProvider, private httpServ: HttpAbstract) {
    }

    public getAll() {
        return this._data;
    }

    public getScheduledProcesses() {
        return this.httpServ.fetch(this.dashBoardURL + '/scheduled');
    }

    public getRunningProcesses() {
        return this.httpServ.fetch(this.dashBoardURL + '/running');
    }
    public getColorThresholds() {
        return this.httpServ.fetch('/application/configuration/SchematicThresholds');
    }
    public getHistoryProcesses() {
        return this.httpServ.fetch(this.dashBoardURL + '/history');
    }


    public getResponsive(padding, offset) {
        return [
            ['screen and (min-width: 1550px)', {
                chartPadding: padding,
                labelOffset: offset,
                labelDirection: 'explode',
                labelInterpolationFnc: function (value) {
                    return  value ;
                }
            }],
            ['screen and (max-width: 1200px)', {
                chartPadding: padding,
                labelOffset: offset,
                labelDirection: 'explode',
                labelInterpolationFnc: function (value) {
                    return value ;
                }
            }],
            ['screen and (max-width: 600px)', {
                chartPadding: 0,
                labelOffset: 0,
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }]
        ];
    }
}

export class LegendItem {
    constructor(public label: string, public percentage: number, public order: number, public color?: string, public value?: number) {
    }
}
/*
 simpleDonutData: {
 labels: ['Aborted', 'Completed', 'Scheduled'],
 series: [30, 60, 70],
 legendItems: [
 {
 value: 2000,
 color: 'black',
 label: 'Aborted',
 percentage: 50,
 order: 1,
 }, {
 value: 2000,
 color: 'black',
 label: 'Completed',
 percentage: 40,
 order: 4,
 }, {
 value: 2000,
 color: 'black',
 label: 'Scheduled',
 percentage: 95,
 order: 3,
 }
 ]
 }

 */