import {ElementRef} from '@angular/core';
import {AlertService} from "../../ReusableServices/alertService";
import {HttpAbstract} from "../../ReusableServices/httpAbstract";
import {matrixService} from "../../ReusableServices/matrixService";
import {AppSettingsService} from "../../ReusableServices/appSettingsService";
import {crudService} from "../../ReusableServices/crudService";
import {NavigationService} from "../../ReusableServices/navigationService";
import {Subscription} from "rxjs";
import {DisplayGridFilterService} from './displayGridFilterService';

export class BaseDisplayGrid {
    viewDetail: boolean = false;
    editDetail: boolean = false;
    addDetail: boolean = false;
    isViewBtnVisible: boolean = true;
    isEditBtnVisible: boolean = true;
    childType: string = "edit";
    childId: any;
    gridSettings: any;
    databaseRecords: Array<any>;
    matrixForDataTable: any;
    masterMatrixForDataTable: Array<any>;
    headerForDataTable: Array<any>;
    footerForDataTable: Array<any>;
    filterForDataTable: Array<any>;
    showFilters: boolean = false;
    headerForViewRow: Array<any>;
    lookupsForDataTable: Array<any>;
    editViewRowDataTable: Array<any>;
    activeFilterSequence: string = "";
    showMultiSelectionDirective: boolean = false;
    alert: AlertService;
    httpProxy: any;
    controlconfig: any;
    pageName: any;
    ForeignKeyColumn: string = "";
    PrimaryKeyColumn: string = "Id";
    elemRef: ElementRef;
    isDisabled: boolean = false;
    showChildDetail: boolean = false;
    masterGridSettings: any;
    CONST_CHILDCONTROL_CONFIG = "ChildControlConfig";
    IsChildPage: boolean = false;
    masterPageName: any;
    //Pagination related variables
    IsPagination: boolean = false;
    totalItems: number = 0;
    itemsPerPage: number = 10; //Default value

    ParentIdValue: any;
    filterListenerSubscription: Subscription;

    currentMasterPage: number = 1;
    currentChildPage: number = 1;

    vmMatrix: matrixService;
    hideAddBtn: boolean = false;
    hideDeleteBtn: boolean = false;
    hideLeftButtonsColumn: boolean = false;
    hideRowCheckBox: boolean = false;
    //sorting variables
    sortColumnName: string = "";
    sortAsc: boolean = false;
    isSpreadsheetGrid: boolean = false;
    crudService: crudService;
    hasDynamicHeader: boolean;
    dynamicHeaders: Array<any>;
    showGridBody: boolean = false;
    showNoData: boolean = false;
    showFilterRow: boolean = false;
    showFooterRow: boolean = false;
    showAddButtonOnLoad: boolean = false;
    selectedRows: Array<any> = [];
    rowSelectionMode: string = "None";
    filteredMatrix: any;
    navService: NavigationService;
    isPageLoaded: boolean = false;
    customButtonsList: Array<any> = [];
    customRowButtonsList: Array<any>=[];
    filteredMasterPage: boolean = false;
    filteredChildPage: boolean = false;

    operationType: string;
    rightPaddingColumnCss: string;
    scrollableGridCss: string = "";
    isScrollableGrid: boolean = false;
    childGridType: string = "miniGrid";
    crudSuccessObservable: Subscription;
    deleteConfirmationObservable: Subscription;
    parentKeyId: any;
    parentDisplayValue: any;


    constructor(nav: NavigationService, alert: AlertService, vmMatrix: matrixService
        , appSettingsService: AppSettingsService, crudserv: crudService, filterListener: DisplayGridFilterService) {
        //  super (nav, alert, httpAbstract, vmMatrix, appSettingsService, crudserv , filterListener );
        this.alert = alert;

        this.vmMatrix = vmMatrix;
        crudserv.setCallerContext(this);
        this.crudService = crudserv;
        this.navService = nav;
    }

    getParentKeyId(parentRow: any) {
        var IdValue = 0;
        if (this.gridSettings["ForeignKeyColumn"]) {
            var keyColumn = this.gridSettings["ForeignKeyColumn"];
            for (var i = 0; i < parentRow.cells.length; i++) {
                if (parentRow.cells[i].name == keyColumn || parentRow.cells[i].name == "Id") {
                    IdValue = parentRow.cells[i].val;
                    break;
                }
            }
        }
        return IdValue;
    }

