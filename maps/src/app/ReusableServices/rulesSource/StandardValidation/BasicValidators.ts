
import { IStringValidator, IPropertyValidator, IAsyncPropertyValidator } from './Validation';
import { _Score } from '../_Score';
class NumberFce {
    static GetNegDigits(value: string): number {
        if (value === undefined) return 0;
        let digits = value.toString().split('.');
        if (digits.length > 1) {
            return digits[1].length;
        }
        return 0;
    }
}


/**
 * Return true if it is a valid string letter representation, otherwise false.
 */
export class LettersOnlyValidator implements IStringValidator {

    tagName = 'lettersonly';
    private lettersRegexp = /^[A-Za-z]+$/;
    isAcceptable(s: string) {
        if (s) {
            return this.lettersRegexp.test(s);
        }
        else {
            return true;
        }
    }
}

export class AlphaNumericValidator implements IStringValidator {
    tagName = 'alphanumeric';
    private alphanumericRegexp = /^[a-z0-9]+$/i;
    isAcceptable(s: string) {
        if (s) {
            return this.alphanumericRegexp.test(s);
        }
        else {
            return true;
        }
    }
}

export class PhoneOnlyValidator implements IStringValidator {

    tagName = 'phonevalidator';
    private phoneRegexp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

    isAcceptable(s: string) {
        if (s) {
            return this.phoneRegexp.test(s);
        }
        else {
            return true;
        }
    }
}

/**
 * Return true if it is a valid zip code, otherwise false.
 */
export class ZipCodeValidator implements IStringValidator {

    tagName = 'zipcode';
    private numberRegexp = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
    /*/^[0-9]+$/;*/
    isAcceptable(s: string) {
        if (s) {
            return this.numberRegexp.test(s);
        }
        else {
            return true;
        }
    }
}

/**
 * Return true if it is a valid Internet email address as defined by RFC 5322, section 3.4.1, otherwise false
 */
export class EmailValidator implements IStringValidator {

    tagName = 'email';
    // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
    private emailRegexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    isAcceptable(s: string) {
        if (s) {
            return this.emailRegexp.test(s);
        }
        else {
            return true;
        }
    }
}
/**
 * Return true if it is a valid URI, according to [RFC3986], otherwise false.
 */
export class UrlValidator implements IStringValidator {

    tagName = 'url';
    // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
    private urlRegexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

    isAcceptable(s: string) {
        return this.urlRegexp.test(s);
    }
}

/**
 * Return true if it is a valid Luhn card number based on http://en.wikipedia.org/wiki/Luhn/, otherwise false;
 */
export class CreditCardValidator implements IStringValidator {

    tagName = 'creditcard';
    // taken from http://jqueryvalidation.org/creditcard-method/
    isAcceptable(value: string) {


        // accept only spaces, digits and dashes
        if (/[^0-9 \-]+/.test(value)) {
            return false;
        }
        let nCheck = 0,
            nDigit = 0,
            bEven = false,
            n, cDigit;

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
    }
}

/**
 * Return true if it is not empty value, otherwise false.
 */
export class RequiredValidator implements IStringValidator {

    tagName = 'required';
    isAcceptable(s: string) {
        return s !== undefined && s !== '';
    }
}
/**
 * Return true if a value is equal (using strict equal) to passed value, otherwise false.
 */
export class EqualToValidator implements IPropertyValidator {

    tagName = 'equalTo';

    /**
     *
     * @param Value
     */
    constructor(public Value?: any) {

    }
    isAcceptable(s: any) {
        return s === this.Value;
    }
}

/**
 * Return true if it is a valid string date representation (can be parsed as date), otherwise false.
 */
export class DateValidator implements IStringValidator {

    tagName = 'date';
    isAcceptable(s: string) {
        if (s) {
            return !/Invalid|NaN/.test(new Date(s).toString());
        }
        else {
            return true;
        }
    }
}

