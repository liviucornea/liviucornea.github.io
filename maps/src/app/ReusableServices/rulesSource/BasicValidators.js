"use strict";
const _Score_1 = require("./_Score");
class NumberFce {
    static GetNegDigits(value) {
        if (value === undefined)
            return 0;
        var digits = value.toString().split('.');
        if (digits.length > 1) {
            return digits[1].length;
        }
        return 0;
    }
}
/**
 * Return true if it is a valid string letter representation, otherwise false.
 */
class LettersOnlyValidator {
    constructor() {
        this.lettersRegexp = /^[A-Za-z]+$/;
        this.tagName = "lettersonly";
    }
    isAcceptable(s) {
        return this.lettersRegexp.test(s);
    }
}
exports.LettersOnlyValidator = LettersOnlyValidator;
/**
 * Return true if it is a valid zip code, otherwise false.
 */
class ZipCodeValidator {
    constructor() {
        this.numberRegexp = /^[0-9]+$/;
        this.tagName = "zipcode";
    }
    isAcceptable(s) {
        return s.length === 5 && this.numberRegexp.test(s);
    }
}
exports.ZipCodeValidator = ZipCodeValidator;
/**
 * Return true if it is a valid Internet email address as defined by RFC 5322, section 3.4.1, otherwise false
 */
class EmailValidator {
    constructor() {
        // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
        this.emailRegexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        this.tagName = "email";
    }
    isAcceptable(s) {
        return this.emailRegexp.test(s);
    }
}
exports.EmailValidator = EmailValidator;
/**
 * Return true if it is a valid URI, according to [RFC3986], otherwise false.
 */
class UrlValidator {
    constructor() {
        // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
        this.urlRegexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        this.tagName = "url";
    }
    isAcceptable(s) {
        return this.urlRegexp.test(s);
    }
}
exports.UrlValidator = UrlValidator;
/**
 * Return true if it is a valid Luhn card number based on http://en.wikipedia.org/wiki/Luhn/, otherwise false;
 */
class CreditCardValidator {
    constructor() {
        this.tagName = "creditcard";
    }
    //taken from http://jqueryvalidation.org/creditcard-method/
    isAcceptable(value) {
        // accept only spaces, digits and dashes
        if (/[^0-9 \-]+/.test(value)) {
            return false;
        }
        var nCheck = 0, nDigit = 0, bEven = false, n, cDigit;
        value = value.replace(/\D/g, "");
        // Basing min and max length on
        // http://developer.ean.com/general_info/Valid_Credit_Card_Types
        if (value.length < 13 || value.length > 19) {
            return false;
        }
        for (n = value.length - 1; n >= 0; n--) {
            cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9;
                }
            }
            nCheck += nDigit;
            bEven = !bEven;
        }
        return (nCheck % 10) === 0;
    }
}
exports.CreditCardValidator = CreditCardValidator;
/**
 * Return true if it is not empty value, otherwise false.
 */
class RequiredValidator {
    constructor() {
        this.tagName = "required";
    }
    isAcceptable(s) {
        return s !== undefined && s !== "";
    }
}
exports.RequiredValidator = RequiredValidator;
/**
 * Return true if a value is equal (using strict equal) to passed value, otherwise false.
 */
class EqualToValidator {
    /**
     *
     * @param Value
     */
    constructor(Value) {
        this.Value = Value;
        this.tagName = "equalTo";
    }
    isAcceptable(s) {
        return s === this.Value;
    }
}
exports.EqualToValidator = EqualToValidator;
/**
 * Return true if it is a valid string date representation (can be parsed as date), otherwise false.
 */
class DateValidator {
    constructor() {
        this.tagName = "date";
    }
    isAcceptable(s) {
        return !/Invalid|NaN/.test(new Date(s).toString());
    }
}
exports.DateValidator = DateValidator;
/**
 * Return true if it is a valid string ISO date representation (can be parsed as ISO date), otherwise false.
 */
class DateISOValidator {
    constructor() {
        this.tagName = "dateISO";
    }
    isAcceptable(s) {
        return /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(s);
    }
}
exports.DateISOValidator = DateISOValidator;
/**
 * Return true if it is a valid number representation, otherwise false.
 */
