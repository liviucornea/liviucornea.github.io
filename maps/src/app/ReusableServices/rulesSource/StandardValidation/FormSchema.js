"use strict";
var Validation_1 = require("./Validation");
var BasicValidators_1 = require("./BasicValidators");
var SchemaUtil_1 = require("./SchemaUtil");
/**
 * It represents the JSON schema factory for creating validation rules based on JSON form schema.
 * It uses constraints keywords from JSON Schema Validation specification.
 */
var JsonSchemaRuleFactory = (function () {
    /**
     * Default constructor
     * @param jsonSchema JSON schema for business rules.
     */
    function JsonSchemaRuleFactory(jsonSchema) {
        this.jsonSchema = jsonSchema;
    }
    /**
     * Return abstract validation rule by traversing  JSON schema.
     * @returns {IAbstractValidator<any>} return validation rule
     */
    JsonSchemaRuleFactory.prototype.CreateAbstractValidator = function () {
        return this.ParseAbstractRule(this.jsonSchema);
    };
    /**
     * Return concrete validation rule structured according to JSON schema.
     * @param name validation rule name
     * @returns {IAbstractValidationRule<any>} return validation rule
     */
    JsonSchemaRuleFactory.prototype.CreateRule = function (name) {
        return this.ParseAbstractRule(this.jsonSchema).CreateRule(name);
    };
    /**
     * Returns an concrete validation rules structured according to JSON schema.
     */
    JsonSchemaRuleFactory.prototype.ParseAbstractRule = function (formSchema) {
        //TODO:RF
        var rule = new Validation_1.AbstractValidator();
        for (var key in formSchema) {
            var item = formSchema[key];
            var type = item[SchemaUtil_1.TYPE_KEY];
            if (type === "object") {
                rule.ValidatorFor(key, this.ParseAbstractRule(item[SchemaUtil_1.PROPERTIES_KEY]));
            }
            else if (type === "array") {
                /!* _.each(this.ParseValidationAttribute(item),function(validator){ rule.RuleFor(key,validator)});*!/;
                var validators = this.ParseValidationAttribute(item);
                validators.forEach(function (validator) { rule.RuleFor(key, validator); });
                rule.ValidatorFor(key, this.ParseAbstractRule(item[SchemaUtil_1.ARRAY_KEY][SchemaUtil_1.PROPERTIES_KEY]), true);
            }
            else {
                /!*_.each(this.ParseValidationAttribute(item),function(validator){ rule.RuleFor(key,validator)});*!/;
                var validators = this.ParseValidationAttribute(item);
                validators.forEach(function (validator) { rule.RuleFor(key, validator); });
            }
        }
        return rule;
        //return;
    };
    /**
     * Return list of property validators that corresponds json items for JSON form validation tags.
     * See keywords specifications -> http://json-schema.org/latest/json-schema-validation.html
     */
    JsonSchemaRuleFactory.prototype.ParseValidationAttribute = function (item) {
        var validators = new Array();
        if (item === undefined)
            return validators;
        //5.  Validation keywords sorted by instance types
        //http://json-schema.org/latest/json-schema-validation.html
        //5.1. - Validation keywords for numeric instances (number and integer)
        // multipleOf validation
        validation = item["multipleOf"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MultipleOfValidator(validation));
        }
        // maximum validation
        validation = item["maximum"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MaxValidator(validation, item["exclusiveMaximum"]));
        }
        // minimum validation
        validation = item["minimum"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MinValidator(validation, item["exclusiveMinimum"]));
        }
        //5.2. - Validation keywords for strings
        // maxLength validation
        validation = item["maxLength"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MaxLengthValidator(validation));
        }
        // minLength validation
        validation = item["minLength"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MinLengthValidator(validation));
        }
        // pattern validation
        validation = item["pattern"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.PatternValidator(validation));
        }
        //5.3.  Validation keywords for arrays
        //TODO: additionalItems and items
        // min items validation
        validation = item["minItems"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MinItemsValidator(validation));
        }
        // max items validation
        validation = item["maxItems"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MaxItemsValidator(validation));
        }
        // uniqueItems validation
        validation = item["uniqueItems"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.UniqItemsValidator());
        }
        //5.4.  Validation keywords for objects
        //TODO: maxProperties, minProperties, additionalProperties, properties and patternProperties, dependencies
        // required validation
        var validation = item["required"];
        if (validation !== undefined && validation) {
            validators.push(new BasicValidators_1.RequiredValidator());
        }
        //5.5.  Validation keywords for any instance type
        // enum validation
        validation = item["enum"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.EnumValidator(validation));
        }
        // type validation
        var validation = item["type"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.TypeValidator(validation));
        }
        //7.3.2 email
        validation = item["email"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.EmailValidator());
        }
        //7.3.6 url
        validation = item["uri"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.UrlValidator());
        }
        //TODO: allOf,anyOf,oneOf,not,definitions
        return validators;
    };
    return JsonSchemaRuleFactory;
}());
exports.JsonSchemaRuleFactory = JsonSchemaRuleFactory;
/**
 * It represents the JSON schema factory for creating validation rules based on raw JSON data annotated by validation rules.
 * It uses constraints keywords from JQuery validation plugin.
 */
