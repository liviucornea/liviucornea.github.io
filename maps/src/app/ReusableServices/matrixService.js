"use strict";
var core_1 = require("@angular/core");
var apiService_1 = require("./apiService");
var alertService_1 = require("./alertService");
var Subject_1 = require("rxjs/Subject");
/*
the attributes for configuration are coming from *ControlConfig.ts files (usually) in case that an attribute like isVisible is set to false ...
than that object(textbox, data etc) will be invisible wherever is used(form builder or display grid) but you can ovewrite it,
by forcing attributes: "isAlwaysVisibleOn": ["FormBuilder"] and than even if the setting is for visible = false, it will be visible on FormBuilder component
*/
var matrixService = (function () {
    function matrixService(apiService, alert) {
        this.apiService = apiService;
        this.alert = alert;
        this.pageIsLoaded = false;
        this.treeViewBlockCount = 1;
        this.treeParseLevel = 1;
        this.resetCheckBoxList = new Subject_1.Subject();
        this.modelObjects = new Array();
        this.inputClickedEvent = new core_1.EventEmitter();
    }
    matrixService.prototype.inputClicked = function (input) {
        this.inputClickedEvent.emit(input);
    };
    matrixService.prototype.extractMultiHeader = function (inputObjs, formTypes) {
        var finalArray = new Array();
        var arrayHeaders = new Array();
        var arrayObjects = new Array();
        for (var line in inputObjs) {
            var subData = inputObjs[line];
            var subConfig = formTypes[line];
            var header = this.extractHeader(subData, subConfig);
            var data = this.extractMatrix(subData, subConfig);
            finalArray.push({ headerSet: header, dataSet: data });
        }
        ;
        return finalArray;
    };
    matrixService.prototype.extractHeader = function (inputObjs, formTypes) {
        var headerRow;
        var row;
        var sequence = 0;
        if (inputObjs) {
            if (inputObjs.length > 0) {
                row = inputObjs[0];
                headerRow = new Array();
                for (var key in row) {
                    var columnConfig = formTypes.ColumnConfiguration.find(function (x) { return x.dbColumnName.toLowerCase() === key.toLowerCase(); });
                    if (columnConfig != undefined && row.hasOwnProperty(key)) {
                        sequence = formTypes.ColumnConfiguration.map(function (x) { return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());
                        headerRow.push({
                            val: columnConfig.displayName,
                            columnCss: columnConfig.columnCss,
                            name: key,
                            sequence: sequence,
                            sortCss: "",
                            isVisible: columnConfig.isVisible,
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
    };
    matrixService.prototype.extractFooter = function (inputObjs, formTypes) {
        var footerRow;
        var row;
        var sequence = 0;
        if (inputObjs) {
            if (inputObjs.length > 0) {
                row = inputObjs[0];
                footerRow = new Array();
                for (var key in row) {
                    var columnConfig = formTypes.ColumnConfiguration.find(function (x) { return x.dbColumnName.toLowerCase() === key.toLowerCase(); });
                    if (columnConfig != undefined && row.hasOwnProperty(key)) {
                        sequence = formTypes.ColumnConfiguration.map(function (x) { return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());
                        var isTotalVisible = columnConfig.isTotalVisible ? columnConfig.isTotalVisible : false;
                        var columnFormat = columnConfig.columnFormat ? columnConfig.columnFormat : "";
                        footerRow.push({
                            val: "",
                            columnCss: columnConfig.columnCss,
                            name: key,
                            sequence: sequence,
                            columnFormat: columnFormat,
                            isVisible: columnConfig.isVisible,
                            htmlControlType: columnConfig.htmlControlType,
                            isTotalVisible: isTotalVisible
                        });
                    }
                }
            }
            else {
                footerRow = this.extractHeaderFromConfig(formTypes);
            }
        }
        return this.sortBySequence(footerRow);
    };
    matrixService.prototype.extractFilter = function (inputObjs, formTypes) {
        var headerRow;
        var row;
        var sequence = 0;
        if (inputObjs.length) {
            row = inputObjs[0];
            headerRow = new Array();
            for (var key in row) {
                var columnConfig = formTypes.ColumnConfiguration.find(function (x) { return x.dbColumnName.toLowerCase() === key.toLowerCase(); });
                if (columnConfig != undefined && row.hasOwnProperty(key)) {
                    sequence = formTypes.ColumnConfiguration.map(function (x) { return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());
                    headerRow.push({
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
        return this.sortBySequence(headerRow);
    };
    matrixService.prototype.extractViewHeader = function (inputObjs, formTypes) {
        var headerRow = new Array();
        if (inputObjs) {
            var row = inputObjs[0];
            var sequence = 0;
            for (var key in row) {
                var columnConfig = formTypes.ColumnConfiguration.find(function (x) { return x.dbColumnName.toLowerCase() === key.toLowerCase(); });
                if (columnConfig != undefined && row.hasOwnProperty(key)) {
                    sequence = formTypes.ColumnConfiguration.map(function (x) { return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());
                    headerRow.push({
                        columnCss: columnConfig.columnCss,
                        val: columnConfig.displayName,
                        name: key,
                        sequence: sequence,
                        sortCss: "",
                        isVisible: columnConfig.isVisible
                    });
                }
            }
        }
        else {
            headerRow = this.extractHeaderFromConfig(formTypes);
        }
        return headerRow;
    };
    matrixService.prototype.extractHeaderFromConfig = function (formTypes) {
        var headerRow = new Array();
        var sequence = 0;
        //When no records exists create the grid from control configuration array
        if (formTypes.ColumnConfiguration != undefined && formTypes.ColumnConfiguration.length > 0) {
            formTypes.ColumnConfiguration.forEach(function (x) {
                headerRow.push({
                    val: x.displayName,
                    columnCss: x.columnCss,
                    name: x.dbColumnName,
                    sequence: sequence,
                    sortCss: "",
                    isVisible: x.isVisible
                });
                sequence++;
            });
        }
        return headerRow;
    };
    matrixService.prototype.extractMatrix = function (inputObjs, formTypes) {
        var result = new Array();
        var sortedRow = new Array();
        var length = inputObjs.length;
        var newRow;
        var columnSequence = 0;
        var rowSequence = 0;
        var primaryKeyColumn;
        var primaryKeyNameValue = {};
        this.pageIsLoaded = false;
        if (formTypes.PrimaryKeyColumn) {
            primaryKeyColumn = formTypes.PrimaryKeyColumn.toLowerCase();
        }
        for (var i = 0; i < length; i++) {
            newRow = new Array();
            var row = inputObjs[i];
            for (var key in row) {
                var columnConfig = formTypes.ColumnConfiguration.find(function (x) { return x.dbColumnName.toLowerCase() === key.toLowerCase(); });
                if (columnConfig != undefined && row.hasOwnProperty(key)) {
                    var displayDescription = "";
                    if (columnConfig.dataSourceAddress) {
                        var lookupTable = columnConfig.dataSource;
                        var dataSourceAddressColumnName = columnConfig.dataSourceAddress.dbColumnName;
                        var lookupRow = lookupTable.find(function (x) {
                            return row[key] === x[dataSourceAddressColumnName];
                        });
                        var displayColumnName = columnConfig.dataSourceAddress.displayColumnName;
                        if (lookupRow == undefined) {
                            displayDescription = row[key];
                        }
                        else {
                            displayDescription = lookupRow[displayColumnName];
                        }
                    }
                    var displayValue = row[key];
                    if (key.toLowerCase() == "id" || key.toLowerCase() == primaryKeyColumn) {
                        primaryKeyNameValue = { name: key.toLowerCase(), value: displayValue };
                    }
                    columnSequence = formTypes.ColumnConfiguration.map(function (x) { return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());
                    var columnFormat = columnConfig.columnFormat ? columnConfig.columnFormat : "";
                    newRow.push({
                        name: key,
                        val: displayValue,
                        displayDescription: displayDescription,
                        objId: rowSequence,
                        eventHandler: "",
                        sequence: columnSequence,
                        columnCss: columnConfig.columnCss,
                        columnFormat: columnFormat,
                        isVisible: columnConfig.isVisible,
                        htmlControlType: columnConfig.htmlControlType,
                        isRequired: columnConfig.isRequired,
                        isToggleable: columnConfig.isToggleable,
                        isAllowGridLevelEdit: columnConfig.isAllowGridLevelEdit,
                        dataSourceAddress: columnConfig.dataSourceAddress,
                        dataSource: columnConfig.dataSource ? this.getArrayDataSource(columnConfig.dataSource, columnConfig.dataSourceAddress["displayColumnName"], columnConfig.dataSourceAddress["dbColumnName"], columnConfig.dataSourceAddress["defaultValue"]) : [],
                        customdataSource: columnConfig.customdataSource ? this.getArrayDataSource(columnConfig.customdataSource, columnConfig.dataSourceAddress["displayColumnName"], columnConfig.dataSourceAddress["dbColumnName"], columnConfig.dataSourceAddress["defaultValue"]) : [],
                    });
                }
            }
            sortedRow = this.sortBySequence(newRow);
            result.push({ Id: rowSequence, primaryKey: primaryKeyNameValue, collapsed: true, inlineEditEnabled: false,
                cells: sortedRow, checkBox: { checked: false, disabled: false }, childData: row.childData });
            rowSequence++;
        }
        this.pageIsLoaded = true;
        return result;
    };
    matrixService.prototype.getDropDownIdValue = function (dataSource, DescriptionColumn, ValueColumn, ActualValue) {
        var IdValue;
        if (dataSource) {
            var temp = dataSource.find(function (p) { return p[DescriptionColumn] == ActualValue; });
            if (temp) {
                IdValue = temp[ValueColumn];
            }
        }
        return IdValue;
    };
    matrixService.prototype.getArrayDataSource = function (dataSource, DescriptionColumn, ValueColumn, defaultValue) {
        var result = [];
        if (defaultValue) {
            defaultValue.forEach(function (x) {
                result.push({
                    Description: x["Name"],
                    Value: x["Value"]
                });
            });
        }
        if (dataSource) {
            dataSource.forEach(function (x) {
                result.push({
                    Description: x[DescriptionColumn],
                    Value: x[ValueColumn]
                });
            });
        }
        return result;
    };
    matrixService.prototype.bindCustomDropDown = function (dropDown, data) {
        dropDown.customdataSource = this.getArrayDataSource(data, dropDown.dataSourceAddress["displayColumnName"], dropDown.dataSourceAddress["dbColumnName"], dropDown.dataSourceAddress["defaultValue"]);
        if (dropDown.dataSourceAddress["defaultValue"]) {
            var defaultItem = dropDown.customdataSource.find(function (x) { return x.Value == dropDown.dataSourceAddress["defaultValue"][0].Value; });
            dropDown.val = defaultItem.Value;
        }
    };
    matrixService.prototype.bindCustomCheckBoxList = function (checkBoxList, data) {
        var result = [];
        if (data) {
            data.forEach(function (x) {
                result.push({
                    Description: x[checkBoxList.dataSourceAddress["displayColumnName"]],
                    Value: x[checkBoxList.dataSourceAddress["dbColumnName"]],
                    Checked: data.Checked ? data.Checked : false
                });
            });
        }
        checkBoxList.dataSource = result;
        this.resetCheckBoxList.next(false);
    };
    matrixService.prototype.editMatrix = function (editableRow, labels, formTypes) {
        var result = new Array();
        var length = labels.length;
        var controlSequence = 0;
        for (var i = 0; i < length; i++) {
            var cell = labels[i];
            var labelValue = editableRow.find(function (x) {
                return x.sequence === cell.sequence;
            });
            var columnConfig = formTypes.ColumnConfiguration.find(function (x) { return x.dbColumnName.toLowerCase() === cell.name.toLowerCase(); });
            if (columnConfig === undefined) {
                continue;
            }
            var dbColumnName = "";
            if (columnConfig.dataSource) {
                dbColumnName = this.getdbColumnNameForDataSourceAddress(columnConfig.dataSourceAddress);
            }
            if (columnConfig.htmlControlType.toLowerCase() == 'customselect' && columnConfig.dataSource) {
                var associatedControl;
                if (formTypes.ColumnDefinitions) {
                    associatedControl = formTypes.ColumnDefinitions.find(function (x) { return x.dbColumnName === columnConfig.associatedDropdownControl; });
                }
                else {
                    associatedControl = formTypes.ColumnConfiguration.find(function (x) { return x.dbColumnName === columnConfig.associatedDropdownControl; });
                }
                var dropDowndata = columnConfig.dataSource.find(function (p) { return p[dbColumnName] === cell.val; });
                columnConfig.customdataSource = columnConfig.dataSource;
                if (associatedControl) {
                    //Update the custom dataSource for associated control
                    var dropDownId = 0;
                    if (dropDowndata) {
                        dropDownId = dropDowndata[columnConfig.dataSourceAddress.dbColumnName];
                    }
                    if (dropDowndata[columnConfig.dataSourceAddress.PrimaryKeyColumn]) {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(function (c) { return c[associatedControl.dataSourceAddress.ForeignKeyColumn] == dropDownId; });
                    }
                    else {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(function (c) { return c[associatedControl.dataSourceAddress.dbColumnName] == dropDownId; });
                    }
                    var tempAssociatedRecord = result.find(function (p) { return p.name.toLowerCase() == associatedControl.dbColumnName.toLowerCase(); });
                    if (tempAssociatedRecord) {
                        var tempdbColumnName = this.getdbColumnNameForDataSourceAddress(tempAssociatedRecord.dataSourceAddress);
                        tempAssociatedRecord.customdataSource = this.getArrayDataSource(associatedControl.customdataSource, tempAssociatedRecord.dataSourceAddress["displayColumnName"], tempdbColumnName, tempAssociatedRecord.dataSourceAddress["defaultValue"]);
                    }
                }
            }
            var lookUp = columnConfig.htmlControlType;
            var castedValue;
            if (lookUp === "checkbox")
                castedValue = Boolean(labelValue.val);
            else
                castedValue = labelValue.val;
            var htmlObjSettings = {
                objId: labelValue.objId,
                label: cell.val,
                name: cell.name,
                val: castedValue,
                htmlControlType: columnConfig.htmlControlType,
                isStateType: columnConfig.isStateType,
                columnCss: columnConfig.columnCss,
                isRequired: columnConfig.isRequired,
                sequence: controlSequence,
                isVisible: columnConfig.isVisible,
                readOnly: columnConfig.readOnly,
                isToggleable: columnConfig.isToggleable,
                isComplexTypeInlineTemplate: columnConfig.isComplexTypeInlineTemplate,
                isComplexTypeInlineTemplateConfig: columnConfig.isComplexTypeInlineTemplateConfig,
                dataSourceAddress: columnConfig.dataSourceAddress,
                dataSource: columnConfig.dataSource ? this.getArrayDataSource(columnConfig.dataSource, columnConfig.dataSourceAddress["displayColumnName"], dbColumnName, columnConfig.dataSourceAddress["defaultValue"]) : [],
                customdataSource: columnConfig.customdataSource ? this.getArrayDataSource(columnConfig.customdataSource, columnConfig.dataSourceAddress["displayColumnName"], dbColumnName, columnConfig.dataSourceAddress["defaultValue"]) : [],
                masterdataSource: columnConfig.dataSource,
                isAlwaysVisibleOn: columnConfig.isAlwaysVisibleOn ? columnConfig.isAlwaysVisibleOn : []
            };
            result.push(htmlObjSettings);
            controlSequence++;
        }
        return result;
    };
    matrixService.prototype.viewMatrix = function (editableRow, labels, formTypes, databaseRecords) {
        var result = new Array();
        var length = labels.length;
        var controlSequence = 0;
        for (var i = 0; i < length; i++) {
            var cell = labels[i];
            var labelValue = editableRow.find(function (x) {
                return x.sequence === cell.sequence;
            });
            var columnConfig = formTypes.ColumnConfiguration.find(function (x) { return x.dbColumnName.toLowerCase() === cell.name.toLowerCase(); });
            if (columnConfig === undefined) {
                continue;
            }
            var lookUp = columnConfig.htmlControlType;
            var castedValue;
            if (lookUp === "checkbox")
                castedValue = Boolean(labelValue.val);
            else
                castedValue = labelValue.val;
            result.push({
                objId: labelValue.objId,
                label: cell.val,
                name: cell.name,
                val: castedValue,
                htmlControlType: columnConfig.htmlControlType,
                isStateType: columnConfig.isStateType,
                columnCss: columnConfig.columnCss,
                isVisible: columnConfig.isVisible,
                readOnly: columnConfig.readOnly,
                isToggleable: columnConfig.isToggleable
            });
        }
        return result;
    };
    matrixService.prototype.getFormBuilderControls = function (formTypes) {
        var result = new Array();
        var length = formTypes.ColumnConfiguration.length;
        var controlSequence = 0;
        for (var i = 0; i < length; i++) {
            var columnConfig = formTypes.ColumnConfiguration[i];
            var dbColumnName = "";
            if (columnConfig.dataSource) {
                dbColumnName = this.getdbColumnNameForDataSourceAddress(columnConfig.dataSourceAddress);
            }
            if (columnConfig.htmlControlType.toLowerCase() == 'customselect' && columnConfig.dataSource) {
                var associatedControl;
                if (formTypes.ColumnDefinitions) {
                    associatedControl = formTypes.ColumnDefinitions.find(function (x) { return x.dbColumnName === columnConfig.associatedDropdownControl; });
                }
                else {
                    associatedControl = formTypes.ColumnConfiguration.find(function (x) { return x.dbColumnName === columnConfig.associatedDropdownControl; });
                }
                var dropDowndata = columnConfig.dataSource;
                columnConfig.customdataSource = columnConfig.dataSource;
                if (associatedControl) {
                    //Update the custom dataSource for associated control
                    var dropDownId = 0;
                    if (dropDowndata) {
                        dropDownId = dropDowndata[columnConfig.dataSourceAddress.dbColumnName];
                    }
                    if (dropDowndata[columnConfig.dataSourceAddress.PrimaryKeyColumn]) {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(function (c) { return c[associatedControl.dataSourceAddress.ForeignKeyColumn] == dropDownId; });
                    }
                    else {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(function (c) { return c[associatedControl.dataSourceAddress.dbColumnName] == dropDownId; });
                    }
                    var tempAssociatedRecord = result.find(function (p) { return p.name.toLowerCase() == associatedControl.dbColumnName.toLowerCase(); });
                    if (tempAssociatedRecord) {
                        var tempdbColumnName = this.getdbColumnNameForDataSourceAddress(tempAssociatedRecord.dataSourceAddress);
                        tempAssociatedRecord.customdataSource = this.getArrayDataSource(associatedControl.customdataSource, tempAssociatedRecord.dataSourceAddress["displayColumnName"], tempdbColumnName, tempAssociatedRecord.dataSourceAddress["defaultValue"]);
                    }
                }
            }
            var lookUp = columnConfig.htmlControlType;
            var castedValue;
            if (lookUp === "checkbox")
                castedValue = false;
            else
                castedValue = "";
            var htmlObjSettings = {
                objId: 0,
                label: columnConfig.displayName,
                name: columnConfig.dbColumnName,
                val: castedValue,
                htmlControlType: columnConfig.htmlControlType,
                isStateType: columnConfig.isStateType,
                columnCss: columnConfig.columnCss,
                sequence: controlSequence,
                isVisible: columnConfig.isVisible,
                readOnly: columnConfig.readOnly,
                dataSourceAddress: columnConfig.dataSourceAddress,
                dataSource: columnConfig.dataSource ? this.getArrayDataSource(columnConfig.dataSource, columnConfig.dataSourceAddress["displayColumnName"], columnConfig.dataSourceAddress["dbColumnName"], columnConfig.dataSourceAddress["defaultValue"]) : [],
                customdataSource: columnConfig.customdataSource ? this.getArrayDataSource(columnConfig.customdataSource, columnConfig.dataSourceAddress["displayColumnName"], columnConfig.dataSourceAddress["dbColumnName"], columnConfig.dataSourceAddress["defaultValue"]) : [],
                masterdataSource: columnConfig.dataSource,
                isAlwaysVisibleOn: columnConfig.isAlwaysVisibleOn ? columnConfig.isAlwaysVisibleOn : []
            };
            if (formTypes.FormValidationRules) {
                var colFormValidationSettings = formTypes.FormValidationRules.find(function (x) { return x.dbColumnName.toLowerCase() === columnConfig.dbColumnName.toLowerCase(); });
                if (colFormValidationSettings) {
                    this.applyFormValidationRules(htmlObjSettings, colFormValidationSettings);
                }
            }
            result.push(htmlObjSettings);
            controlSequence++;
        }
        return result;
    };
    matrixService.prototype.applyFormValidationRules = function (objTarget, rulesToApply) {
        for (var key in rulesToApply["builtInValidators"]) {
            if (rulesToApply["builtInValidators"].hasOwnProperty(key)) {
                var val = rulesToApply["builtInValidators"][key];
                objTarget[key] = val;
            }
        }
    };
    matrixService.prototype.sortBySequence = function (inputArray) {
        var sortedArray = inputArray.sort(function (n1, n2) {
            if (n1.sequence > n2.sequence) {
                return 1;
            }
            if (n1.sequence < n2.sequence) {
                return -1;
            }
            return 0;
        });
        return sortedArray;
    };
    matrixService.prototype.parseTree = function (dataList) {
        var mainObject = {};
        for (var dataKey in dataList) {
            var obj = dataList[dataKey];
            var configObj = this.modelObjects.find(function (x) { return x.modelName === dataKey; });
            if (((typeof obj) === 'object') && (obj)) {
                this.skipList.push(dataKey + "_Id");
                var emptyModelObj = JSON.parse(JSON.stringify(configObj.emptyModel));
                var primaryKey = dataKey + "_Id";
                if (obj.length) {
                    var tmpObj = obj[0];
                    for (var x in tmpObj) {
                        if (x.endsWith("_Id")) {
                            if (x !== primaryKey) {
                                emptyModelObj[x] = tmpObj[x];
                            }
                        }
                    }
                }
                else {
                    emptyModelObj[primaryKey] = obj[primaryKey];
                }
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    this.treeArray.push({
                        modelName: dataKey,
                        type: "node",
                        name: dataKey,
                        elementList: obj,
                        visible: false,
                        blockSequence: this.treeViewBlockCount,
                        blankModel: emptyModelObj,
                        blankModelConfig: configObj.configObjects,
                        expanded: configObj.Expanded,
                        level: configObj.level,
                        tabOrder: configObj.tabOrder
                    });
                }
                else {
                    var rootObjects = this.parseTree(obj);
                    obj["blockSequence"] = this.treeViewBlockCount;
                    this.treeArray.push({
                        type: "leaf",
                        mainPageObject: rootObjects,
                        name: "root leaves",
                        modelName: dataKey,
                        blankModel: emptyModelObj,
                        blankModelConfig: configObj.configObjects,
                        blockSequence: this.treeViewBlockCount,
                        expanded: configObj.Expanded,
                        level: configObj.level,
                        tabOrder: configObj.tabOrder
                    });
                    this.treeViewBlockCount++;
                }
            }
            else {
                mainObject[dataKey] = dataList[dataKey];
            }
        }
        if (!this.skipList.find(function (x) { return x === "Action"; })) {
            this.skipList.push("Action");
        }
        if (!this.skipList.find(function (x) { return x === "blockSequence"; })) {
            this.skipList.push("blockSequence");
        }
        return mainObject;
    };
    matrixService.prototype.extractNodes = function (dataList, configFile) {
        this.treeArray = new Array();
        this.skipList = new Array();
        this.modelObjects = new Array();
        this.extractModels(configFile);
        this.extractBlankModels();
        this.parseTree(dataList);
        return { "treeArray": this.treeArray, "skipList": this.skipList };
    };
    matrixService.prototype.extractNodesLight = function (dataList) {
        this.treeArray = new Array();
        this.parseTree(dataList);
        return { "treeArray": this.treeArray, "skipList": this.skipList };
    };
    matrixService.prototype.extractModels = function (configFile) {
        var _this = this;
        configFile.Definitions.forEach(function (x) {
            _this.modelObjects.push({ "modelName": x.ModelName, "Expanded": x.Expanded, "level": x.Level, "tabOrder": x.TabOrder, "configObjects": x.ColumnDefinitions });
        });
    };
    matrixService.prototype.extractBlankModels = function () {
        var emptyObject;
        this.modelObjects.forEach(function (x) {
            emptyObject = Object.create(Object.prototype);
            x.configObjects.forEach(function (xx) {
                emptyObject[xx.dbColumnName] = "";
            });
            x["emptyModel"] = emptyObject;
        });
    };
    matrixService.prototype.resetTreeViewBlockCount = function () {
        this.treeViewBlockCount = 1;
    };
    matrixService.prototype.extractHeaderNew = function (skipList, modelName, inputObjs, mainConfig) {
        var formTypes = mainConfig.Definitions.find(function (x) { return x.ModelName === modelName; });
        if (!formTypes) {
            formTypes = mainConfig;
        }
        var headerRow;
        var row;
        var sequence;
        if (inputObjs) {
            row = inputObjs[0];
            headerRow = new Array();
            sequence = 0;
            for (var key in row) {
                if (skipList.find(function (x) { return x === key; })) {
                    continue;
                }
                var columnConfig = formTypes.ColumnDefinitions.find(function (x) { return x.dbColumnName === key; });
                if (row.hasOwnProperty(key)) {
                    headerRow.push({
                        val: columnConfig.displayName,
                        columnCss: columnConfig.columnCss,
                        name: key,
                        sequence: sequence,
                        sortCss: "",
                        visibility: columnConfig.visibility,
                        filter: "",
                    });
                    sequence++;
                }
            }
        }
        else {
            headerRow = this.extractHeaderFromConfig(formTypes);
        }
        return headerRow;
    };
    matrixService.prototype.extractMatrixNew = function (skipList, modelName, inputObjs, mainConfig) {
        var formTypes = mainConfig.Definitions.find(function (x) { return x.ModelName === modelName; });
        var result = new Array();
        var length = inputObjs.length;
        var newRow;
        var columnSequence = 0;
        var rowSequence = 0;
        var primaryKeyColumn;
        var primaryKeyNameValue = {};
        if (formTypes.PrimaryKeyColumn) {
            primaryKeyColumn = formTypes.PrimaryKeyColumn.toLowerCase();
        }
        for (var i = 0; i < length; i++) {
            newRow = new Array();
            var row = inputObjs[i];
            columnSequence = 0;
            for (var key in row) {
                if (skipList.find(function (x) { return x === key; })) {
                    continue;
                }
                var columnConfig = formTypes.ColumnDefinitions.find(function (x) { return x.dbColumnName === key; });
                if (!columnConfig) {
                    var t = 0;
                }
                var dbColumnName = "";
                if (columnConfig.dataSource) {
                    dbColumnName = this.getdbColumnNameForDataSourceAddress(columnConfig.dataSourceAddress);
                }
                if (row.hasOwnProperty(key)) {
                    var displayValue = undefined;
                    if (columnConfig.dataSourceAddress) {
                        displayValue = this.getDropDownIdValue(columnConfig.dataSource, columnConfig.dataSourceAddress["displayColumnName"], dbColumnName, row[key]);
                    }
                    if (displayValue === undefined) {
                        displayValue = row[key];
                    }
                    if (key.toLowerCase() == "id" || key.toLowerCase() == primaryKeyColumn) {
                        primaryKeyNameValue = { name: key, value: displayValue };
                    }
                    if (columnConfig.htmlControlType.toLowerCase() == 'customselect' && columnConfig.dataSource) {
                        var associatedControl = formTypes.ColumnDefinitions.find(function (x) { return x.dbColumnName === columnConfig.associatedDropdownControl; });
                        var dropDowndata = columnConfig.dataSource.find(function (p) { return p[dbColumnName] === displayValue; });
                        columnConfig.customdataSource = columnConfig.dataSource;
                        if (associatedControl) {
                            //Update the custom dataSource for associated control
                            var dropDownId = 0;
                            if (dropDowndata) {
                                dropDownId = dropDowndata[columnConfig.dataSourceAddress.dbColumnName];
                            }
                            if (dropDowndata && dropDowndata[columnConfig.dataSourceAddress.PrimaryKeyColumn]) {
                                associatedControl.customdataSource = associatedControl.dataSource.filter(function (c) { return c[associatedControl.dataSourceAddress.ForeignKeyColumn] == dropDownId; });
                            }
                            else {
                                associatedControl.customdataSource = associatedControl.dataSource.filter(function (c) { return c[associatedControl.dataSourceAddress.dbColumnName] == dropDownId; });
                            }
                            var tempAssociatedRecord = newRow.find(function (p) { return p.name.toLowerCase() == associatedControl.dbColumnName.toLowerCase(); });
                            if (tempAssociatedRecord) {
                                var tempdbColumnName = this.getdbColumnNameForDataSourceAddress(tempAssociatedRecord.dataSourceAddress);
                                tempAssociatedRecord.customdataSource = this.getArrayDataSource(associatedControl.customdataSource, tempAssociatedRecord.dataSourceAddress["displayColumnName"], tempdbColumnName, tempAssociatedRecord.dataSourceAddress["defaultValue"]);
                            }
                        }
                    }
                    newRow.push({
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
                        dataSource: columnConfig.dataSource ? this.getArrayDataSource(columnConfig.dataSource, columnConfig.dataSourceAddress["displayColumnName"], dbColumnName, columnConfig.dataSourceAddress["defaultValue"]) : [],
                        masterdataSource: columnConfig.dataSource,
                        customdataSource: columnConfig.customdataSource ? this.getArrayDataSource(columnConfig.customdataSource, columnConfig.dataSourceAddress["displayColumnName"], dbColumnName, columnConfig.dataSourceAddress["defaultValue"]) : [],
                        associatedDropdownControl: columnConfig.associatedDropdownControl
                    });
                    columnSequence++;
                }
            }
            result.push({ Id: rowSequence, primaryKey: primaryKeyNameValue, collapsed: true, inlineEditEnabled: false,
                cells: newRow, checkBox: { checked: false, disabled: false }, childData: row.childData });
            rowSequence++;
        }
        return result;
    };
    matrixService.prototype.editMatrixNew = function (skipList, modelName, editableRow, labels, mainConfig) {
        var formTypes = mainConfig.Definitions.find(function (x) { return x.ModelName === modelName; });
        var result = new Array();
        var length = labels.length;
        var controlSequence = 0;
        for (var i = 0; i < length; i++) {
            var cell = labels[i];
            var labelValue = editableRow.find(function (x) {
                return x.sequence === cell.sequence;
            });
            var columnConfig = formTypes.ColumnDefinitions.find(function (x) { return x.dbColumnName === cell.name; });
            if (columnConfig === undefined) {
                continue;
            }
            var lookUp = columnConfig.htmlControlType;
            var castedValue;
            if (lookUp === "checkbox")
                castedValue = Boolean(labelValue.val);
            else
                castedValue = labelValue.val;
            var dbColumnName = "";
            if (columnConfig.dataSource) {
                dbColumnName = this.getdbColumnNameForDataSourceAddress(columnConfig.dataSourceAddress);
            }
            if (columnConfig.htmlControlType.toLowerCase() == 'customselect' && columnConfig.dataSource) {
                var associatedControl = formTypes.ColumnDefinitions.find(function (x) { return x.dbColumnName === columnConfig.associatedDropdownControl; });
                var dropDowndata = columnConfig.dataSource.find(function (p) { return p[dbColumnName] === castedValue; });
                columnConfig.customdataSource = columnConfig.dataSource;
                if (associatedControl) {
                    //Update the custom dataSource for associated control
                    var dropDownId = 0;
                    if (dropDowndata) {
                        dropDownId = dropDowndata[columnConfig.dataSourceAddress.dbColumnName];
                    }
                    if (dropDowndata && dropDowndata[columnConfig.dataSourceAddress.PrimaryKeyColumn]) {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(function (c) { return c[associatedControl.dataSourceAddress.ForeignKeyColumn] == dropDownId; });
                    }
                    else {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(function (c) { return c[associatedControl.dataSourceAddress.dbColumnName] == dropDownId; });
                    }
                    var tempAssociatedRecord = result.find(function (p) { return p.name.toLowerCase() == associatedControl.dbColumnName.toLowerCase(); });
                    if (tempAssociatedRecord) {
                        var tempdbColumnName = this.getdbColumnNameForDataSourceAddress(tempAssociatedRecord.dataSourceAddress);
                        tempAssociatedRecord.customdataSource = this.getArrayDataSource(associatedControl.customdataSource, tempAssociatedRecord.dataSourceAddress["displayColumnName"], tempdbColumnName, tempAssociatedRecord.dataSourceAddress["defaultValue"]);
                    }
                }
            }
            result.push({
                objId: labelValue.objId,
                label: cell.val,
                name: cell.name,
                val: castedValue,
                htmlControlType: columnConfig.htmlControlType,
                isStateType: columnConfig.isStateType,
                columnCss: columnConfig.columnCss,
                required: true,
                sequence: controlSequence,
                dataSource: columnConfig.dataSource ? this.getArrayDataSource(columnConfig.dataSource, columnConfig.dataSourceAddress["displayColumnName"], dbColumnName, columnConfig.dataSourceAddress["defaultValue"]) : [],
                dataSourceAddress: columnConfig.dataSourceAddress,
                masterdataSource: columnConfig.dataSource,
                visibility: columnConfig.visibility ? columnConfig.visibility : true,
                readOnly: columnConfig.readOnly ? columnConfig.readOnly : false,
                togglable: columnConfig.togglable,
                isComplexTypeInlineTemplate: columnConfig.isComplexTypeInlineTemplate,
                isComplexTypeInlineTemplateConfig: columnConfig.isComplexTypeInlineTemplateConfig,
                customdataSource: columnConfig.customdataSource ? this.getArrayDataSource(columnConfig.customdataSource, columnConfig.dataSourceAddress["displayColumnName"], dbColumnName, columnConfig.dataSourceAddress["defaultValue"]) : [],
                associatedDropdownControl: columnConfig.associatedDropdownControl
            });
            controlSequence++;
        }
        return result;
    };
    matrixService.prototype.getdbColumnNameForDataSourceAddress = function (dataSourceAddress) {
        var tempdbColumnName = "";
        if (dataSourceAddress["PrimaryKeyColumn"])
            tempdbColumnName = dataSourceAddress.PrimaryKeyColumn;
        else
            tempdbColumnName = dataSourceAddress.dbColumnName;
        return tempdbColumnName;
    };
    matrixService.prototype.buildJSONObject = function (data, primaryColumnName) {
        var jsonValue = '{ ';
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var dbName = data[i].name;
                var editedValue = JSON.stringify(data[i].val);
                if (primaryColumnName == dbName && (data[i].val == "" || data[i].val == undefined)) {
                    editedValue = JSON.stringify(0);
                }
                (i + 1) == data.length ? jsonValue += "\"" + dbName + "\" : " + editedValue : jsonValue += "\"" + dbName + "\" : " + editedValue + ",";
            }
        }
        jsonValue += ' }';
        return JSON.parse(jsonValue);
    };
    matrixService.prototype.getPrimaryColumnName = function (gridSettings) {
        var primaryKeyColumn = "Id";
        if (gridSettings["PrimaryKeyColumn"] != undefined && gridSettings["PrimaryKeyColumn"] != "") {
            primaryKeyColumn = gridSettings["PrimaryKeyColumn"];
        }
        return primaryKeyColumn;
    };
    matrixService.prototype.showSpecificTab = function (tempContext, tabData, inputHttpProxy) {
        var _this = this;
        if (inputHttpProxy === void 0) { inputHttpProxy = null; }
        var urlList = [];
        var urlListBodyMissing = [];
        if (tempContext.tabBuilderControl) {
            var tabInfo = tempContext.tabControlConfig.TabsList.find(function (p) { return p.TabKey == tabData.TabKey; });
            tabInfo.TabControls.forEach(function (x) {
                if (inputHttpProxy) {
                    x.httpProxy = inputHttpProxy;
                }
                if (x.gridSettings && x.gridSettings.ColumnConfiguration) {
                    x.gridSettings.ColumnConfiguration.forEach(function (p) {
                        if (p.dataSourceAddress && p.dataSourceAddress.tableName && p.dataSourceAddress.dbParameters) {
                            urlList.push({
                                url: p.dataSourceAddress.tableName,
                                body: p.dataSourceAddress.dbParameters
                            });
                        }
                        else if (p.dataSourceAddress && p.dataSourceAddress.tableName && !p.dataSourceAddress.dbParameters) {
                            urlListBodyMissing.push(p.dataSourceAddress.tableName);
                        }
                    });
                }
            });
            //execute with body
            if (urlList && urlList.length) {
                var index = -1;
                this.apiService.fetchMultipleListWithBody(urlList).subscribe(function (res) {
                    tabInfo.TabControls.forEach(function (x) {
                        if (x.gridSettings && x.gridSettings.ColumnConfiguration) {
                            x.gridSettings.ColumnConfiguration.forEach(function (p) {
                                if (p.dataSourceAddress && p.dataSourceAddress.tableName && p.dataSourceAddress.dbParameters) {
                                    ++index;
                                    p.dataSource = res[index];
                                }
                            });
                        }
                    });
                    if (urlListBodyMissing && urlListBodyMissing.length) {
                        _this.applyDataSourceInfoWithNoBody(tempContext, tabInfo, urlListBodyMissing);
                    }
                    else {
                        tempContext.displayTabInfo(tabInfo);
                    }
                }, function (error) {
                    _this.alert.error("Error in retrieving drop down info" + error.status);
                }, function () {
                });
            }
            else if (urlListBodyMissing && urlListBodyMissing.length) {
                //execute api calls without body
                this.applyDataSourceInfoWithNoBody(tempContext, tabInfo, urlListBodyMissing);
            }
            else {
                tempContext.displayTabInfo(tabInfo);
            }
        }
    };
    matrixService.prototype.applyDataSourceInfoWithNoBody = function (tempContext, tabInfo, urlListBodyMissing) {
        var _this = this;
        var index = -1;
        this.apiService.fetchMultipleList(urlListBodyMissing).subscribe(function (res) {
            tabInfo.TabControls.forEach(function (x) {
                x.gridSettings.ColumnConfiguration.forEach(function (p) {
                    if (p.dataSourceAddress && p.dataSourceAddress.tableName && !p.dataSourceAddress.dbParameters) {
                        ++index;
                        p.dataSource = res[index];
                    }
                });
            });
            tempContext.displayTabInfo(tabInfo);
        }, function (error) {
            _this.alert.error("Error in retrieving drop down info" + error.status);
        }, function () {
        });
    };
    matrixService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [apiService_1.ApiService, alertService_1.AlertService])
    ], matrixService);
    return matrixService;
}());
exports.matrixService = matrixService;
//# sourceMappingURL=matrixService.js.map