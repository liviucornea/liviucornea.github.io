"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var localizationService_1 = require("../../ReusableServices/localizationService");
var genericfunctions_1 = require("../../ReusableServices/genericfunctions");
var _ = require('lodash');
var FormatGridColumnPipe = (function () {
    function FormatGridColumnPipe(localization) {
        this.localization = localization;
    }
    FormatGridColumnPipe.prototype.transform = function (value, args) {
        if (!(args)) {
            return value;
        }
        if (value == null) {
            return;
        }
        var output;
        var locale = this.localization.selectedLanguage.LangCode;
        var tokens;
        var digitalInfo = [];
        var formatType = args["format"].toLowerCase();
        if (formatType === "select" || formatType === "font-awesome") {
            tokens = args["pattern"];
        }
        else {
            tokens = args["pattern"].split(':');
        }
        switch (formatType) {
            case "date":
                if (isNaN(Date.parse(value))) {
                    return "";
                }
                var datePipe = new common_1.DatePipe(locale);
                output = datePipe.transform(genericfunctions_1.toUTCDate(new Date(value)), tokens[0]);
                break;
            case "number":
                if (isNaN(value)) {
                    return "";
                }
                digitalInfo = this.getDigitInfo(tokens[0]);
                var numPipe = new common_1.DecimalPipe(locale);
                var result = numPipe.transform(parseFloat(value), tokens[0]);
                output = this.addTrailingZeros(result, digitalInfo[2]);
                break;
            case "percent":
                if (isNaN(value)) {
                    return "";
                }
                digitalInfo = this.getDigitInfo(tokens[0]);
                var percentPipe = new common_1.PercentPipe(locale);
                result = percentPipe.transform(parseFloat(value), tokens[0]);
                output = this.addTrailingZeros(result, digitalInfo[2]);
                break;
            case "currency":
                if (isNaN(value)) {
                    return "";
                }
                digitalInfo = this.getDigitInfo(tokens[2]);
                var currencyPipe = new common_1.CurrencyPipe(locale);
                result = currencyPipe.transform(parseFloat(value), tokens[0], tokens[1], tokens[2]);
                output = this.addTrailingZeros(result, digitalInfo[2]);
                break;
            case "select":
                var selectPipe = new common_1.I18nSelectPipe();
                output = selectPipe.transform(String(value), tokens);
                break;
            case "font-awesome":
                var selectPipe = new common_1.I18nSelectPipe();
                output = selectPipe.transform(String(value), tokens);
                break;
            case "uppercase":
                output = value.toUpperCase();
                break;
            case "lowercase":
                output = value.toLowerCase();
                break;
            default:
                output = value;
        }
        return output;
    };
    FormatGridColumnPipe.prototype.getDigitInfo = function (input) {
        return input.split(/[.-]+/);
    };
    FormatGridColumnPipe.prototype.addTrailingZeros = function (input, fractionDigits) {
        var res = input.split(".");
        var out = input;
        if (input.indexOf('.') === -1) {
            out = input + '.' + _.repeat('0', fractionDigits);
        }
        else if (res[1].length < fractionDigits) {
            out = res[0] + '.' + _.padEnd(res[1], fractionDigits, '0');
        }
        return out;
    };
    FormatGridColumnPipe = __decorate([
        core_1.Pipe({ name: 'formatGridColumn' }), 
        __metadata('design:paramtypes', [localizationService_1.LocalizationService])
    ], FormatGridColumnPipe);
    return FormatGridColumnPipe;
}());
exports.FormatGridColumnPipe = FormatGridColumnPipe;
//# sourceMappingURL=formatGridColumn.js.map