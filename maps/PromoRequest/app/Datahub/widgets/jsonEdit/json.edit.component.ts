import {Component, Input, OnInit, EventEmitter, Output} from 'angular2/core';
import {LastItem, simpleObject} from './lastItem.component';
import {AlertService} from "../../../ReusableServices/alertService";
import {AppNotificationsMSG} from "../../../ReusableServices/appSettings";

@Component({
    selector: "json-edit",
    templateUrl: 'app/Datahub/widgets/jsonEdit/jsonEdit.html',
    /*styleUrls: ['resources/Datahub/assets/default.css', 'resources/Datahub/widgets/jsonedit/lastItem.css'],*/
    directives: [JsonEdit, LastItem]
})
export class JsonEdit implements OnInit {
    @Input('inputJson') inputJson:any;
    @Input('isRoot') isRoot:boolean = true;
    @Input('PredefinedJsonValues') PredefinedJsonValues:any;
    @Input('isPreviewOnly') isPreviewOnly: boolean = false;
    @Output() out = new EventEmitter();
    @Output() cancelChanges = new EventEmitter<boolean>();
    @Input() hierarchyLvl:number = 1;
    disabledControles:any;
    visiblePlugin:boolean=true;
    showSave: boolean = true;
    jsonTemplate: JSON;


    constructor(private _alert:AlertService) {
        //alert("In edit constructor");

    }

    mainArray:any;
    Items:any;
    isProcess:boolean = false;
    nodeTitle:string = AppNotificationsMSG.jsonEditPlugin.nodeDocumentTitle;
    isOpen:boolean = true;
    inputType:string = "JSON";



    ngOnInit() {
      //  this.showSave = !this.isPreviewOnly;
        if (this.isRoot) {
            try {
            //    this.disableForm();
                if (!this.inputJson) {
                    this.inputJson = "{}";
                }
                this.inputJson = JSON.parse(this.inputJson);
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
            if (this.hierarchyLvl === 3 ) {this.nodeTitle = "Column Mappings";};
            this.createTableView();
        } else {
            this.Items = this.inputJson;
            if (this.hierarchyLvl === 3  && this.Items[0].currentHierarchyLvl == 2 ) {
                try {
                    this.nodeTitle = "Doc Part";
                    this.Items.forEach((x)=> {
                        x[0].find((y)=> {
                            if (y.label.toUpperCase() === 'DOCPART') { x.title = y.value };
                            return y.label.toUpperCase() === 'DOCPART';
                        });
                    });
                }catch(Error){
                    console.log("Not document part identified");

                }
            }

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
          //  this.enableForm();
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
                let theValue = JSON.stringify(x.value);
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

    disableForm() {

        var dsbControls = new Array<number>();
        var form:any = document.forms[0];
        if(form) {
            var allElements = [].slice.call(form.elements);
            for (var element in allElements) {
                var item = allElements[element];
                var isDisabled = item.disabled;
                if (isDisabled) {
                    dsbControls.push(item.id);
                }
                item.readOnly = 'true';
                item.disabled = 'true';
            }
            ;
            this.disabledControles = dsbControls;
        }
    }

    enableForm() {
        var form:any = document.forms[0];
        if(form) {
            var allElements = [].slice.call(form.elements);
            for (var element in allElements) {
                var item = allElements[element];
                if (this.disabledControles.indexOf(item.id) === -1) {
                    item.readOnly = false;
                    item.disabled = false;
                    item.enabled = true;
                }
            }
            ;
        }
    }

    cancelClicked()
    {
     this.isOpen = false;
     this.cancelChanges.emit(true);
   //     this.enableForm();
        this.visiblePlugin = false;
    }

    createTableView(){
        this.tableViewBttn = "Show table view";
        this.showTableView = !this.showTableView;
        if (this.showTableView ) {
            this.tableViewBttn = "Hide table view";
            this.viewList = [];
            this.editList = [];
            try {
                let theInput = [...this.mainArray];
                this.buildViewList(theInput, this.viewList);
                this.buildEditList(this.mainArray, this.editList);
            } catch (Error) {
                this._alert.error("Edited JSON : " + AppNotificationsMSG.jsonEditPlugin.invalidFormat + Error.message);
                return;
            }
        }
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


    showTableView:boolean = false;
    tableViewBttn:String = "Show table view";
    viewList:Array<any> = [];
    editList:Array<any> = [];
    headerList :Array<any> = [];
}