var JQueryValidationRuleFactory = (function () {
    /**
     * Default constructor
     * @param metaData -  raw JSON data annotated by validation rules
     */
    function JQueryValidationRuleFactory(metaData) {
        this.metaData = metaData;
    }
    /**
     * Return abstract validation rule by traversing raw JSON data annotated by validation rules.
     * @returns {IAbstractValidator<any>} return validation rule
     */
    JQueryValidationRuleFactory.prototype.CreateAbstractValidator = function () {
        return this.ParseAbstractRule(this.metaData);
    };
    /**
     * Return an concrete validation rule by traversing raw JSON data annotated by validation rules.
     * @param name validation rule name
     * @returns {IValidationRule<any>} return validation rule
     */
    JQueryValidationRuleFactory.prototype.CreateRule = function (name) {
        return this.ParseAbstractRule(this.metaData).CreateRule(name);
    };
    /**
     * Returns an concrete validation rule structured according to JSON schema.
     */
    JQueryValidationRuleFactory.prototype.ParseAbstractRule = function (metaData) {
        //TODO:any
        /*var rule = new AbstractValidator<any>();

        for (var key in metaData) {
            var item = metaData[key];
            var rules = item[JQueryValidationRuleFactory.RULES_KEY];

            if ( _Score.isArray(item)) {
                if (item[1] !== undefined) {
                    /!* _.each(this.ParseValidationAttribute(item[1]), function (validator) {
                     rule.RuleFor(key, validator)
                     });*!/
                    var validators = this.ParseValidationAttribute(item[1]);
                    validators.forEach(validator=>{
                        rule.RuleFor(key, validator)
                    })
                }
                rule.ValidatorFor(key, this.ParseAbstractRule(item[0]), true);
            }
            else if (rules !== undefined) {
                /!*_.each(this.ParseValidationAttribute(rules),function(validator){ rule.RuleFor(key,validator)})*!/
                var validators=this.ParseValidationAttribute(rules);
                validators.forEach(validator=>{rule.RuleFor(key,validator)});
            }
            else if (_Score.isObject(item)) {
                rule.ValidatorFor(key, this.ParseAbstractRule(item));
            }
            else {
                //ignore
                continue;
            }
        }
        return rule;*/
        return;
    };
    /**
     * Return list of property validators that corresponds json items for JQuery validation pluging tags.
     * See specification - http://jqueryvalidation.org/documentation/
     */
    JQueryValidationRuleFactory.prototype.ParseValidationAttribute = function (item) {
        var validators = new Array();
        if (item === undefined)
            return validators;
        var validation = item["required"];
        if (validation !== undefined && validation) {
            validators.push(new BasicValidators_1.RequiredValidator());
        }
        var validation = item["remote"];
        if (validation !== undefined && validation) {
            validators.push(new BasicValidators_1.RemoteValidator(validation));
        }
        // maxLength validation
        validation = item["maxlength"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MaxLengthValidator(validation));
        }
        // minLength validation
        validation = item["minlength"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MinLengthValidator(validation));
        }
        // rangelength validation
        validation = item["rangelength"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.RangeLengthValidator(validation));
        }
        // maximum validation
        validation = item["max"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MaxValidator(validation));
        }
        // minimum validation
        validation = item["min"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MinValidator(validation));
        }
        // range validation
        validation = item["range"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.RangeValidator(validation));
        }
        validation = item["email"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.EmailValidator());
        }
        validation = item["url"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.UrlValidator());
        }
        validation = item["date"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.DateValidator());
        }
        validation = item["dateISO"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.DateISOValidator());
        }
        validation = item["number"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.NumberValidator());
        }
        validation = item["digits"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.DigitValidator());
        }
        validation = item["creditcard"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.CreditCardValidator());
        }
        validation = item["equalTo"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.EqualToValidator(validation));
        }
        // min items validation
        validation = item["minItems"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MinItemsValidator(validation));
        }
        // max items validation
        validation = item["maxItems"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.MaxItemsValidator(validation));
        }
        // uniqueItems validation
        validation = item["uniqueItems"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.UniqItemsValidator());
        }
        // enum validation
        validation = item["enum"];
        if (validation !== undefined) {
            validators.push(new BasicValidators_1.EnumValidator(validation));
        }
        //           // pattern validation
        //           validation = item["pattern"];
        //           if (validation !== undefined) {
        //               validators.push(new Validators.PatternValidator(validation))
        //           }
        return validators;
    };
    JQueryValidationRuleFactory.RULES_KEY = "rules";
    JQueryValidationRuleFactory.DEFAULT_KEY = "default";
    return JQueryValidationRuleFactory;
}());
exports.JQueryValidationRuleFactory = JQueryValidationRuleFactory;
//# sourceMappingURL=FormSchema.js.map