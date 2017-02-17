"use strict";
var _Score = (function () {
    function _Score() {
    }
    _Score.isNumber = function (s) {
        return (typeof s === 'number');
    };
    _Score.isBoolean = function (s) {
        return (typeof s === 'boolean');
    };
    _Score.isString = function (s) {
        return (typeof s === 'string');
    };
    _Score.isObject = function (s) {
        return (typeof s === 'object');
    };
    _Score.isFunction = function (s) {
        return (Object.prototype.toString.call(s) === '[object Function]');
    };
    _Score.isArray = function (s) {
        return (Object.prototype.toString.call(s) === '[object Array]');
    };
    _Score.uniq = function (array) {
        var result = new Array();
        for (var i = 0, length = array.length; i < length; i++) {
            var value = array[i];
            var ind = result.indexOf(result);
            if (ind < 0) {
                result.push(value);
            }
        }
        return result;
    };
    _Score.contains = function (set, lookupObj) {
        var result = set.indexOf(lookupObj);
        return (result >= 0);
    };
    _Score.extend = function (obj1, obj2) {
        for (var ind in obj2) {
            obj1[ind] = obj2[ind];
        }
    };
    _Score.some = function (obj, predicate) {
        for (var index in obj) {
            if (predicate(obj[index]))
                return true;
        }
        return false;
    };
    ;
    _Score.isDate = function (input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    };
    ;
    _Score.lpad = function (str, length, padStr) {
        return _Score.pad(str, length, padStr, 'left');
    };
    ;
    _Score.rpad = function (str, length, padStr) {
        return _Score.pad(str, length, padStr, 'right');
    };
    ;
    _Score.lrpad = function (str, length, padStr) {
        return _Score.pad(str, length, padStr, 'both');
    };
    _Score.pad = function (str, length, padStr, type) {
        str = str == null ? '' : String(str);
        length = ~~length;
        var padlen = 0;
        if (!padStr)
            padStr = ' ';
        else if (padStr.length > 1)
            padStr = padStr.charAt(0);
        switch (type) {
            case 'right':
                padlen = length - str.length;
                return str + _Score.strRepeat(padStr, padlen);
            case 'both':
                padlen = length - str.length;
                return _Score.strRepeat(padStr, Math.ceil(padlen / 2)) + str
                    + _Score.strRepeat(padStr, Math.floor(padlen / 2));
            default:
                padlen = length - str.length;
                return _Score.strRepeat(padStr, padlen) + str;
        }
    };
    _Score.strRepeat = function (str, qty) {
        if (qty < 1)
            return '';
        var result = '';
        while (qty > 0) {
            if (qty & 1)
                result += str;
            qty >>= 1, str += str;
        }
        return result;
    };
    _Score.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    return _Score;
}());
exports._Score = _Score;
//# sourceMappingURL=_Score.js.map