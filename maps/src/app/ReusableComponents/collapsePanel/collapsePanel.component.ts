/**
 * Created by vikhnv2 on 12/2/2016.
 */
import {Component, Input, ViewChild} from '@angular/core';
import {DisplayGridComponent} from '../displayGrid/displayGrid';

@Component({
    selector: 'collapse-panel',
    template: require('./collapsePanel.html'),
})

export class CollapsePanel {
    @Input() key: any;
    @Input() title: string;

    @ViewChild(DisplayGridComponent)
    private dataTable: DisplayGridComponent;

    private collapsed: boolean = true;
    private enabled: boolean = false;
    private dataContent: any[];

    constructor() {
        //
    }

    collapsePanel(collapse: boolean): void {
        this.collapsed = collapse;
    }

    setPanelContent(dataGridConfig: any, dataContent: any): void {
        this.dataContent = dataContent;
        this.enabled = (dataContent && dataContent.length > 0);
        this.dataTable.injectConfigAndData(dataGridConfig, dataContent, null, null);
    }
}