class NumberValidator {
    constructor() {
        this.tagName = "number";
    }
    isAcceptable(s) {
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(s);
    }
}
exports.NumberValidator = NumberValidator;
/**
 * Return true if it is a valid digit representation, otherwise false.
 */
class DigitValidator {
    constructor() {
        this.tagName = "digit";
    }
    isAcceptable(s) {
        return /^\d+$/.test(s);
    }
}
exports.DigitValidator = DigitValidator;
/**
 * Return true if it is a valid positive or negative digit representation, otherwise false.
 */
class SignedDigitValidator {
    constructor() {
        this.tagName = "signedDigit";
    }
    isAcceptable(s) {
        return /^-?\d+$/.test(s);
    }
}
exports.SignedDigitValidator = SignedDigitValidator;
var MinimalDefaultValue = 0;
/**
 * Return true if string length is greater or equal to MinLength property.
 */
class MinLengthValidator {
    /**
     * Default constructor
     * @param MinLength - minimal number of characters.
     */
    constructor(MinLength) {
        this.MinLength = MinLength;
        this.tagName = "minlength";
        if (MinLength === undefined)
            this.MinLength = MinimalDefaultValue;
    }
    isAcceptable(s) {
        return s.length >= this.MinLength;
    }
}
exports.MinLengthValidator = MinLengthValidator;
var MaximalDefaultValue = 0;
/**
 * Return true if string length is less or equal to MaxLength property.
 */
class MaxLengthValidator {
    /**
     * Default constructor.
     * @param MaxLength - maximal number of characters.
     */
    constructor(MaxLength) {
        this.MaxLength = MaxLength;
        this.tagName = "maxlength";
        if (MaxLength === undefined)
            this.MaxLength = MaximalDefaultValue;
    }
    isAcceptable(s) {
        return s.length <= this.MaxLength;
    }
}
exports.MaxLengthValidator = MaxLengthValidator;
/**
 * Return true if string length is between MinLength and MaxLength property.
 */
class RangeLengthValidator {
    /**
     * Default constructor.
     * @param RangeLength - array [minimal number of characters, maximal number of characters]
     */
    constructor(RangeLength) {
        this.RangeLength = RangeLength;
        this.tagName = "rangelength";
        if (RangeLength === undefined)
            this.RangeLength = [MinimalDefaultValue, MaximalDefaultValue];
    }
    isAcceptable(s) {
        return s.length >= this.MinLength && s.length <= this.MaxLength;
    }
    get MinLength() {
        return this.RangeLength[0];
    }
    get MaxLength() {
        return this.RangeLength[1];
    }
}
exports.RangeLengthValidator = RangeLengthValidator;
/**
 * Return true only for these conditions
 * if "Exclusive" is false, then the instance is valid if it is greater than, or equal to, the value of "minimum";
 * if "Exclusive" is true, the instance is valid if it is strictly greater than the value of "minimum".
 *
 *  @require underscore
 */
class MinValidator {
    /**
     * Default constructor.
     * @param Min - the value of "minimum"
     * @param Exclusive - true = strictly greater, otherwise greater or equal to the value of "minimum";
     */
    constructor(Min, Exclusive) {
        this.Min = Min;
        this.Exclusive = Exclusive;
        this.tagName = "min";
        if (Min === undefined)
            this.Min = MinimalDefaultValue;
    }
    isAcceptable(s) {
        //if (!_.isNumber(s)) s = parseFloat(s);
        //TODO:underscore
        if (!_Score_1._Score.isNumber(s))
            s = parseFloat(s);
        return this.Exclusive ? (s > this.Min) : (s >= this.Min);
    }
}
exports.MinValidator = MinValidator;
/**
 * Return true if the number of items in array is lower or equal to the value of "minimum".
 *
 *  @require underscore
 */
class MinItemsValidator {
    /**
     * Default constructor.
     * @param Max - the value of "minimum"
     */
    constructor(Min) {
        this.Min = Min;
        this.tagName = "minItems";
        if (Min === undefined)
            this.Min = MinimalDefaultValue;
    }
    isAcceptable(s) {
        //if (_.isArray(s)) return s.length >=this.Min;
        //underscore
        if (_Score_1._Score.isArray(s))
            return s.length >= this.Min;
        return false;
    }
}
exports.MinItemsValidator = MinItemsValidator;
/**
 * Return true only for these conditions
 * if "Exclusive" is false, then the instance is valid if it is lower than, or equal to, the value of "maximum";
 * if "Exclusive" is true, the instance is valid if it is strictly lower than the value of "maximum".
 *
 *  @require underscore
 */
