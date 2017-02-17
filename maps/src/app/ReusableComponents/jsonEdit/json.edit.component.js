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
var lastItem_component_1 = require('./lastItem.component');
var alertService_1 = require("../../ReusableServices/alertService");
var appSettings_1 = require("../../Configuration/appSettings");
var JsonEdit = (function () {
    function JsonEdit(_alert) {
        //alert("In edit constructor");
        this._alert = _alert;
        this.isRoot = true;
        this.out = new core_1.EventEmitter();
        this.cancelChanges = new core_1.EventEmitter();
        this.hierarchyLvl = 1;
        this.visiblePlugin = true;
        this.showSave = true;
        this.isProcess = false;
        this.isOpen = true;
        this.inputType = "JSON";
        this.showTableView = true;
        this.tableViewBttn = "Show table view";
        this.viewList = [];
        this.editList = [];
        this.headerList = [];
    }
    JsonEdit.prototype.ngOnInit = function () {
        var self = this;
        if (this.isRoot) {
            try {
                if (!this.inputJson) {
                    this.inputJson = "{}";
                }
                this.inputJson = JSON.parse(this.inputJson);
                self.nodeTitle = JSON.parse(self.PredefinedJsonValues)['#Title#'];
                if (!(this.inputJson instanceof Array)) {
                    this.inputJson = [this.inputJson];
                    this.isProcess = true;
                    this.Items = this.inputJson;
                }
                else {
                    this.Items = [this.inputJson];
                    this.inputType = "Array";
                }
                this.buildMainArray(this.Items, 0);
            }
            catch (Error) {
                this.isOpen = false;
                this._alert.error(appSettings_1.AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
                return;
            }
            this.Items.forEach(function (x) {
                if (x.every(function (elem) { return elem.hasSimpleObjects; })) {
                    x.showAddBttn = true;
                }
                else {
                    x.showAddBttn = false;
                }
            });
            this.mainArray = this.inputJson;
        }
        else {
            self.Items = self.inputJson;
        }
        if (self.Items) {
            self.Items[0].expanded = true;
        }
    };
    JsonEdit.prototype.buildMainArray = function (theInput, herarchyLvl) {
        herarchyLvl++;
        for (var i in theInput) {
            var o = theInput[i];
            if (o instanceof Array) {
                this.buildMainArray(o, herarchyLvl);
                if (o.every(function (elem) { return elem.hasSimpleObjects; })) {
                    theInput[i].showAddBttn = true;
                }
                else {
                    theInput[i].showAddBttn = false;
                }
            }
            else {
                theInput[i] = this.buildArrayOfSimpleObjects(o);
                theInput[i].hasSimpleObjects = true;
            }
            theInput[i].currentHierarchyLvl = herarchyLvl;
            this.hierarchyLvl = (this.hierarchyLvl < herarchyLvl ? herarchyLvl : this.hierarchyLvl);
        }
    };
    JsonEdit.prototype.buildArrayOfSimpleObjects = function (theObject) {
        var arrToAdd = [];
        for (var key2 in theObject) {
            if (typeof theObject[key2] != 'function') {
                arrToAdd.push(new lastItem_component_1.simpleObject(key2, theObject[key2]));
            }
        }
        return arrToAdd;
    };
    JsonEdit.prototype.addNewNode = function (Node) {
        var objToAdd = [];
        var theLength = Node.length;
        var hasSimpleObjects = Node[theLength - 1].hasSimpleObjects;
        // we do not add complex nodes for now;
        if (!(hasSimpleObjects))
            return;
        var docPart = '1';
        var orderNbr = 0, startPosition = 0, length = 0;
        if (this.hierarchyLvl === 3) {
            try {
                if (this.PredefinedJsonValues) {
                    Node[theLength - 1].find(function (x) { if (x.label.toUpperCase() === 'DOCPART')
                        docPart = x.value; return x.label.toUpperCase() === 'DOCPART'; });
                    Node[theLength - 1].find(function (x) { if (x.label.toUpperCase() === 'ORDER')
                        orderNbr = x.value; return x.label.toUpperCase() === 'ORDER'; });
                    Node[theLength - 1].find(function (x) { if (x.label.toUpperCase() === 'STARTPOSITION')
                        startPosition = x.value; return x.label.toUpperCase() === 'STARTPOSITION'; });
                    Node[theLength - 1].find(function (x) { if (x.label.toUpperCase() === 'LENGTH')
                        length = x.value; return x.label.toUpperCase() === 'LENGTH'; });
                    this.jsonTemplate = JSON.parse(this.PredefinedJsonValues);
                    for (var key in this.jsonTemplate) {
                        var newSobj = void 0;
                        if (typeof (this.jsonTemplate[key]) === "string") {
                            newSobj = new lastItem_component_1.simpleObject(key, this.jsonTemplate[key]);
                        }
                        else {
                            if (this.jsonTemplate[key].hasOwnProperty('value')) {
                                newSobj = new lastItem_component_1.simpleObject(key, this.jsonTemplate[key].value);
                            }
                            else if (this.jsonTemplate[key].hasOwnProperty('values')) {
                                newSobj = new lastItem_component_1.simpleObject(key, this.jsonTemplate[key].values[0]);
                            }
                            else {
                                newSobj = new lastItem_component_1.simpleObject(key, '');
                            }
                        }
                        if (newSobj.label.toUpperCase() === 'DOCPART')
                            newSobj.value = docPart;
                        if (newSobj.label.toUpperCase() === 'ORDER')
                            newSobj.value = (Number(orderNbr) + 1).toString();
                        if (newSobj.label.toUpperCase() === 'STARTPOSITION')
                            newSobj.value = (Number(startPosition) + Number(length)).toString();
                        if (newSobj.label.toUpperCase() === 'LENGTH')
                            newSobj.value = length.toString();
                        objToAdd.push(newSobj);
                    }
                    // objToAdd.expanded = true;
                    Node.push(objToAdd);
                    Node[theLength].hasSimpleObjects = hasSimpleObjects;
                    Node[theLength].expanded = false;
                }
            }
            catch (Error) {
                this._alert.error("JSON template error:" + appSettings_1.AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
            }
            return;
        }
        Node[theLength - 1].forEach(function (x) {
            var newSobj = new lastItem_component_1.simpleObject(x.label, x.value);
            objToAdd.push(newSobj);
        });
        // objToAdd.expanded = true;
        Node.push(objToAdd);
        Node[theLength].hasSimpleObjects = hasSimpleObjects;
        Node[theLength].expanded = false;
    };
    JsonEdit.prototype.doSave = function () {
        try {
            //let arrayForSave = JSON.parse(JSON.stringify(this.mainArray));
            var arrayForSave = this.mainArray.slice();
            this.buildToSaveArray(arrayForSave);
            if (this.inputType != "Array") {
                this.out.emit({ value: arrayForSave[0] });
            }
            else {
                var stringOut = this.arrayToString(arrayForSave);
                // let stringOut =   JSON.stringify(arrayForSave) ;
                this.out.emit({ 'value': stringOut });
            }
            this._alert.addAlert(appSettings_1.AppNotificationsMSG.jsonEditPlugin.jsonUpdate);
            //  this.isOpen = false;
            this.visiblePlugin = false;
        }
        catch (Error) {
            this._alert.error("Edited JSON : " + appSettings_1.AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
            return;
        }
    };
    JsonEdit.prototype.arrayToString = function (inputArray) {
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
    JsonEdit.prototype.buildJsonFromArray = function (theArray) {
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
    JsonEdit.prototype.buildToSaveArray = function (theInput) {
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
    JsonEdit.prototype.getPlaceInArray = function (arrayName, thePath) {
        var result = arrayName;
        thePath.map(function (x) { return result = result + '[' + x + ']'; });
        return result;
    };
    JsonEdit.prototype.toggle = function (item) {
        item.expanded = !item.expanded;
    };
    JsonEdit.prototype.cancelClicked = function () {
        this.isOpen = false;
        this.cancelChanges.emit(true);
        this.visiblePlugin = false;
    };
    JsonEdit.prototype.createTableView = function () {
        var self = this;
        self.tableViewBttn = "Show table view";
        self.showTableView = !self.showTableView;
        if (self.showTableView) {
            self.tableViewBttn = "Hide table view";
            self.viewList = [];
            self.editList = [];
            try {
                self.buildEditList(self.mainArray, self.editList);
            }
            catch (Error) {
                self._alert.error("Edited JSON : " + appSettings_1.AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
                return;
            }
        }
    };
    JsonEdit.prototype.buildEditList = function (theInput, theOutput) {
        if (theOutput === void 0) { theOutput = []; }
        var headerArray = [];
        for (var i in theInput) {
            var child = theInput[i];
            if (child instanceof Array) {
                if (child[0] instanceof lastItem_component_1.simpleObject) {
                    var lineArray = [];
                    child.forEach(function (x) {
                        lineArray.push(x);
                        if (theOutput.length === 0)
                            headerArray.push(x.label);
                    });
                    theOutput.push(lineArray);
                }
                else {
                    this.buildEditList(child, theOutput);
                }
            }
        }
        if (this.headerList.length === 0)
            this.headerList = headerArray;
    };
    JsonEdit.prototype.jsonInputToMainArray = function (theInput, herarchyLvl) {
        var self = this;
        var result = [];
        herarchyLvl++;
        var _loop_1 = function() {
            Object.defineProperty(result, 'itemName', { value: prop, enumerable: false });
            Object.defineProperty(result, 'expanded', { value: false, enumerable: false });
            Object.defineProperty(result, 'hasSimpleObjects', { value: false, enumerable: false });
            if (!(theInput[prop] instanceof Array)) {
                result.push(self.jsonInputToMainArray(theInput[prop], 0));
            }
            else {
                var lcArray_1 = [];
                Object.defineProperty(lcArray_1, 'itemName', { value: 'LeafNodeName', enumerable: false });
                Object.defineProperty(lcArray_1, 'expanded', { value: false, enumerable: false });
                Object.defineProperty(lcArray_1, 'hasSimpleObjects', { value: false, enumerable: false });
                theInput[prop].forEach(function (x) {
                    var leafArray = self.buildArrayOfSimpleObjects(x);
                    Object.defineProperty(leafArray, 'itemName', { value: 'LeafNodeName', enumerable: false });
                    Object.defineProperty(leafArray, 'expanded', { value: false, enumerable: false });
                    Object.defineProperty(leafArray, 'hasSimpleObjects', { value: false, enumerable: true });
                    lcArray_1.push(leafArray);
                });
                result.push(lcArray_1);
            }
        };
        for (var prop in theInput) {
            _loop_1();
        }
        return result;
    };
    JsonEdit.prototype.buildViewList = function (theInput, theOutput) {
        if (theOutput === void 0) { theOutput = []; }
        var headerArray = [];
        for (var i in theInput) {
            var child = theInput[i];
            if (child instanceof Array) {
                if (child[0] instanceof lastItem_component_1.simpleObject) {
                    var lineArray = [];
                    child.forEach(function (x) {
                        lineArray.push(x.value);
                        if (theOutput.length === 0)
                            headerArray.push(x.label);
                    });
                    theOutput.push(lineArray);
                }
                else {
                    this.buildViewList(child, theOutput);
                }
            }
        }
        ;
        if (headerArray.length != 0)
            theOutput.unshift(headerArray);
    };
    JsonEdit.prototype.itemChanged = function (item) {
        if (item.oldValue !== item.value) {
            item.isChanged = true;
        }
        else {
            item.isChanged = false;
        }
    };
    JsonEdit.prototype.checkIt = function (event, item) {
        if (event.keyCode == 27 && item.oldValue !== item.value) {
            item.value = item.oldValue;
            item.isChanged = false;
        }
    };
    JsonEdit.prototype.removeItem = function (item) {
        var self = this;
        self.Items.splice(self.Items.indexOf(item), 1);
    };
    JsonEdit.prototype.removeEditListItem = function (item) {
        var self = this;
        self.editList.splice(self.editList.indexOf(item), 1);
        self.mainArray[0].splice(self.mainArray[0].indexOf(item), 1);
    };
    JsonEdit.prototype.nodeMove = function (data) {
        var self = this;
        var position = self.Items.indexOf(data.node);
        var direction = data.direction;
        if (direction === 'up' && self.Items[position - 1]) {
            self.Items[position - 1] = [self.Items[position], self.Items[position] = self.Items[position - 1]][0];
        }
        if (direction === 'down' && self.Items[position + 1]) {
            self.Items[position + 1] = [self.Items[position], self.Items[position] = self.Items[position + 1]][0];
        }
    };
    JsonEdit.prototype.rowOfEditListMove = function (item, direction) {
        var self = this;
        self.moveItemInArray(self.editList, item, direction);
        //  self.moveItemInArray(self.mainArray[0],item,direction);
    };
    JsonEdit.prototype.moveItemInArray = function (arr, item, direction) {
        var position = arr.indexOf(item);
        if (direction === 'up' && arr[position - 1]) {
            arr[position - 1] = [arr[position], arr[position] = arr[position - 1]][0];
        }
        if (direction === 'down' && arr[position + 1]) {
            arr[position + 1] = [arr[position], arr[position] = arr[position + 1]][0];
        }
    };
    __decorate([
        core_1.Input('parentStep'), 
        __metadata('design:type', Object)
    ], JsonEdit.prototype, "parentStep", void 0);
    __decorate([
        core_1.Input('inputJson'), 
        __metadata('design:type', Object)
    ], JsonEdit.prototype, "inputJson", void 0);
    __decorate([
        core_1.Input('isRoot'), 
        __metadata('design:type', Boolean)
    ], JsonEdit.prototype, "isRoot", void 0);
    __decorate([
        core_1.Input('PredefinedJsonValues'), 
        __metadata('design:type', Object)
    ], JsonEdit.prototype, "PredefinedJsonValues", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JsonEdit.prototype, "out", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JsonEdit.prototype, "cancelChanges", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JsonEdit.prototype, "hierarchyLvl", void 0);
    JsonEdit = __decorate([
        core_1.Component({
            selector: "json-edit",
            template: require('./jsonEdit.html'),
            styles: [require('./jsonEdit.scss')]
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService])
    ], JsonEdit);
    return JsonEdit;
}());
exports.JsonEdit = JsonEdit;
//# sourceMappingURL=json.edit.component.js.map