"use strict";
var _Score_1 = require('../_Score');
var NumberFce = (function () {
    function NumberFce() {
    }
    NumberFce.GetNegDigits = function (value) {
        if (value === undefined)
            return 0;
        var digits = value.toString().split('.');
        if (digits.length > 1) {
            return digits[1].length;
        }
        return 0;
    };
    return NumberFce;
}());
/**
 * Return true if it is a valid string letter representation, otherwise false.
 */
var LettersOnlyValidator = (function () {
    function LettersOnlyValidator() {
        this.tagName = 'lettersonly';
        this.lettersRegexp = /^[A-Za-z]+$/;
    }
    LettersOnlyValidator.prototype.isAcceptable = function (s) {
        if (s) {
            return this.lettersRegexp.test(s);
        }
        else {
            return true;
        }
    };
    return LettersOnlyValidator;
}());
exports.LettersOnlyValidator = LettersOnlyValidator;
var AlphaNumericValidator = (function () {
    function AlphaNumericValidator() {
        this.tagName = 'alphanumeric';
        this.alphanumericRegexp = /^[a-z0-9]+$/i;
    }
    AlphaNumericValidator.prototype.isAcceptable = function (s) {
        if (s) {
            return this.alphanumericRegexp.test(s);
        }
        else {
            return true;
        }
    };
    return AlphaNumericValidator;
}());
exports.AlphaNumericValidator = AlphaNumericValidator;
var PhoneOnlyValidator = (function () {
    function PhoneOnlyValidator() {
        this.tagName = 'phonevalidator';
        this.phoneRegexp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    }
    PhoneOnlyValidator.prototype.isAcceptable = function (s) {
        if (s) {
            return this.phoneRegexp.test(s);
        }
        else {
            return true;
        }
    };
    return PhoneOnlyValidator;
}());
exports.PhoneOnlyValidator = PhoneOnlyValidator;
/**
 * Return true if it is a valid zip code, otherwise false.
 */
var ZipCodeValidator = (function () {
    function ZipCodeValidator() {
        this.tagName = 'zipcode';
        this.numberRegexp = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
    }
    /*/^[0-9]+$/;*/
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        if (s) {
            return this.numberRegexp.test(s);
        }
        else {
            return true;
        }
    };
    return ZipCodeValidator;
}());
exports.ZipCodeValidator = ZipCodeValidator;
/**
 * Return true if it is a valid Internet email address as defined by RFC 5322, section 3.4.1, otherwise false
 */
var EmailValidator = (function () {
    function EmailValidator() {
        this.tagName = 'email';
        // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
        this.emailRegexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    }
    EmailValidator.prototype.isAcceptable = function (s) {
        if (s) {
            return this.emailRegexp.test(s);
        }
        else {
            return true;
        }
    };
    return EmailValidator;
}());
exports.EmailValidator = EmailValidator;
/**
 * Return true if it is a valid URI, according to [RFC3986], otherwise false.
 */
var UrlValidator = (function () {
    function UrlValidator() {
        this.tagName = 'url';
        // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
        this.urlRegexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    }
    UrlValidator.prototype.isAcceptable = function (s) {
        return this.urlRegexp.test(s);
    };
    return UrlValidator;
}());
exports.UrlValidator = UrlValidator;
/**
 * Return true if it is a valid Luhn card number based on http://en.wikipedia.org/wiki/Luhn/, otherwise false;
 */
var CreditCardValidator = (function () {
    function CreditCardValidator() {
        this.tagName = 'creditcard';
    }
    // taken from http://jqueryvalidation.org/creditcard-method/
    CreditCardValidator.prototype.isAcceptable = function (value) {
        // accept only spaces, digits and dashes
        if (/[^0-9 \-]+/.test(value)) {
            return false;
        }
        var nCheck = 0, nDigit = 0, bEven = false, n, cDigit;
        value = value.replace(/\D/g, '');
        // Basing min and max length on
        // http://developer.ean.com/general_info/Valid_Credit_Card_Types
        if (value.length < 13 || value.length > 19) {
            return false;
        }
        for (n = value.length - 1; n >= 0; n--) {
            cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);
            if (bEven) {
                nDigit *= 2;
                if (nDigit > 9) {
                    nDigit -= 9;
                }
            }
            nCheck += nDigit;
            bEven = !bEven;
        }
        return (nCheck % 10) === 0;
    };
    return CreditCardValidator;
}());
exports.CreditCardValidator = CreditCardValidator;
/**
 * Return true if it is not empty value, otherwise false.
 */
