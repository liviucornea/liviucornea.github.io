"use strict";
var core_1 = require('@angular/core');
var toast_communication_service_1 = require("./toast.communication.service");
var Rx_1 = require('rxjs/Rx');
var toasty_service_1 = require("../../../../../ReusableServices/toasty.service");
var ToastDemo = (function () {
    function ToastDemo(toastyService, toastCommunicationService) {
        var _this = this;
        this.toastyService = toastyService;
        this.toastCommunicationService = toastCommunicationService;
        this.position = this.toastyService.positions[2].code;
        this.options = {
            title: 'Toast It!',
            msg: 'Mmmm, tasties...',
            showClose: true,
            timeout: 5000,
            theme: this.toastyService.themes[0].code,
            type: this.toastyService.types[0].code
        };
        this.toastCommunicationService.position$.subscribe(function (pos) { return _this.position = pos; });
        this.themes = this.toastyService.themes;
        this.types = this.toastyService.types;
        this.positions = this.toastyService.positions;
    }
    ToastDemo.prototype.getTitle = function (num) {
        return 'Countdown: ' + num;
    };
    ToastDemo.prototype.getMessage = function (num) {
        return 'Seconds left: ' + num;
    };
    ToastDemo.prototype.newToast = function () {
        var toastOptions = {
            title: this.options.title,
            msg: this.options.msg,
            showClose: this.options.showClose,
            timeout: this.options.timeout,
            theme: this.options.theme,
            position: this.position,
            onAdd: function (toast) {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function (toast) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        switch (this.options.type) {
            case 'default':
                this.toastyService.default(toastOptions);
                break;
            case 'info':
                this.toastyService.info(toastOptions);
                break;
            case 'success':
                this.toastyService.success(toastOptions);
                break;
            case 'wait':
                this.toastyService.wait(toastOptions);
                break;
            case 'error':
                this.toastyService.error(toastOptions);
                break;
            case 'warning':
                this.toastyService.warning(toastOptions);
                break;
        }
    };
    ToastDemo.prototype.newCountdownToast = function () {
        var _this = this;
        var interval = 1000;
        var seconds = this.options.timeout / 1000;
        var subscription;
        var toastOptions = {
            title: this.getTitle(seconds || 0),
            msg: this.getMessage(seconds || 0),
            showClose: this.options.showClose,
            timeout: this.options.timeout,
            theme: this.options.theme,
            onAdd: function (toast) {
                console.log('Toast ' + toast.id + ' has been added!');
                // Run the timer with 1 second iterval
                var observable = Rx_1.Observable.interval(interval).take(seconds);
                // Start listen seconds bit
                subscription = observable.subscribe(function (count) {
                    // Update title
                    toast.title = _this.getTitle(seconds - count - 1 || 0);
                    // Update message
                    toast.msg = _this.getMessage(seconds - count - 1 || 0);
                });
            },
            onRemove: function (toast) {
                console.log('Toast ' + toast.id + ' has been removed!');
                // Stop listenning
                subscription.unsubscribe();
            }
        };
        switch (this.options.type) {
            case 'default':
                this.toastyService.default(toastOptions);
                break;
            case 'info':
                this.toastyService.info(toastOptions);
                break;
            case 'success':
                this.toastyService.success(toastOptions);
                break;
            case 'wait':
                this.toastyService.wait(toastOptions);
                break;
            case 'error':
                this.toastyService.error(toastOptions);
                break;
            case 'warning':
                this.toastyService.warning(toastOptions);
                break;
        }
    };
    ToastDemo.prototype.clearToasties = function () {
        this.toastyService.clearAll();
    };
    ToastDemo.prototype.changePosition = function ($event) {
        this.position = $event;
        // Update position of the Toasty Component
        this.toastCommunicationService.setPosition(this.position);
    };
    ToastDemo = __decorate([
        core_1.Component({
            selector: 'demo-toast',
            template: require('./toastyDemo.html')
        }), 
        __metadata('design:paramtypes', [toasty_service_1.ToastyService, toast_communication_service_1.ToastCommunicationService])
    ], ToastDemo);
    return ToastDemo;
}());
exports.ToastDemo = ToastDemo;
//# sourceMappingURL=toastyDemo.js.map