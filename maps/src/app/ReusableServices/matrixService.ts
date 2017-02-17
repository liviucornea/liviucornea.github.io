import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './apiService';
import { AlertService } from './alertService';
import { Subject } from 'rxjs/Subject';

/*
the attributes for configuration are coming from *ControlConfig.ts files (usually) in case that an attribute like isVisible is set to false ...
than that object(textbox, data etc) will be invisible wherever is used(form builder or display grid) but you can ovewrite it,
by forcing attributes: 'isAlwaysVisibleOn': ['FormBuilder'] and than even if the setting is for visible = false, it will be visible on FormBuilder component
*/

@Injectable()
export class matrixService {
    pageIsLoaded = false;
    inputClickedEvent: EventEmitter<any>;
    treeArray: any;
    skipList: any;
    treeViewBlockCount: number = 1;
    treeParseLevel = 1;
    modelObjects: Array<any>;
    resetCheckBoxList = new Subject();

    constructor(private apiService: ApiService, private alert: AlertService) {
        this.modelObjects = new Array<any>();
        this.inputClickedEvent = new EventEmitter<any>();
    }

    inputClicked(input) {
        this.inputClickedEvent.emit(input);
    }

    extractMultiHeader(inputObjs: Array<any>, formTypes: Array<any>): Array<any> {
        let finalArray = new Array<any>();
        let arrayHeaders = new Array<any>();
        let arrayObjects = new Array<any>();
        for (let line in inputObjs) {
            let subData = inputObjs[line];
            let subConfig = formTypes[line];
            let header = this.extractHeader(subData, subConfig);
            let data = this.extractMatrix(subData, subConfig);
            finalArray.push({ headerSet: header, dataSet: data });
        };
        return finalArray;
    }

