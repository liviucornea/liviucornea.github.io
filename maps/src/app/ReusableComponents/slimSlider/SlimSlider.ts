import {Component,Input} from '@angular/core';

import {_Score} from "../../ReusableServices/rulesSource/_Score";
import {
    SlimLoadingBarService, SlimLoadingBarEvent,
    SlimLoadingBarEventType
} from "../../ReusableServices/slimLoadingBarService";

@Component({
    selector: 'ng2-slim-loading-bar',
    template: `
<div class="slim-loading-bar">
    <div class="slim-loading-bar-progress" [style.width]="progress" [style.backgroundColor]="color" [style.color]="color"
        [style.height]="height" [style.opacity]="show ? '1' : '0'"></div>
</div>`
})
export class SlimSliderComponent{

    private progressEl:HTMLDivElement;

    private _progress: string = '0%';
    @Input() set progress(value: string) {
        if (_Score.isPresent(value)) {
            this._progress = value + '%';
        }
    }
    get progress(): string {
        return this._progress;
    }

    @Input() color: string = 'firebrick';
    @Input() height: string = '2px';
    @Input() show: boolean = true;

    constructor(private service:SlimLoadingBarService) {}

    ngOnInit(): any {
        this.service.observable.subscribe((event:SlimLoadingBarEvent) => {
            if (event.type === SlimLoadingBarEventType.PROGRESS) {
                this.progress = event.value;
            } else if (event.type === SlimLoadingBarEventType.COLOR) {
                this.color = event.value;
            } else if (event.type === SlimLoadingBarEventType.HEIGHT) {
                this.height = event.value;
            } else if (event.type === SlimLoadingBarEventType.VISIBLE) {
                this.show = event.value;
            }
        });
    }
}