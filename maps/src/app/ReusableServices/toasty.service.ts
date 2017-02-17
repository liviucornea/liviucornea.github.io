// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty

import { Injectable, EventEmitter } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import {isString, isNumber, isFunction} from "../ReusableComponents/standardToasty/toasty.utils";

/**
 * Options to configure specific Toast
 */
export interface ToastOptions {
    title: string;
    msg?: string;
    showClose?: boolean;
    theme?: string;
    timeout?: number;
    position?:any;
    onAdd?: Function;
    onRemove?: Function;
}

/**
 * Structrure of Toast
 */
export interface ToastData {
    id: number;
    title: string;
    msg: string;
    showClose: boolean;
    type: string;
    theme: string;
    timeout: number;
    onAdd: Function;
    onRemove: Function;
    onClick: Function;
}

/**
 * Default configuration foa all toats and toasty container
 */
@Injectable()
export class ToastyConfig {

    // Maximum number of toasties to show at once
    limit: number = 10;

    // Whether to show the 'X' icon to close the toast
    showClose: boolean = true;

    // The window position where the toast pops up. Possible values
    // bottom-right, bottom-left, top-right, top-left, top-center, bottom-center, center-center
    position: string = 'bottom-right';

    // How long (in miliseconds) the toasty shows before it's removed. Set to null/0 to turn off.
    timeout: number = 5000;

    // What theme to use. Possible values:
    // default, material or bootstrap
    theme: string = 'default';
}


/**
 * Toasty service helps create different kinds of Toasts
 */
@Injectable()
export class ToastyService {
    // Allowed THEMES
    static THEMES: Array<string> = ['default', 'material', 'bootstrap'];
    // Init the counter
    uniqueCounter: number = 0;
    // ToastData event emitter
    private toastsEmitter: EventEmitter<ToastData> = new EventEmitter<ToastData>();
    // Clear event emitter
    private clearEmitter: EventEmitter<number> = new EventEmitter<number>();

    constructor(private config: ToastyConfig) {}

    getToasts(): Observable<ToastData> {
        return this.toastsEmitter.asObservable();
    }

    getClear(): Observable<number> {
        return this.clearEmitter.asObservable();
    }

    /**
     * Create Toast of a default type
     */
    default(options: ToastOptions|string|number): void {
        this.add(options, 'default');
    }

    /**
     * Create Toast of info type
     * @param  {object} options Individual toasty config overrides
     */
    info(options: ToastOptions|string|number): void {
        this.add(options, 'info');
    }

    /**
     * Create Toast of success type
     * @param  {object} options Individual toasty config overrides
     */
    success(options: ToastOptions|string|number): void {
        this.add(options, 'success');
    }

    /**
     * Create Toast of wait type
     * @param  {object} options Individual toasty config overrides
     */
    wait(options: ToastOptions|string|number): void {
        this.add(options, 'wait');
    }

    /**
     * Create Toast of error type
     * @param  {object} options Individual toasty config overrides
     */
    error(options: ToastOptions|string|number): void {
        this.add(options, 'error');
    }

    /**
     * Create Toast of warning type
     * @param  {object} options Individual toasty config overrides
     */
    warning(options: ToastOptions|string|number): void {
        this.add(options, 'warning');
    }


    // Add a new toast item
    private add(options: ToastOptions|string|number, type: string) {
        let toastyOptions: ToastOptions;

        if (isString(options) && options !== '' || isNumber(options)) {
            toastyOptions = <ToastOptions>{
                title: options.toString()
            };
        } else {
            toastyOptions = <ToastOptions>options;
        }

        if (!toastyOptions || !toastyOptions.title && !toastyOptions.msg) {
            throw new Error('ng2-toasty: No toast title or message specified!');
        }

        type = type || 'default';

        // Set a unique counter for an id
        this.uniqueCounter++;

        // Set the local vs global config items
        let showClose = this._checkConfigItem(this.config, toastyOptions, 'showClose');

        // If we have a theme set, make sure it's a valid one
        let theme: string;
        if (toastyOptions.theme) {
            theme = ToastyService.THEMES.indexOf(toastyOptions.theme) > -1 ? toastyOptions.theme : this.config.theme;
        } else {
            theme = this.config.theme;
        }

        let toast: ToastData = <ToastData>{
            id       : this.uniqueCounter,
            title    : toastyOptions.title,
            msg      : toastyOptions.msg,
            showClose: showClose,
            type     : 'toasty-type-' + type,
            theme    : 'toasty-theme-' + theme,
            onAdd    : toastyOptions.onAdd && isFunction(toastyOptions.onAdd) ? toastyOptions.onAdd : null,
            onRemove : toastyOptions.onRemove && isFunction(toastyOptions.onRemove) ? toastyOptions.onRemove : null
        };

        // If there's a timeout individually or globally, set the toast to timeout
        // Allows a caller to pass null/0 and override the default. Can also set the default to null/0 to turn off.
        toast.timeout = toastyOptions.hasOwnProperty('timeout') ? toastyOptions.timeout : this.config.timeout;

        // Push up a new toast item
        // this.toastsSubscriber.next(toast);
        this.toastsEmitter.next(toast);
        // If we have a onAdd function, call it here
        if (toastyOptions.onAdd && isFunction(toastyOptions.onAdd)) {
            toastyOptions.onAdd.call(this, toast);
        }
    }

    // Clear all toasts
    clearAll() {
        this.clearEmitter.next(null);
    }

    // Clear the specific one
    clear(id: number) {
        this.clearEmitter.next(id);
    }

    // Checks whether the local option is set, if not,
    // checks the global config
    private _checkConfigItem(config: any, options: any, property: string) {
        if (options[property] === false) {
            return false;
        } else if (!options[property]) {
            return config[property];
        } else {
            return true;
        }
    }

    public themes = [{
        name: 'Default Theme',
        code: 'default'
    }, {
        name: 'Material Design',
        code: 'material'
    }, {
        name: 'Bootstrap 3',
        code: 'bootstrap'
    }];

   public types = [{
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

   public positions = [{
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
}

