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
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var administration_config_1 = require("./administration.config");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var managedProgramDbService_1 = require("../managedProgramDbService");
var MpdbAdministration = (function () {
    function MpdbAdministration(alert, apiService, vmMatrix, mpdbService) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.mpdbService = mpdbService;
        this.tabsListData = [];
        this.tabControlConfig = administration_config_1.MpdbAdministrationConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
        this.assignedListOriginal = [];
    }
    MpdbAdministration.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    MpdbAdministration.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    MpdbAdministration.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    MpdbAdministration.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData, this.mpdbService);
    };
    MpdbAdministration.prototype.displayTabInfo = function (tabInfo) {
        this.formBuilder = null;
        this.customMessages = [];
        switch (tabInfo.TabKey) {
            case 'addUser':
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "AddUserFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
            case 'AssignCSA':
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "AssignCSAFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                this.assignableList = tabInfo.TabControls.find(function (x) { return x.ComponentName == "AssignCSAList"; });
                this.assignableList.gridSettings.CustomButtons.find(function (x) { return x.value == 'Save'; }).disabled = true;
                break;
            case 'ChangeSubstitutes':
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "ChangeSubstitutesFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                this.assignableList = tabInfo.TabControls.find(function (x) { return x.ComponentName == "ChangeSubstitutesList"; });
                this.assignableList.gridSettings.CustomButtons.find(function (x) { return x.value == 'Save'; }).disabled = true;
                break;
            case 'editUser':
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "EditUserFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
            case 'ModuleUpdate':
                this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "ModuleUpdateDisplayGrid"; });
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "ModuleUpdateFormBuilder"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    MpdbAdministration.prototype.doActionFromChildTab = function (outputData) {
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
    };
    MpdbAdministration.prototype.addEditUserAction = function (outputData, addUser) {
        var GroupType = this.formBuilder.data.find(function (x) { return x.name == "GroupType"; });
        var User = this.formBuilder.data.find(function (x) { return x.name == "User"; });
        var Portfolios = this.formBuilder.data.find(function (x) { return x.name == "Portfolios"; });
        var ToUser = this.formBuilder.data.find(function (x) { return x.name == "ToUser"; });
        switch (outputData.updatedValue.controlName) {
            case "SystemType":
                var systemTypeSelected = outputData.updatedValue.value;
                if (systemTypeSelected == "") {
                    this.vmMatrix.bindCustomDropDown(GroupType, null);
                    this.vmMatrix.bindCustomDropDown(User, null);
                    if (!addUser) {
                        this.vmMatrix.bindCustomCheckBoxList(Portfolios, null);
                    }
                    break;
                }
                else {
                    this.populateGroupType(systemTypeSelected, addUser);
                }
                break;
            case "GroupType":
                var groupTypeSelected = outputData.updatedValue.value;
                if (groupTypeSelected == "") {
                    this.vmMatrix.bindCustomDropDown(User, null);
                    if (!addUser) {
                        this.vmMatrix.bindCustomCheckBoxList(Portfolios, null);
                    }
                    break;
                }
                else {
                    this.populateUser(User, groupTypeSelected, addUser);
                }
                break;
            case "User":
                var userSelected = outputData.updatedValue.value;
                if (userSelected == "") {
                    if (!addUser) {
                        this.vmMatrix.bindCustomCheckBoxList(Portfolios, null);
                        this.vmMatrix.bindCustomDropDown(ToUser, null);
                    }
                    break;
                }
                else {
                    if (!addUser) {
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
    };
    MpdbAdministration.prototype.assignCSAAction = function (outputData) {
        var _this = this;
        this.customMessages = [];
        var ProjectManagers = this.formBuilder.data.find(function (x) { return x.name == "ProjectManagers"; });
        switch (outputData.updatedValue.controlName) {
            case "SystemType":
                var systemTypeSelected = outputData.updatedValue.value;
                if (systemTypeSelected == "") {
                    this.vmMatrix.bindCustomDropDown(ProjectManagers, null);
                    this.assignableList.inputList = [];
                    this.assignableList.assignedList = [];
                    break;
                }
                else {
                    this.populateProjectManagers(systemTypeSelected);
                }
                break;
            case "ProjectManagers":
                var projectManagerSelected = outputData.updatedValue.value;
                if (projectManagerSelected == "") {
                    this.assignableList.inputList = [];
                    this.assignableList.assignedList = [];
                    break;
                }
                else {
                    var systemTypeSelected = this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).val;
                    this.displayAssignedCSA(systemTypeSelected, projectManagerSelected);
                }
                break;
            case "Save":
                var assignedListUpdated = outputData.updatedValue.value.map(function (x) { return x.Value; });
                var removedItems = this.assignedListOriginal.filter(function (x) { return !assignedListUpdated.includes(x); });
                var addedItems = assignedListUpdated.filter(function (x) { return !_this.assignedListOriginal.includes(x); });
                if (removedItems.length == 0 && addedItems.length == 0) {
                    this.customMessages.push({ text: ["Please Add/Remove Linked Users"], alert: "alert-danger" });
                }
                else {
                    this.assignCSA(removedItems.join(","), addedItems.join(","));
                }
                break;
        }
    };
    MpdbAdministration.prototype.changeSubstitutesAction = function (outputData) {
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
                outputData.updatedValue.value.forEach(function (x) { return selectedItems.push(x.Value); });
                this.saveSubstitutes(selectedItems.join(","));
                break;
        }
    };
    MpdbAdministration.prototype.moduleUpdateAction = function (outputData) {
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
                var total = data.map(function (data) {
                    var res = data.cells.find(function (y) { return y.name.toLowerCase() == 'mid'; }).val;
                    return Number(res);
                }).reduce(function (sum, current) { return sum + current; }, 0);
                if (total != 100) {
                    this.customMessages.push({ text: ["The sum of all values in the Mid column must be 100"], alert: "alert-danger" });
                }
                else {
                    this.updateModule(data);
                }
                break;
        }
    };
    MpdbAdministration.prototype.populateGroupType = function (systemTypeSelected, addUser) {
        var _this = this;
        var GroupType = this.formBuilder.data.find(function (x) { return x.name == "GroupType"; });
        var User = this.formBuilder.data.find(function (x) { return x.name == "User"; });
        var Portfolios = this.formBuilder.data.find(function (x) { return x.name == "Portfolios"; });
        this.vmMatrix.bindCustomDropDown(GroupType, null);
        this.vmMatrix.bindCustomDropDown(User, null);
        if (!addUser) {
            this.vmMatrix.bindCustomCheckBoxList(Portfolios, null);
        }
        this.apiService.getArrayFromQuery("ManagedProgramDB_GetGroup", JSON.stringify({
            Parameters: [{ Name: "@Type", Value: systemTypeSelected }]
        })).subscribe(function (res) {
            _this.vmMatrix.bindCustomDropDown(GroupType, res);
        }, function (error) {
            _this.alert.error("ManagedProgramDB_GetGroup. Error in retrieving drop down info" + error.status);
        }, function () { });
    };
    MpdbAdministration.prototype.populateProjectManagers = function (systemTypeSelected) {
        var _this = this;
        var ProjectManagers = this.formBuilder.data.find(function (x) { return x.name == "ProjectManagers"; });
        var iPM;
        if (systemTypeSelected == 18) {
            iPM = 237;
            ProjectManagers.label = "Project Managers";
        }
        else if (systemTypeSelected == 19) {
            iPM = 238;
            ProjectManagers.label = "IA Codes";
        }
        else if (systemTypeSelected == 23) {
            iPM = 421;
            ProjectManagers.label = "IA Codes";
        }
        this.apiService.getArrayFromQuery("ManagedProgramDB_GetExistingUser", JSON.stringify({
            Parameters: [{ Name: "@GroupID", Value: iPM }]
        })).subscribe(function (res) {
            _this.vmMatrix.bindCustomDropDown(ProjectManagers, res);
        }, function (error) {
            _this.alert.error("ManagedProgramDB_GetExistingUser. Error in retrieving drop down info" + error.status);
        }, function () { });
    };
    MpdbAdministration.prototype.populateUser = function (userControl, groupTypeSelected, addUser) {
        var _this = this;
        var Portfolios = this.formBuilder.data.find(function (x) { return x.name == "Portfolios"; });
        this.vmMatrix.bindCustomDropDown(userControl, null);
        if (!addUser) {
            this.vmMatrix.bindCustomCheckBoxList(Portfolios, null);
        }
        this.apiService.getArrayFromQuery(addUser ? "ManagedProgramDB_GetNewUser" : "ManagedProgramDB_GetExistingUser", JSON.stringify({ Parameters: [{ Name: "@GroupID", Value: groupTypeSelected }] })).subscribe(function (res) {
            _this.vmMatrix.bindCustomDropDown(userControl, res);
        }, function (error) {
            _this.alert.error("ManagedProgramDB_populateUser. Error in retrieving drop down info" + error.status);
        }, function () { });
    };
    MpdbAdministration.prototype.populatePortfolios = function (groupTypeSelected, userSelected) {
        var _this = this;
        var Portfolios = this.formBuilder.data.find(function (x) { return x.name == "Portfolios"; });
        this.vmMatrix.bindCustomDropDown(Portfolios, null);
        this.apiService.getArrayFromQuery("ManagedProgramDB_GetPortfolios", JSON.stringify({ Parameters: [{ Name: "@GroupID", Value: groupTypeSelected },
                { Name: "@UserID", Value: userSelected }] })).subscribe(function (res) {
            _this.vmMatrix.bindCustomCheckBoxList(Portfolios, res);
        }, function (error) {
            _this.alert.error("ManagedProgramDB_GetPortfolios. Error in retrieving drop down info" + error.status);
        }, function () { });
    };
    MpdbAdministration.prototype.addUser = function (userSelected, groupTypeSelected) {
        var _this = this;
        var User = this.formBuilder.data.find(function (x) { return x.name == "User"; });
        this.apiService.executeNonQuery("UpdateUserGroupUser", JSON.stringify({ Parameters: [
                { Name: "@User", Value: userSelected },
                { Name: "@GroupType", Value: groupTypeSelected }]
        })).subscribe(function (res) {
            _this.populateUser(User, groupTypeSelected, true);
            _this.alert.addAlert("User Added Successfully.");
        }, function (error) {
            _this.alert.error("UpdateUserGroupUser : async error #" + error.status);
        }, function () { });
    };
    MpdbAdministration.prototype.editUser = function (groupTypeSelected, userSelected, portfoliosSelected, toUserSelected) {
        var _this = this;
        this.apiService.executeNonQuery("ManagedProgramDB_Portfolio_EditUser", JSON.stringify({ Parameters: [
                { Name: "@User", Value: userSelected },
                { Name: "@PortfolioNumber", Value: portfoliosSelected.join(",") },
                { Name: "@ToUser", Value: toUserSelected }] })).subscribe(function (res) {
            _this.formBuilder.data.find(function (p) { return p.name == 'Portfolios'; }).val = [];
            _this.populatePortfolios(groupTypeSelected, userSelected);
            _this.alert.addAlert("User Edited Successfully.");
        }, function (error) {
            _this.alert.error("ManagedProgramDB_Portfolio_EditUser : async error #" + error.status);
        }, function () { });
    };
    MpdbAdministration.prototype.displayAssignedCSA = function (systemTypeSelected, projectManagerSelected) {
        var _this = this;
        var iCSA;
        if (systemTypeSelected == 18) {
            iCSA = 240;
        }
        else if (systemTypeSelected == 19) {
            iCSA = 243;
        }
        else if (systemTypeSelected == 23) {
            iCSA = 423;
        }
        var apiParams = [
            { url: "ManagedProgramDB_AdminGetAvailableUsers", body: { Parameters: [
                        { Name: "@UserGroupID", Value: iCSA },
                        { Name: "@GroupID", Value: systemTypeSelected },
                        { Name: "@UserID", Value: projectManagerSelected }] } },
            { url: "ManagedProgramDB_AdminGetLinkedUsers", body: { Parameters: [
                        { Name: "@UserGroupID", Value: iCSA },
                        { Name: "@GroupID", Value: systemTypeSelected },
                        { Name: "@UserID", Value: projectManagerSelected }] } }];
        this.apiService.getMultipleArrayFromQuery(apiParams).subscribe(function (res) {
            _this.assignableList.inputList = res[0];
            _this.assignableList.assignedList = res[1];
            _this.assignableList.gridSettings.CustomButtons.find(function (x) { return x.value == 'Save'; }).disabled = false;
            _this.assignedListOriginal = res[1].map(function (x) { return x.id; });
        }, function (error) {
            _this.alert.error("displayAssignedCSA. Error in populating Available/Linked Users" + error.status);
        }, function () { });
    };
    MpdbAdministration.prototype.assignCSA = function (removedItems, addedItems) {
        var _this = this;
        var systemTypeSelected = this.formBuilder.data.find(function (x) { return x.name == "SystemType"; }).val;
        var projectManagerSelected = this.formBuilder.data.find(function (x) { return x.name == "ProjectManagers"; }).val;
        var apiParams = [];
        if (removedItems.length > 0) {
            apiParams.push({ url: "ManagedProgramDB_UpdateUserLinkedUser", body: { Parameters: [
                        { Name: "@Type", Value: 1 },
                        { Name: "@UserGroupID", Value: projectManagerSelected },
                        { Name: "@UserID", Value: removedItems },
                        { Name: "@GroupID", Value: systemTypeSelected }] } });
        }
        if (addedItems.length > 0) {
            apiParams.push({ url: "ManagedProgramDB_UpdateUserLinkedUser", body: { Parameters: [
                        { Name: "@Type", Value: 0 },
                        { Name: "@UserGroupID", Value: projectManagerSelected },
                        { Name: "@UserID", Value: addedItems },
                        { Name: "@GroupID", Value: systemTypeSelected }] } });
        }
        this.apiService.executeMultipleNonQuery(apiParams).subscribe(function (res) {
            _this.alert.addAlert("Linked Users Updated Successfully.");
        }, function (error) {
            _this.alert.error("assignCSA. Error in updating Linked Users" + error.status);
        }, function () { });
    };
    MpdbAdministration.prototype.displaySubstitutes = function (modelSelected) {
        var _this = this;
        var apiParams = [{ url: "ManagedProgramDB_ActiveModels" },
            { url: "ManagedProgramDB_SubstituteModels", body: { Parameters: [{ Name: "@ModelID", Value: modelSelected }] } }];
        this.apiService.getMultipleArrayFromQuery(apiParams).subscribe(function (res) {
            _this.assignableList.assignedList = res[1];
            for (var i = res[0].length - 1; i >= 0; i -= 1) {
                res[1].forEach(function (x) {
                    if (res[0][i].model.trim() == x.model.trim()) {
                        res[0].splice(i, 1);
                    }
                });
            }
            _this.assignableList.inputList = res[0].sort(function (a, b) { return (a.model > b.model) ? 1 : ((b.model > a.model) ? -1 : 0); });
            _this.assignableList.gridSettings.CustomButtons.find(function (x) { return x.value == 'Save'; }).disabled = false;
        }, function (error) {
            _this.alert.error("DisplaySubstitutes. Error in populating Active Models/Substitutes lists" + error.status);
        }, function () { });
    };
    MpdbAdministration.prototype.saveSubstitutes = function (selectedItems) {
        var _this = this;
        var Model = this.formBuilder.data.find(function (x) { return x.name == "Models"; });
        this.apiService.executeNonQuery("ManagedProgramDB_ModuleMixPure", JSON.stringify({ Parameters: [
                { Name: "@ModelID", Value: Model.val },
                { Name: "@ReplaceModelID", Value: selectedItems },
                { Name: "@User", Value: this.apiService.CurrentUser.LoginName }]
        })).subscribe(function (res) {
            _this.alert.addAlert("Substitutes items updated.");
        }, function (error) {
            _this.alert.error("ManagedProgramDB_ModuleMixPure : async error #" + error.status);
        }, function () { });
    };
    MpdbAdministration.prototype.displayModule = function (moduleSelected) {
        var _this = this;
        this.apiService.getArrayFromQuery("ManagedProgramDB_GetModel", JSON.stringify({
            Parameters: [{ Name: "@ModuleID", Value: moduleSelected }] })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("ManagedProgramDB_GetModel : async error #" + error.status);
        }, function () { });
    };
    MpdbAdministration.prototype.updateModule = function (data) {
        var _this = this;
        var Module = this.formBuilder.data.find(function (x) { return x.name == "Module"; });
        var apiParams = [];
        data.forEach(function (x) { return apiParams.push({ url: "ManagedProgramDB_UpdateModuleMix",
            body: {
                Parameters: [
                    { Name: "@ModuleID", Value: Module.val },
                    { Name: "@ModelID", Value: x.cells.find(function (y) { return y.name.toLowerCase() == 'id'; }).val },
                    { Name: "@Mid", Value: x.cells.find(function (y) { return y.name.toLowerCase() == 'mid'; }).val },
                ]
            }
        }); });
        this.apiService.executeMultipleNonQuery(apiParams).subscribe(function (res) {
            _this.alert.addAlert("Module Edited Successfully.");
        }, function (error) {
            _this.alert.error("ManagedProgramDB_UpdateModuleMix : async error #" + error.status);
        }, function () { });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], MpdbAdministration.prototype, "tabBuilderControl", void 0);
    MpdbAdministration = __decorate([
        core_1.Component({
            selector: 'administration',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService, managedProgramDbService_1.ManagedProgramDbService])
    ], MpdbAdministration);
    return MpdbAdministration;
}());
exports.MpdbAdministration = MpdbAdministration;
//# sourceMappingURL=administration.js.map