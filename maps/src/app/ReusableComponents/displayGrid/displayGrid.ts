import {Component, ElementRef, ViewChild, Input, SimpleChange, OnChanges, EventEmitter, Output,OnDestroy} from '@angular/core';
import {AlertService} from "../../ReusableServices/alertService";
import {matrixService} from "../../ReusableServices/matrixService";
import {AppSettingsService} from "../../ReusableServices/appSettingsService";
import {crudService} from "../../ReusableServices/crudService";
import {NavigationService} from "../../ReusableServices/navigationService";
import {DisplayGridFilterService} from './displayGridFilterService';
import {BaseDisplayGrid} from "./displayGridUtils";
import {InterFormsService} from "../../ReusableServices/interFormsService";
import {RuleService} from "../../ReusableServices/ruleService";
import {ApiService} from "../../ReusableServices/apiService";
import {ExcelService} from "../../ReusableServices/excelService";

@Component({
    template: require("./displayGrid.html"),
    selector: 'displayGrid'
})

export class DisplayGridComponent extends BaseDisplayGrid implements OnDestroy, OnChanges {
    @Input() inputPageName: string;
    @Input() parentRow: any;
    @Input() inputGridSettings: string;
    @Input() inputHttpProxy: any;
    @Input() pluginInput: any;
    @Output() displayGridNotifier = new EventEmitter<any>();
    @Input() ParentIdInputValue: any;

    constructor(private intFormSvc: InterFormsService, nav:NavigationService,alert: AlertService,   vmMatrix: matrixService
        , private appSettingsService: AppSettingsService, crudserv:crudService,private filterListener: DisplayGridFilterService, private ruleService: RuleService
        , private apiService: ApiService, private excelService: ExcelService) {
        super (nav, alert,  vmMatrix, appSettingsService, crudserv , filterListener );
        this.alert = alert;
        this.vmMatrix = vmMatrix;
        crudserv.setCallerContext(this);
        this.crudService = crudserv;
        this.navService=nav;
    }

    ngOnInit(){
        let self = this;
        self.filterListenerSubscription = this.filterListener.doFilterBy.subscribe((item) => {
            self.applyFilterFromListener(item);
        });

        if(this.inputPageName){//} && (!this.ParentIdInputValue)){
            this.editViewRowDataTable=[];
            this.pageName = this.inputPageName;
            this.gridSettings = this.inputGridSettings;
            this.httpProxy = this.inputHttpProxy;
            this.ForeignKeyColumn = this.gridSettings["ForeignKeyColumn"];
            //defaulting the value
            this.parentKeyId = this.ParentIdInputValue;

            if (this.parentRow) {
                this.parentKeyId = this.getParentKeyId(this.parentRow);
                this.parentDisplayValue = this.getParentDisplayValue(this.parentRow, this.gridSettings);
            }

            if(this.pluginInput) {
                this.injectConfigAndData(this.gridSettings,this.pluginInput,this.httpProxy, this.pageName);
            }
            else{
                this.GetParentPageDetails(this.gridSettings, this.httpProxy, this.pageName, this.parentKeyId);
            }
        }

        this.isPageLoaded = true;
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if(changes['pluginInput']) {
            var currentValue = changes['pluginInput'].currentValue;
            var oldValue = changes['pluginInput'].previousValue;
            if (currentValue != oldValue && this.pluginInput && this.isPageLoaded) {
                this.editViewRowDataTable=[];
                this.injectConfigAndData(this.inputGridSettings, this.pluginInput, this.httpProxy, this.pageName);
            }
        }
        if(changes['ParentIdInputValue'] && this.inputGridSettings)
        {
            var currentValue = changes['ParentIdInputValue'].currentValue;
            var oldValue = changes['ParentIdInputValue'].previousValue;
            if (currentValue != oldValue)
            {
                this.parentKeyId = currentValue;
                this.ParentIdValue = currentValue;
                if(this.pluginInput && this.isPageLoaded) {
                    this.GetParentPageDetails(this.inputGridSettings, this.inputHttpProxy, this.inputPageName, currentValue);
                }
            }
        }
    }

