"use strict";
var core_1 = require('@angular/core');
var alertService_1 = require("../../ReusableServices/alertService");
var appSettings_1 = require("../../Configuration/appSettings");
var LastItem = (function () {
    function LastItem(_alert) {
        this._alert = _alert;
        this.PredefinedJsonValues = null;
        this.isProcess = false;
        this.showEdit = false;
        this.hierarchyLvl = 1;
        this.removeThis = new core_1.EventEmitter();
        this.nodeMove = new core_1.EventEmitter();
        this.adding = false;
        this.title = appSettings_1.AppNotificationsMSG.jsonEditPlugin.nodeColumnSettingsTitle;
        this.formIsClean = true;
        this.keyValueTypeObj = "textbox";
        this.keyValueTypeOptions = [];
        this.predefValues = {};
        this.newKeyValue = null;
        this.fromPredefined = false;
        this.preDefinedJsonKeys = [];
        this.hasValidTemplate = false;
        this.specials = [
            // order matters for these
            "-",
            "[",
            "]",
            "/", "{", "}", "(", ")", "*", "+", "?", ".", "^",
            "$", "|", "!", "~", "&", "`", ";", '"', "'", ",", "#"
        ];
        this.regex = RegExp('[' + this.specials.join('\\') + ']', 'g');
    }
    LastItem.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        if (!this.PredefinedJsonValues)
            return;
        // get title from Template :
        try {
            self.title = JSON.parse(self.PredefinedJsonValues)['#Title#'];
            //resolve node title
            if (this.hierarchyLvl === 2) {
                try {
                    var arrayForNames_1 = JSON.parse(self.PredefinedJsonValues)['#ArrayForNames#'];
                    if (arrayForNames_1 instanceof Array) {
                        switch (arrayForNames_1.length) {
                            case 1:
                                self.Items.find(function (y) {
                                    if (y.label.toUpperCase() === arrayForNames_1[0].toUpperCase()) {
                                        self.title = y.label + ' ' + y.value;
                                    }
                                    ;
                                    return y.label.toUpperCase() === arrayForNames_1[0].toUpperCase();
                                }, self);
                                break;
                            case 3:
                                self.Items.find(function (y) {
                                    if (y.label.toUpperCase() === arrayForNames_1[0].toUpperCase()) {
                                        self.title = y.value;
                                    }
                                    ;
                                    return y.label.toUpperCase() === arrayForNames_1[0].toUpperCase();
                                }, self);
                                self.Items.find(function (y) {
                                    if (y.label.toUpperCase() === arrayForNames_1[1].toUpperCase()) {
                                        self.title = self.title + arrayForNames_1[2] + y.value;
                                    }
                                    ;
                                    return y.label.toUpperCase() === arrayForNames_1[1].toUpperCase();
                                }, self);
                                break;
                        }
                    }
                }
                catch (Error) {
                    console.log("Not document part type identified");
                }
            }
        }
        catch (Error) {
            console.log("Unable to get title from Template: " + Error.message);
        }
        try {
            this.predefValues = JSON.parse(this.PredefinedJsonValues);
            if (Object.keys(this.predefValues).length === 0 && this.predefValues.constructor === Object)
                return;
            this.fromPredefined = true;
            this.hasValidTemplate = true;
            for (var key in this.predefValues) {
                this.preDefinedJsonKeys.push(key);
            }
            this.Items.forEach(function (x) {
                if (_this.predefValues.hasOwnProperty(x.label)) {
                    var availableOptions = _this.predefValues[x.label];
                    if (availableOptions.hasOwnProperty('values')) {
                        x.objType = "dropdown";
                        x.listValues = availableOptions.values;
                    }
                    if (availableOptions.hasOwnProperty('type') && availableOptions.type == 'boolean') {
                        x.objType = "checkbox";
                        if (x.value == '0') {
                            x.value = false;
                        }
                    }
                    if (availableOptions.hasOwnProperty('readOnly')) {
                        if (availableOptions.readOnly)
                            x.readOnly = true;
                    }
                }
            });
        }
        catch (Error) {
            this.fromPredefined = false;
            this._alert.error("JSON template error:" + appSettings_1.AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
            return;
        }
    };
    LastItem.prototype.usePredefinedKeys = function () {
        this.fromPredefined = !this.fromPredefined;
        this.newKey = null;
        this.newKeyValue = null;
        this.keyValueTypeOptions = [];
        this.keyValueTypeObj = "textbox";
    };
    LastItem.prototype.saveNewProp = function (key, keyValue) {
        if (key && keyValue) {
            if (this.Items.find(function (x) { return x.label.toUpperCase() === key.toUpperCase(); })) {
                this._alert.error(appSettings_1.AppNotificationsMSG.jsonEditPlugin.propertyExists + key);
                return;
            }
            var newSimpleObj = new simpleObject(key, keyValue);
            if (this.predefValues.hasOwnProperty(key)) {
                var availableOptions = this.predefValues[key];
                if (availableOptions.hasOwnProperty('values')) {
                    newSimpleObj.objType = "dropdown";
                    newSimpleObj.listValues = this.keyValueTypeOptions;
                }
            }
            this.Items.push(newSimpleObj);
        }
        else {
            this._alert.error(appSettings_1.AppNotificationsMSG.jsonEditPlugin.keyValueRequired);
            return;
        }
        this.newKey = null;
        this.adding = false;
        this.keyValueTypeOptions = [];
        this.keyValueTypeObj = "textbox";
        this.newKeyValue = null;
    };
    LastItem.prototype.resetAll = function () {
        this.Items.forEach(function (x) {
            if (x.oldValue != x.value) {
                x.value = x.oldValue;
                x.isChanged = false;
            }
        });
        this.formIsClean = true;
    };
    LastItem.prototype.removeItem = function (item) {
        var _this = this;
        this._alert.addAlertAndRequestAnswer(appSettings_1.AppNotificationsMSG.deletionQuestionMsg);
        var subscription = this._alert.requestConfirmationAnswer$.subscribe(function (answer) {
            _this._alert.askConfirmation = false;
            subscription.unsubscribe();
            if (answer != "OK")
                return;
            _this.Items.splice(_this.Items.indexOf(item), 1);
        });
    };
    LastItem.prototype.itemChanged = function (item) {
        if (item.oldValue !== item.value) {
            item.isChanged = true;
            this.formIsClean = false;
        }
        else {
            item.isChanged = false;
        }
        if (this.Items.findIndex(function (x) { return x.isChanged; }) == -1)
            this.formIsClean = true;
    };
    LastItem.prototype.checkIt = function (event, item) {
        // comment cleaning input for now as the rules are not defined
        //this.cleanIt(item);
        if (event.keyCode == 27 && item.oldValue !== item.value) {
            item.value = item.oldValue;
            item.isChanged = false;
        }
        if (this.Items.findIndex(function (x) { return x.isChanged; }) === -1)
            this.formIsClean = true;
    };
    LastItem.prototype.showOptionsForKeyValue = function (input) {
        if (!input)
            return;
        this.newKeyValue = null;
        this.keyValueTypeObj = "textbox";
        this.keyValueTypeOptions = [];
        if (this.predefValues.hasOwnProperty(input)) {
            var availableOptions = this.predefValues[input];
            if (availableOptions.hasOwnProperty('values')) {
                this.keyValueTypeObj = "dropdown";
                this.keyValueTypeOptions = availableOptions.values;
            }
            else {
                if (typeof (availableOptions) === "string") {
                    this.newKeyValue = availableOptions;
                }
                else {
                    if (availableOptions.hasOwnProperty('value'))
                        this.newKeyValue = availableOptions.value;
                }
            }
        }
        else {
            for (var lvs_prop in this.predefValues) {
                if (input.toLowerCase() === lvs_prop.toLowerCase()) {
                    var availableOptions = this.predefValues[lvs_prop];
                    if (availableOptions.hasOwnProperty('values')) {
                        this.keyValueTypeObj = "dropdown";
                        this.keyValueTypeOptions = availableOptions.values;
                    }
                    else {
                        this.newKeyValue = this.predefValues[lvs_prop];
                    }
                    break;
                }
            }
        }
    };
    LastItem.prototype.cleanIt = function (input) {
        input.value = input.value.replace(this.regex, '');
    };
    LastItem.prototype.removeMe = function () {
        var _this = this;
        var self = this;
        self._alert.addAlertAndRequestAnswer("Dou you want to remove " + self.title + " ?");
        var subscription = self._alert.requestConfirmationAnswer$.subscribe(function (item) {
            self._alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }
            self.removeThis.emit(_this.Items);
        });
    };
    LastItem.prototype.moveMe = function (direction) {
        var self = this;
        var eventData = { 'node': self.Items, 'direction': direction };
        self.nodeMove.emit(eventData);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LastItem.prototype, "Items", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LastItem.prototype, "PredefinedJsonValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LastItem.prototype, "isProcess", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LastItem.prototype, "showEdit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], LastItem.prototype, "hierarchyLvl", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LastItem.prototype, "removeThis", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LastItem.prototype, "nodeMove", void 0);
    LastItem = __decorate([
        core_1.Component({
            selector: "last-item",
            template: require('./lastItem.html'),
            styles: [require('./jsonEdit.scss')]
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService])
    ], LastItem);
    return LastItem;
}());
exports.LastItem = LastItem;
var simpleObject = (function () {
    function simpleObject(label, value) {
        this.label = label;
        this.value = value;
        this.isChanged = false;
        this.objType = "textbox";
        this.oldValue = value;
        this.isChanged = false;
        this.objType = "textbox";
        this.listValues = [];
    }
    return simpleObject;
}());
exports.simpleObject = simpleObject;
//# sourceMappingURL=lastItem.component.js.map