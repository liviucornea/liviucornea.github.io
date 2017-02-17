import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {MpdbAdministrationConfig} from "./administration.config";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {ManagedProgramDbService} from "../managedProgramDbService";
import toNumber = require("lodash/toNumber");

@Component({
    selector: 'administration',
    template:   `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class MpdbAdministration {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = MpdbAdministrationConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    gridView: any;
    formBuilder: any;
    assignableList: any;
    assignedListOriginal: Array<any> = [];

    constructor(private alert: AlertService, private apiService: ApiService, private vmMatrix: matrixService,
                private mpdbService: ManagedProgramDbService)
    {}

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

    showSpecificTab(tabData){
        this.vmMatrix.showSpecificTab(this,tabData,this.mpdbService);
    }

    displayTabInfo(tabInfo) {
        this.formBuilder = null;
        this.customMessages = [];

        switch (tabInfo.TabKey) {
            case 'addUser':
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "AddUserFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
            case 'AssignCSA':
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "AssignCSAFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                this.assignableList = tabInfo.TabControls.find(x=> x.ComponentName == "AssignCSAList");
                this.assignableList.gridSettings.CustomButtons.find(x=> x.value == 'Save').disabled = true;
                break;
            case 'ChangeSubstitutes':
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "ChangeSubstitutesFormBuilder");
                if (this.formBuilder) {
                   this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                this.assignableList = tabInfo.TabControls.find(x=> x.ComponentName == "ChangeSubstitutesList");
                this.assignableList.gridSettings.CustomButtons.find(x=> x.value == 'Save').disabled = true;

                break;
            case 'editUser':
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "EditUserFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
            case 'ModuleUpdate':
                this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "ModuleUpdateDisplayGrid");
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }

                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "ModuleUpdateFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
        }

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];

        switch (outputData.TabKey) {
            case 'addUser':
                this.addEditUserAction(outputData, true);
                break;
            case 'AssignCSA':
                this.assignCSAAction(outputData);
                break;
            case 'ChangeSubstitutes':
                this.changeSubstitutesAction(outputData);
                break;
            case 'editUser':
                this.addEditUserAction(outputData, false);
                break;
            case 'ModuleUpdate':
                this.moduleUpdateAction(outputData);
                break;
        }
    }

    addEditUserAction(outputData, addUser: boolean) {
        var GroupType = this.formBuilder.data.find(x=> x.name == "GroupType");
        var User = this.formBuilder.data.find(x=> x.name == "User");
        var Portfolios = this.formBuilder.data.find(x=> x.name == "Portfolios");
        var ToUser = this.formBuilder.data.find(x=> x.name == "ToUser");

        switch (outputData.updatedValue.controlName) {
            case "SystemType":
                var systemTypeSelected = outputData.updatedValue.value;
                if(systemTypeSelected == ""){
                    this.vmMatrix.bindCustomDropDown(GroupType, null);
                    this.vmMatrix.bindCustomDropDown(User, null);
                    if(!addUser){
                        this.vmMatrix.bindCustomCheckBoxList(Portfolios, null);
                    }
                    break;
                }
                else{
                    this.populateGroupType(systemTypeSelected, addUser);
                }
                break;
            case "GroupType":
                var groupTypeSelected = outputData.updatedValue.value;
                if(groupTypeSelected == ""){
                    this.vmMatrix.bindCustomDropDown(User, null);
                    if(!addUser){
                        this.vmMatrix.bindCustomCheckBoxList(Portfolios, null);
                    }
                    break;
                }
                else{
                    this.populateUser(User, groupTypeSelected, addUser);
                }
                break;
            case "User":
                var userSelected = outputData.updatedValue.value;
                if(userSelected == ""){
                    if(!addUser){
                        this.vmMatrix.bindCustomCheckBoxList(Portfolios, null);
                        this.vmMatrix.bindCustomDropDown(ToUser, null);
                    }
                    break;
                }
                else{
                    if(!addUser){
                        groupTypeSelected = GroupType.val;
                        this.populatePortfolios(groupTypeSelected, userSelected);
                        this.populateUser(ToUser, groupTypeSelected, addUser);
                    }
                }
                break;
            case "Edit":
                this.editUser(GroupType.val, User.val, Portfolios.val, ToUser.val);
                break;
            case "Add":
                this.addUser(User.val, GroupType.val);
                break;
        }
    }

    assignCSAAction(outputData){
        this.customMessages = [];
        var ProjectManagers = this.formBuilder.data.find(x=> x.name == "ProjectManagers");

        switch (outputData.updatedValue.controlName) {
            case "SystemType":
                var systemTypeSelected = outputData.updatedValue.value;
                if(systemTypeSelected == ""){
                    this.vmMatrix.bindCustomDropDown(ProjectManagers, null);
                    this.assignableList.inputList = [];
                    this.assignableList.assignedList = [];
                    break;
                }
                else{
                    this.populateProjectManagers(systemTypeSelected);
                }
                break;
            case "ProjectManagers":
                var projectManagerSelected = outputData.updatedValue.value;
                if(projectManagerSelected == ""){
                    this.assignableList.inputList = [];
                    this.assignableList.assignedList = [];
                    break;
                }
                else{
                    var systemTypeSelected = this.formBuilder.data.find(x=> x.name == "SystemType").val;
                    this.displayAssignedCSA(systemTypeSelected, projectManagerSelected);
                }
                break;
            case "Save":
                var assignedListUpdated = outputData.updatedValue.value.map(x=>{return x.Value;});
                var removedItems = this.assignedListOriginal.filter(x=>!assignedListUpdated.includes(x));
                var addedItems = assignedListUpdated.filter(x=>!this.assignedListOriginal.includes(x));
                if(removedItems.length == 0 && addedItems.length == 0){
                    this.customMessages.push({text: ["Please Add/Remove Linked Users"], alert: "alert-danger"});
                }
                else {
                    this.assignCSA(removedItems.join(","), addedItems.join(","));
                }
                break;
        }
    }

    changeSubstitutesAction(outputData){
        switch (outputData.updatedValue.controlName) {
            case "Models":
                var modelSelected = outputData.updatedValue.value;
                if (modelSelected == "") {
                    this.assignableList.inputList = [];
                    this.assignableList.assignedList = [];
                    break;
                }
                else {
                    this.displaySubstitutes(modelSelected);
                }
                break;
            case "Save":
                var selectedItems = [];
                outputData.updatedValue.value.forEach(x=> selectedItems.push(x.Value));
                this.saveSubstitutes(selectedItems.join(","));
                break;
        }
    }

    moduleUpdateAction(outputData){
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "Module":
                var moduleSelected = outputData.updatedValue.value;
                if (moduleSelected == "") {
                    this.gridView.ShowDefault = false;
                    this.gridView.data = [];
                    break;
                }
                else {
                    this.displayModule(moduleSelected);
                }
                break;
            case "Submit":
                var data = outputData.updatedValue.masterList;
                var total = data.map(function(data) {
                    let res: number = data.cells.find(y=> y.name.toLowerCase() == 'mid').val;
                    return Number(res);
                }).reduce((sum, current) => sum + current, 0);

                if(total != 100){
                    this.customMessages.push({text: ["The sum of all values in the Mid column must be 100"], alert: "alert-danger"});
                }
                else {
                    this.updateModule(data);
                }
                break;
        }
    }

    populateGroupType(systemTypeSelected, addUser) {
        var GroupType = this.formBuilder.data.find(x=> x.name == "GroupType");
        var User = this.formBuilder.data.find(x=> x.name == "User");
        var Portfolios = this.formBuilder.data.find(x=> x.name == "Portfolios");

        this.vmMatrix.bindCustomDropDown(GroupType, null);
        this.vmMatrix.bindCustomDropDown(User, null);
        if(!addUser){
            this.vmMatrix.bindCustomCheckBoxList(Portfolios, null);
        }

        this.apiService.getArrayFromQuery("ManagedProgramDB_GetGroup", JSON.stringify({
            Parameters: [{Name: "@Type", Value: systemTypeSelected}]
        })).subscribe(
            res=> {
                this.vmMatrix.bindCustomDropDown(GroupType, res);
            },
            error => {
                this.alert.error("ManagedProgramDB_GetGroup. Error in retrieving drop down info" + error.status);
            },
            () => {}
        );
    }

    populateProjectManagers(systemTypeSelected: number){
        var ProjectManagers = this.formBuilder.data.find(x=> x.name == "ProjectManagers");
        var iPM: number;
        if(systemTypeSelected == 18) {
            iPM = 237;
            ProjectManagers.label = "Project Managers";
        }
        else if(systemTypeSelected == 19) {
            iPM = 238;
            ProjectManagers.label = "IA Codes";
        }
        else if(systemTypeSelected == 23) {
            iPM = 421;
            ProjectManagers.label = "IA Codes";
        }

        this.apiService.getArrayFromQuery("ManagedProgramDB_GetExistingUser", JSON.stringify({
            Parameters: [{Name: "@GroupID", Value: iPM}]
        })).subscribe(
            res=> {
                this.vmMatrix.bindCustomDropDown(ProjectManagers, res);
            },
            error => {
                this.alert.error("ManagedProgramDB_GetExistingUser. Error in retrieving drop down info" + error.status);
            },
            () => {}
        );
    }

    populateUser(userControl, groupTypeSelected, addUser: boolean) {
        var Portfolios = this.formBuilder.data.find(x=> x.name == "Portfolios");

        this.vmMatrix.bindCustomDropDown(userControl, null);
        if(!addUser){
            this.vmMatrix.bindCustomCheckBoxList(Portfolios, null);
        }

        this.apiService.getArrayFromQuery(addUser ? "ManagedProgramDB_GetNewUser" : "ManagedProgramDB_GetExistingUser",
            JSON.stringify({Parameters: [{Name: "@GroupID", Value: groupTypeSelected}]})).subscribe(
            res=> {
                this.vmMatrix.bindCustomDropDown(userControl, res);
            },
            error => {
                this.alert.error("ManagedProgramDB_populateUser. Error in retrieving drop down info" + error.status);
            },
            () => {}
        );
    }

    populatePortfolios(groupTypeSelected, userSelected){
        var Portfolios = this.formBuilder.data.find(x=> x.name == "Portfolios");

        this.vmMatrix.bindCustomDropDown(Portfolios, null);

        this.apiService.getArrayFromQuery("ManagedProgramDB_GetPortfolios",
            JSON.stringify({Parameters: [{Name: "@GroupID", Value: groupTypeSelected},
                {Name: "@UserID", Value: userSelected}]})).subscribe(
            res=> {
                this.vmMatrix.bindCustomCheckBoxList(Portfolios, res);
            },
            error => {
                this.alert.error("ManagedProgramDB_GetPortfolios. Error in retrieving drop down info" + error.status);
            },
            () => {}
        );
    }

    addUser(userSelected, groupTypeSelected){
        var User = this.formBuilder.data.find(x=> x.name == "User");

        this.apiService.executeNonQuery("UpdateUserGroupUser", JSON.stringify({Parameters: [
            {Name: "@User", Value: userSelected},
            {Name: "@GroupType", Value: groupTypeSelected}]
        })).subscribe(
            res=>{
                this.populateUser(User, groupTypeSelected, true);
                this.alert.addAlert("User Added Successfully.");
            },
            error => {
                this.alert.error("UpdateUserGroupUser : async error #" + error.status);
            },
            () => {}
        );
    }

    editUser(groupTypeSelected, userSelected, portfoliosSelected, toUserSelected){
        this.apiService.executeNonQuery("ManagedProgramDB_Portfolio_EditUser", JSON.stringify({Parameters: [
            {Name: "@User", Value: userSelected},
            {Name: "@PortfolioNumber", Value: portfoliosSelected.join(",")},
            {Name: "@ToUser", Value: toUserSelected}]})).subscribe(
            res=>{
                this.formBuilder.data.find(p=>p.name =='Portfolios').val=[];
                this.populatePortfolios(groupTypeSelected, userSelected);
                this.alert.addAlert("User Edited Successfully.");
            },
            error => {
                this.alert.error("ManagedProgramDB_Portfolio_EditUser : async error #" + error.status);
            },
            () => {}
        );
    }

    displayAssignedCSA(systemTypeSelected: number, projectManagerSelected: number){

        var iCSA: number;
        if(systemTypeSelected == 18) {
            iCSA = 240;
        }
        else if(systemTypeSelected == 19) {
            iCSA = 243;
        }
        else if(systemTypeSelected == 23) {
            iCSA = 423;
        }

        var apiParams: Array<any> = [
            {url: "ManagedProgramDB_AdminGetAvailableUsers", body:{Parameters: [
                {Name: "@UserGroupID", Value: iCSA},
                {Name: "@GroupID", Value: systemTypeSelected},
                {Name: "@UserID", Value: projectManagerSelected}]}},
            {url: "ManagedProgramDB_AdminGetLinkedUsers", body:{Parameters: [
                {Name: "@UserGroupID", Value: iCSA},
                {Name: "@GroupID", Value: systemTypeSelected},
                {Name: "@UserID", Value: projectManagerSelected}]}}];

        this.apiService.getMultipleArrayFromQuery(apiParams).subscribe(
            res=> {
                this.assignableList.inputList = res[0];
                this.assignableList.assignedList = res[1];
                this.assignableList.gridSettings.CustomButtons.find(x=> x.value == 'Save').disabled = false;

                this.assignedListOriginal = res[1].map(x=>{return x.id;});
            },
            error => {
                this.alert.error("displayAssignedCSA. Error in populating Available/Linked Users" + error.status);
            },
            () => {}
        );
    }

    assignCSA(removedItems, addedItems){
        var systemTypeSelected = this.formBuilder.data.find(x=> x.name == "SystemType").val;
        var projectManagerSelected = this.formBuilder.data.find(x=> x.name == "ProjectManagers").val;
        var apiParams: Array<any> = [];

        if(removedItems.length>0){
            apiParams.push({url: "ManagedProgramDB_UpdateUserLinkedUser", body:{Parameters: [
                {Name: "@Type", Value: 1},
                {Name: "@UserGroupID", Value: projectManagerSelected},
                {Name: "@UserID", Value: removedItems},
                {Name: "@GroupID", Value: systemTypeSelected}]}});
        }
        if(addedItems.length>0){
            apiParams.push({url: "ManagedProgramDB_UpdateUserLinkedUser", body:{Parameters: [
                {Name: "@Type", Value: 0},
                {Name: "@UserGroupID", Value: projectManagerSelected},
                {Name: "@UserID", Value: addedItems},
                {Name: "@GroupID", Value: systemTypeSelected}]}});
        }

        this.apiService.executeMultipleNonQuery(apiParams).subscribe(
            res=> {
                this.alert.addAlert("Linked Users Updated Successfully.");
            },
            error => {
                this.alert.error("assignCSA. Error in updating Linked Users" + error.status);
            },
            () => {}
        );
    }

    displaySubstitutes(modelSelected){
        var apiParams: Array<any> = [{url: "ManagedProgramDB_ActiveModels"},
            {url: "ManagedProgramDB_SubstituteModels", body:{Parameters: [{Name: "@ModelID", Value: modelSelected}]}}];

        this.apiService.getMultipleArrayFromQuery(apiParams).subscribe(
            res=> {
                this.assignableList.assignedList = res[1];
                for (var i = res[0].length - 1; i >= 0; i -= 1) {
                    res[1].forEach(x=> {
                    if (res[0][i].model.trim() == x.model.trim()) {
                        res[0].splice(i, 1);
                    }});
                }
                this.assignableList.inputList = res[0].sort(function(a,b) {return (a.model > b.model) ? 1 : ((b.model > a.model) ? -1 : 0);} );
                this.assignableList.gridSettings.CustomButtons.find(x=> x.value == 'Save').disabled = false;
            },
            error => {
                this.alert.error("DisplaySubstitutes. Error in populating Active Models/Substitutes lists" + error.status);
            },
            () => {}
        );
  }

    saveSubstitutes(selectedItems){
        var Model = this.formBuilder.data.find(x=> x.name == "Models");
        this.apiService.executeNonQuery("ManagedProgramDB_ModuleMixPure", JSON.stringify({Parameters: [
            {Name: "@ModelID", Value: Model.val},
            {Name: "@ReplaceModelID", Value: selectedItems},
            {Name: "@User", Value: this.apiService.CurrentUser.LoginName}]
        })).subscribe(
            res=>{
                this.alert.addAlert("Substitutes items updated.");
            },
            error => {
                this.alert.error("ManagedProgramDB_ModuleMixPure : async error #" + error.status);
            },
            () => {}
        );
    }

    displayModule(moduleSelected){
        this.apiService.getArrayFromQuery("ManagedProgramDB_GetModel", JSON.stringify({
            Parameters: [{Name: "@ModuleID", Value: moduleSelected}]})).subscribe(
            res=> {
                this.gridView.ShowDefault = true;
                this.gridView.data = res;

                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            },
            error => {
                this.alert.error("ManagedProgramDB_GetModel : async error #" + error.status);
            },
            () => {}
        );
    }

    updateModule(data){
        var Module = this.formBuilder.data.find(x=> x.name == "Module");

        var apiParams: Array<any> = [];

        data.forEach(x=> apiParams.push(
            {url: "ManagedProgramDB_UpdateModuleMix",
                body:{
                    Parameters: [
                        {Name: "@ModuleID", Value: Module.val},
                        {Name: "@ModelID", Value: x.cells.find(y=> y.name.toLowerCase() == 'id').val},
                        {Name: "@Mid", Value: x.cells.find(y=> y.name.toLowerCase() == 'mid').val},
                    ]
                }
            }
        ));

        this.apiService.executeMultipleNonQuery(apiParams).subscribe(
            res=>{
                this.alert.addAlert("Module Edited Successfully.");
            },
            error => {
                this.alert.error("ManagedProgramDB_UpdateModuleMix : async error #" + error.status);
            },
            () => {}
        );
    }
}