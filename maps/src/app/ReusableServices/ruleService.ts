import { Injectable } from '@angular/core';
import {
    RequiredValidator, MinLengthValidator, MaxLengthValidator, EmailValidator, RangeValidator
    , ZipCodeValidator, NumberValidator, LettersOnlyValidator, PhoneOnlyValidator, AlphaNumericValidator, DateValidator,
    PatternValidator
} from './rulesSource/StandardValidation/BasicValidators';
import { AbstractValidator } from './rulesSource/StandardValidation/Validation';
import { DateCompareValidator } from './rulesSource/CustomValidation/DateCompareValidator';
import * as _ from 'lodash';
import { GenericValidator } from './rulesSource/CustomValidation/GenericValidator';


@Injectable()
export class RuleService {

    public ruleList: Array<any>;
    mainRuleObject: any;
    allValidators: Array<any>;
    resultSet: Array<any>;
    requiredValidator: any;
    minlengthValidator: any;
    targetObjects: Array<any>;
    maxlengthValidator: any;
    emailValidator: any;
    dateValidator: any;
    dateCompareValidator: any;
    minlengthValue: number = 1;
    rangeValidator: any;
    zipCodeValidator: any;
    numberValidator: any;
    lettersOnlyValidator: any;
    phoneValidator: any;
    alphanumericValidator: any;
    ruleErrors: any;
    errorsResultSet: any;

    constructor() {
        this.allValidators = new Array<any>();
        this.ruleList = new Array<any>();
        this.resultSet = new Array<any>();
        this.ruleErrors = new Array<any>();
        this.errorsResultSet = new Array<any>();
        this.targetObjects = new Array<any>();
    }


    clearExistingValidations() {
        this.allValidators = [];
        this.ruleList = [];
        this.resultSet = [];
        this.targetObjects = [];
    }

    getRulesByModel(modelName: string, rulesConfigData: Array<any>): Array<any> {
        return rulesConfigData.filter(p => p.apiObject === modelName);
    }

    associateRule(ruleConfigData, data) {

        ruleConfigData.ruleName.forEach(x => {
            this.AddSpecificRules(x, ruleConfigData.ruleAssociates, ruleConfigData.ruleValue, data);
        });
    }

    validateRulesByRulesConfig(jsonData, rulesConfig, editViewRowDataTable) {
        let result = true;
        this.errorsResultSet = [];
        editViewRowDataTable.forEach(p => p['errors'] = []);
        if (rulesConfig && rulesConfig.length) {
            let modelName = rulesConfig[0].apiObject ? rulesConfig[0].apiObject : '';
            let tempJsonData = {};
            tempJsonData[modelName] = jsonData;

            if (!this.checkIfRulesSatisfied(tempJsonData, rulesConfig)) {
                if (this.errorsResultSet && this.errorsResultSet.length > 0) {
                    this.errorsResultSet.forEach(x => {
                        let tempRowTable = editViewRowDataTable.find(p => p.name === x.name);
                        if (!tempRowTable['errors']) {
                            tempRowTable['errors'] = [];
                        }
                        if (tempRowTable && x.message.length > 0) {
                            tempRowTable['errors'].push(x.name + '_' + x.message);
                            result = false;
                        }
                    });
                }
            }
        }

        return result;
    }

