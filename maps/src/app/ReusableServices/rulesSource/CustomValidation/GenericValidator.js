"use strict";
var GenericValidator = (function () {
    function GenericValidator() {
        this.genericFunctionResult = false;
        this.tagName = 'genericValidator';
    }
    GenericValidator.prototype.isAcceptable = function (s) {
        return this.genericFunctionResult;
    };
    return GenericValidator;
}());
exports.GenericValidator = GenericValidator;
//# sourceMappingURL=GenericValidator.js.map