
import {Component, Input, OnDestroy} from 'angular2/core';
import Timer = NodeJS.Timer;

@Component({
    selector: 'spinner',
    templateUrl: 'app/ReusableComponents/spinner/spinner.html',
})
export class SpinnerComponent implements OnDestroy {
    private currentTimeout: Timer;
    private isDelayedRunning: boolean = false;

    @Input()
    public delay: number = 300;

    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
        }

        if (this.currentTimeout) {
            return;
        }

        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    ngOnDestroy(): any {
        this.cancelTimeout();
    }
}