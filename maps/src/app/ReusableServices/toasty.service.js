// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var toasty_utils_1 = require('../ReusableComponents/standardToasty/toasty.utils');
/**
 * Default configuration foa all toats and toasty container
 */
var ToastyConfig = (function () {
    function ToastyConfig() {
        // Maximum number of toasties to show at once
        this.limit = 10;
        // Whether to show the 'X' icon to close the toast
        this.showClose = true;
        // The window position where the toast pops up. Possible values
        // bottom-right, bottom-left, top-right, top-left, top-center, bottom-center, center-center
        this.position = 'bottom-right';
        // How long (in miliseconds) the toasty shows before it's removed. Set to null/0 to turn off.
        this.timeout = 5000;
        // What theme to use. Possible values:
        // default, material or bootstrap
        this.theme = 'default';
    }
    ToastyConfig = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ToastyConfig);
    return ToastyConfig;
}());
exports.ToastyConfig = ToastyConfig;
/**
 * Toasty service helps create different kinds of Toasts
 */
var ToastyService = (function () {
    function ToastyService(config) {
        this.config = config;
        // Init the counter
        this.uniqueCounter = 0;
        this.themes = [{
                name: 'Default Theme',
                code: 'default'
            }, {
                name: 'Material Design',
                code: 'material'
            }, {
                name: 'Bootstrap 3',
                code: 'bootstrap'
            }];
        this.types = [{
                name: 'Default',
                code: 'default',
            }, {
                name: 'Info',
                code: 'info'
            }, {
                name: 'Success',
                code: 'success'
            }, {
                name: 'Wait',
                code: 'wait'
            }, {
                name: 'Error',
                code: 'error'
            }, {
                name: 'Warning',
                code: 'warning'
            }];
        this.positions = [{
                name: 'Top Left',
                code: 'top-left',
            }, {
                name: 'Top Center',
                code: 'top-center',
            }, {
                name: 'Top Right',
                code: 'top-right',
            }, {
                name: 'Bottom Left',
                code: 'bottom-left',
            }, {
                name: 'Bottom Center',
                code: 'bottom-center',
            }, {
                name: 'Bottom Right',
                code: 'bottom-right',
            }, {
                name: 'Center Center',
                code: 'center-center',
            }];
        // ToastData event emitter
        this.toastsEmitter = new core_1.EventEmitter();
        // Clear event emitter
        this.clearEmitter = new core_1.EventEmitter();
    }
    ToastyService.prototype.getToasts = function () {
        return this.toastsEmitter.asObservable();
    };
    ToastyService.prototype.getClear = function () {
        return this.clearEmitter.asObservable();
    };
    /**
     * Create Toast of a default type
     */
    ToastyService.prototype.default = function (options) {
        this.add(options, 'default');
    };
    /**
     * Create Toast of info type
     * @param  {object} options Individual toasty config overrides
     */
    ToastyService.prototype.info = function (options) {
        this.add(options, 'info');
    };
    /**
     * Create Toast of success type
     * @param  {object} options Individual toasty config overrides
     */
    ToastyService.prototype.success = function (options) {
        this.add(options, 'success');
    };
    /**
     * Create Toast of wait type
     * @param  {object} options Individual toasty config overrides
     */
    ToastyService.prototype.wait = function (options) {
        this.add(options, 'wait');
    };
    /**
     * Create Toast of error type
     * @param  {object} options Individual toasty config overrides
     */
    ToastyService.prototype.error = function (options) {
        this.add(options, 'error');
    };
    /**
     * Create Toast of warning type
     * @param  {object} options Individual toasty config overrides
     */
    ToastyService.prototype.warning = function (options) {
        this.add(options, 'warning');
    };
    // Clear all toasts
    ToastyService.prototype.clearAll = function () {
        this.clearEmitter.next(null);
    };
    // Clear the specific one
    ToastyService.prototype.clear = function (id) {
        this.clearEmitter.next(id);
    };
    // Checks whether the local option is set, if not,
    // checks the global config
    ToastyService.prototype._checkConfigItem = function (config, options, property) {
        if (options[property] === false) {
            return false;
        }
        else if (!options[property]) {
            return config[property];
        }
        else {
            return true;
        }
    };
    // Add a new toast item
    ToastyService.prototype.add = function (options, type) {
        var toastyOptions;
        if (toasty_utils_1.isString(options) && options !== '' || toasty_utils_1.isNumber(options)) {
            toastyOptions = {
                title: options.toString()
            };
        }
        else {
            toastyOptions = options;
        }
        if (!toastyOptions || !toastyOptions.title && !toastyOptions.msg) {
            throw new Error('ng2-toasty: No toast title or message specified!');
        }
        type = type || 'default';
        // Set a unique counter for an id
        this.uniqueCounter++;
        // Set the local vs global config items
        var showClose = this._checkConfigItem(this.config, toastyOptions, 'showClose');
        // If we have a theme set, make sure it's a valid one
        var theme;
        if (toastyOptions.theme) {
            theme = ToastyService.THEMES.indexOf(toastyOptions.theme) > -1 ? toastyOptions.theme : this.config.theme;
        }
        else {
            theme = this.config.theme;
        }
        var toast = {
            id: this.uniqueCounter,
            title: toastyOptions.title,
            msg: toastyOptions.msg,
            showClose: showClose,
            type: 'toasty-type-' + type,
            theme: 'toasty-theme-' + theme,
            onAdd: toastyOptions.onAdd && toasty_utils_1.isFunction(toastyOptions.onAdd) ? toastyOptions.onAdd : null,
            onRemove: toastyOptions.onRemove && toasty_utils_1.isFunction(toastyOptions.onRemove) ? toastyOptions.onRemove : null
        };
        // If there's a timeout individually or globally, set the toast to timeout
        // Allows a caller to pass null/0 and override the default. Can also set the default to null/0 to turn off.
        toast.timeout = toastyOptions.hasOwnProperty('timeout') ? toastyOptions.timeout : this.config.timeout;
        // Push up a new toast item
        // this.toastsSubscriber.next(toast);
        this.toastsEmitter.next(toast);
        // If we have a onAdd function, call it here
        if (toastyOptions.onAdd && toasty_utils_1.isFunction(toastyOptions.onAdd)) {
            toastyOptions.onAdd.call(this, toast);
        }
    };
    // Allowed THEMES
    ToastyService.THEMES = ['default', 'material', 'bootstrap'];
    ToastyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ToastyConfig])
    ], ToastyService);
    return ToastyService;
}());
exports.ToastyService = ToastyService;
//# sourceMappingURL=toasty.service.js.map