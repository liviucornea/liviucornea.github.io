"use strict";
var core_1 = require('@angular/core');
var BaThemeSpinner = (function () {
    function BaThemeSpinner() {
        this._selector = 'preloader';
        this._element = document.getElementById(this._selector);
    }
    BaThemeSpinner.prototype.show = function () {
        this._element.style['display'] = 'block';
    };
    BaThemeSpinner.prototype.hide = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        setTimeout(function () {
            _this._element.style['display'] = 'none';
        }, delay);
    };
    BaThemeSpinner = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaThemeSpinner);
    return BaThemeSpinner;
}());
exports.BaThemeSpinner = BaThemeSpinner;
//# sourceMappingURL=baThemeSpinner.service.js.map