"use strict";
var core_1 = require('@angular/core');
var lastItem_component_1 = require('../../../../../ReusableComponents/jsonEdit/lastItem.component');
var alertService_1 = require("../../../../../ReusableServices/alertService");
var appSettings_1 = require("../../../../../Configuration/appSettings");
var TableEditConfig = (function () {
    function TableEditConfig(_alert) {
        var _this = this;
        this._alert = _alert;
        this.out = new core_1.EventEmitter();
        this.cancelChanges = new core_1.EventEmitter();
        this.headerList = [];
        this.isOpen = true;
        this.assignedSections = [];
        this.allSections = [];
        this.availableSections = [];
        this.referenceAsset = undefined;
        ///subscribe for sections sent to be deleted
        this.subscription = _alert.sendSectionForDelete$.subscribe(function (answer) {
            var section = _this.mainArray.find(function (x) {
                x.sectionName == answer;
            });
            _this.mainArray.splice(_this.mainArray.indexOf(section), 1);
            _this.doSave();
        });
    }
    TableEditConfig.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    TableEditConfig.prototype.ngOnInit = function () {
        var self = this;
        try {
            self.documentTitle = JSON.parse(self.PredefinedJsonValues)['#Title#'];
            self.mainArray = JSON.parse(this.inputArray);
            var assets = self.parentStep.StepAssets;
            self.referenceAsset = assets.find(function (x) {
                try {
                    if (JSON.parse(x.Template)['#Type#'].toUpperCase() === 'JSONLIKE' && JSON.parse(x.Template)['#Title#'].toUpperCase() === 'DOCUMENT SETTING') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                catch (Error) {
                    return false;
                }
            });
            // bellow line change mainArray to have simple objects inside
            self.buildMainArray(this.mainArray);
            self.getAllSections();
            // bellow line is creating section titles and header for sections
            self.createTableView();
        }
        catch (Error) {
            self.isOpen = false;
            this._alert.error(appSettings_1.AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
            return;
        }
    };
    TableEditConfig.prototype.buildMainArray = function (theInput) {
        var self = this;
        for (var i in theInput) {
            var o = theInput[i];
            if (o instanceof Array) {
                self.buildMainArray(o);
            }
            else {
                theInput[i] = self.buildArrayOfSimpleObjects(o);
                theInput[i].hasSimpleObjects = true;
            }
        }
    };
    TableEditConfig.prototype.buildArrayOfSimpleObjects = function (theObject) {
        var arrToAdd = [];
        for (var key2 in theObject) {
            if (typeof theObject[key2] != 'function') {
                arrToAdd.push(new lastItem_component_1.simpleObject(key2, theObject[key2]));
            }
        }
        return arrToAdd;
    };
    TableEditConfig.prototype.createTableView = function () {
        var self = this;
        //resolve sections name
        self.mainArray.forEach(function (x) {
            var simplObj = x[0][0];
            Object.defineProperty(x, 'sectionName', {
                value: simplObj.label + ' - ' + simplObj.value,
                enumerable: false
            });
            Object.defineProperty(x, 'DocumentFormat', {
                value: self.sectionDocFormat(x),
                enumerable: false
            });
            Object.defineProperty(x, 'expanded', { value: false, enumerable: false, writable: true });
            self.assignedSections.push(x.sectionName);
            // resolve input types for each section
            x.forEach(function (rowArray) {
                self.resolveInputTypes(rowArray);
            });
        });
        self.availableSections = self.allSections.filter(function (x) { return self.assignedSections.indexOf(x) == -1; });
        try {
            var headerArray_1 = [];
            self.mainArray[0][0].forEach(function (x) {
                headerArray_1.push(x.label);
            });
            this.headerList = headerArray_1;
        }
        catch (Error) {
            self._alert.error("Error when create header list array : " + Error.message);
            return;
        }
    };
    TableEditConfig.prototype.doSave = function () {
        try {
            //let arrayForSave = JSON.parse(JSON.stringify(this.mainArray));
            var arrayForSave = this.mainArray.slice();
            this.buildToSaveArray(arrayForSave);
            var stringOut = this.arrayToString(arrayForSave);
            this.out.emit({ 'value': stringOut });
            this._alert.addAlert(appSettings_1.AppNotificationsMSG.jsonEditPlugin.jsonUpdate);
            this.isOpen = false;
        }
        catch (Error) {
            this._alert.error("Edited JSON : " + appSettings_1.AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
            return;
        }
    };
    TableEditConfig.prototype.arrayToString = function (inputArray) {
        var result = ",";
        for (var i = 0, j = inputArray.length; i < j; i++) {
            if (inputArray[i] instanceof Array) {
                result += this.arrayToString(inputArray[i]) + ',';
            }
            else {
                result += inputArray[i] + ',';
            }
        }
        result = "[" + result.slice(1, result.length - 1) + "]";
        return result;
    };
    TableEditConfig.prototype.buildJsonFromArray = function (theArray) {
        var result = '';
        theArray.map(function (x) {
            var theValue = JSON.stringify(x.value);
            if (x.objType == 'checkbox') {
                theValue = x.value ? JSON.stringify("1") : JSON.stringify("0");
            }
            result += ',"' + x.label + '":' + theValue;
        });
        // return JSON.parse( '{' + result.slice(1) + '}');
        return '{' + result.slice(1) + '}';
    };
    ;
    TableEditConfig.prototype.buildToSaveArray = function (theInput) {
        for (var i in theInput) {
            var o = theInput[i];
            if (o instanceof Array) {
                if (o[0] instanceof lastItem_component_1.simpleObject) {
                    theInput[i] = this.buildJsonFromArray(o);
                }
                else {
                    this.buildToSaveArray(o);
                }
            }
        }
    };
    TableEditConfig.prototype.toggle = function (section) {
        section.expanded = !section.expanded;
    };
    TableEditConfig.prototype.removeSection = function (section) {
        var self = this;
        self._alert.addAlertAndRequestAnswer("Do you want to delete the section ?", null, 'Delete:');
        var subscription = self._alert.requestConfirmationAnswer$.subscribe(function (item) {
            self._alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }
            self.availableSections.push(section.sectionName);
            self.assignedSections.splice(self.assignedSections.indexOf(section.sectionName, 1));
            self.mainArray.splice(self.mainArray.indexOf(section), 1);
        });
    };
    TableEditConfig.prototype.cancelClicked = function () {
        this.isOpen = false;
        this.cancelChanges.emit(true);
    };
    TableEditConfig.prototype.itemChanged = function (item, section) {
        if (item.oldValue !== item.value) {
            item.isChanged = true;
            if (item.label.toUpperCase() === 'LENGTH') {
                this.recalculateStartPosition(section);
            }
        }
        else {
            item.isChanged = false;
        }
    };
    TableEditConfig.prototype.checkIt = function (event, item) {
        if (event.keyCode == 27 && item.oldValue !== item.value) {
            item.value = item.oldValue;
            item.isChanged = false;
        }
    };
    TableEditConfig.prototype.removeRowItem = function (row, section) {
        var self = this;
        self._alert.addAlertAndRequestAnswer("Do you want to delete the row ?", null, 'Delete:');
        var subscription = self._alert.requestConfirmationAnswer$.subscribe(function (item) {
            self._alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }
            section.splice(section.indexOf(row), 1);
            if (section.length == 0) {
                self.availableSections.push(section.sectionName);
                self.assignedSections.splice(self.assignedSections.indexOf(section.sectionName, 1));
                self.mainArray.splice(self.mainArray.indexOf(section), 1);
            }
            else {
                self.reindexColumn(section, 'ORDER');
                self.recalculateStartPosition(section);
            }
        });
    };
    TableEditConfig.prototype.moveRow = function (row, section, direction) {
        var self = this;
        self.moveItemInArray(section, row, direction);
        self.reindexColumn(section, 'ORDER');
        self.recalculateStartPosition(section);
    };
    TableEditConfig.prototype.addNewRow = function (row, section) {
        var self = this;
        var docFormat = section.DocumentFormat;
        if (docFormat === 'UNKNOWN') {
            this._alert.error('Unknown DocFormat, you are not able to add new records!!!');
            return;
        }
        var position = section.indexOf(row);
        var elemCopy = row.map(cloneSimpleObj);
        elemCopy.forEach(function (x) {
            x.isChanged = true;
        });
        elemCopy.hasSimpleObjects = true;
        section.splice(position + 1, 0, elemCopy);
        self.reindexColumn(section, 'ORDER');
        self.recalculateStartPosition(section);
        this._alert.addAlert("New row has been inserted!");
    };
    TableEditConfig.prototype.addNewSection = function (sectionName) {
        if (sectionName.indexOf('-') == -1) {
            this._alert.addAlert("Please select a section from the list!");
            return;
        }
        var self = this;
        var sectionNbr = parseInt(sectionName.slice(sectionName.indexOf('-') + 1));
        var newSection = [];
        // let  elemCopy = JSON.parse(JSON.stringify(row));
        var elemCopy = self.mainArray[0][0].map(cloneSimpleObj);
        elemCopy.forEach(function (x) {
            x.isChanged = false;
            if (x.label.toUpperCase() === 'DOCPART') {
                x.value = sectionNbr;
            }
            else {
                x.value = '';
            }
        });
        elemCopy.hasSimpleObjects = true;
        newSection.push(elemCopy);
        Object.defineProperty(newSection, 'sectionName', {
            value: sectionName,
            enumerable: false
        });
        self.mainArray.push(newSection);
        self.availableSections.splice(self.availableSections.indexOf(sectionName), 1);
        this._alert.addAlert("New section has been created!");
    };
    TableEditConfig.prototype.reindexColumn = function (section, column) {
        section.forEach(function (lineArray) {
            var index = section.indexOf(lineArray);
            var orderObj = lineArray.find(function (x) {
                return x.label.toUpperCase() === column.toUpperCase();
            });
            if (orderObj) {
                orderObj.value = index;
            }
        });
    };
    TableEditConfig.prototype.recalculateStartPosition = function (section) {
        if (section.DocumentFormat.toUpperCase() != 'FIXEDLENGTH') {
            return;
        }
        var valForNext = 0;
        for (var i = 0, j = section.length; i < j; i++) {
            var lineArray = section[i];
            var lengthObj = lineArray.find(function (x) {
                return x.label.toUpperCase() === 'LENGTH';
            });
            var startPositionObj = lineArray.find(function (x) {
                return x.label.toUpperCase() === 'STARTPOSITION';
            });
            if (lengthObj && startPositionObj) {
                startPositionObj.value = valForNext;
                valForNext = parseInt(lengthObj.value) + parseInt(startPositionObj.value);
            }
        }
    };
    TableEditConfig.prototype.sectionDocFormat = function (section) {
        var self = this;
        if (self.referenceAsset) {
            var settingSections = JSON.parse(self.referenceAsset.ConfigurationValue);
            var settingsForSection = settingSections.find(function (x) {
                for (var key in x) {
                    var o = x[key];
                    if (key + ' - ' + o === section.sectionName) {
                        return true;
                    }
                }
                return false;
            });
            if (settingsForSection) {
                return settingsForSection['DocFormat'];
            }
        }
        return "UNKNOWN";
    };
    TableEditConfig.prototype.getAllSections = function () {
        var self = this;
        self.allSections = [];
        if (self.referenceAsset) {
            var settingSections = JSON.parse(self.referenceAsset.ConfigurationValue);
            settingSections.forEach(function (x) {
                for (var key in x) {
                    var o = x[key];
                    if (key.toUpperCase() === 'DOCPART') {
                        self.allSections.push(key + ' - ' + o);
                    }
                }
            });
        }
    };
    TableEditConfig.prototype.moveItemInArray = function (arr, item, direction) {
        var position = arr.indexOf(item);
        if (direction === 'up' && arr[position - 1]) {
            arr[position - 1] = [arr[position], arr[position] = arr[position - 1]][0];
        }
        if (direction === 'down' && arr[position + 1]) {
            arr[position + 1] = [arr[position], arr[position] = arr[position + 1]][0];
        }
    };
    TableEditConfig.prototype.resolveInputTypes = function (Items) {
        var preDefinedJsonKeys = [];
        try {
            var predefValues_1 = JSON.parse(this.PredefinedJsonValues);
            if (Object.keys(predefValues_1).length === 0 && predefValues_1.constructor === Object)
                return;
            for (var key in predefValues_1) {
                preDefinedJsonKeys.push(key);
            }
            Items.forEach(function (x) {
                if (predefValues_1.hasOwnProperty(x.label)) {
                    var availableOptions = predefValues_1[x.label];
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
            this._alert.error("JSON template error when in table edit" + Error.message);
            return;
        }
    };
    __decorate([
        core_1.Input('parentStep'), 
        __metadata('design:type', Object)
    ], TableEditConfig.prototype, "parentStep", void 0);
    __decorate([
        core_1.Input('inputArray'), 
        __metadata('design:type', Object)
    ], TableEditConfig.prototype, "inputArray", void 0);
    __decorate([
        core_1.Input('PredefinedJsonValues'), 
        __metadata('design:type', Object)
    ], TableEditConfig.prototype, "PredefinedJsonValues", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TableEditConfig.prototype, "out", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TableEditConfig.prototype, "cancelChanges", void 0);
    TableEditConfig = __decorate([
        core_1.Component({
            selector: "table-edit-config",
            template: require('./tableEdit.html'),
            styles: [require('../../../../../ReusableComponents/jsonEdit/jsonEdit.scss')]
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService])
    ], TableEditConfig);
    return TableEditConfig;
}());
exports.TableEditConfig = TableEditConfig;
function cloneSimpleObj(x) {
    var theClone;
    theClone = new lastItem_component_1.simpleObject(x.label, x.value);
    theClone.oldValue = x.value;
    theClone.isChanged = true;
    theClone.objType = x.objType;
    theClone.listValues = x.listValues;
    return theClone;
}
//# sourceMappingURL=tableEdit.js.map