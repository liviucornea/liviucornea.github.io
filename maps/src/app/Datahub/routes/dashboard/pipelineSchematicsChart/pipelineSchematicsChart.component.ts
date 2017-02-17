import {Component, ViewEncapsulation, OnInit, AfterContentChecked} from '@angular/core';
import {PipelinesSchematicsChartService, LegendItem} from './pipelineSchematicsChart.service';
import {DisplayGridFilterService} from "../../../../ReusableComponents/displayGrid/displayGridFilterService";
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
    selector: 'pipelineSchematics-chart',
    encapsulation: ViewEncapsulation.None,
    styles: [require('../../../../../../node_modules/chartist/dist/chartist.css'), require('./pipelineSchematicsChart.scss')],
    template: require('./pipelineSchematicsChart.html')
})

export class PipeLinesSchematicsChartComponent implements OnInit, AfterContentChecked {
    data: any;
    private historyData: any;
    private scheduledList: Array<any> = [];
    private runningList: Array<any> = [];

    constructor(private _chartistJsService: PipelinesSchematicsChartService, private filterService: DisplayGridFilterService) {
    }

    ngOnInit() {
        let self = this;
        self.data = _.cloneDeep(self._chartistJsService.getAll());

        Observable.forkJoin(self._chartistJsService.getHistoryProcesses(), self._chartistJsService.getScheduledProcesses(),self._chartistJsService.getRunningProcesses()).subscribe(
            (res) => {
                // keep data here in the class for any posible usage later on
                self.historyData = res[0];
                self.scheduledList = res[1];
                self.runningList = res[2];
                // get aborted and completed
                self.historyData.Counts.forEach(item => {
                    self.data.processesData.labels.push(item.Status);
                    // if the bandwith is to small <5 there is no room to write te label
                    // so we add few units to avoid overlap
                    self.data.processesData.series.push(item.Count > 5 ? item.Count : item.Count + 4);

                    // put ABORTED second in a list ( for color purpose, to be red : it is setted in  coresponding .scss file )
                    if (item.Status.toUpperCase() === 'ABORTED' && self.data.processesData.labels.length >= 2) {
                        let lblsArray = self.data.processesData.labels;
                        self.swapArryElems(lblsArray, 1, self.data.processesData.labels.length - 1);
                        let lblsSeries = self.data.processesData.series;
                        self.swapArryElems(lblsSeries, 1, self.data.processesData.series.length - 1);

                    }
                    //put completed first in the list ( for color purpose )
                    if (item.Status.toUpperCase() === 'COMPLETED') {
                        let lblsArray = self.data.processesData.labels;
                        self.swapArryElems(lblsArray, 0, self.data.processesData.labels.length - 1);
                        let lblsSeries = self.data.processesData.series;
                        self.swapArryElems(lblsSeries, 0, self.data.processesData.series.length - 1);
                    }

                    let legendItem = new LegendItem(item.Status, item.Count, self.historyData.Counts.indexOf(item) + 1, 'black');
                    self.data.processesData.legendItems.push(legendItem);
                });
                //for Aborted to be on second position even when Completed are not coming and aborted is inserted  first
                let abortedIndex = self.data.processesData.labels.indexOf('Aborted');
                self.swapArryElems(self.data.processesData.labels, 1,abortedIndex);
                self.swapArryElems(self.data.processesData.series, 1,abortedIndex);

                //get running/initialized
                self.data.processesData.labels.push('Initialized');
                self.data.processesData.series.push(self.runningList.length > 5 ? self.runningList.length : self.runningList.length + 4);
                self.data.processesData.legendItems.push(new LegendItem('Initialized', self.runningList.length, self.data.processesData.legendItems.length + 1, 'black'));
                //get scheduled information
                self.data.processesData.labels.push('Scheduled');
                self.data.processesData.series.push(self.scheduledList.length > 5 ? self.scheduledList.length : self.scheduledList.length + 4);
                self.data.processesData.legendItems.push(new LegendItem('Scheduled', self.scheduledList.length, self.data.processesData.legendItems.length + 1, 'black'));
            });

    }

    ngAfterContentChecked() {
        //      this.doFilterBy('Aborted');
    }

    getResponsive(padding, offset) {
        return this._chartistJsService.getResponsive(padding, offset);
    }

    doFilterBy(strFilter: string) {
        if (strFilter === 'Scheduled') {
            return;
        }
        if (strFilter === 'ALL') {
            this.filterService.doFilterBy.next({filterName: 'Status', filterValue: ''});
        } else {
            this.filterService.doFilterBy.next({filterName: 'Status', filterValue: strFilter});
        }
    }

    swapArryElems(inputArray: Array<any>, j: number, k: number) {
        if (j < 0 || k < 0 || j > inputArray.length - 1 || k > inputArray.length - 1) {
            return;
        }
        inputArray[j] = [inputArray[k], inputArray[k] = inputArray[j]][0];
    }


}