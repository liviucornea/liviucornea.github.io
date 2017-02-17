import {Component, Input, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {simpleObject} from '../../../../../ReusableComponents/jsonEdit/lastItem.component';
import {AlertService} from "../../../../../ReusableServices/alertService";
import {AppNotificationsMSG} from "../../../../../Configuration/appSettings";
import { Subscription }   from 'rxjs/Subscription';
@Component({
    selector: "table-edit-config",
    template: require('./tableEdit.html'),
    styles: [require('../../../../../ReusableComponents/jsonEdit/jsonEdit.scss')]

})
export class TableEditConfig implements OnInit, OnDestroy{
    @Input('parentStep') parentStep:any;
    @Input('inputArray') inputArray:any;
    @Input('PredefinedJsonValues') PredefinedJsonValues:any;
    @Output() out = new EventEmitter();
    @Output() cancelChanges = new EventEmitter<boolean>();
    headerList:Array<any> = [];
    mainArray:any;
    documentTitle:string;
    isOpen:boolean = true;
    assignedSections: Array<string> = [];
    allSections : Array<string> = [];
    availableSections: Array<string> = [];
    referenceAsset: any = undefined;
    subscription: Subscription;

    constructor(private _alert:AlertService) {
        ///subscribe for sections sent to be deleted
        this.subscription = _alert.sendSectionForDelete$.subscribe(answer => {
            let section = this.mainArray.find((x) =>{
                x.sectionName == answer;
            });
            this.mainArray.splice(this.mainArray.indexOf(section), 1);
            this.doSave();

        })

    }

    ngOnDestroy(){
        this.subscription.unsubscribe();

    }


    ngOnInit() {
        var self = this;
        try {
            self.documentTitle = JSON.parse(self.PredefinedJsonValues)['#Title#'];
            self.mainArray = JSON.parse(this.inputArray);
            let assets = self.parentStep.StepAssets;
            self.referenceAsset = assets.find((x) => {
                try {
                    if (JSON.parse(x.Template)['#Type#'].toUpperCase() === 'JSONLIKE' && JSON.parse(x.Template)['#Title#'].toUpperCase() === 'DOCUMENT SETTING') {
                        return true;
                    } else {
                        return false;
                    }
                } catch (Error) {
                    return false;

                }

            });
            // bellow line change mainArray to have simple objects inside
            self.buildMainArray(this.mainArray);
            self.getAllSections();
            // bellow line is creating section titles and header for sections
            self.createTableView();
        } catch (Error) {
            self.isOpen = false;
            this._alert.error(AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
            return;
        }

    }

    buildMainArray(theInput:any) {
        var self = this;
        for (var i in theInput) {
            var o = theInput[i];
            if (o instanceof Array) {
                self.buildMainArray(o);
            } else {
                theInput[i] = self.buildArrayOfSimpleObjects(o);
                theInput[i].hasSimpleObjects = true;
            }
        }
    }

    buildArrayOfSimpleObjects(theObject:Object):simpleObject[] {
        let arrToAdd:simpleObject[] = [];
        for (var key2 in theObject) {
            if (typeof theObject[key2] != 'function') {
                arrToAdd.push(new simpleObject(key2, theObject[key2]));
            }
        }
        return arrToAdd;
    }

    createTableView() {
        var self = this;
        //resolve sections name
        self.mainArray.forEach((x)=> {
            let simplObj = x[0][0];
            Object.defineProperty(x, 'sectionName', {
                value: simplObj.label + ' - ' + simplObj.value,
                enumerable: false
            });
            Object.defineProperty(x, 'DocumentFormat', {
                value: self.sectionDocFormat(x),
                enumerable: false
            });

            Object.defineProperty(x, 'expanded', {value: false, enumerable: false, writable: true});
            self.assignedSections.push(x.sectionName);
            // resolve input types for each section
            x.forEach((rowArray) => {
                self.resolveInputTypes(rowArray);
            })


        });
        self.availableSections = self.allSections.filter((x)=> self.assignedSections.indexOf(x) == -1);

        try {
            let headerArray:Array<string> = [];
            self.mainArray[0][0].forEach((x) => {
                headerArray.push(x.label);
            });
            this.headerList = headerArray;

        } catch (Error) {
            self._alert.error("Error when create header list array : " + Error.message);
            return;
        }

    }


    doSave() {
        try {
            //let arrayForSave = JSON.parse(JSON.stringify(this.mainArray));
            let arrayForSave = [...this.mainArray];
            this.buildToSaveArray(arrayForSave);

            let stringOut = this.arrayToString(arrayForSave);
            this.out.emit({'value': stringOut});

            this._alert.addAlert(AppNotificationsMSG.jsonEditPlugin.jsonUpdate);
            this.isOpen = false;
        } catch (Error) {
            this._alert.error("Edited JSON : " + AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
            return;
        }
    }

    arrayToString(inputArray:Array<any>):string {
        let result:string = ",";
        for (let i = 0, j = inputArray.length; i < j; i++) {
            if (inputArray[i] instanceof Array) {
                result += this.arrayToString(inputArray[i]) + ',';
            } else {
                result += inputArray[i] + ',';
            }
        }
        result = "[" + result.slice(1, result.length - 1) + "]";
        return result;
    }

    buildJsonFromArray(theArray:simpleObject[]):string {
        let result:string = '';
        theArray.map(x => {
                var theValue = JSON.stringify(x.value);
                if (x.objType == 'checkbox') {
                    theValue = x.value ? JSON.stringify("1") : JSON.stringify("0");
                }
                result += ',"' + x.label + '":' + theValue;

            }
        );
        // return JSON.parse( '{' + result.slice(1) + '}');
        return '{' + result.slice(1) + '}';
    };

    buildToSaveArray(theInput:any) {
        for (var i in theInput) {
            var o = theInput[i];
            if (o instanceof Array) {
                if (o[0] instanceof simpleObject) {
                    theInput[i] = this.buildJsonFromArray(o);
                } else {
                    this.buildToSaveArray(o);
                }
            }

        }
    }

    toggle(section: any ) {
        section.expanded = !section.expanded;
    }
    removeSection(section){
        var self = this;
        self._alert.addAlertAndRequestAnswer("Do you want to delete the section ?", null, 'Delete:');
        var subscription = self._alert.requestConfirmationAnswer$.subscribe(item => {
            self._alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }
            self.availableSections.push(section.sectionName);
            self.assignedSections.splice(self.assignedSections.indexOf(section.sectionName, 1));
            self.mainArray.splice(self.mainArray.indexOf(section), 1);

        });

    }

    cancelClicked() {
        this.isOpen = false;
        this.cancelChanges.emit(true);
    }

    itemChanged(item, section) {
        if (item.oldValue !== item.value) {
            item.isChanged = true;
            if (item.label.toUpperCase() === 'LENGTH') {
                this.recalculateStartPosition(section);
            }
        } else {
            item.isChanged = false;
        }

    }

    checkIt(event, item) {
        if (event.keyCode == 27 && item.oldValue !== item.value) {
            item.value = item.oldValue;
            item.isChanged = false;
        }

    }

    removeRowItem(row, section) {
        var self = this;
        self._alert.addAlertAndRequestAnswer("Do you want to delete the row ?", null, 'Delete:');
        var subscription = self._alert.requestConfirmationAnswer$.subscribe(item => {
            self._alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }
            section.splice(section.indexOf(row), 1);
            if (section.length == 0 ){
                self.availableSections.push(section.sectionName);
                self.assignedSections.splice(self.assignedSections.indexOf(section.sectionName, 1));
                self.mainArray.splice(self.mainArray.indexOf(section), 1);
            }else {
                self.reindexColumn(section, 'ORDER');
                self.recalculateStartPosition(section);
            }


        });
    }

    moveRow(row:any, section:any, direction:string) {
        var self = this;
        self.moveItemInArray(section, row, direction);
        self.reindexColumn(section, 'ORDER');
        self.recalculateStartPosition(section);
    }

    addNewRow(row:any, section:any) {
        var self = this;
        let docFormat = section.DocumentFormat;
        if (docFormat === 'UNKNOWN') {
            this._alert.error('Unknown DocFormat, you are not able to add new records!!!');
            return;
        }
        let position = section.indexOf(row);
        let elemCopy = row.map(cloneSimpleObj);
        elemCopy.forEach((x)=> {
            x.isChanged = true;
        });
        elemCopy.hasSimpleObjects = true;
        section.splice(position + 1, 0, elemCopy);
        self.reindexColumn(section, 'ORDER');
        self.recalculateStartPosition(section);
        this._alert.addAlert("New row has been inserted!");
    }

    addNewSection(sectionName: string){
        if (sectionName.indexOf('-') == -1){
            this._alert.addAlert("Please select a section from the list!");
            return;
        }
        var self = this;
        let sectionNbr = parseInt(sectionName.slice(sectionName.indexOf('-') + 1 ) );
        let newSection = [];
        // let  elemCopy = JSON.parse(JSON.stringify(row));
        let elemCopy = self.mainArray[0][0].map(cloneSimpleObj);
        elemCopy.forEach((x)=> {
            x.isChanged = false;
            if(x.label.toUpperCase() === 'DOCPART'){
                x.value = sectionNbr;
            }else{
                x.value = '';
            }

        });
        elemCopy.hasSimpleObjects = true;
        newSection.push(elemCopy);
        Object.defineProperty(newSection, 'sectionName', {
            value:  sectionName,
            enumerable: false
        });

        self.mainArray.push(newSection);
        self.availableSections.splice(self.availableSections.indexOf(sectionName),1);
        this._alert.addAlert("New section has been created!");
    }


    reindexColumn(section:Array<any>, column:string) {
        section.forEach((lineArray) => {
            let index = section.indexOf(lineArray);
            let orderObj = lineArray.find((x) => {
                return x.label.toUpperCase() === column.toUpperCase();
            });
            if (orderObj) {
                orderObj.value = index;
            }
        })
    }

    recalculateStartPosition(section:any) {
        if (section.DocumentFormat.toUpperCase() != 'FIXEDLENGTH') {
            return;
        }
        var valForNext = 0;
        for (let i = 0, j = section.length; i < j; i++) {
            let lineArray = section[i];
            let lengthObj = lineArray.find((x) => {
                return x.label.toUpperCase() === 'LENGTH';
            });
            let startPositionObj = lineArray.find((x) => {
                return x.label.toUpperCase() === 'STARTPOSITION';
            });
            if (lengthObj && startPositionObj) {
                startPositionObj.value = valForNext;
                valForNext = parseInt(lengthObj.value) + parseInt(startPositionObj.value);
            }


        }

    }


    sectionDocFormat(section:any):string {
        var self = this;

        if (self.referenceAsset) {
            let settingSections = JSON.parse(self.referenceAsset.ConfigurationValue);
            let settingsForSection = settingSections.find((x) => {
                for (let key in x) {
                    let o = x[key];
                    if (key + ' - ' + o === section.sectionName) {
                        return true;
                    }
                }
                return false;
            })
            if (settingsForSection) {
                return settingsForSection['DocFormat'];
            }
        }
        return "UNKNOWN";
    }

    getAllSections(){
        var self = this;
        self.allSections = [];
        if (self.referenceAsset) {
            let settingSections = JSON.parse(self.referenceAsset.ConfigurationValue);
            settingSections.forEach((x) => {
                for (let key in x) {
                    let o = x[key];
                    if (key.toUpperCase() === 'DOCPART'){
                        self.allSections.push(key + ' - ' + o);
                    }
                }
            })
        }
    }

    moveItemInArray(arr:Array<any>, item:any, direction:string) {
        var position = arr.indexOf(item);
        if (direction === 'up' && arr[position - 1]) {
            arr[position - 1] = [arr[position], arr[position] = arr[position - 1]][0];
        }
        if (direction === 'down' && arr[position + 1]) {
            arr[position + 1] = [arr[position], arr[position] = arr[position + 1]][0];
        }
    }

    resolveInputTypes(Items: Array<any>){
        var preDefinedJsonKeys = [];
        try {

            let predefValues = JSON.parse(this.PredefinedJsonValues);
            if (Object.keys(predefValues).length === 0 && predefValues.constructor === Object)
                return;

            for (let key in predefValues) {
                preDefinedJsonKeys.push(key);
            }

            Items.forEach((x)=> {
                if (predefValues.hasOwnProperty(x.label)) {
                    let availableOptions = predefValues[x.label];
                    if (availableOptions.hasOwnProperty('values')) {
                        x.objType = "dropdown";
                        x.listValues = availableOptions.values;
                    }
                    if (availableOptions.hasOwnProperty('type') && availableOptions.type == 'boolean') {
                        x.objType = "checkbox";
                        if (x.value == '0') {x.value = false;}
                    }
                    if (availableOptions.hasOwnProperty('readOnly')) {
                        if(availableOptions.readOnly) x.readOnly = true;
                    }
                }


            });
        } catch (Error) {
            this._alert.error("JSON template error when in table edit" + Error.message);
            return;
        }
    }
    /// end resolveINputTypes
}

function cloneSimpleObj(x) {
    var theClone:simpleObject;
    theClone = new simpleObject(x.label, x.value);
    theClone.oldValue = x.value;
    theClone.isChanged = true;
    theClone.objType = x.objType;
    theClone.listValues = x.listValues;
    return theClone;
}

