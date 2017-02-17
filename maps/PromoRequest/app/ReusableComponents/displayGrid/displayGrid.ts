
import {Component, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES} from "angular2/common";
import {AlertService} from "../../ReusableServices/alertService";
import {HttpAbstract} from "../../ReusableServices/httpAbstract";
import {RadioControlValueAccessor} from "../inputControls/radio_value_accessor";
import {ElementRef} from "angular2/core";
import {DynamicComponentLoader} from "angular2/core";
import {Pagination} from "../pagination/pagination";
import {matrixService} from "../../ReusableServices/matrixService";
import {FormBuilder} from "../formBuilder/formBuilder";
import {AppSettingsService} from "../../ReusableServices/appSettingsService";
import {ExpandCollapseTrigger} from  "../expandCollapse/expandCollapseTrigger";
import {inlineEditForm} from "../inlineEditForm/inlineEditForm";
import {crudService} from "../../ReusableServices/crudService";
import {Observable} from 'rxjs/Observable';
import {MiniGridComponenet} from "../miniGrid/miniGrid";

@Component({
    templateUrl: "app/ReusableComponents/displayGrid/displayGrid.html",
    selector: 'displayGrid',
    directives: [MiniGridComponenet, FORM_DIRECTIVES, RadioControlValueAccessor, Pagination, ExpandCollapseTrigger, inlineEditForm],
})

export class DisplayGridComponent {
    viewDetail: boolean = false;
    editDetail: boolean = false;
    addDetail: boolean = false;
    isViewBtnVisible:boolean=true;
    isEditBtnVisible:boolean=true;
    childType:string="edit";
    childId: any;
    gridSettings: any;
    databaseRecords: Array<any>;
    matrixForDataTable: any;
    masterMatrixForDataTable: Array<any>;
    headerForDataTable: Array<any>;
    filterForDataTable: Array<any>;
    showFilters:boolean = false;
    headerForViewRow: Array<any>;
    lookupsForDataTable: Array<any>;
    editViewRowDataTable: Array<any>;
    selectionArray: Array<any>;
    activeFilterSequence: string = "";
    selectedInput: any;
    showMultiSelectionDirective: boolean = false;
    alert: AlertService;
    httpAbs: HttpAbstract;
    httpProxy: any;
    controlconfig: any;
    pageName: any;
    ForeignKeyColumn: string = "";
    PrimaryKeyColumn: string = "Id";
    dc: DynamicComponentLoader;
    elemRef: ElementRef;
    isDisabled: boolean = false;
    showChildDetail: boolean = false;
    masterGridSettings: any;
    CONST_CHILDCONTROL_CONFIG = "childControlconfig";
    IsChildPage: boolean = false;
    masterPageName: any;
    //Pagination related variables
    IsPagination: boolean = false;
    totalItems: number = 0;
    itemsPerPage: number = 10; //Default value
    currentPage: number = 1;
    editViewRowTablePaged: any;
    vmMatrix: matrixService;
    hideAddBtn: boolean = false;
    hideDeleteBtn:boolean=false;
    //sorting variables
    sortColumnName: string = "";
    sortAsc: boolean = false;
    isSpreadsheetGrid:boolean=false;
    crudService:crudService;
    hasDynamicHeader:boolean;
    dynamicHeaders:Array<any>;
    showGridBody: boolean = false;
    showNoData: boolean = false;

    constructor(alert: AlertService, httpAbstract: HttpAbstract, dcl: DynamicComponentLoader, elementRef: ElementRef, vmMatrix: matrixService, private appSettingsService: AppSettingsService, crudserv:crudService) {
        this.alert = alert;
        this.httpAbs = httpAbstract;
        this.dc = dcl;
        this.elemRef = elementRef;
        this.vmMatrix = vmMatrix;
        crudserv.setCallerContext(this);
        this.crudService=crudserv;
        this.crudService.OnCrudOperationSuccess.subscribe((message)=>{
            this.refreshCb(this.crudService.getCallerContext(),message)}
        );
    }

    showGrid(show: boolean = true){
        this.showNoData = show;
        this.showGridBody = show;
        this.IsPagination = show;
    }

    refreshCb(contect,message){
        if (message==="DeleteSuccess"){
            this.DeleteSucceeded();
        }
    }

