"use strict";
/**
 * HashMap - HashMap Class for JavaScript
 * @author Ariel Flesler <aflesler@gmail.com>
 * @version 1.2.0
 * Homepage: https://github.com/flesler/hashmap
 */
var HashMap = (function () {
    function HashMap() {
        this.clear();
        this._data = new Array();
        this.uid = 0;
    }
    HashMap.prototype.get = function (key) {
        var data = this._data[this.hash(key)];
        return data && data[1];
    };
    HashMap.prototype.set = function (key, value) {
        // Store original key as well (for iteration)
        this._data[this.hash(key)] = [key, value];
    };
    HashMap.prototype.has = function (key) {
        return this.hash(key) in this._data;
    };
    HashMap.prototype.search = function (value) {
        for (var key in this._data) {
            if (this._data[key][1] === value) {
                return this._data[key][0];
            }
        }
        return null;
    };
    HashMap.prototype.remove = function (key) {
        delete this._data[this.hash(key)];
    };
    HashMap.prototype.type = function (key) {
        var str = Object.prototype.toString.call(key);
        var type = str.slice(8, -1).toLowerCase();
        // Some browsers yield DOMWindow for null and undefined, works fine on Node
        if (type === 'domwindow' && !key) {
            return key + '';
        }
        return type;
    };
    HashMap.prototype.keys = function () {
        var keys = new Array();
        this.forEach(function (value, key) {
            keys.push(key);
        });
        return keys;
    };
    HashMap.prototype.values = function () {
        var values = [];
        this.forEach(function (value) {
            values.push(value);
        });
        return values;
    };
    HashMap.prototype.count = function () {
        return this.keys().length;
    };
    HashMap.prototype.clear = function () {
        // TODO: Would Object.create(null) make any difference
        this._data = new Array();
    };
    HashMap.prototype.hash = function (key) {
        switch (this.type(key)) {
            case 'undefined':
            case 'null':
            case 'boolean':
            case 'number':
            case 'regexp':
                return key + '';
            case 'date':
                return ':' + key.getTime();
            case 'string':
                return '"' + key;
            case 'array':
                var hashes = [];
                for (var i = 0; i < key.length; i++)
                    hashes[i] = this.hash(key[i]);
                return '[' + hashes.join('|');
            case 'object':
            default:
                // TODO: Don't use expandos when Object.defineProperty is not available?
                if (!key._hmuid_) {
                    key._hmuid_ = ++this.uid;
                    this.hide(key, '_hmuid_');
                }
                return '{' + key._hmuid_;
        }
    };
    HashMap.prototype.forEach = function (func) {
        for (var key in this._data) {
            var data = this._data[key];
            func.call(this, data[1], data[0]);
        }
    };
    HashMap.prototype.hide = function (obj, prop) {
        // Make non iterable if supported
        if (Object.defineProperty) {
            Object.defineProperty(obj, prop, { enumerable: false });
        }
    };
    ;
    return HashMap;
}());
exports.HashMap = HashMap;
//# sourceMappingURL=hashMap.js.map