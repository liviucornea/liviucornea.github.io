"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var _Score_1 = require("./rulesSource/_Score");
(function (SlimLoadingBarEventType) {
    SlimLoadingBarEventType[SlimLoadingBarEventType["PROGRESS"] = 0] = "PROGRESS";
    SlimLoadingBarEventType[SlimLoadingBarEventType["HEIGHT"] = 1] = "HEIGHT";
    SlimLoadingBarEventType[SlimLoadingBarEventType["COLOR"] = 2] = "COLOR";
    SlimLoadingBarEventType[SlimLoadingBarEventType["VISIBLE"] = 3] = "VISIBLE";
})(exports.SlimLoadingBarEventType || (exports.SlimLoadingBarEventType = {}));
var SlimLoadingBarEventType = exports.SlimLoadingBarEventType;
var SlimLoadingBarEvent = (function () {
    function SlimLoadingBarEvent(type, value) {
        this.type = type;
        this.value = value;
    }
    return SlimLoadingBarEvent;
}());
exports.SlimLoadingBarEvent = SlimLoadingBarEvent;
/**
 * SlimLoadingBar service helps manage Slim Loading bar on the top of screen or parent component
 */
var SlimLoadingBarService = (function () {
    function SlimLoadingBarService() {
        var _this = this;
        this._progress = 0;
        this._height = '2px';
        this._color = 'firebrick';
        this._visible = true;
        this._intervalCounterId = 0;
        this.interval = 500; // in milliseconds
        this.observable = new Observable_1.Observable(function (subscriber) {
            _this.subscriber = subscriber;
        });
    }
    Object.defineProperty(SlimLoadingBarService.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (value) {
            if (_Score_1._Score.isPresent(value)) {
                if (value > 0) {
                    this.visible = true;
                }
                this._progress = value;
                this.emitEvent(new SlimLoadingBarEvent(SlimLoadingBarEventType.PROGRESS, this._progress));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimLoadingBarService.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (_Score_1._Score.isPresent(value)) {
                this._height = value;
                this.emitEvent(new SlimLoadingBarEvent(SlimLoadingBarEventType.HEIGHT, this._height));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimLoadingBarService.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            if (_Score_1._Score.isPresent(value)) {
                this._color = value;
                this.emitEvent(new SlimLoadingBarEvent(SlimLoadingBarEventType.COLOR, this._color));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlimLoadingBarService.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            if (_Score_1._Score.isPresent(value)) {
                this._visible = value;
                this.emitEvent(new SlimLoadingBarEvent(SlimLoadingBarEventType.VISIBLE, this._visible));
            }
        },
        enumerable: true,
        configurable: true
    });
    SlimLoadingBarService.prototype.emitEvent = function (event) {
        if (this.subscriber) {
            // Push up a new event
            this.subscriber.next(event);
        }
    };
    SlimLoadingBarService.prototype.start = function (onCompleted) {
        var _this = this;
        if (onCompleted === void 0) { onCompleted = null; }
        // Stop current timer
        this.stop();
        // Make it visible for sure
        this.visible = true;
        // Run the timer with milliseconds iterval
        this._intervalCounterId = setInterval(function () {
            // Increment the progress and update view component
            _this.progress++;
            // If the progress is 100% - call complete
            if (_this.progress === 100) {
                _this.complete();
            }
        }, this.interval);
    };
    SlimLoadingBarService.prototype.stop = function () {
        if (this._intervalCounterId) {
            clearInterval(this._intervalCounterId);
            this._intervalCounterId = null;
        }
    };
    SlimLoadingBarService.prototype.reset = function () {
        this.stop();
        this.progress = 0;
    };
    SlimLoadingBarService.prototype.complete = function () {
        var _this = this;
        this.progress = 100;
        this.stop();
        setTimeout(function () {
            // Hide it away
            _this.visible = false;
            setTimeout(function () {
                // Drop to 0
                _this.progress = 0;
            }, 250);
        }, 250);
    };
    SlimLoadingBarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SlimLoadingBarService);
    return SlimLoadingBarService;
}());
exports.SlimLoadingBarService = SlimLoadingBarService;
//# sourceMappingURL=slimLoadingBarService.js.map