class MaxValidator {
    /**
     * Default constructor
     * @param Max - the value of "maximum"
     * @param Exclusive - true = strictly lower, otherwise lower or equal to the value of "maximum";
     */
    constructor(Max, Exclusive) {
        this.Max = Max;
        this.Exclusive = Exclusive;
        this.tagName = "max";
        if (Max === undefined)
            this.Max = MaximalDefaultValue;
    }
    isAcceptable(s) {
        if (!_Score_1._Score.isNumber(s))
            s = parseFloat(s);
        return this.Exclusive ? (s < this.Max) : (s <= this.Max);
    }
}
exports.MaxValidator = MaxValidator;
/**
 * Return true if an number of items in array is greater or equal to the value of "maximum".
 *
 *  @require underscore
 */
class MaxItemsValidator {
    /**
     * Default constructor.
     * @param Max - the value of "maximum"
     */
    constructor(Max) {
        this.Max = Max;
        this.tagName = "maxItems";
        if (Max === undefined)
            this.Max = MaximalDefaultValue;
    }
    isAcceptable(s) {
        if (_Score_1._Score.isArray(s))
            return s.length <= this.Max;
        return false;
    }
}
exports.MaxItemsValidator = MaxItemsValidator;
/**
 * Return true if the array contains unique items (using strict equality), otherwise false.
 *
 *  @require underscore
 */
class UniqItemsValidator {
    constructor() {
        this.tagName = "uniqItems";
    }
    isAcceptable(s) {
        if (_Score_1._Score.isArray(s))
            return _Score_1._Score.uniq(s).length === s.length;
        return false;
    }
}
exports.UniqItemsValidator = UniqItemsValidator;
/**
 * Return true if value is between Min and Max property.
 *
 *  @require underscore
 */
class RangeValidator {
    /**
     * Default constructor.
     * @param Range - array [the value of "minimum", the value of "maximum"]
     */
    constructor(Range) {
        this.Range = Range;
        this.tagName = "range";
        if (Range === undefined)
            this.Range = [MinimalDefaultValue, MaximalDefaultValue];
    }
    isAcceptable(s) {
        if (!_Score_1._Score.isNumber(s))
            s = parseFloat(s);
        return s >= this.Min && s <= this.Max;
    }
    /**
     * Return the value of "minimum"
     * @returns {number}
     */
    get Min() {
        return this.Range[0];
    }
    /**
     * Return the value of "maximum"
     * @returns {number}
     */
    get Max() {
        return this.Range[1];
    }
}
exports.RangeValidator = RangeValidator;
/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 *
 *  @require underscore
 */
class EnumValidator {
    /**
     * Default constructor.
     * @param Enum - array of values
     */
    constructor(Enum) {
        this.Enum = Enum;
        this.tagName = "enum";
        if (Enum === undefined)
            this.Enum = [];
    }
    isAcceptable(s) {
        return _Score_1._Score.contains(this.Enum, s);
    }
}
exports.EnumValidator = EnumValidator;
/**
 * Return true if an value is a specified type, otherwise false.
 *
 *  @require underscore
 */
class TypeValidator {
    /**
     * Default constructor.
     * @param Type - keywords that defines an concrete type
     */
    constructor(Type) {
        this.Type = Type;
        this.tagName = "type";
        if (this.Type === undefined)
            this.Type = "string";
    }
    isAcceptable(s) {
        if (this.Type === "string")
            return _Score_1._Score.isString(s);
        if (this.Type === "boolean")
            return _Score_1._Score.isBoolean(s);
        if (this.Type === "number")
            return _Score_1._Score.isNumber(s);
        if (this.Type === "integer")
            return /^\d+$/.test(s);
        if (this.Type === "object")
            return _Score_1._Score.isObject(s);
        if (this.Type === "array")
            return _Score_1._Score.isArray(s);
        return false;
    }
}
exports.TypeValidator = TypeValidator;
/**
 * Return true if an value is multiplier of passed number step, otherwise false.
 */