    refreshCb(context,message){
        if (message==="DeleteSuccess"){
            this.deleteConfirmationObservable.unsubscribe();
            this.crudSuccessObservable.unsubscribe();
            this.DeleteSucceeded();
        }
    }

    setDbMatrix(databaseRecords: any, gridSettings:any) {
        this.PrimaryKeyColumn = this.vmMatrix.getPrimaryColumnName(this.gridSettings);
        this.masterMatrixForDataTable = this.vmMatrix.extractMatrix(databaseRecords, this.gridSettings);
        //Check for any Business Validations for cells like disabled or css changes for specific rows/columns
        if(this.gridSettings["UseBusinessValidation"]){
            this.checkBusinessValidations();
        }

        this.matrixForDataTable = this.masterMatrixForDataTable;
        this.lookupsForDataTable = this.headerForDataTable = this.vmMatrix.extractHeader(databaseRecords, this.gridSettings);

        this.footerForDataTable = this.vmMatrix.extractFooter(databaseRecords, this.gridSettings);
        for (var i = 0; i < this.footerForDataTable.length; i++) {
            if(this.footerForDataTable[i].isTotalVisible){
                this.footerForDataTable[i].val = (this.matrixForDataTable.map(function(a) {return a.cells[i].val;})).reduce((a, b) => a + b, 0);
            }
        }

        this.setRightPaddingColumnCSS(this.headerForDataTable);

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

        if(this.gridSettings["ShowFilterRow"]!= undefined){
            this.showFilterRow = this.gridSettings["ShowFilterRow"];
        }
        else {
            this.showFilterRow = false;
        }

        this.isScrollableGrid = false;
        this.scrollableGridCss = "";
        this.showFooterRow = false;

        if(this.gridSettings["IsScrollableGrid"] && this.gridSettings["IsScrollableGrid"] == true){
            this.isScrollableGrid = true;
            this.IsPagination = false;
            this.itemsPerPage = 100000;
            this.scrollableGridCss = "scrollableGrid";
            this.matrixForDataTable = this.masterMatrixForDataTable

            if(this.gridSettings["ShowFooterRow"]){
                this.showFooterRow = this.gridSettings["ShowFooterRow"];
            }
        }
        else{
            if (this.gridSettings["PaginationPageLimit"]) {
                this.IsPagination = true;
                this.itemsPerPage = this.gridSettings["PaginationPageLimit"];

                if(!this.gridSettings["ServerPagination"]){
                    this.pageChanged(this.currentPage, true);
                }
            }
            else{
                this.matrixForDataTable = this.masterMatrixForDataTable;
                this.IsPagination = false;
            }
        }

        if (this.childType === "view") {
            this.headerForViewRow = this.vmMatrix.extractViewHeader(databaseRecords, this.gridSettings);
        }

        if(this.vmMatrix.pageIsLoaded){
            this.showAddButtonOnLoad = true;
        }

    }



