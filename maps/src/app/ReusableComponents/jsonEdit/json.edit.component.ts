import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {simpleObject} from './lastItem.component';
import {AlertService} from "../../ReusableServices/alertService";
import {AppNotificationsMSG} from "../../Configuration/appSettings";

@Component({
    selector: "json-edit",
    template: require('./jsonEdit.html'),
    styles:[require('./jsonEdit.scss')]
})
export class JsonEdit implements OnInit {
    @Input('parentStep') parentStep:any;
    @Input('inputJson') inputJson:any;
    @Input('isRoot') isRoot:boolean = true;
    @Input('PredefinedJsonValues') PredefinedJsonValues:any;
    @Output() out = new EventEmitter();
    @Output() cancelChanges = new EventEmitter<boolean>();
    @Input() hierarchyLvl:number = 1;
    visiblePlugin:boolean=true;
    showSave: boolean = true;
    jsonTemplate: JSON;


    constructor(private _alert:AlertService) {
        //alert("In edit constructor");

    }

    mainArray:any;
    Items:any;
    isProcess:boolean = false;
    nodeTitle:string ;
    isOpen:boolean = true;
    inputType:string = "JSON";



    ngOnInit() {
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
                }else{
                    this.Items = [this.inputJson];
                    this.inputType = "Array";
                }
                this.buildMainArray(this.Items, 0);
            } catch (Error) {
                this.isOpen = false;
                this._alert.error(AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
                return;
            }
            this.Items.forEach((x)=> {
                if (x.every(elem=> elem.hasSimpleObjects)) {
                    x.showAddBttn = true;
                }else {
                    x.showAddBttn = false;
                }
            })
            this.mainArray = this.inputJson;
            // this.createTableView();
        } else {
            self.Items = self.inputJson;
        }
        if (self.Items)
        {
            self.Items[0].expanded = true;
        }

    }

    buildMainArray(theInput:any, herarchyLvl:number) {
        herarchyLvl++;
        for (var i in theInput) {
            var o = theInput[i];
            if (o instanceof Array) {
                this.buildMainArray(o , herarchyLvl );
                if (o.every(elem=> elem.hasSimpleObjects)) {
                    theInput[i].showAddBttn = true;
                }else {
                    theInput[i].showAddBttn  = false;
                }
            } else {
                theInput[i] = this.buildArrayOfSimpleObjects(o);
                theInput[i].hasSimpleObjects = true;
            }
            theInput[i].currentHierarchyLvl = herarchyLvl;
            this.hierarchyLvl  = (this.hierarchyLvl < herarchyLvl ? herarchyLvl : this.hierarchyLvl );
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

    addNewNode(Node:any) {
        let objToAdd:simpleObject[] = [];
        const theLength = Node.length;
        let hasSimpleObjects = Node[theLength - 1].hasSimpleObjects;
        // we do not add complex nodes for now;
        if (!(hasSimpleObjects)) return;
        let docPart:string = '1' ;
        let orderNbr:number=0, startPosition:number = 0, length = 0;
        if (this.hierarchyLvl === 3) {
            try {
                if (this.PredefinedJsonValues) {
                    Node[theLength - 1].find((x)=> { if(x.label.toUpperCase() === 'DOCPART') docPart = x.value; return  x.label.toUpperCase() === 'DOCPART'; });
                    Node[theLength - 1].find((x)=> { if(x.label.toUpperCase() === 'ORDER') orderNbr = x.value; return  x.label.toUpperCase() === 'ORDER'; });
                    Node[theLength - 1].find((x)=> { if(x.label.toUpperCase() === 'STARTPOSITION') startPosition = x.value; return  x.label.toUpperCase() === 'STARTPOSITION'; });
                    Node[theLength - 1].find((x)=> { if(x.label.toUpperCase() === 'LENGTH') length = x.value; return  x.label.toUpperCase() === 'LENGTH'; });
                    this.jsonTemplate = JSON.parse(this.PredefinedJsonValues);
                    for (let key in this.jsonTemplate){
                        let newSobj:simpleObject;
                        if (typeof(this.jsonTemplate[key]) === "string") {
                            newSobj = new simpleObject(key, this.jsonTemplate[key]);
                        }else{
                            if (this.jsonTemplate[key].hasOwnProperty('value')){
                                newSobj = new simpleObject(key, this.jsonTemplate[key].value);
                            }else if (this.jsonTemplate[key].hasOwnProperty('values')){
                                newSobj = new simpleObject(key,this.jsonTemplate[key].values[0]);
                            }else{
                                newSobj = new simpleObject(key,'');
                            }
                        }
                        if (newSobj.label.toUpperCase() === 'DOCPART') newSobj.value = docPart;
                        if (newSobj.label.toUpperCase() === 'ORDER') newSobj.value = (Number(orderNbr) + 1 ).toString();
                        if (newSobj.label.toUpperCase() === 'STARTPOSITION') newSobj.value = (Number(startPosition) + Number(length)).toString();
                        if (newSobj.label.toUpperCase() === 'LENGTH') newSobj.value = length.toString();
                        objToAdd.push(newSobj);
                    }
                    // objToAdd.expanded = true;
                    Node.push(objToAdd);
                    Node[theLength].hasSimpleObjects = hasSimpleObjects;
                    Node[theLength].expanded = false;
                }
            } catch (Error) {
                this._alert.error("JSON template error:" + AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
            }
            return;
        }

        Node[theLength - 1].forEach((x) => {
                let newSobj = new simpleObject(x.label, x.value);
                objToAdd.push(newSobj);
            }
        );
        // objToAdd.expanded = true;
        Node.push(objToAdd);
        Node[theLength].hasSimpleObjects = hasSimpleObjects;
        Node[theLength].expanded = false;
    }

    doSave() {
        try{
            //let arrayForSave = JSON.parse(JSON.stringify(this.mainArray));
            let arrayForSave = [...this.mainArray];

            this.buildToSaveArray(arrayForSave);
            if (this.inputType != "Array")
            {
                this.out.emit({value: arrayForSave[0] });
            }else{
                let stringOut = this.arrayToString(arrayForSave);
                // let stringOut =   JSON.stringify(arrayForSave) ;
                this.out.emit({'value': stringOut });
            }
            this._alert.addAlert(AppNotificationsMSG.jsonEditPlugin.jsonUpdate);
            //  this.isOpen = false;
            this.visiblePlugin = false;
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
        result = "[" + result.slice(1, result.length -1) + "]";
        return result;
    }

    buildJsonFromArray(theArray:simpleObject[]):string {
        let result:string = '';
        theArray.map(x => {
                var theValue = JSON.stringify(x.value);
                if (x.objType == 'checkbox') {
                    theValue = x.value ? JSON.stringify("1") : JSON.stringify("0");
                }
                result += ',"' + x.label + '":' + theValue  ;

            }
        );
        // return JSON.parse( '{' + result.slice(1) + '}');
        return '{' + result.slice(1) + '}' ;
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

    getPlaceInArray(arrayName:string, thePath:string[]):string {
        let result = arrayName;
        thePath.map((x) => result = result + '[' + x + ']');
        return result;
    }

    toggle(item) {
        item.expanded = !item.expanded;
    }

    cancelClicked()
    {
        this.isOpen = false;
        this.cancelChanges.emit(true);
        this.visiblePlugin = false;
    }

    createTableView(){
        var self = this;
        self.tableViewBttn = "Show table view";
        self.showTableView = !self.showTableView;
        if (self.showTableView ) {
            self.tableViewBttn = "Hide table view";
            self.viewList = [];
            self.editList = [];
            try {
                self.buildEditList(self.mainArray, self.editList);
                // self.editList = self.mainArray[0];
                //let theInput = [...self.mainArray];
                //  this.buildViewList(theInput, this.viewList);
            } catch (Error) {
                self._alert.error("Edited JSON : " + AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
                return;
            }
        }
    }
    buildEditList(theInput:any, theOutput:Array<any>=[])  {
        let headerArray:Array<string> =[];

        for (var i in theInput) {
            var child = theInput[i];
            if (child instanceof Array) {
                if (child[0] instanceof simpleObject) {
                    var lineArray: Array<string> = [];
                    child.forEach((x) => {
                        lineArray.push(x);
                        if (theOutput.length === 0 )   headerArray.push(x.label);
                    });
                    theOutput.push(lineArray);
                } else {
                    this.buildEditList(child, theOutput);
                }
            }

        }
        if (this.headerList.length === 0 )    this.headerList = headerArray;
    }

    jsonInputToMainArray(theInput:any, herarchyLvl:number): Array<any> {
        var self =  this;
        let result = [];
        herarchyLvl++;
        for (var prop in theInput) {
            Object.defineProperty(result,'itemName',{value:prop, enumerable: false});
            Object.defineProperty(result,'expanded',{value:false, enumerable: false});
            Object.defineProperty(result,'hasSimpleObjects',{value:false, enumerable: false});
            if (!(theInput[prop] instanceof Array)) {
                result.push(self.jsonInputToMainArray(theInput[prop],0));
            }else{
                let lcArray = [];
                Object.defineProperty(lcArray,'itemName',{value:'LeafNodeName', enumerable: false});
                Object.defineProperty(lcArray,'expanded',{value:false, enumerable: false});
                Object.defineProperty(lcArray,'hasSimpleObjects',{value:false, enumerable: false});
                theInput[prop].forEach((x)=> {
                    let leafArray = self.buildArrayOfSimpleObjects(x)
                    Object.defineProperty(leafArray,'itemName',{value:'LeafNodeName', enumerable: false});
                    Object.defineProperty(leafArray,'expanded',{value:false, enumerable: false});
                    Object.defineProperty(leafArray,'hasSimpleObjects',{value:false, enumerable: true});

                    lcArray.push(leafArray);
                })
                result.push(lcArray);
            }

        }
        return result;
    }








    buildViewList(theInput:any, theOutput:Array<any>=[])  {
        let headerArray:Array<string> =[];
        for (var i in theInput) {
            var child = theInput[i];
            if (child instanceof Array) {
                if (child[0] instanceof simpleObject) {
                    var lineArray: Array<string> = [];
                    child.forEach((x) => {
                        lineArray.push(x.value);
                        if (theOutput.length === 0 )   headerArray.push(x.label);
                    });
                    theOutput.push(lineArray);
                } else {
                    this.buildViewList(child, theOutput);
                }
            }

        } ;
        if (headerArray.length != 0)  theOutput.unshift(headerArray);
    }


    itemChanged(item) {
        if (item.oldValue !== item.value) {
            item.isChanged = true;
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
    removeItem(item){
        var self = this;
        self.Items.splice(self.Items.indexOf(item) , 1);
    }
    removeEditListItem(item){
        var self = this;
        self.editList.splice(self.editList.indexOf(item) , 1);
        self.mainArray[0].splice(self.mainArray[0].indexOf(item) , 1);

    }

    nodeMove(data){
        var self = this;
        var position = self.Items.indexOf(data.node);
        var direction = data.direction;
        if ( direction === 'up' && self.Items[position-1]){
            self.Items[position-1] = [self.Items[position], self.Items[position] = self.Items[position-1]][0];
        }
        if ( direction === 'down' && self.Items[position+1]){
            self.Items[position+1] = [self.Items[position], self.Items[position] = self.Items[position+1]][0];
        }

    }

    rowOfEditListMove(item : any , direction: string){
        var self = this;
        self.moveItemInArray(self.editList,item,direction);
        //  self.moveItemInArray(self.mainArray[0],item,direction);

    }

    moveItemInArray( arr: Array<any>, item: any, direction: string) {
        var position = arr.indexOf(item);
        if ( direction === 'up' && arr[position-1]){
            arr[position-1] = [arr[position], arr[position] = arr[position-1]][0];
        }
        if ( direction === 'down' && arr[position+1]){
            arr[position+1] = [arr[position], arr[position] = arr[position+1]][0];
        }
    }

    showTableView:boolean = true;
    tableViewBttn:String = "Show table view";
    viewList:Array<any> = [];
    editList:Array<any> = [];
    headerList :Array<any> = [];
}