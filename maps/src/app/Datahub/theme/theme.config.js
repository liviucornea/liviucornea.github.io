"use strict";
var core_1 = require('@angular/core');
var theme_configProvider_1 = require('./theme.configProvider');
var BaThemeConfig = (function () {
    function BaThemeConfig(_baConfig) {
        this._baConfig = _baConfig;
        this._config();
    }
    BaThemeConfig.prototype._config = function () {
    };
    BaThemeConfig = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [theme_configProvider_1.BaThemeConfigProvider])
    ], BaThemeConfig);
    return BaThemeConfig;
}());
exports.BaThemeConfig = BaThemeConfig;
//# sourceMappingURL=theme.config.js.map