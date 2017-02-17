"use strict";
var BaseDisplayGrid = (function () {
    function BaseDisplayGrid(nav, alert, vmMatrix, appSettingsService, crudserv, filterListener) {
        this.viewDetail = false;
        this.editDetail = false;
        this.addDetail = false;
        this.isViewBtnVisible = true;
        this.isEditBtnVisible = true;
        this.childType = "edit";
        this.showFilters = false;
        this.activeFilterSequence = "";
        this.showMultiSelectionDirective = false;
        this.ForeignKeyColumn = "";
        this.PrimaryKeyColumn = "Id";
        this.isDisabled = false;
        this.showChildDetail = false;
        this.CONST_CHILDCONTROL_CONFIG = "ChildControlConfig";
        this.IsChildPage = false;
        //Pagination related variables
        this.IsPagination = false;
        this.totalItems = 0;
        this.itemsPerPage = 10; //Default value
        this.currentMasterPage = 1;
        this.currentChildPage = 1;
        this.hideAddBtn = false;
        this.hideDeleteBtn = false;
        this.hideLeftButtonsColumn = false;
        this.hideRowCheckBox = false;
        //sorting variables
        this.sortColumnName = "";
        this.sortAsc = false;
        this.isSpreadsheetGrid = false;
        this.showGridBody = false;
        this.showNoData = false;
        this.showFilterRow = false;
        this.showFooterRow = false;
        this.showAddButtonOnLoad = false;
        this.selectedRows = [];
        this.rowSelectionMode = "None";
        this.isPageLoaded = false;
        this.customButtonsList = [];
        this.customRowButtonsList = [];
        this.filteredMasterPage = false;
        this.filteredChildPage = false;
        this.scrollableGridCss = "";
        this.isScrollableGrid = false;
        this.childGridType = "miniGrid";
        //  super (nav, alert, httpAbstract, vmMatrix, appSettingsService, crudserv , filterListener );
        this.alert = alert;
        this.vmMatrix = vmMatrix;
        crudserv.setCallerContext(this);
        this.crudService = crudserv;
        this.navService = nav;
    }
    BaseDisplayGrid.prototype.getParentKeyId = function (parentRow) {
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
    };
    BaseDisplayGrid.prototype.getParentDisplayValue = function (parentRow, childGridSettings) {
        var displayValue = "";
        if (childGridSettings["ForeignKeyColumn"]) {
            var keyColumn = childGridSettings.ColumnConfiguration.find(function (p) { return p.dbColumnName == childGridSettings["ForeignKeyColumn"]; });
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
    };
    BaseDisplayGrid.prototype.editViewClicked = function (selectedRow) {
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
    };
    BaseDisplayGrid.prototype.AddClicked = function () {
        var _this = this;
        this.editViewRowDataTable = this.vmMatrix.getFormBuilderControls(this.gridSettings); //this.getFormBuilderControls(this.headerForDataTable);
        var fkColumn = this.editViewRowDataTable.find(function (p) { return p.name == _this.ForeignKeyColumn; });
        if (this.parentDisplayValue && fkColumn) {
            fkColumn.val = this.parentDisplayValue;
        }
        else if (this.ParentIdValue && fkColumn) {
            fkColumn.val = this.ParentIdValue;
        }
        this.viewDetail = false;
        this.editDetail = false;
        this.addDetail = true;
        this.operationType = "add";
    };
    BaseDisplayGrid.prototype.ClearSelected = function () {
        this.selectedRows.forEach(function (x) {
            x.checkBox.checked = false;
        });
        this.selectedRows = [];
    };
    BaseDisplayGrid.prototype.AddRemoveAll = function (event) {
        var _this = this;
        if (event.target.checked) {
            this.selectedRows = [];
            this.masterMatrixForDataTable.forEach(function (x) {
                if (!x.checkBox.disabled) {
                    x.checkBox.checked = true;
                    _this.selectedRows.push(x);
                }
            });
        }
        else {
            this.selectedRows.forEach(function (x) {
                x.checkBox.checked = false;
            });
            this.selectedRows = [];
        }
    };
    BaseDisplayGrid.prototype.FilterSelectedRows = function (event) {
        if (event.target.checked) {
            var filteredMatrix = this.masterMatrixForDataTable.filter(function (row) {
                if (row.checkBox.checked == true) {
                    return row;
                }
            });
            this.matrixForDataTable = filteredMatrix;
        }
        else if (!event.target.checked) {
            this.matrixForDataTable = this.masterMatrixForDataTable;
        }
    };
    BaseDisplayGrid.prototype.AddRemoveSelected = function (event, selectedRow) {
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
                var row = this.selectedRows[i];
                var itemSelected = row.cells.find(function (x) { return x.name.toLowerCase() == selectedRow.primaryKey.name.toLowerCase(); });
                if (itemSelected.val == selectedRow.primaryKey.value) {
                    row.checkBox.checked = false;
                    break;
                }
            }
            this.selectedRows.splice(i, 1);
        }
    };
    BaseDisplayGrid.prototype.showGrid = function (show) {
        if (show === void 0) { show = true; }
        this.showAddButtonOnLoad = false;
        this.showNoData = show;
        this.showGridBody = show;
        this.IsPagination = show;
    };
    BaseDisplayGrid.prototype.inputClicked = function (row, col) {
        if (col.htmlControlType === "checkbox") {
            col.val = !col.val;
        }
        this.vmMatrix.inputClicked({ row: row, col: col });
    };
    BaseDisplayGrid.prototype.recordSaveHandler = function (context) {
        context.RefreshPage.call(context);
    };
    BaseDisplayGrid.prototype.sortAscending = function (clickedColumn, inputArray) {
        var sortedArray = inputArray.sort(function (n1, n2) {
            var objElement1 = n1.cells.find(function (x) {
                return x.name.toLowerCase() === clickedColumn.toLowerCase();
            });
            var objElement2 = n2.cells.find(function (x) {
                return x.name.toLowerCase() === clickedColumn.toLowerCase();
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
    };
    BaseDisplayGrid.prototype.sortDescending = function (clickedColumn, inputArray) {
        var sortedArray = inputArray.sort(function (n1, n2) {
            var objElement1 = n1.cells.find(function (x) {
                return x.name.toLowerCase() === clickedColumn.toLowerCase();
            });
            var objElement2 = n2.cells.find(function (x) {
                return x.name.toLowerCase() === clickedColumn.toLowerCase();
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
    };
    BaseDisplayGrid.prototype.updateSortCssForSequences = function (sortCssTobeUpdated) {
        if (this.headerForDataTable) {
            var headerTableLength = this.headerForDataTable.length;
            for (var i = 0; i < headerTableLength; i++) {
                if (this.sortColumnName.toLowerCase() == this.headerForDataTable[i].name.toLowerCase()) {
                    this.headerForDataTable[i].sortCss = sortCssTobeUpdated;
                }
                else {
                    this.headerForDataTable[i].sortCss = "";
                }
            }
        }
    };
    BaseDisplayGrid.prototype.setRightPaddingColumnCSS = function (headerColumns) {
        var columnWidth = 0;
        var dataGridButtonsWidth = 3;
        var maxColumnWidth = 24;
        this.rightPaddingColumnCss = "col-" + (maxColumnWidth - columnWidth - dataGridButtonsWidth);
    };
    Object.defineProperty(BaseDisplayGrid.prototype, "currentPage", {
        get: function () {
            return (this.IsChildPage) ? this.currentChildPage : this.currentMasterPage;
        },
        set: function (value) {
            (this.IsChildPage) ? this.currentChildPage = value : this.currentMasterPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDisplayGrid.prototype, "filtered", {
        get: function () {
            return (this.IsChildPage) ? this.filteredChildPage : this.filteredMasterPage;
        },
        set: function (value) {
            (this.IsChildPage) ? this.filteredChildPage = value : this.filteredMasterPage = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseDisplayGrid.prototype.setChildControlVisibility = function () {
        if (this.gridSettings[this.CONST_CHILDCONTROL_CONFIG]
            && (!this.gridSettings.ColumnConfiguration.find(function (p) { return p.isToggleable == true; }))) {
            this.showChildDetail = true;
        }
        else {
            this.showChildDetail = false;
        }
    };
    BaseDisplayGrid.prototype.cancelClicked = function () {
        this.viewDetail = false;
        this.editDetail = false;
        this.addDetail = false;
    };
    BaseDisplayGrid.prototype.filterBoxClicked = function (clickedSequence) {
        this.activeFilterSequence = clickedSequence;
    };
    BaseDisplayGrid.prototype.buildDynamicHeader = function (dynamicHeaderObject, gridSettings) {
        var result = new Array();
        var columnIndex = 0;
        dynamicHeaderObject.forEach(function (x) {
            var level = x.level;
            var columnWidth = 0;
            var child;
            x.childColumns.forEach(function (y) {
                child = gridSettings.ColumnConfiguration.find(function (z) { return z.dbColumnName === y; });
                // loop through ColumnConfiguration to determine if we are skipping visible or invisible columns
                while (columnIndex < gridSettings.ColumnConfiguration.length && gridSettings.ColumnConfiguration[columnIndex].dbColumnName != y) {
                    // create an empty dynamic header if one is not defined for its child
                    if (gridSettings.ColumnConfiguration[columnIndex].isVisible == true && gridSettings.ColumnConfiguration[columnIndex].dbColumnName != y) {
                        columnWidth = columnWidth + parseInt(gridSettings.ColumnConfiguration[columnIndex].columnCss.split("-")[1]);
                        var headerObj = {
                            displayName: "",
                            columnCss: "col-" + columnWidth
                        };
                        result[level].push(headerObj);
                        columnWidth = 0;
                    }
                    columnIndex++;
                }
                ;
                columnIndex++;
                if (child != undefined) {
                    columnWidth = columnWidth + parseInt(child.columnCss.split("-")[1]);
                }
            });
            var headerObj = {
                displayName: x.displayName,
                columnCss: "col-" + columnWidth,
            };
            if (!result[level]) {
                result[level] = new Array();
            }
            result[level].push(headerObj);
        });
        this.dynamicHeaders = result;
    };
    return BaseDisplayGrid;
}());
exports.BaseDisplayGrid = BaseDisplayGrid;
//# sourceMappingURL=displayGridUtils.js.map