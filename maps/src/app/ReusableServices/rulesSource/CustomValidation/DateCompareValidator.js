"use strict";
var Validation_1 = require("../StandardValidation/Validation");
var genericfunctions_1 = require("../../genericfunctions");
var DateCompareValidator = (function () {
    function DateCompareValidator() {
        /**
         * It forces to ignore time part of date by date compare.
         */
        this.IgnoreTime = false;
        this.tagName = 'dateCompare';
    }
    DateCompareValidator.prototype.isAcceptable = function (s) {
        var isValid = false;
        //if date to compare is not specified - defaults to compare against now
        if (isNaN(Date.parse(s))) {
            return false;
        }
        ;
        if (this.CompareTo === undefined)
            Date.now();
        var now = moment(genericfunctions_1.toUTCDate(this.CompareTo));
        var then = moment(genericfunctions_1.toUTCDate(new Date(s)));
        var diffs = then.diff(now);
        if (this.IgnoreTime)
            diffs = moment.duration(diffs).days();
        if (diffs < 0) {
            isValid = this.CompareOperator === Validation_1.CompareOperator.LessThan
                || this.CompareOperator === Validation_1.CompareOperator.LessThanEqual
                || this.CompareOperator === Validation_1.CompareOperator.NotEqual;
        }
        else if (diffs > 0) {
            isValid = this.CompareOperator === Validation_1.CompareOperator.GreaterThan
                || this.CompareOperator === Validation_1.CompareOperator.GreaterThanEqual
                || this.CompareOperator === Validation_1.CompareOperator.NotEqual;
        }
        else {
            isValid = this.CompareOperator === Validation_1.CompareOperator.LessThanEqual
                || this.CompareOperator === Validation_1.CompareOperator.Equal
                || this.CompareOperator === Validation_1.CompareOperator.GreaterThanEqual;
        }
        return isValid;
    };
    return DateCompareValidator;
}());
exports.DateCompareValidator = DateCompareValidator;
//# sourceMappingURL=DateCompareValidator.js.map