    setDbMatrix(databaseRecords: any, gridSettings:any) {
        this.masterMatrixForDataTable = this.vmMatrix.extractMatrix(databaseRecords, this.gridSettings);
        this.matrixForDataTable = this.masterMatrixForDataTable;
        this.lookupsForDataTable = this.headerForDataTable = this.vmMatrix.extractHeader(databaseRecords, this.gridSettings);

        var dynamicHeaderSection=this.gridSettings["dynamicHeaderSection"];
        if (dynamicHeaderSection) {
            this.hasDynamicHeader=true;
            this.buildDynamicHeader(dynamicHeaderSection,gridSettings)
        }

        if (!this.filterForDataTable) {
            this.showFilters = false;
            this.filterForDataTable = this.vmMatrix.extractFilter(databaseRecords, this.gridSettings);
            this.initializeFilterOptions();
        }

        if (this.gridSettings["PaginationPageLimit"]) {
            this.IsPagination = true;
            this.itemsPerPage = this.gridSettings["PaginationPageLimit"];
            if(this.currentPage == 1) {
                this.pageChanged(this.currentPage, true);
            }
        }
        else {
            this.matrixForDataTable = this.masterMatrixForDataTable
            this.IsPagination = false;
        }

        if (this.childType === "view") {
            this.headerForViewRow = this.vmMatrix.extractViewHeader(databaseRecords, this.gridSettings);
        }
    }

    buildDynamicHeader(dynamicHeaderObject:any,gridSettings){
        var result= new Array<any>();

        dynamicHeaderObject.forEach(function(x){
            var level= x.level;
            var columnWidth = 0;

            var child;
            // Column width will be equal to the sum of its children's width
            x.childColumns.forEach(function(y) {

                child = gridSettings.ColumnConfiguration.find(z=>z.dbColumnName===y);
                // Must parse CSS class string to get width
                if(child != undefined) {
                    columnWidth = columnWidth + parseInt(child.columnCss.split("-")[1]);
                }

            });
            var headerObj={
                displayName:x.displayName,
                columnCss:"col-" + columnWidth,
            };

            console.log("columnCss: " + headerObj.columnCss);

            if (!result[level]){
                result[level]=new Array<any>();
            }
            result[level].push(headerObj);
        })
        this.dynamicHeaders=result;
    }

    setChildControlVisibility() {
        if (this.gridSettings[this.CONST_CHILDCONTROL_CONFIG]) {
            this.showChildDetail = true;
        }
        else {
            this.showChildDetail = false;
        }
    }

    injectConfigAndData(configuration: any, databaseRecords: any, httpProxy: any, pagename: any, ischildpage: boolean = false) {

        console.log(databaseRecords);
        this.httpProxy = httpProxy;
        this.controlconfig = configuration;
        this.pageName = pagename;
        this.IsChildPage = ischildpage;
        if (configuration["IsSpreadsheetGrid"]){
            this.isSpreadsheetGrid=configuration["IsSpreadsheetGrid"];
        }
        this.databaseRecords = databaseRecords;
        var myConfig = configuration;
        this.childType=myConfig["ChildType"];
        var dataSourceAddressTables: Array<string> = new Array<string>();

        this.showGridBody = true;
        this.sortColumnName = "";

        if(this.databaseRecords.length > 0) {
            this.showNoData = false;

            for (var key in myConfig.ColumnConfiguration) {
                if (myConfig.ColumnConfiguration[key].dataSourceAddress) {
                    dataSourceAddressTables.push(myConfig.ColumnConfiguration[key].dataSourceAddress.tableName);
                }
            }
            if (dataSourceAddressTables.length === 0) {
                this.gridSettings = myConfig;

                this.setChildControlVisibility();
                this.setDbMatrix(databaseRecords, this.gridSettings);
                this.updateSortCssForSequences(this.sortAsc ? "glyphicon glyphicon-arrow-up" : "glyphicon glyphicon-arrow-down");
                return;
            }

            this.httpAbs.fetchMultiple(dataSourceAddressTables).subscribe(
                res => {
                    // check if res in not an Array
                    var i:number = 0;
                    for (var key in myConfig.ColumnConfiguration) {
                        if (myConfig.ColumnConfiguration[key].dataSourceAddress) {
                            myConfig.ColumnConfiguration[key].dataSource = res[i];
                            i++;
                        }
                    }
                    this.gridSettings = myConfig;
                    this.setChildControlVisibility();
                    this.setDbMatrix(databaseRecords, this.gridSettings);
                    this.updateSortCssForSequences(this.sortAsc ? "glyphicon glyphicon-arrow-up" : "glyphicon glyphicon-arrow-down");
                }
                ,
                error => {
                    this.alert.error("InjectConfigAndData: async error #" + error.status);
                },
                () => { }
            );
        }
        else{
            this.gridSettings = myConfig;
            this.headerForDataTable = this.vmMatrix.extractHeader(this.databaseRecords, this.gridSettings);
            this.showNoData = true;
            this.IsPagination = false;
        }
    }

