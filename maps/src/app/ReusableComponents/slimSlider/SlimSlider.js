"use strict";
var core_1 = require('@angular/core');
var _Score_1 = require("../../ReusableServices/rulesSource/_Score");
var slimLoadingBarService_1 = require("../../ReusableServices/slimLoadingBarService");
var SlimSliderComponent = (function () {
    function SlimSliderComponent(service) {
        this.service = service;
        this._progress = '0%';
        this.color = 'firebrick';
        this.height = '2px';
        this.show = true;
    }
    Object.defineProperty(SlimSliderComponent.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (value) {
            if (_Score_1._Score.isPresent(value)) {
                this._progress = value + '%';
            }
        },
        enumerable: true,
        configurable: true
    });
    SlimSliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.observable.subscribe(function (event) {
            if (event.type === slimLoadingBarService_1.SlimLoadingBarEventType.PROGRESS) {
                _this.progress = event.value;
            }
            else if (event.type === slimLoadingBarService_1.SlimLoadingBarEventType.COLOR) {
                _this.color = event.value;
            }
            else if (event.type === slimLoadingBarService_1.SlimLoadingBarEventType.HEIGHT) {
                _this.height = event.value;
            }
            else if (event.type === slimLoadingBarService_1.SlimLoadingBarEventType.VISIBLE) {
                _this.show = event.value;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], SlimSliderComponent.prototype, "progress", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlimSliderComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlimSliderComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SlimSliderComponent.prototype, "show", void 0);
    SlimSliderComponent = __decorate([
        core_1.Component({
            selector: 'ng2-slim-loading-bar',
            template: "\n<div class=\"slim-loading-bar\">\n    <div class=\"slim-loading-bar-progress\" [style.width]=\"progress\" [style.backgroundColor]=\"color\" [style.color]=\"color\"\n        [style.height]=\"height\" [style.opacity]=\"show ? '1' : '0'\"></div>\n</div>"
        }), 
        __metadata('design:paramtypes', [slimLoadingBarService_1.SlimLoadingBarService])
    ], SlimSliderComponent);
    return SlimSliderComponent;
}());
exports.SlimSliderComponent = SlimSliderComponent;
//# sourceMappingURL=SlimSlider.js.map