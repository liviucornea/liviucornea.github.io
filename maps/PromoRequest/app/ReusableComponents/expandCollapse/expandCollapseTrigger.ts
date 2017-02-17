/**
 * Created by vikhnv2 on 5/19/2016.
 */
import {Component, Input, OnChanges} from 'angular2/core';

@Component({
    selector: 'ec-trigger',
    templateUrl: 'app/ReusableComponents/expandCollapse/expandCollapseTrigger.html'
})

export class ExpandCollapseTrigger implements OnChanges {
    private triggerCss:string;

    @Input() collapsed:boolean;
    @Input() owner:any;

    constructor() {
    }

    ngOnChanges(changes) {
        if (changes['collapsed']) {
            this.setCss();
        }
    }

    toggle():void {
        this.owner.collapsed = this.collapsed = !this.collapsed;
        this.setCss();
    }

    setCss():void {
        this.triggerCss = "glyphicon " + (this.collapsed ? "glyphicon-plus-sign" : "glyphicon-minus-sign");
    }
}