    editViewClicked(selectedRow: any) {
        switch (this.childType) {
            case "edit":
                this.editViewRowDataTable = this.vmMatrix.editMatrix(selectedRow.cells, this.headerForDataTable, this.gridSettings);
                this.editDetail = true;
                this.viewDetail = false;
                this.addDetail = false;
                this.LoadPluginComponent(this.childType, false);
                break;
            case "view":
                this.editViewRowDataTable = this.vmMatrix.viewMatrix(selectedRow.cells, this.headerForViewRow, this.gridSettings, this.databaseRecords);
                this.viewDetail = true;
                this.addDetail = false;
                this.editDetail = false;
                this.LoadPluginComponent(this.childType, false);
                break;
            case "editInline":
                this.editViewRowDataTable = this.vmMatrix.editMatrix(selectedRow.cells, this.headerForDataTable, this.gridSettings);
                selectedRow.inlineEditEnabled=!selectedRow.inlineEditEnabled;
                break;
        }

    }

    recordSaveHandler(context){
        context.RefreshPage.call(context);
    }

    LoadPluginComponent(operationType: string, isAddPage: boolean = false) {
        this.dc.loadIntoLocation(FormBuilder, this.elemRef, "formBuilder").then((component) => {
            component.instance.formBuilderNotifier.subscribe((updateValue) => {
                this.RefreshDataFromFormBuilder(updateValue.value)
            });
            component.instance.pluginInput = this.editViewRowDataTable;
            component.instance.gridSettings = this.gridSettings;
            component.instance.PageType = operationType;
            component.instance.pageName = this.pageName;
            component.instance.httpProxy = this.httpProxy;
        })
    }

    RefreshDataFromFormBuilder(updatedValue) {
        console.log(updatedValue);
        if (updatedValue === "cancel") {
            this.cancelClicked();
        }
        else {
            this.PageRefreshFromDynamicComponent(updatedValue);
        }
    }

    onSave(row){

    }

    AddClicked() {
        console.log(this.gridSettings);
        this.editViewRowDataTable = this.vmMatrix.addMatrix(this.headerForDataTable, this.gridSettings);//this.addMatrix(this.headerForDataTable);
        this.viewDetail = false;
        this.editDetail = false;
        this.addDetail = true;
        this.LoadPluginComponent("add", true);
    }

    showChildViewClicked(selectedRow: any) {
        var IdValue = 0;
        if (this.gridSettings["PrimaryKeyColumn"]) {
            this.PrimaryKeyColumn = this.gridSettings["PrimaryKeyColumn"];
        }
        for (var i = 0; i < this.headerForDataTable.length; i++) {
            var label = this.headerForDataTable[i].name;
            if (label === "Id" || label === this.PrimaryKeyColumn) {
                IdValue = selectedRow.cells[i].val;
                break;
            }
        }

        this.filterForDataTable = null;
        this.getChildRecords(IdValue);
    }

    getChildRecords(idValue, overrideMasterData: boolean = true) {
        if (this.httpProxy) {
            if (idValue) {
                if (this.pageName.indexOf("_child") > 0) {
                    this.pageName = this.pageName.replace("_child", "");
                }
            }

            this.httpProxy.ExecutePageRefersh(this.pageName + "_child", idValue)
                .subscribe(
                    res => {
                        this.viewDetail = false;
                        this.editDetail = false;
                        this.addDetail = false;
                        this.childId = idValue;
                        if (overrideMasterData) {
                            this.masterGridSettings = this.gridSettings;
                            this.masterPageName = this.pageName;
                        }
                        if (this.gridSettings[this.CONST_CHILDCONTROL_CONFIG]) {
                            this.ForeignKeyColumn = this.gridSettings[this.CONST_CHILDCONTROL_CONFIG]["ForeignKeyColumn"];
                            this.injectConfigAndData(this.gridSettings[this.CONST_CHILDCONTROL_CONFIG], res, this.httpProxy, this.pageName + "_child", true);
                        }
                        else {
                            this.injectConfigAndData(this.gridSettings, res, this.httpProxy, this.pageName + "_child", true);
                        }
                    },
                    error => {
                        this.alert.error("Get Child Records: async error #" + error.status);
                    },
                    () => {
                    }
                );
        }
    }

