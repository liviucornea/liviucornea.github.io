import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import {InterFormsService} from "../../ReusableServices/interFormsService";

@Component({
    selector: 'spinner',
    template: require ('./spinner.html'),
})
export class SpinnerComponent implements OnDestroy {
    private currentTimeout: Subscription;
    private isDelayedRunning: boolean = false;
    spinnerSubscription: Subscription;
    spinnerText: string = 'Loading contents...';
    spinnerScope: string = 'page';

    @Input() public delay: number = 300;
    private scope: string = 'card';
    private text: string = '';

    constructor(private interForm: InterFormsService)
    {
        this.spinnerSubscription = this.interForm.spinnerEmitter.subscribe((value) => {
            this.isDelayedRunning = value.isSpinnerRunning;
            this.spinnerText = value.spinnerText;
            this.spinnerScope = value.spinnerScope;
        });
    }

    private set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
        }
        if (this.currentTimeout) {
            return;
        }
        let timer = Observable.timer(5, this.delay);
        var self = this;
        this.currentTimeout = timer.subscribe(t => {
            self.isDelayedRunning = value;
            self.cancelTimeout();
        })

    }


    private cancelTimeout(): void {
        if (this.currentTimeout) {
            this.currentTimeout.unsubscribe();
        }
        this.currentTimeout = undefined;
    }

    ngOnDestroy(): any {
        if(this.spinnerSubscription){
            this.spinnerSubscription.unsubscribe();
        }
        this.cancelTimeout();
    }
}