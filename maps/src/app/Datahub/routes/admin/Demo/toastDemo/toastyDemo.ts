import {Component, Injectable} from '@angular/core';
import {ToastCommunicationService} from "./toast.communication.service";
import {Observable, Subscription} from 'rxjs/Rx';
import {ToastData, ToastOptions, ToastyService} from "../../../../../ReusableServices/toasty.service";


@Component({
    selector: 'demo-toast',
    template: require('./toastyDemo.html')
})
export class ToastDemo {

    position: string;
    themes:any;
    types:any;
    options:any;
    positions:any;

    getTitle(num: number): string {
        return 'Countdown: ' + num;
    }

    getMessage(num: number): string {
        return 'Seconds left: ' + num;
    }

    constructor(private toastyService: ToastyService, private toastCommunicationService: ToastCommunicationService) {
        this.position = this.toastyService.positions[2].code;
        this.options = {
            title: 'Toast It!',
            msg: 'Mmmm, tasties...',
            showClose: true,
            timeout: 5000,
            theme: this.toastyService.themes[0].code,
            type: this.toastyService.types[0].code
        };
        this.toastCommunicationService.position$.subscribe(pos => this.position = pos);
        this.themes=this.toastyService.themes;
        this.types=this.toastyService.types;
        this.positions=this.toastyService.positions;

    }

    newToast() {
        let toastOptions: ToastOptions = {
            title: this.options.title,
            msg: this.options.msg,
            showClose: this.options.showClose,
            timeout: this.options.timeout,
            theme: this.options.theme,
            position: this.position,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };

        switch (this.options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }

    newCountdownToast() {
        let interval = 1000;
        let seconds = this.options.timeout / 1000;
        let subscription: Subscription;

        let toastOptions: ToastOptions = {
            title: this.getTitle(seconds || 0),
            msg: this.getMessage(seconds || 0),
            showClose: this.options.showClose,
            timeout: this.options.timeout,
            theme: this.options.theme,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
                // Run the timer with 1 second iterval
                let observable = Observable.interval(interval).take(seconds);
                // Start listen seconds bit
                subscription = observable.subscribe((count: number) => {
                    // Update title
                    toast.title = this.getTitle(seconds - count - 1 || 0);
                    // Update message
                    toast.msg = this.getMessage(seconds - count - 1 || 0);
                });

            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
                // Stop listenning
                subscription.unsubscribe();
            }
        };

        switch (this.options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }

    clearToasties() {
        this.toastyService.clearAll();
    }

    changePosition($event) {
        this.position = $event;
        // Update position of the Toasty Component
        this.toastCommunicationService.setPosition(this.position);
    }
}