    getParentDisplayValue(parentRow: any, childGridSettings: any) {
        var displayValue = "";
        if (childGridSettings["ForeignKeyColumn"]) {
            var keyColumn = childGridSettings.ColumnConfiguration.find(p => p.dbColumnName == childGridSettings["ForeignKeyColumn"]);
            if (keyColumn && keyColumn.dataSourceAddress) {
                var dbColumnName = this.vmMatrix.getdbColumnNameForDataSourceAddress(keyColumn.dataSourceAddress);
                for (var i = 0; i < parentRow.cells.length; i++) {
                    if (parentRow.cells[i].name == dbColumnName) {
                        displayValue = parentRow.cells[i].val;
                        break;
                    }
                }
            }
        }
        return displayValue;
    }

    editViewClicked(selectedRow: any) {
        switch (this.childType) {
            case "edit":
                this.editViewRowDataTable = this.vmMatrix.editMatrix(selectedRow.cells, this.headerForDataTable, this.gridSettings);
                this.operationType = this.childType;
                this.operationType = this.childType;
                this.editDetail = true;
                this.viewDetail = false;
                this.addDetail = false;
                break;
            case "view":
                this.editViewRowDataTable = this.vmMatrix.viewMatrix(selectedRow.cells, this.headerForDataTable, this.gridSettings, this.databaseRecords);
                this.operationType = this.childType;
                this.viewDetail = true;
                this.addDetail = false;
                this.editDetail = false;
                break;
            case "editInline":
                this.editViewRowDataTable = this.vmMatrix.editMatrix(selectedRow.cells, this.headerForDataTable, this.gridSettings);
                selectedRow.inlineEditEnabled = !selectedRow.inlineEditEnabled;
                break;
        }

    }

    AddClicked() {
        this.editViewRowDataTable = this.vmMatrix.getFormBuilderControls(this.gridSettings);//this.getFormBuilderControls(this.headerForDataTable);

        var fkColumn = this.editViewRowDataTable.find(p => p.name == this.ForeignKeyColumn);
        if(this.parentDisplayValue && fkColumn) {
                fkColumn.val = this.parentDisplayValue;
        }
        else if(this.ParentIdValue && fkColumn) {
            fkColumn.val = this.ParentIdValue;
        }

        this.viewDetail = false;
        this.editDetail = false;
        this.addDetail = true;
        this.operationType = "add";
    }

    ClearSelected(): void {
        this.selectedRows.forEach(x =>{
                x.checkBox.checked = false;
            });
        this.selectedRows = [];
    }

    AddRemoveAll(event: any): void {
        if (event.target.checked) {
            this.selectedRows = [];

            this.masterMatrixForDataTable.forEach(x => {
                if(!x.checkBox.disabled) {
                    x.checkBox.checked = true;
                    this.selectedRows.push(x);
                }
            });
        }
        else {
            this.selectedRows.forEach(x =>{
                x.checkBox.checked = false;
            });
            this.selectedRows = [];
        }
    }

    FilterSelectedRows(event: any) {

        if (event.target.checked) {
            let filteredMatrix = this.masterMatrixForDataTable.filter(function (row) {
                if (row.checkBox.checked == true) {
                    return row;
                }
            });
            this.matrixForDataTable = filteredMatrix;
        }
        else if (!event.target.checked) {
            this.matrixForDataTable = this.masterMatrixForDataTable;
        }
    }

    AddRemoveSelected(event: any, selectedRow: any) {

        if (event.target.checked) {
            if (this.rowSelectionMode === "Single" && this.selectedRows.length > 0) {
                /*for (var i = 0; i < this.masterMatrixForDataTable.length; i++) {
                    let row = this.masterMatrixForDataTable[i];
                    if (row.checkBox.checked == true) {
                        row.checkBox.checked = false;
                        break;
                    }
                }*/

                this.selectedRows = [];
            }
            selectedRow.checkBox.checked = true;
            this.selectedRows.push(selectedRow);
        }
        else if (!event.target.checked) {
            for (var i = 0; i < this.selectedRows.length; i++) {
                let row = this.selectedRows[i];

                let itemSelected = row.cells.find(x => x.name.toLowerCase() == selectedRow.primaryKey.name.toLowerCase());

                if (itemSelected.val == selectedRow.primaryKey.value) {
                    row.checkBox.checked = false;
                    break;
                }
            }
            this.selectedRows.splice(i, 1);
        }
    }

