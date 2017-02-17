"use strict";
var _Score_1 = require('../_Score');
var ParamValidator = (function () {
    function ParamValidator() {
        this.isAsync = true;
        this.tagName = 'param';
    }
    ParamValidator.prototype.isAcceptable = function (s) {
        var result;
        var deferred = new Promise(function (x) { x(result); });
        this.Options(this.ParamId).then(function (result) {
            var hasSome = _Score_1._Score.some(result, function (item) {
                return item.text === s;
            });
            if (hasSome) {
                this.result = true;
            }
            else {
                this.result = false;
            }
            Promise.resolve(deferred);
        });
        return deferred;
    };
    return ParamValidator;
}());
//# sourceMappingURL=ParamValidator.js.map