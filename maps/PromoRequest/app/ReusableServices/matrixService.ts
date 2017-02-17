import {Injector,Injectable,EventEmitter} from "angular2/core";

@Injectable()
export class matrixService {
    inputClickedEvent:EventEmitter<any>;
    treeArray:any;

    constructor() {
        this.inputClickedEvent = new EventEmitter<any>();
    }

    inputClicked(input) {
        this.inputClickedEvent.emit(input);
    }

    extractMultiHeader(inputObjs:Array<any>, formTypes:Array<any>):Array<any> {
        var finalArray = new Array<any>();
        var arrayHeaders = new Array<any>();
        var arrayObjects = new Array<any>();
        for (var line in inputObjs) {
            var subData = inputObjs[line];
            var subConfig = formTypes[line];
            var header = this.extractHeader(subData, subConfig);
            var data = this.extractMatrix(subData, subConfig);
            finalArray.push({headerSet: header, dataSet: data});

        }
        ;
        return finalArray;
    }

    extractHeader(inputObjs:Array<any>, formTypes:any):Array<any> {
        var headerRow:Array<any>;
        var row:any;
        var sequence:number = 0;

        if (inputObjs) {

            if(inputObjs.length>0){

                row = inputObjs[0];
                headerRow = new Array<any>();

                for (var key in row) {
                    var columnConfig = formTypes.ColumnConfiguration.find(x=>x.dbColumnName.toLowerCase() === key.toLowerCase());
                    if (columnConfig != undefined && row.hasOwnProperty(key)) {

                        sequence = formTypes.ColumnConfiguration.map(function(x) {return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());

                        headerRow.push(
                            {
                                val: columnConfig.displayName,
                                columnCss: columnConfig.columnCss,
                                name: key,
                                sequence: sequence,
                                sortCss: "",
                                visibility: columnConfig.visibility,
                                filter: ""
                            });
                    }
                }
            }
            else {
                headerRow = this.extractHeaderFromConfig(formTypes);
            }
        }

        return this.sortBySequence(headerRow);
    }

    extractFilter(inputObjs:Array<any>, formTypes:any):Array<any> {
        var headerRow:Array<any>;
        var row:any;
        var sequence:number = 0;
        if (inputObjs.length) {
            row = inputObjs[0];
            headerRow = new Array<any>();

            for (var key in row) {
                var columnConfig = formTypes.ColumnConfiguration.find(x=>x.dbColumnName.toLowerCase() === key.toLowerCase());
                if (columnConfig != undefined && row.hasOwnProperty(key)) {

                    sequence = formTypes.ColumnConfiguration.map(function(x) {return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());

                    headerRow.push(
                        {
                            val: columnConfig.displayName,
                            columnCss: columnConfig.columnCss,
                            name: key,
                            sequence: sequence,
                            htmlControlType: columnConfig.htmlControlType,
                            filterable: columnConfig.filterable,
                            options: [],
                            filterValue: []
                        });
                }
            }
        }
        else {
            headerRow = this.extractHeaderFromConfig(formTypes);
        }

        return headerRow;
    }

    extractViewHeader(inputObjs:Array<any>, formTypes:any):Array<any> {
        var headerRow:Array<any> = new Array<any>();
        if (inputObjs) {
            var row:any = inputObjs[0];
            var sequence:number = 0;
            for (var key in row) {
                var columnConfig = formTypes.ColumnConfiguration.find(x=>x.dbColumnName.toLowerCase() === key.toLowerCase());
                if (columnConfig != undefined && row.hasOwnProperty(key)) {

                    sequence = formTypes.ColumnConfiguration.map(function(x) {return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());

                    headerRow.push(
                        {
                            columnCss: columnConfig.columnCss,
                            val: columnConfig.displayName,
                            name: key,
                            sequence: sequence,
                            sortCss: "",
                            visibility: columnConfig.visibility
                        });
                }
            }
        }
        else {
            headerRow = this.extractHeaderFromConfig(formTypes);
        }
        return headerRow;
    }

    extractHeaderFromConfig(formTypes:any) {
        var headerRow = new Array<any>();
        var sequence:number = 0;
        //When no records exists create the grid from control configuration array
        if (formTypes.ColumnConfiguration != undefined && formTypes.ColumnConfiguration.length > 0) {
            formTypes.ColumnConfiguration.forEach(function (x) {
                headerRow.push(
                    {
                        val: x.displayName,
                        columnCss: x.columnCss,
                        name: x.dbColumnName,
                        sequence: sequence,
                        sortCss: "",
                        visibility: x.visibility
                    });
                sequence++;
            });
        }
        return headerRow;
    }

    extractMatrix(inputObjs:Array<any>, formTypes:any):Array<any> {
        var result:Array<any> = new Array<any>();
        var sortedRow:Array<any> = new Array<any>();
        var length = inputObjs.length;
        var newRow:Array<any>;
        var columnSequence:number = 0;
        var rowSequence:number = 0;
        for (var i = 0; i < length; i++) {
            newRow = new Array<any>();
            var row = inputObjs[i];

            for (var key in row) {
                var columnConfig = formTypes.ColumnConfiguration.find(x=>x.dbColumnName.toLowerCase() === key.toLowerCase());
                if (columnConfig != undefined && row.hasOwnProperty(key)) {
                    var displayValue = undefined;
                    if (columnConfig.dataSourceAddress) {
                        var lookupTable = columnConfig.dataSource;
                        var dataSourceAddressColumnName = columnConfig.dataSourceAddress.dbColumnName;
                        var lookupRow = lookupTable.find(function (x) {
                            return row[key] === x[dataSourceAddressColumnName];
                        })
                        var displayColumnName = columnConfig.dataSourceAddress.displayColumnName;
                        if (lookupRow == undefined) {
                            displayValue = row[key];
                        }
                        else {
                            displayValue = lookupRow[displayColumnName];
                        }
                    }
                    if (displayValue === undefined) {
                        displayValue = row[key];
                    }

                    columnSequence = formTypes.ColumnConfiguration.map(function(x) {return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());

                    var dataSourceAddressColumn = columnConfig.dataSource ? columnConfig.dataSourceAddress.displayColumnName : "COLUMN-NOT-DEFINED";
                    newRow.push(
                        {
                            name: key,
                            val: displayValue,
                            objId: rowSequence,
                            eventHandler: "",
                            sequence: columnSequence,
                            columnCss: columnConfig.columnCss,
                            visibility: columnConfig.visibility,
                            htmlControlType: columnConfig.htmlControlType,
                            togglable: columnConfig.togglable,
                            allowGridLevelEdit: columnConfig.allowGridLevelEdit,
                            dataSourceAddress: columnConfig.dataSourceAddress,
                            dataSource: columnConfig.dataSource ? columnConfig.dataSource.map((obj) => obj[dataSourceAddressColumn]) : [],

                        });
                }
            }

            sortedRow = this.sortBySequence(newRow);

            result.push({Id: rowSequence, collapsed: true, inlineEditEnabled: false, cells: sortedRow});
            rowSequence++;
        }

        return result;
    }

    extractHeaderNew(modelName:string,inputObjs:Array<any>, mainConfig:any):Array<any> {
        var formTypes=mainConfig.Definitions.find(x=>x.ModelName===modelName);
        var headerRow:Array<any>;
        var row:any;
        var sequence:number = 0;
        if (inputObjs) {
            row = inputObjs[0];
            headerRow = new Array<any>();

            for (var key in row) {
                var columnConfig = formTypes.ColumnDefinitions.find(x=>x.dbColumnName.toLowerCase() === key.toLowerCase());
                if (columnConfig != undefined && row.hasOwnProperty(key)) {

                    sequence = formTypes.ColumnConfiguration.map(function(x) {return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());

                    headerRow.push(
                        {
                            val: columnConfig.displayName,
                            columnCss: columnConfig.columnCss,
                            name: key,
                            sequence: sequence,
                            sortCss: "",
                            visibility: columnConfig.visibility,
                            filter: ""
                        });
                    sequence++;
                }
            }
        }
        else {
            headerRow = this.extractHeaderFromConfig(formTypes);
        }

        return headerRow;
    }

    extractMatrixNew(modelName:string,inputObjs:Array<any>, mainConfig:any):Array<any> {
        var formTypes=mainConfig.Definitions.find(x=>x.ModelName===modelName);
        var result:Array<any> = new Array<any>();
        var length = inputObjs.length;
        var newRow:Array<any>;
        var columnSequence:number = 0;
        var rowSequence:number = 0;
        for (var i = 0; i < length; i++) {
            newRow = new Array<any>();
            var row = inputObjs[i];

            for (var key in row) {
                var columnConfig = formTypes.ColumnDefinitions.find(x=>x.dbColumnName.toLowerCase() === key.toLowerCase());
                var show = columnConfig.visibility;
                if (row.hasOwnProperty(key)) {
                    //if (show) {
                    var displayValue = undefined;
                    if (columnConfig.dataSourceAddress) {
                        var lookupTable = columnConfig.dataSource;
                        var dataSourceAddressColumnName = columnConfig.dataSourceAddress.dbColumnName;
                        var lookupRow = lookupTable.find(function (x) {
                            return row[key] === x[dataSourceAddressColumnName];
                        })
                        var displayColumnName = columnConfig.dataSourceAddress.displayColumnName;
                        if (lookupRow == undefined) {
                            displayValue = row[key];
                        }
                        else {
                            displayValue = lookupRow[displayColumnName];
                        }
                    }
                    if (displayValue === undefined) {
                        displayValue = row[key];
                    }

                    columnSequence = formTypes.ColumnConfiguration.map(function(x) {return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());

                    var dataSourceAddressColumn = columnConfig.dataSource ? columnConfig.dataSourceAddress.displayColumnName : "COLUMN-NOT-DEFINED";
                    newRow.push(
                        {
                            name: key,
                            val: displayValue,
                            objId: rowSequence,
                            eventHandler: "",
                            sequence: columnSequence,
                            columnCss: columnConfig.columnCss,
                            visibility: columnConfig.visibility,
                            htmlControlType: columnConfig.htmlControlType,
                            togglable: columnConfig.togglable,
                            allowGridLevelEdit: columnConfig.allowGridLevelEdit,
                            dataSourceAddress: columnConfig.dataSourceAddress,
                            dataSource: columnConfig.dataSource ? columnConfig.dataSource.map((obj) => obj[dataSourceAddressColumn]) : [],

                        });
                }
            }
            result.push({Id: rowSequence, collapsed: true, inlineEditEnabled: false, cells: newRow});
            rowSequence++;
        }

        return result;
    }

    editMatrixNew(modelName:string,editableRow:Array<any>, labels:Array<any>, mainConfig:any):Array<any> {
        var formTypes=mainConfig.Definitions.find(x=>x.ModelName===modelName);
        var result:Array<any> = new Array<any>();
        var length:number = labels.length;
        var controlSequence = 0;
        for (var i = 0; i < length; i++) {
            var cell = labels[i];
            var lableValue = editableRow.find(function (x) {
                return x.sequence === cell.sequence
            });
            var columnConfig = formTypes.ColumnDefinitions.find(x=>x.dbColumnName.toLowerCase() === cell.name.toLowerCase());
            if (columnConfig === undefined) {
                continue;
            }
            var lookUp:any = columnConfig.htmlControlType;
            var castedvalue:any;
            if (lookUp === "checkbox") castedvalue = Boolean(lableValue.val);
            else castedvalue = lableValue.val;
            var dataSourceAddressColumn = columnConfig.dataSource ? columnConfig.dataSourceAddress.displayColumnName : "COLUMN-NOT-DEFINED";
            result.push({
                    objId: lableValue.objId,
                    label: cell.val,
                    name: cell.name,
                    val: castedvalue,
                    htmlControlType: columnConfig.htmlControlType,
                    isStateType: columnConfig.isStateType,
                    columnCss: columnConfig.columnCss,
                    required: true,
                    sequence: controlSequence,
                    dataSource: columnConfig.dataSource ? columnConfig.dataSource.map((obj) => obj[dataSourceAddressColumn]) : [],
                    visibility: columnConfig.visibility,
                    togglable: columnConfig.togglable,
                    isComplexTypeInlineTemplate: columnConfig.isComplexTypeInlineTemplate,
                    isComplexTypeInlineTemplateConfig: columnConfig.isComplexTypeInlineTemplateConfig,
                }
            )
            controlSequence++;
        }
        return result;
    }

    editMatrix(editableRow:Array<any>, labels:Array<any>, formTypes:any):Array<any> {
        var result:Array<any> = new Array<any>();
        var length:number = labels.length;
        var controlSequence = 0;
        for (var i = 0; i < length; i++) {
            var cell = labels[i];
            var lableValue = editableRow.find(function (x) {
                return x.sequence === cell.sequence
            });
            var columnConfig = formTypes.ColumnConfiguration.find(x=>x.dbColumnName.toLowerCase() === cell.name.toLowerCase());
            if (columnConfig === undefined) {
                continue;
            }
            var lookUp:any = columnConfig.htmlControlType;
            var castedvalue:any;
            if (lookUp === "checkbox") castedvalue = Boolean(lableValue.val);
            else castedvalue = lableValue.val;
            var dataSourceAddressColumn = columnConfig.dataSource ? columnConfig.dataSourceAddress.displayColumnName : "COLUMN-NOT-DEFINED";
            result.push({
                    objId: lableValue.objId,
                    label: cell.val,
                    name: cell.name,
                    val: castedvalue,
                    htmlControlType: columnConfig.htmlControlType,
                    isStateType: columnConfig.isStateType,
                    columnCss: columnConfig.columnCss,
                    required: true,
                    sequence: controlSequence,
                    dataSource: columnConfig.dataSource ? columnConfig.dataSource.map((obj) => obj[dataSourceAddressColumn]) : [],
                    visibility: columnConfig.visibility,
                    togglable: columnConfig.togglable,
                    isComplexTypeInlineTemplate: columnConfig.isComplexTypeInlineTemplate,
                    isComplexTypeInlineTemplateConfig: columnConfig.isComplexTypeInlineTemplateConfig,
                }
            )
            controlSequence++;
        }
        return result;
    }

    viewMatrix(editableRow:Array<any>, labels:Array<any>, formTypes:Array<any>, databaseRecords:Array<any>):Array<any> {
        var result:Array<any>;
        result = new Array<any>();
        var rowId = editableRow[0].objId;
        var row = databaseRecords[rowId];
        for (var lbl in labels) {
            var lblValue = labels[lbl];
            var lookUp:any = formTypes[lblValue.name].htmlControlType;
            var castedvalue:any;
            if (lookUp === "checkbox") castedvalue = Boolean(row[lblValue.name]);
            else castedvalue = row[lblValue.name];
            result.push({
                    label: lblValue.val,
                    name: lblValue.name,
                    val: castedvalue,
                    htmlControlType: formTypes[lblValue.name].htmlControlType,
                    isStateType: formTypes[lblValue.name].isStateType,
                    columnCss: formTypes[lblValue.name].columnCss,
                    visibility: formTypes[lblValue.name].visibility,
                    togglable: formTypes[lblValue.name].togglable
                }
            )
        }
        return result;
    }

    addMatrix(labels:Array<any>, formTypes:any):Array<any> {
        var result:Array<any> = new Array<any>();
        var length:number = labels.length;
        var controlSequence = 0;
        for (var i = 0; i < length; i++) {
            var cell = labels[i];
            //var lableValue = "";
            var temp = formTypes.ColumnConfiguration.find(x=>x.dbColumnName.toLowerCase() === cell.name.toLowerCase());//formTypes[cell.name];
            if (temp === undefined) {
                continue;
            }
            var lookUp:any = temp.htmlControlType;//formTypes[cell.name].htmlControlType;
            var castedvalue:any;
            if (lookUp === "checkbox") castedvalue = false;
            else castedvalue = "";
            var dataSourceAddressColumn = temp.dataSource ? temp.dataSourceAddress.displayColumnName : "COLUMN-NOT-DEFINED";
            result.push({
                    objId: 0,//lableValue.objId,
                    label: cell.val,
                    name: cell.name,
                    val: castedvalue,
                    htmlControlType: temp.htmlControlType,
                    isStateType: temp.isStateType,
                    columnCss: temp.columnCss,
                    required: temp.visibility,
                    sequence: controlSequence,
                    dataSource: temp.dataSource ? temp.dataSource.map((obj) => obj[dataSourceAddressColumn]) : [],
                    visibility: temp.visibility
                }
            )
            controlSequence++;
        }
        return result;
    }

    parseTree(dataList:any):any {
        var mainObject={};
        for (var dataKey in dataList) {
            var obj = dataList[dataKey]
            var see = (typeof obj);
            if ((typeof obj) === 'object') {
                if( Object.prototype.toString.call(obj) === '[object Array]' ) {
                    var childObject = obj.elementList;
                    /* var mainPage = this.extractMatrix(childObject, config);
                     var mainHeader = this.extractHeader(childObject, config);
                     var formData = this.vmMatrix.editMatrix(this.mainPage[0].cells, this.mainHeader, this.mainConfig);*/
                    this.treeArray.push({
                        modelName:dataKey,
                        type:"node",
                        name:dataKey,
                        elementList:obj,
                        visible:false,
                    })
                }
                else{
                    var rootObjects = this.parseTree(obj);
                    this.treeArray.push({
                        type:"leaf",
                        mainPageObject:rootObjects,
                        name:"root leaves",
                        modelName:dataKey,
                    });
                }
            }
            else {
                mainObject[dataKey]=dataList[dataKey];
            }
        }
        return mainObject;
    }

    extractNodes(dataList:any):Array<any> {
        this.treeArray = new Array<any>();
        this.parseTree(dataList);
        return this.treeArray;
    }

    sortBySequence(inputArray: any): Array<any>{

        var sortedArray: any = inputArray.sort((n1, n2) => {

            if (n1.sequence > n2.sequence) {
                return 1;
            }
            if (n1.sequence < n2.sequence) {
                return -1;
            }
            return 0;
        });
        return sortedArray;
    }
}
