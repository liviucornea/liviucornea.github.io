"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var toasty_service_1 = require("../../ReusableServices/toasty.service");
/**
 * A Toast component shows message with title and close button.
 */
var ToastComponent = (function () {
    function ToastComponent(toastSer) {
        this.closeToastEvent = new core_1.EventEmitter();
        this.toastService = toastSer;
    }
    ToastComponent.prototype.close = function ($event) {
        $event.preventDefault();
        this.closeToastEvent.next(this.toast);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ToastComponent.prototype, "toast", void 0);
    __decorate([
        core_1.Output('closeToast'), 
        __metadata('design:type', Object)
    ], ToastComponent.prototype, "closeToastEvent", void 0);
    ToastComponent = __decorate([
        core_1.Component({
            selector: 'ng2-toast',
            template: require("./toast.html")
        }), 
        __metadata('design:paramtypes', [toasty_service_1.ToastyService])
    ], ToastComponent);
    return ToastComponent;
}());
exports.ToastComponent = ToastComponent;
//# sourceMappingURL=toast.component.js.map