    GetParentPageDetails(controlconfig: any, httpProxyObject: any, pageName) {
        this.httpProxy = httpProxyObject;
        this.pageName = pageName;
        this.controlconfig = controlconfig;
        this.RefreshPage();
    }

    ReturnToParent() {
        this.filterForDataTable = null;
        this.RefreshPage();//this.masterformTypes
    }

    PageRefreshFromDynamicComponent(data) {
        var IdValue = 0;
        if (this.IsChildPage) {
            if (data[this.ForeignKeyColumn]) {
                IdValue = data[this.ForeignKeyColumn];
            }
        }

        if (this.httpProxy) {
            if (this.IsChildPage) {
                if (this.masterPageName){
                    this.pageName = this.masterPageName;
                }
                this.getChildRecords(IdValue, false);
            }
            else {
                this.RefreshPage();
            }
        }
    }

    buildJSONObject() {
        var data = this.editViewRowDataTable;
        var jsonValue = '{ ';
        for (var i = 0; i < data.length; i++) {
            var dbName = data[i].name;
            var editedValue = JSON.stringify(data[i].val);
            (i + 1) == data.length ? jsonValue += "\"" + dbName + "\" : " + editedValue : jsonValue += "\"" + dbName + "\" : " + editedValue + ",";
        }
        jsonValue += ' }';

        console.log(jsonValue);
        var returndata = JSON.parse(jsonValue);
        console.log(returndata);
        return returndata;
    }

