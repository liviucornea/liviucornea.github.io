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
var toasty_utils_1 = require('./toasty.utils');
var toasty_service_1 = require("../../../ReusableServices/toasty.service");
var calendar_toast_service_1 = require("../../../ReusableServices/calendar.toast.service");
/**
 * Toasty is container for Toast components
 */
var CalendarToastyComponent = (function () {
    function CalendarToastyComponent(config, toastyService) {
        this.config = config;
        this.toastyService = toastyService;
        this._position = '';
        // The storage for toasts.
        this.toasts = [];
        // Initialise position
        this.position = '';
    }
    Object.defineProperty(CalendarToastyComponent.prototype, "position", {
        get: function () {
            return this._position;
        },
        // The window position where the toast pops up. Possible values:
        // - bottom-right (default value from ToastConfig)
        // - bottom-left
        // - top-right
        // - top-left
        // - top-center
        // - bottom-center
        // - center-center
        set: function (value) {
            if (value) {
                var notFound = true;
                for (var i = 0; i < CalendarToastyComponent.POSITIONS.length; i++) {
                    if (CalendarToastyComponent.POSITIONS[i] === value) {
                        notFound = false;
                        break;
                    }
                }
                if (notFound) {
                    // Position was wrong - clear it here to use the one from config.
                    value = this.config.position;
                }
            }
            else {
                value = this.config.position;
            }
            this._position = 'toasty-position-' + value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated.
     */
    CalendarToastyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // We listen our service to recieve new toasts from it
        this.toastyService.getToasts().subscribe(function (toast) {
            // If we've gone over our limit, remove the earliest
            // one from the array
            if (_this.toasts.length >= _this.config.limit) {
                _this.toasts.shift();
            }
            // Add toasty to array
            _this.toasts.push(toast);
            //
            // If there's a timeout individually or globally,
            // set the toast to timeout
            if (toast.timeout) {
                _this._setTimeout(toast);
            }
        });
        // We listen clear all comes from service here.
        this.toastyService.getClear().subscribe(function (id) {
            if (id) {
                _this.clear(id);
            }
            // Lets clear all toasts
            _this.clearAll();
        });
    };
    /**
     * Event listener of 'closeToast' event comes from ToastyComponent.
     * This method removes ToastComponent assosiated with this Toast.
     */
    CalendarToastyComponent.prototype.closeToast = function (toast) {
        this.clear(toast.id);
    };
    /**
     * Clear individual toast by id
     * @param id is unique identifier of Toast
     */
    CalendarToastyComponent.prototype.clear = function (id) {
        var _this = this;
        if (id) {
            this.toasts.forEach(function (value, key) {
                if (value.id === id) {
                    if (value.onRemove && toasty_utils_1.isFunction(value.onRemove)) {
                        value.onRemove.call(_this, value);
                    }
                    _this.toasts.splice(key, 1);
                }
            });
        }
        else {
            throw new Error('Please provide id of Toast to close');
        }
    };
    /**
     * Clear all toasts
     */
    CalendarToastyComponent.prototype.clearAll = function () {
        var _this = this;
        this.toasts.forEach(function (value, key) {
            if (value.onRemove && toasty_utils_1.isFunction(value.onRemove)) {
                value.onRemove.call(_this, value);
            }
        });
        this.toasts = [];
    };
    /**
     * Custom setTimeout function for specific setTimeouts on individual toasts.
     */
    CalendarToastyComponent.prototype._setTimeout = function (toast) {
        var _this = this;
        window.setTimeout(function () {
            _this.clear(toast.id);
        }, toast.timeout);
    };
    /**
     * Set of constants defins position of Toasty on the page.
     */
    CalendarToastyComponent.POSITIONS = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center', 'center-center'];
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], CalendarToastyComponent.prototype, "position", null);
    CalendarToastyComponent = __decorate([
        core_1.Component({
            selector: 'calendar-toasty',
            template: require('./toasty.html')
        }), 
        __metadata('design:paramtypes', [toasty_service_1.ToastyConfig, calendar_toast_service_1.CalendarToastyService])
    ], CalendarToastyComponent);
    return CalendarToastyComponent;
}());
exports.CalendarToastyComponent = CalendarToastyComponent;
//# sourceMappingURL=toasty.component.js.map