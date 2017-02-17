import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {AlertService} from "../../ReusableServices/alertService";
import {AppNotificationsMSG} from "../../Configuration/appSettings";



@Component({
    selector: "last-item",
    template: require('./lastItem.html'),
    styles:[require('./jsonEdit.scss')]
})
export class LastItem implements OnInit {
    @Input() Items:any;
    @Input() PredefinedJsonValues:any = null;
    @Input() isProcess:boolean = false;
    @Input() showEdit:boolean = false;
    @Input() hierarchyLvl:number = 1;
    @Output() removeThis = new EventEmitter();
    @Output() nodeMove = new EventEmitter();
    adding:boolean = false;
    title:string = AppNotificationsMSG.jsonEditPlugin.nodeColumnSettingsTitle;
    formIsClean:boolean = true;
    keyValueTypeObj:string = "textbox";
    keyValueTypeOptions:Array<string> = [];
    predefValues:any = {};
    newKey:string;
    newKeyValue:string = null;
    fromPredefined:boolean = false;
    preDefinedJsonKeys:Array<string> = [];
    hasValidTemplate:boolean = false;


    constructor(private _alert:AlertService) {
    }

    ngOnInit() {
        var self = this;
        if (!this.PredefinedJsonValues)
            return;
// get title from Template :
        try{
            self.title = JSON.parse(self.PredefinedJsonValues)['#Title#'];
            //resolve node title
            if (this.hierarchyLvl === 2) {
                try {
                    let arrayForNames = JSON.parse(self.PredefinedJsonValues)['#ArrayForNames#'];

                    if (arrayForNames instanceof Array) {

                        switch (arrayForNames.length) {
                            case  1 :
                                self.Items.find((y)=> {
                                    if (y.label.toUpperCase() === arrayForNames[0].toUpperCase()) {
                                        self.title = y.label + ' ' + y.value
                                    }
                                    ;
                                    return y.label.toUpperCase() === arrayForNames[0].toUpperCase();
                                }, self);
                                break;
                            case 3 :
                                self.Items.find((y)=> {
                                    if (y.label.toUpperCase() === arrayForNames[0].toUpperCase()) {
                                        self.title =  y.value;
                                    }
                                    ;
                                    return y.label.toUpperCase() === arrayForNames[0].toUpperCase();
                                }, self);
                                self.Items.find((y)=> {
                                    if (y.label.toUpperCase() === arrayForNames[1].toUpperCase()) {
                                        self.title = self.title + arrayForNames[2] + y.value;
                                    }
                                    ;
                                    return y.label.toUpperCase() === arrayForNames[1].toUpperCase();
                                }, self);
                                break;


                        }


                    }


                }catch(Error){
                    console.log("Not document part type identified");

                }

            }

        }catch(Error){
            console.log("Unable to get title from Template: " + Error.message);
        }





        try {

            this.predefValues = JSON.parse(this.PredefinedJsonValues);
            if (Object.keys(this.predefValues).length === 0 && this.predefValues.constructor === Object)
                return;
            this.fromPredefined = true;
            this.hasValidTemplate = true
            for (let key in this.predefValues) {
                this.preDefinedJsonKeys.push(key);
            }

            this.Items.forEach((x)=> {

                if (this.predefValues.hasOwnProperty(x.label)) {
                    let availableOptions = this.predefValues[x.label];
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
            this.fromPredefined = false;
            this._alert.error("JSON template error:" + AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
            return;
        }

    }

    usePredefinedKeys() {
        this.fromPredefined = !this.fromPredefined;
        this.newKey = null;
        this.newKeyValue = null;
        this.keyValueTypeOptions = [];
        this.keyValueTypeObj = "textbox";

    }


    saveNewProp(key, keyValue) {
        if (key && keyValue) {
            if (this.Items.find((x)=>x.label.toUpperCase() === key.toUpperCase())) {
                this._alert.error(AppNotificationsMSG.jsonEditPlugin.propertyExists + key);
                return;
            }
            let newSimpleObj = new simpleObject(key, keyValue);
            if (this.predefValues.hasOwnProperty(key)) {
                let availableOptions = this.predefValues[key];
                if (availableOptions.hasOwnProperty('values')) {
                    newSimpleObj.objType = "dropdown";
                    newSimpleObj.listValues = this.keyValueTypeOptions;
                }
            }
            this.Items.push(newSimpleObj);
        } else {
            this._alert.error(AppNotificationsMSG.jsonEditPlugin.keyValueRequired);
            return;
        }
        this.newKey = null;
        this.adding = false;
        this.keyValueTypeOptions = [];
        this.keyValueTypeObj = "textbox";
        this.newKeyValue = null;
    }

    resetAll() {
        this.Items.forEach((x)=> {
            if (x.oldValue != x.value) {
                x.value = x.oldValue;
                x.isChanged = false;
            }
        });
        this.formIsClean = true;
    }


    removeItem(item:any) {
        this._alert.addAlertAndRequestAnswer(AppNotificationsMSG.deletionQuestionMsg);
        var subscription =  this._alert.requestConfirmationAnswer$.subscribe(answer => {
            this._alert.askConfirmation = false;
            subscription.unsubscribe();
            if (answer != "OK")
                return;
            this.Items.splice(this.Items.indexOf(item), 1);
        })

    }

    itemChanged(item) {
        if (item.oldValue !== item.value) {
            item.isChanged = true;
            this.formIsClean = false;
        } else {
            item.isChanged = false;
        }
        if (this.Items.findIndex(x=> x.isChanged) == -1)   this.formIsClean = true;

    }

    checkIt(event, item) {
        // comment cleaning input for now as the rules are not defined
        //this.cleanIt(item);
        if (event.keyCode == 27 && item.oldValue !== item.value) {
            item.value = item.oldValue;
            item.isChanged = false;
        }
        if (this.Items.findIndex(x=> x.isChanged) === -1)   this.formIsClean = true;
    }


    showOptionsForKeyValue(input) {
        if (!input) return;
        this.newKeyValue = null;
        this.keyValueTypeObj = "textbox";
        this.keyValueTypeOptions = [];

        if (this.predefValues.hasOwnProperty(input)) {
            let availableOptions = this.predefValues[input];
            if (availableOptions.hasOwnProperty('values')) {
                this.keyValueTypeObj = "dropdown";
                this.keyValueTypeOptions = availableOptions.values;
            } else {
                if (typeof(availableOptions) === "string"){
                    this.newKeyValue = availableOptions;
                }else{
                    if (availableOptions.hasOwnProperty('value')) this.newKeyValue = availableOptions.value;
                }
            }
        } else {
            for (let lvs_prop in this.predefValues) {
                if (input.toLowerCase() === lvs_prop.toLowerCase()) {
                    let availableOptions = this.predefValues[lvs_prop];
                    if (availableOptions.hasOwnProperty('values')) {
                        this.keyValueTypeObj = "dropdown";
                        this.keyValueTypeOptions = availableOptions.values;
                    } else {
                        this.newKeyValue = this.predefValues[lvs_prop];
                    }
                    break;
                }
            }

        }


    }

    cleanIt(input) {
        input.value = input.value.replace(this.regex, '');
    }

    removeMe(){
        var self = this;
        self._alert.addAlertAndRequestAnswer("Dou you want to remove " + self.title + " ?");
        var subscription = self._alert.requestConfirmationAnswer$.subscribe(item => {
            self._alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }

            self.removeThis.emit(this.Items);
        });
    }
    moveMe(direction: string){
        var self = this;
        let eventData = { 'node': self.Items, 'direction': direction };
        self.nodeMove.emit(eventData);
    }

    specials = [
        // order matters for these
        "-"
        , "["
        , "]"
        // order doesn't matter for any of these
        , "/", "{", "}", "(", ")", "*", "+", "?", ".", "^"
        , "$", "|", "!", "~", "&", "`", ";", '"', "'", ",", "#"
    ];
    regex = RegExp('[' + this.specials.join('\\') + ']', 'g')

}

export class simpleObject {
    public oldValue:string;
    public isChanged:boolean = false;
    public objType:string = "textbox";
    public listValues:Array<string>;

    constructor(public label:string, public value:string) {
        this.oldValue = value;
        this.isChanged = false;
        this.objType = "textbox";
        this.listValues = [];
    }
}