    AddSpecificRules(ruleName: string, columns: Array<any>, ruleValue, data) {
        switch (ruleName.toLowerCase()) {
            case 'requiredtarget':
                columns.forEach(x => {
                    if (_.isArray(ruleValue.targets)) {
                        ruleValue.targets.forEach(y => {
                            for (let prop in data) {
                                if (data[prop].hasOwnProperty(y) && y === ruleValue.ruleFunction(data[prop][x])) {
                                    let newValidator = new AbstractValidator();
                                    newValidator.RuleFor(y.toString(), new RequiredValidator());
                                    this.allValidators.push({ name: y, validator: newValidator });
                                }
                                ;
                            }

                        });
                    }
                });
                break;

            case 'required':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    this.requiredValidator = new RequiredValidator();
                    newValidator.RuleFor(x, this.requiredValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'minlength':
            case 'childminlength':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    this.minlengthValidator = new MinLengthValidator(ruleValue);
                    newValidator.RuleFor(x, this.minlengthValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'maxlength':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    this.maxlengthValidator = new MaxLengthValidator(ruleValue);
                    newValidator.RuleFor(x, this.maxlengthValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'email':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    this.emailValidator = new EmailValidator();
                    newValidator.RuleFor(x, this.emailValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'date':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    this.dateValidator = new DateValidator();
                    newValidator.RuleFor(x, this.dateValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'datecompare':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    this.dateCompareValidator = new DateCompareValidator();

                    let compareTo = ruleValue.CompareTo;

                    if (isNaN(Date.parse(compareTo))) {

                        let modelName = x.apiObject ? x.apiObject : '';
                        this.getTargetObjects(data, modelName);
                        let dataObj = this.targetObjects;

                        let tempData = dataObj.find(x => x[ruleValue.CompareTo]);
                        compareTo = new Date(tempData[ruleValue.CompareTo]);
                    }

                    this.dateCompareValidator.CompareTo = compareTo;
                    this.dateCompareValidator.CompareOperator = ruleValue.CompareOperator;
                    this.dateCompareValidator.IgnoreTime = ruleValue.IgnoreTime ? ruleValue.IgnoreTime : true;

                    newValidator.RuleFor(x, this.dateCompareValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'range':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    let validatorData = [parseInt(ruleValue[0], 10), parseInt(ruleValue[1], 10)];
                    this.rangeValidator = new RangeValidator(validatorData);
                    newValidator.RuleFor(x, this.rangeValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'zipcode':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    this.zipCodeValidator = new ZipCodeValidator();
                    newValidator.RuleFor(x, this.zipCodeValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'number':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    this.numberValidator = new NumberValidator();
                    newValidator.RuleFor(x, this.numberValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'letter':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    this.lettersOnlyValidator = new LettersOnlyValidator();
                    newValidator.RuleFor(x, this.lettersOnlyValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'phone':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    this.phoneValidator = new PhoneOnlyValidator();
                    newValidator.RuleFor(x, this.phoneValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'alphanumeric':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    this.alphanumericValidator = new AlphaNumericValidator();
                    newValidator.RuleFor(x, this.alphanumericValidator);
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'inputmask':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    newValidator.RuleFor(x, new PatternValidator(ruleValue));
                    this.allValidators.push({ name: x, validator: newValidator });
                });
                break;
            case 'genericvalidation':
                columns.forEach(x => {
                    let newValidator = new AbstractValidator();
                    let genValidator = new GenericValidator();
                    // base on your function (execution of it), generic Validator will return true or false (valid or invalid)
                    genValidator.genericFunctionResult = ruleValue.ruleFunction(data);
                    newValidator.RuleFor(x, genValidator);
                    this.allValidators.push({ name: x, validator: newValidator });

                });
                break;
            default:
                break;

        }
    }

    validateRules(inputData: any, modelName, ruleType: any, ruleApplyMode: any): any {
        this.targetObjects = new Array<any>();
        this.resultSet = [];
        let errors = [];
        this.getTargetObjects(inputData, modelName);
        let dataObj = this.targetObjects;

        dataObj.forEach(data => {

            this.allValidators.forEach(x => {
                let rule = x.validator.CreateRule(x.name);
                let result = rule.Validate(data);
                this.resultSet.push({ name: x.name, result: result.HasErrors, message: result.ErrorMessage });
                if (result.HasErrors)
                    errors.push(x.name + ': ' + result.ErrorMessage);
            });
        });

        let collectiveResult: boolean;

        switch (ruleType) {
            case 'OneOf':
                collectiveResult = this.resultSet.find(x => x.result === false) ? false : true;
                if (!collectiveResult) errors = [];
                break;
            case 'AllOf':
                collectiveResult = this.resultSet.find(x => x.result === true) ? true : false;
                break;
            default:
                collectiveResult = this.resultSet.find(x => x.result === true) ? true : false;
        }
        return { hasErrors: collectiveResult, errorMessage: errors, resultSet: this.resultSet };

    }

    checkIfRulesSatisfied(jsonObject, rulesConfig) {
        let finalResult = true;
        this.ruleErrors = [];
        if (rulesConfig) {
            rulesConfig.forEach(x => {
                let ruleType = x.ruleType;
                let applicationMode = x.applyTo;
                let modelName = x.apiObject ? x.apiObject : '';
                this.clearExistingValidations();
                this.associateRule(x, jsonObject);
                let result = this.validateRules(jsonObject, modelName, ruleType, applicationMode);
                if (result.hasErrors || result.errorMessage.length) {
                    if (result.errorMessage) {
                        result.errorMessage.forEach(x => {
                            this.ruleErrors.push(x);
                        });
                        result.resultSet.forEach(y => {
                            this.errorsResultSet.push(y);
                        });
                        finalResult = false;
                    }
                }
            });
        }

        return finalResult;
    }

    getTargetObjects(data: any, modelName: any) {
        for (let colInd in data) {
            let obj = data[colInd];
            if (colInd === modelName) {
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    obj.forEach(x => {
                        this.targetObjects.push(x);
                    });
                }
                if (Object.prototype.toString.call(obj) === '[object Object]') {
                    this.targetObjects.push(obj);
                }
            }
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                obj.forEach(x => this.getTargetObjects(x, modelName));
            }
            if (Object.prototype.toString.call(obj) === '[object Object]') {
                this.getTargetObjects(obj, modelName);
            }
        }
    }
}