var RequiredValidator = (function () {
    function RequiredValidator() {
        this.tagName = 'required';
    }
    RequiredValidator.prototype.isAcceptable = function (s) {
        return s !== undefined && s !== '';
    };
    return RequiredValidator;
}());
exports.RequiredValidator = RequiredValidator;
/**
 * Return true if a value is equal (using strict equal) to passed value, otherwise false.
 */
var EqualToValidator = (function () {
    /**
     *
     * @param Value
     */
    function EqualToValidator(Value) {
        this.Value = Value;
        this.tagName = 'equalTo';
    }
    EqualToValidator.prototype.isAcceptable = function (s) {
        return s === this.Value;
    };
    return EqualToValidator;
}());
exports.EqualToValidator = EqualToValidator;
/**
 * Return true if it is a valid string date representation (can be parsed as date), otherwise false.
 */
var DateValidator = (function () {
    function DateValidator() {
        this.tagName = 'date';
    }
    DateValidator.prototype.isAcceptable = function (s) {
        if (s) {
            return !/Invalid|NaN/.test(new Date(s).toString());
        }
        else {
            return true;
        }
    };
    return DateValidator;
}());
exports.DateValidator = DateValidator;
/**
 * Return true if it is a valid string ISO date representation (can be parsed as ISO date), otherwise false.
 */
var DateISOValidator = (function () {
    function DateISOValidator() {
        this.tagName = 'dateISO';
    }
    DateISOValidator.prototype.isAcceptable = function (s) {
        return /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(s);
    };
    return DateISOValidator;
}());
exports.DateISOValidator = DateISOValidator;
/**
 * Return true if it is a valid number representation, otherwise false.
 */
var NumberValidator = (function () {
    function NumberValidator() {
        this.tagName = 'number';
    }
    NumberValidator.prototype.isAcceptable = function (s) {
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(s);
        // Old Value - /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(s);
        // New value - /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/
    };
    return NumberValidator;
}());
exports.NumberValidator = NumberValidator;
/**
 * Return true if it is a valid digit representation, otherwise false.
 */
var DigitValidator = (function () {
    function DigitValidator() {
        this.tagName = 'digit';
    }
    DigitValidator.prototype.isAcceptable = function (s) {
        return /^\d+$/.test(s);
    };
    return DigitValidator;
}());
exports.DigitValidator = DigitValidator;
/**
 * Return true if it is a valid positive or negative digit representation, otherwise false.
 */
var SignedDigitValidator = (function () {
    function SignedDigitValidator() {
        this.tagName = 'signedDigit';
    }
    SignedDigitValidator.prototype.isAcceptable = function (s) {
        return /^-?\d+$/.test(s);
    };
    return SignedDigitValidator;
}());
exports.SignedDigitValidator = SignedDigitValidator;
var MinimalDefaultValue = 0;
/**
 * Return true if string length is greater or equal to MinLength property.
 */
var MinLengthValidator = (function () {
    /**
     * Default constructor
     * @param MinLength - minimal number of characters (or length of the Array)
     */
    function MinLengthValidator(MinLength) {
        this.MinLength = MinLength;
        this.tagName = 'minlength';
        if (MinLength === undefined)
            this.MinLength = MinimalDefaultValue;
    }
    MinLengthValidator.prototype.isAcceptable = function (obj) {
        if (!obj)
            return false;
        return obj.length >= this.MinLength;
    };
    return MinLengthValidator;
}());
exports.MinLengthValidator = MinLengthValidator;
var MaximalDefaultValue = 0;
/**
 * Return true if string length is less or equal to MaxLength property (or length of the Array)
 */
