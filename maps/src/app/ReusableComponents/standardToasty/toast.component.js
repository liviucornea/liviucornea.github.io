"use strict";
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