    showGrid(show: boolean = true) {
        this.showAddButtonOnLoad = false;
        this.showNoData = show;
        this.showGridBody = show;
        this.IsPagination = show;
    }

    inputClicked(row, col) {
        if (col.htmlControlType === "checkbox") {
            col.val = !col.val;
        }
        this.vmMatrix.inputClicked({row: row, col: col});
    }


    recordSaveHandler(context) {
        context.RefreshPage.call(context);
    }

    sortAscending(clickedColumn, inputArray: Array<any>) {
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
        this.updateSortCssForSequences("fa fa-arrow-up");
    }

    sortDescending(clickedColumn, inputArray: Array<any>) {
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
        this.updateSortCssForSequences("fa fa-arrow-down");
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

    setRightPaddingColumnCSS(headerColumns: any): void {
        var columnWidth = 0;
        var dataGridButtonsWidth = 3;
        var maxColumnWidth = 24;

        this.rightPaddingColumnCss = "col-" + (maxColumnWidth - columnWidth - dataGridButtonsWidth);
    }


    public set currentPage(value) {
        (this.IsChildPage) ? this.currentChildPage = value : this.currentMasterPage = value;
    }

    public get currentPage() {
        return (this.IsChildPage) ? this.currentChildPage : this.currentMasterPage;
    }

    set filtered(value) {
        (this.IsChildPage) ? this.filteredChildPage = value : this.filteredMasterPage = value;
    }

    get filtered() {
        return (this.IsChildPage) ? this.filteredChildPage : this.filteredMasterPage;
    }

    setChildControlVisibility() {
        if (this.gridSettings[this.CONST_CHILDCONTROL_CONFIG]
                && (!this.gridSettings.ColumnConfiguration.find(p=>p.isToggleable == true))) {
            this.showChildDetail = true;
        }
        else {
            this.showChildDetail = false;
        }
    }

    cancelClicked() {
        this.viewDetail = false;
        this.editDetail = false;
        this.addDetail = false;
    }

    filterBoxClicked(clickedSequence) {
        this.activeFilterSequence = clickedSequence;
    }

    buildDynamicHeader(dynamicHeaderObject:any,gridSettings){
        var result= new Array<any>();
        var columnIndex = 0;

        dynamicHeaderObject.forEach(function(x){
            var level= x.level;
            var columnWidth = 0;
            var child;

            x.childColumns.forEach(function(y) {
                child = gridSettings.ColumnConfiguration.find(z=>z.dbColumnName === y);

                // loop through ColumnConfiguration to determine if we are skipping visible or invisible columns
                while (columnIndex < gridSettings.ColumnConfiguration.length && gridSettings.ColumnConfiguration[columnIndex].dbColumnName != y ) {

                    // create an empty dynamic header if one is not defined for its child
                    if (gridSettings.ColumnConfiguration[columnIndex].isVisible == true && gridSettings.ColumnConfiguration[columnIndex].dbColumnName != y) {

                        columnWidth = columnWidth + parseInt(gridSettings.ColumnConfiguration[columnIndex].columnCss.split("-")[1]);
                        var headerObj={
                            displayName: "",
                            columnCss:"col-" + columnWidth
                        };
                        result[level].push(headerObj);
                        columnWidth = 0;
                    }
                    columnIndex++;
                };
                columnIndex++;

                if(child != undefined) {
                    columnWidth = columnWidth + parseInt(child.columnCss.split("-")[1]);
                }
            });

            var headerObj={
                displayName:x.displayName,
                columnCss:"col-" + columnWidth,
            };

            if (!result[level]){
                result[level]=new Array<any>();
            }
            result[level].push(headerObj);
        })
        this.dynamicHeaders=result;
    }

}