class StepValidator {
    /**
     * Default constructor.
     * @param Step - step multiplier
     */
    constructor(Step) {
        this.Step = Step;
        this.StepDefaultValue = "1";
        this.tagName = "step";
        if (Step === undefined)
            this.Step = this.StepDefaultValue;
    }
    isAcceptable(s) {
        var maxNegDigits = Math.max(NumberFce.GetNegDigits(s), NumberFce.GetNegDigits(this.Step));
        var multiplier = Math.pow(10, maxNegDigits);
        return (parseInt(s, 10) * multiplier) % (parseInt(this.Step, 10) * multiplier) === 0;
    }
}
exports.StepValidator = StepValidator;
/**
 * Return true if a numeric instance is valid against "multipleOf" if the result of the division of the instance by this keyword's value is an integer, otherwise false.
 *
 *  @require underscore
 */
class MultipleOfValidator {
    /**
     * Default constructor
     * @param Divider
     */
    constructor(Divider) {
        this.Divider = Divider;
        this.MultipleOfDefaultValue = 1;
        this.tagName = "multipleOf";
        if (Divider === undefined)
            this.Divider = this.MultipleOfDefaultValue;
    }
    isAcceptable(s) {
        if (!_Score_1._Score.isNumber(s))
            return false;
        return (s % this.Divider) % 1 === 0;
    }
}
exports.MultipleOfValidator = MultipleOfValidator;
/**
 * Return true if an value is valid against specified pattern, otherwise false.
 */
class PatternValidator {
    /**
     * Default constructor.
     * @param Pattern - pattern
     */
    constructor(Pattern) {
        this.Pattern = Pattern;
        this.tagName = "pattern";
    }
    isAcceptable(s) {
        return new RegExp(this.Pattern).test(s);
    }
}
exports.PatternValidator = PatternValidator;
/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 * Predefined values are fetched async with options service.
 *
 * @require underscore
 * @require Q
 */
class ContainsValidator {
    /**
     * Default constructor.
     * @param Options - async service that returns array of values.
     *
     *
     */
    constructor(Options) {
        this.Options = Options;
        this.isAsync = true;
        this.tagName = "contains";
        if (Options === undefined)
            this.Options = Promise.resolve(new Array());
    }
    isAcceptable(s) {
        var subResult;
        //var deferred:Q.Deferred<boolean> = Q.defer<boolean>();
        var deferred = new Promise(x => x(subResult));
        this.Options.then(function (result) {
            var hasSome = _Score_1._Score.some(result, function (item) {
                return item === s;
            });
            if (hasSome) {
                subResult = true;
                Promise.resolve(deferred);
            }
            subResult = false;
            Promise.resolve(deferred);
        });
        return deferred;
    }
}
exports.ContainsValidator = ContainsValidator;
/**
 * Return true if remote service returns true, otherwise false.
 *
 * @require underscore
 * @require Q
 * @require axios
 *
 * @example
 * ```typescript
 *  url: 'http://test/validateEmail',
 *  ```
 */
class RemoteValidator {
    /**
     * Default constructor
     * @param Options - remote service url + options
     */
    constructor(Options) {
        this.Options = Options;
        this.isAsync = true;
        this.tagName = "remote";
        //TODO:axios
        //this.axios = require('axios');
    }
    isAcceptable(s) {
        var subResult;
        //var deferred:Q.Deferred<boolean> = Q.defer<boolean>();
        var deferred = new Promise(x => x(subResult));
        this.axios.post(this.Options.url, {
            method: this.Options.type || "get",
            data: _Score_1._Score.extend({} || this.Options.data, {
                "value": s
            })
        }).then(function (response) {
            var isAcceptable = response === true || response === "true";
            subResult = isAcceptable;
            Promise.resolve(deferred);
        })
            .catch(function (response) {
            subResult = false;
            Promise.resolve(subResult);
            console.log(response);
        });
        return deferred;
    }
}
exports.RemoteValidator = RemoteValidator;
//# sourceMappingURL=BasicValidators.js.map