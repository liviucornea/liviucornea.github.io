"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var alertService_1 = require("../../ReusableServices/alertService");
var matrixService_1 = require("../../ReusableServices/matrixService");
var appSettingsService_1 = require("../../ReusableServices/appSettingsService");
var crudService_1 = require("../../ReusableServices/crudService");
var navigationService_1 = require("../../ReusableServices/navigationService");
var displayGridFilterService_1 = require('./displayGridFilterService');
var displayGridUtils_1 = require("./displayGridUtils");
var interFormsService_1 = require("../../ReusableServices/interFormsService");
var ruleService_1 = require("../../ReusableServices/ruleService");
var apiService_1 = require("../../ReusableServices/apiService");
var excelService_1 = require("../../ReusableServices/excelService");
var DisplayGridComponent = (function (_super) {
    __extends(DisplayGridComponent, _super);
    function DisplayGridComponent(intFormSvc, nav, alert, vmMatrix, appSettingsService, crudserv, filterListener, ruleService, apiService, excelService) {
        _super.call(this, nav, alert, vmMatrix, appSettingsService, crudserv, filterListener);
        this.intFormSvc = intFormSvc;
        this.appSettingsService = appSettingsService;
        this.filterListener = filterListener;
        this.ruleService = ruleService;
        this.apiService = apiService;
        this.excelService = excelService;
        this.displayGridNotifier = new core_1.EventEmitter();
        this.alert = alert;
        this.vmMatrix = vmMatrix;
        crudserv.setCallerContext(this);
        this.crudService = crudserv;
        this.navService = nav;
    }
    DisplayGridComponent.prototype.ngOnInit = function () {
        var self = this;
        self.filterListenerSubscription = this.filterListener.doFilterBy.subscribe(function (item) {
            self.applyFilterFromListener(item);
        });
        if (this.inputPageName) {
            this.editViewRowDataTable = [];
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
            if (this.pluginInput) {
                this.injectConfigAndData(this.gridSettings, this.pluginInput, this.httpProxy, this.pageName);
            }
            else {
                this.GetParentPageDetails(this.gridSettings, this.httpProxy, this.pageName, this.parentKeyId);
            }
        }
        this.isPageLoaded = true;
    };
    DisplayGridComponent.prototype.ngOnChanges = function (changes) {
        if (changes['pluginInput']) {
            var currentValue = changes['pluginInput'].currentValue;
            var oldValue = changes['pluginInput'].previousValue;
            if (currentValue != oldValue && this.pluginInput && this.isPageLoaded) {
                this.editViewRowDataTable = [];
                this.injectConfigAndData(this.inputGridSettings, this.pluginInput, this.httpProxy, this.pageName);
            }
        }
        if (changes['ParentIdInputValue'] && this.inputGridSettings) {
            var currentValue = changes['ParentIdInputValue'].currentValue;
            var oldValue = changes['ParentIdInputValue'].previousValue;
            if (currentValue != oldValue) {
                this.parentKeyId = currentValue;
                this.ParentIdValue = currentValue;
                if (this.pluginInput && this.isPageLoaded) {
                    this.GetParentPageDetails(this.inputGridSettings, this.inputHttpProxy, this.inputPageName, currentValue);
                }
            }
        }
    };
    DisplayGridComponent.prototype.refreshCb = function (context, message) {
        if (message === "DeleteSuccess") {
            this.deleteConfirmationObservable.unsubscribe();
            this.crudSuccessObservable.unsubscribe();
            this.DeleteSucceeded();
        }
    };
    DisplayGridComponent.prototype.setDbMatrix = function (databaseRecords, gridSettings) {
        this.PrimaryKeyColumn = this.vmMatrix.getPrimaryColumnName(this.gridSettings);
        this.masterMatrixForDataTable = this.vmMatrix.extractMatrix(databaseRecords, this.gridSettings);
        //Check for any Business Validations for cells like disabled or css changes for specific rows/columns
        if (this.gridSettings["UseBusinessValidation"]) {
            this.checkBusinessValidations();
        }
        this.matrixForDataTable = this.masterMatrixForDataTable;
        this.lookupsForDataTable = this.headerForDataTable = this.vmMatrix.extractHeader(databaseRecords, this.gridSettings);
        this.footerForDataTable = this.vmMatrix.extractFooter(databaseRecords, this.gridSettings);
        for (var i = 0; i < this.footerForDataTable.length; i++) {
            if (this.footerForDataTable[i].isTotalVisible) {
                this.footerForDataTable[i].val = (this.matrixForDataTable.map(function (a) { return a.cells[i].val; })).reduce(function (a, b) { return a + b; }, 0);
            }
        }
        this.setRightPaddingColumnCSS(this.headerForDataTable);
        var dynamicHeaderSection = this.gridSettings["dynamicHeaderSection"];
        if (dynamicHeaderSection) {
            this.hasDynamicHeader = true;
            this.buildDynamicHeader(dynamicHeaderSection, gridSettings);
        }
        if (!this.filterForDataTable) {
            this.showFilters = false;
            this.filterForDataTable = this.vmMatrix.extractFilter(databaseRecords, this.gridSettings);
            this.initializeFilterOptions();
        }
        if (this.gridSettings["ShowFilterRow"] != undefined) {
            this.showFilterRow = this.gridSettings["ShowFilterRow"];
        }
        else {
            this.showFilterRow = false;
        }
        this.isScrollableGrid = false;
        this.scrollableGridCss = "";
        this.showFooterRow = false;
        if (this.gridSettings["IsScrollableGrid"] && this.gridSettings["IsScrollableGrid"] == true) {
            this.isScrollableGrid = true;
            this.IsPagination = false;
            this.itemsPerPage = 100000;
            this.scrollableGridCss = "scrollableGrid";
            this.matrixForDataTable = this.masterMatrixForDataTable;
            if (this.gridSettings["ShowFooterRow"]) {
                this.showFooterRow = this.gridSettings["ShowFooterRow"];
            }
        }
        else {
            if (this.gridSettings["PaginationPageLimit"]) {
                this.IsPagination = true;
                this.itemsPerPage = this.gridSettings["PaginationPageLimit"];
                if (!this.gridSettings["ServerPagination"]) {
                    this.pageChanged(this.currentPage, true);
                }
            }
            else {
                this.matrixForDataTable = this.masterMatrixForDataTable;
                this.IsPagination = false;
            }
        }
        if (this.childType === "view") {
            this.headerForViewRow = this.vmMatrix.extractViewHeader(databaseRecords, this.gridSettings);
        }
        if (this.vmMatrix.pageIsLoaded) {
            this.showAddButtonOnLoad = true;
        }
    };
    DisplayGridComponent.prototype.injectConfigAndData = function (configuration, databaseRecords, httpProxy, pagename, ischildpage) {
        var _this = this;
        if (ischildpage === void 0) { ischildpage = false; }
        this.ClearSelected();
        this.httpProxy = httpProxy;
        this.controlconfig = configuration;
        this.pageName = pagename;
        this.IsChildPage = ischildpage;
        if (configuration["IsSpreadsheetGrid"]) {
            this.isSpreadsheetGrid = configuration["IsSpreadsheetGrid"];
        }
        if (configuration["ChildGridType"]) {
            this.childGridType = configuration["ChildGridType"];
        }
        this.databaseRecords = databaseRecords;
        var myConfig = configuration;
        this.childType = myConfig["ChildType"];
        var dataSourceAddressTables = new Array();
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
        }
        else {
            //this.httpAbs.fetchMultiple(dataSourceAddressTables).subscribe(
            this.apiService.fetchMultipleList(dataSourceAddressTables).subscribe(function (res) {
                // check if res in not an Array
                var i = 0;
                for (var key in myConfig.ColumnConfiguration) {
                    if (myConfig.ColumnConfiguration[key].dataSourceAddress) {
                        myConfig.ColumnConfiguration[key].dataSource = res[i];
                        i++;
                    }
                }
                _this.gridSettings = myConfig;
                _this.setChildControlVisibility();
                _this.setDbMatrix(databaseRecords, _this.gridSettings);
                _this.updateSortCssForSequences(_this.sortAsc ? "fa fa-arrow-up" : "fa fa-arrow-down");
            }, function (error) {
                _this.alert.error("InjectConfigAndData: async error #" + error.status);
            }, function () {
            });
        }
        if (myConfig) {
            this.hideAddBtn = myConfig['ShallHideAddButton'];
            this.hideDeleteBtn = myConfig['ShallHideDeleteButton'];
            this.hideLeftButtonsColumn = myConfig['HideLeftButtonsColumn'];
            this.rowSelectionMode = myConfig['RowSelectionMode'];
            if (this.rowSelectionMode != undefined && (this.rowSelectionMode === "Single" || this.rowSelectionMode === "Multi")) {
                this.hideRowCheckBox = false;
            }
            else {
                this.hideRowCheckBox = true;
            }
            if (myConfig["CustomButtons"]) {
                this.customButtonsList = myConfig["CustomButtons"];
            }
            if (myConfig["CustomRowButtons"]) {
                this.customRowButtonsList = myConfig["CustomRowButtons"];
            }
        }
        if (this.databaseRecords.length > 0) {
            this.showNoData = false;
        }
        else if (this.gridSettings) {
            this.headerForDataTable = this.vmMatrix.extractHeader(this.databaseRecords, this.gridSettings);
            this.showNoData = true;
            this.IsPagination = false;
        }
        if (this.sortColumnName == "") {
            this.setDefaultSortColumn();
        }
    };
    DisplayGridComponent.prototype.RefreshDataFromFormBuilder = function (updatedValue) {
        if (updatedValue.value === "cancel") {
            this.cancelClicked();
        }
        else {
            this.PageRefreshFromDynamicComponent(updatedValue.value);
        }
    };
    DisplayGridComponent.prototype.showChildViewClicked = function (selectedRow) {
        if (this.childGridType === 'displayGrid') {
            selectedRow.collapsed = !selectedRow.collapsed;
            return;
        }
        this.parentDisplayValue = this.getParentDisplayValue(selectedRow, this.gridSettings[this.CONST_CHILDCONTROL_CONFIG]);
        this.filterForDataTable = null;
        this.getChildRecords(selectedRow.primaryKey.value);
    };
    DisplayGridComponent.prototype.getChildRecords = function (idValue, overrideMasterData) {
        var _this = this;
        if (overrideMasterData === void 0) { overrideMasterData = true; }
        if (this.httpProxy) {
            if (idValue) {
                if (this.pageName.indexOf("_child") > 0) {
                    this.pageName = this.pageName.replace("_child", "");
                }
            }
            this.sortColumnName = "";
            this.httpProxy.ExecutePageRefresh(this.pageName + "_child", idValue)
                .subscribe(function (res) {
                _this.viewDetail = false;
                _this.editDetail = false;
                _this.addDetail = false;
                _this.childId = idValue;
                if (overrideMasterData) {
                    _this.masterGridSettings = _this.gridSettings;
                    _this.masterPageName = _this.pageName;
                }
                if (_this.gridSettings[_this.CONST_CHILDCONTROL_CONFIG]) {
                    _this.ForeignKeyColumn = _this.gridSettings[_this.CONST_CHILDCONTROL_CONFIG]["ForeignKeyColumn"];
                    _this.injectConfigAndData(_this.gridSettings[_this.CONST_CHILDCONTROL_CONFIG], res, _this.httpProxy, _this.pageName + "_child", true);
                }
                else {
                    _this.injectConfigAndData(_this.gridSettings, res, _this.httpProxy, _this.pageName + "_child", true);
                }
            }, function (error) {
                _this.alert.error("Get Child Records: async error #" + error.status);
            }, function () {
            });
        }
    };
    DisplayGridComponent.prototype.GetParentPageDetails = function (controlconfig, httpProxyObject, pageName, id) {
        if (id === void 0) { id = null; }
        this.httpProxy = httpProxyObject;
        this.pageName = pageName;
        this.controlconfig = controlconfig;
        if (id) {
            this.ParentIdValue = id;
        }
        else {
            this.ParentIdValue = 0;
        }
        this.RefreshPage();
    };
    DisplayGridComponent.prototype.ReturnToParent = function () {
        this.filteredMasterPage = false;
        this.IsChildPage = false;
        this.sortColumnName = "";
        this.filterForDataTable = null;
        this.RefreshPage();
    };
    DisplayGridComponent.prototype.PageRefreshFromDynamicComponent = function (data) {
        var IdValue = 0;
        if (this.IsChildPage) {
            if (data[this.ForeignKeyColumn]) {
                IdValue = data[this.ForeignKeyColumn];
            }
        }
        if (this.httpProxy) {
            if (this.IsChildPage) {
                if (this.masterPageName) {
                    this.pageName = this.masterPageName;
                }
                this.getChildRecords(IdValue, false);
            }
            else {
                this.RefreshPage();
            }
        }
    };
    DisplayGridComponent.prototype.buildJSONObject = function () {
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
    };
    DisplayGridComponent.prototype.DeleteClicked = function (selectedRow) {
        var _this = this;
        this.crudSuccessObservable = this.crudService.OnCrudOperationSuccess.subscribe(function (message) {
            _this.crudSuccessObservable.unsubscribe();
            _this.refreshCb(_this.crudService.getCallerContext(), message);
        });
        this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deletionQuestionMsg);
        this.deleteConfirmationObservable = this.alert.requestConfirmationAnswer$.subscribe(function (item) {
            _this.alert.askConfirmation = false;
            _this.deleteConfirmationObservable.unsubscribe();
            if (item != "OK") {
                _this.crudSuccessObservable.unsubscribe();
                return;
            }
            _this.editViewRowDataTable = _this.vmMatrix.viewMatrix(selectedRow.cells, _this.headerForDataTable, _this.gridSettings, _this.databaseRecords);
            _this.crudService.delete(_this.editViewRowDataTable, _this.pageName, _this.PrimaryKeyColumn, _this.httpProxy);
        });
    };
    DisplayGridComponent.prototype.DeleteSucceeded = function () {
        var _this = this;
        var data = this.vmMatrix.buildJSONObject(this.editViewRowDataTable, this.PrimaryKeyColumn);
        var IdValue = 0;
        if (this.pageName.indexOf("_child") > 0) {
            var column = this.gridSettings.ColumnConfiguration.find(function (p) { return p.dbColumnName == _this.ForeignKeyColumn; });
            var columnDataSource = column.dataSource.find(function (x) { return x[column.dataSourceAddress.dbColumnName] == data[_this.ForeignKeyColumn]; });
            IdValue = columnDataSource[column.dataSourceAddress.dbColumnName];
            if (this.masterPageName) {
                this.pageName = this.masterPageName;
            }
            this.getChildRecords(IdValue, false);
        }
        else {
            this.RefreshPage();
        }
    };
    DisplayGridComponent.prototype.RefreshPage = function () {
        var _this = this;
        if (this.httpProxy) {
            this.intFormSvc.startSpinner('card');
            var pageName = this.pageName;
            if (this.masterGridSettings && !this.IsChildPage) {
                pageName = this.masterPageName;
            }
            if (this.controlconfig["ServerPagination"] == true) {
                this.filterAPI();
            }
            else {
                this.httpProxy.ExecutePageRefresh(pageName, this.ParentIdValue)
                    .subscribe(function (res) {
                    _this.refreshOnSuccess(res, false);
                }, function (error) {
                    _this.alert.error("Refresh Page : async error #" + error.status + "-myerror-" + _this.pageName + "-" + _this.controlconfig + "-" + _this.masterGridSettings + "-" + _this.masterPageName);
                }, function () {
                    _this.intFormSvc.stopSpinner();
                });
            }
        }
    };
    DisplayGridComponent.prototype.refreshOnSuccess = function (res, filtered) {
        this.viewDetail = false;
        this.editDetail = false;
        this.addDetail = false;
        var rowsOfData;
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
    };
    DisplayGridComponent.prototype.filterValueEntered = function (event) {
        var sequence = this.activeFilterSequence;
        var filterInputValue = event.target.value;
        this.filteredMatrix = this.masterMatrixForDataTable.filter(function (line) {
            var objElement1 = line.cells.find(function (x) {
                return (x.sequence === sequence);
            });
            var cellValue = new String(objElement1.val.toString().toLocaleLowerCase());
            if (cellValue.startsWith(filterInputValue.toString().toLocaleLowerCase())) {
                return line;
            }
        });
        if (filterInputValue.toString() != "") {
            this.filtered = true;
            this.totalItems = this.filteredMatrix.length;
        }
        else {
            this.filtered = false;
            this.totalItems = this.masterMatrixForDataTable.length;
        }
        this.pageChanged(null, true);
    };
    DisplayGridComponent.prototype.filterWithHeaderValues = function () {
        this.matrixForDataTable = this.masterMatrixForDataTable;
        for (var i = 0; i < this.headerForDataTable.length; i++) {
            if (this.headerForDataTable[i].filter.length > 0) {
                var filterValue = this.headerForDataTable[i].filter;
                var filteredMatrix = {};
                filteredMatrix = this.matrixForDataTable.filter(function (line) {
                    var objElement1 = line.cells.find(function (x) {
                        return (x.sequence === i);
                    });
                    if (objElement1.val) {
                        var cellValue = new String(objElement1.val.toString().toLocaleLowerCase());
                        if (cellValue.startsWith(filterValue.toString().toLocaleLowerCase())) {
                            return line;
                        }
                    }
                });
                this.matrixForDataTable = filteredMatrix;
            }
        }
    };
    DisplayGridComponent.prototype.sortRequested = function (clickedColumn, sortCss) {
        this.sortColumnName = clickedColumn.toLowerCase();
        if (sortCss != "fa fa-arrow-up") {
            this.sortAsc = true;
        }
        else {
            this.sortAsc = false;
        }
        var inputArray = [];
        if (this.isScrollableGrid) {
            inputArray = this.masterMatrixForDataTable;
        }
        else {
            if (this.filtered) {
                inputArray = this.filteredMatrix;
            }
            else {
                inputArray = this.masterMatrixForDataTable;
            }
        }
        this.currentPage = 1;
        if (this.gridSettings["ServerPagination"] == undefined || this.gridSettings["ServerPagination"] == false) {
            if (this.sortAsc) {
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
    };
    DisplayGridComponent.prototype.initializeFilterOptions = function () {
        var _this = this;
        if (this.gridSettings["ServerPagination"] == undefined || this.gridSettings["ServerPagination"] == false) {
            this.createFilters(this.masterMatrixForDataTable);
        }
        else {
            this.httpProxy.ExecutePageRefresh(this.pageName, this.inputPageName ? this.ParentIdValue : this.childId)
                .subscribe(function (res) {
                _this.createFilters(res);
            }, function (error) {
                _this.alert.error("Refresh Page : async error #" + error.status + "-myerror-" + _this.pageName + "-" + _this.controlconfig + "-" + _this.masterGridSettings + "-" + _this.masterPageName);
            }, function () {
            });
        }
    };
    DisplayGridComponent.prototype.createFilters = function (res) {
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
                    if (this.gridSettings["ServerPagination"] == undefined || this.gridSettings["ServerPagination"] == false) {
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
                var columnSettings = this.gridSettings.ColumnConfiguration.find(function (z) { return z.dbColumnName === dbColumnName; });
                if (columnSettings.dataSource) {
                    var idCol = columnSettings.dataSourceAddress.dbColumnName;
                    var desCol = columnSettings.dataSourceAddress.displayColumnName;
                    //Loop through the result set and grab the FK column values
                    var optionValues = [];
                    for (var j = 0; j < usedValues.length; j++) {
                        var option = {
                            label: usedValues[j],
                            value: usedValues[j]
                        };
                        var dataSourceToUse;
                        for (var k = 0; k < columnSettings.dataSource.length; k++) {
                            if (columnSettings.dataSource[k][idCol] === usedValues[j]) {
                                dataSourceToUse = columnSettings.dataSource[k];
                                break;
                            }
                        }
                        if (dataSourceToUse) {
                            option.label = dataSourceToUse[desCol];
                            option.value = dataSourceToUse[idCol];
                        }
                        optionValues.push(option);
                    }
                    //Sort the options by ascending order
                    optionValues.sort(function (a, b) {
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
    };
    DisplayGridComponent.prototype.pageChanged = function (event, override) {
        if (override === void 0) { override = false; }
        if (event != null && event.page != null)
            this.currentPage = event.page;
        if (this.gridSettings["ServerPagination"] == true && !override) {
            this.filterAPI();
        }
        else {
            if (this.filtered) {
                this.totalItems = this.filteredMatrix.length;
            }
            else {
                this.totalItems = this.masterMatrixForDataTable.length;
            }
            if (this.isScrollableGrid == false) {
                if (this.filtered) {
                    this.matrixForDataTable = this.filteredMatrix.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
                    this.currentPage = 1;
                }
                else {
                    if (this.masterMatrixForDataTable != null)
                        this.matrixForDataTable = this.masterMatrixForDataTable.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
                }
            }
            else {
                if (this.filtered) {
                    this.matrixForDataTable = this.filteredMatrix;
                }
                else {
                    this.matrixForDataTable = this.masterMatrixForDataTable;
                }
            }
        }
    };
    ;
    DisplayGridComponent.prototype.filterSelect = function (event) {
        this.filterForDataTable[parseInt(event.target.id.replace('f', ''))].filterValue[0] = event.target.value;
        this.filterAPI();
    };
    ;
    DisplayGridComponent.prototype.applyFilterFromListener = function (incToken) {
        //this.filterForDataTable[parseInt(event.target.id.replace('f',''))].filterValue[0] = event.target.value;
        this.filterForDataTable.find(function (x) { return x.name === incToken.filterName; }).filterValue[0] = incToken.filterValue;
        this.filterAPI();
    };
    ;
    DisplayGridComponent.prototype.filterDate = function (event) {
        if (event.target.id.indexOf('ff') > -1) {
            this.filterForDataTable[parseInt(event.target.id.replace('ff', ''))].filterValue[0] = event.target.value;
        }
        else if (event.target.id.indexOf('ft') > -1) {
            this.filterForDataTable[parseInt(event.target.id.replace('ft', ''))].filterValue[1] = event.target.value;
        }
        this.filterAPI();
    };
    ;
    DisplayGridComponent.prototype.singalRCallback = function () {
        if (this.IsChildPage) {
            this.getChildRecords(this.childId, false);
        }
        else {
            this.filterAPI();
        }
    };
    DisplayGridComponent.prototype.filterAPI = function () {
        var _this = this;
        if (this.httpProxy) {
            var pageName = this.pageName;
            if (this.masterGridSettings && !this.IsChildPage) {
                pageName = this.masterPageName;
            }
            var filterObj = {};
            filterObj.ListOfFilterColumns = [];
            if (this.filterForDataTable) {
                for (var i = 0; i < this.filterForDataTable.length; i++) {
                    if (this.filterForDataTable[i].filterable) {
                        if (this.filterForDataTable[i].htmlControlType == 'text') {
                            if (this.filterForDataTable[i].filterValue.length > 0 && this.filterForDataTable[i].filterValue[0].length > 0) {
                                var filterColObj = {};
                                filterColObj.DBColumnName = this.filterForDataTable[i].name;
                                filterColObj.DBColumnValue = this.filterForDataTable[i].filterValue[0];
                                filterColObj.WhereClauseCondition = "=";
                                filterObj.ListOfFilterColumns.push(filterColObj);
                            }
                        }
                        else if (this.filterForDataTable[i].htmlControlType.indexOf('date') >= 0) {
                            if (this.filterForDataTable[i].filterValue[0] && this.filterForDataTable[i].filterValue[0].length > 0) {
                                var filterColObj = {};
                                filterColObj.DBColumnName = this.filterForDataTable[i].name;
                                filterColObj.DBColumnValue = this.filterForDataTable[i].filterValue[0];
                                filterColObj.WhereClauseCondition = ">=";
                                filterObj.ListOfFilterColumns.push(filterColObj);
                            }
                            if (this.filterForDataTable[i].filterValue[1] && this.filterForDataTable[i].filterValue[1].length > 0) {
                                var filterColObj = {};
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
                if (filterObj.ListOfFilterColumns.filter(function (x) { return x.DBColumnName == _this.ForeignKeyColumn; }).length == 0) {
                    var filterColObj = {};
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
                        var sortObj = {};
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
                .subscribe(function (res) {
                _this.refreshOnSuccess(res, true);
            }, function (error) {
                _this.alert.error("Filter Page : async error #" + error.status + "-myerror-" + _this.pageName + "-" + _this.controlconfig + "-" + _this.masterGridSettings + "-" + _this.masterPageName);
            }, function () {
                _this.intFormSvc.stopSpinner();
            });
        }
    };
    DisplayGridComponent.prototype.setDefaultSortColumn = function () {
        if (this.controlconfig["DefaultSortColumn"]) {
            var defaultSortColumn = this.controlconfig["DefaultSortColumn"];
            var defaultSortCss = "fa fa-lg fa-arrow-down";
            if (this.controlconfig["DefaultSortDirection"]) {
                if (this.controlconfig["DefaultSortDirection"].toLowerCase() == "desc")
                    defaultSortCss = "fa fa-lg fa-arrow-up";
            }
            this.sortRequested(defaultSortColumn, defaultSortCss);
        }
    };
    DisplayGridComponent.prototype.customButtonClicked = function (customButton) {
        var _this = this;
        var result = true;
        if (customButton.formValidate) {
            this.matrixForDataTable.forEach(function (x) {
                var plugInValue = _this.vmMatrix.buildJSONObject(x.cells, _this.PrimaryKeyColumn);
                var tempResult = _this.ruleService.validateRulesByRulesConfig(plugInValue, _this.gridSettings["RulesConfig"], x.cells);
                if (!tempResult)
                    result = false;
            });
        }
        if (result) {
            this.displayGridNotifier.emit({
                value: this.selectedRows,
                masterList: this.masterMatrixForDataTable,
                controlName: customButton.name
            });
        }
    };
    DisplayGridComponent.prototype.customButtonChildGridClicked = function (outputData, parentRow) {
        this.displayGridNotifier.emit({
            value: outputData.value,
            parentRow: parentRow,
            controlName: outputData.controlName
        });
    };
    DisplayGridComponent.prototype.customRowButtonListClicked = function (customRowButton, selectedRow) {
        var result = true;
        if (customRowButton.formValidate) {
            var plugInValue = this.vmMatrix.buildJSONObject(selectedRow.cells, this.PrimaryKeyColumn);
            var tempResult = this.ruleService.validateRulesByRulesConfig(plugInValue, this.gridSettings["RulesConfig"], selectedRow.cells);
            if (!tempResult)
                result = false;
        }
        if (result) {
            this.displayGridNotifier.emit({
                value: selectedRow,
                controlName: customRowButton.name
            });
        }
    };
    DisplayGridComponent.prototype.checkBusinessValidations = function () {
        if (this.masterMatrixForDataTable.length) {
            //methods to be used in proxy services
            this.httpProxy.checkBusinessValidations(this.masterMatrixForDataTable, this.pageName);
        }
    };
    DisplayGridComponent.prototype.ngOnDestroy = function () {
        this.filterListenerSubscription.unsubscribe();
    };
    DisplayGridComponent.prototype.getChildGridSettings = function (selectedRow) {
        if (selectedRow && selectedRow.selectedColumnName) {
            var tempColumn = this.gridSettings.ColumnConfiguration.find(function (p) { return p.dbColumnName == selectedRow.selectedColumnName; });
            if (tempColumn) {
                return tempColumn.ChildControlConfig;
            }
        }
        else {
            return this.gridSettings['ChildControlConfig'];
        }
    };
    DisplayGridComponent.prototype.getChildPageName = function (selectedRow) {
        if (selectedRow && selectedRow.selectedColumnName) {
            var tempColumn = this.gridSettings.ColumnConfiguration.find(function (p) { return p.dbColumnName == selectedRow.selectedColumnName; });
            if (tempColumn) {
                return this.pageName + '_' + tempColumn.dbColumnName + '_child';
            }
        }
        else {
            return this.pageName + '_child';
        }
    };
    DisplayGridComponent.prototype.exportToExcelClicked = function () {
        this.excelService.exportToExcel(this.gridSettings, this.databaseRecords);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DisplayGridComponent.prototype, "inputPageName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DisplayGridComponent.prototype, "parentRow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DisplayGridComponent.prototype, "inputGridSettings", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DisplayGridComponent.prototype, "inputHttpProxy", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DisplayGridComponent.prototype, "pluginInput", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DisplayGridComponent.prototype, "displayGridNotifier", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DisplayGridComponent.prototype, "ParentIdInputValue", void 0);
    DisplayGridComponent = __decorate([
        core_1.Component({
            template: require("./displayGrid.html"),
            selector: 'displayGrid'
        }), 
        __metadata('design:paramtypes', [interFormsService_1.InterFormsService, navigationService_1.NavigationService, alertService_1.AlertService, matrixService_1.matrixService, appSettingsService_1.AppSettingsService, crudService_1.crudService, displayGridFilterService_1.DisplayGridFilterService, ruleService_1.RuleService, apiService_1.ApiService, excelService_1.ExcelService])
    ], DisplayGridComponent);
    return DisplayGridComponent;
}(displayGridUtils_1.BaseDisplayGrid));
exports.DisplayGridComponent = DisplayGridComponent;
//# sourceMappingURL=displayGrid.js.map