import {
    Component,
    ViewChild,
    ViewEncapsulation,
    Input,
    Output,
    ElementRef,
    EventEmitter, OnChanges,
} from '@angular/core';

import {Chartist} from './baChartistChart.loader.ts';


@Component({
    selector: 'ba-chartist-chart',
    encapsulation: ViewEncapsulation.None,
    styles: [require('../../../../../../node_modules/chartist/dist/chartist.css')],
    template: require('./baChartistChart.html'),
    providers: []
})
export class BaChartistChart implements OnChanges{

    @Input() baChartistChartType: string;
    @Input() baChartistChartData: Object;
    @Input() baChartistChartOptions: Object;
    @Input() baChartistChartResponsive: Object;
    @Input() baChartistChartClass: string;
    @Output() onChartReady = new EventEmitter<any>();
    @Output() onChartClick = new EventEmitter<any>();
    @ViewChild('baChartistChart') private _selector: ElementRef;

    private chart;

    ngAfterViewInit() {
        this.chart = new Chartist[this.baChartistChartType](this._selector.nativeElement, this.baChartistChartData, this.baChartistChartOptions, this.baChartistChartResponsive);
        this.onChartReady.emit(this.chart);
    }

    ngOnChanges() {
        let self = this;
        if (self.chart) {
            (<any>this.chart).update(this.baChartistChartData, this.baChartistChartOptions);
            if (self.chart.svg && self.chart.svg._node) {
                let nodeChildLength = self.chart.svg._node.children.length;
                // put onclick for labels
                for (let i = 0, j = self.chart.svg._node.childNodes[nodeChildLength - 1].childNodes.length; i < j; i++) {
                    self.chart.svg._node.childNodes[nodeChildLength - 1].childNodes[i].onclick = () => {
                        self.onChartClick.emit(self.chart.data.labels[i]);
                    };
                }
                // put on click for disk sectors
                for (let i = 0, j = self.chart.svg._node.childNodes.length - 1; i < j; i++) {
                    self.chart.svg._node.childNodes[i].onclick = () => {
                        self.onChartClick.emit(self.chart.data.labels[self.chart.data.labels.length - 1 -i]);
                    };
                }



            }
        }
    }

    ngOnDestroy(): void {
        if (this.chart) {
            this.chart.detach();
        }
    }
}