    injectConfigAndData(configuration: any, databaseRecords: any, httpProxy: any, pagename: any, ischildpage: boolean = false) {

        this.ClearSelected();

        this.httpProxy = httpProxy;
        this.controlconfig = configuration;
        this.pageName = pagename;
        this.IsChildPage = ischildpage;
        if (configuration["IsSpreadsheetGrid"]){
            this.isSpreadsheetGrid=configuration["IsSpreadsheetGrid"];
        }
        if (configuration["ChildGridType"]){
            this.childGridType = configuration["ChildGridType"];
        }
        this.databaseRecords = databaseRecords;
        var myConfig = configuration;
        this.childType=myConfig["ChildType"];
        var dataSourceAddressTables: Array<string> = new Array<string>();

        this.showGridBody = true;
//        this.sortColumnName = "";

        for (var key in myConfig.ColumnConfiguration) {
            if (myConfig.ColumnConfiguration[key].dataSourceAddress) {
                dataSourceAddressTables.push(myConfig.ColumnConfiguration[key].dataSourceAddress.tableName);
            }
        }
        if (dataSourceAddressTables.length === 0) {
            this.gridSettings = myConfig;

            this.setChildControlVisibility();
            this.setDbMatrix(databaseRecords, this.gridSettings);
            this.updateSortCssForSequences(this.sortAsc ? "fa fa-arrow-up" : "fa fa-arrow-down");
            //return;
        }
        else {
            //this.httpAbs.fetchMultiple(dataSourceAddressTables).subscribe(
            this.apiService.fetchMultipleList(dataSourceAddressTables).subscribe(
                res => {
                    // check if res in not an Array
                    var i: number = 0;
                    for (var key in myConfig.ColumnConfiguration) {
                        if (myConfig.ColumnConfiguration[key].dataSourceAddress) {
                            myConfig.ColumnConfiguration[key].dataSource = res[i];
                            i++;
                        }
                    }
                    this.gridSettings = myConfig;
                    this.setChildControlVisibility();
                    this.setDbMatrix(databaseRecords, this.gridSettings);
                    this.updateSortCssForSequences(this.sortAsc ? "fa fa-arrow-up" : "fa fa-arrow-down");
                }
                ,
                error => {
                    this.alert.error("InjectConfigAndData: async error #" + error.status);
                },
                () => {
                }
            );
        }

        if (myConfig) {
            this.hideAddBtn = myConfig['ShallHideAddButton'];
            this.hideDeleteBtn = myConfig['ShallHideDeleteButton'];
            this.hideLeftButtonsColumn = myConfig['HideLeftButtonsColumn'];

            this.rowSelectionMode = myConfig['RowSelectionMode'];

            if(this.rowSelectionMode != undefined && ( this.rowSelectionMode === "Single" || this.rowSelectionMode === "Multi")) {
                this.hideRowCheckBox = false;
            }
            else{
                this.hideRowCheckBox = true;
            }

            if(myConfig["CustomButtons"]) {
                this.customButtonsList = myConfig["CustomButtons"];
            }
            if(myConfig["CustomRowButtons"]) {
                this.customRowButtonsList = myConfig["CustomRowButtons"];
            }
        }

        if(this.databaseRecords.length > 0) {
            this.showNoData = false;
        }
        else if(this.gridSettings) {
            this.headerForDataTable = this.vmMatrix.extractHeader(this.databaseRecords, this.gridSettings);
            this.showNoData = true;
            this.IsPagination = false;
        }

        if (this.sortColumnName == "") {
            this.setDefaultSortColumn();
        }
    }

    RefreshDataFromFormBuilder(updatedValue) {
        if (updatedValue.value === "cancel") {
            this.cancelClicked();
        }
        else {
            this.PageRefreshFromDynamicComponent(updatedValue.value);
        }
    }

    showChildViewClicked(selectedRow: any) {

        if (this.childGridType === 'displayGrid') {
            selectedRow.collapsed = !selectedRow.collapsed;
            return;
        }

        this.parentDisplayValue = this.getParentDisplayValue(selectedRow, this.gridSettings[this.CONST_CHILDCONTROL_CONFIG]);
        this.filterForDataTable = null;
        this.getChildRecords(selectedRow.primaryKey.value);
    }

