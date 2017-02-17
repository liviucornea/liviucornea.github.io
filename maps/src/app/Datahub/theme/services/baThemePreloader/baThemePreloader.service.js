"use strict";
var core_1 = require('@angular/core');
var BaThemePreloader = (function () {
    function BaThemePreloader() {
    }
    BaThemePreloader.registerLoader = function (method) {
        BaThemePreloader._loaders.push(method);
    };
    BaThemePreloader.clear = function () {
        BaThemePreloader._loaders = [];
    };
    BaThemePreloader.load = function () {
        return new Promise(function (resolve, reject) {
            BaThemePreloader._executeAll(resolve);
        });
    };
    BaThemePreloader._executeAll = function (done) {
        setTimeout(function () {
            Promise.all(BaThemePreloader._loaders).then(function (values) {
                done.call(null, values);
            }).catch(function (error) {
                console.error(error);
            });
        });
    };
    BaThemePreloader._loaders = [];
    BaThemePreloader = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaThemePreloader);
    return BaThemePreloader;
}());
exports.BaThemePreloader = BaThemePreloader;
//# sourceMappingURL=baThemePreloader.service.js.map