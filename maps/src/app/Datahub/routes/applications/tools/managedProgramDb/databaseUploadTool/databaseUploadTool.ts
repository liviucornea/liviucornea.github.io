import {Component, ViewChild} from '@angular/core';
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {MainControlConfig} from "./databaseUploadTool.config";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {ImportExportService} from "../../../../../../ReusableServices/importExportService";
import {InterFormsService} from "../../../../../../ReusableServices/interFormsService";
import {ManagedProgramDbService} from "../managedProgramDbService";
import {toDateString} from "../../../../../../ReusableServices/genericfunctions";

const enum GROUP_TYPE {
    PIA = 19,
    FP = 23,
    PIC = 18
}

@Component({
    selector: 'databaseUploadTool',
    template: `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class MpdbDatabaseUploadTool {
    tabsListData: Array<any> = [];
    tabControlConfig: any = MainControlConfig;
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    updatedControlsList: Array<any> = [];
    gridView: any;
    formBuilder: any;
    customMessages: Array<any> = [];

    constructor(private alert: AlertService, private mpdbService: ManagedProgramDbService,
                private importExportService: ImportExportService, private interFormSvc: InterFormsService,
                private apiService: ApiService, private vmMatrix: matrixService) {
    }

    ngOnInit() {
        this.getTabsData();
    }

    ngOnDestroy(): void {
        this.tabsListData = [];
    }

    getTabsData() {
        this.tabControlConfig.TabsList.forEach((x)=> {
            this.tabsListData.push(
                {
                    TabKey: x.TabKey,
                    TabName: x.TabName
                });
        });
    }

    showSpecificTab(tabData)
    {
        this.vmMatrix.showSpecificTab(this,tabData,this.mpdbService);
    }

    displayTabInfo(tabInfo) {
        this.gridView = null;
        this.formBuilder = null;
        this.customMessages = [];

        switch (tabInfo.TabKey) {

            case 'RebalEntryAudit':
                this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "RebalEntryAuditDisplayGrid");
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }

                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "RebalEntryAuditFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(x=> x.name == "SearchDateTime").val = toDateString(new Date());
                }
                break;
            case 'RebalEntryReport':
                this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "RebalEntryReportDisplayGrid");
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }

                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "RebalEntryReportFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                    this.formBuilder.data.find(x=> x.name == "SearchDateTime").val = toDateString(new Date());
                }
                break;
            case 'RebalEntryUpload':
                this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "RebalEntryUploadDisplayGrid");
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }

                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "RebalEntryUploadFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);

                    this.formBuilder.data.find(x=> x.name == "UploadControl").readOnly = true;
                    this.formBuilder.gridSettings.CustomButtons.find(x=> x.name == "PreviewUpload").visible = false;
                }
                break;
        }

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
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
    }

    rebalEntryAuditAction(outputData) {

        if (outputData.updatedValue.controlName == "ShowReport") {
            this.showRebalEntryAudit();
        }
        else if(outputData.updatedValue.controlName == "PassAudit"){
            if (outputData.updatedValue.value.length > 0) {
                this.alert.addAlertAndRequestAnswer("Are you sure you want to pass audit for selected rows?");
                let subscription = this.alert.requestConfirmationAnswer$.subscribe(answer => {
                    subscription.unsubscribe();
                    this.alert.askConfirmation = false;
                    if (answer == "OK")
                    {
                        let selectedRows = [];
                        outputData.updatedValue.value.forEach(x=> selectedRows.push(x.primaryKey.value));
                        this.passAudit(selectedRows.join(","));
                    }
                    else{return;}
                });
            }
        }
    }

    rebalEntryReportAction(outputData) {
        if (outputData.updatedValue.controlName == "ShowReport") {
            this.showRebalEntryReport();
        }
    }

    rebalEntryUploadAction(outputData) {
        this.customMessages = [];
        var groupTypeID = this.formBuilder.data.find(x=> x.name == "SystemType").val;

        switch (outputData.updatedValue.controlName) {
            case "SystemType":
                this.formBuilder.gridSettings.CustomButtons.find(x=> x.name == "PreviewUpload").visible = false;
                this.interFormSvc.notifyUploadInit.next();

                if (!outputData.updatedValue.value) {
                    this.formBuilder.data.find(x=> x.name == "UploadControl").readOnly = true;
                    this.gridView.ShowDefault = false;
                }
                else {
                    let fileName = this.getImportType(groupTypeID) + "_Rebal.csv";
                    this.interFormSvc.notifyUploadOptionsChange.next({fileName: fileName});
                    this.showPendings(groupTypeID, false);
                }
                break;
            case "PreviewUpload":
                let fileID = outputData.updatedValue.value.UploadControl.ID;
                this.previewUpload(groupTypeID, fileID);
                break;
            case "UploadControl":
                this.formBuilder.gridSettings.CustomButtons.find(x=> x.name == "PreviewUpload").visible = (outputData.updatedValue.value.UploadControl);
                break;
            case "PurgeSelected":
                if (outputData.updatedValue.value.length > 0) {
                    this.alert.addAlertAndRequestAnswer("Are you sure you want to purge selected rows?");
                    let subscription = this.alert.requestConfirmationAnswer$.subscribe(answer => {
                        subscription.unsubscribe();
                        this.alert.askConfirmation = false;
                        if (answer == "OK")
                        {
                            let selectedRows = [];
                            outputData.updatedValue.value.forEach(x=> selectedRows.push(x.primaryKey.value));
                            this.purgePendings(groupTypeID, selectedRows.join(","), false);
                        }
                        else{return;}
                    });
                }
                break;
            case "PurgeAll":
                this.purgePendings(groupTypeID, null, true);
                break;
            case "StartImport":
                if (outputData.updatedValue.value.length > 0) {
                    this.alert.addAlertAndRequestAnswer("Are you sure you want to import selected rows?");
                    let subscription = this.alert.requestConfirmationAnswer$.subscribe(answer => {
                        subscription.unsubscribe();
                        this.alert.askConfirmation = false;
                        if (answer == "OK")
                        {
                            let selectedRows = [];
                            outputData.updatedValue.value.forEach(x=> selectedRows.push(x.primaryKey.value));
                            this.importInstructions(groupTypeID, selectedRows.join(","));
                        }
                        else{return;}
                    });
                }
                break;
        }
    }

    showRebalEntryAudit() {
        var groupTypeID = this.formBuilder.data.find(x=> x.name == "SystemType").val;
        var selectedUser = this.formBuilder.data.find(x=> x.name == "User").val;
        var typeID = this.formBuilder.data.find(x=> x.name == "Type").val;
        var selectedDate = this.formBuilder.data.find(x=> x.name == "SearchDateTime").val;

        this.apiService.getArrayFromQuery("ManagedProgramDB_RptRebalEntryAudit", JSON.stringify({
            Parameters: [
                {Name: "@GroupTypeID", Value: groupTypeID},
                {Name: "@Date", Value: selectedDate},
                {Name: "@User", Value: selectedUser},
                {Name: "@Type", Value: typeID}]
        })).subscribe(
            res=> {
                this.gridView.ShowDefault = true;
                this.gridView.data = res;
                if( res.length > 0){

                    var rowsReviewed = res.filter(x=> x.Reviewed).length;
                    var rowsNotReviewed = res.filter(x=> !x.Reviewed).length;

                    var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                    messageBlock = messageBlock.concat(rowsReviewed + (rowsReviewed > 1 ? " records " : " record ") + "reviewed");
                    messageBlock = messageBlock.concat(rowsNotReviewed + (rowsNotReviewed > 1 ? " records " : " record ") + "not reviewed");
                    this.customMessages.push({text: messageBlock, alert: "alert-info"});

                    this.gridView.gridSettings.CustomButtons.forEach(x=>{x.visible = true;});
                }
                else {
                   this.gridView.gridSettings.CustomButtons.forEach(x=> {x.visible = false;});
                }
                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            }
            , error => {
                this.alert.error("ManagedProgramDB_RptRebalEntryAudit : async error #" + error.status);
            },
            () => {
            }
        );
    }

    passAudit(selectedRows){
        this.apiService.executeNonQuery("ManagedProgramDB_PassAudit", JSON.stringify({Parameters: [
            {Name: "@IDs", Value: selectedRows},
            {Name: "@Auditor", Value: this.apiService.CurrentUser.LoginName}]
        })).subscribe(
            res=>{
                this.showRebalEntryAudit();
                this.alert.addAlert(res + (res > 1 ? " records " : " record ") + "passed audit.");
            }
            , error => { this.alert.error("ManagedProgramDB_PassAudit : async error #" + error.status); },
            () => {
            }
        );
    }

    showRebalEntryReport() {
        var groupTypeID = this.formBuilder.data.find(x=> x.name == "SystemType").val;
        var selectedUser = this.formBuilder.data.find(x=> x.name == "User").val;
        var typeID = this.formBuilder.data.find(x=> x.name == "Type").val;
        var selectedDate = this.formBuilder.data.find(x=> x.name == "SearchDateTime").val;

        this.apiService.getArrayFromQuery("ManagedProgramDB_RptRebalEntry", JSON.stringify({
            Parameters: [
                {Name: "@GroupTypeID", Value: groupTypeID},
                {Name: "@Date", Value: selectedDate},
                {Name: "@User", Value: selectedUser},
                {Name: "@Type", Value: typeID}]
        })).subscribe(
            res=> {
                this.gridView.ShowDefault = true;
                this.gridView.data = res;
                if( res.length > 0){

                    var rowsReviewed = res.filter(x=> x.Reviewed).length;
                    var rowsNotReviewed = res.filter(x=> !x.Reviewed).length;

                    var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                    messageBlock = messageBlock.concat(rowsReviewed + (rowsReviewed > 1 ? " records " : " record ") + "reviewed");
                    messageBlock = messageBlock.concat(rowsNotReviewed + (rowsNotReviewed > 1 ? " records " : " record ") + "not reviewed");
                    this.customMessages.push({text: messageBlock, alert: "alert-info"});
                }
                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            }
            , error => {
                this.alert.error("ManagedProgramDB_RptRebalEntry : async error #" + error.status);
            },
            () => {
            }
        );
    }

    previewUpload(groupTypeID, fileID) {

        this.importExportService.importTextFile("XLayerImport_ManagedProgramDB", fileID)
            .subscribe(
                res => {
                    this.apiService.executeNonQuery("Update_ManagedProgramDB_PortfolioChange_Import", JSON.stringify({
                        Parameters: [
                            {Name: "@GroupTypeID", Value: groupTypeID},
                            {Name: "@User", Value: this.apiService.CurrentUser.LoginName}]
                    })).subscribe(
                        res=> {
                            this.showPendings(groupTypeID, true);
                            this.alert.addAlert(res + " records imported.");
                        }
                        , error => {
                            this.alert.error("Update_ManagedProgramDB_PortfolioChange_Import : async error #" + error.status);
                        },
                        () => {
                        }
                    );
                },
                error => {
                    this.alert.error("XLayerImport_ManagedProgramDB : async error #" + error.status);
                },
                () => {
                }
            );
    }

    purgePendings(groupTypeID, selectedRows, purgeAll){
        this.apiService.executeNonQuery("ManagedProgramDB_CancelInstruction", JSON.stringify({Parameters: [
            {Name: "@GroupTypeID", Value: groupTypeID},
            {Name: "@IDs", Value: selectedRows},
            {Name: "@User", Value: this.apiService.CurrentUser.LoginName},
            {Name: "@PurgeAll", Value: purgeAll ? 1 : 0}]
        })).subscribe(
            res=>{
                this.showPendings(groupTypeID, false);
                this.alert.addAlert(res + " pending items purged.");
            }
            , error => { this.alert.error("ManagedProgramDB_CancelInstruction : async error #" + error.status); },
            () => {
            }
        );
    }

    importInstructions(groupTypeID, selectedRows){
        var checked = selectedRows.split(",").filter(Number).length;

        this.apiService.executeNonQuery("ManagedProgramDB_AddInstruction", JSON.stringify({Parameters: [
            {Name: "@GroupTypeID", Value: groupTypeID},
            {Name: "@IDs", Value: selectedRows},
            {Name: "@User", Value: this.apiService.CurrentUser.LoginName}]
        })).subscribe(
            res=>{
                if( res <= 0 ){
                    checked = res;
                }
                this.showPendings(groupTypeID, false);
                this.alert.addAlert(checked + " instruction inserted to system.");
            }
            , error => { this.alert.error("ManagedProgramDB_AddInstruction : async error #" + error.status); },
            () => {
            }
        );
    }

    showPendings(groupTypeID, sendMissedAccountAlertMail) {
        var uploadControl = this.formBuilder.data.find(x=> x.name == "UploadControl");
        uploadControl.readOnly = true;

        this.apiService.getArrayFromQuery("ManagedProgramDB_GetPendings", JSON.stringify({Parameters: [
            {Name: "@GroupTypeID", Value: groupTypeID},
            {Name: "@User", Value: this.apiService.CurrentUser.LoginName}]
        })).subscribe(
            res=>{
                this.gridView.ShowDefault = true;
                this.gridView.data = res[0];

                if( res.length > 0 && res[0].length > 0 ){
                    this.gridView.gridSettings.CustomButtons.forEach(x=>{x.visible = true;});

                    var messageBlock = [res[0].length + " pending items found."];
                    if(res[1].length > 0){
                        messageBlock = messageBlock.concat(this.getDuplicatedAccounts(res[1]));
                    }

                    this.customMessages.push({text: messageBlock, alert: "alert-info"});
                    /*if( sendMissedAccountAlertMail )
                     SendEmail( oDs.Tables[0] );*/
                }
                else {
                    uploadControl.readOnly = false;
                    this.gridView.gridSettings.CustomButtons.forEach(x=> {x.visible = false;});
                }

                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            }
            , error => { this.alert.error("ManagedProgramDB_GetPendings : async error #" + error.status); },
            () => {
            }
        );
        this.updatedControlsList.push(this.gridView);
    }

    private getDuplicatedAccounts(dt): string {
        var duplicatedAccounts = [];

         dt.forEach((x) => {
             duplicatedAccounts.push(x.PortfolioNumber);
         });

        if(duplicatedAccounts.length > 0) {
            return "Duplicated accounts found and removed (" + duplicatedAccounts.join(", ") + ")";
        }
        else{
            return "";
        }
    }

   /* private getFormBuilderControlSelectedValue(controlName: string): any{
        var returnValue;
        var control = this.formBuilder.data.find(x=> x.name == controlName);

        var SelectedItem = control.masterdataSource.find(x=> x.ID == control.val);
        if(SelectedItem) {
            returnValue = SelectedItem.val;
        }
        return returnValue;
    }*/

    private getImportType(groupTypeID): string {
        switch (groupTypeID) {
            case GROUP_TYPE.PIA:
                return 'PIA';
            case GROUP_TYPE.FP:
                return 'FP';
            case GROUP_TYPE.PIC:
                return 'PIC';
            default:
                return '';
        }
    }
}