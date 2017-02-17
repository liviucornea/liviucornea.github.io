"use strict";
var Utils_1 = require("../Utils");
var hashMap_1 = require("../hashMap");
var _Score_1 = require("../_Score");
var Error = (function () {
    function Error() {
        this.HasError = false;
        this.ErrorMessage = "";
    }
    return Error;
}());
exports.Error = Error;
/**
 *
 * @ngdoc object
 * @name  ValidationFailure
 * @module Validation
 *
 *
 * @description
 * It represents validation failure.
 */
var ValidationFailure = (function () {
    function ValidationFailure(Error, IsAsync) {
        this.Error = Error;
        this.IsAsync = IsAsync;
    }
    Object.defineProperty(ValidationFailure.prototype, "HasError", {
        get: function () { return this.Error.HasError; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFailure.prototype, "ErrorMessage", {
        get: function () { return this.Error.ErrorMessage; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFailure.prototype, "TranslateArgs", {
        get: function () { return this.Error.TranslateArgs; },
        enumerable: true,
        configurable: true
    });
    return ValidationFailure;
}());
exports.ValidationFailure = ValidationFailure;
/**
 *
 * @ngdoc object
 * @name  ValidationResult
 * @module Validation
 *
 *
 * @description
 * It represents simple abstract error object.
 */
var ValidationResult = (function () {
    function ValidationResult(Name) {
        this.Name = Name;
        this.ErrorsChanged = new Utils_1.Signal();
    }
    Object.defineProperty(ValidationResult.prototype, "Kids", {
        get: function () {
            return this.Kids;
        },
        enumerable: true,
        configurable: true
    });
    ValidationResult.prototype.Add = function (error) {
        throw ("Cannot add to ValidationResult to leaf node.");
    };
    ValidationResult.prototype.Remove = function (index) {
        throw ("Cannot remove ValidationResult from leaf node.");
    };
    ValidationResult.prototype.DispatchErrorsChanged = function () {
        if (this.ErrorsChanged !== undefined)
            this.ErrorsChanged.dispatch(this);
    };
    Object.defineProperty(ValidationResult.prototype, "HasErrorsDirty", {
        get: function () {
            return this.IsDirty && this.HasErrors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "HasErrors", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "ErrorCount", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "ErrorMessage", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    ValidationResult.prototype.add = function (child) { this.add(child); return true; };
    ValidationResult.prototype.remove = function (child) { this.remove(child); return true; };
    ValidationResult.prototype.getChildren = function () { return this.Kids; };
    ValidationResult.prototype.getName = function () { return this.Name; };
    ValidationResult.prototype.isItem = function () { return true; };
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
/**
 *
 * @ngdoc object
 * @name  CompositeValidationResult
 * @module Validation
 *
 *
 * @description
 * It represents composite error object.
 */
var CompositeValidationResult = (function () {
    function CompositeValidationResult(Name) {
        this.Name = Name;
        this.Kids = new Array();
        this.ErrorsChanged = new Utils_1.Signal();
    }
    CompositeValidationResult.prototype.AddFirst = function (error) {
        this.Kids.unshift(error);
    };
    CompositeValidationResult.prototype.Add = function (error) {
        this.Kids.push(error);
    };
    CompositeValidationResult.prototype.Remove = function (index) {
        this.Kids.splice(index, 1);
    };
    CompositeValidationResult.prototype.Clear = function () {
        this.Kids.splice(0, this.Kids.length);
    };
    Object.defineProperty(CompositeValidationResult.prototype, "HasErrorsDirty", {
        get: function () {
            if (this.Optional !== undefined && _Score_1._Score.isFunction(this.Optional) && this.Optional())
                return false;
            return _Score_1._Score.some(this.Kids, function (error) {
                return error.HasErrorsDirty;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositeValidationResult.prototype, "HasErrors", {
        get: function () {
            if (this.Optional !== undefined && _Score_1._Score.isFunction(this.Optional) && this.Optional())
                return false;
            /*return _.some(this.Children, function (error) {
                return error.HasErrors;
            });*/
            var hasError = false;
            this.Kids.forEach(function (x) {
                if (x.HasErrors) {
                    hasError = true;
                }
            });
            return hasError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositeValidationResult.prototype, "ErrorCount", {
        get: function () {
            if (!this.HasErrors)
                return 0;
            /* return _.reduce(this.Children, function (memo, error:IValidationResult) {
                 return memo + error.ErrorCount;
             }, 0);*/
            var errorCount = 0;
            for (var key in this.Kids) {
                errorCount += this.Kids[key].ErrorCount;
            }
            //return _.filter(this.children, function (error) { return error.HasErrors; }).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositeValidationResult.prototype, "ErrorMessage", {
        get: function () {
            if (!this.HasErrors)
                return "";
            /*return _.reduce(this.Children, function (memo, error:IValidationResult) {
                return memo + error.ErrorMessage;
            }, "");*/
            var errorMessage = "";
            for (var key in this.Kids) {
                errorMessage = errorMessage + this.Kids[key].ErrorMessage;
            }
            return errorMessage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositeValidationResult.prototype, "TranslateArgs", {
        get: function () {
            if (!this.HasErrors)
                return [];
            var newArgs = [];
            /* _.each(this.Children, function (error:IValidationResult) {
             newArgs = newArgs.concat(error.TranslateArgs);
             });*/
            this.Kids.forEach(function (error) {
                newArgs = newArgs.concat(error.TranslateArgs);
            });
            return newArgs;
        },
        enumerable: true,
        configurable: true
    });
    CompositeValidationResult.prototype.LogErrors = function (headerMessage) {
        if (headerMessage === undefined)
            headerMessage = "Output";
        console.log("---------------\n");
        console.log("--- " + headerMessage + " ----\n");
        console.log("---------------\n");
        this.traverse(this, 1);
        console.log("\n\n\n");
    };
    Object.defineProperty(CompositeValidationResult.prototype, "Errors", {
        get: function () {
            var map = {};
            /* _.each(this.Children,function (val){
                 map[val.Name] = val;
             });*/
            for (var key in this.Kids) {
                var val = this.Kids[key];
                map[val.Name] = val;
            }
            return map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositeValidationResult.prototype, "FlattenErros", {
        get: function () {
            var errors = [];
            this.flattenErrors(this, errors);
            return errors;
        },
        enumerable: true,
        configurable: true
    });
    CompositeValidationResult.prototype.SetDirty = function () {
        this.SetDirtyEx(this, true);
    };
    CompositeValidationResult.prototype.SetPristine = function () {
        this.SetDirtyEx(this, false);
    };
    CompositeValidationResult.prototype.SetDirtyEx = function (node, dirty) {
        if (node.Kids.length === 0) {
            node["IsDirty"] = dirty;
        }
        else {
            for (var i = 0, len = node.Kids.length; i < len; i++) {
                //stop if there are no children with errors
                this.SetDirtyEx(node.Kids[i], dirty);
            }
        }
    };
    CompositeValidationResult.prototype.flattenErrors = function (node, errorCollection) {
        if (node.Kids.length === 0) {
            if (node.HasErrors)
                errorCollection.push(node);
        }
        else {
            for (var i = 0, len = node.Kids.length; i < len; i++) {
                //stop if there are no children with errors
                if (node.Kids[i].HasErrors)
                    this.flattenErrors(node.Kids[i], errorCollection);
            }
        }
    };
    // recursively traverse a (sub)tree
    CompositeValidationResult.prototype.traverse = function (node, indent) {
        console.log(Array(indent++).join("--") + node.Name + " (" + node.ErrorMessage + ")" + '\n\r');
        for (var i = 0, len = node.Kids.length; i < len; i++) {
            this.traverse(node.Kids[i], indent);
        }
    };
    CompositeValidationResult.prototype.add = function (child) { this.add(child); return true; };
    CompositeValidationResult.prototype.remove = function (child) { this.remove(child); return true; };
    CompositeValidationResult.prototype.getChildren = function () { return this.Kids; };
    CompositeValidationResult.prototype.getName = function () { return this.Name; };
    CompositeValidationResult.prototype.isItem = function () { return false; };
    return CompositeValidationResult;
}());
exports.CompositeValidationResult = CompositeValidationResult;
/**
 * It represents mixed validation rule for composite error object and property validation rule error.
 */
var MixedValidationResult = (function (_super) {
    __extends(MixedValidationResult, _super);
    function MixedValidationResult(Composite, PropRule) {
        _super.call(this, Composite.Name);
        this.Composite = Composite;
        this.PropRule = PropRule;
    }
    Object.defineProperty(MixedValidationResult.prototype, "Children", {
        get: function () { return this.Composite.Kids; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixedValidationResult.prototype, "ValidationFailures", {
        get: function () { return this.PropRule.ValidationFailures; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixedValidationResult.prototype, "HasErrorsDirty", {
        get: function () {
            if (this.Composite.HasErrorsDirty)
                return true;
            if (this.PropRule !== undefined && this.PropRule.HasErrorsDirty)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixedValidationResult.prototype, "HasErrors", {
        get: function () {
            if (this.Composite.HasErrors)
                return true;
            if (this.PropRule !== undefined && this.PropRule.HasErrors)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixedValidationResult.prototype, "ErrorCount", {
        get: function () {
            if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors)
                return 0;
            return this.Composite.ErrorCount + (this.PropRule !== undefined ? this.PropRule.ErrorCount : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixedValidationResult.prototype, "ErrorMessage", {
        get: function () {
            if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors)
                return "";
            this.Composite.ErrorMessage + this.PropRule !== undefined ? this.PropRule.ErrorMessage : "";
        },
        enumerable: true,
        configurable: true
    });
    return MixedValidationResult;
}(CompositeValidationResult));
exports.MixedValidationResult = MixedValidationResult;
/**
 *
 * @ngdoc object
 * @name  AbstractValidator
 * @module Validation
 *
 *
 * @description
 * It enables to create custom validator for your own abstract object (class) and to assign validation rules to its properties.
 * You can assigned these rules
 *
 * +  register property validation rules - use _RuleFor_ property
 * +  register property async validation rules - use _RuleFor_ property
 * +  register shared validation rules - use _Validation_ or _ValidationFor_ property
 * +  register custom object validator - use _ValidatorFor_ property - enables composition of child custom validators
 */
//TODO:RF
var AbstractValidator = (function () {
    function AbstractValidator() {
        //export class AbstractValidator<T> {
        this.Validators = {};
        this.AbstractValidators = {};
        this.ValidationFunctions = {};
        /**
         * Return true if this validation rule is intended for list of items, otherwise true.
         */
        this.ForList = false;
    }
    /**
     *  Register property validator for property.
     * @param prop - property name
     * @param validator - property validator
     */
    AbstractValidator.prototype.RuleFor = function (prop, validator) {
        if (this.Validators[prop] === undefined) {
            this.Validators[prop] = [];
        }
        this.Validators[prop].push(validator);
    };
    /**
     *  Register shared validation and assign property name as dependency on shared rule.
     *  Dependency = when the property is validated then the shared rule is validated also.
     * @param prop name
     * @param fce name validation function
     */
    AbstractValidator.prototype.ValidationFor = function (prop, fce) {
        if (this.ValidationFunctions[prop] === undefined) {
            this.ValidationFunctions[prop] = [];
        }
        this.ValidationFunctions[prop].push(fce);
    };
    /**
     *  Register shared validation. There are no relationship to dependent property.
     *  Dependency = when the property is validated then the shared rule is validated also.
     * @param fce name validation function
     */
    AbstractValidator.prototype.Validation = function (fce) {
        if (fce.Name === undefined)
            throw 'argument must have property Name';
        this.ValidationFor(fce.Name, fce);
    };
    /**
     * Register child validator for property - composition of validators
     * @param prop name
     * @param validator child validator
     * @param forList true if is array structure, otherwise false
     */
    AbstractValidator.prototype.ValidatorFor = function (prop, validator, forList) {
        validator.ForList = forList;
        this.AbstractValidators[prop] = validator;
    };
    //TODO:RF
    AbstractValidator.prototype.CreateAbstractRule = function (name) {
        //public CreateAbstractRule(name:string) :AbstractValidationRule<T> {
        return new AbstractValidationRule(name, this);
    };
    AbstractValidator.prototype.CreateAbstractListRule = function (name) {
        //TODO:RF
        return new AbstractListValidationRule(name, this);
        //return;
    };
    AbstractValidator.prototype.CreateRule = function (name) {
        //TODO:RF
        return new AbstractValidationRule(name, this);
        //return;
    };
    return AbstractValidator;
}());
exports.AbstractValidator = AbstractValidator;
/**
 *
 * @ngdoc object
 * @name  AbstractValidationRule
 * @module Validation
 *
 *
 * @description
 * It represents concreate validator for custom object. It enables to assign validation rules to custom object properties.
 */
//TODO:RF
var AbstractValidationRule = (function () {
    function AbstractValidationRule(Name, validator, ForList) {
        var _this = this;
        this.Name = Name;
        this.validator = validator;
        this.ForList = ForList;
        this.Rules = {};
        this.Validators = {};
        this.Children = {};
        this.ValidationResultVisitor = new ValidationResultVisitor(new CompositeValidationResult(this.Name));
        /*_.each(this.validator.ValidationFunctions, function (val:Array<IValidatorFce>) {
         _.each(val, function (validation) {
         var validator = this.Validators[validation.Name];
         if (validator === undefined) {
         validator = new Validator(validation.Name, validation.ValidationFce, validation.AsyncValidationFce);
         this.Validators[validation.Name] = validator;
         validator.AcceptVisitor(this.ValidationResultVisitor);
         //this.ValidationResult.Add(validator);
         }
         }, this)
         }, this);*/
        if (!this.ForList) {
            for (var key in this.validator.Validators) {
                var val = this.validator.Validators[key];
                this.createRuleFor(key);
                val.forEach(function (x) {
                    var rule = _this.Rules[key];
                    rule.AddValidator(x);
                });
            }
            for (var key in this.validator.ValidationFunctions) {
                var val = this.validator.ValidationFunctions[key];
                val.forEach(function (x) {
                    var validator = _this.Validators[x.Name];
                    if (validator === undefined) {
                        validator = new Validator(x.Name, x.ValidationFce, x.AsyncValidationFce);
                        _this.Validators[x.Name] = validator;
                        validator.AcceptVisitor(_this.ValidationResultVisitor);
                    }
                });
            }
            this.addChildren();
        }
    }
    Object.defineProperty(AbstractValidationRule.prototype, "ValidationResult", {
        //class AbstractValidationRule<T> {
        get: function () { return this.ValidationResultVisitor.ValidationResult; },
        set: function (value) { this.ValidationResultVisitor.ValidationResult = value; },
        enumerable: true,
        configurable: true
    });
    AbstractValidationRule.prototype.AcceptVisitor = function (visitor) {
        visitor.AddValidator(this);
    };
    AbstractValidationRule.prototype.addChildren = function () {
        /* _.each(this.validator.AbstractValidators, function(val, key){
             var validationRule;
             if (val.ForList) {
                 validationRule = val.CreateAbstractListRule(key);
             }
             else {
                 validationRule = val.CreateAbstractRule(key);
             }
             this.Children[key] = validationRule;
             validationRule.AcceptVisitor(this.ValidationResultVisitor);
             //this.ValidationResult.Add(validationRule.ValidationResult);
         },this);*/
        for (var key in this.validator.AbstractValidators) {
            var val = this.validator.AbstractValidators[key];
            var validationRule;
            if (val.ForList) {
                validationRule = val.CreateAbstractListRule(key);
            }
            else {
                validationRule = val.CreateAbstractRule(key);
            }
            this.Children[key] = validationRule;
            validationRule.AcceptVisitor(this.ValidationResultVisitor);
        }
    };
    AbstractValidationRule.prototype.SetOptional = function (fce) {
        this.ValidationResult.Optional = fce;
        /* _.each(this.Rules, function(value:IValidationResult, key:string){value.Optional = fce;});
         _.each(this.Validators, function(value:any, key:string){value.Optional = fce;});
         _.each(this.Children, function(value:any, key:string){value.SetOptional(fce);});*/
        for (var key in this.Rules) {
            var value = this.Rules[key];
            value.Optional = fce;
        }
        for (var key in this.Validators) {
            var value = this.Validators[key];
            value.Optional = fce;
        }
        for (var key in this.Children) {
            var value = this.Children[key];
            value.SetOptional(fce);
        }
    };
    AbstractValidationRule.prototype.createRuleFor = function (prop) {
        var propValidationRule = new PropertyValidationRule(prop);
        this.Rules[prop] = propValidationRule;
        propValidationRule.AcceptVisitor(this.ValidationResultVisitor);
        //this.ValidationResult.Add(propValidationRule);
    };
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures.
     */
    AbstractValidationRule.prototype.Validate = function (context) {
        /* _.each(this.Children,function(val,key){
             if (context[key] === undefined) context[key] = val.ForList?[]:{};
             val.Validate(context[key]);
         },this);*/
        var _this = this;
        for (var key in this.Children) {
            var val = this.Children[key];
            if (context[key] === undefined)
                context[key] = val.ForList ? [] : {};
            val.Validate(context[key]);
        }
        for (var propName in this.Rules) {
            var rule = this.Rules[propName];
            rule.Validate(new ValidationContext(propName, context));
        }
        /*_.each (this.validator.ValidationFunctions, function (valFunctions:Array<IValidatorFce>) {
            _.each(valFunctions, function (valFce) {
                var validator = this.Validators[valFce.Name];
                if (validator !== undefined) validator.Validate(context);
            },this)
        },this);*/
        for (var key in this.validator.ValidationFunctions) {
            var valFunctions = this.validator.ValidationFunctions[key];
            valFunctions.forEach(function (x) {
                var val = x;
                var validator = _this.Validators[val.Name];
                if (validator !== undefined)
                    validator.Validate(context);
            });
        }
        ;
        return this.ValidationResult;
    };
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    AbstractValidationRule.prototype.ValidateAsync = function (context) {
        var _this = this;
        var subResult;
        var deferred = new Promise(function (x) { return x(subResult); });
        var promises = [];
        /* _.each(this.Children,function(val,key){
             promises.push(val.ValidateAsync(context[key]));
         },this);
*/
        for (var key in this.Children) {
            var val = this.Children[key];
            promises.push(val.ValidateAsync(context[key]));
        }
        ;
        for (var propName in this.Rules) {
            var rule = this.Rules[propName];
            promises.push(rule.ValidateAsync(new ValidationContext(propName, context)));
        }
        /*_.each (this.validator.ValidationFunctions, function (valFunctions:Array<IValidatorFce>) {
            _.each(valFunctions, function (valFce) {
                var validator = this.Validators[valFce.Name];
                if (validator !== undefined) promises.push(validator.ValidateAsync(context));
            },this)
        },this);*/
        for (var key in this.validator.ValidationFunctions) {
            var valFunctions = this.validator.ValidationFunctions[key];
            valFunctions.forEach(function (valFce) {
                var validator = _this.Validators[valFce.Name];
                if (validator !== undefined)
                    promises.push(validator.ValidateAsync(context));
            });
        }
        var self = this;
        Promise.all(promises).then(function (result) {
            subResult = self.ValidationResult;
            Promise.resolve(deferred);
        });
        return deferred;
    };
    AbstractValidationRule.prototype.ValidateAll = function (context) {
        this.Validate(context);
        return this.ValidateAsync(context);
    };
    AbstractValidationRule.prototype.ValidateProperty = function (context, propName) {
        var childRule = this.Children[propName];
        if (childRule !== undefined)
            childRule.Validate(context[propName]);
        var rule = this.Rules[propName];
        if (rule !== undefined) {
            var valContext = new ValidationContext(propName, context);
            rule.Validate(valContext);
            rule.ValidateAsync(valContext);
        }
        var validationFces = this.validator.ValidationFunctions[propName];
        if (validationFces !== undefined) {
            for (var key in validationFces) {
                var valFce = validationFces[key];
                var validator = this.Validators[valFce.Name];
                if (validator !== undefined)
                    validator.Validate(context);
            }
        }
    };
    AbstractValidationRule.prototype.add = function (child) {
        throw "not implemented";
    };
    AbstractValidationRule.prototype.remove = function (child) {
        throw "not implemented";
    };
    AbstractValidationRule.prototype.getChildren = function () {
        /*  return _.map(this.Children, function (item) {
         return item;
         });*/
        var items = new Array();
        for (var key in this.Children) {
            items.push(this.Children[key]);
        }
        return items;
    };
    AbstractValidationRule.prototype.getName = function () {
        return this.Name;
    };
    AbstractValidationRule.prototype.isItem = function () {
        return this.getChildren().length === 0;
    };
    AbstractValidationRule.id = 0;
    return AbstractValidationRule;
}());
/**
 *  It represents visitor class that enables to separate validation result creation from validation execution.
 *  You can create your own Visitors for composing ValidationResults on your own.
 */
var ValidationResultVisitor = (function () {
    function ValidationResultVisitor(ValidationResult) {
        this.ValidationResult = ValidationResult;
    }
    ValidationResultVisitor.prototype.AddRule = function (rule) {
        //if (this.ValidationResult.ErrorsChanged !== undefined) rule.ErrorsChanged = this.ValidationResult.ErrorsChanged;
        this.ValidationResult.Add(rule);
    };
    ValidationResultVisitor.prototype.AddValidator = function (rule) {
        // mixed composite validation result with property validation error
        //TODO: find better and more generic way how to solve mixed validation results with the same name
        //var error:any =  _.find(this.ValidationResult.Children, function(item:IValidationResult) {return item.Name === rule.ValidationResult.Name});
        var error = this.ValidationResult.Kids.find(function (x) { return x.Name === rule.ValidationResult.Name; });
        if (error !== undefined) {
            //compose composite validation result with property validation result
            this.ValidationResult.Add(new MixedValidationResult(rule.ValidationResult, error));
        }
        else {
            this.ValidationResult.Add(rule.ValidationResult);
        }
    };
    ValidationResultVisitor.prototype.AddValidation = function (validator) {
        this.ValidationResult.Add(validator);
    };
    return ValidationResultVisitor;
}());
/**
 *
 * @ngdoc object
 * @name  AbstractListValidationRule
 * @module Validation
 *
 *
 * @description
 * It represents an validator for custom object. It enables to assign rules to custom object properties.
 */
var AbstractListValidationRule = (function (_super) {
    __extends(AbstractListValidationRule, _super);
    //private RowsObserver;
    function AbstractListValidationRule(Name, validator) {
        _super.call(this, Name, validator, true);
        this.Name = Name;
        this.validator = validator;
        this.RowsMap = new hashMap_1.HashMap();
    }
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures.
     */
    AbstractListValidationRule.prototype.Validate = function (context) {
        //super.Validate(context);
        this.RefreshRows(context);
        for (var i = 0; i != context.length; i++) {
            var validationRule = this.RowsMap.get(context[i]);
            if (validationRule !== undefined)
                validationRule.Validate(context[i]);
        }
        //this.ClearValidationResult(context);
        return this.ValidationResult;
    };
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    AbstractListValidationRule.prototype.ValidateAsync = function (context) {
        var subResult;
        var deferred = new Promise(function (x) { return x(subResult); });
        var promises = [];
        this.RefreshRows(context);
        for (var i = 0; i != context.length; i++) {
            var validationRule = this.RowsMap.get(context[i]);
            if (validationRule !== undefined)
                promises.push(validationRule.ValidateAsync(context[i]));
        }
        var self = this;
        Promise.all(promises).then(function (result) {
            //self.ClearValidationResult(context);
            subResult = self.ValidationResult;
            Promise.resolve(subResult);
        });
        return deferred;
    };
    Object.defineProperty(AbstractListValidationRule.prototype, "Rows", {
        get: function () {
            return this.RowsMap.values();
        },
        enumerable: true,
        configurable: true
    });
    AbstractListValidationRule.prototype.RefreshRows = function (list) {
        this.refreshList(list);
        //            var self = this;
        //            this.RowsObserver = new ObserveJs.ArrayObserver(list, function(splices) {
        //                // respond to changes to the elements of arr.
        //                splices.forEach(function(splice) {
        //                    //var newContext = ObserveJs.ArrayObserver.applySplices(splice, context);
        //                    var newList = list.splice.apply(list,[splice.index,splice.removed.length].concat(splice.added));
        //                    self.refreshList(newList);
        //                });
        //            });
    };
    AbstractListValidationRule.prototype.ClearRows = function (list) {
        /*
         var keysToRemove = _.difference(this.RowsMap.keys(),list);
         _.each(keysToRemove,function(key){
         if (this.has(key)) this.remove(key);
         },this.RowsMap);*/
        var removeList = new Array();
        var secondList = this.RowsMap.keys();
        secondList.forEach(function (x) {
            var ind = list.indexOf(x);
            if (!(ind < 0)) {
                removeList.push(ind);
            }
        });
        removeList.forEach(function (x) {
            secondList.splice(x, 1);
        });
    };
    AbstractListValidationRule.prototype.ClearValidationResult = function (list) {
        this.ClearRows(list);
        /*   var results =
               _.map( this.RowsMap.values(), function(item:IAbstractValidationRule<any>) {return item.ValidationResult;});*/
        var results = this.RowsMap.values().map(function (x) { return x.ValidationResult; });
        for (var i = this.ValidationResult.Kids.length - 1; i >= 0; i--) {
            var item = this.ValidationResult.Kids[i];
            if (item === undefined)
                continue;
            if (results.indexOf(item) === -1) {
                this.ValidationResult.Remove(i);
            }
        }
    };
    AbstractListValidationRule.prototype.getValidationRule = function (key, name) {
        //TODO:RF
        if (name === undefined)
            name = "Row";
        var validationRule;
        if (!this.RowsMap.has(key)) {
            validationRule = this.validator.CreateAbstractRule(name);
            this.ValidationResult.Add(validationRule.ValidationResult);
            this.RowsMap.set(key, validationRule);
        }
        else {
            validationRule = this.RowsMap.get(key);
        }
        return validationRule;
        //return;
    };
    AbstractListValidationRule.prototype.refreshList = function (list) {
        var _this = this;
        this.ClearValidationResult(list);
        list.forEach(function (item) { var rule = _this.getValidationRule(item); });
    };
    return AbstractListValidationRule;
}(AbstractValidationRule));
/**
 *
 * @ngdoc object
 * @name  ValidationContext
 * @module Validation
 *
 *
 * @description
 * It represents a data context for validation rule.
 */
var ValidationContext = (function () {
    function ValidationContext(Key, Data) {
        this.Key = Key;
        this.Data = Data;
    }
    Object.defineProperty(ValidationContext.prototype, "Value", {
        get: function () {
            return this.Data[this.Key];
        },
        enumerable: true,
        configurable: true
    });
    return ValidationContext;
}());
var MessageLocalization = (function () {
    function MessageLocalization() {
    }
    MessageLocalization.GetValidationMessage = function (validator) {
        /*var msgText = MessageLocalization.ValidationMessages[validator.tagName];
        if (msgText === undefined || msgText === "" || !_Score.isString(msgText)) {
            msgText = MessageLocalization.customMsg;
        }*/
        //return StringFce.format(msgText, validator);
        return validator.tagName + "ValidatorMessage";
    };
    MessageLocalization.customMsg = "Please, fix the field.";
    MessageLocalization.defaultMessages = {
        "requiredValidatorMessage": "This field is required.",
        "remoteValidatorMessage": "Please fix the field.",
        "emailValidatorMessage": "Please enter a valid email address.",
        "urlValidatorMessage": "Please enter a valid URL.",
        "dateValidatorMessage": "Please enter a valid date.",
        "dateISOValidatorMessage": "Please enter a valid date ( ISO ).",
        "dateCompareValidatorMessage": "Please enter valid dates.",
        "numberValidatorMessage": "Please enter a valid number.",
        "digitsValidatorMessage": "Please enter only digits.",
        "signedDigitsValidatorMessage": "Please enter only signed digits.",
        "creditcardValidatorMessage": "Please enter a valid credit card number.",
        "equalToValidatorMessage": "Please enter the same value again.",
        "maxlengthValidatorMessage": "Please enter no more than {MaxLength} characters.",
        "minlengthValidatorMessage": "Please enter at least {MinLength} characters.",
        "rangelengthValidatorMessage": "Please enter a value between {MinLength} and {MaxLength} characters long.",
        "rangeValidatorMessage": "Please enter a value between {Min} and {Max}.",
        "maxValidatorMessage": "Please enter a value less than or equal to {Max}.",
        "minValidatorMessage": "Please enter a value greater than or equal to {Min}.",
        "stepValidatorMessage": "Please enter a value with step {Step}.",
        "containsValidatorMessage": "Please enter a value from list of values. Attempted value '{AttemptedValue}'.",
        "maskValidatorMessage": "Please enter a value corresponding with {Mask}.",
        "minItemsValidatorMessage": "Please enter at least {Min} items.",
        "maxItemsValidatorMessage": "Please enter no more than {Max} items.",
        "uniqItemValidatorMessage": "Please enter unique items.",
        "enumValidatorMessage": "Please enter a value from list of permitted values.",
        "typeValidatorMessage": "Please enter a value of type '{Type}'.",
        "multipleOfValidatorMessage": "Please enter a value that is multiple of {Divider}.",
        "zipcodeValidatorMessage": "Please enter the postal code in the format A1A 1A1",
        "phoneValidatorMessage": "Please enter valid phone format +1 123-123-1234",
        "lettersonlyValidatorMessage": "Please enter only text in the field",
        "alphanumericValidatorMessage": "Please enter number or text",
        "customValidatorMessage": MessageLocalization.customMsg
    };
    MessageLocalization.ValidationMessages = MessageLocalization.defaultMessages;
    return MessageLocalization;
}());
exports.MessageLocalization = MessageLocalization;
/**
 *
 * @ngdoc object
 * @name  PropertyValidationRule
 * @module Validation
 *
 *
 * @description
 * It represents a property validation rule. The property has assigned collection of property validators.
 */
var PropertyValidationRule = (function (_super) {
    __extends(PropertyValidationRule, _super);
    function PropertyValidationRule(Name, validatorsToAdd) {
        _super.call(this, Name);
        this.Name = Name;
        this.Validators = {};
        this.ValidationFailures = {};
        for (var index in validatorsToAdd) {
            this.AddValidator(validatorsToAdd[index]);
        }
    }
    //public AsyncValidationFailures:{[name:string]: IAsyncValidationFailure} = {};
    PropertyValidationRule.prototype.AcceptVisitor = function (visitor) {
        visitor.AddRule(this);
    };
    PropertyValidationRule.prototype.AddValidator = function (validator) {
        this.Validators[validator.tagName] = validator;
        this.ValidationFailures[validator.tagName] = new ValidationFailure(new Error(), !!validator.isAsync);
    };
    Object.defineProperty(PropertyValidationRule.prototype, "Errors", {
        get: function () {
            return this.ValidationFailures;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyValidationRule.prototype, "HasErrors", {
        get: function () {
            if (this.Optional !== undefined && _Score_1._Score.isFunction(this.Optional) && this.Optional())
                return false;
            var values = new Array();
            for (var key in this.Errors) {
                values.push(this.Errors[key]);
            }
            ;
            return _Score_1._Score.some(values, function (error) {
                return error.HasError;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyValidationRule.prototype, "ErrorCount", {
        get: function () {
            return this.HasErrors ? 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyValidationRule.prototype, "ErrorMessage", {
        get: function () {
            if (!this.HasErrors)
                return "";
            var values = new Array();
            for (var key in this.Errors) {
                values.push(this.Errors[key]);
            }
            ;
            var message = "";
            values.forEach(function (x) {
                message = message + x.ErrorMessage;
            });
            return message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyValidationRule.prototype, "TranslateArgs", {
        get: function () {
            if (!this.HasErrors)
                return [];
            var newArray = [];
            /*_.each(_.values(this.Errors), function (error:IValidationFailure) {
                if (error.HasError) newArray.push(error.Error.TranslateArgs);
            });*/
            var values = new Array();
            for (var key in this.Errors) {
                values.push(this.Errors[key]);
            }
            values.forEach(function (error) {
                if (error.HasError)
                    newArray.push(error.Error.TranslateArgs);
            });
            return newArray;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures.
     */
    PropertyValidationRule.prototype.Validate = function (context) {
        try {
            return this.ValidateEx(context.Value);
        }
        catch (e) {
            //if (this.settings.debug && window.console) {
            console.log("Exception occurred when checking element " + context.Key + ".", e);
            //}
            throw e;
        }
    };
    PropertyValidationRule.prototype.ValidateEx = function (value) {
        var lastPriority = 0;
        var shortCircuited = false;
        var original = this.HasErrors;
        for (var index in this.ValidationFailures) {
            var validation = this.ValidationFailures[index];
            if (validation.IsAsync)
                continue;
            var validator = this.Validators[index];
            try {
                var priority = 0;
                if (shortCircuited && priority > lastPriority) {
                    validation.Error.HasError = false;
                }
                else {
                    var ruleResult = validator.isAcceptable(value);
                    var hasError = ((value === undefined || value === null) && validator.tagName != "required") ? false : !ruleResult;
                    validation.Error.HasError = hasError;
                    //validation.Error.TranslateArgs = { TranslateId:validator.tagName, MessageArgs:_.extend(validator,{AttemptedValue: value}), CustomMessage: validator.customMessage};
                    validator["AttemptedValue"] = value;
                    validation.Error.TranslateArgs = { TranslateId: validator.tagName, MessageArgs: validator, CustomMessage: validator.customMessage };
                    validation.Error.ErrorMessage = hasError ? MessageLocalization.GetValidationMessage(validation.Error.TranslateArgs.MessageArgs) : "";
                    shortCircuited = hasError;
                    lastPriority = priority;
                }
            }
            catch (e) {
                //if (this.settings.debug && window.console) {
                console.log("Exception occurred when checking element'" + validator.tagName + "' method.", e);
                //}
                throw e;
            }
        }
        if (original !== this.HasErrors)
            this.DispatchErrorsChanged();
        //return _.filter(this.ValidationFailures,function(item){return !item.IsAsync;});
        var filtered = new Array();
        for (var key in this.ValidationFailures) {
            var item = this.ValidationFailures[key];
            if (!item.IsAsync) {
                filtered.push(item);
            }
        }
        return filtered;
    };
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    PropertyValidationRule.prototype.ValidateAsync = function (context) {
        return this.ValidateAsyncEx(context.Value);
    };
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    PropertyValidationRule.prototype.ValidateAsyncEx = function (value) {
        var subResult;
        var deferred = new Promise(function (x) { return x(subResult); });
        var promises = [];
        var original = this.HasErrors;
        var setResultFce = function (result) {
            var hasError = !result;
            validation.Error.HasError = hasError;
            //validation.Error.TranslateArgs = { TranslateId: validator.tagName, MessageArgs: _.extend(validator, {AttemptedValue: value})};
            validator["AttemptedValue"] = value;
            validation.Error.TranslateArgs = { TranslateId: validator.tagName, MessageArgs: validator };
            validation.Error.ErrorMessage = hasError ? MessageLocalization.GetValidationMessage(validation.Error.TranslateArgs.MessageArgs) : "";
        };
        for (var index in this.ValidationFailures) {
            var validation = this.ValidationFailures[index];
            if (!validation.IsAsync)
                continue;
            var validator = this.Validators[index];
            try {
                var hasErrorPromise = ((value === undefined || value === null) && validator.tagName != "required") ? Promise.resolve(true) : validator.isAcceptable(value);
                hasErrorPromise.then(setResultFce);
                promises.push(hasErrorPromise);
            }
            catch (e) {
                //if (this.settings.debug && window.console) {
                console.log("Exception occurred when checking element'" + validator.tagName + "' method.", e);
                //}
                throw e;
            }
        }
        var self = this;
        Promise.all(promises).then(function (result) {
            if (original !== self.HasErrors)
                self.DispatchErrorsChanged();
            //subResult=_.filter(self.ValidationFailures,function(item){return item.IsAsync;});
            var subResult = new Array();
            for (var key in self.ValidationFailures) {
                var item = this.ValidationFailures[key];
                if (!item.IsAsync) {
                    subResult.push(item);
                }
            }
            Promise.resolve(deferred);
        });
        return deferred;
    };
    return PropertyValidationRule;
}(ValidationResult));
/**
 *
 * @ngdoc object
 * @name  Validator
 * @module Validation
 *
 *
 * @description
 * It represents a custom validator. It enables to define your own shared validation rules
 */
var Validator = (function (_super) {
    __extends(Validator, _super);
    function Validator(Name, ValidateFce, AsyncValidationFce) {
        _super.call(this, Name);
        this.Name = Name;
        this.ValidateFce = ValidateFce;
        this.AsyncValidationFce = AsyncValidationFce;
        this.Error = new Error();
        this.ValidationFailures = {};
        this.ValidationFailures[this.Name] = new ValidationFailure(this.Error, false);
    }
    Validator.prototype.Validate = function (context) {
        var original = this.Error.HasError;
        if (this.ValidateFce !== undefined)
            this.ValidateFce.bind(context)(this.Error);
        if (original !== this.Error.HasError)
            this.DispatchErrorsChanged();
        return this.ValidationFailures[this.Name];
    };
    Validator.prototype.ValidateAsync = function (context) {
        var subResult;
        var deferred = new Promise(function (x) { return x(subResult); });
        if (this.AsyncValidationFce === undefined) {
            subResult = this.ValidationFailures[this.Name];
            Promise.resolve(deferred);
        }
        else {
            var original = this.Error.HasError;
            var self = this;
            this.AsyncValidationFce.bind(context)(this.Error).then(function () {
                if (original !== self.Error.HasError)
                    self.DispatchErrorsChanged();
                subResult = self.ValidationFailures[self.Name];
                Promise.resolve(subResult);
            });
        }
        return deferred;
    };
    Object.defineProperty(Validator.prototype, "HasError", {
        get: function () {
            return this.HasErrors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "Errors", {
        get: function () {
            return this.ValidationFailures;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "HasErrors", {
        get: function () {
            if (this.Optional !== undefined && _Score_1._Score.isFunction(this.Optional) && this.Optional())
                return false;
            return this.Error.HasError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "ErrorCount", {
        get: function () {
            return this.HasErrors ? 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "ErrorMessage", {
        get: function () {
            if (!this.HasErrors)
                return "";
            return this.Error.ErrorMessage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "TranslateArgs", {
        get: function () {
            if (!this.HasErrors)
                return [];
            var newArray = [];
            newArray.push(this.Error.TranslateArgs);
            return newArray;
        },
        enumerable: true,
        configurable: true
    });
    Validator.prototype.AcceptVisitor = function (visitor) {
        visitor.AddValidation(this);
    };
    return Validator;
}(ValidationResult));
/**
 * It defines compare operators.
 */
(function (CompareOperator) {
    /**
     * must be less than
     */
    CompareOperator[CompareOperator["LessThan"] = 0] = "LessThan";
    /**
     * cannot be more than
     */
    CompareOperator[CompareOperator["LessThanEqual"] = 1] = "LessThanEqual";
    /**
     *  must be the same as
     */
    CompareOperator[CompareOperator["Equal"] = 2] = "Equal";
    /**
     * must be different from
     */
    CompareOperator[CompareOperator["NotEqual"] = 3] = "NotEqual";
    /**
     * cannot be less than
     */
    CompareOperator[CompareOperator["GreaterThanEqual"] = 4] = "GreaterThanEqual";
    /**
     * must be more than
     */
    CompareOperator[CompareOperator["GreaterThan"] = 5] = "GreaterThan";
})(exports.CompareOperator || (exports.CompareOperator = {}));
var CompareOperator = exports.CompareOperator;
/**
 *
 * @ngdoc object
 * @name  Error
 * @module Validation
 *
 *
 * @description
 * It represents basic error structure.
 */
//# sourceMappingURL=Validation.js.map