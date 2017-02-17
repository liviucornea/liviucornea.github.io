"use strict";
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
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var databaseUploadTool_config_1 = require("./databaseUploadTool.config");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var importExportService_1 = require("../../../../../../ReusableServices/importExportService");
var interFormsService_1 = require("../../../../../../ReusableServices/interFormsService");
var managedProgramDbService_1 = require("../managedProgramDbService");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var MpdbDatabaseUploadTool = (function () {
    function MpdbDatabaseUploadTool(alert, mpdbService, importExportService, interFormSvc, apiService, vmMatrix) {
        this.alert = alert;
        this.mpdbService = mpdbService;
        this.importExportService = importExportService;
        this.interFormSvc = interFormSvc;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = databaseUploadTool_config_1.MainControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    MpdbDatabaseUploadTool.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    MpdbDatabaseUploadTool.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    MpdbDatabaseUploadTool.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    MpdbDatabaseUploadTool.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData, this.mpdbService);
    };
    MpdbDatabaseUploadTool.prototype.displayTabInfo = function (tabInfo) {
        this.gridView = null;
        this.formBuilder = null;
        this.customMessages = [];
        switch (tabInfo.TabKey) {
            case 'RebalEntryAudit':
                this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "RebalEntryAuditDisplayGrid"; });
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "RebalEntryAuditFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(function (x) { return x.name == "SearchDateTime"; }).val = genericfunctions_1.toDateString(new Date());
                }
                break;
            case 'RebalEntryReport':
                this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "RebalEntryReportDisplayGrid"; });
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "RebalEntryReportFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(function (x) { return x.name == "SearchDateTime"; }).val = genericfunctions_1.toDateString(new Date());
                }
                break;
            case 'RebalEntryUpload':
                this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "RebalEntryUploadDisplayGrid"; });
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "RebalEntryUploadFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(function (x) { return x.name == "UploadControl"; }).readOnly = true;
                    this.formBuilder.gridSettings.CustomButtons.find(function (x) { return x.name == "PreviewUpload"; }).visible = false;
                }
                break;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    MpdbDatabaseUploadTool.prototype.doActionFromChildTab = function (outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];
        switch (outputData.TabKey) {
            case 'RebalEntryAudit':
                this.rebalEntryAuditAction(outputData);
                break;
            case 'RebalEntryReport':
                this.rebalEntryReportAction(outputData);
                break;
            case 'RebalEntryUpload':
                this.rebalEntryUploadAction(outputData);
                break;
        }
    };
    MpdbDatabaseUploadTool.prototype.rebalEntryAuditAction = function (outputData) {
        var _this = this;
        if (outputData.updatedValue.controlName == "ShowReport") {
            this.showRebalEntryAudit();
        }
        else if (outputData.updatedValue.controlName == "PassAudit") {
            if (outputData.updatedValue.value.length > 0) {
                this.alert.addAlertAndRequestAnswer("Are you sure you want to pass audit for selected rows?");
                var subscription_1 = this.alert.requestConfirmationAnswer$.subscribe(function (answer) {
                    subscription_1.unsubscribe();
                    _this.alert.askConfirmation = false;
                    if (answer == "OK") {
                        var selectedRows_1 = [];
                        outputData.updatedValue.value.forEach(function (x) { return selectedRows_1.push(x.primaryKey.value); });
                        _this.passAudit(selectedRows_1.join(","));
                    }
                    else {
                        return;
                    }
                });
            }
        }
    };
    MpdbDatabaseUploadTool.prototype.rebalEntryReportAction = function (outputData) {
        if (outputData.updatedValue.controlName == "ShowReport") {
            this.showRebalEntryReport();
        }
    };
    MpdbDatabaseUploadTool.prototype.rebalEntryUploadAction = function (outputData) {
        var _this = this;
        this.customMessages = [];
        var groupTypeID = this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).val;
        switch (outputData.updatedValue.controlName) {
            case "SystemType":
                this.formBuilder.gridSettings.CustomButtons.find(function (x) { return x.name == "PreviewUpload"; }).visible = false;
                this.interFormSvc.notifyUploadInit.next();
                if (!outputData.updatedValue.value) {
                    this.formBuilder.data.find(function (x) { return x.name == "UploadControl"; }).readOnly = true;
                    this.gridView.ShowDefault = false;
                }
                else {
                    var fileName = this.getImportType(groupTypeID) + "_Rebal.csv";
                    this.interFormSvc.notifyUploadOptionsChange.next({ fileName: fileName });
                    this.showPendings(groupTypeID, false);
                }
                break;
            case "PreviewUpload":
                var fileID = outputData.updatedValue.value.UploadControl.ID;
                this.previewUpload(groupTypeID, fileID);
                break;
            case "UploadControl":
                this.formBuilder.gridSettings.CustomButtons.find(function (x) { return x.name == "PreviewUpload"; }).visible = (outputData.updatedValue.value.UploadControl);
                break;
            case "PurgeSelected":
                if (outputData.updatedValue.value.length > 0) {
                    this.alert.addAlertAndRequestAnswer("Are you sure you want to purge selected rows?");
                    var subscription_2 = this.alert.requestConfirmationAnswer$.subscribe(function (answer) {
                        subscription_2.unsubscribe();
                        _this.alert.askConfirmation = false;
                        if (answer == "OK") {
                            var selectedRows_2 = [];
                            outputData.updatedValue.value.forEach(function (x) { return selectedRows_2.push(x.primaryKey.value); });
                            _this.purgePendings(groupTypeID, selectedRows_2.join(","), false);
                        }
                        else {
                            return;
                        }
                    });
                }
                break;
            case "PurgeAll":
                this.purgePendings(groupTypeID, null, true);
                break;
            case "StartImport":
                if (outputData.updatedValue.value.length > 0) {
                    this.alert.addAlertAndRequestAnswer("Are you sure you want to import selected rows?");
                    var subscription_3 = this.alert.requestConfirmationAnswer$.subscribe(function (answer) {
                        subscription_3.unsubscribe();
                        _this.alert.askConfirmation = false;
                        if (answer == "OK") {
                            var selectedRows_3 = [];
                            outputData.updatedValue.value.forEach(function (x) { return selectedRows_3.push(x.primaryKey.value); });
                            _this.importInstructions(groupTypeID, selectedRows_3.join(","));
                        }
                        else {
                            return;
                        }
                    });
                }
                break;
        }
    };
    MpdbDatabaseUploadTool.prototype.showRebalEntryAudit = function () {
        var _this = this;
        var groupTypeID = this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).val;
        var selectedUser = this.formBuilder.data.find(function (x) { return x.name == "User"; }).val;
        var typeID = this.formBuilder.data.find(function (x) { return x.name == "Type"; }).val;
        var selectedDate = this.formBuilder.data.find(function (x) { return x.name == "SearchDateTime"; }).val;
        this.apiService.getArrayFromQuery("ManagedProgramDB_RptRebalEntryAudit", JSON.stringify({
            Parameters: [
                { Name: "@GroupTypeID", Value: groupTypeID },
                { Name: "@Date", Value: selectedDate },
                { Name: "@User", Value: selectedUser },
                { Name: "@Type", Value: typeID }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var rowsReviewed = res.filter(function (x) { return x.Reviewed; }).length;
                var rowsNotReviewed = res.filter(function (x) { return !x.Reviewed; }).length;
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                messageBlock = messageBlock.concat(rowsReviewed + (rowsReviewed > 1 ? " records " : " record ") + "reviewed");
                messageBlock = messageBlock.concat(rowsNotReviewed + (rowsNotReviewed > 1 ? " records " : " record ") + "not reviewed");
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
                _this.gridView.gridSettings.CustomButtons.forEach(function (x) { x.visible = true; });
            }
            else {
                _this.gridView.gridSettings.CustomButtons.forEach(function (x) { x.visible = false; });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("ManagedProgramDB_RptRebalEntryAudit : async error #" + error.status);
        }, function () {
        });
    };
    MpdbDatabaseUploadTool.prototype.passAudit = function (selectedRows) {
        var _this = this;
        this.apiService.executeNonQuery("ManagedProgramDB_PassAudit", JSON.stringify({ Parameters: [
                { Name: "@IDs", Value: selectedRows },
                { Name: "@Auditor", Value: this.apiService.CurrentUser.LoginName }]
        })).subscribe(function (res) {
            _this.showRebalEntryAudit();
            _this.alert.addAlert(res + (res > 1 ? " records " : " record ") + "passed audit.");
        }, function (error) { _this.alert.error("ManagedProgramDB_PassAudit : async error #" + error.status); }, function () {
        });
    };
    MpdbDatabaseUploadTool.prototype.showRebalEntryReport = function () {
        var _this = this;
        var groupTypeID = this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).val;
        var selectedUser = this.formBuilder.data.find(function (x) { return x.name == "User"; }).val;
        var typeID = this.formBuilder.data.find(function (x) { return x.name == "Type"; }).val;
        var selectedDate = this.formBuilder.data.find(function (x) { return x.name == "SearchDateTime"; }).val;
        this.apiService.getArrayFromQuery("ManagedProgramDB_RptRebalEntry", JSON.stringify({
            Parameters: [
                { Name: "@GroupTypeID", Value: groupTypeID },
                { Name: "@Date", Value: selectedDate },
                { Name: "@User", Value: selectedUser },
                { Name: "@Type", Value: typeID }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var rowsReviewed = res.filter(function (x) { return x.Reviewed; }).length;
                var rowsNotReviewed = res.filter(function (x) { return !x.Reviewed; }).length;
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                messageBlock = messageBlock.concat(rowsReviewed + (rowsReviewed > 1 ? " records " : " record ") + "reviewed");
                messageBlock = messageBlock.concat(rowsNotReviewed + (rowsNotReviewed > 1 ? " records " : " record ") + "not reviewed");
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("ManagedProgramDB_RptRebalEntry : async error #" + error.status);
        }, function () {
        });
    };
    MpdbDatabaseUploadTool.prototype.previewUpload = function (groupTypeID, fileID) {
        var _this = this;
        this.importExportService.importTextFile("XLayerImport_ManagedProgramDB", fileID)
            .subscribe(function (res) {
            _this.apiService.executeNonQuery("Update_ManagedProgramDB_PortfolioChange_Import", JSON.stringify({
                Parameters: [
                    { Name: "@GroupTypeID", Value: groupTypeID },
                    { Name: "@User", Value: _this.apiService.CurrentUser.LoginName }]
            })).subscribe(function (res) {
                _this.showPendings(groupTypeID, true);
                _this.alert.addAlert(res + " records imported.");
            }, function (error) {
                _this.alert.error("Update_ManagedProgramDB_PortfolioChange_Import : async error #" + error.status);
            }, function () {
            });
        }, function (error) {
            _this.alert.error("XLayerImport_ManagedProgramDB : async error #" + error.status);
        }, function () {
        });
    };
    MpdbDatabaseUploadTool.prototype.purgePendings = function (groupTypeID, selectedRows, purgeAll) {
        var _this = this;
        this.apiService.executeNonQuery("ManagedProgramDB_CancelInstruction", JSON.stringify({ Parameters: [
                { Name: "@GroupTypeID", Value: groupTypeID },
                { Name: "@IDs", Value: selectedRows },
                { Name: "@User", Value: this.apiService.CurrentUser.LoginName },
                { Name: "@PurgeAll", Value: purgeAll ? 1 : 0 }]
        })).subscribe(function (res) {
            _this.showPendings(groupTypeID, false);
            _this.alert.addAlert(res + " pending items purged.");
        }, function (error) { _this.alert.error("ManagedProgramDB_CancelInstruction : async error #" + error.status); }, function () {
        });
    };
    MpdbDatabaseUploadTool.prototype.importInstructions = function (groupTypeID, selectedRows) {
        var _this = this;
        var checked = selectedRows.split(",").filter(Number).length;
        this.apiService.executeNonQuery("ManagedProgramDB_AddInstruction", JSON.stringify({ Parameters: [
                { Name: "@GroupTypeID", Value: groupTypeID },
                { Name: "@IDs", Value: selectedRows },
                { Name: "@User", Value: this.apiService.CurrentUser.LoginName }]
        })).subscribe(function (res) {
            if (res <= 0) {
                checked = res;
            }
            _this.showPendings(groupTypeID, false);
            _this.alert.addAlert(checked + " instruction inserted to system.");
        }, function (error) { _this.alert.error("ManagedProgramDB_AddInstruction : async error #" + error.status); }, function () {
        });
    };
    MpdbDatabaseUploadTool.prototype.showPendings = function (groupTypeID, sendMissedAccountAlertMail) {
        var _this = this;
        var uploadControl = this.formBuilder.data.find(function (x) { return x.name == "UploadControl"; });
        uploadControl.readOnly = true;
        this.apiService.getArrayFromQuery("ManagedProgramDB_GetPendings", JSON.stringify({ Parameters: [
                { Name: "@GroupTypeID", Value: groupTypeID },
                { Name: "@User", Value: this.apiService.CurrentUser.LoginName }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res[0];
            if (res.length > 0 && res[0].length > 0) {
                _this.gridView.gridSettings.CustomButtons.forEach(function (x) { x.visible = true; });
                var messageBlock = [res[0].length + " pending items found."];
                if (res[1].length > 0) {
                    messageBlock = messageBlock.concat(_this.getDuplicatedAccounts(res[1]));
                }
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            else {
                uploadControl.readOnly = false;
                _this.gridView.gridSettings.CustomButtons.forEach(function (x) { x.visible = false; });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) { _this.alert.error("ManagedProgramDB_GetPendings : async error #" + error.status); }, function () {
        });
        this.updatedControlsList.push(this.gridView);
    };
    MpdbDatabaseUploadTool.prototype.getDuplicatedAccounts = function (dt) {
        var duplicatedAccounts = [];
        dt.forEach(function (x) {
            duplicatedAccounts.push(x.PortfolioNumber);
        });
        if (duplicatedAccounts.length > 0) {
            return "Duplicated accounts found and removed (" + duplicatedAccounts.join(", ") + ")";
        }
        else {
            return "";
        }
    };
    /* private getFormBuilderControlSelectedValue(controlName: string): any{
         var returnValue;
         var control = this.formBuilder.data.find(x=> x.name == controlName);
 
         var SelectedItem = control.masterdataSource.find(x=> x.ID == control.val);
         if(SelectedItem) {
             returnValue = SelectedItem.val;
         }
         return returnValue;
     }*/
    MpdbDatabaseUploadTool.prototype.getImportType = function (groupTypeID) {
        switch (groupTypeID) {
            case 19 /* PIA */:
                return 'PIA';
            case 23 /* FP */:
                return 'FP';
            case 18 /* PIC */:
                return 'PIC';
            default:
                return '';
        }
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], MpdbDatabaseUploadTool.prototype, "tabBuilderControl", void 0);
    MpdbDatabaseUploadTool = __decorate([
        core_1.Component({
            selector: 'databaseUploadTool',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, managedProgramDbService_1.ManagedProgramDbService, importExportService_1.ImportExportService, interFormsService_1.InterFormsService, apiService_1.ApiService, matrixService_1.matrixService])
    ], MpdbDatabaseUploadTool);
    return MpdbDatabaseUploadTool;
}());
exports.MpdbDatabaseUploadTool = MpdbDatabaseUploadTool;
//# sourceMappingURL=databaseUploadTool.js.map