    DeleteClicked(selectedRow: any) {
        this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deletionQuestionMsg);
        this.alert.requestConfirmationAnswer$.subscribe(item => {
            this.alert.askConfirmation = false;
            if (item != "OK")
                return;
            this.editViewRowDataTable= this.vmMatrix.viewMatrix(selectedRow.cells, this.headerForDataTable, this.gridSettings, this.databaseRecords);
            this.crudService.delete( this.editViewRowDataTable, this.pageName, this.PrimaryKeyColumn, this.httpProxy);
        });
    }

    DeleteSucceeded(){
        var primaryColumnName = this.crudService.getPrimaryColumnName(this.gridSettings);
        var data = this.crudService.buildJSONObject(this.editViewRowDataTable,primaryColumnName);
        var IdValue = 0;
        if (this.IsChildPage) {
            IdValue = data[this.ForeignKeyColumn];
        }
        if (this.IsChildPage) {
            if (this.masterPageName){
                this.pageName = this.masterPageName;
            }
            this.getChildRecords(IdValue, false);
        }
        else {
            this.RefreshPage();
        }
    }

    RefreshPage() {
        if (this.httpProxy) {
            var pageName = this.pageName;
            if (this.masterGridSettings) {
                pageName = this.masterPageName;
            }
            if(this.controlconfig["ServerPagination"] == true){
                this.filterAPI();
            }
            else {
                this.httpProxy.ExecutePageRefersh(pageName)
                    .subscribe(
                        res => {
                            this.refreshOnSuccess(res, false);
                        },
                        error => {
                            this.alert.error("Refresh Page : async error #" + error.status + "-myerror-" + this.pageName + "-" + this.controlconfig + "-" + this.masterGridSettings + "-" + this.masterPageName);
                        },
                        () => {
                        }
                    );
            }
        }
    }

    refreshOnSuccess(res: any, filtered: boolean) {
        this.viewDetail = false;
        this.editDetail = false;
        this.addDetail = false;

        var rowsOfData: any;
        rowsOfData = res;

        if (filtered) {
            rowsOfData = res.List;
            this.totalItems = res.NumberOfRowsInTable;
        }
        else {
            this.totalItems = rowsOfData.length;
        }

        if (this.masterGridSettings) {
            this.injectConfigAndData(this.masterGridSettings, rowsOfData, this.httpProxy, this.masterPageName);
        }
        else {
            this.injectConfigAndData(this.controlconfig, rowsOfData, this.httpProxy, this.pageName);
        }
        if (this.gridSettings) {
            this.hideAddBtn = this.gridSettings['shallHideAddBtn'];
            this.hideDeleteBtn = this.gridSettings['ShallHideDeleteBtn'];
        }
    }

    cancelClicked() {
        this.viewDetail = false;
        this.editDetail = false;
        this.addDetail = false;
        if (this.gridSettings['IsChildPage']) {
            this.ReturnToParent();
        }
    }

    filterBoxClicked(clickedSequence) {
        this.activeFilterSequence = clickedSequence;
    }

    filterValueEntered(event: any): void {
        var sequence = this.activeFilterSequence;
        var filterInputValue = event.target.value;
        //if server pagination is turned on, the masterMatrixForDataTable has the current page
        if(this.gridSettings["ServerPagination"] == true){
            this.matrixForDataTable = this.masterMatrixForDataTable;
        }
        else {
            //If server pagination is off, make sure the matrixForDataTable has all records on the current page before filtering
            this.pageChanged(null, true);
        }
        var filteredMatrix = this.matrixForDataTable.filter(function (line) {
            var objElement1 = line.cells.find(function (x) {
                return (x.sequence === sequence)
            });
            var cellValue = new String(objElement1.val.toString().toLocaleLowerCase());
            if (cellValue.startsWith(filterInputValue.toString().toLocaleLowerCase())) {
                return line;
            }
        });
        this.matrixForDataTable = filteredMatrix;
    }

    filterWithHeaderValues(){

        this.matrixForDataTable = this.masterMatrixForDataTable;

        for(var i = 0; i < this.headerForDataTable.length; i++){
            if(this.headerForDataTable[i].filter.length > 0) {
                var filterValue = this.headerForDataTable[i].filter;

                var filteredMatrix:any = {};
                filteredMatrix = this.matrixForDataTable.filter(function (line) {
                    var objElement1 = line.cells.find(function (x) {
                        return (x.sequence === i)
                    });

                    if(objElement1.val) {
                        var cellValue = new String(objElement1.val.toString().toLocaleLowerCase());
                        if (cellValue.startsWith(filterValue.toString().toLocaleLowerCase())) {
                            return line;
                        }
                    }
                });

                this.matrixForDataTable = filteredMatrix;
            }
        }

    }

    sortRequested(clickedColumn, sortCss) {
        this.sortColumnName = clickedColumn.toLowerCase();
        if (sortCss != "glyphicon glyphicon-arrow-up") {
            this.sortAsc = true;
        }
        else {
            this.sortAsc = false;
        }

        if(this.gridSettings["ServerPagination"] == undefined || this.gridSettings["ServerPagination"] == false) {
            if(this.sortAsc){
                this.sortAscending(this.sortColumnName,this.masterMatrixForDataTable);
                this.pageChanged(null, true);
            }
            else {
                this.sortDescending(this.sortColumnName,this.masterMatrixForDataTable);
                this.pageChanged(null, true);
            }
        }
        else {
            this.filterAPI();
        }
    }

    sortAscending(clickedColumn, inputArray:Array<any>) {
        var sortedArray: any = inputArray.sort((n1, n2) => {
            var objElement1 = n1.cells.find(function (x) {
                return x.name.toLowerCase() === clickedColumn.toLowerCase()
            });
            var objElement2 = n2.cells.find(function (x) {
                return x.name.toLowerCase() === clickedColumn.toLowerCase()
            });
            if (objElement1.val > objElement2.val) {
                return 1;
            }
            if (objElement1.val < objElement2.val) {
                return -1;
            }
            return 0;
        });
        this.matrixForDataTable = sortedArray;
        this.updateSortCssForSequences("glyphicon glyphicon-arrow-up");
    }

    sortDescending(clickedColumn, inputArray:Array<any>) {
        var sortedArray: any = inputArray.sort((n1, n2) => {
            var objElement1 = n1.cells.find(function (x) {
                return x.name.toLowerCase() === clickedColumn.toLowerCase()
            });
            var objElement2 = n2.cells.find(function (x) {
                return x.name.toLowerCase() === clickedColumn.toLowerCase()
            });
            if (objElement1.val < objElement2.val) {
                return 1;
            }
            if (objElement1.val > objElement2.val) {
                return -1;
            }
            return 0;
        });
        this.matrixForDataTable = sortedArray;
        this.updateSortCssForSequences("glyphicon glyphicon-arrow-down");
    }

    updateSortCssForSequences(sortCssTobeUpdated) {
        if (this.headerForDataTable) {
            var headerTableLength = this.headerForDataTable.length;
            for (var i = 0; i < headerTableLength; i++) {
                if (this.sortColumnName.toLowerCase() == this.headerForDataTable[i].name.toLowerCase()) {
                    this.headerForDataTable[i].sortCss = sortCssTobeUpdated
                }
                else {
                    this.headerForDataTable[i].sortCss = "";
                }
            }
        }

    }

    initializeFilterOptions() {

        if(this.gridSettings["ServerPagination"] == undefined || this.gridSettings["ServerPagination"] == false) {
            this.createFilters(this.masterMatrixForDataTable);
        }
        else {
            this.httpProxy.ExecutePageRefersh(this.pageName)
                .subscribe(
                    res => {
                        this.createFilters(res);
                    },
                    error => {
                        this.alert.error("Refresh Page : async error #" + error.status + "-myerror-" + this.pageName + "-" + this.controlconfig + "-" + this.masterGridSettings + "-" + this.masterPageName);
                    },
                    () => {
                    }
                );
        }
    }

    createFilters(res) {
        for (var i = 0; i < this.filterForDataTable.length; i++) {
            if (this.filterForDataTable[i].filterable) {
                this.showFilters = true;
                this.filterForDataTable[i].options.push({
                    label: "ALL",
                    value: ""
                });

                //Insert all of the used values from the data into this array (only the values present in the data)
                var usedValues = [];
                for (var j = 0; j < res.length; j++) {
                    var valueToAdd = res[j][this.filterForDataTable[i].name];
                    if (usedValues.indexOf(valueToAdd) == -1) {
                        usedValues.push(valueToAdd);
                    }
                }

                //check if the current column is a FK reference, if so, use those values
                var dbColumnName = this.filterForDataTable[i].name;
                var columnSettings = this.gridSettings.ColumnConfiguration.find(z=>z.dbColumnName===dbColumnName);
                if(columnSettings.dataSource){
                    var idCol = columnSettings.dataSourceAddress.dbColumnName;
                    var desCol = columnSettings.dataSourceAddress.displayColumnName;

                    //Loop through the result set and grab the FK column values
                    var optionValues: any = [];
                    for(var j = 0; j < usedValues.length; j++){

                        var option = {
                            label: usedValues[j],
                            value: usedValues[j]
                        };

                        var dataSourceToUse: any;
                        for(var k = 0; k < columnSettings.dataSource.length; k++){
                            if(columnSettings.dataSource[k][idCol] === usedValues[j]){
                                dataSourceToUse = columnSettings.dataSource[k];
                                break;
                            }
                        }

                        if(dataSourceToUse) {
                            option.label= dataSourceToUse[desCol];
                            option.value= dataSourceToUse[idCol];
                        }
                        optionValues.push(option);
                    }

                    //Sort the options by ascending order
                    optionValues.sort(function(a, b){
                        return a.label.toString().localeCompare(b.label);
                    });

                    for (var j = 0; j < optionValues.length; j++) {
                        var option = {
                            label: optionValues[j].label,
                            value: optionValues[j].value
                        };

                        this.filterForDataTable[i].options.push(option);
                    }
                }
                else {
                    usedValues.sort();
                    for (var j = 0; j < usedValues.length; j++) {

                        var option = {
                            label: usedValues[j],
                            value: usedValues[j]
                        };

                        this.filterForDataTable[i].options.push(option);
                    }
                }
            }
        }
    }

    inputClicked(row,col){
        if (col.htmlControlType==="checkbox"){
            col.val=!col.val;
        }
        this.vmMatrix.inputClicked({row:row,col:col});
    }

    private pageChanged(event: any, override: boolean = false): void {
        //this.totalItems = this.masterMatrixForDataTable.length;
        if (event != null && event.page != null)
            this.currentPage = event.page;

        if (event != null && event.itemsPerPage != null)
            this.itemsPerPage = event.itemsPerPage;

        if (this.gridSettings["ServerPagination"] == true && !override) {
            this.filterAPI();
        }
        else {
            if (this.masterMatrixForDataTable != null)
                this.matrixForDataTable = this.masterMatrixForDataTable.slice(
                    (this.currentPage - 1) * this.itemsPerPage,
                    this.currentPage * this.itemsPerPage);
        }
    };

    private filterSelect(event: any): void{
        this.filterForDataTable[parseInt(event.target.id.replace('f',''))].filterValue[0] = event.target.value;
        this.filterAPI();
    };

    private filterDate(event: any): void{

        if(event.target.id.indexOf('ff')> -1){
            this.filterForDataTable[parseInt(event.target.id.replace('ff',''))].filterValue[0] = event.target.value;
        }
        else if(event.target.id.indexOf('ft')> -1) {
            this.filterForDataTable[parseInt(event.target.id.replace('ft',''))].filterValue[1] = event.target.value;
        }
        this.filterAPI();
    };

    singalRCallback(){
        if(this.IsChildPage){
            this.getChildRecords(this.childId, false);
        }
        else {
            this.filterAPI();
        }
    }

    filterAPI() {
        if (this.httpProxy) {
            var pageName = this.pageName;
            if (this.masterGridSettings) {
                pageName = this.masterPageName;
            }

            var filterObj:any = {};
            filterObj.ListOfFilterColumns = [];

            if (this.filterForDataTable) {
                for (var i = 0; i < this.filterForDataTable.length; i++) {
                    if (this.filterForDataTable[i].filterable) {
                        if (this.filterForDataTable[i].htmlControlType == 'text') {
                            if (this.filterForDataTable[i].filterValue.length > 0 && this.filterForDataTable[i].filterValue[0].length > 0) {
                                var filterColObj:any = {};
                                filterColObj.DBColumnName = this.filterForDataTable[i].name;
                                filterColObj.DBColumnValue = this.filterForDataTable[i].filterValue[0];
                                filterColObj.WhereClauseCondition = "=";
                                filterObj.ListOfFilterColumns.push(filterColObj);
                            }
                        }
                        else if (this.filterForDataTable[i].htmlControlType == 'date') {
                            if (this.filterForDataTable[i].filterValue[0] && this.filterForDataTable[i].filterValue[0].length > 0) {
                                var filterColObj:any = {};
                                filterColObj.DBColumnName = this.filterForDataTable[i].name;
                                filterColObj.DBColumnValue = this.filterForDataTable[i].filterValue[0];
                                filterColObj.WhereClauseCondition = ">=";
                                filterObj.ListOfFilterColumns.push(filterColObj);
                            }
                            if (this.filterForDataTable[i].filterValue[1] && this.filterForDataTable[i].filterValue[1].length > 0) {
                                var filterColObj:any = {};
                                filterColObj.DBColumnName = this.filterForDataTable[i].name;
                                filterColObj.DBColumnValue = this.filterForDataTable[i].filterValue[0];
                                filterColObj.WhereClauseCondition = ">=";
                                filterObj.ListOfFilterColumns.push(filterColObj);
                            }
                        }
                    }
                }
            }

            filterObj.ListOfSortingColumns = [];

            if (this.sortColumnName != "") {
                for (var i = 0; i < this.filterForDataTable.length; i++) {
                    if (this.filterForDataTable[i].name.toLowerCase() == this.sortColumnName.toLowerCase()) {
                        var sortObj:any = {};
                        sortObj.DbColumnName = this.filterForDataTable[i].name;
                        sortObj.ShouldOverrideDefaultAscendingSort = !this.sortAsc;
                        filterObj.ListOfSortingColumns.push(sortObj);
                    }
                }
            }
            filterObj.ListOfProjectionColumns = [];
            filterObj.MaxNumberOfRowsInAPage = this.itemsPerPage;
            filterObj.RequestedPageNumber = this.currentPage;

            var jsonToPass = JSON.stringify(filterObj);

            this.httpProxy.ExecutePageFilter(pageName, jsonToPass)
                .subscribe(
                    res => {
                        this.refreshOnSuccess(res, true);
                    },
                    error => {
                        this.alert.error("Filter Page : async error #" + error.status + "-myerror-" + this.pageName + "-" + this.controlconfig + "-" + this.masterGridSettings + "-" + this.masterPageName);
                    },
                    () => {
                    }
                );


        }
    }
}

