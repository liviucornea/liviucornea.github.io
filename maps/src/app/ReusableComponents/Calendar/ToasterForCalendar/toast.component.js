"use strict";
var core_1 = require('@angular/core');
var calendar_toast_service_1 = require("../../../ReusableServices/calendar.toast.service");
/**
 * A Toast component shows message with title and close button.
 */
var CalendarToastComponent = (function () {
    function CalendarToastComponent(toastSer) {
        this.closeToastEvent = new core_1.EventEmitter();
        this.toastService = toastSer;
    }
    CalendarToastComponent.prototype.close = function ($event) {
        $event.preventDefault();
        this.closeToastEvent.next(this.toast);
    };
    CalendarToastComponent.prototype.eventDetail = function () {
        this.toastService.eventDetailClicked();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarToastComponent.prototype, "toast", void 0);
    __decorate([
        core_1.Output('closeToast'), 
        __metadata('design:type', Object)
    ], CalendarToastComponent.prototype, "closeToastEvent", void 0);
    CalendarToastComponent = __decorate([
        core_1.Component({
            selector: 'calendar-toast',
            template: require("./toast.html")
        }), 
        __metadata('design:paramtypes', [calendar_toast_service_1.CalendarToastyService])
    ], CalendarToastComponent);
    return CalendarToastComponent;
}());
exports.CalendarToastComponent = CalendarToastComponent;
//# sourceMappingURL=toast.component.js.map