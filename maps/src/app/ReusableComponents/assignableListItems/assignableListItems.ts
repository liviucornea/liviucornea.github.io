import {Component, Input, OnInit, EventEmitter, Output, SimpleChange} from '@angular/core';
import * as _ from 'lodash';
//usage
// <assignable-list [inputList]="allItems" [assignedList]="assignedItems" [inputTitle]="'Left Title'" [assignedTitle]="'Assigned Title'" (listOut)="getAssignedList($event)"></assignable-list>

@Component({
    selector: "assignable-list",
    template: require('./assignableListItems.html'),
    styles: [require('./assignableListItems.scss')]
})
export class AssignableListItems implements OnInit {
    @Input('inputTitle') inputTitle: string ;
    @Input('assignedTitle') assignedTitle: string ;
    @Input('inputList') inputList: Array<any>=[];
    @Input('assignedList') assignedList: Array<any>=[] ;
    @Output() listOut = new EventEmitter();
    @Input() inputSettings: any;

    isPageLoaded: boolean = false;
    formattedInputList: Array<any>=[];
    formattedAssignedList: Array<any>=[];
    configuration: any;
    customButtonsList: Array<any> = [];

    ngOnInit() {
        if(this.inputSettings && this.inputSettings.ListItemsConfiguration) {
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
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if(this.isPageLoaded) {
            if (changes['inputList']) {
                let currentValue = changes['inputList'].currentValue;
                let oldValue = changes['inputList'].previousValue;
                if (currentValue != oldValue) {
                    this.formattedInputList = this.getFormattedListItems(currentValue, this.configuration.inputListDataFields["dbColumnName"], this.configuration.inputListDataFields["displayColumnName"]);
                }
            }
            if (changes['assignedList']) {
                let currentValue = changes['assignedList'].currentValue;
                let oldValue = changes['assignedList'].previousValue;
                if (currentValue != oldValue) {
                    this.formattedAssignedList = this.getFormattedListItems(currentValue, this.configuration.assignedListDataFields["dbColumnName"], this.configuration.assignedListDataFields["displayColumnName"]);
                }
            }
        }
    }

    getFormattedListItems(listItems, valueColumn, descriptionColumn){
        let formattedList: Array<any>=[];
        if(!valueColumn){
            valueColumn = 'Value';
        }
        if(!descriptionColumn){
            descriptionColumn = 'Description';
        }

        if(listItems && listItems.length) {
            listItems.forEach(x=> {
                let formattedItem = new ListItem();
                formattedItem.Value = x[valueColumn];
                formattedItem.Description = x[descriptionColumn];
                formattedList.push(formattedItem);
            });
        }
        return formattedList;
    }

    assignListOut(customButton) {

        this.listOut.emit({
            value: this.formattedAssignedList,
            controlName: customButton.name,
            inputList: this.formattedInputList
        });
    }

    switchSelection(selection: any, sourceList: Array<any>, destinationList: Array<any>) {
        if (selection.selectedOptions.length === 0) {
            return;
        } else {
            let selectedOptions = Array.from(selection.selectedOptions);
            selectedOptions.forEach(option => {
                let item = new ListItem();
                item.Value = option['value'];
                item.Description = option['text'];
                this.changeItemList(item, sourceList, destinationList);
            })
        }
    }

    changeItemList(item: ListItem, sourceList: Array<ListItem>, destinationList: Array<ListItem>) {
        _.remove(sourceList, (x) => x.Value == item.Value && x.Description === item.Description);
        if (destinationList && destinationList.length > 0 && destinationList.find(x => x.Value == item.Value && x.Description === item.Description)) {
            return;
        }

        destinationList.push(item);
    }

    moveAllToInput() {
        this.formattedInputList = _.uniqWith(_.union(this.formattedInputList, this.formattedAssignedList), function (a, b) {
            return a.Value == b.Value && a.Description === b.Description
        });
        this.formattedAssignedList = [];
    }

    moveAllToAssigned() {
        this.formattedAssignedList = _.uniqWith(_.union(this.formattedInputList, this.formattedAssignedList), function (a, b) {
            return a.Value == b.Value && a.Description === b.Description
        });
        this.formattedInputList = [];
    }
}
export class ListItem {
    public Value: string;
    public Description: string;

    constructor() {
    };
}