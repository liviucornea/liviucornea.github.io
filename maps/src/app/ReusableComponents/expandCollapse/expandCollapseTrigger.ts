/**
 * Created by vikhnv2 on 5/19/2016.
 */
import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'ec-trigger',
    template: require('./expandCollapseTrigger.html')
})

export class ExpandCollapseTrigger implements OnChanges {
    private triggerCss:string;

    @Input() collapsed:boolean;
    @Input() owner:any;
    @Input() columnName: string;
    constructor() {
    }

    ngOnChanges(changes) {
        if (changes['collapsed']) {
            this.setCss();
        }
    }

    toggle():void {
        this.owner.collapsed = this.collapsed = !this.collapsed;
        this.owner['selectedColumnName'] = this.columnName;
        this.setCss();
    }

    setCss():void {
        this.triggerCss = "fa " + (this.collapsed ? "fa-plus-circle" : "fa-minus-circle");
    }
}