/**
 * Return true if it is a valid string ISO date representation (can be parsed as ISO date), otherwise false.
 */
export class DateISOValidator implements IStringValidator {

    tagName = 'dateISO';
    isAcceptable(s: string) {
        return /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(s);
    }
}

/**
 * Return true if it is a valid number representation, otherwise false.
 */
export class NumberValidator implements IStringValidator {

    tagName = 'number';
    isAcceptable(s: string) {
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(s);
        // Old Value - /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(s);
        // New value - /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/
    }
}
/**
 * Return true if it is a valid digit representation, otherwise false.
 */
export class DigitValidator implements IStringValidator {

    tagName = 'digit';
    isAcceptable(s: string) {
        return /^\d+$/.test(s);
    }
}
/**
 * Return true if it is a valid positive or negative digit representation, otherwise false.
 */
export class SignedDigitValidator implements IStringValidator {

    tagName = 'signedDigit';
    isAcceptable(s: string) {
        return /^-?\d+$/.test(s);
    }
}
let MinimalDefaultValue = 0;
/**
 * Return true if string length is greater or equal to MinLength property.
 */
export class MinLengthValidator implements IStringValidator {

    tagName = 'minlength';
    /**
     * Default constructor
     * @param MinLength - minimal number of characters (or length of the Array)
     */
    constructor(public MinLength?: number) {
        if (MinLength === undefined) this.MinLength = MinimalDefaultValue;
    }

    isAcceptable(obj: any) {
        if (!obj) return false;

        return obj.length >= this.MinLength;
    }
}
let MaximalDefaultValue = 0;
/**
 * Return true if string length is less or equal to MaxLength property (or length of the Array)
 */
export class MaxLengthValidator implements IStringValidator {

    tagName = 'maxlength';

    /**
     * Default constructor.
     * @param MaxLength - maximal number of characters.
     */
    constructor(public MaxLength?: number) {
        if (MaxLength === undefined) this.MaxLength = MaximalDefaultValue;
    }

    isAcceptable(obj: any) {
        if (!obj) return false;
        return obj.length <= this.MaxLength;
    }
}

/**
 * Return true if string length is between MinLength and MaxLength property.
 */
export class RangeLengthValidator implements IStringValidator {

    tagName = 'rangelength';
    isAcceptable(s: string) {
        if (!s) return false;
        return s.length >= this.MinLength && s.length <= this.MaxLength;
    }
    /**
     * Default constructor.
     * @param RangeLength - array [minimal number of characters, maximal number of characters]
     */
    constructor(public RangeLength?: Array<number>) {
        if (RangeLength === undefined) this.RangeLength = [MinimalDefaultValue, MaximalDefaultValue];
    }

    public get MinLength(): number {
        return this.RangeLength[0];
    }

    public get MaxLength(): number {
        return this.RangeLength[1];
    }
}

/**
 * Return true only for these conditions
 * if 'Exclusive' is false, then the instance is valid if it is greater than, or equal to, the value of 'minimum';
 * if 'Exclusive' is true, the instance is valid if it is strictly greater than the value of 'minimum'.
 *
 *  @require underscore
 */
export class MinValidator implements IPropertyValidator {

    tagName = 'min';

    isAcceptable(s: any) {
        // if (!_.isNumber(s)) s = parseFloat(s);
        // TODO:underscore
        if (!_Score.isNumber(s)) s = parseFloat(s);
        return this.Exclusive ? (s > this.Min) : (s >= this.Min);
    }

    /**
     * Default constructor.
     * @param Min - the value of 'minimum'
     * @param Exclusive - true = strictly greater, otherwise greater or equal to the value of 'minimum';
     */
    constructor(public Min?: number, public Exclusive?: boolean) {
        if (Min === undefined) this.Min = MinimalDefaultValue;
    }
}

/**
 * Return true if the number of items in array is lower or equal to the value of 'minimum'.
 *
 *  @require underscore
 */
