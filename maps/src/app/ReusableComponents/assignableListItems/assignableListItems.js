"use strict";
var core_1 = require('@angular/core');
var _ = require('lodash');
//usage
// <assignable-list [inputList]="allItems" [assignedList]="assignedItems" [inputTitle]="'Left Title'" [assignedTitle]="'Assigned Title'" (listOut)="getAssignedList($event)"></assignable-list>
var AssignableListItems = (function () {
    function AssignableListItems() {
        this.inputList = [];
        this.assignedList = [];
        this.listOut = new core_1.EventEmitter();
        this.isPageLoaded = false;
        this.formattedInputList = [];
        this.formattedAssignedList = [];
        this.customButtonsList = [];
    }
    AssignableListItems.prototype.ngOnInit = function () {
        if (this.inputSettings && this.inputSettings.ListItemsConfiguration) {
            this.configuration = this.inputSettings.ListItemsConfiguration;
            this.assignedTitle = this.configuration.assignedListTitle;
            this.inputTitle = this.configuration.inputListTitle;
        }
        if (this.inputSettings && this.inputSettings["CustomButtons"]) {
            this.customButtonsList = this.inputSettings["CustomButtons"];
        }
        this.formattedInputList = this.getFormattedListItems(this.inputList, this.configuration.inputListDataFields["dbColumnName"], this.configuration.inputListDataFields["displayColumnName"]);
        this.formattedAssignedList = this.getFormattedListItems(this.assignedList, this.configuration.assignedListDataFields["dbColumnName"], this.configuration.assignedListDataFields["displayColumnName"]);
        this.isPageLoaded = true;
    };
    AssignableListItems.prototype.ngOnChanges = function (changes) {
        if (this.isPageLoaded) {
            if (changes['inputList']) {
                var currentValue = changes['inputList'].currentValue;
                var oldValue = changes['inputList'].previousValue;
                if (currentValue != oldValue) {
                    this.formattedInputList = this.getFormattedListItems(currentValue, this.configuration.inputListDataFields["dbColumnName"], this.configuration.inputListDataFields["displayColumnName"]);
                }
            }
            if (changes['assignedList']) {
                var currentValue = changes['assignedList'].currentValue;
                var oldValue = changes['assignedList'].previousValue;
                if (currentValue != oldValue) {
                    this.formattedAssignedList = this.getFormattedListItems(currentValue, this.configuration.assignedListDataFields["dbColumnName"], this.configuration.assignedListDataFields["displayColumnName"]);
                }
            }
        }
    };
    AssignableListItems.prototype.getFormattedListItems = function (listItems, valueColumn, descriptionColumn) {
        var formattedList = [];
        if (!valueColumn) {
            valueColumn = 'Value';
        }
        if (!descriptionColumn) {
            descriptionColumn = 'Description';
        }
        if (listItems && listItems.length) {
            listItems.forEach(function (x) {
                var formattedItem = new ListItem();
                formattedItem.Value = x[valueColumn];
                formattedItem.Description = x[descriptionColumn];
                formattedList.push(formattedItem);
            });
        }
        return formattedList;
    };
    AssignableListItems.prototype.assignListOut = function (customButton) {
        this.listOut.emit({
            value: this.formattedAssignedList,
            controlName: customButton.name,
            inputList: this.formattedInputList
        });
    };
    AssignableListItems.prototype.switchSelection = function (selection, sourceList, destinationList) {
        var _this = this;
        if (selection.selectedOptions.length === 0) {
            return;
        }
        else {
            var selectedOptions = Array.from(selection.selectedOptions);
            selectedOptions.forEach(function (option) {
                var item = new ListItem();
                item.Value = option['value'];
                item.Description = option['text'];
                _this.changeItemList(item, sourceList, destinationList);
            });
        }
    };
    AssignableListItems.prototype.changeItemList = function (item, sourceList, destinationList) {
        _.remove(sourceList, function (x) { return x.Value == item.Value && x.Description === item.Description; });
        if (destinationList && destinationList.length > 0 && destinationList.find(function (x) { return x.Value == item.Value && x.Description === item.Description; })) {
            return;
        }
        destinationList.push(item);
    };
    AssignableListItems.prototype.moveAllToInput = function () {
        this.formattedInputList = _.uniqWith(_.union(this.formattedInputList, this.formattedAssignedList), function (a, b) {
            return a.Value == b.Value && a.Description === b.Description;
        });
        this.formattedAssignedList = [];
    };
    AssignableListItems.prototype.moveAllToAssigned = function () {
        this.formattedAssignedList = _.uniqWith(_.union(this.formattedInputList, this.formattedAssignedList), function (a, b) {
            return a.Value == b.Value && a.Description === b.Description;
        });
        this.formattedInputList = [];
    };
    __decorate([
        core_1.Input('inputTitle'), 
        __metadata('design:type', String)
    ], AssignableListItems.prototype, "inputTitle", void 0);
    __decorate([
        core_1.Input('assignedTitle'), 
        __metadata('design:type', String)
    ], AssignableListItems.prototype, "assignedTitle", void 0);
    __decorate([
        core_1.Input('inputList'), 
        __metadata('design:type', Array)
    ], AssignableListItems.prototype, "inputList", void 0);
    __decorate([
        core_1.Input('assignedList'), 
        __metadata('design:type', Array)
    ], AssignableListItems.prototype, "assignedList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignableListItems.prototype, "listOut", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssignableListItems.prototype, "inputSettings", void 0);
    AssignableListItems = __decorate([
        core_1.Component({
            selector: "assignable-list",
            template: require('./assignableListItems.html'),
            styles: [require('./assignableListItems.scss')]
        }), 
        __metadata('design:paramtypes', [])
    ], AssignableListItems);
    return AssignableListItems;
}());
exports.AssignableListItems = AssignableListItems;
var ListItem = (function () {
    function ListItem() {
    }
    ;
    return ListItem;
}());
exports.ListItem = ListItem;
//# sourceMappingURL=assignableListItems.js.map