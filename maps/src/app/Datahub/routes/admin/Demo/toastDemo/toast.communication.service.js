"use strict";
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
/**
 * Service helps communicate between the ToastComponent and AppComponent.
 */
var ToastCommunicationService = (function () {
    function ToastCommunicationService() {
        // Observable string sources
        this.positionSource = new Subject_1.Subject();
        // Observable string streams
        this.position$ = this.positionSource.asObservable();
    }
    ToastCommunicationService.prototype.setPosition = function (position) {
        this.positionSource.next(position);
    };
    ToastCommunicationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ToastCommunicationService);
    return ToastCommunicationService;
}());
exports.ToastCommunicationService = ToastCommunicationService;
//# sourceMappingURL=toast.communication.service.js.map