export class MinItemsValidator implements IPropertyValidator {

    tagName = 'minItems';

    isAcceptable(s: any) {
        // if (_.isArray(s)) return s.length >=this.Min;
        // underscore
        if (_Score.isArray(s)) return s.length >= this.Min;
        return false;
    }

    /**
     * Default constructor.
     * @param Max - the value of 'minimum'
     */
    constructor(public Min?: number) {
        if (Min === undefined) this.Min = MinimalDefaultValue;
    }
}
/**
 * Return true only for these conditions
 * if 'Exclusive' is false, then the instance is valid if it is lower than, or equal to, the value of 'maximum';
 * if 'Exclusive' is true, the instance is valid if it is strictly lower than the value of 'maximum'.
 *
 *  @require underscore
 */
export class MaxValidator implements IPropertyValidator {

    tagName = 'max';

    isAcceptable(s: any) {
        if (!_Score.isNumber(s)) s = parseFloat(s);

        return this.Exclusive ? (s < this.Max) : (s <= this.Max);
    }

    /**
     * Default constructor
     * @param Max - the value of 'maximum'
     * @param Exclusive - true = strictly lower, otherwise lower or equal to the value of 'maximum';
     */
    constructor(public Max?: number, public Exclusive?: boolean) {
        if (Max === undefined) this.Max = MaximalDefaultValue;
    }
}
/**
 * Return true if an number of items in array is greater or equal to the value of 'maximum'.
 *
 *  @require underscore
 */
export class MaxItemsValidator implements IPropertyValidator {

    tagName = 'maxItems';

    isAcceptable(s: any) {
        if (_Score.isArray(s)) return s.length <= this.Max;
        return false;
    }

    /**
     * Default constructor.
     * @param Max - the value of 'maximum'
     */
    constructor(public Max?: number) {
        if (Max === undefined) this.Max = MaximalDefaultValue;
    }
}

/**
 * Return true if the array contains unique items (using strict equality), otherwise false.
 *
 *  @require underscore
 */
export class UniqItemsValidator implements IPropertyValidator {

    tagName = 'uniqItems';

    isAcceptable(s: any) {
        if (_Score.isArray(s)) return _Score.uniq(s).length === s.length;
        return false;
    }
}

/**
 * Return true if value is between Min and Max property.
 *
 *  @require underscore
 */
export class RangeValidator implements IPropertyValidator {

    tagName = 'range';

    isAcceptable(s: any) {
        if (!_Score.isNumber(s)) s = parseFloat(s);
        return s >= this.Min && s <= this.Max;
    }

    /**
     * Default constructor.
     * @param Range - array [the value of 'minimum', the value of 'maximum']
     */
    constructor(public Range?: Array<number>) {
        if (Range === undefined) this.Range = [MinimalDefaultValue, MaximalDefaultValue];
    }

    /**
     * Return the value of 'minimum'
     * @returns {number}
     */
    public get Min(): number {
        return this.Range[0];
    }

    /**
     * Return the value of 'maximum'
     * @returns {number}
     */
    public get Max(): number {
        return this.Range[1];
    }
}

/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 *
 *  @require underscore
 */
export class EnumValidator implements IPropertyValidator {
    tagName = 'enum';

    isAcceptable(s: any) {
        return _Score.contains(this.Enum, s);
    }

    /**
     * Default constructor.
     * @param Enum - array of values
     */
    constructor(public Enum?: Array<number>) {
        if (Enum === undefined) this.Enum = [];
    }
}

/**
 * Return true if an value is a specified type, otherwise false.
 *
 *  @require underscore
 */
export class TypeValidator implements IPropertyValidator {
    tagName = 'type';

