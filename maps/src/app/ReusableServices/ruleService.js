"use strict";
var core_1 = require("@angular/core");
var BasicValidators_1 = require("./rulesSource/StandardValidation/BasicValidators");
var Validation_1 = require("./rulesSource/StandardValidation/Validation");
var DateCompareValidator_1 = require("./rulesSource/CustomValidation/DateCompareValidator");
var _ = require('lodash');
var GenericValidator_1 = require("./rulesSource/CustomValidation/GenericValidator");
var RuleService = (function () {
    function RuleService() {
        this.minlengthValue = 1;
        this.allValidators = new Array();
        this.ruleList = new Array();
        this.resultSet = new Array();
        this.ruleErrors = new Array();
        this.errorsResultSet = new Array();
        this.targetObjects = new Array();
    }
    RuleService.prototype.clearExistingValidations = function () {
        this.allValidators = [];
        this.ruleList = [];
        this.resultSet = [];
        this.targetObjects = [];
    };
    RuleService.prototype.getRulesByModel = function (modelName, rulesConfigData) {
        return rulesConfigData.filter(function (p) { return p.apiObject === modelName; });
    };
    RuleService.prototype.associateRule = function (ruleConfigData, data) {
        var _this = this;
        ruleConfigData.ruleName.forEach(function (x) {
            _this.AddSpecificRules(x, ruleConfigData.ruleAssociates, ruleConfigData.ruleValue, data);
        });
    };
    RuleService.prototype.validateRulesByRulesConfig = function (jsonData, rulesConfig, editViewRowDataTable) {
        var result = true;
        this.errorsResultSet = [];
        editViewRowDataTable.forEach(function (p) { return p["errors"] = []; });
        if (rulesConfig && rulesConfig.length) {
            var modelName = rulesConfig[0].apiObject ? rulesConfig[0].apiObject : "";
            var tempJsonData = {};
            tempJsonData[modelName] = jsonData;
            if (!this.checkIfRulesSatisfied(tempJsonData, rulesConfig)) {
                if (this.errorsResultSet && this.errorsResultSet.length > 0) {
                    this.errorsResultSet.forEach(function (x) {
                        var tempRowTable = editViewRowDataTable.find(function (p) { return p.name == x.name; });
                        if (!tempRowTable["errors"]) {
                            tempRowTable["errors"] = [];
                        }
                        if (tempRowTable && x.message.length > 0) {
                            tempRowTable["errors"].push(x.name + "_" + x.message);
                            result = false;
                        }
                    });
                }
            }
        }
        return result;
    };
    RuleService.prototype.AddSpecificRules = function (ruleName, columns, ruleValue, data) {
        var _this = this;
        switch (ruleName.toLowerCase()) {
            case "requiredtarget":
                columns.forEach(function (x) {
                    if (_.isArray(ruleValue.targets)) {
                        ruleValue.targets.forEach(function (y) {
                            for (var prop in data) {
                                if (data[prop].hasOwnProperty(y) && y === ruleValue.ruleFunction(data[prop][x])) {
                                    var newValidator = new Validation_1.AbstractValidator();
                                    newValidator.RuleFor(y.toString(), new BasicValidators_1.RequiredValidator());
                                    _this.allValidators.push({ name: y, validator: newValidator });
                                }
                                ;
                            }
                        });
                    }
                });
                break;
            case "required":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    _this.requiredValidator = new BasicValidators_1.RequiredValidator();
                    newValidator.RuleFor(x, _this.requiredValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "minlength":
            case "childminlength":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    _this.minlengthValidator = new BasicValidators_1.MinLengthValidator(ruleValue);
                    newValidator.RuleFor(x, _this.minlengthValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "maxlength":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    _this.maxlengthValidator = new BasicValidators_1.MaxLengthValidator(ruleValue);
                    newValidator.RuleFor(x, _this.maxlengthValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "email":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    _this.emailValidator = new BasicValidators_1.EmailValidator();
                    newValidator.RuleFor(x, _this.emailValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "date":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    _this.dateValidator = new BasicValidators_1.DateValidator();
                    newValidator.RuleFor(x, _this.dateValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "datecompare":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    _this.dateCompareValidator = new DateCompareValidator_1.DateCompareValidator();
                    var compareTo = ruleValue.CompareTo;
                    if (isNaN(Date.parse(compareTo))) {
                        var modelName = x.apiObject ? x.apiObject : "";
                        _this.getTargetObjects(data, modelName);
                        var dataObj = _this.targetObjects;
                        var tempData = dataObj.find(function (x) { return x[ruleValue.CompareTo]; });
                        compareTo = new Date(tempData[ruleValue.CompareTo]);
                    }
                    _this.dateCompareValidator.CompareTo = compareTo;
                    _this.dateCompareValidator.CompareOperator = ruleValue.CompareOperator;
                    _this.dateCompareValidator.IgnoreTime = ruleValue.IgnoreTime ? ruleValue.IgnoreTime : true;
                    newValidator.RuleFor(x, _this.dateCompareValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "range":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    var validatorData = [parseInt(ruleValue[0]), parseInt(ruleValue[1])];
                    _this.rangeValidator = new BasicValidators_1.RangeValidator(validatorData);
                    newValidator.RuleFor(x, _this.rangeValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "zipcode":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    _this.zipCodeValidator = new BasicValidators_1.ZipCodeValidator();
                    newValidator.RuleFor(x, _this.zipCodeValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "number":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    _this.numberValidator = new BasicValidators_1.NumberValidator();
                    newValidator.RuleFor(x, _this.numberValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "letter":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    _this.lettersOnlyValidator = new BasicValidators_1.LettersOnlyValidator();
                    newValidator.RuleFor(x, _this.lettersOnlyValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "phone":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    _this.phoneValidator = new BasicValidators_1.PhoneOnlyValidator();
                    newValidator.RuleFor(x, _this.phoneValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "alphanumeric":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    _this.alphanumericValidator = new BasicValidators_1.AlphaNumericValidator();
                    newValidator.RuleFor(x, _this.alphanumericValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "inputmask":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    newValidator.RuleFor(x, new BasicValidators_1.PatternValidator(ruleValue));
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case "genericvalidation":
                columns.forEach(function (x) {
                    var newValidator = new Validation_1.AbstractValidator();
                    var genValidator = new GenericValidator_1.GenericValidator();
                    // base on your function (execution of it), generic Validator will return true or false (valid or invalid)
                    genValidator.genericFunctionResult = ruleValue.ruleFunction(data);
                    newValidator.RuleFor(x, genValidator);
                    _this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
        }
    };
    RuleService.prototype.validateRules = function (inputData, modelName, ruleType, ruleApplyMode) {
        var _this = this;
        this.targetObjects = new Array();
        this.resultSet = [];
        var errors = [];
        this.getTargetObjects(inputData, modelName);
        var dataObj = this.targetObjects;
        dataObj.forEach(function (data) {
            _this.allValidators.forEach(function (x) {
                var rule = x.validator.CreateRule(x.name);
                var result = rule.Validate(data);
                _this.resultSet.push({ name: x.name, result: result.HasErrors, message: result.ErrorMessage });
                if (result.HasErrors)
                    errors.push(x.name + ": " + result.ErrorMessage);
            });
        });
        var collectiveResult;
        switch (ruleType) {
            case "OneOf":
                collectiveResult = this.resultSet.find(function (x) { return x.result === false; }) ? false : true;
                if (!collectiveResult)
                    errors = [];
                break;
            case "AllOf":
                collectiveResult = this.resultSet.find(function (x) { return x.result === true; }) ? true : false;
                break;
            default:
                collectiveResult = this.resultSet.find(function (x) { return x.result === true; }) ? true : false;
        }
        return { hasErrors: collectiveResult, errorMessage: errors, resultSet: this.resultSet };
    };
    RuleService.prototype.checkIfRulesSatisfied = function (jsonObject, rulesConfig) {
        var _this = this;
        var finalResult = true;
        this.ruleErrors = [];
        if (rulesConfig) {
            rulesConfig.forEach(function (x) {
                var ruleType = x.ruleType;
                var applicationMode = x.applyTo;
                var modelName = x.apiObject ? x.apiObject : "";
                _this.clearExistingValidations();
                _this.associateRule(x, jsonObject);
                var result = _this.validateRules(jsonObject, modelName, ruleType, applicationMode);
                if (result.hasErrors || result.errorMessage.length) {
                    if (result.errorMessage) {
                        result.errorMessage.forEach(function (x) {
                            _this.ruleErrors.push(x);
                        });
                        result.resultSet.forEach(function (y) {
                            _this.errorsResultSet.push(y);
                        });
                        finalResult = false;
                    }
                }
            });
        }
        return finalResult;
    };
    RuleService.prototype.getTargetObjects = function (data, modelName) {
        var _this = this;
        for (var colInd in data) {
            var obj = data[colInd];
            if (colInd === modelName) {
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    obj.forEach(function (x) {
                        _this.targetObjects.push(x);
                    });
                }
                if (Object.prototype.toString.call(obj) === '[object Object]') {
                    this.targetObjects.push(obj);
                }
            }
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                obj.forEach(function (x) { return _this.getTargetObjects(x, modelName); });
            }
            if (Object.prototype.toString.call(obj) === '[object Object]') {
                this.getTargetObjects(obj, modelName);
            }
        }
    };
    RuleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], RuleService);
    return RuleService;
}());
exports.RuleService = RuleService;
//# sourceMappingURL=ruleService.js.map