var MaxLengthValidator = (function () {
    /**
     * Default constructor.
     * @param MaxLength - maximal number of characters.
     */
    function MaxLengthValidator(MaxLength) {
        this.MaxLength = MaxLength;
        this.tagName = 'maxlength';
        if (MaxLength === undefined)
            this.MaxLength = MaximalDefaultValue;
    }
    MaxLengthValidator.prototype.isAcceptable = function (obj) {
        if (!obj)
            return false;
        return obj.length <= this.MaxLength;
    };
    return MaxLengthValidator;
}());
exports.MaxLengthValidator = MaxLengthValidator;
/**
 * Return true if string length is between MinLength and MaxLength property.
 */
var RangeLengthValidator = (function () {
    /**
     * Default constructor.
     * @param RangeLength - array [minimal number of characters, maximal number of characters]
     */
    function RangeLengthValidator(RangeLength) {
        this.RangeLength = RangeLength;
        this.tagName = 'rangelength';
        if (RangeLength === undefined)
            this.RangeLength = [MinimalDefaultValue, MaximalDefaultValue];
    }
    RangeLengthValidator.prototype.isAcceptable = function (s) {
        if (!s)
            return false;
        return s.length >= this.MinLength && s.length <= this.MaxLength;
    };
    Object.defineProperty(RangeLengthValidator.prototype, "MinLength", {
        get: function () {
            return this.RangeLength[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeLengthValidator.prototype, "MaxLength", {
        get: function () {
            return this.RangeLength[1];
        },
        enumerable: true,
        configurable: true
    });
    return RangeLengthValidator;
}());
exports.RangeLengthValidator = RangeLengthValidator;
/**
 * Return true only for these conditions
 * if 'Exclusive' is false, then the instance is valid if it is greater than, or equal to, the value of 'minimum';
 * if 'Exclusive' is true, the instance is valid if it is strictly greater than the value of 'minimum'.
 *
 *  @require underscore
 */
var MinValidator = (function () {
    /**
     * Default constructor.
     * @param Min - the value of 'minimum'
     * @param Exclusive - true = strictly greater, otherwise greater or equal to the value of 'minimum';
     */
    function MinValidator(Min, Exclusive) {
        this.Min = Min;
        this.Exclusive = Exclusive;
        this.tagName = 'min';
        if (Min === undefined)
            this.Min = MinimalDefaultValue;
    }
    MinValidator.prototype.isAcceptable = function (s) {
        // if (!_.isNumber(s)) s = parseFloat(s);
        // TODO:underscore
        if (!_Score_1._Score.isNumber(s))
            s = parseFloat(s);
        return this.Exclusive ? (s > this.Min) : (s >= this.Min);
    };
    return MinValidator;
}());
exports.MinValidator = MinValidator;
/**
 * Return true if the number of items in array is lower or equal to the value of 'minimum'.
 *
 *  @require underscore
 */
var MinItemsValidator = (function () {
    /**
     * Default constructor.
     * @param Max - the value of 'minimum'
     */
    function MinItemsValidator(Min) {
        this.Min = Min;
        this.tagName = 'minItems';
        if (Min === undefined)
            this.Min = MinimalDefaultValue;
    }
    MinItemsValidator.prototype.isAcceptable = function (s) {
        // if (_.isArray(s)) return s.length >=this.Min;
        // underscore
        if (_Score_1._Score.isArray(s))
            return s.length >= this.Min;
        return false;
    };
    return MinItemsValidator;
}());
exports.MinItemsValidator = MinItemsValidator;
/**
 * Return true only for these conditions
 * if 'Exclusive' is false, then the instance is valid if it is lower than, or equal to, the value of 'maximum';
 * if 'Exclusive' is true, the instance is valid if it is strictly lower than the value of 'maximum'.
 *
 *  @require underscore
 */
var MaxValidator = (function () {
    /**
     * Default constructor
     * @param Max - the value of 'maximum'
     * @param Exclusive - true = strictly lower, otherwise lower or equal to the value of 'maximum';
     */
    function MaxValidator(Max, Exclusive) {
        this.Max = Max;
        this.Exclusive = Exclusive;
        this.tagName = 'max';
        if (Max === undefined)
            this.Max = MaximalDefaultValue;
    }
    MaxValidator.prototype.isAcceptable = function (s) {
        if (!_Score_1._Score.isNumber(s))
            s = parseFloat(s);
        return this.Exclusive ? (s < this.Max) : (s <= this.Max);
    };
    return MaxValidator;
}());
exports.MaxValidator = MaxValidator;
/**
 * Return true if an number of items in array is greater or equal to the value of 'maximum'.
 *
 *  @require underscore
 */
var MaxItemsValidator = (function () {
    /**
     * Default constructor.
     * @param Max - the value of 'maximum'
     */
    function MaxItemsValidator(Max) {
        this.Max = Max;
        this.tagName = 'maxItems';
        if (Max === undefined)
            this.Max = MaximalDefaultValue;
    }
    MaxItemsValidator.prototype.isAcceptable = function (s) {
        if (_Score_1._Score.isArray(s))
            return s.length <= this.Max;
        return false;
    };
    return MaxItemsValidator;
}());
exports.MaxItemsValidator = MaxItemsValidator;
/**
 * Return true if the array contains unique items (using strict equality), otherwise false.
 *
 *  @require underscore
 */
var UniqItemsValidator = (function () {
    function UniqItemsValidator() {
        this.tagName = 'uniqItems';
    }
    UniqItemsValidator.prototype.isAcceptable = function (s) {
        if (_Score_1._Score.isArray(s))
            return _Score_1._Score.uniq(s).length === s.length;
        return false;
    };
    return UniqItemsValidator;
}());
exports.UniqItemsValidator = UniqItemsValidator;
/**
 * Return true if value is between Min and Max property.
 *
 *  @require underscore
 */
var RangeValidator = (function () {
    /**
     * Default constructor.
     * @param Range - array [the value of 'minimum', the value of 'maximum']
     */
    function RangeValidator(Range) {
        this.Range = Range;
        this.tagName = 'range';
        if (Range === undefined)
            this.Range = [MinimalDefaultValue, MaximalDefaultValue];
    }
    RangeValidator.prototype.isAcceptable = function (s) {
        if (!_Score_1._Score.isNumber(s))
            s = parseFloat(s);
        return s >= this.Min && s <= this.Max;
    };
    Object.defineProperty(RangeValidator.prototype, "Min", {
        /**
         * Return the value of 'minimum'
         * @returns {number}
         */
        get: function () {
            return this.Range[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeValidator.prototype, "Max", {
        /**
         * Return the value of 'maximum'
         * @returns {number}
         */
        get: function () {
            return this.Range[1];
        },
        enumerable: true,
        configurable: true
    });
    return RangeValidator;
}());
exports.RangeValidator = RangeValidator;
/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 *
 *  @require underscore
 */
var EnumValidator = (function () {
    /**
     * Default constructor.
     * @param Enum - array of values
     */
    function EnumValidator(Enum) {
        this.Enum = Enum;
        this.tagName = 'enum';
        if (Enum === undefined)
            this.Enum = [];
    }
    EnumValidator.prototype.isAcceptable = function (s) {
        return _Score_1._Score.contains(this.Enum, s);
    };
    return EnumValidator;
}());
exports.EnumValidator = EnumValidator;
/**
 * Return true if an value is a specified type, otherwise false.
 *
 *  @require underscore
 */
var TypeValidator = (function () {
    /**
     * Default constructor.
     * @param Type - keywords that defines an concrete type
     */
    function TypeValidator(Type) {
        this.Type = Type;
        this.tagName = 'type';
        if (this.Type === undefined)
            this.Type = 'string';
    }
    TypeValidator.prototype.isAcceptable = function (s) {
        if (this.Type === 'string')
            return _Score_1._Score.isString(s);
        if (this.Type === 'boolean')
            return _Score_1._Score.isBoolean(s);
        if (this.Type === 'number')
            return _Score_1._Score.isNumber(s);
        if (this.Type === 'integer')
            return /^\d+$/.test(s);
        if (this.Type === 'object')
            return _Score_1._Score.isObject(s);
        if (this.Type === 'array')
            return _Score_1._Score.isArray(s);
        return false;
    };
    return TypeValidator;
}());
exports.TypeValidator = TypeValidator;
/**
 * Return true if an value is multiplier of passed number step, otherwise false.
 */
var StepValidator = (function () {
    /**
     * Default constructor.
     * @param Step - step multiplier
     */
    function StepValidator(Step) {
        this.Step = Step;
        this.tagName = 'step';
        this.StepDefaultValue = '1';
        if (Step === undefined)
            this.Step = this.StepDefaultValue;
    }
    StepValidator.prototype.isAcceptable = function (s) {
        var maxNegDigits = Math.max(NumberFce.GetNegDigits(s), NumberFce.GetNegDigits(this.Step));
        var multiplier = Math.pow(10, maxNegDigits);
        return (parseInt(s, 10) * multiplier) % (parseInt(this.Step, 10) * multiplier) === 0;
    };
    return StepValidator;
}());
exports.StepValidator = StepValidator;
/**
 * Return true if a numeric instance is valid against 'multipleOf' if the result of the division of the
 * instance by this keyword's value is an integer, otherwise false.
 *  @require underscore
 */
var MultipleOfValidator = (function () {
    /**
     * Default constructor
     * @param Divider
     */
    function MultipleOfValidator(Divider) {
        this.Divider = Divider;
        this.tagName = 'multipleOf';
        this.MultipleOfDefaultValue = 1;
        if (Divider === undefined)
            this.Divider = this.MultipleOfDefaultValue;
    }
    MultipleOfValidator.prototype.isAcceptable = function (s) {
        if (!_Score_1._Score.isNumber(s))
            return false;
        return (s % this.Divider) % 1 === 0;
    };
    return MultipleOfValidator;
}());
exports.MultipleOfValidator = MultipleOfValidator;
/**
 * Return true if an value is valid against specified pattern, otherwise false.
 */
var PatternValidator = (function () {
    /**
     * Default constructor.
     * @param Pattern - pattern
     */
    function PatternValidator(Pattern) {
        this.Pattern = Pattern;
        this.tagName = 'pattern';
    }
    PatternValidator.prototype.isAcceptable = function (s) {
        return new RegExp(this.Pattern).test(s);
    };
    return PatternValidator;
}());
exports.PatternValidator = PatternValidator;
/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 * Predefined values are fetched async with options service.
 *
 * @require underscore
 * @require Q
 */
var ContainsValidator = (function () {
    /**
     * Default constructor.
     * @param Options - async service that returns array of values.
     *
     *
     */
    function ContainsValidator(Options) {
        this.Options = Options;
        this.isAsync = true;
        this.tagName = 'contains';
        if (Options === undefined)
            this.Options = Promise.resolve(new Array());
    }
    ContainsValidator.prototype.isAcceptable = function (s) {
        var subResult;
        // let deferred:Q.Deferred<boolean> = Q.defer<boolean>();
        var deferred = new Promise(function (x) { return x(subResult); });
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
    };
    return ContainsValidator;
}());
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
var RemoteValidator = (function () {
    /**
     * Default constructor
     * @param Options - remote service url + options
     */
    function RemoteValidator(Options) {
        this.Options = Options;
        this.isAsync = true;
        this.tagName = 'remote';
        // this.axios = require('axios');
    }
    RemoteValidator.prototype.isAcceptable = function (s) {
        var subResult;
        // let deferred:Q.Deferred<boolean> = Q.defer<boolean>();
        var deferred = new Promise(function (x) { return x(subResult); });
        this.axios.post(this.Options.url, {
            method: this.Options.type || 'get',
            data: _Score_1._Score.extend({} || this.Options.data, {
                'value': s
            })
        }).then(function (response) {
            var isAcceptable = response === true || response === 'true';
            subResult = isAcceptable;
            Promise.resolve(deferred);
        })
            .catch(function (response) {
            subResult = false;
            Promise.resolve(subResult);
            console.log(response);
        });
        return deferred;
    };
    return RemoteValidator;
}());
exports.RemoteValidator = RemoteValidator;
//# sourceMappingURL=BasicValidators.js.map