"use strict";
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var interFormsService_1 = require("../../ReusableServices/interFormsService");
var SpinnerComponent = (function () {
    function SpinnerComponent(interForm) {
        var _this = this;
        this.interForm = interForm;
        this.isDelayedRunning = false;
        this.spinnerText = 'Loading contents...';
        this.spinnerScope = 'page';
        this.delay = 300;
        this.scope = 'card';
        this.text = '';
        this.spinnerSubscription = this.interForm.spinnerEmitter.subscribe(function (value) {
            _this.isDelayedRunning = value.isSpinnerRunning;
            _this.spinnerText = value.spinnerText;
            _this.spinnerScope = value.spinnerScope;
        });
    }
    Object.defineProperty(SpinnerComponent.prototype, "isRunning", {
        set: function (value) {
            if (!value) {
                this.cancelTimeout();
                this.isDelayedRunning = false;
            }
            if (this.currentTimeout) {
                return;
            }
            var timer = Rx_1.Observable.timer(5, this.delay);
            var self = this;
            this.currentTimeout = timer.subscribe(function (t) {
                self.isDelayedRunning = value;
                self.cancelTimeout();
            });
        },
        enumerable: true,
        configurable: true
    });
    SpinnerComponent.prototype.cancelTimeout = function () {
        if (this.currentTimeout) {
            this.currentTimeout.unsubscribe();
        }
        this.currentTimeout = undefined;
    };
    SpinnerComponent.prototype.ngOnDestroy = function () {
        if (this.spinnerSubscription) {
            this.spinnerSubscription.unsubscribe();
        }
        this.cancelTimeout();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SpinnerComponent.prototype, "delay", void 0);
    SpinnerComponent = __decorate([
        core_1.Component({
            selector: 'spinner',
            template: require('./spinner.html'),
        }), 
        __metadata('design:paramtypes', [interFormsService_1.InterFormsService])
    ], SpinnerComponent);
    return SpinnerComponent;
}());
exports.SpinnerComponent = SpinnerComponent;
//# sourceMappingURL=spinner.component.js.map