    isAcceptable(s: any) {
        if (this.Type === 'string') return _Score.isString(s);
        if (this.Type === 'boolean') return _Score.isBoolean(s);
        if (this.Type === 'number') return _Score.isNumber(s);
        if (this.Type === 'integer') return /^\d+$/.test(s);
        if (this.Type === 'object') return _Score.isObject(s);
        if (this.Type === 'array') return _Score.isArray(s);
        return false;
    }

    /**
     * Default constructor.
     * @param Type - keywords that defines an concrete type
     */
    constructor(public Type: string) {
        if (this.Type === undefined) this.Type = 'string';
    }
}

/**
 * Return true if an value is multiplier of passed number step, otherwise false.
 */
export class StepValidator implements IPropertyValidator {

    tagName = 'step';
    private StepDefaultValue = '1';

    isAcceptable(s: any) {

        let maxNegDigits = Math.max(NumberFce.GetNegDigits(s), NumberFce.GetNegDigits(this.Step));
        let multiplier = Math.pow(10, maxNegDigits);
        return (parseInt(s, 10) * multiplier) % (parseInt(this.Step, 10) * multiplier) === 0;
    }

    /**
     * Default constructor.
     * @param Step - step multiplier
     */
    constructor(public Step?: string) {
        if (Step === undefined) this.Step = this.StepDefaultValue;
    }
}

/**
 * Return true if a numeric instance is valid against 'multipleOf' if the result of the division of the
 * instance by this keyword's value is an integer, otherwise false.
 *  @require underscore
 */
export class MultipleOfValidator implements IPropertyValidator {

    tagName = 'multipleOf';

    private MultipleOfDefaultValue = 1;

    isAcceptable(s: any) {
        if (!_Score.isNumber(s)) return false;
        return (s % this.Divider) % 1 === 0;
    }

    /**
     * Default constructor
     * @param Divider
     */
    constructor(public Divider?: number) {
        if (Divider === undefined) this.Divider = this.MultipleOfDefaultValue;
    }
}
/**
 * Return true if an value is valid against specified pattern, otherwise false.
 */
export class PatternValidator implements IStringValidator {
    tagName = 'pattern';
    isAcceptable(s: string) {
        return new RegExp(this.Pattern).test(s);
    }

    /**
     * Default constructor.
     * @param Pattern - pattern
     */
    constructor(public Pattern?: string) {
    }
}

/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 * Predefined values are fetched async with options service.
 *
 * @require underscore
 * @require Q
 */
export class ContainsValidator implements IAsyncPropertyValidator {

    isAsync = true;
    tagName = 'contains';

    isAcceptable(s: string): Promise<boolean> {
        let subResult;
        // let deferred:Q.Deferred<boolean> = Q.defer<boolean>();
        let deferred: Promise<boolean> = new Promise<boolean>(x => x(subResult));

        this.Options.then(function (result) {
            let hasSome = _Score.some(result, function (item) {
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

    /**
     * Default constructor.
     * @param Options - async service that returns array of values.
     *
     *
     */
    constructor(public Options: Promise<Array<any>>) {
        if (Options === undefined) this.Options = Promise.resolve(new Array<any>());
    }
}

export interface IRemoteOptions {
    url: any;
    type?: string;
    data?: any;
}
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
export class RemoteValidator implements IAsyncPropertyValidator {

    isAsync = true;
    tagName = 'remote';
    private axios: any;

    isAcceptable(s: any): Promise<boolean> {
        let subResult;
        // let deferred:Q.Deferred<boolean> = Q.defer<boolean>();
        let deferred: Promise<boolean> = new Promise<boolean>(x => x(subResult));

        this.axios.post(this.Options.url,
            {
                method: this.Options.type || 'get',
                data: _Score.extend({} || this.Options.data, {
                    'value': s
                })
            }
        ).then(function (response) {
            let isAcceptable = response === true || response === 'true';
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

    /**
     * Default constructor
     * @param Options - remote service url + options
     */
    constructor(public Options?: IRemoteOptions) {

        // this.axios = require('axios');
    }

}