    extractHeader(inputObjs: Array<any>, formTypes: any): Array<any> {
        let headerRow: Array<any>;
        let row: any;
        let sequence: number = 0;

        if (inputObjs) {

            if (inputObjs.length > 0) {

                row = inputObjs[0];
                headerRow = new Array<any>();

                for (let key in row) {
                    let columnConfig = formTypes.ColumnConfiguration.find(x => x.dbColumnName.toLowerCase() === key.toLowerCase());
                    if (columnConfig !== undefined && row.hasOwnProperty(key)) {

                        sequence = formTypes.ColumnConfiguration.map(function (x) { return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());

                        headerRow.push(
                            {
                                val: columnConfig.displayName,
                                columnCss: columnConfig.columnCss,
                                name: key,
                                sequence: sequence,
                                sortCss: '',
                                isVisible: columnConfig.isVisible,
                                filter: ''
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

    extractFooter(inputObjs: Array<any>, formTypes: any): Array<any> {
        let footerRow: Array<any>;
        let row: any;
        let sequence: number = 0;

        if (inputObjs) {

            if (inputObjs.length > 0) {

                row = inputObjs[0];
                footerRow = new Array<any>();

                for (let key in row) {
                    let columnConfig = formTypes.ColumnConfiguration.find(x => x.dbColumnName.toLowerCase() === key.toLowerCase());
                    if (columnConfig !== undefined && row.hasOwnProperty(key)) {

                        sequence = formTypes.ColumnConfiguration.map(function (x) { return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());
                        let isTotalVisible = columnConfig.isTotalVisible ? columnConfig.isTotalVisible : false;
                        let columnFormat = columnConfig.columnFormat ? columnConfig.columnFormat : '';

                        footerRow.push(
                            {
                                val: '',
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
    }

    extractFilter(inputObjs: Array<any>, formTypes: any): Array<any> {
        let headerRow: Array<any>;
        let row: any;
        let sequence: number = 0;
        if (inputObjs.length) {
            row = inputObjs[0];
            headerRow = new Array<any>();

            for (let key in row) {
                let columnConfig = formTypes.ColumnConfiguration.find(x => x.dbColumnName.toLowerCase() === key.toLowerCase());
                if (columnConfig !== undefined && row.hasOwnProperty(key)) {

                    sequence = formTypes.ColumnConfiguration.map(function (x) { return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());

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

        return this.sortBySequence(headerRow);
    }

    extractViewHeader(inputObjs: Array<any>, formTypes: any): Array<any> {
        let headerRow: Array<any> = new Array<any>();
        if (inputObjs) {
            let row: any = inputObjs[0];
            let sequence: number = 0;
            for (let key in row) {
                let columnConfig = formTypes.ColumnConfiguration.find(x => x.dbColumnName.toLowerCase() === key.toLowerCase());
                if (columnConfig !== undefined && row.hasOwnProperty(key)) {

                    sequence = formTypes.ColumnConfiguration.map(function (x) { return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());

                    headerRow.push(
                        {
                            columnCss: columnConfig.columnCss,
                            val: columnConfig.displayName,
                            name: key,
                            sequence: sequence,
                            sortCss: '',
                            isVisible: columnConfig.isVisible
                        });
                }
            }
        }
        else {
            headerRow = this.extractHeaderFromConfig(formTypes);
        }
        return headerRow;
    }

    extractHeaderFromConfig(formTypes: any) {
        let headerRow = new Array<any>();
        let sequence: number = 0;
        // When no records exists create the grid from control configuration array
        if (formTypes.ColumnConfiguration !== undefined && formTypes.ColumnConfiguration.length > 0) {
            formTypes.ColumnConfiguration.forEach(function (x) {
                headerRow.push(
                    {
                        val: x.displayName,
                        columnCss: x.columnCss,
                        name: x.dbColumnName,
                        sequence: sequence,
                        sortCss: '',
                        isVisible: x.isVisible
                    });
                sequence++;
            });
        }
        return headerRow;
    }

    extractMatrix(inputObjs: Array<any>, formTypes: any): Array<any> {
        let result: Array<any> = new Array<any>();
        let sortedRow: Array<any> = new Array<any>();
        let length = inputObjs.length;
        let newRow: Array<any>;
        let columnSequence: number = 0;
        let rowSequence: number = 0;
        let primaryKeyColumn: string;
        let primaryKeyNameValue: any = {};
        this.pageIsLoaded = false;

        if (formTypes.PrimaryKeyColumn) {
            primaryKeyColumn = formTypes.PrimaryKeyColumn.toLowerCase();
        }

        for (let i = 0; i < length; i++) {
            newRow = new Array<any>();
            let row = inputObjs[i];

            for (let key in row) {
                let columnConfig = formTypes.ColumnConfiguration.find(x => x.dbColumnName.toLowerCase() === key.toLowerCase());
                if (columnConfig !== undefined && row.hasOwnProperty(key)) {

                    let displayDescription = '';
                    if (columnConfig.dataSourceAddress) {
                        let lookupTable = columnConfig.dataSource;
                        let dataSourceAddressColumnName = columnConfig.dataSourceAddress.dbColumnName;

                        let lookupRow;
                        if (lookupTable) {
                            lookupRow = lookupTable.find(function (x) {
                                return row[key] === x[dataSourceAddressColumnName];
                            });
                        }

                        let displayColumnName = columnConfig.dataSourceAddress.displayColumnName;
                        if (lookupRow === undefined) {
                            displayDescription = row[key];
                        }
                        else {
                            displayDescription = lookupRow[displayColumnName];
                        }
                    }

                    let displayValue = row[key];

                    if (key.toLowerCase() === 'id' || key.toLowerCase() === primaryKeyColumn) {
                        primaryKeyNameValue = { name: key.toLowerCase(), value: displayValue };
                    }

                    columnSequence = formTypes.ColumnConfiguration.map(function (x) { return x.dbColumnName.toLowerCase(); }).indexOf(key.toLowerCase());

                    let columnFormat = columnConfig.columnFormat ? columnConfig.columnFormat : '';
                    newRow.push(
                        {
                            name: key,
                            val: displayValue,
                            displayDescription: displayDescription,
                            objId: rowSequence,
                            eventHandler: '',
                            sequence: columnSequence,
                            columnCss: columnConfig.columnCss,
                            columnFormat: columnFormat,
                            isVisible: columnConfig.isVisible,
                            htmlControlType: columnConfig.htmlControlType,
                            isRequired: columnConfig.isRequired,
                            isToggleable: columnConfig.isToggleable,
                            isAllowGridLevelEdit: columnConfig.isAllowGridLevelEdit,
                            dataSourceAddress: columnConfig.dataSourceAddress,
                            dataSource: columnConfig.dataSource ? this.getArrayDataSource(
                                columnConfig.dataSource,
                                columnConfig.dataSourceAddress['displayColumnName'],
                                columnConfig.dataSourceAddress['dbColumnName'],
                                columnConfig.dataSourceAddress['defaultValue'])
                                : [],
                            customdataSource: columnConfig.customdataSource ? this.getArrayDataSource(
                                columnConfig.customdataSource,
                                columnConfig.dataSourceAddress['displayColumnName'],
                                columnConfig.dataSourceAddress['dbColumnName'],
                                columnConfig.dataSourceAddress['defaultValue'])
                                : [],
                        });
                }
            }

            sortedRow = this.sortBySequence(newRow);

            result.push({
                Id: rowSequence, primaryKey: primaryKeyNameValue, collapsed: true, inlineEditEnabled: false
                , cells: sortedRow, checkBox: { checked: false, disabled: false }, childData: row.childData
            });
            rowSequence++;
        }

        this.pageIsLoaded = true;

        return result;
    }

    getDropDownIdValue(dataSource, DescriptionColumn, ValueColumn, ActualValue) {
        let IdValue: any;
        if (dataSource) {
            let temp = dataSource.find(p => p[DescriptionColumn] === ActualValue);
            if (temp) {
                IdValue = temp[ValueColumn];
            }
        }

        return IdValue;
    }

    getArrayDataSource(dataSource, DescriptionColumn, ValueColumn, defaultValue) {
        let result = [];
        if (defaultValue) {
            defaultValue.forEach(x => {
                result.push(
                    {
                        Description: x['Name'],
                        Value: x['Value']
                    }
                );
            });
        }
        if (dataSource) {
            dataSource.forEach(x => {
                result.push(
                    {
                        Description: x[DescriptionColumn],
                        Value: x[ValueColumn]
                    }
                );
            });
        }
        return result;
    }

    bindCustomDropDown(dropDown, data) {
        dropDown.customdataSource = this.getArrayDataSource(data, dropDown.dataSourceAddress['displayColumnName'],
            dropDown.dataSourceAddress['dbColumnName'], dropDown.dataSourceAddress['defaultValue']);

        if (!dropDown.val || dropDown.val === '') {
            if (dropDown.dataSourceAddress['defaultValue']) {
                let defaultItem = dropDown.customdataSource.find(x => x.Value === dropDown.dataSourceAddress['defaultValue'][0].Value);
                dropDown.val = defaultItem.Value;
            }
            else {
                dropDown.val = '';
            }
        }
    }

    bindCustomCheckBoxList(checkBoxList, data) {
        let result = [];
        if (data) {
            data.forEach(x => {
                result.push(
                    {
                        Description: x[checkBoxList.dataSourceAddress['displayColumnName']],
                        Value: x[checkBoxList.dataSourceAddress['dbColumnName']],
                        Checked: data.Checked ? data.Checked : false
                    }
                );
            });
        }
        checkBoxList.dataSource = result;
        this.resetCheckBoxList.next(false);
    }

    editMatrix(editableRow: Array<any>, labels: Array<any>, formTypes: any): Array<any> {
        let result: Array<any> = new Array<any>();
        let length: number = labels.length;
        let controlSequence = 0;
        for (let i = 0; i < length; i++) {
            let cell = labels[i];
            let labelValue = editableRow.find(function (x) {
                return x.sequence === cell.sequence;
            });
            let columnConfig = formTypes.ColumnConfiguration.find(x => x.dbColumnName.toLowerCase() === cell.name.toLowerCase());
            if (columnConfig === undefined) {
                continue;
            }

            let dbColumnName = '';
            if (columnConfig.dataSource) {
                dbColumnName = this.getdbColumnNameForDataSourceAddress(columnConfig.dataSourceAddress);
            }

            if (columnConfig.htmlControlType.toLowerCase() === 'customselect' && columnConfig.dataSource) {
                let associatedControl;
                if (formTypes.ColumnDefinitions) {
                    associatedControl = formTypes.ColumnDefinitions.find(x => x.dbColumnName === columnConfig.associatedDropdownControl);
                }
                else {
                    associatedControl = formTypes.ColumnConfiguration.find(x => x.dbColumnName === columnConfig.associatedDropdownControl);
                }
                let dropDowndata = columnConfig.dataSource.find(p => p[dbColumnName] === cell.val);
                columnConfig.customdataSource = columnConfig.dataSource;
                if (associatedControl) {
                    // Update the custom dataSource for associated control
                    let dropDownId = 0;
                    if (dropDowndata) {
                        dropDownId = dropDowndata[columnConfig.dataSourceAddress.dbColumnName];
                    }

                    if (dropDowndata[columnConfig.dataSourceAddress.PrimaryKeyColumn]) {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(c => c[associatedControl.dataSourceAddress.ForeignKeyColumn] === dropDownId);
                    }
                    else {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(c => c[associatedControl.dataSourceAddress.dbColumnName] === dropDownId);
                    }

                    let tempAssociatedRecord = result.find(p => p.name.toLowerCase() === associatedControl.dbColumnName.toLowerCase());
                    if (tempAssociatedRecord) {
                        let tempdbColumnName = this.getdbColumnNameForDataSourceAddress(tempAssociatedRecord.dataSourceAddress);

                        tempAssociatedRecord.customdataSource = this.getArrayDataSource(
                            associatedControl.customdataSource,
                            tempAssociatedRecord.dataSourceAddress['displayColumnName'],
                            tempdbColumnName,
                            tempAssociatedRecord.dataSourceAddress['defaultValue']
                        );
                    }
                }
            }

            let lookUp: any = columnConfig.htmlControlType;
            let castedValue: any;
            if (lookUp === 'checkbox') castedValue = Boolean(labelValue.val);
            else castedValue = labelValue.val;
            let htmlObjSettings = {
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
                dataSource: columnConfig.dataSource ? this.getArrayDataSource(
                    columnConfig.dataSource,
                    columnConfig.dataSourceAddress['displayColumnName'],
                    dbColumnName,
                    columnConfig.dataSourceAddress['defaultValue'])
                    : [],
                customdataSource: columnConfig.customdataSource ? this.getArrayDataSource(
                    columnConfig.customdataSource,
                    columnConfig.dataSourceAddress['displayColumnName'],
                    dbColumnName,
                    columnConfig.dataSourceAddress['defaultValue'])
                    : [],
                masterdataSource: columnConfig.dataSource,
                isAlwaysVisibleOn: columnConfig.isAlwaysVisibleOn ? columnConfig.isAlwaysVisibleOn : []
            };
            result.push(htmlObjSettings);
            controlSequence++;
        }
        return result;
    }


    viewMatrix(editableRow: Array<any>, labels: Array<any>, formTypes: any, databaseRecords: Array<any>): Array<any> {
        let result: Array<any> = new Array<any>();
        let length: number = labels.length;
        let controlSequence = 0;

        for (let i = 0; i < length; i++) {
            let cell = labels[i];
            let labelValue = editableRow.find(function (x) {
                return x.sequence === cell.sequence;
            });

            let columnConfig = formTypes.ColumnConfiguration.find(x => x.dbColumnName.toLowerCase() === cell.name.toLowerCase());
            if (columnConfig === undefined) {
                continue;
            }
            let lookUp: any = columnConfig.htmlControlType;
            let castedValue: any;
            if (lookUp === 'checkbox') castedValue = Boolean(labelValue.val);
            else castedValue = labelValue.val;
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
    }

    getFormBuilderControls(formTypes: any, data?: any): Array<any> {
        let result: Array<any> = new Array<any>();
        let length: number = formTypes.ColumnConfiguration.length;
        let controlSequence = 0;
        for (let i = 0; i < length; i++) {
            let columnConfig = formTypes.ColumnConfiguration[i];

            let dbColumnName = '';
            if (columnConfig.dataSource) {
                dbColumnName = this.getdbColumnNameForDataSourceAddress(columnConfig.dataSourceAddress);
            }

            if (columnConfig.htmlControlType.toLowerCase() === 'customselect' && columnConfig.dataSource) {
                let associatedControl;
                if (formTypes.ColumnDefinitions) {
                    associatedControl = formTypes.ColumnDefinitions.find(x => x.dbColumnName === columnConfig.associatedDropdownControl);
                }
                else {
                    associatedControl = formTypes.ColumnConfiguration.find(x => x.dbColumnName === columnConfig.associatedDropdownControl);
                }

                let dropDowndata = columnConfig.dataSource;
                columnConfig.customdataSource = columnConfig.dataSource;
                if (associatedControl) {
                    // Update the custom dataSource for associated control
                    let dropDownId = 0;
                    if (dropDowndata) {
                        dropDownId = dropDowndata[columnConfig.dataSourceAddress.dbColumnName];
                    }

                    if (dropDowndata[columnConfig.dataSourceAddress.PrimaryKeyColumn]) {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(c => c[associatedControl.dataSourceAddress.ForeignKeyColumn] === dropDownId);
                    }
                    else {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(c => c[associatedControl.dataSourceAddress.dbColumnName] === dropDownId);
                    }

                    let tempAssociatedRecord = result.find(p => p.name.toLowerCase() === associatedControl.dbColumnName.toLowerCase());
                    if (tempAssociatedRecord) {
                        let tempdbColumnName = this.getdbColumnNameForDataSourceAddress(tempAssociatedRecord.dataSourceAddress);

                        tempAssociatedRecord.customdataSource = this.getArrayDataSource(
                            associatedControl.customdataSource,
                            tempAssociatedRecord.dataSourceAddress['displayColumnName'],
                            tempdbColumnName,
                            tempAssociatedRecord.dataSourceAddress['defaultValue']
                        );
                    }
                }
            }

            let lookUp: any = columnConfig.htmlControlType;
            let castedValue: any;
            if (lookUp === 'checkbox') castedValue = false;
            else castedValue = '';

            if (data) {
                castedValue = data[columnConfig.dbColumnName];
            }

            let htmlObjSettings = {
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
                dataSource: columnConfig.dataSource ? this.getArrayDataSource(
                    columnConfig.dataSource,
                    columnConfig.dataSourceAddress['displayColumnName'],
                    columnConfig.dataSourceAddress['dbColumnName'],
                    columnConfig.dataSourceAddress['defaultValue'])
                    : [],
                customdataSource: columnConfig.customdataSource ? this.getArrayDataSource(
                    columnConfig.customdataSource,
                    columnConfig.dataSourceAddress['displayColumnName'],
                    columnConfig.dataSourceAddress['dbColumnName'],
                    columnConfig.dataSourceAddress['defaultValue'])
                    : [],
                masterdataSource: columnConfig.dataSource,
                isAlwaysVisibleOn: columnConfig.isAlwaysVisibleOn ? columnConfig.isAlwaysVisibleOn : []
            };
            if (formTypes.FormValidationRules) {
                let colFormValidationSettings = formTypes.FormValidationRules.find(x => x.dbColumnName.toLowerCase() === columnConfig.dbColumnName.toLowerCase());

                if (colFormValidationSettings) {
                    this.applyFormValidationRules(htmlObjSettings, colFormValidationSettings);
                }
            }
            result.push(htmlObjSettings);
            controlSequence++;
        }
        return result;
    }

    applyFormValidationRules(objTarget: any, rulesToApply: Array<any>) {
        for (let key in rulesToApply['builtInValidators']) {
            if (rulesToApply['builtInValidators'].hasOwnProperty(key)) {
                let val = rulesToApply['builtInValidators'][key];
                objTarget[key] = val;
            }
        }

    }

    sortBySequence(inputArray: any): Array<any> {

        let sortedArray: any = inputArray.sort((n1, n2) => {

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



    parseTree(dataList: any): any {
        let mainObject = {};
        for (let dataKey in dataList) {
            let obj = dataList[dataKey];
            let configObj = this.modelObjects.find(x => x.modelName === dataKey);
            if (((typeof obj) === 'object') && (obj)) {
                this.skipList.push(dataKey + '_Id');
                let emptyModelObj = JSON.parse(JSON.stringify(configObj.emptyModel));
                let primaryKey = dataKey + '_Id';
                if (obj.length) {
                    let tmpObj = obj[0];
                    for (let x in tmpObj) {
                        if (x.endsWith('_Id')) {
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
                        type: 'node',
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
                    let rootObjects = this.parseTree(obj);
                    obj['blockSequence'] = this.treeViewBlockCount;
                    this.treeArray.push({
                        type: 'leaf',
                        mainPageObject: rootObjects,
                        name: 'root leaves',
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
        if (!this.skipList.find(x => x === 'Action')) {
            this.skipList.push('Action');
        }
        if (!this.skipList.find(x => x === 'blockSequence')) {
            this.skipList.push('blockSequence');
        }
        return mainObject;
    }

    extractNodes(dataList: any, configFile: any): any {
        this.treeArray = new Array<any>();
        this.skipList = new Array<any>();
        this.modelObjects = new Array<any>();
        this.extractModels(configFile);
        this.extractBlankModels();
        this.parseTree(dataList);
        return { 'treeArray': this.treeArray, 'skipList': this.skipList };
    }

    extractNodesLight(dataList: any): any {
        this.treeArray = new Array<any>();
        this.parseTree(dataList);
        return { 'treeArray': this.treeArray, 'skipList': this.skipList };
    }

    extractModels(configFile) {
        configFile.Definitions.forEach(x => {
            this.modelObjects.push({ 'modelName': x.ModelName, 'Expanded': x.Expanded, 'level': x.Level, 'tabOrder': x.TabOrder, 'configObjects': x.ColumnDefinitions });
        });
    }



    extractBlankModels() {
        let emptyObject;
        this.modelObjects.forEach(x => {
            emptyObject = Object.create(Object.prototype);
            x.configObjects.forEach(xx => {
                emptyObject[xx.dbColumnName] = '';
            });
            x['emptyModel'] = emptyObject;
        });
    }

    resetTreeViewBlockCount() {
        this.treeViewBlockCount = 1;
    }

    extractHeaderNew(skipList: Array<any>, modelName: string, inputObjs: Array<any>, mainConfig: any): Array<any> {
        let formTypes = mainConfig.Definitions.find(x => x.ModelName === modelName);
        if (!formTypes) {
            formTypes = mainConfig;
        }
        let headerRow: Array<any>;
        let row: any;
        let sequence: number;
        if (inputObjs) {
            row = inputObjs[0];
            headerRow = new Array<any>();
            sequence = 0;
            for (let key in row) {
                if (skipList.find(x => x === key)) {
                    continue;
                }
                let columnConfig = formTypes.ColumnDefinitions.find(x => x.dbColumnName === key);
                if (row.hasOwnProperty(key)) {
                    headerRow.push(
                        {
                            val: columnConfig.displayName,
                            columnCss: columnConfig.columnCss,
                            name: key,
                            sequence: sequence,
                            sortCss: '',
                            visibility: columnConfig.visibility,
                            filter: '',
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

    extractMatrixNew(skipList: Array<any>, modelName: string, inputObjs: Array<any>, mainConfig: any): Array<any> {
        let formTypes = mainConfig.Definitions.find(x => x.ModelName === modelName);
        let result: Array<any> = new Array<any>();
        let length = inputObjs.length;
        let newRow: Array<any>;
        let columnSequence: number = 0;
        let rowSequence: number = 0;
        let primaryKeyColumn: string;
        let primaryKeyNameValue: any = {};

        if (formTypes.PrimaryKeyColumn) {
            primaryKeyColumn = formTypes.PrimaryKeyColumn.toLowerCase();
        }

        for (let i = 0; i < length; i++) {
            newRow = new Array<any>();
            let row = inputObjs[i];
            columnSequence = 0;
            for (let key in row) {
                if (skipList.find(x => x === key)) {
                    continue;
                }
                let columnConfig = formTypes.ColumnDefinitions.find(x => x.dbColumnName === key);
                if (!columnConfig) {
                    let t = 0;
                }

                let dbColumnName = '';
                if (columnConfig.dataSource) {
                    dbColumnName = this.getdbColumnNameForDataSourceAddress(columnConfig.dataSourceAddress);
                }

                if (row.hasOwnProperty(key)) {
                    let displayValue = undefined;
                    if (columnConfig.dataSourceAddress) {

                        displayValue = this.getDropDownIdValue(columnConfig.dataSource, columnConfig.dataSourceAddress['displayColumnName'], dbColumnName, row[key]);
                    }
                    if (displayValue === undefined) {
                        displayValue = row[key];
                    }

                    if (key.toLowerCase() === 'id' || key.toLowerCase() === primaryKeyColumn) {
                        primaryKeyNameValue = { name: key, value: displayValue };
                    }

                    if (columnConfig.htmlControlType.toLowerCase() === 'customselect' && columnConfig.dataSource) {
                        let associatedControl = formTypes.ColumnDefinitions.find(x => x.dbColumnName === columnConfig.associatedDropdownControl);
                        let dropDowndata = columnConfig.dataSource.find(p => p[dbColumnName] === displayValue);
                        columnConfig.customdataSource = columnConfig.dataSource;
                        if (associatedControl) {
                            // Update the custom dataSource for associated control
                            let dropDownId = 0;
                            if (dropDowndata) {
                                dropDownId = dropDowndata[columnConfig.dataSourceAddress.dbColumnName];
                            }
                            if (dropDowndata && dropDowndata[columnConfig.dataSourceAddress.PrimaryKeyColumn]) {
                                associatedControl.customdataSource = associatedControl.dataSource.filter(c =>
                                    c[associatedControl.dataSourceAddress.ForeignKeyColumn] === dropDownId);
                            }
                            else {
                                associatedControl.customdataSource = associatedControl.dataSource.filter(c =>
                                    c[associatedControl.dataSourceAddress.dbColumnName] === dropDownId);
                            }

                            let tempAssociatedRecord = newRow.find(p => p.name.toLowerCase() === associatedControl.dbColumnName.toLowerCase());
                            if (tempAssociatedRecord) {
                                let tempdbColumnName = this.getdbColumnNameForDataSourceAddress(tempAssociatedRecord.dataSourceAddress);

                                tempAssociatedRecord.customdataSource = this.getArrayDataSource(
                                    associatedControl.customdataSource,
                                    tempAssociatedRecord.dataSourceAddress['displayColumnName'],
                                    tempdbColumnName,
                                    tempAssociatedRecord.dataSourceAddress['defaultValue']
                                );
                            }
                        }
                    }

                    newRow.push(
                        {
                            name: key,
                            val: displayValue,
                            objId: rowSequence,
                            eventHandler: '',
                            sequence: columnSequence,
                            columnCss: columnConfig.columnCss,
                            visibility: columnConfig.visibility,
                            htmlControlType: columnConfig.htmlControlType,
                            togglable: columnConfig.togglable,
                            allowGridLevelEdit: columnConfig.allowGridLevelEdit,
                            dataSourceAddress: columnConfig.dataSourceAddress,
                            dataSource: columnConfig.dataSource ? this.getArrayDataSource(
                                columnConfig.dataSource,
                                columnConfig.dataSourceAddress['displayColumnName'],
                                dbColumnName,
                                columnConfig.dataSourceAddress['defaultValue'])
                                : [],
                            masterdataSource: columnConfig.dataSource,
                            customdataSource: columnConfig.customdataSource ? this.getArrayDataSource(
                                columnConfig.customdataSource,
                                columnConfig.dataSourceAddress['displayColumnName'],
                                dbColumnName,
                                columnConfig.dataSourceAddress['defaultValue'])
                                : [],
                            associatedDropdownControl: columnConfig.associatedDropdownControl
                        });
                    columnSequence++;
                }
            }

            result.push({
                Id: rowSequence, primaryKey: primaryKeyNameValue, collapsed: true, inlineEditEnabled: false
                , cells: newRow, checkBox: { checked: false, disabled: false }, childData: row.childData
            });

            rowSequence++;
        }
        return result;
    }

    editMatrixNew(skipList: Array<any>, modelName: string, editableRow: Array<any>, labels: Array<any>, mainConfig: any): Array<any> {
        let formTypes = mainConfig.Definitions.find(x => x.ModelName === modelName);
        let result: Array<any> = new Array<any>();
        let length: number = labels.length;
        let controlSequence = 0;
        for (let i = 0; i < length; i++) {
            let cell = labels[i];
            let labelValue = editableRow.find(function (x) {
                return x.sequence === cell.sequence;
            });
            let columnConfig = formTypes.ColumnDefinitions.find(x => x.dbColumnName === cell.name);
            if (columnConfig === undefined) {
                continue;
            }
            let lookUp: any = columnConfig.htmlControlType;
            let castedValue: any;
            if (lookUp === 'checkbox') castedValue = Boolean(labelValue.val);
            else castedValue = labelValue.val;

            let dbColumnName = '';
            if (columnConfig.dataSource) {
                dbColumnName = this.getdbColumnNameForDataSourceAddress(columnConfig.dataSourceAddress);
            }

            if (columnConfig.htmlControlType.toLowerCase() === 'customselect' && columnConfig.dataSource) {
                let associatedControl = formTypes.ColumnDefinitions.find(x => x.dbColumnName === columnConfig.associatedDropdownControl);
                let dropDowndata = columnConfig.dataSource.find(p => p[dbColumnName] === castedValue);

                columnConfig.customdataSource = columnConfig.dataSource;

                if (associatedControl) {
                    // Update the custom dataSource for associated control
                    let dropDownId = 0;
                    if (dropDowndata) {
                        dropDownId = dropDowndata[columnConfig.dataSourceAddress.dbColumnName];
                    }
                    if (dropDowndata && dropDowndata[columnConfig.dataSourceAddress.PrimaryKeyColumn]) {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(c => c[associatedControl.dataSourceAddress.ForeignKeyColumn] === dropDownId);
                    }
                    else {
                        associatedControl.customdataSource = associatedControl.dataSource.filter(c => c[associatedControl.dataSourceAddress.dbColumnName] === dropDownId);
                    }

                    let tempAssociatedRecord = result.find(p => p.name.toLowerCase() === associatedControl.dbColumnName.toLowerCase());
                    if (tempAssociatedRecord) {
                        let tempdbColumnName = this.getdbColumnNameForDataSourceAddress(tempAssociatedRecord.dataSourceAddress);

                        tempAssociatedRecord.customdataSource = this.getArrayDataSource(
                            associatedControl.customdataSource,
                            tempAssociatedRecord.dataSourceAddress['displayColumnName'],
                            tempdbColumnName,
                            tempAssociatedRecord.dataSourceAddress['defaultValue']
                        );
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
                dataSource: columnConfig.dataSource ? this.getArrayDataSource(
                    columnConfig.dataSource,
                    columnConfig.dataSourceAddress['displayColumnName'],
                    dbColumnName,
                    columnConfig.dataSourceAddress['defaultValue'])
                    : [],
                dataSourceAddress: columnConfig.dataSourceAddress,
                masterdataSource: columnConfig.dataSource,
                visibility: columnConfig.visibility ? columnConfig.visibility : true,
                readOnly: columnConfig.readOnly ? columnConfig.readOnly : false,
                togglable: columnConfig.togglable,
                isComplexTypeInlineTemplate: columnConfig.isComplexTypeInlineTemplate,
                isComplexTypeInlineTemplateConfig: columnConfig.isComplexTypeInlineTemplateConfig,
                customdataSource: columnConfig.customdataSource ? this.getArrayDataSource(
                    columnConfig.customdataSource,
                    columnConfig.dataSourceAddress['displayColumnName'],
                    dbColumnName,
                    columnConfig.dataSourceAddress['defaultValue'])
                    : [],
                associatedDropdownControl: columnConfig.associatedDropdownControl
            });
            controlSequence++;
        }
        return result;
    }

    getdbColumnNameForDataSourceAddress(dataSourceAddress: any) {
        let tempdbColumnName = '';
        if (dataSourceAddress['PrimaryKeyColumn'])
            tempdbColumnName = dataSourceAddress.PrimaryKeyColumn;
        else
            tempdbColumnName = dataSourceAddress.dbColumnName;
        return tempdbColumnName;
    }

    buildJSONObject(data, primaryColumnName) {
        let jsonValue = '{ ';
        if (data) {
            for (let i = 0; i < data.length; i++) {
                let dbName = data[i].name;
                let editedValue = JSON.stringify(data[i].val);
                if (primaryColumnName === dbName && (data[i].val === '' || data[i].val === undefined)) {
                    editedValue = JSON.stringify(0);
                }
                (i + 1) === data.length ? jsonValue += '\"' + dbName + '\" : ' + editedValue : jsonValue += '\"' + dbName + '\" : ' + editedValue + ',';
            }
        }
        jsonValue += ' }';

        return JSON.parse(jsonValue);
    }

    getPrimaryColumnName(gridSettings) {
        let primaryKeyColumn = 'Id';
        if (gridSettings['PrimaryKeyColumn'] !== undefined && gridSettings['PrimaryKeyColumn'] !== '') {
            primaryKeyColumn = gridSettings['PrimaryKeyColumn'];
        }
        return primaryKeyColumn;
    }

    showSpecificTab(tempContext: any, tabData: any, inputHttpProxy: any = null) {
        let urlList: Array<any> = [];
        let urlListBodyMissing: Array<any> = [];
        if (tempContext.tabBuilderControl) {
            let tabInfo = tempContext.tabControlConfig.TabsList.find(p => p.TabKey === tabData.TabKey);

            tabInfo.TabControls.forEach(x => {
                if (inputHttpProxy) {
                    x.httpProxy = inputHttpProxy;
                }
                if (x.gridSettings && x.gridSettings.ColumnConfiguration) {
                    x.gridSettings.ColumnConfiguration.forEach(
                        p => {

                            if (p.dataSourceAddress && p.dataSourceAddress.tableName && p.dataSourceAddress.dbParameters) {
                                urlList.push(
                                    {
                                        url: p.dataSourceAddress.tableName,
                                        body: p.dataSourceAddress.dbParameters
                                    }
                                );
                            }
                            else if (p.dataSourceAddress && p.dataSourceAddress.tableName && !p.dataSourceAddress.dbParameters) {
                                urlListBodyMissing.push(p.dataSourceAddress.tableName);
                            }
                        }
                    );
                }
            });

            // execute with body
            if (urlList && urlList.length) {
                let index = -1;
                this.apiService.fetchMultipleListWithBody(urlList).subscribe(
                    res => {
                        tabInfo.TabControls.forEach(x => {
                            if (x.gridSettings && x.gridSettings.ColumnConfiguration) {
                                x.gridSettings.ColumnConfiguration.forEach(
                                    p => {

                                        if (p.dataSourceAddress && p.dataSourceAddress.tableName && p.dataSourceAddress.dbParameters) {
                                            ++index;
                                            p.dataSource = res[index];
                                        }
                                    }
                                );
                            }
                        });

                        if (urlListBodyMissing && urlListBodyMissing.length) {
                            this.applyDataSourceInfoWithNoBody(tempContext, tabInfo, urlListBodyMissing);
                        }
                        else {
                            tempContext.displayTabInfo(tabInfo);
                        }
                    },
                    error => {
                        this.alert.error('Error in retrieving drop down info' + error.status);
                    },
                    () => {
                    }
                );
            }
            else if (urlListBodyMissing && urlListBodyMissing.length) {
                // execute api calls without body
                this.applyDataSourceInfoWithNoBody(tempContext, tabInfo, urlListBodyMissing);
            }
            else {
                tempContext.displayTabInfo(tabInfo);
            }
        }
    }

    applyDataSourceInfoWithNoBody(tempContext: any, tabInfo, urlListBodyMissing) {
        let index = -1;
        this.apiService.fetchMultipleList(urlListBodyMissing).subscribe(
            res => {
                tabInfo.TabControls.forEach(x => {
                    x.gridSettings.ColumnConfiguration.forEach(
                        p => {
                            if (p.dataSourceAddress && p.dataSourceAddress.tableName && !p.dataSourceAddress.dbParameters) {
                                ++index;
                                p.dataSource = res[index];
                            }
                        }
                    );
                });

                tempContext.displayTabInfo(tabInfo);
            },
            error => {
                this.alert.error('Error in retrieving drop down info' + error.status);
            },
            () => {
            });
    }
}
