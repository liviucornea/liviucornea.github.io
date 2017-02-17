import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {ChartistJsService} from './chartistJs.service';
import {DisplayGridFilterService} from "../../../../../ReusableComponents/displayGrid/displayGridFilterService";


@Component({
    selector: 'chartist-js',
    encapsulation: ViewEncapsulation.None,
    styles: [require('../../../../../../../node_modules/chartist/dist/chartist.css'), require('./chartistJs.scss')],
    template: require('./chartistJs.html')
})

export class ChartistJs implements OnInit{

    data: any;

    constructor(private _chartistJsService: ChartistJsService, private filterService: DisplayGridFilterService) {
    }

    ngOnInit() {
        this.data = this._chartistJsService.getAll();
    }

    getResponsive(padding, offset) {
        return this._chartistJsService.getResponsive(padding, offset);
    }

    doFilterBy(strFilter: string) {
        // alert('You filetered by:' + strFilter);
        if (strFilter === 'ALL') {
            this.filterService.doFilterBy.next({filterName: 'Status', filterValue: ''});
        } else {
            this.filterService.doFilterBy.next({filterName: 'Status', filterValue: strFilter});
        }
    }
}