    getChildRecords(idValue, overrideMasterData: boolean = true) {
        if (this.httpProxy) {
            if (idValue) {
                if (this.pageName.indexOf("_child") > 0) {
                    this.pageName = this.pageName.replace("_child", "");
                }
            }
            this.sortColumnName = "";

            this.httpProxy.ExecutePageRefresh(this.pageName + "_child", idValue)
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

    GetParentPageDetails(controlconfig: any, httpProxyObject: any, pageName, id=null) {
        this.httpProxy = httpProxyObject;
        this.pageName = pageName;
        this.controlconfig = controlconfig;
        if(id)
        {
            this.ParentIdValue = id;
        }
        else {
            this.ParentIdValue = 0;
        }
        this.RefreshPage();
    }


    ReturnToParent() {
        this.filteredMasterPage = false;
        this.IsChildPage = false;
        this.sortColumnName = "";
        this.filterForDataTable = null;
        this.RefreshPage();
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

        var returndata = JSON.parse(jsonValue);
        return returndata;
    }

    DeleteClicked(selectedRow: any) {
        this.crudSuccessObservable = this.crudService.OnCrudOperationSuccess.subscribe((message)=> {
                this.crudSuccessObservable.unsubscribe();
                this.refreshCb(this.crudService.getCallerContext(), message)
            }
        );
        this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deletionQuestionMsg);
        this.deleteConfirmationObservable = this.alert.requestConfirmationAnswer$.subscribe(item => {
            this.alert.askConfirmation = false;
            this.deleteConfirmationObservable.unsubscribe();

            if (item != "OK") {
                this.crudSuccessObservable.unsubscribe();
                return;
            }
            this.editViewRowDataTable= this.vmMatrix.viewMatrix(selectedRow.cells, this.headerForDataTable, this.gridSettings, this.databaseRecords);
            this.crudService.delete( this.editViewRowDataTable, this.pageName, this.PrimaryKeyColumn, this.httpProxy);
        });
    }

    DeleteSucceeded(){
        var data = this.vmMatrix.buildJSONObject(this.editViewRowDataTable, this.PrimaryKeyColumn);
        var IdValue = 0;
        if (this.pageName.indexOf("_child") > 0) {

            var column = this.gridSettings.ColumnConfiguration.find(p=>p.dbColumnName ==this.ForeignKeyColumn);
            var columnDataSource = column.dataSource.find(x=>x[column.dataSourceAddress.dbColumnName] == data[this.ForeignKeyColumn]);
            IdValue = columnDataSource[column.dataSourceAddress.dbColumnName];

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
            this.intFormSvc.startSpinner('card');

            var pageName = this.pageName;
            if (this.masterGridSettings && !this.IsChildPage) {
                pageName = this.masterPageName;
            }
            if(this.controlconfig["ServerPagination"] == true){
                this.filterAPI();
            }
            else {
                this.httpProxy.ExecutePageRefresh(pageName, this.ParentIdValue)
                    .subscribe(
                        res => {
                            this.refreshOnSuccess(res, false);
                        },
                        error => {
                            this.alert.error("Refresh Page : async error #" + error.status + "-myerror-" + this.pageName + "-" + this.controlconfig + "-" + this.masterGridSettings + "-" + this.masterPageName);
                        },
                        () => {
                            this.intFormSvc.stopSpinner();
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

        if (this.masterGridSettings && !this.IsChildPage) {
            this.ForeignKeyColumn = this.masterGridSettings["ForeignKeyColumn"];
            this.injectConfigAndData(this.masterGridSettings, rowsOfData, this.httpProxy, this.masterPageName);
        }
        else {
            this.ForeignKeyColumn = this.controlconfig["ForeignKeyColumn"];
            this.injectConfigAndData(this.controlconfig, rowsOfData, this.httpProxy, this.pageName, this.IsChildPage);
        }
    }

    filterValueEntered(event: any): void {
        var sequence = this.activeFilterSequence;
        var filterInputValue = event.target.value;

        this.filteredMatrix = this.masterMatrixForDataTable.filter(function (line) {
            var objElement1 = line.cells.find(function (x) {
                return (x.sequence === sequence)
            });
            var cellValue = new String(objElement1.val.toString().toLocaleLowerCase());
            if (cellValue.startsWith(filterInputValue.toString().toLocaleLowerCase())) {
                return line;
            }
        });

        if(filterInputValue.toString() != "") {
            this.filtered = true;
            this.totalItems = this.filteredMatrix.length;
        }
        else{
            this.filtered = false;
            this.totalItems = this.masterMatrixForDataTable.length;
        }
        this.pageChanged(null, true);
    }

    filterWithHeaderValues(){

        this.matrixForDataTable = this.masterMatrixForDataTable;

        for(var i = 0; i < this.headerForDataTable.length; i++){
            if(this.headerForDataTable[i].filter.length > 0) {
                var filterValue = this.headerForDataTable[i].filter;

                let filteredMatrix:any = {};
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
        if (sortCss != "fa fa-arrow-up") {
            this.sortAsc = true;
        }
        else {
            this.sortAsc = false;
        }

        let inputArray:Array<any> = [];

        if(this.isScrollableGrid){
            inputArray = this.masterMatrixForDataTable;
        }
        else{
            if(this.filtered){
                inputArray = this.filteredMatrix;
            }
            else{
                inputArray = this.masterMatrixForDataTable;
            }
        }

        this.currentPage = 1;

        if(this.gridSettings["ServerPagination"] == undefined || this.gridSettings["ServerPagination"] == false) {
            if(this.sortAsc){
                this.sortAscending(this.sortColumnName, inputArray);
                this.pageChanged(null, true);
            }
            else {
                this.sortDescending(this.sortColumnName, inputArray);
                this.pageChanged(null, true);
            }
        }
        else {
            this.filterAPI();
        }
    }

    initializeFilterOptions() {

        if(this.gridSettings["ServerPagination"] == undefined || this.gridSettings["ServerPagination"] == false) {
            this.createFilters(this.masterMatrixForDataTable);
        }
        else {
            this.httpProxy.ExecutePageRefresh(this.pageName, this.inputPageName ? this.ParentIdValue : this.childId)
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
                    var valueToAdd;
                    if(this.gridSettings["ServerPagination"] == undefined || this.gridSettings["ServerPagination"] == false) {
                        valueToAdd = res[j].cells[i].val;
                    }
                    else {
                        valueToAdd = res[j][this.filterForDataTable[i].name];
                    }
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


    private pageChanged(event: any, override: boolean = false): void {

        if (event != null && event.page != null)
            this.currentPage = event.page;

        if (this.gridSettings["ServerPagination"] == true && !override) {
            this.filterAPI();
        }
        else {

            if (this.filtered) {
                this.totalItems = this.filteredMatrix.length;
            }
            else{
                this.totalItems = this.masterMatrixForDataTable.length;
            }

            if(this.isScrollableGrid == false) {

                if (this.filtered) {
                    this.matrixForDataTable = this.filteredMatrix.slice(
                        (this.currentPage - 1) * this.itemsPerPage,
                        this.currentPage * this.itemsPerPage);

                    this.currentPage = 1;

                }
                else {
                    if (this.masterMatrixForDataTable != null)
                        this.matrixForDataTable = this.masterMatrixForDataTable.slice(
                            (this.currentPage - 1) * this.itemsPerPage,
                            this.currentPage * this.itemsPerPage);
                }
            }
            else{
                if (this.filtered){
                    this.matrixForDataTable = this.filteredMatrix;
                }
                else {
                    this.matrixForDataTable = this.masterMatrixForDataTable;
                }
            }
        }
    };

    private filterSelect(event: any): void{
        this.filterForDataTable[parseInt(event.target.id.replace('f',''))].filterValue[0] = event.target.value;
        this.filterAPI();
    };

    private applyFilterFromListener(incToken: any): void{
        //this.filterForDataTable[parseInt(event.target.id.replace('f',''))].filterValue[0] = event.target.value;
        this.filterForDataTable.find(x => x.name === incToken.filterName).filterValue[0] = incToken.filterValue;
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
            if (this.masterGridSettings && !this.IsChildPage) {
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
                        else if (this.filterForDataTable[i].htmlControlType.indexOf('date') >= 0) {
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
                                filterColObj.DBColumnValue = this.filterForDataTable[i].filterValue[1];
                                filterColObj.WhereClauseCondition = "<=";
                                filterObj.ListOfFilterColumns.push(filterColObj);
                            }
                        }
                    }
                }
            }

            if (this.pageName.indexOf("_child") > 0) {
                if (filterObj.ListOfFilterColumns.filter(x => x.DBColumnName == this.ForeignKeyColumn).length == 0) {
                    var filterColObj:any = {};
                    filterColObj.DBColumnName = this.ForeignKeyColumn;
                    filterColObj.DBColumnValue = this.inputPageName ? this.ParentIdValue : this.childId;
                    filterColObj.WhereClauseCondition = "=";
                    filterObj.ListOfFilterColumns.push(filterColObj);
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
                        this.intFormSvc.stopSpinner();
                    }
                );


        }
    }



    setDefaultSortColumn(){
        if (this.controlconfig["DefaultSortColumn"]) {
            var defaultSortColumn = this.controlconfig["DefaultSortColumn"];

            var defaultSortCss = "fa fa-lg fa-arrow-down";
            if (this.controlconfig["DefaultSortDirection"]) {
                if (this.controlconfig["DefaultSortDirection"].toLowerCase() == "desc")
                    defaultSortCss = "fa fa-lg fa-arrow-up";
            }
            this.sortRequested(defaultSortColumn, defaultSortCss);
        }
    }

    customButtonClicked(customButton){
        var result = true;
        if (customButton.formValidate) {
            this.matrixForDataTable.forEach((x)=>{
                var plugInValue = this.vmMatrix.buildJSONObject(x.cells, this.PrimaryKeyColumn);
                var tempResult = this.ruleService.validateRulesByRulesConfig(plugInValue, this.gridSettings["RulesConfig"], x.cells);
                if(!tempResult) result = false;
            })

        }
        if(result) {
            this.displayGridNotifier.emit({
                value: this.selectedRows,
                masterList: this.masterMatrixForDataTable,
                controlName: customButton.name
            });
        }
    }

    customButtonChildGridClicked(outputData, parentRow) {
        this.displayGridNotifier.emit({
            value: outputData.value,
            parentRow: parentRow,
            controlName: outputData.controlName
        });
    }

    customRowButtonListClicked(customRowButton, selectedRow)
    {
        var result = true;
        if (customRowButton.formValidate) {
            var plugInValue = this.vmMatrix.buildJSONObject(selectedRow.cells, this.PrimaryKeyColumn);
            var tempResult = this.ruleService.validateRulesByRulesConfig(plugInValue, this.gridSettings["RulesConfig"], selectedRow.cells);
            if(!tempResult) result = false;
        }
        if(result) {
            this.displayGridNotifier.emit({
                value:  selectedRow,
                controlName: customRowButton.name
            });
        }
    }

    checkBusinessValidations() {
        if (this.masterMatrixForDataTable.length) {
            //methods to be used in proxy services
            this.httpProxy.checkBusinessValidations(this.masterMatrixForDataTable, this.pageName);
        }
    }

    ngOnDestroy(){
        this.filterListenerSubscription.unsubscribe();
    }

    getChildGridSettings(selectedRow)
    {
        if(selectedRow && selectedRow.selectedColumnName)
        {
            var tempColumn = this.gridSettings.ColumnConfiguration.find(p=>p.dbColumnName == selectedRow.selectedColumnName);
            if(tempColumn)
            {
                return tempColumn.ChildControlConfig;
            }
        }
        else {
            return this.gridSettings['ChildControlConfig'];
        }
    }

    getChildPageName(selectedRow)
    {
        if(selectedRow && selectedRow.selectedColumnName)
        {
            var tempColumn = this.gridSettings.ColumnConfiguration.find(p=>p.dbColumnName == selectedRow.selectedColumnName);
            if(tempColumn)
            {
                return this.pageName + '_' + tempColumn.dbColumnName + '_child';
            }
        }
        else {
            return this.pageName + '_child';
        }
    }

    exportToExcelClicked()
    {
        this.excelService.exportToExcel(this.gridSettings,this.databaseRecords);
    }
}